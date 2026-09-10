# SortFilter

`SortFilter` là component sắp xếp danh sách sản phẩm theo các tiêu chí xác định, hỗ trợ dạng menu thả xuống có radio group trên desktop và danh sách checkbox chọn đơn trên mobile.

## Purpose

Cho phép người dùng thay đổi thứ tự hiển thị danh sách sản phẩm (ví dụ: bán chạy nhất, giá tăng dần, giá giảm dần, mới nhất) với giao diện tối ưu riêng biệt cho từng loại thiết bị.

## Use Cases

- Thanh công cụ lọc trên các trang bộ sưu tập (`board-game-inserts`, `by-game-name`, `ox-product-family`, `tokens`).
- Tùy chọn sắp xếp trong `Filter` facade hoặc `FilterMobileGroup`.

## When to Use

- Cần cung cấp danh sách các tiêu chí sắp xếp cho người dùng lựa chọn một tiêu chí duy nhất tại một thời điểm.
- Cần tự động ưu tiên chọn tiêu chí `"best selling"` làm mặc định nếu có trong danh sách.

## When NOT to Use

- Cần chọn cùng lúc nhiều tiêu chí sắp xếp (multi-sort).
- Cần ô input tìm kiếm hoặc bộ lọc dạng nhập liệu tự do.

## Import

```tsx
import SortFilter, { type SortFilterProps } from "@/components/shared/filter/sort-filter";
```

## Props

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `items` | `readonly string[]` | Yes | — | Mảng chuỗi các tiêu chí sắp xếp (ví dụ: `["best selling", "price low to high", "price high to low"]`) |

## States

- **Selection State**: Mặc định ưu tiên lựa chọn `"best selling"` nếu nằm trong mảng `items`, ngược lại sẽ chọn phần tử đầu tiên `items[0]`. Khi người dùng click chọn mục mới, state nội bộ `selectedValue` được cập nhật.
- **Dropdown Open/Close (Desktop)**: Quản lý trạng thái mở popover, icon Chevron tự động xoay 180 độ khi mở.

## Responsive Behavior

- **Desktop (`max-sm:hidden`)**:
  - Nhãn `"Sort by:"` nằm ngang cùng nút bấm trigger hiển thị tiêu chí đang chọn (viết hoa chữ cái đầu `capitalize`).
  - Khi click mở `DropdownMenu` với các lựa chọn dạng `radio-group`.
- **Mobile (`sm:hidden`)**:
  - Hiển thị danh sách các hàng lựa chọn xếp dọc.
  - Mỗi hàng gồm một ô `Checkbox` và nhãn chữ đậm `capitalize`. Khi click vào hàng, tiêu chí đó sẽ được chọn.

## Basic Usage

```tsx
import SortFilter from "@/components/shared/filter/sort-filter";

const sortOptions = [
  "best selling",
  "featured",
  "price: low to high",
  "price: high to low",
  "newest",
];

export function ProductCatalogSort() {
  return <SortFilter items={sortOptions} />;
}
```

## Dependencies

### Internal

- `DropdownMenu`, `DropdownMenuEntry` từ `@/components/shared/dropdown-menu`
- `Button` từ `@/components/ui/button`
- `Checkbox` từ `@/components/ui/checkbox`
- `Label` từ `@/components/ui/label`
- `cn` từ `@/utils/cn`

### External

- `lucide-react` (`ChevronDown`)

## Accessibility

- Desktop: Nút trigger có `aria-label={"Sort products by ${currentValue || 'an option'}"}`.
- Mobile: Thẻ `<label>` kết nối trực tiếp với `<Checkbox>` qua cặp thuộc tính `htmlFor` và `id` duy nhất sinh bởi `useId()`.

## Styling

- Chữ hiển thị tự động chuyển dạng in hoa đầu từ: `capitalize`.
- Hiệu ứng gạch chân mở rộng khi hover vào nhãn sắp xếp: `after:scale-x-0 group-hover:after:scale-x-100`.

## Implementation Notes

- Runtime: Đây là `"use client"` component do có tương tác state và DOM dropdown.
- Component hiện quản lý lựa chọn bằng state nội bộ. Khi kết nối với router Next.js để lọc server-side, có thể lắng nghe hoặc mở rộng thêm prop `onValueChange` / `value`.
