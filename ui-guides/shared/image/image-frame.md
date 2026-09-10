# ImageFrame

`ImageFrame` là component khung ảnh cao cấp (hero/feature image frame), hỗ trợ đa dạng tỉ lệ khung hình (`aspectRatio`), lớp phủ tối (`overlay`), văn bản typography lồng trong ảnh (eyebrow, header, title, description), cùng chú thích ảnh (`caption`).

## Purpose

Tạo khung hình banner lớn cho phần mở đầu trang (Hero section), hình ảnh giới thiệu bộ sưu tập, hoặc ảnh minh họa trong bố cục chia đôi với chất lượng hiển thị tối ưu và phân cấp chữ rõ ràng.

## Use Cases

- Banner mở đầu trang Giới thiệu (`about-hero.tsx`).
- Banner mở đầu các trang bộ sưu tập (`board-game-inserts`, `by-game-name`, `ox-product-family`, `tokens`).
- Khung ảnh bên trong component chia đôi nội dung `SplitContentSection`.

## When to Use

- Cần khung ảnh lớn có bo góc và đổ bóng nhẹ sang trọng.
- Cần đặt chữ (tiêu đề, mô tả, dẫn đề) đè lên trên ảnh kèm lớp nền mờ chống lóa.
- Cần chú thích chân ảnh `<figcaption>`.

## When NOT to Use

- Thẻ sản phẩm nhỏ có giá bán (dùng `ProductCard`).
- Thẻ danh mục dạng lưới với liên kết click chuyển trang (dùng `CardImageTitle`).

## Import

```tsx
import {
  ImageFrame,
  type ImageFrameProps,
  type ImageFrameAspectRatio,
  type ImageHeaderElementSize,
  type TextAlignType,
} from "@/components/shared/image/image-frame";
```

## Props

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `src` | `string` | Yes | — | Đường dẫn URL hình ảnh |
| `alt` | `string` | No | `"Frame image"` | Văn bản thay thế cho ảnh phục vụ SEO và accessibility |
| `eyebrow` | `string` | No | — | Dòng chữ nhỏ dẫn đề phía trên header |
| `header` | `string` | No | — | Tiêu đề chính dạng thẻ ngữ nghĩa (h1/h2/h3) đè trên ảnh |
| `headerSize` | `ImageHeaderElementSize` (`"h1"` \| `"h2"` \| `"h3"`) | No | `"h1"` | Thẻ HTML và kích cỡ typography của tiêu đề chính |
| `title` | `string` | No | — | Tiêu đề phụ hoặc thông điệp nhấn mạnh |
| `description` | `string` | No | — | Đoạn văn bản mô tả chi tiết |
| `caption` | `string` | No | — | Văn bản chú thích đặt phía dưới khung ảnh (`<figcaption>`) |
| `aspectRatio` | `ImageFrameAspectRatio \| string` | No | `"21/9"` | Tỉ lệ khung hình (`"16/9"`, `"21/9"`, `"4/3"`, `"3/2"`, `"auto"` hoặc class tùy ý) |
| `textAlign` | `TextAlignType` (`"left"` \| `"center"` \| `"right"`) | No | `"left"` | Căn lề cho phần văn bản phủ trên ảnh |
| `overlay` | `boolean \| ReactNode` | No | — | Lớp phủ gradient (nếu `true`, dùng gradient mặc định; nếu truyền JSX, render trực tiếp) |
| `priority` | `boolean` | No | `false` | Tải ảnh ưu tiên LCP cao của `next/image` |
| `objectFit` | `"cover"` \| `"contain"` | No | `"cover"` | Cách căn chỉnh ảnh trong khung |
| `sizes` | `string` | No | `"(max-width: 640px) calc(100vw - 2rem), ..."` | Cấu hình responsive image sizes |
| `containerClassName` | `string` | No | — | Lớp CSS tùy biến cho thẻ `<figure>` ngoài cùng |
| `className` | `string` | No | — | Lớp CSS tùy biến cho khung chứa ảnh bên trong |
| `imageClassName` | `string` | No | — | Lớp CSS tùy biến cho thẻ `<Image>` |

## Variants

### `aspectRatio`

- `"21/9"`: Tỉ lệ màn ảnh rộng điện ảnh (mặc định: `aspect-[4/3] sm:aspect-video lg:aspect-[21/9]`).
- `"16/9"`: Tỉ lệ chuẩn video HD (`aspect-video`).
- `"4/3"`: Tỉ lệ chụp chuẩn ảnh (`aspect-[4/3]`).
- `"3/2"`: Tỉ lệ máy ảnh DSLR (`aspect-[3/2]`).
- `"auto"`: Tự động theo kích thước gốc (`aspect-auto`).

### `headerSize`

- `"h1"`: Áp dụng class `type-h1` (thường dùng cho Hero đầu trang).
- `"h2"`: Áp dụng class `type-h2` (thường dùng cho các section giữa trang).
- `"h3"`: Áp dụng class `type-h3`.

## Responsive Behavior

- Khung ảnh tự động co giãn theo chiều rộng tối đa `max-w-[1580px]` và căn giữa với lề responsive:
  - Mobile: `w-[calc(100%-2rem)]`
  - Tablet: `sm:w-[calc(100%-3rem)]`
  - Desktop: `xl:w-[calc(100%-100px)]`
- Khi có nội dung chữ, khung ảnh tự động giữ chiều cao tối thiểu để chữ không bị tràn: `min-h-[360px] sm:min-h-[420px] lg:min-h-[500px]`.
- Chữ trên mobile tự động canh giữa (`max-sm:text-center`) để tạo sự cân đối.

## Basic Usage

```tsx
import { ImageFrame } from "@/components/shared/image/image-frame";

export function HeroBanner() {
  return (
    <ImageFrame
      src="/images/banners/hero-collection.jpg"
      alt="Bộ sưu tập Game Piece Labs"
      header="Giải Pháp Sắp Xếp Boardgame Tối Thượng"
      description="Thiết kế chính xác, chất liệu bền vững, nâng tầm trải nghiệm chơi game."
      priority
    />
  );
}
```

## Advanced Usage

### Banner có đầy đủ Eyebrow, Caption và Tỉ lệ 16:9

```tsx
import { ImageFrame } from "@/components/shared/image/image-frame";

export function CraftsmanshipHero() {
  return (
    <ImageFrame
      src="/images/about/craftsmanship-hero.jpg"
      alt="Chi tiết kỹ thuật in 3D"
      eyebrow="NGHỆ THUẬT CHẾ TÁC"
      header="Tỉ mỉ trong từng đường nét"
      title="Độ chính xác lên tới 0.1mm"
      description="Chúng tôi thử nghiệm trực tiếp trên các bản game gốc để đảm bảo độ khít hoàn hảo cho từng chi tiết thẻ bài và token."
      aspectRatio="16/9"
      headerSize="h2"
      caption="Hình ảnh thực tế xưởng chế tác Game Piece Labs tại TP. Hồ Chí Minh"
      overlay
    />
  );
}
```

## Dependencies

### Internal

- `Wrapper` từ `@/components/shared/wrapper`
- `cn` từ `@/utils/cn`

### External

- `next/image`

## Accessibility

- Cấu trúc ngữ nghĩa chuẩn HTML5: `<figure>` và `<figcaption>`.
- Thuộc tính `alt` mô tả ảnh rõ ràng.
- Lớp phủ nền mờ đen `bg-black/50` giúp đảm bảo độ tương phản màu chữ trắng trên nền ảnh đạt chuẩn WCAG AAA.

## Styling

- Hiệu ứng hover phóng to ảnh chậm rãi tinh tế: `group-hover:scale-[1.02] transition-transform duration-700 ease-out`.
- Bo tròn góc lớn: `rounded-2xl sm:rounded-3xl`.
- Đổ bóng nhẹ: `shadow-[0_20px_50px_rgba(0,0,0,0.06)]`.
