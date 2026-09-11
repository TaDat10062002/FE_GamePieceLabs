import Image from "next/image";
import type { AboutHeroContent } from "@/features/about/types/about-content";

type AboutHeroProps = {
  content: AboutHeroContent;
};

export function AboutHero({ content }: AboutHeroProps) {
  return (
    <section className="relative overflow-hidden pt-2 pb-10 sm:pt-4 sm:pb-14 lg:pt-6 lg:pb-20">
      <div className="mx-auto mt-4 w-[calc(100%-2rem)] max-w-[1580px] sm:mt-8 sm:w-[calc(100%-3rem)] lg:mt-3 xl:w-[calc(100%-100px)]">
        <div className="relative aspect-[4/3] min-h-[360px] overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-950 shadow-2xl sm:aspect-video sm:min-h-[420px] sm:rounded-3xl lg:aspect-[21/9] lg:min-h-[500px]">
          <Image
            src={content.heroImageSrc}
            alt={content.heroImageAlt}
            fill
            priority
            sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1280px) calc(100vw - 3rem), calc(100vw - 100px)"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-black/60" />

          <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center text-white sm:px-10">
            <div className="mx-auto max-w-[58rem]">
              <p className="type-eyebrow mx-auto mb-8 max-w-[36rem] text-white/90 drop-shadow-sm sm:mb-10">
                {content.eyebrow}
              </p>
              <h1 className="mx-auto max-w-[18ch] text-balance text-5xl font-extrabold leading-[1.08] tracking-normal drop-shadow-sm sm:text-6xl lg:max-w-[21ch] lg:text-[4.5rem]">
                {content.title}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
