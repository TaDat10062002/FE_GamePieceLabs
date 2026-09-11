import type { ReactElement } from "react";

import { cn } from "@/utils/cn";

import { createSectionTitleId, SectionHeading } from "./section-heading";
import type { SectionTitleMoreProps } from "./types";

export function TextContentSection({
  title,
  headingLevel,
  more,
  align,
  orientation,
  children,
  className,
}: SectionTitleMoreProps): ReactElement {
  const titleId = createSectionTitleId(title);

  return (
    <section
      aria-labelledby={titleId}
      className={cn("mx-auto w-full max-w-[1900px]", className)}
    >
      <div className="w-full sm:max-w-[620px] lg:max-w-[940px] xl:max-w-[1580px]">
        <SectionHeading
          title={title}
          titleId={titleId}
          headingLevel={headingLevel}
          more={more}
          align={align}
          orientation={orientation}
          className="sm:mb-5"
        />

        {children}
      </div>
    </section>
  );
}
