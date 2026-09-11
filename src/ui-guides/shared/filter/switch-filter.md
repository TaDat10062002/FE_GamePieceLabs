# SwitchFilter

`SwitchFilter` là component bộ lọc bật/tắt (toggle switch) nhị phân, hỗ trợ nhãn chính, mô tả phụ, huy hiệu trạng thái hoạt động (`activeBadge`) có thể xóa nhanh, và kế thừa toàn bộ props của shadcn Switch primitive.

## Purpose

Cung cấp công tắc bật/tắt nhanh cho các tiêu chí lọc nhị phân (ví dụ: "Chỉ hiện hàng có sẵn", "Sản phẩm giảm giá", "Hàng in 3D hoàn thiện") với khả năng hiển thị chip badge tương tác.

## Use Cases

- Bộ lọc trạng thái còn hàng ("In stock only") trong catalog sản phẩm.
- Bộ lọc nhị phân trong `Filter` facade hoặc `FilterMobileGroup`.

## When to Use

- Cần bộ lọc bật/tắt dạng toggle switch trực quan thay vì checkbox truyền thống.
- Cần hiển thị huy hiệu (badge chip) khi switch đang bật và cho phép nhấn nút 'X' để tắt nhanh bộ lọc.
- Cần hỗ trợ cả chế độ controlled (`checked`) và uncontrolled (`defaultChecked`).

## When NOT to Use

- Cần chọn giữa 3 trạng thái trở lên (dùng `SortFilter`, `TypeFilter`, hoặc `Select`).
- Danh sách nhiều checkbox độc lập (dùng `Checkbox` group).

## Import

```tsx
import SwitchFilter, { type SwitchFilterProps } from "@/components/shared/filter/switch-filter";
```

## Props

The component also supports native and Radix Switch props through:
`React.ComponentProps<typeof Switch>` (ngoại trừ các props đã được tùy biến).

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `label` | `ReactNode` | Yes | — | Nội dung nhãn văn bản hiển thị cạnh công tắc |
| `activeLabel` | `ReactNode` | No | — | Nhãn hiển thị trên huy hiệu badge khi switch đang bật (nếu không truyền, dùng `label`) |
| `checked` | `boolean` | No | — | Trạng thái bật/tắt ở chế độ controlled |
| `defaultChecked` | `boolean` | No | `false` | Trạng thái bật/tắt ban đầu ở chế độ uncontrolled |
| `description` | `ReactNode` | No | — | Đoạn mô tả giải thích thêm bên dưới nhãn |
| `labelPosition` | `"left"` \| `"right"` | No | `"left"` | Vị trí đặt nhãn so với nút switch |
| `showActiveBadge` | `boolean` | No | `false` | Hiển thị huy hiệu badge khi công tắc được bật trên desktop |
| `clearable` | `boolean` | No | `true` | Hiển thị icon nút 'X' trên badge cho phép click để tắt nhanh switch |
| `disabled` | `boolean` | No | `false` | Vô hiệu hóa tương tác switch |
| `id` | `string` | No | Tự sinh bằng `useId()` | Định danh HTML id kết nối Label với Switch |
| `onCheckedChange` | `(checked: boolean) => void` | No | — | Callback được gọi khi trạng thái switch thay đổi |
| `onClear` | `() => void` | No | — | Callback được gọi khi người dùng nhấn nút 'X' xóa bộ lọc |
| `rootClassName` | `string` | No | — | Lớp CSS tùy biến cho container |
| `labelClassName` | `string` | No | — | Lớp CSS tùy biến cho Label |
| `descriptionClassName` | `string` | No | — | Lớp CSS tùy biến cho phần mô tả |
| `badgeProps` | `BadgeProps` | No | — | Props truyền vào component `Badge` |
| `clearButtonProps` | `ButtonProps` | No | — | Props truyền vào nút xóa 'X' trên badge |

## States

- **Controlled vs Uncontrolled**: Nhận diện qua sự hiện diện của prop `checked`. Nếu `checked !== undefined`, component tuân thủ controlled mode, ngược lại lưu state qua `internalChecked`.
- **Active Badge State**: Khi `showActiveBadge=true` và switch đang bật (`isChecked=true`), badge màu xám nhạt bo tròn pill sẽ xuất hiện bên cạnh công tắc (trên màn hình desktop).
- **Disabled State**: Nút switch không thể gạt, nhãn chuyển sang mờ đục `opacity-50` và con trỏ chuột dạng `cursor-not-allowed`.

## Responsive Behavior

- **Desktop (`max-sm:hidden`)**: Hiển thị đầy đủ khối công tắc kèm huy hiệu `activeBadge` (nếu được bật).
- **Mobile (`sm:hidden`)**: Chỉ hiển thị phần công tắc điều khiển, ẩn huy hiệu để tối ưu diện tích trong ngăn kéo `MobileFilterSheet`.

## Basic Usage

```tsx
import SwitchFilter from "@/components/shared/filter/switch-filter";

export function InStockFilter() {
  return (
    <SwitchFilter
      label="Còn hàng"
      defaultChecked={false}
      onCheckedChange={(checked) => {
        console.log("Lọc còn hàng:", checked);
      }}
    />
  );
}
```

## Advanced Usage

### Kèm Huy hiệu Badge và Mô tả chi tiết

```tsx
import { useState } from "react";
import SwitchFilter from "@/components/shared/filter/switch-filter";

export function AdvancedSwitchFilterDemo() {
  const [inStock, setInStock] = useState(true);

  return (
    <SwitchFilter
      label="Sản phẩm có sẵn"
      description="Chỉ hiển thị các mẫu insert đang có hàng giao ngay"
      checked={inStock}
      onCheckedChange={setInStock}
      showActiveBadge
      activeLabel="Đang lọc: Có sẵn tại kho"
      clearable
      onClear={() => setInStock(false)}
      labelPosition="left"
    />
  );
}
```

## Dependencies

### Internal

- `Switch` từ `@/components/ui/switch`
- `Badge` từ `@/components/ui/badge`
- `Button` từ `@/components/ui/button`
- `Label` từ `@/components/ui/label`
- `cn` từ `@/utils/cn`

### External

- `lucide-react` (`X`)

## Accessibility

- Thẻ `<Label>` kết nối chặt chẽ với `<Switch>` thông qua thuộc tính `htmlFor={switchId}`.
- Nút xóa bộ lọc có `aria-label="Clear switch filter"`.

## Implementation Notes

- Runtime: Đây là `"use client"` component.
- Thao tác nhấn nút 'X' trên badge sẽ tự động cập nhật giá trị switch về `false` và kích hoạt cả hai callback: `onCheckedChange(false)` và `onClear()`.
