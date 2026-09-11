# ImageComparison

`ImageComparison` là component so sánh hai hình ảnh tương tác bằng thanh trượt kéo ngang (interactive before/after image comparison slider), sử dụng thư viện `react-compare-slider`.

## Purpose

Trình diễn sự khác biệt trực quan rõ rệt trước và sau khi sử dụng sản phẩm (ví dụ: hộp boardgame lộn xộn ban đầu vs. hộp boardgame được sắp xếp ngăn nắp, tinh tế sau khi dùng bộ insert của Game Piece Labs).

## Use Cases

- Trình diễn hiệu quả của sản phẩm trên Trang chủ (`src/app/(storefront)/page.tsx`).
- Minh họa tính năng trong trang Chi tiết sản phẩm hoặc bài viết giới thiệu giải pháp.

## When to Use

- Cần so sánh 2 hình ảnh có cùng góc chụp hoặc cùng kích thước (Before & After).
- Cần thanh kéo giữa có nút tròn cầm nắm trực quan, hỗ trợ kéo chuột trên desktop, vuốt cảm ứng trên điện thoại và phím mũi tên bàn phím.

## When NOT to Use

- Hai ảnh có tỉ lệ hoặc kích thước quá lệch nhau.
- Chỉ cần xem album nhiều ảnh (dùng `ImageSlider` hoặc `ProductGallery`).

## Import

```tsx
import { ImageComparison } from "@/components/shared/image/image-comparision";
```

## Props

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `imageOne` | `string` | Yes | — | Đường dẫn URL hình ảnh thứ nhất (nằm bên trái thanh trượt) |
| `imageTwo` | `string` | Yes | — | Đường dẫn URL hình ảnh thứ hai (nằm bên phải thanh trượt) |

## Responsive Behavior

- Container tự động co giãn theo chiều ngang với các mốc kích thước tối đa chuẩn:
  - Mobile: `w-[calc(100%-5px)]`
  - Tablet: `sm:w-[calc(100%-3rem)] sm:max-w-[620px]`
  - Laptop: `lg:max-w-[940px]`
  - Desktop: `xl:w-[calc(70%-50px)] xl:max-w-[1080px]`
- Hình ảnh tự động vừa vặn bên trong khung và bo góc `rounded-xl overflow-hidden`.

## Basic Usage

```tsx
import { ImageComparison } from "@/components/shared/image/image-comparision";

export function InsertComparisonSection() {
  return (
    <ImageComparison
      imageOne="/images/showcase/catan-before.jpg"
      imageTwo="/images/showcase/catan-after.jpg"
    />
  );
}
```

## Dependencies

### Internal

- Không có dependencies component nội bộ.

### External

- `react-compare-slider/components`
- `react-compare-slider/hooks`

## Accessibility

- Nút tay cầm trượt (`Slider.HandleRoot`) được cấu hình thuộc tính trợ năng:
  `aria-label="Kéo hoặc dùng phím mũi tên để so sánh hai hình ảnh"`.
- Hỗ trợ điều khiển bằng phím mũi tên Trái/Phải khi focus vào thanh điều khiển.
- Hỗ trợ `group-focus-visible/handle:ring-4` cho người dùng bàn phím.

## Styling

- Thanh trượt có đường ranh giới trắng mảnh có đổ bóng nhẹ `shadow-[0_0_3px_rgba(0,0,0,0.45)]`.
- Nút tròn trung tâm màu trắng với 3 sọc dọc màu xám đậm `bg-neutral-800` biểu trưng cho bề mặt bám tay cầm.

## Implementation Notes

- Runtime: Đây là `"use client"` component do phụ thuộc vào DOM event handling của thư viện `react-compare-slider`.
- File source được đặt tên là `image-comparision.tsx` (chú ý chính tả tên file).
