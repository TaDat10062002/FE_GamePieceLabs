"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";
import type { IconType } from "react-icons";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utils/cn";

export interface SocialMediaItem {
  /** Tên platform; `facebook`, `instagram`, `tiktok` sẽ dùng icon/màu dựng sẵn. */
  platform: string;
  /** Nhãn accessibility và nội dung tooltip. */
  label: string;
  /** URL external đến social profile. */
  href: string;
  /** Icon ghi đè icon mặc định của platform. */
  icon?: ReactNode;
}

/** Thanh social cố định ở cạnh màn hình, có thể dùng controlled hoặc uncontrolled state. */
export interface SocialMediaRailProps {
  /** Danh sách social link cần hiển thị. */
  items: SocialMediaItem[];
  /** Cạnh gắn rail. Mặc định `right`. */
  side?: "left" | "right";
  /** Trạng thái mở lúc khởi tạo cho uncontrolled mode. */
  defaultOpen?: boolean;
  /** Trạng thái mở controlled; truyền cùng `onOpenChange`. */
  open?: boolean;
  /** Nhận trạng thái tiếp theo sau khi người dùng mở/đóng rail. */
  onOpenChange?: (open: boolean) => void;
  /** Class cho thẻ `aside` cố định. */
  className?: string;
}

const socialIcons: Record<string, IconType> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  tiktok: FaTiktok,
};

const socialLinkStyles: Record<string, string> = {
  facebook: "bg-[#1877F2] text-white hover:bg-[#0C63D4]",
  instagram:
    "bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] text-white hover:brightness-110",
  tiktok: "bg-[#010101] text-white hover:bg-[#181818]",
};

const socialIconStyles: Record<string, string> = {
  tiktok: "[filter:drop-shadow(1px_0_0_#25F4EE)_drop-shadow(-1px_0_0_#FE2C55)]",
};

interface SocialLinkProps {
  item: SocialMediaItem;
  railSide: "left" | "right";
  railOpen: boolean;
}

function SocialLink({ item, railSide, railOpen }: SocialLinkProps) {
  const platform = item.platform.toLowerCase();
  const Icon = socialIcons[platform];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          tabIndex={railOpen ? 0 : -1}
          className={cn(
            "flex size-12 items-center justify-center rounded-md shadow-md ring-1 ring-black/5",
            "transition-[transform,filter,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lg",
            "focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "md:size-15 lg:size-12 sm:rounded-lg",
            socialLinkStyles[platform] ??
              "bg-foreground text-background hover:brightness-110",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "flex size-6 items-center justify-center text-2xl sm:size-6 sm:text-2xl md:size-8 md:text-3xl lg:size-6 lg:text-2xl",
              socialIconStyles[platform],
            )}
          >
            {item.icon ??
              (Icon ? <Icon /> : item.label.slice(0, 1).toUpperCase())}
          </span>
        </a>
      </TooltipTrigger>
      <TooltipContent
        side={railSide === "right" ? "left" : "right"}
        className="rounded-md border-border bg-popover px-3 py-2 text-sm leading-snug text-popover-foreground shadow-md"
      >
        {item.label}
      </TooltipContent>
    </Tooltip>
  );
}

export function SocialMediaRail({
  items,
  side = "right",
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  className,
}: SocialMediaRailProps) {
  const listId = useId();
  const railRef = useRef<HTMLElement>(null);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = useCallback(
    (nextOpen: boolean): void => {
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent): void {
      if (
        event.target instanceof Node &&
        !railRef.current?.contains(event.target)
      ) {
        handleOpenChange(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        handleOpenChange(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleOpenChange, isOpen]);

  const ToggleIcon = side === "right" ? ChevronLeft : ChevronRight;

  return (
    <TooltipProvider>
      <aside
        ref={railRef}
        aria-label="Social media links"
        className={cn(
          "fixed top-1/2 z-50 flex -translate-y-1/2 items-center transition-transform duration-300 ease-in-out motion-reduce:transition-none",
          side === "right" ? "right-0" : "left-0 flex-row-reverse",
          !isOpen &&
            (side === "right"
              ? "translate-x-[calc(100%-1.5rem)] sm:translate-x-[calc(100%-1.75rem)]"
              : "-translate-x-[calc(100%-1.5rem)] sm:-translate-x-[calc(100%-1.75rem)]"),
          className,
        )}
      >
        <style>{`
          @keyframes social-handle-shimmer {
            0%, 15% { background-position: 200% 50%; }
            65%, 100% { background-position: -200% 50%; }
          }
        `}</style>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-expanded={isOpen}
          aria-controls={listId}
          aria-hidden={isOpen}
          aria-label="Open social media links"
          tabIndex={isOpen ? -1 : 0}
          onClick={() => handleOpenChange(true)}
          className={cn(
            "relative z-10 mx-1 h-10 w-6 rounded-none border-[#f2e7b3] bg-[#fffdf4] p-0 text-[#9a7b19] shadow-[0_0_12px_rgba(244,220,120,0.2)] [background-image:linear-gradient(110deg,transparent_25%,rgba(253,230,138,0.22)_42%,rgba(255,255,255,0.95)_50%,rgba(253,230,138,0.22)_58%,transparent_75%)] [background-size:300%_100%] hover:brightness-[0.985] hover:shadow-[0_0_14px_rgba(244,220,120,0.3)] motion-safe:animate-[social-handle-shimmer_3s_ease-in-out_infinite] sm:h-12 sm:w-7 dark:border-[#f2e7b3] dark:bg-[#fffdf4] dark:text-[#9a7b19]",
            isOpen
              ? "invisible pointer-events-none opacity-0 transition-none"
              : "visible opacity-100 transition-[opacity,visibility,filter,box-shadow] delay-300 duration-150 motion-reduce:transition-none",
            side === "right"
              ? "rounded-l-full border-r-0"
              : "rounded-r-full border-l-0",
          )}
        >
          <ToggleIcon className="size-3.5 sm:size-4" />
        </Button>
        <nav
          id={listId}
          aria-label="Follow us"
          aria-hidden={!isOpen}
          className={cn(
            "overflow-visible p-1 sm:p-1.5",
            !isOpen && "pointer-events-none",
          )}
        >
          <div className="flex flex-col gap-1 sm:gap-1.5">
            {items.map((item) => (
              <SocialLink
                key={`${item.platform}-${item.href}`}
                item={item}
                railSide={side}
                railOpen={isOpen}
              />
            ))}
          </div>
        </nav>
      </aside>
    </TooltipProvider>
  );
}

export default SocialMediaRail;
