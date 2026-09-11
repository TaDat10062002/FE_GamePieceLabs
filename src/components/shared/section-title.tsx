import type { ReactElement } from "react";

import { CardGridSection } from "@/components/shared/section-title/card-grid-section";
import { SplitContentSection } from "@/components/shared/section-title/split-content";
import { TextContentSection } from "@/components/shared/section-title/text-content-section";
import { cn } from "@/utils/cn";

import type { SectionTitleProps } from "./section-title/types";
import styles from "./css/section-title.module.css";
import Wrapper from "./wrapper";

export { SectionTitleGroupProps } from "./section-title/section-title-group";
export type {
  SectionTitleAlign,
  SectionTitleHeadingLevel,
  SectionTitleHorizonSplitProps,
  SectionTitleImageSliderProps,
  SectionTitleMore,
  SectionTitleMoreProps,
  SectionTitleOrientation,
  SectionTitleProps,
  SectionTitleSplitContentPosition,
  SectionTitleSplitProps,
  SectionTitleVerticalSplitProps,
} from "./section-title/types";

export function SectionTitle(props: SectionTitleProps): ReactElement {
  const getComponents = (props: SectionTitleProps) => {
    switch (props.content) {
      case "split":
        return <SplitContentSection {...props} />;
      case "text":
        return <TextContentSection {...props} />;
      case "imageSlider":
        return (
          <section aria-label={props.ariaLabel} className={props.className}>
            {props.children}
          </section>
        );
      default:
        return <CardGridSection {...props} />;
    }
  };
  return (
    <div
      className={cn(
        "px-5 sm:px-section-padding",
        props.content !== "imageSlider" && "pt-[80px]",
      )}
    >
      {getComponents(props)}
    </div>
  );
}
