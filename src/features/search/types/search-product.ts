import { ProductCardProps } from "@/components/shared/product/product-card";

export type SearchSortOption =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "name-asc";

export type SearchProductType = "organizer" | "accessory" | "token";

export type SearchProduct = ProductCardProps & {
  id: string;
  description: string;
  materials: string[];
  productType: SearchProductType;
  inStock: boolean;
};

export type SearchProductFilters = {
  query?: string;
  inStockOnly?: boolean;
  productType?: SearchProductType | "all";
  minPrice?: number;
  maxPrice?: number;
  sort?: SearchSortOption;
};
