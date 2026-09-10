"use client";

import DropdownMenu, {
  type DropdownMenuEntry,
} from "@/components/shared/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

export interface SortFilterProps {
  items: readonly string[];
}

interface DesktopSortFilterProps {
  currentValue: string;
  dropdownItems: DropdownMenuEntry[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  triggerId: string;
}

function DesktopSortFilter({
  currentValue,
  dropdownItems,
  isOpen,
  onOpenChange,
  triggerId,
}: DesktopSortFilterProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <Label
        htmlFor={triggerId}
        className="shrink-0 text-base font-bold leading-snug text-foreground"
      >
        Sort by:
      </Label>
      <DropdownMenu
        items={dropdownItems}
        rootProps={{ open: isOpen, onOpenChange }}
        triggerProps={{ asChild: true }}
        contentProps={{
          align: "end",
          sideOffset: 8,
          className: "min-w-56 rounded-xl p-1.5",
        }}
        trigger={
          <Button
            id={triggerId}
            type="button"
            variant="ghost"
            aria-label={`Sort products by ${currentValue || "an option"}`}
            className="group h-auto gap-2 rounded-full bg-transparent p-0 text-base font-normal leading-snug text-foreground shadow-none hover:bg-transparent active:translate-y-0"
          >
            <span className="relative capitalize after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 group-hover:after:scale-x-100">
              {currentValue || "Select option"}
            </span>
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors duration-300 group-hover:bg-foreground group-hover:text-background">
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
    </div>
  );
}

interface MobileSortFilterProps {
  currentValue: string;
  items: readonly string[];
  onValueChange: (value: string) => void;
  triggerId: string;
}

function MobileSortFilter({
  currentValue,
  items,
  onValueChange,
  triggerId,
}: MobileSortFilterProps) {
  return (
    <div className="grid">
      {items.map((item) => (
        <label
          key={item}
          htmlFor={`${triggerId}-${item}`}
          className="flex cursor-pointer items-center gap-3 rounded-lg py-1 text-base leading-snug capitalize"
        >
          <Checkbox
            id={`${triggerId}-${item}`}
            checked={currentValue === item}
            onCheckedChange={(checked) => {
              if (checked) onValueChange(item);
            }}
          />
          <span className="font-bold">{item}</span>
        </label>
      ))}
    </div>
  );
}

export default function SortFilter({
  items,
}: SortFilterProps) {
  const triggerId = useId();
  const defaultValue = items.includes("best selling")
    ? "best selling"
    : (items[0] ?? "");
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  const currentValue = items.includes(selectedValue)
    ? selectedValue
    : (items[0] ?? "");

  const dropdownItems: DropdownMenuEntry[] = [
    {
      id: "sort-options",
      type: "radio-group",
      props: {
        value: currentValue,
        onValueChange: setSelectedValue,
      },
      items: items.map((item) => ({
        id: item,
        label: item,
        props: {
          value: item,
          className: "cursor-pointer rounded-lg px-3 py-2.5 capitalize",
        },
      })),
    },
  ];

  return (
    <>
      <div className="max-sm:hidden">
      <DesktopSortFilter
        currentValue={currentValue}
        dropdownItems={dropdownItems}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        triggerId={triggerId}
      />
      </div>
      <div className="sm:hidden">
        <MobileSortFilter
          currentValue={currentValue}
          items={items}
          onValueChange={setSelectedValue}
          triggerId={triggerId}
        />
      </div>
    </>
  );
}
