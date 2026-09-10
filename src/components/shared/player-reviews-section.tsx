'use client';

import * as React from 'react';
import Image from 'next/image';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import type {
    PlayerReviewContent,
    PlayerReviewImage,
    PlayerReviewsVariant,
} from '@/features/home/types/player-review';
import { cn } from '@/utils/cn';

/** Carousel testimonial cho homepage; `variant` quyết định data list được dùng. */
export interface PlayerReviewsSectionProps {
    /** Class cho section ngoài cùng. */
    className?: string;
    /** `image` dùng imageList; variant khác dùng contentList. */
    variant: PlayerReviewsVariant;
    /** Review có ảnh; chỉ render khi `variant` là `image`. */
    imageList: readonly PlayerReviewImage[];
    /** Review dạng text; chỉ render khi variant không phải `image`. */
    contentList: readonly PlayerReviewContent[];
}

export function PlayerReviewsSection({
    className,
    variant,
    imageList,
    contentList,
}: PlayerReviewsSectionProps) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((emblaApi: CarouselApi) => {
        if (!emblaApi) return;
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, []);

    React.useEffect(() => {
        if (!api) return;

        const timeoutId = window.setTimeout(() => onSelect(api), 0);
        api.on('reInit', onSelect);
        api.on('select', onSelect);

        return () => {
            window.clearTimeout(timeoutId);
            api.off('reInit', onSelect);
            api.off('select', onSelect);
        };
    }, [api, onSelect]);

    return (
        <section
            className={cn('w-full py-12 sm:py-16 md:py-20', className)}
            aria-label="Player Reviews"
        >
            <div className="mx-auto max-w-[1900px] px-4 sm:px-6 xl:px-[50px]">
                {/* Title and Top Navigation */}
                <div className="mb-8 flex items-center justify-between gap-3 sm:mb-12">
                    <h2 className="type-h2 min-w-0 text-neutral-900">
                        What Our Players Said
                    </h2>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => api?.scrollPrev()}
                            disabled={!canScrollPrev}
                            aria-label="Previous reviews"
                            className="flex size-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-800 shadow-sm transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30 sm:size-10"
                        >
                            <ChevronLeft className="size-4 sm:size-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => api?.scrollNext()}
                            disabled={!canScrollNext}
                            aria-label="Next reviews"
                            className="flex size-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-800 shadow-sm transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30 sm:size-10"
                        >
                            <ChevronRight className="size-4 sm:size-5" />
                        </button>
                    </div>
                </div>

                {/* Carousel */}
                <Carousel
                    setApi={setApi}
                    opts={{
                        align: 'start',
                        containScroll: 'trimSnaps',
                        dragFree: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4 sm:-ml-6">
                        {variant === 'image'
                            ? imageList.map((review) => (
                                <CarouselItem
                                    key={review.id}
                                    className="basis-[88%] pl-4 sm:basis-[48%] lg:basis-[32%] sm:pl-6"
                                >
                                    <figure className="group relative min-h-[320px] overflow-hidden rounded-lg sm:min-h-[360px]">
                                        <Image
                                            src={review.imageSrc}
                                            alt={review.imageAlt}
                                            fill
                                            sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 88vw"
                                            className="object-cover transition-transform duration-300"
                                        />
                                        <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 to-transparent px-6 pb-6 pt-16 text-white sm:px-8 sm:pb-8">
                                            <div
                                                className="mb-2 flex items-center gap-1 text-amber-400"
                                                aria-label={`${review.rating} out of 5 stars`}
                                            >
                                                {Array.from({ length: review.rating }, (_, star) => (
                                                    <Star
                                                        key={`${review.id}-image-star-${star + 1}`}
                                                        className="size-4 fill-amber-400 text-amber-400"
                                                    />
                                                ))}
                                            </div>
                                            <h3 className="type-h6">
                                                {review.author}
                                            </h3>
                                        </figcaption>
                                    </figure>
                                </CarouselItem>
                            ))
                            : contentList.map((review) => (
                                <CarouselItem
                                    key={review.id}
                                    className="basis-[88%] pl-4 sm:basis-[48%] lg:basis-[32%] sm:pl-6"
                                >
                                    <div className="flex h-full min-h-[320px] flex-col rounded-lg p-6 text-neutral-900 sm:min-h-[360px] sm:p-8">
                                        {/* Star Rating */}
                                        <div
                                            className="mb-4 flex items-center gap-1 text-amber-500"
                                            aria-label={`${review.rating} out of 5 stars`}
                                        >
                                            {Array.from({ length: review.rating }, (_, star) => (
                                                <Star
                                                    key={`${review.id}-content-star-${star + 1}`}
                                                    className="size-4 fill-amber-500 text-amber-500"
                                                />
                                            ))}
                                        </div>

                                        {/* Author */}
                                        <h3 className="type-h6 mb-3 text-neutral-950">
                                            {review.author}
                                        </h3>

                                        {/* Content Paragraphs */}
                                        <div className="type-prose space-y-4 text-base text-neutral-800">
                                            {review.paragraphs.map((paragraph) => (
                                                <p key={paragraph}>{paragraph}</p>
                                            ))}
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
}
