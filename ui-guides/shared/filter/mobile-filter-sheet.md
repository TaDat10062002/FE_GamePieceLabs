# MobileFilterSheet

`MobileFilterSheet` cung cấp giao diện ngăn kéo trượt từ đáy màn hình (`Sheet side="bottom"`) để chứa các tùy chọn lọc và sắp xếp trên thiết bị di động, đi kèm nút kích hoạt pill bo tròn và nút áp dụng bộ lọc.

## Purpose

Giải quyết vấn đề thiếu không gian hiển thị bộ lọc trên màn hình điện thoại bằng cách gom toàn bộ giao diện lọc vào một drawer phía dưới, có thanh cuộn nội bộ và nút đóng hình tròn nổi phía trên drawer.

## Use Cases

- Ngăn kéo bộ lọc di động dùng trong `FilterMobileGroup` (`src/components/shared/filter.tsx`).
- Bất kỳ màn hình danh mục sản phẩm nào cần mở bộ lọc dạng drawer từ dưới lên trên di động.

## When to Use

- Cần hiển thị bộ lọc phức tạp trên thiết bị di động.
- Cần ngăn kéo trượt từ dưới lên chiếm tối đa 70% chiều cao màn hình (`max-h-[70dvh]`).
- Cần nút đóng (`XIcon`) nổi bên trên sheet và nút "Apply" cố định ở chân sheet có tính đến vùng an toàn màn hình (`safe-area-inset-bottom`).

## When NOT to Use

- Giao diện lọc trên desktop (desktop đã có filter bar nằm ngang).
- Hộp thoại cảnh báo hay xác nhận hành động dạng blocking modal căn giữa màn hình (dùng `Dialog`).

## Import

```tsx
import { MobileFilterSheet } from "@/components/shared/filter/mobile-filter-sheet";
```

## Props

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `title` | `string` | Yes | — | Tiêu đề hiển thị ở đầu sheet và làm nhãn trợ năng cho nút mở |
| `children` | `ReactNode` | Yes | — | Toàn bộ nội dung hoặc các component bộ lọc hiển thị bên trong sheet |
| `disabled` | `boolean` | No | `false` | Vô hiệu hóa nút bấm mở bộ lọc |

## States

- **Disabled State**: Nút trigger "Filter and sort" bị mờ và không thể click (`disabled={disabled}`).
- **Open / Close State**: Được quản lý tự động bởi Radix Sheet primitive. Có thể đóng bằng cách click vào nút tròn X phía trên, click nút "Apply" ở dưới cùng hoặc vuốt/click ra ngoài vùng backdrop.

## Responsive Behavior

- Mặc dù bản thân sheet có thể hiển thị ở mọi kích cỡ màn hình, component được thiết kế chuyên biệt cho màn hình nhỏ (`sm:hidden` thường được áp dụng ở component cha bọc nó).
- Chiều cao sheet được giới hạn tối đa `max-h-[70dvh]`, phần nội dung bên trong tự động xuất hiện thanh cuộn dọc (`overflow-y-auto`).
- Đệm đáy tự động tính thêm phần notch hoặc thanh vuốt home của iOS: `pb-[calc(1.25rem+env(safe-area-inset-bottom))]`.

## Basic Usage

```tsx
import { MobileFilterSheet } from "@/components/shared/filter/mobile-filter-sheet";

export function MobileFilterDemo() {
  return (
    <MobileFilterSheet title="Bộ lọc sản phẩm">
      <div className="space-y-4 py-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" /> Còn hàng
        </label>
      </div>
    </MobileFilterSheet>
  );
}
```

## Advanced Usage

### Kết hợp Accordion nhiều tiêu chí lọc

```tsx
import { MobileFilterSheet } from "@/components/shared/filter/mobile-filter-sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function MultiCategoryFilterSheet() {
  return (
    <MobileFilterSheet title="Tùy chọn lọc">
      <Accordion type="multiple">
        <AccordionItem value="price">
          <AccordionTrigger>Khoảng giá</AccordionTrigger>
          <AccordionContent>Nội dung chọn giá...</AccordionContent>
        </AccordionItem>
        <AccordionItem value="brand">
          <AccordionTrigger>Thương hiệu</AccordionTrigger>
          <AccordionContent>Nội dung chọn thương hiệu...</AccordionContent>
        </AccordionItem>
      </Accordion>
    </MobileFilterSheet>
  );
}
```

## Dependencies

### Internal

- `Button` từ `@/components/ui/button`
- `Sheet`, `SheetClose`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetTrigger` từ `@/components/ui/sheet`
- `Tooltip`, `TooltipProvider`, `TooltipTrigger` từ `@/components/ui/tooltip`

### External

- `lucide-react` (`SlidersHorizontal`, `XIcon`)

## Accessibility

- Nút mở bộ lọc có `aria-label={"Open ${title.toLowerCase()} filter"}`.
- Nút đóng có `aria-label="Close filters"`.
- Tiêu đề được bọc trong `<SheetTitle>{title}</SheetTitle>` đảm bảo tuân thủ cấu trúc dialog accessibility của Radix UI.

## Styling

- Sheet bo tròn lớn ở mép trên: `rounded-t-4xl`.
- Có vạch chỉ báo kéo thả (pull indicator bar): `h-1 w-10 rounded-full bg-muted-foreground/30`.
- Nút Apply lớn bo tròn toàn phần: `py-8 rounded-full`.
- Nút đóng X màu trắng tròn nổi bật nằm ở vị trí âm bên trên sheet: `absolute size-12 -top-16 left-1/2 -translate-x-1/2 rounded-full`.

## Implementation Notes

- Runtime: Đây là `"use client"` component do sử dụng tương tác mở đóng Sheet và tooltip.
- Khi nhấn nút "Apply", sheet sẽ tự động đóng lại thông qua `SheetClose asChild`.
