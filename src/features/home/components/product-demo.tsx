"use client";

import type { ComponentProps } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  productDemoImage,
  productHotspots,
} from "@/features/home/data/product-demo";
import { cn } from "@/utils/cn";

export interface ProductDemoProps {
  className?: string;
}

function HotspotButton({
  className,
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={cn(
        "group/hotspot relative size-11 cursor-pointer items-center justify-center rounded-full bg-white text-neutral-950 shadow-[0_8px_24px_rgba(15,23,42,0.24)] outline-none transition-transform duration-200 before:absolute before:-inset-2.5 before:-z-10 before:rounded-full before:bg-white/35 hover:scale-105 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4 motion-reduce:transition-none sm:size-14 [&[data-state=delayed-open]_.hotspot-close]:block [&[data-state=delayed-open]_.hotspot-plus]:hidden [&[data-state=instant-open]_.hotspot-close]:block [&[data-state=instant-open]_.hotspot-plus]:hidden [&[data-state=open]_.hotspot-close]:block [&[data-state=open]_.hotspot-plus]:hidden",
        className,
      )}
      {...props}
    >
      <Plus className="hotspot-plus size-5 sm:size-6" aria-hidden="true" />
      <X
        className="hotspot-close hidden size-5 sm:size-6"
        aria-hidden="true"
      />
    </button>
  );
}

export function ProductDemo({ className }: ProductDemoProps) {
  return (
    <section
      aria-label="Product organizer highlights"
      className={cn("w-full px-4 py-10 sm:px-6 sm:py-14", className)}
    >
      <TooltipProvider delayDuration={300} skipDelayDuration={0}>
        <div className="relative mx-auto aspect-[800/732] w-full max-w-[800px]">
          <Image
            src={productDemoImage.src}
            alt={productDemoImage.alt}
            fill
            sizes="(max-width: 832px) calc(100vw - 2rem), 800px"
            className="object-contain"
          />

          {productHotspots.map((hotspot) => (
            <div
              key={hotspot.id}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={hotspot.position}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <HotspotButton
                    aria-label={`Show product detail: ${hotspot.title}`}
                    className="hidden md:flex"
                  />
                </TooltipTrigger>

                <TooltipContent
                  side={hotspot.side}
                  sideOffset={20}
                  collisionPadding={16}
                  className="max-w-xs px-5 py-4 text-base leading-relaxed"
                >
                  {hotspot.text}
                </TooltipContent>
              </Tooltip>

              <Sheet>
                <SheetTrigger asChild>
                  <HotspotButton
                    aria-label={`Show product detail: ${hotspot.title}`}
                    className="flex md:hidden"
                  />
                </SheetTrigger>

                <SheetContent
                  side="bottom"
                  className="rounded-t-3xl border-neutral-200 bg-white px-6 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] text-neutral-950 md:hidden motion-reduce:transition-none motion-reduce:data-open:animate-none motion-reduce:data-closed:animate-none"
                >
                  <div
                    aria-hidden="true"
                    className="absolute top-3 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-neutral-300"
                  />
                  <SheetHeader className="gap-2 p-0 pr-10">
                    <SheetTitle className="text-lg font-semibold text-neutral-950">
                      {hotspot.title}
                    </SheetTitle>
                    <SheetDescription className="text-base leading-relaxed text-neutral-600">
                      {hotspot.text}
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          ))}
        </div>
      </TooltipProvider>
    </section>
  );
}
