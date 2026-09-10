import Image from "next/image";
import Link from "next/link";

import { cn } from "@/utils/cn";

/** Logo có link về home; phù hợp cho header/footer, không dùng làm ảnh brand thuần. */
export interface LogoProps {
  /** Class cho link wrapper. */
  className?: string;
  /** Class cho ảnh logo, ví dụ điều chỉnh kích thước theo breakpoint. */
  imageClassName?: string;
}

export function Logo({ className, imageClassName }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Game Piece Labs - Trang chủ"
      className={cn(
        "inline-flex items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 sm:gap-3",
        className,
      )}
    >
      <Image
        src="/brand/game-piece-labs-mark.png"
        alt="Game Piece Labs - Phụ kiện boardgame"
        width={512}
        height={512}
        loading="eager"
        className={cn("size-12 object-contain sm:size-14", imageClassName)}
      />
      <span className="whitespace-nowrap text-base font-bold leading-none tracking-[0.06em] text-foreground sm:text-lg xl:text-xl">
        GAME PIECE LABS
        <span className="mt-1 block text-center text-[0.6875rem] font-medium leading-tight tracking-[0.08em] text-muted-foreground sm:text-xs">
          Phụ kiện &amp; Boardgame
        </span>
      </span>
    </Link>
  );
}
