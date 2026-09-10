# ProductGallery

`ProductGallery` là component thư viện trình chiếu sản phẩm đa năng, hỗ trợ hai biến thể: carousel duyệt sản phẩm nổi bật (`type="featured"`) hoặc thanh cuộn ảnh thu nhỏ của sản phẩm chi tiết (`type="detail"`).

## Purpose

Cung cấp giải pháp carousel cho cả hai kịch bản phổ biến trong thương mại điện tử: trình bày danh sách sản phẩm nổi bật trên Trang chủ và thanh chọn ảnh thumbnail dạng dọc/ngang trên trang Chi tiết sản phẩm.

## Use Cases

- Băng chuyền sản phẩm nổi bật trên Trang chủ (`src/app/(storefront)/page.tsx`).
- Bộ sưu tập ảnh thu nhỏ trên trang Chi tiết sản phẩm (`src/features/products/components/product-image-gallery.tsx`).

## When to Use

- Cần carousel sản phẩm nổi bật có các nút Next/Previous tròn nổi trên bề mặt thẻ (`type="featured"`).
- Cần thanh chọn ảnh thu nhỏ tự động xoay dọc trên desktop và xoay ngang trên mobile (`type="detail"`).

## When NOT to Use

- Lưới sản phẩm phân trang toàn bộ danh mục (dùng `ProductList`).
- Trình chiếu banner hero toàn màn hình (dùng `ImageSlider`).

## Import

```tsx
import {
  ProductGallery,
  type ProductGalleryProps,
  type FeaturedProductGalleryProps,
  type DetailProductGalleryProps,
} from "@/components/shared/product/product-gallery";
```

## Props

Component sử dụng Discriminated Union dựa theo trường `type`:

### 1. Dạng Sản Phẩm Nổi Bật (`type="featured"`)

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `type` | `"featured"` | Yes | — | Định danh chế độ carousel sản phẩm nổi bật |
| `images` | `readonly ProductCardProps[]` | Yes | — | Danh sách các đối tượng props của thẻ `ProductCard` |
| `className` | `string` | No | — | Lớp CSS tùy biến cho container carousel |

### 2. Dạng Ảnh Thu Nhỏ Chi Tiết (`type="detail"`)

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `type` | `"detail"` | Yes | — | Định danh chế độ thư viện ảnh thu nhỏ |
| `images` | `readonly ProductThumbnailImage[]` | Yes | — | Danh sách các đối tượng ảnh thu nhỏ (`{ id, src, alt }`) |
| `selectedIndex` | `number` | No | — | Vị trí index của ảnh đang được chọn active |
| `onImageSelect` | `(image: ProductThumbnailImage, index: number) => void` | No | — | Callback khi người dùng click chọn hoặc trượt tới ảnh mới |
| `className` | `string` | No | — | Lớp CSS tùy biến cho container |

## Variants

### `type="featured"`

- Hiển thị danh sách các `ProductCard` trong băng chuyền cuộn ngang hỗ trợ vuốt tự do (`dragFree: true`).
- Nút Previous và Next màu trắng nổi ở hai mép trái/phải (`size-12 rounded-full shadow-lg`).

### `type="detail"`

- Tự động thay đổi hướng cuộn (`orientation`) theo thiết bị:
  - **Mobile (`< 640px`)**: Cuộn ngang (`orientation="horizontal"`).
  - **Desktop (`>= 640px`)**: Cuộn dọc (`orientation="vertical"`), nút Next/Prev xoay 90 độ (`sm:rotate-90`).
- Tự động lặp vô tận (`loop: true`) và đồng bộ ảnh đang chọn khi carousel trượt qua sự kiện `api.on("select")`.

## Responsive Behavior

- Trong chế độ `featured`:
  - Mobile: Mỗi slide chiếm `basis-[88%]`
  - Tablet: `sm:basis-1/2`
  - Laptop: `lg:basis-1/3`
  - Desktop lớn: `xl:basis-1/4`
- Trong chế độ `detail`:
  - Tự động lắng nghe `window.matchMedia("(max-width: 639px)")` để chuyển đổi giữa bố cục cuộn ngang và cuộn dọc.

## Basic Usage

### Carousel Sản phẩm nổi bật

```tsx
import { ProductGallery } from "@/components/shared/product/product-gallery";
import type { ProductCardProps } from "@/components/shared/product/product-card";

const featuredProducts: ProductCardProps[] = [
  {
    name: "Insert Nemesis",
    imageSrc: "/images/p1.jpg",
    imageAlt: "Nemesis",
    price: 350000,
    currency: "VND",
    rating: 5,
    slug: "insert-nemesis",
    gui: "g1",
  },
  {
    name: "Insert Catan",
    imageSrc: "/images/p2.jpg",
    imageAlt: "Catan",
    price: 250000,
    currency: "VND",
    rating: 4.8,
    slug: "insert-catan",
    gui: "g2",
  },
];

export function FeaturedSection() {
  return (
    <ProductGallery
      type="featured"
      images={featuredProducts}
    />
  );
}
```

## Advanced Usage

### Gallery Ảnh Thumbnail trong trang Chi tiết

```tsx
import { useState } from "react";
import { ProductGallery } from "@/components/shared/product/product-gallery";
import type { ProductThumbnailImage } from "@/components/shared/product/product-thumbnail";

const thumbnails: ProductThumbnailImage[] = [
  { id: "img-1", src: "/images/details/1.jpg", alt: "Góc nhìn tổng thể" },
  { id: "img-2", src: "/images/details/2.jpg", alt: "Khay token chi tiết" },
  { id: "img-3", src: "/images/details/3.jpg", alt: "Đóng nắp hộp game" },
];

export function ProductImagesGallery() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="flex gap-4">
      <ProductGallery
        type="detail"
        images={thumbnails}
        selectedIndex={activeIdx}
        onImageSelect={(img, idx) => setActiveIdx(idx)}
      />
      {/* Vùng hiển thị ảnh lớn preview tương ứng với activeIdx */}
    </div>
  );
}
```

## Dependencies

### Internal

- `ProductCard` từ `@/components/shared/product/product-card`
- `ProductThumbnail`, `ProductThumbnailImage` từ `@/components/shared/product/product-thumbnail`
- `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselNext`, `CarouselPrevious`, `CarouselApi` từ `@/components/ui/carousel`
- `cn` từ `@/utils/cn`

### External

- Không có dependencies bên ngoài ngoài các component nội bộ.

## Accessibility

- Chế độ `featured` có `aria-label="Sản phẩm nổi bật"`.
- Chế độ `detail` có `aria-label="Ảnh thu nhỏ của sản phẩm"`.

## Implementation Notes

- Runtime: Đây là `"use client"` component.
- Nếu mảng `images` rỗng (`length === 0`), component an toàn trả về `null`.
