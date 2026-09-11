# TypeFilter

`TypeFilter` là component lọc sản phẩm theo danh mục hoặc chủng loại kèm số lượng sản phẩm tương ứng trong ngoặc đơn `(count)`, hỗ trợ menu lưới 3 cột trên desktop và danh sách checkbox nhiều lựa chọn trên mobile.

## Purpose

Giúp người dùng nhanh chóng thu hẹp phạm vi tìm kiếm theo chủng loại sản phẩm (ví dụ: Box insert, Token, Khay xúc xắc, Nắp đậy) và nắm rõ số lượng mặt hàng hiện có của từng loại trước khi click.

## Use Cases

- Lọc danh mục loại sản phẩm trên các trang bộ sưu tập (`board-game-inserts`, `by-game-name`, `ox-product-family`, `tokens`).
- Lọc phân loại trong `Filter` facade hoặc `FilterMobileGroup`.

## When to Use

- Dữ liệu phân loại có kèm số lượng sản phẩm (`count: number`).
- Cần giao diện desktop dạng popover lưới 3 cột trực quan và giao diện mobile dạng checkbox danh sách.

## When NOT to Use

- Danh mục phân cấp cây nhiều tầng sâu (nested tree categories).
- Không có dữ liệu số lượng sản phẩm (count).

## Import

```tsx
import TypeFilter, {
  type TypeFilterProps,
  type CountedFilterItem,
} from "@/components/shared/filter/type-filter";
```

## Props

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `items` | `readonly CountedFilterItem[]` | Yes | — | Mảng danh sách các loại sản phẩm kèm số lượng |
| `title` | `string` | No | `"Product"` | Tiêu đề hiển thị trên nút bấm trigger (`"${title} type"`) |

### `CountedFilterItem` Interface

```ts
export interface CountedFilterItem {
  id: string;      // Định danh duy nhất của mục lọc
  label: string;   // Tên hiển thị của loại sản phẩm
  count: number;   // Số lượng sản phẩm tương ứng
}
```

## Responsive Behavior

- **Desktop (`max-sm:hidden`)**:
  - Nút trigger hiển thị: `"{title} type"` kèm mũi tên xoay.
  - Khi click mở `DropdownMenu` độ rộng `w-xl max-w-[calc(100vw-2rem)]`, hiển thị danh sách các nút bấm dạng lưới 3 cột (`sm:grid-cols-3 sm:gap-2`).
  - Mục đang chọn được đổi màu nền và font chữ đậm (`bg-accent font-semibold text-accent-foreground`).
- **Mobile (`sm:hidden`)**:
  - Hiển thị danh sách dọc gồm các ô `Checkbox` và nhãn chữ đậm `label (count)` cho phép tích chọn nhiều mục cùng lúc.

## Basic Usage

```tsx
import TypeFilter, { type CountedFilterItem } from "@/components/shared/filter/type-filter";

const categories: CountedFilterItem[] = [
  { id: "inserts", label: "Inserts", count: 32 },
  { id: "upgrades", label: "Token Upgrades", count: 18 },
  { id: "dice-towers", label: "Dice Towers", count: 7 },
  { id: "card-holders", label: "Card Holders", count: 14 },
];

export function ProductTypeFilterDemo() {
  return (
    <TypeFilter
      title="Boardgame"
      items={categories}
    />
  );
}
```

## Dependencies

### Internal

- `DropdownMenu`, `DropdownMenuEntry` từ `@/components/shared/dropdown-menu`
- `Button` từ `@/components/ui/button`
- `Checkbox` từ `@/components/ui/checkbox`
- `cn` từ `@/utils/cn`

### External

- `lucide-react` (`ChevronDown`)

## Accessibility

- Desktop: Trigger button có `aria-label={"Filter by ${title.toLowerCase()} type"}`.
- Mobile: Thẻ `<label>` bọc `<Checkbox>` liên kết qua `htmlFor` và `id` duy nhất đảm bảo vùng bấm rộng rãi cho ngón tay.

## Implementation Notes

- Runtime: Đây là `"use client"` component.
- Trên desktop, việc chọn một mục đang kích hoạt hành vi chọn đơn (`selectedIds = [item.id]`), trong khi trên mobile cho phép tích chọn nhiều mục (`selectedIds = [...currentIds, itemId]`).
