import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/utils/cn";

/** `default` hiển thị số trang; `simple` chỉ hiển thị Previous/Next. */
export type PaginationVariant = "default" | "simple";
/** Vị trí pagination trong container. */
export type PaginationAlign = "left" | "center" | "right";

export interface PaginationMeta {
  /** Trang hiện tại, bắt đầu từ 1. */
  currentPage: number;
  /** Số item trên một trang, dùng để tạo dòng tóm tắt. */
  pageSize: number;
  /** Tổng số item của danh sách sau khi áp dụng filter. */
  totalItems: number;
  /** Tổng số trang có thể điều hướng. */
  totalPages: number;
  /** Cho biết có thể đi tới trang sau hay không. */
  hasNext: boolean;
  /** Cho biết có thể quay lại trang trước hay không. */
  hasPrevious: boolean;
}

/** Phân trang cho grid/list storefront đã có metadata từ API. */
export interface PaginationProps {
  /** Ẩn hoàn toàn pagination khi danh sách không cần phân trang. Mặc định `true`. */
  isShowed?: boolean;
  /** Canh vị trí pagination trong container cha. */
  align: PaginationAlign;
  /** Metadata phân trang đã được chuẩn hoá từ API hoặc state của trang. */
  pagination: PaginationMeta;
  /** `default` hiện các số trang; `simple` chỉ hiện Previous/Next và trạng thái trang. */
  variant: PaginationVariant;
}

type VisiblePage = number | "ellipsis-start" | "ellipsis-end";

const paginationAlignClassNames: Record<PaginationAlign, string> = {
  left: "items-start",
  center: "items-center",
  right: "items-end",
};

function getVisiblePages(
  currentPage: number,
  totalPages: number,
): VisiblePage[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "ellipsis-end", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [
      1,
      "ellipsis-start",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis-start",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis-end",
    totalPages,
  ];
}

export function Pagination({
  isShowed = true,
  align,
  pagination,
  variant,
}: PaginationProps) {
  const {
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    hasNext,
    hasPrevious,
  } = pagination;
  const firstItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const lastItem = Math.min(currentPage * pageSize, totalItems);
  const previousPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);
  const summary = `Showing ${firstItem}-${lastItem} of ${totalItems} products`;

  if (!isShowed) return;

  if (variant === "simple") {
    return (
      <PaginationRoot
        aria-label="Product pagination"
        className={cn("flex-col gap-4", paginationAlignClassNames[align])}
      >
        <p className="text-base leading-relaxed text-neutral-600 sm:text-sm">{summary}</p>

        <PaginationContent className="no-scrollbar max-w-full justify-start gap-2 overflow-x-auto pb-1 sm:justify-center sm:gap-4">
          <PaginationItem>
            <PaginationPrevious
              href={`?page=${previousPage}`}
              text="Previous"
              aria-disabled={!hasPrevious}
              tabIndex={hasPrevious ? undefined : -1}
              className={cn(
                "rounded-full border border-neutral-200",
                !hasPrevious && "pointer-events-none text-neutral-400",
              )}
            />
          </PaginationItem>

          <PaginationItem>
            <span
              className="flex h-9 min-w-24 items-center justify-center px-3 text-base font-medium leading-snug text-neutral-700 sm:text-sm"
              aria-current="page"
            >
              Page {currentPage} of {totalPages}
            </span>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href={`?page=${nextPage}`}
              text="Next"
              aria-disabled={!hasNext}
              tabIndex={hasNext ? undefined : -1}
              className={cn(
                "rounded-full bg-neutral-950 text-white hover:bg-neutral-800 hover:text-white",
                !hasNext &&
                  "pointer-events-none bg-neutral-200 text-neutral-400",
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationRoot>
    );
  }

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <PaginationRoot
      aria-label="Product pagination"
      className={cn("flex-col gap-4", paginationAlignClassNames[align])}
    >
      <p className="text-base leading-relaxed text-neutral-600 sm:text-sm">{summary}</p>

      <PaginationContent className="no-scrollbar max-w-full justify-start gap-1 overflow-x-auto pb-1 sm:justify-center">
        <PaginationItem>
          <PaginationPrevious
            href={`?page=${previousPage}`}
            aria-disabled={!hasPrevious}
            tabIndex={hasPrevious ? undefined : -1}
            className={cn(
              !hasPrevious && "pointer-events-none text-neutral-400",
            )}
          />
        </PaginationItem>

        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            {typeof page === "number" ? (
              <PaginationLink
                href={`?page=${page}`}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            ) : (
              <PaginationEllipsis />
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={`?page=${nextPage}`}
            aria-disabled={!hasNext}
            tabIndex={hasNext ? undefined : -1}
            className={cn(!hasNext && "pointer-events-none text-neutral-400")}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}
