# Pagination

`Pagination` là component phân trang danh sách sản phẩm hoàn chỉnh, hỗ trợ tính toán số trang hiển thị thông minh với dấu ba chấm (`...`), tóm tắt số lượng mục hiển thị và hỗ trợ hai kiểu giao diện (`default` và `simple`).

## Purpose

Cung cấp khả năng duyệt qua nhiều trang danh sách sản phẩm thông qua URL query param `?page=...`, đồng thời hiển thị thông tin thống kê số lượng sản phẩm đang xem trên tổng số.

## Use Cases

- Chân trang của danh sách sản phẩm (`ProductList`).
- Bất kỳ danh sách hoặc bảng dữ liệu nào cần phân chia trang trong storefront.

## When to Use

- Dữ liệu được phân trang theo URL query params (`?page=1`, `?page=2`).
- Cần tự động tính toán dải trang (dấu chấm lửng `...` khi có nhiều hơn 7 trang).
- Cần hai phong cách hiển thị: đầy đủ số trang (`default`) hoặc chỉ có nút Trước/Sau (`simple`).

## When NOT to Use

- Phân trang dạng Infinite Scroll (cuộn vô tận) hoặc nút "Xem thêm" (Load More).
- Phân trang hoàn toàn bằng Client-side state callback không qua URL (trừ khi can thiệp bắt sự kiện click trên thẻ link).

## Import

```tsx
import {
  Pagination,
  type PaginationProps,
  type PaginationMeta,
  type PaginationVariant,
  type PaginationAlign,
} from "@/components/shared/pagination";
```

## Props

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `pagination` | `PaginationMeta` | Yes | — | Dữ liệu thống kê phân trang (trang hiện tại, tổng trang, tổng item, v.v.) |
| `variant` | `PaginationVariant` | Yes | — | Kiểu giao diện hiển thị (`"default"` hoặc `"simple"`) |
| `align` | `PaginationAlign` | Yes | — | Vị trí căn lề của khối phân trang (`"left"`, `"center"`, `"right"`) |
| `isShowed` | `boolean` | No | `true` | Điều kiện hiển thị component. Khi `false`, component không render gì ra giao diện |

### `PaginationMeta` Interface

```ts
export interface PaginationMeta {
  currentPage: number;   // Số trang hiện tại (1-indexed)
  pageSize: number;      // Số lượng sản phẩm trên mỗi trang
  totalItems: number;    // Tổng số lượng sản phẩm
  totalPages: number;    // Tổng số trang
  hasNext: boolean;      // Còn trang kế tiếp hay không
  hasPrevious: boolean;  // Còn trang trước đó hay không
}
```

## Variants

### `variant`

- `"default"`: Hiển thị đầy đủ thanh phân trang với nút *Previous*, các nút số trang (`1`, `2`, `3`...), dấu ba chấm (`...`), và nút *Next*.
- `"simple"`: Kiểu tối giản, chỉ hiển thị nút bo tròn *Previous*, nhãn `"Page X of Y"`, và nút pill nổi bật *Next*.

### `align`

- `"left"`: Căn lề trái (`items-start`).
- `"center"`: Căn lề giữa (`items-center`).
- `"right"`: Căn lề phải (`items-end`).

## States

- **First page (`hasPrevious === false`)**: Nút *Previous* chuyển sang trạng thái disabled (`pointer-events-none text-neutral-400`, `aria-disabled="true"`, `tabIndex={-1}`).
- **Last page (`hasNext === false`)**: Nút *Next* chuyển sang trạng thái disabled (`pointer-events-none text-neutral-400`, `aria-disabled="true"`, `tabIndex={-1}`).
- **Active page**: Số trang hiện tại được đánh dấu `isActive={true}` với màu nền tương phản.

## Responsive Behavior

- Sử dụng `no-scrollbar overflow-x-auto` cho thanh chứa các nút số để người dùng di động có thể vuốt ngang nếu danh sách số trang dài hơn chiều ngang màn hình.
- Dòng chữ tóm tắt sản phẩm (`Showing X-Y of Z products`) tự động co cỡ chữ `text-base sm:text-sm`.

## Basic Usage

```tsx
import { Pagination, type PaginationMeta } from "@/components/shared/pagination";

const meta: PaginationMeta = {
  currentPage: 1,
  pageSize: 12,
  totalItems: 48,
  totalPages: 4,
  hasNext: true,
  hasPrevious: false,
};

export function ProductCatalogPagination() {
  return (
    <Pagination
      pagination={meta}
      variant="default"
      align="center"
    />
  );
}
```

## Advanced Usage

### Kiểu Simple trong trang chi tiết hoặc thanh điều hướng phụ

```tsx
import { Pagination, type PaginationMeta } from "@/components/shared/pagination";

const meta: PaginationMeta = {
  currentPage: 2,
  pageSize: 8,
  totalItems: 32,
  totalPages: 4,
  hasNext: true,
  hasPrevious: true,
};

export function SimplePager() {
  return (
    <Pagination
      pagination={meta}
      variant="simple"
      align="right"
    />
  );
}
```

## Dependencies

### Internal

- Toàn bộ primitive từ `@/components/ui/pagination`:
  - `Pagination as PaginationRoot`
  - `PaginationContent`
  - `PaginationItem`
  - `PaginationLink`
  - `PaginationNext`
  - `PaginationPrevious`
  - `PaginationEllipsis`
- `cn` từ `@/utils/cn`

### External

- `next/link` (được bọc bên trong primitive pagination)

## Accessibility

- Root container được gắn `aria-label="Product pagination"`.
- Nút Previous và Next được gắn `aria-disabled` và `tabIndex={-1}` khi không khả dụng để ngăn điều hướng bằng bàn phím.
- Nhãn trang hiện tại có thuộc tính `aria-current="page"`.

## Implementation Notes

- Thuật toán `getVisiblePages` tự động xử lý:
  - Nếu tổng trang `<= 7`: hiển thị toàn bộ `[1, 2, 3, 4, 5, 6, 7]`.
  - Nếu ở các trang đầu (`<= 3`): `[1, 2, 3, 4, "ellipsis-end", totalPages]`.
  - Nếu ở các trang cuối (`>= totalPages - 2`): `[1, "ellipsis-start", totalPages - 3, ..., totalPages]`.
  - Nếu ở giữa: `[1, "ellipsis-start", current - 1, current, current + 1, "ellipsis-end", totalPages]`.
- Đường dẫn điều hướng được sinh tự động theo mẫu `?page=${pageNumber}`.
