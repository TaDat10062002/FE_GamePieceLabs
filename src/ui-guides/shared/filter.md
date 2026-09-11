# Filter

`Filter` là component điều phối (orchestrator/facade) đa năng cho toàn bộ hệ thống bộ lọc sản phẩm, cùng với `FilterMobileGroup` giúp gom nhóm các bộ lọc thành một sheet Accordion chuyên dụng trên thiết bị di động.

## Purpose

Cung cấp điểm truy cập thống nhất (single point of entry) cho 4 loại bộ lọc trong dự án: khoảng giá (`price`), sắp xếp (`sort`), công tắc chuyển đổi (`switch`), và phân loại sản phẩm (`type`). Đồng thời giải quyết vấn đề hiển thị trên mobile bằng thanh accordion sticky gọn gàng.

## Use Cases

- Trang danh mục sản phẩm (`board-game-inserts`, `by-game-name`, `ox-product-family`, `tokens`).
- Thanh công cụ lọc và sắp xếp sản phẩm trên desktop và mobile.

## When to Use

- Cần nhúng các bộ lọc với cú pháp đồng nhất dạng polymorphic variant (`variant="price" | "sort" | "switch" | "type"`).
- Cần gom nhiều bộ lọc vào ngăn kéo trượt (`Sheet`) trên mobile bằng `FilterMobileGroup`.

## When NOT to Use

- Cần tùy biến sâu layout nội bộ của từng loại filter mà không muốn đi qua facade router (hãy import trực tiếp `PriceFilter`, `SortFilter`, `SwitchFilter`, hoặc `TypeFilter` từ thư mục `@/components/shared/filter/`).

## Import

```tsx
import Filter, {
  FilterMobileGroup,
  type FilterProps,
  type PriceFilterProps,
  type SortFilterProps,
  type SwitchFilterProps,
  type TypeFilterProps,
  type PriceRange,
  type PriceCurrency,
  type CountedFilterItem,
} from "@/components/shared/filter";
```

## Props

### `FilterProps` (Discriminated Union theo `variant`)

`FilterProps` nhận thuộc tính phân biệt `variant`:

| Variant | Props kèm theo | Description |
| ------- | -------------- | ----------- |
| `"price"` | `PriceFilterProps` | Bộ lọc khoảng giá với thanh kéo slider kép và ô hiển thị tiền tệ |
| `"sort"` | `SortFilterProps` | Bộ lọc thứ tự sắp xếp (tiêu chí dạng chuỗi mảng) |
| `"switch"` | `SwitchFilterProps` | Bộ lọc bật/tắt (như trạng thái còn hàng "In stock") |
| `"type"` | `TypeFilterProps` | Bộ lọc phân loại danh mục kèm số lượng sản phẩm `(count)` |

### `FilterMobileGroupProps`

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `children` | `ReactNode` | Yes | — | Danh sách các phần tử `<Filter variant="..." />` |
| `className` | `string` | No | — | Lớp CSS tùy biến cho thanh bao ngoài mobile |

## Variants

- `variant="price"`: Điều hướng tới component `PriceFilter`.
- `variant="sort"`: Điều hướng tới component `SortFilter`.
- `variant="switch"`: Điều hướng tới component `SwitchFilter`.
- `variant="type"`: Điều hướng tới component `TypeFilter`.

## Responsive Behavior

- **Desktop (`>= 640px`)**: Các `<Filter />` hiển thị dưới dạng thanh nút bấm ghost với menu dropdown dạng popover.
- **Mobile (`< 640px`)**:
  - `FilterMobileGroup` ghim dính ở vị trí `sticky top-20 z-40`, căn giữa với nút bấm "Filter and sort" tròn màu đen.
  - Khi nhấn, `MobileFilterSheet` trượt từ đáy màn hình (`side="bottom"`) hiển thị Accordion cho phép mở đồng thời nhiều tiêu chí lọc.
  - Tiêu đề từng mục accordion được tự động gán nhãn thân thiện:
    - `price` → `"Price"`
    - `sort` → `"Sort by"`
    - `switch` → `"Availability"`
    - `type` → `"Product type"`

## Basic Usage

```tsx
import Filter from "@/components/shared/filter";

export function DesktopFilterBar() {
  return (
    <div className="flex items-center gap-6">
      <Filter
        variant="switch"
        label="Còn hàng"
        defaultChecked={true}
      />
      <Filter
        variant="price"
        min={0}
        max={1000000}
        currency="VND"
        step={50000}
      />
      <Filter
        variant="sort"
        items={["Mới nhất", "Giá tăng dần", "Giá giảm dần"]}
      />
    </div>
  );
}
```

## Advanced Usage

### Phối hợp Desktop Toolbar và Mobile Sheet

Pattern đang được áp dụng trong toàn bộ các trang collections:

```tsx
import Filter, { FilterMobileGroup } from "@/components/shared/filter";

const sortOptions = ["Best selling", "Price: low to high", "Price: high to low"];
const typeOptions = [
  { id: "insert", label: "Inserts", count: 24 },
  { id: "tokens", label: "Tokens", count: 12 },
];

export function CatalogFilters() {
  return (
    <>
      {/* Mobile Sticky Filter Trigger */}
      <FilterMobileGroup>
        <Filter variant="switch" label="In stock only" />
        <Filter variant="type" items={typeOptions} />
        <Filter variant="price" min={0} max={200} currency="USD" />
        <Filter variant="sort" items={sortOptions} />
      </FilterMobileGroup>

      {/* Desktop Filter Bar */}
      <div className="hidden items-center justify-between sm:flex">
        <div className="flex items-center gap-6">
          <Filter variant="switch" label="In stock only" />
          <Filter variant="type" items={typeOptions} />
          <Filter variant="price" min={0} max={200} currency="USD" />
        </div>
        <Filter variant="sort" items={sortOptions} />
      </div>
    </>
  );
}
```

## Dependencies

### Internal

- `PriceFilter` từ `@/components/shared/filter/price-filter`
- `SortFilter` from `@/components/shared/filter/sort-filter`
- `SwitchFilter` from `@/components/shared/filter/switch-filter`
- `TypeFilter` from `@/components/shared/filter/type-filter`
- `MobileFilterSheet` from `@/components/shared/filter/mobile-filter-sheet`
- `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` từ `@/components/ui/accordion`
- `cn` từ `@/utils/cn`

## Accessibility

- Cấu trúc `Accordion` tuân thủ WAI-ARIA với các phím điều hướng tab và thuộc tính `aria-expanded`.
- Tự động map giá trị value và trigger label chính xác theo variant.

## Implementation Notes

- Hàm `withoutVariant(props)` loại bỏ thuộc tính `variant` trước khi chuyển tiếp props xuống các sub-component con để đảm bảo type-safety tuyệt đối và tránh cảnh báo DOM không hợp lệ.
