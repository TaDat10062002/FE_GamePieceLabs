"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/utils/cn";

export type ImageSliderSlide = {
  /** ID ổn định dùng làm React key. */
  id: string | number;
  /** Heading hiển thị trên slide. */
  title: string;
  /** Dòng mô tả tùy chọn dưới heading. */
  subtitle?: string;
  /** URL/path ảnh nền slide. */
  imageSrc: string;
  /** Alt text mô tả ảnh. */
  imageAlt: string;
  /** Nhãn CTA dẫn tới `ctaHref`. */
  ctaLabel: string;
  /** Đích điều hướng của CTA. */
  ctaHref: string;
};

/** Carousel hero/image campaign có CTA cho từng slide. */
export type ImageSliderProps = {
  /** Danh sách slide, ít nhất một phần tử để hiển thị nội dung. */
  slides: readonly ImageSliderSlide[];
  /** Tự chuyển slide. Mặc định `true`. */
  autoplay?: boolean;
  /** Thời gian giữa các lần tự chuyển, tính bằng ms. */
  autoplayInterval?: number;
  /** Nhãn accessibility cho carousel. */
  ariaLabel?: string;
  /** Class cho carousel wrapper. */
  className?: string;
};

const liquidGlassNavigationButton =
  "static inset-auto m-0 size-10 overflow-hidden border border-white/45 bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(255,255,255,0.15),0_8px_24px_rgba(15,23,42,0.3)] backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 before:pointer-events-none before:absolute before:inset-px before:rounded-full before:bg-gradient-to-br before:from-white/50 before:via-white/10 before:to-transparent before:opacity-80 hover:scale-105 hover:border-white/70 hover:bg-white/25 hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_-1px_0_rgba(255,255,255,0.2),0_10px_28px_rgba(15,23,42,0.38)] active:scale-95 focus-visible:ring-white/80 [&_svg]:relative [&_svg]:z-10 sm:size-12";

export function ImageSlider({
  slides,
  autoplay = true,
  autoplayInterval = 10000,
  ariaLabel = "Featured collections",
  className,
}: ImageSliderProps) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api || !autoplay || slides.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      api.scrollNext();
    }, autoplayInterval);

    return () => window.clearInterval(intervalId);
  }, [api, autoplay, autoplayInterval, slides.length]);

  if (slides.length === 0) {
    return null;
  }

  const hasMultipleSlides = slides.length > 1;

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: hasMultipleSlides }}
      aria-label={ariaLabel}
      className={cn(
        "pc:w-[clamp(1600px,83.333vw,1600px)] mx-auto mt-10 overflow-hidden rounded-xl shadow-[0_18px_60px_rgba(15,23,42,0.16)]",
        className,
      )}
    >
      <CarouselContent className="ml-0">
        {slides.map((slide, index) => (
          <CarouselItem key={slide.id} className="pl-0">
            <div className="relative min-h-[280px] sm:min-h-[340px] md:min-h-[400px] lg:min-h-[460px] xl:min-h-[570px]">
              <Image
                src={slide.imageSrc}
                alt={slide.imageAlt}
                fill
                preload={index === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-transparent"
              />
              <div className="relative z-10 flex min-h-[280px] max-w-3xl flex-col items-start justify-center p-5 pb-12 text-white sm:min-h-[340px] sm:p-8 sm:pb-14 md:min-h-[400px] md:p-10 md:pb-16 lg:min-h-[460px] lg:p-12 xl:min-h-[500px]">
                <h2 className="max-sm:text-center max-sm:text-3xl font-heading text-[clamp(1.375rem,1.1rem+1.35vw,1.75rem)] leading-[1.08] font-bold tracking-[-0.025em] md:max-w-[19ch] md:text-[clamp(2rem,1.43rem+1.19vw,2.5rem)] md:leading-[1.06] lg:max-w-[18ch] lg:text-[clamp(2.5rem,1.5rem+1.56vw,3rem)] lg:leading-[1.04]">
                  {slide.title}
                </h2>
                <p className="mt-2 max-w-[58ch] text-pretty text-base leading-[1.5] text-white/90 line-clamp-2 sm:mt-3 sm:line-clamp-none md:text-[1.0625rem] md:leading-[1.55] lg:text-lg lg:leading-[1.6]">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.ctaHref}
                  className="max-sm:absolute max-sm:bottom-10 max-sm:left-1/2 max-sm:-translate-x-1/2 mt-3 inline-flex min-h-11 items-center rounded-full bg-white px-4 py-4 text-md leading-[1.35] font-bold text-neutral-950 shadow-md transition-all hover:bg-neutral-100 hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 sm:mt-5 sm:px-5 sm:py-5 md:text-base lg:min-h-12 lg:px-6 lg:text-lg"
                >
                  {slide.ctaLabel}
                </Link>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="absolute inset-x-0 bottom-3 sm:bottom-4 z-20 flex justify-center gap-1.5 sm:gap-2">
        <div className="absolute right-4 bottom-0 hidden items-center gap-2 sm:flex">
          <CarouselPrevious className={liquidGlassNavigationButton} />
          <CarouselNext className={liquidGlassNavigationButton} />
        </div>
      </div>
    </Carousel>
  );
}
