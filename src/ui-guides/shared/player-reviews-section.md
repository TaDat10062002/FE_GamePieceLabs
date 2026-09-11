# PlayerReviewsSection

`PlayerReviewsSection` là component carousel hiển thị các đánh giá và phản hồi từ người chơi (player testimonials/reviews), hỗ trợ cả hai dạng trình bày: thẻ hình ảnh (`image`) và thẻ bài viết văn bản (`content`).

## Purpose

Xây dựng bằng chứng xã hội (social proof) và gia tăng độ tin cậy của khách hàng đối với các sản phẩm phụ kiện boardgame thông qua đánh giá thực tế và số sao xếp hạng của người mua trước.

## Use Cases

- Phần đánh giá của người chơi trên Trang chủ (`src/app/(storefront)/page.tsx`).
- Phần phản hồi khách hàng trong trang Chi tiết sản phẩm (`src/app/(storefront)/products/[id]/page.tsx`).

## When to Use

- Cần hiển thị danh sách đánh giá dạng slider/carousel mượt mà có hỗ trợ vuốt chạm (touch drag).
- Cần nút điều hướng mũi tên đặt ở góc trên bên phải tiêu đề section.
- Hỗ trợ linh hoạt giữa ảnh chụp thực tế kèm feedback hoặc bài viết nhận xét chi tiết.

## When NOT to Use

- Danh sách bình luận dạng comment thread cho phép người dùng nhập form gửi bình luận mới.
- Chỉ cần một trích dẫn quote đơn lẻ không cần carousel.

## Import

```tsx
import { PlayerReviewsSection } from "@/components/shared/player-reviews-section";
import type {
  PlayerReviewContent,
  PlayerReviewImage,
  PlayerReviewsVariant,
} from "@/features/home/types/player-review";
```

## Props

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `variant` | `PlayerReviewsVariant` (`"image"` \| `"content"`) | Yes | — | Chế độ hiển thị: dạng thẻ ảnh phủ chữ (`"image"`) hoặc thẻ văn bản (`"content"`) |
| `imageList` | `readonly PlayerReviewImage[]` | Yes | — | Danh sách dữ liệu đánh giá dạng hình ảnh (dùng khi `variant="image"`) |
| `contentList` | `readonly PlayerReviewContent[]` | Yes | — | Danh sách dữ liệu đánh giá dạng bài viết (dùng khi `variant="content"`) |
| `className` | `string` | No | — | Lớp CSS tùy biến cho thẻ `<section>` bao ngoài |

### Type Definitions

```ts
export type PlayerReviewsVariant = "image" | "content";

export interface PlayerReviewImage {
  id: string;
  imageSrc: string;
  imageAlt: string;
  rating: number; // 1 -> 5 sao
  author: string;
}

export interface PlayerReviewContent {
  id: string;
  rating: number; // 1 -> 5 sao
  author: string;
  paragraphs: string[];
}
```

## Variants

### `variant="image"`

- Render các thẻ hình ảnh với chiều cao tối thiểu `min-h-[320px] sm:min-h-[360px]`.
- Nền ảnh phủ một lớp gradient đen từ dưới lên (`from-black/85 to-transparent`).
- Hiển thị sao đánh giá màu vàng amber và tên tác giả đè lên ảnh.

### `variant="content"`

- Render các thẻ đánh giá dạng card chữ sạch sẽ.
- Hiển thị các ngôi sao vàng ở đầu, tiêu đề tên tác giả, và các đoạn văn nhận xét chi tiết (`paragraphs`).

## States

- **Prev / Next Button Disabled**: Khi carousel ở vị trí đầu tiên, nút Previous bị disable (`disabled:opacity-30 disabled:cursor-not-allowed`). Khi ở vị trí cuối, nút Next bị disable.
- **Scroll Sync State**: Lắng nghe sự kiện `select` và `reInit` của Embla Carousel API để cập nhật trạng thái có thể cuộn (`canScrollPrev`, `canScrollNext`).

## Responsive Behavior

- Kích thước mỗi mục trong carousel:
  - Mobile (`< 640px`): `basis-[88%]` (hiển thị gần 1 slide, chừa mép để gợi ý người dùng vuốt ngang).
  - Tablet (`sm: 640px - 1023px`): `basis-[48%]` (hiển thị 2 slide).
  - Desktop (`lg: >= 1024px`): `basis-[32%]` (hiển thị 3 slide).
- Container có chiều rộng tối đa `max-w-[1900px]` với padding thích ứng `px-4 sm:px-6 xl:px-[50px]`.

## Basic Usage

```tsx
import { PlayerReviewsSection } from "@/components/shared/player-reviews-section";

const reviewImages = [
  {
    id: "rev-1",
    imageSrc: "/images/reviews/player-1.jpg",
    imageAlt: "Nemesis insert in use",
    rating: 5,
    author: "Alex Pham",
  },
];

export function ReviewsImageDemo() {
  return (
    <PlayerReviewsSection
      variant="image"
      imageList={reviewImages}
      contentList={[]}
    />
  );
}
```

## Advanced Usage

### Dạng bài viết chi tiết (Content Variant)

```tsx
import { PlayerReviewsSection } from "@/components/shared/player-reviews-section";

const reviewContents = [
  {
    id: "rev-101",
    author: "Minh Triết",
    rating: 5,
    paragraphs: [
      "Bộ insert Nemesis in cực kỳ sắc nét, fit khít từng token và thẻ bài bọc sleeve.",
      "Thời gian setup trước ván game giảm từ 20 phút xuống chỉ còn 3 phút!",
    ],
  },
  {
    id: "rev-102",
    author: "David Nguyen",
    rating: 5,
    paragraphs: [
      "Chất lượng nhựa cứng cáp, đóng gói chắc chắn. Rất đáng đồng tiền bát gạo!",
    ],
  },
];

export function ReviewsContentDemo() {
  return (
    <PlayerReviewsSection
      variant="content"
      imageList={[]}
      contentList={reviewContents}
    />
  );
}
```

## Dependencies

### Internal

- `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselApi` từ `@/components/ui/carousel`
- `cn` từ `@/utils/cn`

### External

- `next/image`
- `lucide-react` (`ChevronLeft`, `ChevronRight`, `Star`)

## Accessibility

- Thẻ bao ngoài sử dụng `<section aria-label="Player Reviews">`.
- Các nút điều hướng có thuộc tính `aria-label="Previous reviews"` và `aria-label="Next reviews"`.
- Điểm đánh giá số sao được bổ sung `aria-label="${review.rating} out of 5 stars"`.

## Implementation Notes

- Runtime: Đây là `"use client"` component do quản lý Carousel API và Embla event listeners.
- Tùy chọn carousel sử dụng `opts={{ align: 'start', containScroll: 'trimSnaps', dragFree: true }}` đem lại trải nghiệm lướt tự nhiên trên màn hình cảm ứng.
