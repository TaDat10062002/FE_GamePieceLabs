"use client";

import DropdownMenu, {
  type DropdownMenuEntry,
} from "@/components/shared/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

export interface CountedFilterItem {
  id: string;
  label: string;
  count: number;
}

export interface TypeFilterProps {
  title?: string;
  items: readonly CountedFilterItem[];
}

interface DesktopTypeFilterProps {
  dropdownItems: DropdownMenuEntry[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  triggerId: string;
}

function DesktopTypeFilter({
  dropdownItems,
  isOpen,
  onOpenChange,
  title,
  triggerId,
}: DesktopTypeFilterProps) {
  return (
    <DropdownMenu
      items={dropdownItems}
      rootProps={{ open: isOpen, onOpenChange }}
      triggerProps={{ asChild: true }}
      contentProps={{
        align: "center",
        sideOffset: 12,
        className:
          "w-xl max-w-[calc(100vw-2rem)] rounded-xl border-border p-3 shadow-lg sm:p-4",
      }}
      trigger={
        <Button
          id={triggerId}
          type="button"
          variant="ghost"
          aria-label={`Filter by ${title.toLowerCase()} type`}
          className="group h-auto gap-3 rounded-full bg-transparent p-0 text-base shadow-none hover:bg-transparent active:translate-y-0"
        >
          <span className="shrink-0 text-base font-bold leading-snug text-foreground">
            {title} type
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

interface MobileTypeFilterProps {
  items: readonly CountedFilterItem[];
  onSelectedIdsChange: (itemId: string, checked: boolean) => void;
  selectedIds: readonly string[];
  triggerId: string;
}

function MobileTypeFilter({
  items,
  onSelectedIdsChange,
  selectedIds,
  triggerId,
}: MobileTypeFilterProps) {
  return (
    <div className="grid">
      {items.map((item) => (
        <label
          key={item.id}
          htmlFor={`${triggerId}-${item.id}`}
          className="flex cursor-pointer items-center gap-3 rounded-lg py-1 text-base leading-snug"
        >
          <Checkbox
            id={`${triggerId}-${item.id}`}
            checked={selectedIds.includes(item.id)}
            onCheckedChange={(checked) => onSelectedIdsChange(item.id, checked === true)}
          />
          <span className="flex-1 font-bold">
            {item.label} ({item.count})
          </span>
        </label>
      ))}
    </div>
  );
}

export default function TypeFilter({
  items,
  title = "Product",
}: TypeFilterProps) {
  const triggerId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<readonly string[]>([]);

  const dropdownItems: DropdownMenuEntry[] = [
    {
      id: "product-type-options",
      type: "group",
      props: {
        className: "grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-2",
      },
      items: items.map((item) => ({
        id: item.id,
        type: "item",
        label: `${item.label} (${item.count})`,
        props: {
          onSelect: () => setSelectedIds([item.id]),
          className: cn(
            "justify-center rounded-lg px-4 py-4 text-center text-base text-muted-foreground transition-colors sm:py-5",
            selectedIds.includes(item.id) &&
              "bg-accent font-semibold text-accent-foreground",
          ),
        },
      })),
    },
  ];

  return (
    <>
      <div className="max-sm:hidden">
      <DesktopTypeFilter
        dropdownItems={dropdownItems}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title={title}
        triggerId={triggerId}
      />
      </div>
      <div className="sm:hidden">
        <MobileTypeFilter
          items={items}
          selectedIds={selectedIds}
          triggerId={triggerId}
          onSelectedIdsChange={(itemId, checked) => {
            setSelectedIds((currentIds) =>
              checked
                ? [...currentIds, itemId]
                : currentIds.filter((id) => id !== itemId),
            );
          }}
        />
      </div>
    </>
  );
}
