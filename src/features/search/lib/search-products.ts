import { mockProductDetails } from "@/features/products/data/mock-product-details";
import type { MockProductDetail } from "@/features/products/data/mock-product-details";
import type {
  SearchProduct,
  SearchProductFilters,
  SearchProductType,
} from "@/features/search/types/search-product";

const DEFAULT_RATING = 4.8;

function getDiscountedPrice(product: MockProductDetail): number {
  const discountPercentage = product.discountPercentage ?? 0;

  return Math.round(product.orginalPrice * (1 - discountPercentage / 100));
}

function getPrimaryImage(product: MockProductDetail): {
  imageSrc: string;
  imageAlt: string;
} {
  const primaryImage =
    product.images.find((image) => image.isPrimary) ?? product.images[0];

  return {
    imageSrc: primaryImage?.publicUrl ?? "/placeholder.svg",
    imageAlt: primaryImage?.altText ?? product.name,
  };
}

function inferProductType(product: MockProductDetail): SearchProductType {
  const searchableText = `${product.name} ${product.description ?? ""}`.toLowerCase();

  if (searchableText.includes("token")) {
    return "token";
  }

  if (searchableText.includes("sleeve") || searchableText.includes("accessory")) {
    return "accessory";
  }

  return "organizer";
}

function getSearchableText(product: SearchProduct): string {
  return [
    product.name,
    product.description,
    product.slug,
    product.materials.join(" "),
    product.productType,
  ]
    .join(" ")
    .toLowerCase();
}

function getRelevanceScore(product: SearchProduct, normalizedQuery: string): number {
  if (!normalizedQuery) return 0;

  const normalizedName = product.name.toLowerCase();
  const normalizedSlug = product.slug.toLowerCase();

  if (normalizedName === normalizedQuery) return 100;
  if (normalizedName.startsWith(normalizedQuery)) return 80;
  if (normalizedName.includes(normalizedQuery)) return 60;
  if (normalizedSlug.includes(normalizedQuery)) return 45;
  if (getSearchableText(product).includes(normalizedQuery)) return 25;

  return 0;
}

export function getSearchProducts(): SearchProduct[] {
  return mockProductDetails.map((product, index) => {
    const { imageSrc, imageAlt } = getPrimaryImage(product);

    return {
      id: product.id,
      name: product.name,
      imageSrc,
      imageAlt,
      price: getDiscountedPrice(product),
      rating: Math.max(3.8, DEFAULT_RATING - index * 0.2),
      currency: "VND",
      slug: product.slug,
      gui: product.gui,
      description: product.description ?? "",
      materials: product.materials.map((material) => material.matterialName),
      productType: inferProductType(product),
      inStock: index !== mockProductDetails.length - 1,
      quickAddLabel: "Xem chi tiết",
    };
  });
}

export function searchProducts(filters: SearchProductFilters): SearchProduct[] {
  const normalizedQuery = filters.query?.trim().toLowerCase() ?? "";
  const minPrice = filters.minPrice ?? 0;
  const maxPrice = filters.maxPrice ?? Number.POSITIVE_INFINITY;

  const filteredProducts = getSearchProducts().filter((product) => {
    const matchesQuery =
      !normalizedQuery || getSearchableText(product).includes(normalizedQuery);
    const matchesStock = !filters.inStockOnly || product.inStock;
    const matchesType =
      !filters.productType ||
      filters.productType === "all" ||
      product.productType === filters.productType;
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

    return matchesQuery && matchesStock && matchesType && matchesPrice;
  });

  return filteredProducts.sort((firstProduct, secondProduct) => {
    switch (filters.sort) {
      case "price-asc":
        return firstProduct.price - secondProduct.price;
      case "price-desc":
        return secondProduct.price - firstProduct.price;
      case "name-asc":
        return firstProduct.name.localeCompare(secondProduct.name);
      case "relevance":
      default:
        return (
          getRelevanceScore(secondProduct, normalizedQuery) -
          getRelevanceScore(firstProduct, normalizedQuery)
        );
    }
  });
}

export function getProductTypeCounts(products = getSearchProducts()) {
  return [
    {
      id: "organizer",
      label: "Organizer",
      count: products.filter((product) => product.productType === "organizer").length,
    },
    {
      id: "accessory",
      label: "Phụ kiện",
      count: products.filter((product) => product.productType === "accessory").length,
    },
    {
      id: "token",
      label: "Token",
      count: products.filter((product) => product.productType === "token").length,
    },
  ] as const;
}
