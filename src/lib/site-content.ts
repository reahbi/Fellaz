import foundersConfig from "../../founders.config.json";

export type Locale = "en" | "ko";
export type FounderPosition = "left" | "right";

interface FounderBase {
  id: string;
  fallbackImageUrl: string;
  inputDir: string;
  outputImagePath: string;
  publicImageUrl: string;
  position: FounderPosition;
}

export interface FounderContent extends FounderBase {
  firstName: string;
  lastName: string;
  fullName: string;
  jobPosition: string;
  description: string;
}

interface SiteCopy {
  nav: {
    about: string;
    founders: string;
    contact: string;
  };
  hero: {
    line1: string;
    line2: string;
    compact?: boolean;
  };
  about: {
    titleLines: string[];
    body: string;
  };
  founders: {
    title: string;
    meta: string;
  };
  footer: {
    copyright: string;
    links: {
      x: string;
      instagram: string;
      linkedin: string;
    };
  };
}

const founderBaseMap = foundersConfig.reduce<Record<string, FounderBase>>((accumulator, founder) => {
  accumulator[founder.id] = {
    id: founder.id,
    fallbackImageUrl: founder.fallbackImageUrl,
    inputDir: founder.inputDir,
    outputImagePath: founder.outputImagePath,
    publicImageUrl: founder.publicImageUrl,
    position: founder.position as FounderPosition,
  };
  return accumulator;
}, {});

const founderLocaleContent: Record<Locale, Record<string, Omit<FounderContent, keyof FounderBase>>> = {
  en: {
    kimyunho: {
      firstName: "Kim",
      lastName: "Yunho",
      fullName: "Kim Yunho",
      jobPosition: "CEO",
      description:
        "Leads investment strategy across healthcare services, medical infrastructure, and scalable care platforms with a focus on durable enterprise value.",
    },
    kimchanghyun: {
      firstName: "Changhyun",
      lastName: "Kim",
      fullName: "Changhyun Kim",
      jobPosition: "CEO",
      description:
        "Drives execution across platform operations, commercialization, and data-led expansion to turn clinical opportunity into disciplined business growth.",
    },
    leesanghyun: {
      firstName: "Sanghyun",
      lastName: "Lee",
      fullName: "Sanghyun Lee",
      jobPosition: "CEO",
      description:
        "Shapes product direction for healthcare ventures where trust, clarity, and patient-centered experience are essential to adoption and long-term retention.",
    },
    jungjaehyub: {
      firstName: "Jaehyup",
      lastName: "Jung",
      fullName: "Jaehyup Jung",
      jobPosition: "CEO",
      description:
        "Oversees operational scale, strategic partnerships, and institutional readiness so portfolio businesses can expand with control and credibility.",
    },
  },
  ko: {
    kimyunho: {
      firstName: "Kim",
      lastName: "Yunho",
      fullName: "Kim Yunho",
      jobPosition: "대표",
      description:
        "헬스케어 서비스, 의료 인프라, 확장 가능한 케어 플랫폼 전반의 투자 전략을 총괄하며 지속 가능한 기업가치 창출에 집중합니다.",
    },
    kimchanghyun: {
      firstName: "Changhyun",
      lastName: "Kim",
      fullName: "Changhyun Kim",
      jobPosition: "대표",
      description:
        "플랫폼 운영, 사업화, 데이터 기반 확장을 이끌며 의료 시장의 기회를 견고한 비즈니스 성장으로 전환하는 실행을 담당합니다.",
    },
    leesanghyun: {
      firstName: "Sanghyun",
      lastName: "Lee",
      fullName: "Sanghyun Lee",
      jobPosition: "대표",
      description:
        "신뢰와 명확성이 중요한 의료 비즈니스에서 제품 방향성과 사용자 경험을 설계하며 장기적인 고객 유지 기반을 만듭니다.",
    },
    jungjaehyub: {
      firstName: "Jaehyup",
      lastName: "Jung",
      fullName: "Jaehyup Jung",
      jobPosition: "대표",
      description:
        "운영 확장, 전략적 파트너십, 기관 대응 체계를 총괄하며 포트폴리오 기업이 안정적으로 성장할 수 있는 기반을 구축합니다.",
    },
  },
};

export const siteCopy: Record<Locale, SiteCopy> = {
  en: {
    nav: {
      about: "About",
      founders: "Founders",
      contact: "Contact",
    },
    hero: {
      line1: "Backing healthcare ventures with disciplined capital and operational conviction.",
      line2: "Built by four healthcare builders.",
      compact: true,
    },
    about: {
      titleLines: ["Healthcare", "Capital & Scale"],
      body:
        "We invest in medical and healthcare businesses with a bias for execution, compliance strength, and long-term defensibility. Our thesis centers on clinical infrastructure, digital health platforms, and service models that can improve patient outcomes while compounding enterprise value.",
    },
    founders: {
      title: "Leadership",
      meta: "Healthcare / Investment / Seoul",
    },
    footer: {
      copyright: "© 2026 FELLAZ Inc. All rights reserved.",
      links: {
        x: "X",
        instagram: "Instagram",
        linkedin: "LinkedIn",
      },
    },
  },
  ko: {
    nav: {
      about: "소개",
      founders: "리더십",
      contact: "문의",
    },
    hero: {
      line1: "헬스케어와 의료 비즈니스에 규율 있는 자본과 실행력을 투자합니다.",
      line2: "네 명의 헬스케어 전문가가 이끄는 플랫폼입니다.",
    },
    about: {
      titleLines: ["의료 비즈니스를 위한", "자본과 확장 전략"],
      body:
        "우리는 의료와 헬스케어 분야에서 실행력, 규제 대응 역량, 장기 경쟁력을 갖춘 비즈니스에 집중합니다. 투자 관점은 임상 인프라, 디지털 헬스 플랫폼, 의료 서비스 모델에 있으며, 환자 성과를 높이면서도 견고한 기업가치를 만드는 구조를 선호합니다.",
    },
    founders: {
      title: "경영진",
      meta: "헬스케어 / 투자 / 서울",
    },
    footer: {
      copyright: "© 2026 FELLAZ Inc. 모든 권리 보유.",
      links: {
        x: "엑스",
        instagram: "인스타그램",
        linkedin: "링크드인",
      },
    },
  },
};

export function getFounders(locale: Locale): FounderContent[] {
  const localizedFounders = founderLocaleContent[locale];

  return foundersConfig.map((founder) => ({
    ...founderBaseMap[founder.id],
    ...localizedFounders[founder.id],
  }));
}
