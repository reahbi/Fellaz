import foundersConfig from "../../founders.config.json";

export type FounderPosition = "left" | "right";

export interface Founder {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  jobPosition: string;
  description: string;
  position: FounderPosition;
  fallbackImageUrl: string;
  inputDir: string;
  outputImagePath: string;
  publicImageUrl: string;
}

export const founders: Founder[] = foundersConfig.map((founder) => ({
  ...founder,
  position: founder.position as FounderPosition,
}));
