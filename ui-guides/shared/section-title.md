# SectionTitle

`SectionTitle` là component điều phối cấp cao (dispatcher component) cho các khối section có tiêu đề trong storefront, tự động lựa chọn layout phù hợp dựa vào thuộc tính `content`: dạng lưới thẻ (`card-grid-section`), dạng khối chữ (`text-content-section`), hoặc dạng chia đôi màn hình (`split-content`).

## Purpose

Cung cấp một interface duy nhất để xây dựng các section trang web hoàn chỉnh có tiêu đề, liên kết xem thêm ("more"), và bố cục nội dung phong phú mà không cần nhớ từng sub-component riêng lẻ.

## Use Cases

- Các khối phân đoạn trên Trang chủ (`upcoming-products-section`, `company-links-section`).
- Khối danh mục hoặc giới thiệu trên các trang bộ sưu tập (`board-game-inserts`, `by-game-name`, `ox-product-family`, `tokens`).
- Khối sản phẩm liên quan hoặc thông tin bổ sung trên trang Chi tiết sản phẩm.

## When to Use

- Cần dựng một section chuẩn có tiêu đề `<h2>` kết nối accessibility (`aria-labelledby`).
- Cần linh hoạt chuyển đổi giữa 3 layout:
  - `content="imageList"` (hoặc không truyền): Tiêu đề phía trên, bên dưới là lưới thẻ ảnh (`CardImageTitleGrid`).
  - `content="text"`: Tiêu đề phía trên, bên dưới là nội dung bài viết/khối chữ.
  - `content="split"`: Bố cục chia đôi hai cột (một bên ảnh `ImageFrame`, một bên là text/children).

## When NOT to Use

- Chỉ cần một thẻ tiêu đề nhỏ đơn giản không cần bao bọc thẻ `<section>` lớn (dùng `SectionHeading` hoặc `StoreSectionHeading`).

## Import

```tsx
import {
  SectionTitle,
  type SectionTitleProps,
  type SectionTitleMoreProps,
  type SectionTitleSplitProps,
  type SectionTitleHorizonSplitProps,
  type SectionTitleVerticalSplitProps,
  type SectionTitleAlign,
  type SectionTitleOrientation,
  type SectionTitleMore,
} from "@/components/shared/section-title";
```

## Props

`SectionTitleProps` là một Discriminated Union giữa `SectionTitleMoreProps` và `SectionTitleSplitProps`:

### 1. Khi `content?: "imageList" | "text"` (`SectionTitleMoreProps`)

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `title` | `string` | Yes | — | Tiêu đề của section |
| `children` | `ReactNode` | Yes | — | Nội dung bên dưới tiêu đề (các thẻ `CardImageTitle` hoặc đoạn văn bản) |
| `content` | `"imageList"` \| `"text"` | No | `"imageList"` | Loại layout nội dung |
| `more` | `SectionTitleMore` (`{ label?: string; href?: string }`) | No | — | Cấu hình liên kết xem thêm với mũi tên tròn |
| `align` | `SectionTitleAlign` (`"left"` \| `"center"` \| `"right"`) | No | `"left"` | Căn chỉnh vị trí tiêu đề |
| `orientation` | `SectionTitleOrientation` (`"horizon"` \| `"vertical"`) | No | `"horizon"` | Bố trí tiêu đề và nút 'more': nằm ngang cùng hàng (`horizon`) hoặc xếp dọc (`vertical`) |
| `className` | `string` | No | — | Lớp CSS tùy biến cho thẻ `<section>` |

### 2. Khi `content="split"` (`SectionTitleSplitProps`)

Chia làm 2 biến thể theo `orientation`:

#### Biến thể ngang (`orientation="horizon"` hoặc mặc định - `SectionTitleHorizonSplitProps`)

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `content` | `"split"` | Yes | — | Định danh chế độ split |
| `children` | `ReactNode` | Yes | — | Khối nội dung văn bản bên cạnh ảnh |
| `image` | `{ src: string; alt: string; aspectRatio?: string }` | Yes | — | Thông tin hình ảnh bên cạnh |
| `contentPosition` | `"left"` \| `"right"` | No | `"right"` | Vị trí của khối chữ `children` so với ảnh |
| `orientation` | `"horizon"` | No | `"horizon"` | Định hướng bố cục ngang |
| `className` | `string` | No | — | Lớp CSS tùy biến cho thẻ section |

#### Biến thể dọc (`orientation="vertical"` - `SectionTitleVerticalSplitProps`)

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `content` | `"split"` | Yes | — | Định danh chế độ split |
| `orientation` | `"vertical"` | Yes | — | Định hướng bố cục dọc |
| `children` | `ReactNode` | Yes | — | Nội dung bên trong section |
| `title` | `string` | No | — | Tiêu đề section |
| `ariaLabel` | `string` | No | — | Nhãn trợ năng khi không có `title` |
| `more` | `SectionTitleMore` | No | — | Nút liên kết xem thêm |
| `align` | `SectionTitleAlign` | No | `"left"` | Căn lề tiêu đề |
| `className` | `string` | No | — | Lớp CSS tùy biến |

## Basic Usage

### Layout Danh mục thẻ (Mặc định)

```tsx
import { SectionTitle } from "@/components/shared/section-title";
import { CardImageTitle } from "@/components/shared/card-image-title";

export function CategoriesDemo() {
  return (
    <SectionTitle
      title="Khám phá theo danh mục"
      more={{ label: "Xem tất cả", href: "/collections" }}
    >
      <CardImageTitle
        title="Board Game Inserts"
        imageSrc="/images/insert-cat.jpg"
        imageAlt="Inserts"
        href="/collections/inserts"
        isClicked
      />
      <CardImageTitle
        title="Token Nâng Cấp"
        imageSrc="/images/token-cat.jpg"
        imageAlt="Tokens"
        href="/collections/tokens"
        isClicked
      />
    </SectionTitle>
  );
}
```

## Advanced Usage

### Layout Chia đôi Horizon Split (Ảnh và Văn bản)

```tsx
import { SectionTitle } from "@/components/shared/section-title";

export function StorySection() {
  return (
    <SectionTitle
      content="split"
      contentPosition="left"
      image={{
        src: "/images/workshop.jpg",
        alt: "Góc chế tác 3D",
        aspectRatio: "aspect-square",
      }}
    >
      <div className="space-y-4">
        <h3 className="type-h3">Công nghệ in 3D chính xác cao</h3>
        <p className="type-prose text-neutral-600">
          Mỗi sản phẩm đều được thiết kế tỉ mỉ, tối ưu từng milimet nhằm bảo vệ trọn vẹn các thành phần boardgame của bạn.
        </p>
      </div>
    </SectionTitle>
  );
}
```

## Dependencies

### Internal

- `CardGridSection` từ `@/components/shared/section-title/card-grid-section`
- `SplitContentSection` từ `@/components/shared/section-title/split-content`
- `TextContentSection` từ `@/components/shared/section-title/text-content-section`

## Accessibility

- Tự động sinh `id` cho tiêu đề và liên kết với thẻ `<section aria-labelledby={titleId}>`.

## Implementation Notes

- Component hoạt động như một router switch ở tầng UI component: căn cứ vào `props.content` để chuyển tiếp props chính xác sang sub-component tương ứng.
