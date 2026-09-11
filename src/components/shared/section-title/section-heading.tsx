import type { ReactElement } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/utils/cn";

import type {
  SectionTitleAlign,
  SectionTitleHeadingLevel,
  SectionTitleMore,
  SectionTitleOrientation,
} from "./types";

interface SectionHeadingProps {
  title: string;
  titleId: string;
  headingLevel?: SectionTitleHeadingLevel;
  more?: SectionTitleMore;
  align?: SectionTitleAlign;
  orientation?: SectionTitleOrientation;
  className?: string;
}

const titleAlignmentClasses: Record<SectionTitleAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const verticalAlignmentClasses: Record<SectionTitleAlign, string> = {
  left: "items-start",
  center: "items-center",
  right: "items-end",
};

const headingSizeClasses: Record<SectionTitleHeadingLevel, string> = {
  h1: "text-5xl",
  h2: "text-4xl",
  h3: "text-3xl",
  h4: "text-2xl",
  h5: "text-xl",
  h6: "text-lg",
};

export function createSectionTitleId(title: string): string {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return `${slug || "section"}-title`;
}

export function SectionHeading({
  title,
  titleId,
  headingLevel = "h2",
  more,
  align = "left",
  orientation = "horizon",
  className,
}: SectionHeadingProps): ReactElement {
  const HeadingTag = headingLevel;

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-3",
        orientation === "horizon"
          ? "sm:flex-row sm:items-center sm:justify-between sm:gap-5"
          : verticalAlignmentClasses[align],
        className,
      )}
    >
      <HeadingTag
        id={titleId}
        className={cn(
          "m-0 min-w-0 flex-1 font-bold text-neutral-950",
          headingSizeClasses[headingLevel],
          titleAlignmentClasses[align],
        )}
      >
        {title}
      </HeadingTag>

      {more ? (
        <Link
          href={more.href || "#"}
          className="group inline-flex w-fit items-center gap-2 rounded-full text-xs font-medium text-neutral-950 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 sm:text-sm"
        >
          {/* Thẻ span bọc chữ để chạy hiệu ứng line */}
          <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[0.8px] after:w-full after:origin-left after:scale-x-0 after:bg-black after:transition-transform after:duration-500 group-hover:after:scale-x-100">
            {more.label}
          </span>

          {/* Icon ChevronRight giữ nguyên bên ngoài */}
          <span className="flex size-5 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 transition-colors">
            <ChevronRight className="size-3" aria-hidden="true" />
          </span>
        </Link>
      ) : null}
    </div>
  );
}
