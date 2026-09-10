# SocialMediaRail

`SocialMediaRail` là component thanh mạng xã hội gắn cố định (floating side rail) ở cạnh viền màn hình, có thể đóng mở trượt với hiệu ứng ánh kim (shimmer animation), hiển thị danh sách các kênh mạng xã hội kèm tooltip.

## Purpose

Cung cấp lối tắt nhanh giúp khách hàng dễ dàng kết nối với các kênh mạng xã hội của thương hiệu (Facebook, Instagram, TikTok) từ bất kỳ vị trí nào trên trang web mà không chiếm diện tích nội dung chính.

## Use Cases

- Layout tổng thể của storefront (`src/app/(storefront)/layout.tsx`).
- Chiến dịch marketing thúc đẩy người dùng theo dõi các trang mạng xã hội.

## When to Use

- Cần thanh mạng xã hội cố định bên mép màn hình (trái hoặc phải).
- Cần trải nghiệm đóng/mở mượt mà: thu gọn thành nút tay cầm nhỏ khi đóng và mở rộng ra khi người dùng click.
- Hỗ trợ đóng tự động khi click ra ngoài hoặc nhấn phím `Escape`.

## When NOT to Use

- Khối icon mạng xã hội tĩnh đặt cố định trong footer hoặc trang liên hệ (nên dùng danh sách thẻ link hoặc icon thông thường).
- Giao diện ứng dụng quản trị (Admin/Dashboard) không cần thanh floating bên cạnh.

## Import

```tsx
import {
  SocialMediaRail,
  type SocialMediaRailProps,
  type SocialMediaItem,
} from "@/components/shared/social-media";
```

## Props

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `items` | `SocialMediaItem[]` | Yes | — | Mảng danh sách các mạng xã hội cần hiển thị |
| `side` | `"left"` \| `"right"` | No | `"right"` | Vị trí mép màn hình gắn thanh rail |
| `defaultOpen` | `boolean` | No | `false` | Trạng thái mở mặc định ở chế độ uncontrolled |
| `open` | `boolean` | No | — | Trạng thái mở ở chế độ controlled |
| `onOpenChange` | `(open: boolean) => void` | No | — | Callback được gọi khi trạng thái đóng/mở thay đổi |
| `className` | `string` | No | — | Lớp CSS tùy biến cho thẻ `<aside>` bao ngoài |

### `SocialMediaItem` Interface

```ts
export interface SocialMediaItem {
  platform: string;     // Tên nền tảng (hỗ trợ "facebook", "instagram", "tiktok" để tự động áp dụng màu và icon)
  label: string;        // Nhãn hiển thị trong Tooltip và aria-label
  href: string;         // Liên kết URL ngoài
  icon?: ReactNode;     // Icon tùy biến (nếu không truyền, tự động dùng icon từ react-icons/fa6)
}
```

## States

- **Collapsed State (Mặc định)**: Toàn bộ danh sách link trượt ẩn ra ngoài mép màn hình (`translate-x-[calc(100%-1.5rem)]`), chỉ để lộ nút tay cầm nhỏ có hiệu ứng ánh sáng lấp lánh thu hút sự chú ý.
- **Expanded State**: Danh sách icon trượt ra đầy đủ, nút tay cầm ẩn đi, cho phép click vào từng link và hiển thị Tooltip hướng dẫn.
- **Controlled vs Uncontrolled**: Component hỗ trợ cả hai: tự quản lý state nội bộ qua `defaultOpen` hoặc kiểm soát từ bên ngoài qua cặp `open` và `onOpenChange`.

## Side Effects

- Tự động gắn event listeners toàn cục trên `document`:
  - Sự kiện `pointerdown`: tự động đóng rail khi click bên ngoài.
  - Sự kiện `keydown`: tự động đóng rail khi người dùng nhấn phím `Escape`.

## Responsive Behavior

- Cố định ở giữa cạnh màn hình: `fixed top-1/2 z-50 -translate-y-1/2`.
- Kích thước các nút icon thích ứng theo màn hình: `size-12 md:size-15 lg:size-12`.
- Độ dịch chuyển tay cầm thu gọn tự động căn chỉnh: `translate-x-[calc(100%-1.5rem)] sm:translate-x-[calc(100%-1.75rem)]`.

## Basic Usage

```tsx
import { SocialMediaRail, type SocialMediaItem } from "@/components/shared/social-media";

const socialLinks: SocialMediaItem[] = [
  {
    platform: "facebook",
    label: "Theo dõi chúng tôi trên Facebook",
    href: "https://www.facebook.com/In3DPhuKienBoardgame",
  },
  {
    platform: "instagram",
    label: "Xem hình ảnh trên Instagram",
    href: "https://instagram.com",
  },
  {
    platform: "tiktok",
    label: "Video hậu kỳ trên TikTok",
    href: "https://tiktok.com",
  },
];

export function GlobalSocialRail() {
  return (
    <SocialMediaRail
      items={socialLinks}
      side="right"
    />
  );
}
```

## Advanced Usage

### Kiểm soát đóng mở từ Header hoặc Nút ngoài (Controlled Mode)

```tsx
import { useState } from "react";
import { SocialMediaRail } from "@/components/shared/social-media";
import { Button } from "@/components/ui/button";

export function ControlledRailDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? "Đóng mạng xã hội" : "Mở mạng xã hội"}
      </Button>

      <SocialMediaRail
        items={[/* ... */]}
        side="left"
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </div>
  );
}
```

## Dependencies

### Internal

- `Button` từ `@/components/ui/button`
- `Tooltip`, `TooltipContent`, `TooltipProvider`, `TooltipTrigger` từ `@/components/ui/tooltip`
- `cn` từ `@/utils/cn`

### External

- `lucide-react` (`ChevronLeft`, `ChevronRight`)
- `react-icons/fa6` (`FaFacebookF`, `FaInstagram`, `FaTiktok`)

## Accessibility

- Thẻ bao bọc sử dụng `<aside aria-label="Social media links">`.
- Nút trigger có đầy đủ: `aria-expanded={isOpen}`, `aria-controls={listId}`, `aria-label="Open social media links"`.
- Danh sách link nằm trong thẻ `<nav id={listId} aria-label="Follow us" aria-hidden={!isOpen}>`.
- Các link khi đóng được gán `tabIndex={-1}` để ngăn người dùng bàn phím vô tình focus vào link đang bị ẩn.

## Styling

- Hỗ trợ màu sắc thương hiệu tự động:
  - Facebook: Nền xanh `#1877F2`
  - Instagram: Nền gradient tím - hồng - cam
  - TikTok: Nền đen `#010101` kèm viền bóng đôi xanh/đỏ đặc trưng
- Nút tay cầm có animation ánh kim vàng nhẹ (`social-handle-shimmer`).
