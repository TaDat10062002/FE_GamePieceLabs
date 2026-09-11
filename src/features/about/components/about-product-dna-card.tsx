import Image from "next/image";
import type { AboutCoreValue } from "@/features/about/types/about-content";

type AboutProductDnaCardProps = {
  value: AboutCoreValue;
};

export function AboutProductDnaCard({ value }: AboutProductDnaCardProps) {
  return (
    <article className="text-center">
      <div className="relative aspect-[414/477] overflow-hidden rounded-lg bg-neutral-100">
        <Image
          src={value.imageSrc}
          alt={value.title}
          fill
          sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) 30vw, 414px"
          className="object-cover"
        />
      </div>
      <h3 className="mt-7 text-[28px] font-bold leading-tight tracking-normal text-neutral-950">
        {value.title}
      </h3>
      <p className="mx-auto mt-5 max-w-[38ch] text-[16px] font-medium leading-[1.7] text-neutral-800">
        {value.description}
      </p>
    </article>
  );
}
