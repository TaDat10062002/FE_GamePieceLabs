"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { searchProducts } from "@/features/search/lib/search-products";
import { formatCurrency } from "@/utils/format-currency";

type SearchDrawerProps = {
  iconSizeClassName?: string;
};

function buildSearchHref(query: string): string {
  const normalizedQuery = query.trim();

  return normalizedQuery ? `/search?q=${encodeURIComponent(normalizedQuery)}` : "/search";
}

export function SearchDrawer({ iconSizeClassName = "size-6" }: SearchDrawerProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const previewProducts = useMemo(
    () => searchProducts({ query }).slice(0, 5),
    [query],
  );

  const hasQuery = query.trim().length > 0;

  function submitSearch() {
    setOpen(false);
    router.push(buildSearchHref(query));
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Tìm kiếm">
          <Search className={iconSizeClassName} />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-[92vw] gap-0 overflow-hidden bg-white p-0 sm:max-w-[560px] xl:max-w-[650px]"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Tìm kiếm sản phẩm</SheetTitle>
          <SheetDescription>
            Nhập tên sản phẩm để xem gợi ý nhanh hoặc chuyển sang trang kết quả đầy đủ.
          </SheetDescription>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col px-6 py-7 sm:px-10">
          <div className="flex items-center gap-4 border-b border-neutral-300 pb-3">
            <Input
              autoFocus
              value={query}
              placeholder="Search for..."
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submitSearch();
                }
              }}
              className="h-auto rounded-none border-0 bg-transparent px-0 py-0 text-3xl font-bold text-neutral-950 shadow-none placeholder:text-neutral-400 focus:border-transparent focus:ring-0"
            />

            {hasQuery ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Xóa từ khóa"
                onClick={() => setQuery("")}
              >
                <X className="size-5" />
              </Button>
            ) : null}

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Tìm kiếm"
              onClick={submitSearch}
            >
              <Search className="size-5" />
            </Button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto py-8">
            {!hasQuery ? (
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-400">
                  Gợi ý tìm nhanh
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Gloomhaven", "Spirit", "SETI", "Organizer", "Token"].map((keyword) => (
                    <button
                      key={keyword}
                      type="button"
                      onClick={() => setQuery(keyword)}
                      className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-bold text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>
            ) : previewProducts.length > 0 ? (
              <div>
                <div className="mb-6 flex items-center justify-between gap-4">
                  <p className="text-sm font-bold text-neutral-950">Sản phẩm</p>
                  <Link
                    href={buildSearchHref(query)}
                    onClick={() => setOpen(false)}
                    className="text-sm font-bold text-red-700 hover:text-red-800"
                  >
                    Xem tất cả
                  </Link>
                </div>

                <div className="space-y-5">
                  {previewProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}-${product.gui}`}
                      onClick={() => setOpen(false)}
                      className="group grid grid-cols-[88px_1fr] gap-5 rounded-xl outline-none transition hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-950">
                        <Image
                          src={product.imageSrc}
                          alt={product.imageAlt}
                          fill
                          sizes="88px"
                          className="object-cover transition duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="self-center">
                        <h3 className="line-clamp-2 text-base font-bold leading-snug text-neutral-950">
                          {product.name}
                        </h3>
                        <p className="mt-1 text-sm text-neutral-500">
                          {formatCurrency(product.price, product.currency)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-neutral-300 p-8 text-center">
                <p className="text-lg font-bold text-neutral-950">
                  Chưa tìm thấy sản phẩm phù hợp
                </p>
                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  Thử tìm theo tên board game, chất liệu hoặc loại organizer.
                </p>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
