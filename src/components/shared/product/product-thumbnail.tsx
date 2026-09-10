"use client";

import Image from "next/image";

import { cn } from "@/utils/cn";

export interface ProductThumbnailImage {
  /** ID ổn định của ảnh, dùng cho key và selection. */
  id: string;
  /** URL/path ảnh thumbnail. */
  src: string;
  /** Alt text mô tả ảnh. */
  alt: string;
}

/** Nút thumbnail chọn ảnh trong product detail gallery. */
export interface ProductThumbnailProps {
  /** Dữ liệu ảnh cần hiển thị. */
  image: ProductThumbnailImage;
  /** Đánh dấu thumbnail đang được chọn. */
  isSelected?: boolean;
  /** Callback khi người dùng chọn thumbnail. */
  onSelect?: (image: ProductThumbnailImage) => void;
}

export function ProductThumbnail({
  image,
  isSelected = false,
  onSelect,
}: ProductThumbnailProps) {
  return (
    <button
      type="button"
      aria-label={`Xem ${image.alt}`}
      aria-pressed={isSelected}
      onClick={() => onSelect?.(image)}
      className={cn(
        "relative block aspect-square w-full overflow-hidden rounded-lg border-2 bg-neutral-100 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2",
        isSelected
          ? "border-red-700 shadow-sm"
          : "border-transparent opacity-70 hover:border-neutral-300 hover:opacity-100",
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        unoptimized
        sizes="72px"
        className="object-cover"
      />
    </button>
  );
}
