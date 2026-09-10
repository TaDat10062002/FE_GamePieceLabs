# ImageSlider

`ImageSlider` là component trình chiếu banner hình ảnh chính (Hero Image Carousel/Slider) chất lượng cao, hỗ trợ tự động chuyển slide (`autoplay`), hiệu ứng nút điều hướng kính mờ thủy tinh (liquid glassmorphism) và nút kêu gọi hành động (Call To Action).

## Purpose

Tạo banner mở đầu ấn tượng cho Trang chủ, giới thiệu các bộ sưu tập hoặc chương trình khuyến mãi nổi bật kèm hình ảnh bắt mắt, phụ đề và nút bấm chuyển hướng.

## Use Cases

- Banner Hero chính trên Trang chủ (`src/app/(storefront)/page.tsx`).
- Trình chiếu sự kiện hoặc chiến dịch quảng bá bộ sưu tập mới.

## When to Use

- Cần banner lớn dạng carousel chuyển động mượt mà với nhiều slide.
- Cần tính năng tự động chuyển slide có thể tạm dừng hoặc điều chỉnh chu kỳ thời gian.
- Cần nút điều hướng phong cách Liquid Glass độc đáo ở góc dưới bên phải.

## When NOT to Use

- Thư viện ảnh thu nhỏ của chi tiết sản phẩm (dùng `ProductGallery`).
- Carousel đánh giá của người chơi (dùng `PlayerReviewsSection`).

## Import

```tsx
import {
  ImageSlider,
  type ImageSliderProps,
  type ImageSliderSlide,
} from "@/components/shared/image/image-slider";
```

## Props

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `slides` | `readonly ImageSliderSlide[]` | Yes | — | Danh sách các slide trình chiếu |
| `autoplay` | `boolean` | No | `true` | Bật/tắt chế độ tự động chuyển slide |
| `autoplayInterval` | `number` | No | `10000` | Chu kỳ tự động chuyển slide tính bằng mili-giây (10 giây) |
| `ariaLabel` | `string` | No | `"Featured collections"` | Nhãn trợ năng cho carousel |
| `className` | `string` | No | — | Lớp CSS tùy biến cho container bao ngoài |

### `ImageSliderSlide` Interface

```ts
export interface ImageSliderSlide {
  id: string | number; // Định danh slide
  title: string;       // Tiêu đề lớn của slide
  subtitle?: string;   // Phụ đề mô tả ngắn
  imageSrc: string;    // Đường dẫn URL ảnh nền
  imageAlt: string;    // Văn bản mô tả ảnh cho accessibility
  ctaLabel: string;    // Nhãn trên nút bấm kêu gọi hành động
  ctaHref: string;     // Đường dẫn đích của nút CTA
}
```

## States

- **Autoplay Loop**: Khi `autoplay=true` và có từ 2 slide trở lên, đồng hồ đếm `setInterval` sẽ tự động chuyển slide tiếp theo sau mỗi `autoplayInterval` mili-giây. Tự động dọn dẹp interval khi unmount.
- **Single Slide vs Multi Slide**: Nếu chỉ có 1 slide, vô hiệu hóa tính năng loop và ẩn nút điều hướng. Nếu mảng rỗng `slides.length === 0`, component trả về `null`.

## Responsive Behavior

- **Chiều cao khung hình thích ứng theo breakpoint**:
  - Mobile: `min-h-[280px]`
  - sm: `sm:min-h-[340px]`
  - md: `md:min-h-[400px]`
  - lg: `lg:min-h-[460px]`
  - xl: `xl:min-h-[570px]`
- **Vị trí nút CTA**:
  - Trên mobile (`< 640px`): nút CTA căn giữa tuyệt đối ở đáy slide (`max-sm:absolute max-sm:bottom-10 max-sm:left-1/2 max-sm:-translate-x-1/2`).
  - Từ màn hình `sm:` trở lên: nút CTA nằm theo luồng văn bản góc dưới bên trái.
- Nút điều hướng Liquid Glass (Next/Prev) ẩn trên mobile và chỉ hiển thị ở góc phải dưới từ `sm:` trở lên.

## Basic Usage

```tsx
import { ImageSlider, type ImageSliderSlide } from "@/components/shared/image/image-slider";

const heroSlides: ImageSliderSlide[] = [
  {
    id: "nemesis-collection",
    title: "Nemesis: Khởi Đầu Hành Trình Sinh Tồn",
    subtitle: "Trọn bộ insert tối ưu không gian cho Nemesis và bản mở rộng Lockdown.",
    imageSrc: "/images/hero/nemesis-slide.jpg",
    imageAlt: "Nemesis boardgame insert",
    ctaLabel: "Khám Phá Ngay",
    ctaHref: "/collections/nemesis",
  },
  {
    id: "catan-collection",
    title: "Catan: Nâng Tầm Đảo Trù Phú",
    subtitle: "Khay đựng tài nguyên và thẻ bài thông minh giúp setup ván đấu tức thì.",
    imageSrc: "/images/hero/catan-slide.jpg",
    imageAlt: "Catan boardgame insert",
    ctaLabel: "Xem Chi Tiết",
    ctaHref: "/collections/catan",
  },
];

export function HeroSection() {
  return <ImageSlider slides={heroSlides} />;
}
```

## Advanced Usage

### Tùy biến thời gian Autoplay và Class bao ngoài

```tsx
import { ImageSlider } from "@/components/shared/image/image-slider";

export function FastHeroSlider() {
  return (
    <ImageSlider
      slides={heroSlides}
      autoplay={true}
      autoplayInterval={6000} // Chuyển slide sau 6 giây
      ariaLabel="Khuyến mãi tháng này"
      className="rounded-2xl"
    />
  );
}
```

## Dependencies

### Internal

- `Button` từ `@/components/ui/button`
- `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselNext`, `CarouselPrevious`, `CarouselApi` từ `@/components/ui/carousel`
- `cn` từ `@/utils/cn`

### External

- `next/image`
- `next/link`

## Accessibility

- Container carousel có thuộc tính `aria-label={ariaLabel}`.
- Slide đầu tiên được cấu hình `preload={index === 0}` giúp trình duyệt tải sớm ảnh đại diện quan trọng nhất.
- Hỗ trợ đầy đủ tương tác phím mũi tên và focus ring trắng tương phản trên nền tối.

## Styling

- Lớp phủ gradient tối tăng cường độ tương phản văn bản: `bg-gradient-to-r from-black/65 via-black/35 to-transparent`.
- Nút bấm điều hướng kính lỏng (Liquid Glassmorphism):
  - Kính mờ: `backdrop-blur-xl backdrop-saturate-150`
  - Viền phát sáng: `border border-white/45 bg-white/15`
  - Đổ bóng phản quang: `shadow-[inset_0_1px_0_rgba(255,255,255,0.7),...]`
- Nút CTA màu trắng nổi bật với bo tròn pill `rounded-full bg-white text-neutral-950 font-bold`.
