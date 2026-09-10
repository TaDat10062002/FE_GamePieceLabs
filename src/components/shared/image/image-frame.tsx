import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";
import Wrapper from "../wrapper";

/** Tỉ lệ banner dựng sẵn. */
export type ImageFrameAspectRatio = "16/9" | "21/9" | "4/3" | "3/2" | "auto";
/** Semantic heading level cho banner header. */
export type ImageHeaderElementSize = "h1" | "h2" | "h3";
/** Canh nội dung text overlay. */
export type TextAlignType = "left" | "center" | "right";

/** Hero/banner ảnh responsive có thể phủ text và overlay. */
export type ImageFrameProps = {
  /** URL ảnh. Phải được phép bởi `next.config.ts` nếu là remote image. */
  src: string;
  /** Mô tả ảnh cho screen reader; để trống chỉ khi ảnh hoàn toàn trang trí. */
  alt?: string;
  /** Nhãn ngắn hiển thị trên heading, ví dụ: "New collection". */
  eyebrow?: string;
  /** Heading chính hiển thị trên ảnh. */
  header?: string;
  /** Dòng tiêu đề phụ bên dưới heading. */
  title?: string;
  /** Nội dung mô tả ngắn trên banner. */
  description?: string;
  /** Chú thích hiển thị bên dưới khung ảnh. */
  caption?: string;
  /** Semantic heading level của `header`. Mặc định `h1`. */
  headerSize?: ImageHeaderElementSize;
  /** Canh cụm chữ trong banner. Mặc định `left`. */
  textAlign?: TextAlignType;
  /** Tỉ lệ khung dựng sẵn hoặc Tailwind aspect class tùy chỉnh. */
  aspectRatio?: ImageFrameAspectRatio | string;
  /** Tải ảnh ưu tiên; chỉ bật cho ảnh nằm trong màn hình đầu tiên. */
  priority?: boolean;
  /** Quy tắc responsive image size truyền cho `next/image`. */
  sizes?: string;
  /** `true` dùng gradient mặc định; truyền ReactNode để thay bằng overlay tùy chỉnh. */
  overlay?: boolean | ReactNode;
  /** Class cho thẻ `figure` ngoài cùng. */
  containerClassName?: string;
  /** Class cho khung visual của banner. */
  className?: string;
  /** Class áp dụng trực tiếp vào ảnh. */
  imageClassName?: string;
  /** Cách ảnh lấp đầy khung. Mặc định `cover`. */
  objectFit?: "cover" | "contain";
};

const aspectRatioMap: Record<ImageFrameAspectRatio, string> = {
  "16/9": "aspect-video",
  "21/9": "aspect-[4/3] sm:aspect-video lg:aspect-[21/9]",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  auto: "aspect-auto",
};

const headingSizeMap: Record<ImageHeaderElementSize, string> = {
  h1: "type-h1",
  h2: "type-h2",
  h3: "type-h3",
};

const textAlignMap: Record<TextAlignType, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
};

export function ImageFrame({
  src,
  alt = "Frame image",
  eyebrow,
  header,
  title,
  description,
  headerSize = "h1",
  textAlign = "left",
  caption,
  aspectRatio = "21/9",
  priority = false,
  sizes = "(max-width: 640px) calc(100vw - 2rem), (max-width: 1280px) calc(100vw - 3rem), calc(100vw - 100px)",
  overlay,
  containerClassName,
  className,
  imageClassName,
  objectFit = "cover",
}: ImageFrameProps) {
  const HeaderElement = headerSize;
  const hasTextContent = Boolean(eyebrow || header || title || description);
  const aspectClass =
    aspectRatio in aspectRatioMap
      ? aspectRatioMap[aspectRatio as ImageFrameAspectRatio]
      : aspectRatio;

  return (
    <figure
      className={cn(
        "mx-auto w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] xl:w-[calc(100%-100px)] max-w-[1580px]",
        containerClassName,
      )}
    >
      <div
        className={cn(
          "group relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200/80 bg-neutral-950 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:border-neutral-800",
          hasTextContent && "min-h-[360px] sm:min-h-[420px] lg:min-h-[500px]",
          aspectClass,
          className,
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(
            "transition-transform duration-700 ease-out group-hover:scale-[1.02]",
            objectFit === "contain" ? "object-contain" : "object-cover",
            imageClassName,
          )}
        />

        {overlay ? (
          typeof overlay === "boolean" ? (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
            />
          ) : (
            overlay
          )
        ) : hasTextContent ? (
          <div aria-hidden="true" className="absolute inset-0 bg-black/50" />
        ) : null}

        {hasTextContent ? (
          <div
            className={cn(
              "absolute inset-0 z-10 flex flex-col justify-center text-white  max-sm:text-center",
              textAlignMap[textAlign],
            )}
          >
            <Wrapper>
              {eyebrow ? (
                <p className="type-eyebrow mb-3 text-white/90 drop-shadow-sm">
                  {eyebrow}
                </p>
              ) : null}

              {header ? (
                <HeaderElement
                  className={cn(
                    "max-w-4xl text-balance drop-shadow-sm max-sm:w-full max-sm:self-center max-sm:text-center",
                    headingSizeMap[headerSize],
                  )}
                >
                  {header}
                </HeaderElement>
              ) : null}

              {title ? (
                <p className="mt-4 max-w-[38ch] text-balance text-lg font-semibold leading-snug drop-shadow-sm sm:mt-6 sm:text-xl lg:mt-8 lg:text-2xl">
                  {title}
                </p>
              ) : null}

              {description ? (
                <p
                  className={cn(
                    "type-prose max-w-2xl text-base text-white/90 drop-shadow-sm lg:text-lg",
                    header && !title ? "mt-4 sm:mt-6 lg:mt-8" : "mt-3 sm:mt-4",
                  )}
                >
                  {description}
                </p>
              ) : null}
            </Wrapper>
          </div>
        ) : null}
      </div>

      {caption ? (
        <figcaption className="mx-auto mt-3 max-w-[65ch] text-center text-sm font-medium leading-relaxed text-neutral-500 dark:text-neutral-400">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
