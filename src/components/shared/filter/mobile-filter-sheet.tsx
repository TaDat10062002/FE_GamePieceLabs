"use client";

import type { ReactNode } from "react";
import { SlidersHorizontal, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/** Bottom sheet chứa filter trên mobile; Apply chỉ đóng sheet, state do filter con quản lý. */
export interface MobileFilterSheetProps {
  /** Nội dung filter hiển thị trong sheet. */
  children: ReactNode;
  /** Khóa trigger mở sheet. */
  disabled?: boolean;
  /** Tiêu đề hiển thị trong sheet và dùng cho aria-label. */
  title: string;
}

export function MobileFilterSheet({
  children,
  disabled = false,
  title,
}: MobileFilterSheetProps) {
  return (
    <Sheet>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="default"
                size="default"
                disabled={disabled}
                aria-label={`Open ${title.toLowerCase()} filter`}
                className="rounded-full p-8 mx-auto"
              >
                <SlidersHorizontal />
                Filter and sort
              </Button>
            </SheetTrigger>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>

      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="max-h-[70dvh] overflow-visible rounded-t-4xl p-0"
      >
        <SheetClose asChild>
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            aria-label="Close filters"
            className="absolute size-12 -top-16 left-1/2 -translate-x-1/2 rounded-full bg-white text-foreground shadow-md hover:bg-white/90"
          >
            <XIcon className="font-medium size-5" />
          </Button>
        </SheetClose>

        <div className="min-h-0 flex-1 overflow-y-auto px-5">
          <div className="mt-2 mx-auto h-1 w-10 rounded-full bg-muted-foreground/30" />
          <SheetHeader className="px-0">
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
          {children}
        </div>

        <div className="shrink-0 px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-4">
          <SheetClose asChild>
            <Button type="button" className="w-full py-8 rounded-full">
              Apply
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
