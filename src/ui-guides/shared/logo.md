# Logo

`Logo` là component hiển thị biểu trưng nhận diện thương hiệu của Game Piece Labs kết hợp giữa hình ảnh nhãn hiệu và chữ định danh, đóng vai trò là liên kết điều hướng về Trang chủ.

## Purpose

Cung cấp logo chuẩn hóa cho toàn bộ website (Header, Footer, các trang xác thực hoặc trang thông báo) với kích thước và khoảng cách responsive đồng nhất.

## Use Cases

- Thanh tiêu đề chính của trang web (`site-header.tsx`).
- Chân trang (`site-footer.tsx`).
- Trang bảo trì hoặc trang lỗi 404 / 500.

## When to Use

- Bất kỳ nơi nào cần hiển thị thương hiệu Game Piece Labs có kèm liên kết dẫn về Trang chủ (`/`).

## When NOT to Use

- Chỉ cần icon biểu tượng riêng lẻ không kèm text và không có liên kết (hãy dùng thẻ `<Image>` trực tiếp với asset `/brand/game-piece-labs-mark.png`).

## Import

```tsx
import { Logo } from "@/components/shared/logo";
```

## Props

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `className` | `string` | No | — | Lớp CSS tùy biến cho thẻ bao ngoài `<Link>` |
| `imageClassName` | `string` | No | — | Lớp CSS tùy biến cho ảnh logo `<Image>` |

## Responsive Behavior

- **Mobile (`< 640px`)**:
  - Icon kích thước `size-12` (48x48px).
  - Khoảng cách `gap-2`.
  - Tiêu đề text `text-base`.
  - Phụ đề `text-[0.6875rem]`.
- **Tablet / Desktop (`>= 640px` / `xl:` )**:
  - Icon kích thước `sm:size-14` (56x56px).
  - Khoảng cách `sm:gap-3`.
  - Tiêu đề text `sm:text-lg xl:text-xl`.
  - Phụ đề `sm:text-xs`.

## Basic Usage

```tsx
import { Logo } from "@/components/shared/logo";

export function HeaderBar() {
  return (
    <header className="flex h-16 items-center px-4">
      <Logo />
    </header>
  );
}
```

## Advanced Usage

### Tùy biến kích thước cho Footer hoặc Banner lớn

```tsx
import { Logo } from "@/components/shared/logo";

export function FooterBranding() {
  return (
    <div className="py-8">
      <Logo
        className="opacity-90 hover:opacity-100"
        imageClassName="sm:size-16"
      />
    </div>
  );
}
```

## Dependencies

### Internal

- `cn` từ `@/utils/cn`

### External

- `next/image`
- `next/link`

## Accessibility

- Thẻ `<Link>` được cấu hình thuộc tính trợ năng `aria-label="Game Piece Labs - Trang chủ"`.
- Ảnh logo có thuộc tính `alt="Game Piece Labs - Phụ kiện boardgame"`.
- Hỗ trợ đường viền focus cho bàn phím: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4`.

## Styling

- Font chữ in hoa có khoảng cách dãn chữ sang trọng (`tracking-[0.06em]`).
- Phụ đề canh giữa nhỏ gọn (`tracking-[0.08em]`).
- Tải ảnh ưu tiên (`loading="eager"`) để tối ưu chỉ số LCP (Largest Contentful Paint) trên header.

## Implementation Notes

- Ảnh thương hiệu được lưu tại `/brand/game-piece-labs-mark.png`.
