import type { AboutPageContent } from "@/features/about/types/about-content";
import { AboutHero } from "@/features/about/components/about-hero";
import { AboutStory } from "@/features/about/components/about-story";
import { AboutCraftsmanship } from "@/features/about/components/about-craftsmanship";
import { AboutValues } from "@/features/about/components/about-values";

type AboutPageProps = {
  content: AboutPageContent;
};

export function AboutPage({ content }: AboutPageProps) {
  return (
    <main className="bg-white text-neutral-950">
      <AboutHero content={content.hero} />
      <AboutStory content={content.story} />
      <AboutCraftsmanship content={content.craftsmanship} />
      <AboutValues content={content.values} />
    </main>
  );
}
