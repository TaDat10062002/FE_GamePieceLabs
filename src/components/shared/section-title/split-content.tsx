import type { ReactElement } from "react";

import { ImageFrame } from "@/components/shared/image/image-frame";
import { cn } from "@/utils/cn";

import { createSectionTitleId, SectionHeading } from "./section-heading";
import type {
  SectionTitleHorizonSplitProps,
  SectionTitleSplitProps,
  SectionTitleVerticalSplitProps,
} from "./types";

function HorizonSplitContentSection({
  children,
  className,
  contentPosition = "right",
  image,
}: SectionTitleHorizonSplitProps): ReactElement {
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-[1900px] px-4 sm:px-6 xl:px-[50px]",
        className,
      )}
    >
      <div className="mx-auto grid w-full overflow-hidden rounded-2xl bg-white sm:max-w-[620px] sm:rounded-3xl lg:max-w-[940px] lg:grid-cols-12 xl:max-w-[1580px]">
        <div
          className={cn(
            "lg:col-span-6",
            contentPosition === "left" && "lg:order-2",
          )}
        >
          <ImageFrame
            src={image.src}
            alt={image.alt}
            aspectRatio={image.aspectRatio ?? "aspect-square"}
            sizes="(max-width: 1023px) calc(100vw - 3rem), (max-width: 1919px) 50vw, 790px"
            containerClassName="w-full max-w-none sm:w-full xl:w-full"
            className="rounded-none border-0 shadow-none sm:rounded-none"
          />
        </div>

        <div
          className={cn(
            "flex items-center justify-center px-6 py-14 sm:px-10 sm:py-16 lg:col-span-6 lg:px-12 lg:py-10 xl:px-20",
            contentPosition === "left" && "lg:order-1",
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

function VerticalSplitContentSection({
  title,
  headingLevel,
  ariaLabel,
  more,
  align,
  children,
  className,
}: SectionTitleVerticalSplitProps): ReactElement {
  const titleId = title ? createSectionTitleId(title) : undefined;

  return (
    <section
      aria-labelledby={titleId}
      aria-label={title ? undefined : ariaLabel}
      className={cn(
        "mx-auto w-full max-w-[1900px] px-4 sm:px-6 xl:px-[50px]",
        className,
      )}
    >
      <div className="mx-auto w-full sm:max-w-[620px] lg:max-w-[940px] xl:max-w-[1580px]">
        {title && titleId ? (
          <SectionHeading
            title={title}
            titleId={titleId}
            headingLevel={headingLevel}
            more={more}
            align={align}
            orientation="vertical"
            className="mb-6 sm:mb-10"
          />
        ) : null}

        {children}
      </div>
    </section>
  );
}

export function   SplitContentSection(
  props: SectionTitleSplitProps,
): ReactElement {
  switch (props.orientation) {
    case "vertical":
      return <VerticalSplitContentSection {...props} />;
    case "horizon":
    default:
      return <HorizonSplitContentSection {...props} />;
  }
}
