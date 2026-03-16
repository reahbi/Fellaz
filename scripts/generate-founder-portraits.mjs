import { GoogleGenAI } from "@google/genai";
import fs from "node:fs/promises";
import path from "node:path";
import founders from "../founders.config.json" with { type: "json" };

const SUPPORTED_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".heic", ".heif"]);
const CONCURRENCY = 2;
const VARIANTS_PER_FOUNDER = 3;
const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image-preview";
const FOUNDER_IDS = new Set(
  (process.env.FOUNDER_IDS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean),
);
const FORCE_VERTICAL = process.env.FORCE_VERTICAL === "1";
const EXTRA_PROMPT = process.env.EXTRA_PROMPT?.trim() || "";

function toMimeType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  if (extension === ".png") return "image/png";
  if (extension === ".jpg" || extension === ".jpeg") return "image/jpeg";
  if (extension === ".webp") return "image/webp";
  if (extension === ".heic") return "image/heic";
  if (extension === ".heif") return "image/heif";
  throw new Error(`Unsupported image extension: ${extension}`);
}

async function firstImageInDirectory(directoryPath) {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(directoryPath, entry.name))
    .filter((filePath) => !path.basename(filePath).startsWith("candidate-"))
    .filter((filePath) => SUPPORTED_EXTENSIONS.has(path.extname(filePath).toLowerCase()));

  const filesWithStats = await Promise.all(
    files.map(async (filePath) => ({
      filePath,
      stat: await fs.stat(filePath),
    })),
  );

  const match = filesWithStats
    .sort((left, right) => right.stat.mtimeMs - left.stat.mtimeMs)
    .at(0)?.filePath;

  if (!match) {
    throw new Error(`No supported source image found in ${directoryPath}`);
  }

  return match;
}

async function fileToInlineData(filePath) {
  const buffer = await fs.readFile(filePath);
  return {
    inlineData: {
      mimeType: toMimeType(filePath),
      data: buffer.toString("base64"),
    },
  };
}

async function urlToInlineData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch reference image ${url}: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const contentType = response.headers.get("content-type");
  if (!contentType) {
    throw new Error(`Reference image ${url} did not include a content-type header`);
  }

  return {
    inlineData: {
      mimeType: contentType.split(";")[0],
      data: Buffer.from(arrayBuffer).toString("base64"),
    },
  };
}

function buildPrompt(founder, variantIndex) {
  const variantDirection = [
    "Stay as close as possible to the reference portrait in pose, crop, and mood.",
    "Stay very close to the reference portrait, but make the expression slightly more confident and the framing a touch tighter.",
    "Stay very close to the reference portrait, but add slightly stronger dramatic lighting and a more editorial luxury-magazine finish.",
  ][variantIndex] ?? "Preserve the same founder identity and create a premium corporate portrait.";

  return [
    `Create a merged result for ${founder.fullName} (${founder.firstName} ${founder.lastName}).`,
    "Use the second image as the base portrait and overall composition.",
    "Replace the person in the second image with the real person from the first image.",
    "Preserve the real face identity, hairstyle, age range, and Korean ethnicity of the source person.",
    "Keep the clothing style, camera angle, background simplicity, lighting direction, crop, pose, and editorial mood of the second image as much as possible.",
    "The final image should feel like the second image, but with the first person's face, identity, and natural likeness.",
    "Create a single-person executive portrait for a high-end black-and-white corporate landing page.",
    "Photorealistic, clean skin texture, natural facial structure, sharp focus, subtle filmic contrast, premium editorial quality.",
    "Vertical 3:4 portrait, chest-up or waist-up framing, centered single subject, refined luxury atmosphere.",
    FORCE_VERTICAL ? "Keep the frame clearly vertical and tall. Do not create a square composition. Use a strong portrait crop with visible upper body and extra headroom." : "",
    EXTRA_PROMPT,
    "No extra people, no duplicated fingers, no distorted hands, no text, no watermark, no logo, no wedding scene, no props unless naturally implied by the reference.",
    variantDirection,
  ].filter(Boolean).join(" ");
}

async function extractImageParts(response) {
  const parts = response?.candidates?.flatMap((candidate) => candidate.content?.parts ?? []) ?? [];
  const inlineImageParts = parts.filter((part) => part.inlineData?.data);

  if (inlineImageParts.length === 0) {
    const text = parts.map((part) => part.text).filter(Boolean).join("\n").trim();
    throw new Error(`No image returned by Gemini.${text ? ` Response text: ${text}` : ""}`);
  }

  return inlineImageParts;
}

async function generateVariant(ai, founder, sourceImage, referenceImage, variantIndex) {
  const prompt = buildPrompt(founder, variantIndex);
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        role: "user",
        parts: [
          { text: prompt },
          sourceImage,
          referenceImage,
        ],
      },
    ],
    config: {
      responseModalities: ["Image"],
      imageConfig: {
        aspectRatio: "3:4",
        imageSize: "2K",
      },
    },
  });

  const images = await extractImageParts(response);
  const chosen = images[0];
  const outputBase = path.resolve(founder.inputDir, `candidate-${String(variantIndex + 1).padStart(2, "0")}.png`);
  await fs.writeFile(outputBase, Buffer.from(chosen.inlineData.data, "base64"));

  return outputBase;
}

async function generateForFounder(ai, founder) {
  const sourcePath = await firstImageInDirectory(path.resolve(founder.inputDir));
  const sourceImage = await fileToInlineData(sourcePath);
  const referenceImage = await urlToInlineData(founder.fallbackImageUrl);

  console.log(`Generating ${founder.id} from ${path.relative(process.cwd(), sourcePath)}`);
  const outputs = [];

  for (let variantIndex = 0; variantIndex < VARIANTS_PER_FOUNDER; variantIndex += 1) {
    const output = await generateVariant(ai, founder, sourceImage, referenceImage, variantIndex);
    outputs.push(output);
    console.log(`  saved ${path.relative(process.cwd(), output)}`);
  }

  return outputs;
}

async function runPool(items, worker, concurrency) {
  const pending = [...items];
  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (pending.length > 0) {
      const next = pending.shift();
      if (!next) return;
      await worker(next);
    }
  });

  await Promise.all(runners);
}

async function main() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is required");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const selectedFounders = FOUNDER_IDS.size > 0
    ? founders.filter((founder) => FOUNDER_IDS.has(founder.id))
    : founders;

  if (selectedFounders.length === 0) {
    throw new Error(`No founders matched FOUNDER_IDS=${process.env.FOUNDER_IDS}`);
  }

  await runPool(selectedFounders, (founder) => generateForFounder(ai, founder), CONCURRENCY);
  console.log("Founder portrait generation complete.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
