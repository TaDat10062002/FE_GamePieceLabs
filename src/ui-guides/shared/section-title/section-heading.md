# SectionHeading

`SectionHeading` là component tiêu đề phân đoạn hạt nhân (atomic section heading) trong hệ thống `section-title`, hiển thị thẻ tiêu đề `<h2>` kết hợp liên kết "Xem thêm" (`more`) kèm icon mũi tên tròn đổi màu khi hover.

## Purpose

Chuẩn hóa tiêu đề phân đoạn và nút điều hướng "Xem thêm", hỗ trợ hai hướng bố cục (ngang `horizon` và dọc `vertical`) cùng 3 chế độ căn lề (`left`, `center`, `right`).

## Use Cases

- Tiêu đề trong các sub-component `CardGridSection`, `TextContentSection`, và `VerticalSplitContentSection`.
- Tiêu đề độc lập cho các khối nội dung tùy biến trong trang.

## When to Use

- Cần render tiêu đề `<h2>` có id phục vụ thuộc tính `aria-labelledby`.
- Cần nút liên kết "Xem thêm" có icon tròn đỏ nổi bật khi hover.
- Cần linh hoạt đặt nút "Xem thêm" ngang hàng với tiêu đề hoặc nằm bên dưới tiêu đề.

## When NOT to Use

- Tiêu đề phức tạp có thêm dòng dẫn đề `eyebrow` và mô tả `description` (dùng `StoreSectionHeading`).

## Import

```tsx
import {
  SectionHeading,
  createSectionTitleId,
} from "@/components/shared/section-title/section-heading";
import type {
  SectionTitleAlign,
  SectionTitleMore,
  SectionTitleOrientation,
} from "@/components/shared/section-title/types";
```

## Props

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `title` | `string` | Yes | — | Tiêu đề phân đoạn |
| `titleId` | `string` | Yes | — | Định danh HTML id cho thẻ `<h2>` (thường sinh bằng `createSectionTitleId(title)`) |
| `more` | `SectionTitleMore` (`{ label?: string; href?: string }`) | No | — | Cấu hình liên kết xem thêm |
| `align` | `SectionTitleAlign` (`"left"` \| `"center"` \| `"right"`) | No | `"left"` | Căn chỉnh văn bản tiêu đề |
| `orientation` | `SectionTitleOrientation` (`"horizon"` \| `"vertical"`) | No | `"horizon"` | Bố cục ngang (`horizon`) hoặc xếp dọc (`vertical`) |
| `className` | `string` | No | — | Lớp CSS tùy biến cho container |

## Variants

### `orientation`

- `"horizon"` (Mặc định):
  - Mobile: Xếp dọc (`flex-col gap-3`).
  - Tablet/Desktop (`sm:`): Xếp ngang một hàng, tiêu đề bên trái và liên kết 'more' bên phải (`sm:flex-row sm:items-center sm:justify-between`).
- `"vertical"`:
  - Xếp dọc trên mọi màn hình, căn lề theo prop `align` (`items-start`, `items-center`, `items-end`).

### `align`

- `"left"`: Tiêu đề căn trái (`text-left`, `items-start`).
- `"center"`: Tiêu đề căn giữa (`text-center`, `items-center`).
- `"right"`: Tiêu đề căn phải (`text-right`, `items-end`).

## Basic Usage

```tsx
import {
  SectionHeading,
  createSectionTitleId,
} from "@/components/shared/section-title/section-heading";

export function HeadingDemo() {
  const title = "Sản Phẩm Mới";
  const titleId = createSectionTitleId(title);

  return (
    <SectionHeading
      title={title}
      titleId={titleId}
      more={{ label: "Xem tất cả", href: "/collections/new" }}
    />
  );
}
```

## Helper Functions

### `createSectionTitleId(title: string): string`

Hàm tiện ích chuyển đổi tiêu đề thành chuỗi slug thân thiện làm id:

```ts
createSectionTitleId("Board Game Inserts"); // -> "board-game-inserts-title"
```

## Dependencies

### Internal

- `SectionTitleAlign`, `SectionTitleMore`, `SectionTitleOrientation` từ `./types`
- `cn` từ `@/utils/cn`

### External

- `next/link`
- `lucide-react` (`ChevronRight`)

## Accessibility

- Thẻ `<h2>` nhận `id={titleId}` trực tiếp.
- Icon `ChevronRight` có thuộc tính `aria-hidden="true"`.
- Nút liên kết có viền focus rõ ràng: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4`.

## Styling

- Tiêu đề sử dụng token kích thước chuẩn `type-h2 m-0 text-neutral-950`.
- Nút 'more' có icon tròn xám `bg-neutral-200 text-neutral-700`, khi hover chuyển sang màu đỏ thương hiệu `group-hover:bg-red-600 group-hover:text-white` và chữ chuyển sang `hover:text-red-600`.
