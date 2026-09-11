# MarqueeText

`MarqueeText` là component hiển thị dòng chữ chạy ngang vô tận (infinite running text) với chuyển động CSS mượt mà và hỗ trợ đầy đủ các nguyên tắc trợ năng (accessibility & reduced motion).

## Purpose

Tạo điểm nhấn thị giác năng động, hiện đại và phân tách các phần nội dung trong các trang giới thiệu bộ sưu tập hoặc trang chủ, truyền tải thông điệp thương hiệu lặp lại theo phong cách typographic marquee.

## Use Cases

- Ngăn cách giữa các block sản phẩm trên Trang chủ (`page.tsx`).
- Đầu hoặc chân trang bộ sưu tập (`board-game-inserts`, `by-game-name`, `ox-product-family`, `tokens`).
- Banner thông báo sự kiện hoặc khẩu hiệu thương hiệu lớn.

## When to Use

- Cần hiệu ứng chữ trượt ngang liên tục để trang trí bố cục hoặc thu hút sự chú ý.
- Muốn tạo nhịp điệu chuyển động mà không làm ảnh hưởng xấu đến hiệu năng (sử dụng CSS transform 3D và `will-change-transform`).

## When NOT to Use

- Văn bản quan trọng chứa thông tin người dùng cần đọc kỹ từng chữ hoặc click liên kết (chữ chạy liên tục gây khó đọc đối với thông tin chi tiết).
- Trên các trang yêu cầu trải nghiệm tĩnh hoặc tài liệu kỹ thuật.

## Import

```tsx
import { MarqueeText, type MarqueeTextProps } from "@/components/shared/marquee-text";
```

## Props

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `title` | `string` | Yes | — | Nội dung văn bản hiển thị lặp lại trong chuỗi chạy |
| `speed` | `number` | No | `18` | Thời gian chạy hết 1 chu kỳ tính bằng giây (số càng nhỏ tốc độ càng nhanh) |
| `fontSize` | `keyof typeof fontSizeClasses` | No | `'text-4xl'` | Kích thước chữ theo thang đo định sẵn (`'text-2xl'` đến `'text-8xl'`) |
| `className` | `string` | No | — | Lớp CSS tùy biến cho container bao ngoài |

## Variants

### `fontSize`

Hệ thống cung cấp 7 biến thể kích thước responsive tự động co giãn theo viewport:

- `'text-2xl'`: `text-xl sm:text-2xl`
- `'text-3xl'`: `text-2xl sm:text-3xl`
- `'text-4xl'`: `text-3xl sm:text-4xl` (Mặc định)
- `'text-5xl'`: `text-3xl sm:text-5xl`
- `'text-6xl'`: `text-4xl sm:text-6xl`
- `'text-7xl'`: `text-4xl sm:text-7xl`
- `'text-8xl'`: `text-5xl sm:text-7xl lg:text-8xl`

## Responsive Behavior

- Kích thước chữ và khoảng cách đệm (`px-7 sm:px-14`) tự động mở rộng khi màn hình lớn hơn breakpoint `sm:`.
- Chiều rộng tự động lấp đầy 100% viewport với `w-full overflow-hidden`.

## Basic Usage

```tsx
import { MarqueeText } from "@/components/shared/marquee-text";

export function PromoSection() {
  return (
    <MarqueeText title="PREMIUM BOARD GAME ACCESSORIES" />
  );
}
```

## Advanced Usage

### Tùy biến tốc độ nhanh và cỡ chữ khổng lồ

```tsx
import { MarqueeText } from "@/components/shared/marquee-text";

export function HeroMarquee() {
  return (
    <MarqueeText
      title="GAME PIECE LABS • PRECISION 3D PRINTING • CRAFTED FOR GAMERS • "
      speed={12}
      fontSize="text-6xl"
      className="my-16 text-neutral-400 opacity-60"
    />
  );
}
```

## Dependencies

### Internal

- `cn` từ `@/utils/cn`

### External

- Không phụ thuộc thư viện ngoài (sử dụng Pure CSS `@keyframes marquee-scroll`).

## Accessibility

- **Screen Reader Support**: Nội dung văn bản được hiển thị một lần duy nhất cho bộ đọc màn hình qua `<span className="sr-only">{title}</span>`. Dải chữ chạy lặp lại được ẩn hoàn toàn với screen reader bằng `aria-hidden="true"` để tránh việc đọc lặp vô nghĩa.
- **Prefers-Reduced-Motion**: Tích hợp sẵn media query `@media (prefers-reduced-motion: reduce)` tự động tắt animation (`animation: none !important`) đối với người dùng bật chế độ giảm chuyển động trong hệ điều hành nhằm tránh gây chóng mặt.

## Styling

- Mặc định văn bản có màu xám sáng `text-zinc-200` và khoảng cách trên dưới `my-10`.
- Chuyển động sử dụng `motion-safe:animate-[marquee-scroll_var(--marquee-duration)_linear_infinite]`.
