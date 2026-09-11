import type { AboutCraftsmanshipSection } from "@/features/about/types/about-content";
import { VideoFrame } from "@/components/shared/video-frame";

type AboutCraftsmanshipProps = {
  content: AboutCraftsmanshipSection;
};

export function AboutCraftsmanship({ content }: AboutCraftsmanshipProps) {
  return (
    <section className="bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-[1580px] sm:w-[calc(100%-3rem)] xl:w-[calc(100%-100px)]">
        <div className="overflow-hidden rounded-xl border border-neutral-200/80 bg-white">
          <div className="grid items-stretch lg:grid-cols-[minmax(0,1.03fr)_minmax(520px,0.97fr)]">
            <div className="h-full">
              <VideoFrame
                type={content.showcaseVideo.type}
                src={content.showcaseVideo.src}
                title={content.showcaseVideo.title}
              />
            </div>

            <div className="flex items-center justify-center border-t border-neutral-200/70 px-6 py-10 sm:px-10 lg:border-t-0 lg:border-l lg:px-10 xl:px-12">
              <div className="mx-auto w-full max-w-[660px] text-center">
                <h2
                  className="mx-auto max-w-[573px] text-4xl font-bold leading-[1.1] tracking-normal text-neutral-950 sm:text-5xl lg:text-[48px]"
                  style={{ textWrap: "wrap" }}
                >
                  {content.title}
                </h2>

                <p className="mx-auto mt-8 max-w-[640px] text-center text-[16px] font-medium leading-[1.95] text-neutral-800">
                  {content.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
