# PriceFilter

`PriceFilter` là component lọc sản phẩm theo khoảng giá hai đầu (dual-thumb range slider), tích hợp sẵn định dạng tiền tệ (`USD`, `VND`), hỗ trợ giao diện Dropdown menu trên desktop và giao diện inline mở rộng trên mobile.

## Purpose

Cho phép khách hàng giới hạn khoảng ngân sách mua sắm từ giá tối thiểu đến giá tối đa một cách trực quan, mượt mà với thanh kéo trượt và các ô hiển thị số tiền tương ứng.

## Use Cases

- Bộ lọc khoảng giá trong danh mục sản phẩm (Collections pages).
- Lọc giá trong `Filter` facade hoặc bọc trong `FilterMobileGroup`.

## When to Use

- Sản phẩm có biên độ giá đa dạng cần lọc từ cận dưới đến cận trên.
- Cần hỗ trợ chuyển đổi tiền tệ (`USD`, `VND`) và định dạng số phân cách hàng nghìn chuẩn theo `locale`.
- Cần hoạt động đồng thời trên desktop (dưới dạng popup thả xuống) và mobile (dưới dạng form trượt trong sheet).

## When NOT to Use

- Chỉ cần chọn các mức giá cố định dạng radio button (ví dụ: "Dưới 100k", "Từ 100k - 500k", "Trên 500k").

## Import

```tsx
import PriceFilter, {
  type PriceFilterProps,
  type PriceRange,
  type PriceCurrency,
} from "@/components/shared/filter/price-filter";
```

## Props

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `min` | `number` | Yes | — | Giá trị giá nhỏ nhất của toàn bộ dải trượt |
| `max` | `number` | Yes | — | Giá trị giá lớn nhất của toàn bộ dải trượt |
| `value` | `PriceRange` (`readonly [number, number]`) | No | — | Giá trị khoảng giá hiện tại ở chế độ controlled |
| `defaultValue` | `PriceRange` | No | `[min, max]` | Giá trị khoảng giá ban đầu ở chế độ uncontrolled |
| `step` | `number` | No | `1` | Bước nhảy mỗi lần kéo thanh trượt (phải lớn hơn 0) |
| `currency` | `PriceCurrency` (`"USD"` \| `"VND"`) | No | `"USD"` | Đơn vị tiền tệ hiển thị |
| `currencyLabel` | `string` | No | Tự suy luận từ `currency` và `locale` | Nhãn tiền tệ hiển thị trong ô giá |
| `locale` | `string` | No | `"vi-VN"` nếu VND, `"en-US"` nếu USD | Mã định dạng ngôn ngữ/địa phương của `Intl.NumberFormat` |
| `title` | `string` | No | `"Price"` | Tiêu đề hiển thị trên nút bấm trigger |
| `disabled` | `boolean` | No | `false` | Vô hiệu hóa thanh trượt và trigger |
| `onValueChange` | `(value: PriceRange) => void` | No | — | Callback được gọi khi người dùng kéo thay đổi khoảng giá |

### `PriceRange` Type

```ts
export type PriceRange = readonly [minimum: number, maximum: number];
```

## States

- **Controlled vs Uncontrolled**: Nếu prop `value` được truyền, component hoạt động ở chế độ controlled. Nếu không, component tự duy trì state nội bộ bắt đầu từ `defaultValue`.
- **Open / Close Dropdown (Desktop)**: Quản lý trạng thái mở popover bằng `isOpen` state, icon Chevron tự xoay 180 độ.
- **Auto-clamping**: Component luôn đảm bảo giá trị `minimum <= maximum` và nằm trong khoảng `[min, max]`.

## Responsive Behavior

- **Desktop (`max-sm:hidden`)**:
  - Hiển thị nút bấm chữ đậm dạng ghost với mũi tên tròn.
  - Khi click, mở `DropdownMenu` rộng với lưới 3 cột: `[Ô giá tối thiểu] [Thanh Slider kéo] [Ô giá tối đa]`.
- **Mobile (`sm:hidden`)**:
  - Hiển thị trực tiếp dạng xếp dọc: Thanh Slider ở trên, 2 ô giá tối thiểu và tối đa xếp dạng lưới 2 cột ở dưới.

## Basic Usage

```tsx
import PriceFilter from "@/components/shared/filter/price-filter";

export function BasicPriceFilter() {
  return (
    <PriceFilter
      min={0}
      max={2000000}
      step={50000}
      currency="VND"
      onValueChange={([min, max]) => {
        console.log("Khoảng giá đã chọn:", min, max);
      }}
    />
  );
}
```

## Advanced Usage

### Chế độ Controlled kết nối URL Params

```tsx
import { useState } from "react";
import PriceFilter, { type PriceRange } from "@/components/shared/filter/price-filter";

export function ControlledPriceFilter() {
  const [range, setRange] = useState<PriceRange>([10, 80]);

  return (
    <PriceFilter
      min={0}
      max={100}
      step={5}
      currency="USD"
      value={range}
      onValueChange={setRange}
      title="Lọc theo ngân sách"
    />
  );
}
```

## Dependencies

### Internal

- `DropdownMenu`, `DropdownMenuEntry` từ `@/components/shared/dropdown-menu`
- `Button` từ `@/components/ui/button`
- `Slider` từ `@/components/ui/slider`
- `cn` từ `@/utils/cn`

### External

- `lucide-react` (`ChevronDown`)

## Accessibility

- Thẻ `<output>` hiển thị giá trị tiền tệ sử dụng `aria-live="polite"` để thông báo thay đổi số tiền cho screen reader.
- Thanh slider được gắn `aria-label="Price range"`.
- Trigger button có `aria-label={"Filter by ${title.toLowerCase()}"}`.

## Implementation Notes

- Runtime: Đây là `"use client"` component.
- Định dạng số tiền tự động làm tròn 0 chữ số thập phân cho tiền đồng `VND` và 2 chữ số thập phân cho `USD`.
