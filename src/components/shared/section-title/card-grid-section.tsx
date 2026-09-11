import type { ReactElement } from "react";

import { CardImageTitleGrid } from "@/components/shared/card-image-title";
import { cn } from "@/utils/cn";

import { createSectionTitleId, SectionHeading } from "./section-heading";
import type { SectionTitleMoreProps } from "./types";

export function CardGridSection({
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
      className={cn(
        "mx-auto w-full",
        className,
      )}
    >
      <div className="mx-auto w-full sm:max-w-[620px] lg:max-w-[940px] xl:max-w-[1580px]">
        <SectionHeading
          title={title}
          titleId={titleId}
          headingLevel={headingLevel}
          more={more}
          align={align}
          orientation={orientation}
          className="mb-6 sm:mb-10"
        />

        <CardImageTitleGrid>{children}</CardImageTitleGrid>
      </div>
    </section>
  );
}
