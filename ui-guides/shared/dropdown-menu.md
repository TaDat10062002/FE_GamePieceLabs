# DropdownMenu

`DropdownMenu` là component menu thả xuống cấu hình theo dạng khai báo dữ liệu (data-driven/schema-driven), đóng gói toàn bộ các primitive của Radix UI / shadcn Dropdown Menu thành một cấu trúc mảng `items`.

## Purpose

Đơn giản hóa việc xây dựng các menu hành động phức tạp, menu bộ lọc lọc theo dạng popup hoặc context menu nhiều cấp mà không cần phải thủ công lồng ghép hàng chục thẻ JSX primitive.

## Use Cases

- Trình đơn lựa chọn hành động (Action menu, User profile dropdown).
- Dropdown bộ lọc desktop trong bộ lọc giá (`PriceFilter`), sắp xếp (`SortFilter`), hoặc phân loại (`TypeFilter`).
- Menu con đa cấp (Submenus, nested categories).
- Nhóm tùy chọn dạng radio (`radio-group`) hoặc checkbox (`checkbox`).

## When to Use

- Cần render menu động từ dữ liệu hoặc schema có cấu trúc.
- Cần nhúng các custom component (slider, form inputs, grid buttons) bên trong dropdown thông qua entry type `"custom"`.
- Cần hỗ trợ radio group, checkbox item hoặc submenu mà vẫn giữ code gọn gàng.

## When NOT to Use

- Cần select box form truyền thống chuẩn native HTML (dùng `Select` từ `@/components/ui/select`).
- Menu điều hướng toàn trang dạng navbar (dùng `NavigationMenu` hoặc danh sách link thông thường).

## Import

```tsx
import DropdownMenu, {
  type DropdownMenuEntry,
  type DropdownMenuProps,
  type DropdownMenuActionItem,
  type DropdownMenuCheckboxEntry,
  type DropdownMenuCustomEntry,
  type DropdownMenuGroupEntry,
  type DropdownMenuLabelEntry,
  type DropdownMenuRadioGroupEntry,
  type DropdownMenuSeparatorEntry,
  type DropdownMenuSubEntry,
} from "@/components/shared/dropdown-menu";
```

## Props

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `trigger` | `ReactNode` | Yes | — | Phần tử UI kích hoạt mở menu khi nhấn/click |
| `items` | `DropdownMenuEntry[]` | Yes | — | Mảng danh sách các mục hiển thị trong menu |
| `rootProps` | `WithoutChildren<ComponentProps<typeof DropdownMenuRoot>>` | No | — | Props truyền trực tiếp vào `DropdownMenuRoot` (ví dụ `open`, `onOpenChange`) |
| `triggerProps` | `WithoutChildren<ComponentProps<typeof DropdownMenuTrigger>>` | No | — | Props truyền vào `DropdownMenuTrigger` (ví dụ `asChild`) |
| `contentProps` | `WithoutChildren<ComponentProps<typeof DropdownMenuContent>>` | No | — | Props truyền vào `DropdownMenuContent` (ví dụ `align`, `sideOffset`, `className`) |

## Entry Types (`DropdownMenuEntry`)

Hệ thống hỗ trợ 8 loại mục khác nhau phân biệt qua thuộc tính `type`:

1. **`item` (`DropdownMenuActionItem`)**: Nút bấm hành động thông thường, hỗ trợ `icon`, `label`, `shortcut`, `props.onSelect`.
2. **`checkbox` (`DropdownMenuCheckboxEntry`)**: Mục chọn bật/tắt dạng checkbox, nhận `props.checked`, `props.onCheckedChange`.
3. **`radio-group` (`DropdownMenuRadioGroupEntry`)**: Nhóm các mục chọn 1 (radio buttons), nhận `props.value`, `props.onValueChange`, và mảng `items`.
4. **`custom` (`DropdownMenuCustomEntry`)**: Render nội dung JSX bất kỳ bên trong menu (dùng cho Slider, nút tùy biến, lưới cột).
5. **`group` (`DropdownMenuGroupEntry`)**: Nhóm các item lại với nhau, chứa mảng lồng `items: DropdownMenuEntry[]`.
6. **`sub` (`DropdownMenuSubEntry`)**: Menu con cấp 2, mở rộng sang ngang khi hover hoặc click, nhận `triggerProps`, `contentProps` và `items`.
7. **`label` (`DropdownMenuLabelEntry`)**: Tiêu đề phân đoạn text không click được.
8. **`separator` (`DropdownMenuSeparatorEntry`)**: Đường kẻ phân cách giữa các khối mục.

## Responsive Behavior

- Menu content tự động áp dụng `max-w-[calc(100vw-2rem)]` để đảm bảo menu không bao giờ tràn ra ngoài viền màn hình trên thiết bị di động hoặc tablet hẹp.

## Basic Usage

```tsx
import DropdownMenu, { type DropdownMenuEntry } from "@/components/shared/dropdown-menu";
import { Button } from "@/components/ui/button";

const menuItems: DropdownMenuEntry[] = [
  { id: "lbl", type: "label", label: "Tài khoản" },
  {
    id: "profile",
    type: "item",
    label: "Thông tin cá nhân",
    props: { onSelect: () => console.log("Profile clicked") },
  },
  { id: "sep", type: "separator" },
  {
    id: "logout",
    type: "item",
    label: "Đăng xuất",
    props: { className: "text-red-600", onSelect: () => console.log("Logout") },
  },
];

export function UserMenu() {
  return (
    <DropdownMenu
      trigger={<Button variant="outline">Tùy chọn</Button>}
      items={menuItems}
      contentProps={{ align: "end" }}
    />
  );
}
```

## Advanced Usage

### Radio Group và Custom Filter Content

```tsx
import { useState } from "react";
import DropdownMenu, { type DropdownMenuEntry } from "@/components/shared/dropdown-menu";
import { Button } from "@/components/ui/button";

export function SortDropdownDemo() {
  const [sort, setSort] = useState("price_asc");

  const items: DropdownMenuEntry[] = [
    {
      id: "sort-group",
      type: "radio-group",
      props: {
        value: sort,
        onValueChange: setSort,
      },
      items: [
        { id: "price_asc", label: "Giá tăng dần", props: { value: "price_asc" } },
        { id: "price_desc", label: "Giá giảm dần", props: { value: "price_desc" } },
        { id: "best_selling", label: "Bán chạy nhất", props: { value: "best_selling" } },
      ],
    },
  ];

  return (
    <DropdownMenu
      trigger={<Button variant="ghost">Sắp xếp: {sort}</Button>}
      items={items}
      triggerProps={{ asChild: true }}
    />
  );
}
```

## Dependencies

### Internal

- Toàn bộ primitive từ `@/components/ui/dropdown-menu`:
  - `DropdownMenu` (Root)
  - `DropdownMenuTrigger`
  - `DropdownMenuContent`
  - `DropdownMenuItem`
  - `DropdownMenuCheckboxItem`
  - `DropdownMenuRadioGroup`
  - `DropdownMenuRadioItem`
  - `DropdownMenuLabel`
  - `DropdownMenuSeparator`
  - `DropdownMenuShortcut`
  - `DropdownMenuGroup`
  - `DropdownMenuSub`
  - `DropdownMenuSubTrigger`
  - `DropdownMenuSubContent`
- `cn` từ `@/utils/cn`

## Accessibility

- Thừa hưởng đầy đủ tiêu chuẩn trợ năng WAI-ARIA từ Radix UI Dropdown Menu:
  - Quản lý tiêu điểm (focus trap khi mở, trả focus về trigger khi đóng).
  - Điều hướng bằng các phím mũi tên Lên/Xuống/Trái/Phải.
  - Phím `Escape` đóng menu ngay lập tức.
  - Phím `Enter` hoặc `Space` để kích hoạt mục.

## Implementation Notes

- Runtime: Đây là `"use client"` component do phụ thuộc vào state và DOM event listeners của Radix UI.
- Thao tác đóng menu không làm mất focus ngoài ý muốn nhờ hỗ trợ event handling qua `contentProps`.
