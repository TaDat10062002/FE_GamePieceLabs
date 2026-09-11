export type AboutHeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  heroImageSrc: string;
  heroImageAlt: string;
};

export type AboutStorySection = {
  eyebrow: string;
  title: string;
  lead: string;
  paragraphs: string[];
  quote: {
    text: string;
    author: string;
    role: string;
  };
};

export type AboutCraftFeature = {
  title: string;
  description: string;
  badge?: string;
};

export type AboutCraftsmanshipSection = {
  eyebrow: string;
  title: string;
  description: string;
  showcaseVideo: {
    type: "local" | "youtube";
    src: string;
    title: string;
  };
  showcaseImageSrc: string;
  showcaseImageAlt: string;
  showcaseCaption: string;
  features: AboutCraftFeature[];
};

export type AboutCoreValue = {
  title: string;
  description: string;
  imageSrc: string;
};

export type AboutValuesSection = {
  eyebrow: string;
  title: string;
  description: string;
  values: AboutCoreValue[];
};

export type AboutStatItem = {
  value: string;
  label: string;
  description?: string;
};

export type AboutStatsSection = {
  title: string;
  items: AboutStatItem[];
};

export type AboutCtaSection = {
  title: string;
  description: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction: {
    label: string;
    href: string;
  };
};

export type AboutPageContent = {
  hero: AboutHeroContent;
  story: AboutStorySection;
  craftsmanship: AboutCraftsmanshipSection;
  values: AboutValuesSection;
  stats: AboutStatsSection;
  cta: AboutCtaSection;
};
