"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, Search } from "lucide-react";

import Filter, { type PriceRange } from "@/components/shared/filter";
import { ProductList } from "@/components/shared/product-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getSearchProducts,
  getProductTypeCounts,
  searchProducts,
} from "@/features/search/lib/search-products";
import type {
  SearchProductType,
  SearchSortOption,
} from "@/features/search/types/search-product";
import { formatCurrency } from "@/utils/format-currency";

type SearchResultsViewProps = {
  initialQuery: string;
};

const sortOptions = [
  { value: "relevance", label: "Liên quan nhất" },
  { value: "price-asc", label: "Giá thấp đến cao" },
  { value: "price-desc", label: "Giá cao đến thấp" },
  { value: "name-asc", label: "Tên A-Z" },
] satisfies { value: SearchSortOption; label: string }[];

const sortValueByLabel = new Map(
  sortOptions.map((option) => [option.label, option.value]),
);
const sortLabelByValue = new Map(
  sortOptions.map((option) => [option.value, option.label]),
);

function buildSearchHref(query: string): string {
  const normalizedQuery = query.trim();

  return normalizedQuery ? `/search?q=${encodeURIComponent(normalizedQuery)}` : "/search";
}

export function SearchResultsView({ initialQuery }: SearchResultsViewProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [productType, setProductType] = useState<SearchProductType | "all">("all");
  const [sort, setSort] = useState<SearchSortOption>("relevance");

  const allProducts = useMemo(() => getSearchProducts(), []);
  const productTypeCounts = useMemo(() => getProductTypeCounts(), []);
  const maxProductPrice = useMemo(
    () => Math.max(...allProducts.map((product) => product.price), 0),
    [allProducts],
  );
  const [priceRange, setPriceRange] = useState<PriceRange>([0, maxProductPrice]);

  const products = useMemo(
    () =>
      searchProducts({
        query,
        inStockOnly,
        productType,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        sort,
      }),
    [inStockOnly, priceRange, productType, query, sort],
  );

  function submitSearch() {
    router.push(buildSearchHref(query));
  }

  return (
    <main className="bg-neutral-50">
      <section className="mx-auto w-[calc(100%-2rem)] max-w-[1600px] py-10 sm:w-[calc(100%-4rem)] lg:py-14">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-neutral-400">
            Kết quả tìm kiếm
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">
            {products.length} kết quả
            {initialQuery ? ` cho "${initialQuery}"` : ""}
          </h1>

          <div className="mx-auto mt-8 flex max-w-xl items-center gap-3 border-b border-neutral-300 pb-3">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submitSearch();
                }
              }}
              placeholder="Nhập tên sản phẩm..."
              className="h-auto rounded-none border-0 bg-transparent px-0 py-0 text-2xl font-bold shadow-none placeholder:text-neutral-400 focus:border-transparent focus:ring-0"
            />
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
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[280px_1fr] xl:gap-12">
          <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-5 lg:sticky lg:top-28">
            <div className="mb-6 flex items-center gap-3">
              <SlidersHorizontal className="size-5" />
              <h2 className="text-base font-bold text-neutral-950">Bộ lọc</h2>
            </div>

            <div className="space-y-7">
              <div className="border-b border-neutral-200 pb-6">
                <Filter
                  variant="switch"
                  label="Chỉ sản phẩm còn hàng"
                  checked={inStockOnly}
                  onCheckedChange={setInStockOnly}
                  wrapperClassName="mx-0 px-0 py-0"
                  rootClassName="w-full"
                />
              </div>

              <div className="border-b border-neutral-200 pb-6">
                <Filter
                  variant="type"
                  title="Sản phẩm"
                  triggerLabel="Loại sản phẩm"
                  selectedId={productType}
                  onSelectedIdChange={(nextProductType) =>
                    setProductType(nextProductType as SearchProductType | "all")
                  }
                  items={[
                    {
                      id: "all",
                      label: "Tất cả",
                      count: allProducts.length,
                    },
                    ...productTypeCounts,
                  ]}
                  wrapperClassName="mx-0 px-0 py-0"
                />
              </div>

              <div className="border-b border-neutral-200 pb-6">
                <Filter
                  variant="price"
                  title="Khoảng giá"
                  currency="VND"
                  min={0}
                  max={maxProductPrice}
                  step={50_000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  wrapperClassName="mx-0 px-0 py-0"
                />
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full rounded-full"
                onClick={() => {
                  setInStockOnly(false);
                  setProductType("all");
                  setPriceRange([0, maxProductPrice]);
                  setSort("relevance");
                }}
              >
                Xóa bộ lọc
              </Button>
            </div>
          </aside>

          <div>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-neutral-500">
                Đang hiển thị <strong className="text-neutral-950">{products.length}</strong> sản phẩm
              </p>

              <Filter
                variant="sort"
                label="Sắp xếp:"
                items={sortOptions.map((option) => option.label)}
                value={sortLabelByValue.get(sort)}
                onValueChange={(nextSortLabel) =>
                  setSort(sortValueByLabel.get(nextSortLabel) ?? "relevance")
                }
                wrapperClassName="mx-0 px-0 py-0"
              />
            </div>

            {products.length > 0 ? (
              <ProductList
                products={products}
                columns={3}
                isShowed={false}
                alignPagination="center"
                variantPagination="default"
                pagination={{
                  currentPage: 1,
                  pageSize: products.length,
                  totalItems: products.length,
                  totalPages: 1,
                  hasNext: false,
                  hasPrevious: false,
                }}
              />
            ) : (
              <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-10 text-center">
                <p className="text-2xl font-bold text-neutral-950">
                  Không có sản phẩm phù hợp
                </p>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-500">
                  Thử đổi từ khóa, bỏ bớt filter hoặc tìm theo tên board game bạn muốn tối ưu khay chứa.
                </p>
              </div>
            )}

            {products.length > 0 ? (
              <div className="mt-10 rounded-2xl bg-white p-5 text-sm text-neutral-500">
                Khoảng giá hiện tại:{" "}
                <strong className="text-neutral-950">
                  {priceRange[0] === 0 && priceRange[1] === maxProductPrice
                    ? "Tất cả"
                    : `${formatCurrency(priceRange[0], "VND")} - ${formatCurrency(
                        priceRange[1],
                        "VND",
                      )}`}
                </strong>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
