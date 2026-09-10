import { Children, isValidElement, type ReactNode } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import PriceFilter, {
  type PriceFilterProps,
} from "@/components/shared/filter/price-filter";
import SortFilter, {
  type SortFilterProps,
} from "@/components/shared/filter/sort-filter";
import SwitchFilter, {
  type SwitchFilterProps,
} from "@/components/shared/filter/switch-filter";
import TypeFilter, {
  type TypeFilterProps,
} from "@/components/shared/filter/type-filter";
import { MobileFilterSheet } from "@/components/shared/filter/mobile-filter-sheet";
import { cn } from "@/utils/cn";

/** Props facade của filter; `variant` quyết định tập props hợp lệ. */
type FilterVariantProps =
  | ({ variant: "price" } & PriceFilterProps)
  | ({ variant: "sort" } & SortFilterProps)
  | ({ variant: "switch" } & SwitchFilterProps)
  | ({ variant: "type" } & TypeFilterProps);

export type FilterProps = FilterVariantProps;

function withoutVariant<T extends { variant: string }>(
  props: T,
): Omit<T, "variant"> {
  const { variant, ...componentProps } = props;
  void variant;

  return componentProps;
}

/** Gom các `<Filter>` vào một bottom sheet ở mobile; desktop không hiển thị group này. */
export interface FilterMobileGroupProps {
  /** Các component `Filter` có `variant` tương ứng. */
  children: ReactNode;
  /** Class bổ sung cho sticky mobile wrapper. */
  className?: string;
}

const mobileFilterTitles = {
  price: "Price",
  sort: "Sort by",
  switch: "Availability",
  type: "Product type",
} satisfies Record<FilterVariantProps["variant"], string>;

export function FilterMobileGroup({
  children,
  className,
}: FilterMobileGroupProps) {
  return (
    <div
      className={cn(
        "sticky top-20 z-40 flex w-full justify-center py-1 sm:hidden",
        className,
      )}
    >
      <MobileFilterSheet title="Filters">
        <Accordion type="multiple">
          {Children.toArray(children).map((child) => {
            if (!isValidElement<FilterProps>(child)) {
              return child;
            }

            const variant = child.props.variant;

            return (
              <AccordionItem key={variant} value={variant}>
                <AccordionTrigger className="font-bold">
                  {mobileFilterTitles[variant]}
                </AccordionTrigger>
                <AccordionContent className="pt-2">{child}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </MobileFilterSheet>
    </div>
  );
}

export default function Filter(props: FilterProps) {
  switch (props.variant) {
    case "price":
      return <PriceFilter {...withoutVariant(props)} />;
    case "sort":
      return <SortFilter {...withoutVariant(props)} />;
    case "switch":
      return <SwitchFilter {...withoutVariant(props)} />;
    case "type":
      return <TypeFilter {...withoutVariant(props)} />;
  }
}

export type {
  CountedFilterItem,
  TypeFilterProps,
} from "@/components/shared/filter/type-filter";
export type {
  PriceCurrency,
  PriceFilterProps,
  PriceRange,
} from "@/components/shared/filter/price-filter";
export type { SortFilterProps } from "@/components/shared/filter/sort-filter";
export type { SwitchFilterProps } from "@/components/shared/filter/switch-filter";
