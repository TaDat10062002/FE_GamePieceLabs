import type { AboutValuesSection } from "@/features/about/types/about-content";
import { AboutProductDnaCard } from "@/features/about/components/about-product-dna-card";

type AboutValuesProps = {
  content: AboutValuesSection;
};

export function AboutValues({ content }: AboutValuesProps) {
  return (
    <section className="bg-white py-12 sm:py-14 lg:py-20">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-[1580px] sm:w-[calc(100%-3rem)] xl:w-[calc(100%-100px)]">
        <div className="mx-auto max-w-[760px] text-center">
          <h2
            className="text-4xl font-bold leading-[1.1] tracking-normal text-neutral-950 sm:text-5xl lg:text-[48px]"
            style={{ textWrap: "wrap" }}
          >
            {content.title}
          </h2>
          <p className="mx-auto mt-8 max-w-[720px] text-center text-[16px] font-medium leading-[1.8] text-neutral-800">
            {content.description}
          </p>
        </div>

        <div className="mt-14 grid gap-14 md:grid-cols-3 xl:gap-28">
          {content.values.map((value) => (
            <AboutProductDnaCard key={value.title} value={value} />
          ))}
        </div>
      </div>
    </section>
  );
}
