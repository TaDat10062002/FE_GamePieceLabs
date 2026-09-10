"use client";

import { useCallback, useEffect, useState } from "react";

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ProductCard,
  type ProductCardProps,
} from "@/components/shared/product/product-card";
import { cn } from "@/utils/cn";
import { ProductThumbnail, ProductThumbnailImage } from "./product-thumbnail";

interface ProductGalleryBaseProps {
  /** Class cho carousel wrapper. */
  className?: string;
}

/** Carousel card sản phẩm nổi bật, dùng cho storefront section. */
export interface FeaturedProductGalleryProps extends ProductGalleryBaseProps {
  /** Chọn layout carousel card sản phẩm. */
  type: "featured";
  /** Dữ liệu sản phẩm để render bằng `ProductCard`. */
  images: readonly ProductCardProps[];
}

/** Dải thumbnail cho product detail; desktop dọc, mobile ngang. */
export interface DetailProductGalleryProps extends ProductGalleryBaseProps {
  /** Chọn layout thumbnail product detail. */
  type: "detail";
  /** Danh sách ảnh thumbnail. */
  images: readonly ProductThumbnailImage[];
  /** Index ảnh được chọn theo controlled parent state. */
  selectedIndex?: number;
  /** Nhận ảnh/index mới khi người dùng click thumbnail hoặc kéo carousel. */
  onImageSelect?: (image: ProductThumbnailImage, index: number) => void;
}

/** Union theo `type`; không trộn props của featured và detail. */
export type ProductGalleryProps =
  | FeaturedProductGalleryProps
  | DetailProductGalleryProps;

export function ProductGallery(props: ProductGalleryProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [isMobileDetail, setIsMobileDetail] = useState(false);
  const detailImages = props.type === "detail" ? props.images : null;
  const detailOnImageSelect =
    props.type === "detail" ? props.onImageSelect : undefined;

  useEffect(() => {
    if (props.type !== "detail") {
      return;
    }

    const mobileMediaQuery = window.matchMedia("(max-width: 639px)");
    const updateDetailOrientation = (): void => {
      setIsMobileDetail(mobileMediaQuery.matches);
    };

    updateDetailOrientation();
    mobileMediaQuery.addEventListener("change", updateDetailOrientation);

    return () => {
      mobileMediaQuery.removeEventListener("change", updateDetailOrientation);
    };
  }, [props.type]);

  const syncSelectedImage = useCallback(
    (api: CarouselApi): void => {
      if (!api || !detailImages?.length) {
        return;
      }

      const originalIndex = api.selectedScrollSnap() % detailImages.length;
      const selectedImage = detailImages[originalIndex];

      if (selectedImage) {
        detailOnImageSelect?.(selectedImage, originalIndex);
      }
    },
    [detailImages, detailOnImageSelect],
  );

  useEffect(() => {
    if (!carouselApi || !detailImages) {
      return;
    }

    carouselApi.on("select", syncSelectedImage);

    return () => {
      carouselApi.off("select", syncSelectedImage);
    };
  }, [carouselApi, detailImages, syncSelectedImage]);

  if (props.images.length === 0) {
    return null;
  }

  if (props.type === "featured") {
    return (
      <Carousel
        opts={{ align: "start", dragFree: true }}
        aria-label="Sản phẩm nổi bật"
        className={cn("w-full", props.className)}
      >
        <CarouselContent className="-ml-2">
          {props.images.map((product) => (
            <CarouselItem
              key={`${product.slug}-${product.gui}`}
              className="basis-[88%] pl-2 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <ProductCard {...product} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-3 z-20 size-12 border-0 bg-white text-neutral-950 shadow-lg hover:bg-neutral-100 disabled:hidden" />
        <CarouselNext className="right-3 z-20 size-12 border-0 bg-white text-neutral-950 shadow-lg hover:bg-neutral-100 disabled:hidden" />
      </Carousel>
    );
  }

  const loopImages = [0, 1].flatMap((copy) =>
    props.images.map((image, originalIndex) => ({
      copy,
      image,
      originalIndex,
    })),
  );

  return (
    <Carousel
      orientation={isMobileDetail ? "horizontal" : "vertical"}
      opts={{ align: "start", dragFree: true, loop: true }}
      setApi={setCarouselApi}
      aria-label="Ảnh thu nhỏ của sản phẩm"
      className={cn(
        "flex w-full flex-row items-center gap-2 sm:flex-col sm:gap-1 [&_[data-slot=carousel-content]]:h-auto [&_[data-slot=carousel-content]]:w-full sm:[&_[data-slot=carousel-content]]:h-76",
        props.className,
      )}
    >
      <CarouselPrevious className="static top-auto left-auto z-20 size-7 shrink-0 translate-x-0 border-0 bg-white text-neutral-950 shadow-lg hover:bg-neutral-100 disabled:hidden sm:rotate-90" />

      <CarouselContent
        className={cn("h-full w-full", isMobileDetail ? "-ml-1" : "-mt-1")}
      >
        {loopImages.map(({ copy, image, originalIndex }) => (
          <CarouselItem
            key={`${image.id}-copy-${copy}`}
            className={cn(isMobileDetail ? "basis-16 pl-1" : "basis-1/4 pt-1")}
          >
            <ProductThumbnail
              image={image}
              isSelected={props.selectedIndex === originalIndex}
              onSelect={(selectedImage) =>
                props.onImageSelect?.(selectedImage, originalIndex)
              }
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselNext className="static right-auto bottom-auto left-auto z-20 size-7 shrink-0 translate-x-0 border-0 bg-white text-neutral-950 shadow-lg hover:bg-neutral-100 disabled:hidden sm:rotate-90" />
    </Carousel>
  );
}
