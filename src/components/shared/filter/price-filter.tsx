"use client";

import DropdownMenu, {
  type DropdownMenuEntry,
} from "@/components/shared/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";
import { type ReactNode, useId, useState } from "react";

export type PriceCurrency = "USD" | "VND";
export type PriceRange = readonly [minimum: number, maximum: number];

export interface PriceFilterProps {
  currency?: PriceCurrency;
  currencyLabel?: string;
  defaultValue?: PriceRange;
  disabled?: boolean;
  locale?: string;
  max: number;
  min: number;
  onValueChange?: (value: PriceRange) => void;
  step?: number;
  title?: string;
  value?: PriceRange;
}

interface DesktopPriceFilterProps {
  disabled: boolean;
  dropdownItems: DropdownMenuEntry[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  triggerId: string;
}

function DesktopPriceFilter({
  disabled,
  dropdownItems,
  isOpen,
  onOpenChange,
  title,
  triggerId,
}: DesktopPriceFilterProps) {
  return (
    <DropdownMenu
      items={dropdownItems}
      rootProps={{ open: isOpen, onOpenChange }}
      triggerProps={{ asChild: true }}
      contentProps={{
        align: "center",
        sideOffset: 12,
        onCloseAutoFocus: (event) => event.preventDefault(),
        className:
          "w-4xl max-w-[calc(100vw-2rem)] rounded-xl border-border p-3 shadow-lg sm:p-4",
      }}
      trigger={
        <Button
          id={triggerId}
          type="button"
          variant="ghost"
          disabled={disabled}
          aria-label={`Filter by ${title.toLowerCase()}`}
          className="group h-auto gap-3 rounded-full bg-transparent p-0 text-base shadow-none hover:bg-transparent active:translate-y-0"
        >
          <span className="shrink-0 text-base font-bold leading-snug text-foreground">
            {title}
          </span>
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors duration-300 group-hover:bg-foreground group-hover:text-background">
            <ChevronDown
              aria-hidden="true"
              className={cn(
                "size-4 transition-transform duration-300",
                isOpen && "rotate-180",
              )}
            />
          </span>
        </Button>
      }
    />
  );
}

interface MobilePriceFilterProps {
  outputs: ReactNode;
  slider: ReactNode;
}

function MobilePriceFilter({ outputs, slider }: MobilePriceFilterProps) {
  return (
    <div className="flex flex-col gap-6">
      {slider}
      <div className="grid grid-cols-2 gap-3">{outputs}</div>
    </div>
  );
}

function clampPrice(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function normalizePriceRange(
  value: PriceRange,
  min: number,
  max: number,
): [number, number] {
  const lowerValue = clampPrice(Math.min(value[0], value[1]), min, max);
  const upperValue = clampPrice(Math.max(value[0], value[1]), min, max);

  return [lowerValue, upperValue];
}

function getCurrencyLabel(currency: PriceCurrency, locale: string): string {
  const currencySymbol = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  })
    .formatToParts(0)
    .find((part) => part.type === "currency")?.value;

  return `${currencySymbol ?? ""}${currency}`;
}

export default function PriceFilter({
  currency = "USD",
  currencyLabel,
  defaultValue,
  disabled = false,
  locale,
  max,
  min,
  onValueChange,
  step = 1,
  title = "Price",
  value,
}: PriceFilterProps) {
  const triggerId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const safeMin = Math.min(min, max);
  const safeMax = Math.max(min, max);
  const safeStep = step > 0 ? step : 1;
  const initialRange = normalizePriceRange(
    defaultValue ?? [safeMin, safeMax],
    safeMin,
    safeMax,
  );
  const [internalValue, setInternalValue] =
    useState<[number, number]>(initialRange);
  const currentValue = normalizePriceRange(
    value ?? internalValue,
    safeMin,
    safeMax,
  );
  const resolvedLocale = locale ?? (currency === "VND" ? "vi-VN" : "en-US");
  const resolvedCurrencyLabel =
    currencyLabel ?? getCurrencyLabel(currency, resolvedLocale);
  const numberFormatter = new Intl.NumberFormat(resolvedLocale, {
    maximumFractionDigits: currency === "VND" ? 0 : 2,
  });

  function handleValueChange(nextValue: number[]): void {
    const nextRange = normalizePriceRange(
      [nextValue[0] ?? safeMin, nextValue[1] ?? safeMax],
      safeMin,
      safeMax,
    );

    if (value === undefined) {
      setInternalValue(nextRange);
    }

    onValueChange?.(nextRange);
  }

  const dropdownItems: DropdownMenuEntry[] = [
    {
      id: "price-range",
      type: "custom",
      props: {
        className:
          "flex flex-col gap-6 p-2 sm:grid sm:grid-cols-[minmax(7rem,9rem)_1fr_minmax(7rem,9rem)] sm:items-center sm:gap-8 sm:p-3",
      },
      children: (
        <>
          <PriceOutput
            currencyLabel={resolvedCurrencyLabel}
            value={numberFormatter.format(currentValue[0])}
          />
          <Slider
            aria-label="Price range"
            disabled={disabled}
            min={safeMin}
            max={safeMax}
            step={safeStep}
            value={[...currentValue]}
            onValueChange={handleValueChange}
            className="[&_[data-slot=slider-range]]:bg-foreground [&_[data-slot=slider-thumb]]:size-4 [&_[data-slot=slider-thumb]]:border-foreground [&_[data-slot=slider-thumb]]:bg-foreground [&_[data-slot=slider-track]]:bg-muted-foreground/30"
          />
          <PriceOutput
            currencyLabel={resolvedCurrencyLabel}
            value={numberFormatter.format(currentValue[1])}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <div className="max-sm:hidden">
        <DesktopPriceFilter
          disabled={disabled}
          dropdownItems={dropdownItems}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          title={title}
          triggerId={triggerId}
        />
      </div>
      <div className="sm:hidden">
        <MobilePriceFilter
          slider={
            <Slider
              aria-label="Price range"
              disabled={disabled}
              min={safeMin}
              max={safeMax}
              step={safeStep}
              value={[...currentValue]}
              onValueChange={handleValueChange}
              className="px-2 [&_[data-slot=slider-range]]:bg-foreground [&_[data-slot=slider-thumb]]:size-4 [&_[data-slot=slider-thumb]]:border-foreground [&_[data-slot=slider-thumb]]:bg-foreground [&_[data-slot=slider-track]]:bg-muted-foreground/30"
            />
          }
          outputs={
            <>
              <PriceOutput
                currencyLabel={resolvedCurrencyLabel}
                value={numberFormatter.format(currentValue[0])}
              />
              <PriceOutput
                currencyLabel={resolvedCurrencyLabel}
                value={numberFormatter.format(currentValue[1])}
              />
            </>
          }
        />
      </div>
    </>
  );
}

interface PriceOutputProps {
  currencyLabel: string;
  value: string;
}

function PriceOutput({ currencyLabel, value }: PriceOutputProps) {
  return (
    <output
      aria-live="polite"
      className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 text-base leading-snug tabular-nums sm:min-h-16"
    >
      <span className="font-medium text-muted-foreground">{currencyLabel}</span>
      <span className="font-semibold text-foreground">{value}</span>
    </output>
  );
}
