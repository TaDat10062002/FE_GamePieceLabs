# ProductList

`ProductList` là component hiển thị lưới danh sách sản phẩm (Product Grid) hoàn chỉnh, tích hợp sẵn thanh phân trang `Pagination`, hỗ trợ tùy biến số lượng cột (`columns` từ 1 đến 5) và tối ưu `sizes` cho responsive images.

## Purpose

Tạo ra bố cục hiển thị danh sách sản phẩm chuẩn mực cho toàn bộ các trang danh mục, tự động gắn kết giữa lưới thẻ `ProductCard` và component phân trang `Pagination`.

## Use Cases

- Trang danh mục các bộ sưu tập (`board-game-inserts`, `by-game-name`, `ox-product-family`, `tokens`).
- Danh sách sản phẩm gợi ý hoặc sản phẩm bán chạy trong trang Chi tiết sản phẩm.

## When to Use

- Cần render danh sách sản phẩm dạng lưới có phân trang ở chân danh sách.
- Cần linh hoạt cấu hình số cột trên màn hình lớn (`lg:grid-cols-1` đến `lg:grid-cols-5`).

## When NOT to Use

- Dạng carousel trượt ngang (dùng `ProductGallery type="featured"`).
- Danh sách sản phẩm không phân trang hoặc cuộn vô tận (infinite scroll).

## Import

```tsx
import {
  ProductList,
  type ProductListColumnCount,
} from "@/components/shared/product/product-list";
import type { PaginationMeta } from "@/components/shared/pagination";
import type { ProductCardProps } from "@/components/shared/product/product-card";
```

## Props

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `products` | `readonly ProductCardProps[]` | Yes | — | Mảng danh sách dữ liệu các thẻ sản phẩm |
| `pagination` | `PaginationMeta` | Yes | — | Dữ liệu thống kê phân trang |
| `variantPagination` | `PaginationVariant` (`"default"` \| `"simple"`) | Yes | — | Kiểu giao diện phân trang |
| `alignPagination` | `PaginationAlign` (`"left"` \| `"center"` \| `"right"`) | Yes | — | Căn lề cho thanh phân trang |
| `columns` | `ProductListColumnCount` (`1 \| 2 \| 3 \| 4 \| 5`) | No | `3` | Số cột của lưới trên màn hình laptop/desktop (`lg:`) |
| `isShowed` | `boolean` | No | `true` | Quyết định có hiển thị thanh phân trang bên dưới hay không |
| `className` | `string` | No | — | Lớp CSS tùy biến cho khối lưới chứa các sản phẩm |

## Responsive Behavior

- **Mobile / Tablet (`< 1024px`)**:
  - Luôn hiển thị dạng lưới 2 cột (`grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2`).
- **Desktop (`lg: >= 1024px`)**:
  - Số cột tự động áp dụng theo prop `columns`:
    - `1`: `lg:grid-cols-1`
    - `2`: `lg:grid-cols-2`
    - `3`: `lg:grid-cols-3` (Mặc định)
    - `4`: `lg:grid-cols-4`
    - `5`: `lg:grid-cols-5`
  - Khoảng cách tăng lên `lg:gap-x-6 lg:gap-y-14`.
- **Next/Image Sizes Optimization**:
  - Component tự động tính toán thuộc tính `sizes` truyền vào `ProductCard` tương ứng với số cột `columns`, giúp tải hình ảnh có kích thước tối ưu nhất mà không lãng phí băng thông.

## Basic Usage

```tsx
import { ProductList } from "@/components/shared/product/product-list";
import type { ProductCardProps } from "@/components/shared/product/product-card";
import type { PaginationMeta } from "@/components/shared/pagination";

const sampleProducts: ProductCardProps[] = [/* ... */];
const paginationMeta: PaginationMeta = {
  currentPage: 1,
  pageSize: 9,
  totalItems: 27,
  totalPages: 3,
  hasNext: true,
  hasPrevious: false,
};

export function CollectionCatalog() {
  return (
    <ProductList
      products={sampleProducts}
      pagination={paginationMeta}
      variantPagination="default"
      alignPagination="center"
      columns={3}
    />
  );
}
```

## Advanced Usage

### Lưới 4 cột không có phân trang (Hoặc ẩn phân trang)

```tsx
import { ProductList } from "@/components/shared/product/product-list";

export function RecommendedProducts({ products }: { products: ProductCardProps[] }) {
  return (
    <ProductList
      products={products}
      columns={4}
      isShowed={false}
      pagination={{
        currentPage: 1,
        pageSize: 4,
        totalItems: 4,
        totalPages: 1,
        hasNext: false,
        hasPrevious: false,
      }}
      variantPagination="simple"
      alignPagination="center"
    />
  );
}
```

## Dependencies

### Internal

- `ProductCard`, `ProductCardProps` từ `@/components/shared/product/product-card`
- `Pagination`, `PaginationMeta`, `PaginationAlign`, `PaginationVariant` từ `@/components/shared/pagination`
- `cn` từ `@/utils/cn`

### External

- Không có dependencies bên ngoài.

## Implementation Notes

- Nếu mảng `products` rỗng (`products.length === 0`), component an toàn trả về `null` tránh render lưới rỗng không có nội dung.
- Phần phân trang có đường kẻ viền phân cách phía trên `border-t border-neutral-200 pt-8 sm:pt-10`.
