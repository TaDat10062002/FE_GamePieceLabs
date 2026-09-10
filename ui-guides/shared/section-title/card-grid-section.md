# CardGridSection

`CardGridSection` là component bố cục phân đoạn kết hợp tiêu đề điều hướng (`SectionHeading`) và lưới thẻ ảnh (`CardImageTitleGrid`), đóng vai trò là một trong các layout cốt lõi của hệ thống `SectionTitle`.

## Purpose

Cung cấp layout hoàn chỉnh cho các phần trưng bày danh mục, bộ sưu tập thẻ bài dạng lưới có tiêu đề và liên kết "Xem thêm" (`more`).

## Use Cases

- Trưng bày các danh mục game phổ biến trên Trang chủ (`game-categories.ts`, `gear-categories.ts`).
- Khối danh mục phụ kiện trên các trang bộ sưu tập.
- Được tự động render bởi `SectionTitle` khi `content="imageList"` hoặc mặc định.

## When to Use

- Cần một section hoàn chỉnh có tiêu đề chuẩn accessibility và bên dưới là lưới các thẻ `CardImageTitle`.
- Cần nút liên kết xem thêm ("Xem tất cả", "View all") nằm cùng hàng hoặc dưới tiêu đề.

## When NOT to Use

- Section chỉ có nội dung văn bản đơn thuần (dùng `TextContentSection`).
- Section chia đôi màn hình giữa ảnh và chữ (dùng `SplitContentSection`).

## Import

```tsx
import { CardGridSection } from "@/components/shared/section-title/card-grid-section";
import type { SectionTitleMoreProps } from "@/components/shared/section-title/types";
```

## Props

Nhận các thuộc tính từ interface `SectionTitleMoreProps`:

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `title` | `string` | Yes | — | Tiêu đề của section |
| `children` | `ReactNode` | Yes | — | Danh sách các thẻ `CardImageTitle` |
| `more` | `SectionTitleMore` (`{ label?: string; href?: string }`) | No | — | Cấu hình liên kết xem thêm |
| `align` | `SectionTitleAlign` (`"left"` \| `"center"` \| `"right"`) | No | `"left"` | Căn chỉnh vị trí tiêu đề |
| `orientation` | `SectionTitleOrientation` (`"horizon"` \| `"vertical"`) | No | `"horizon"` | Bố cục tiêu đề và nút 'more': cùng hàng (`horizon`) hoặc xếp dọc (`vertical`) |
| `className` | `string` | No | — | Lớp CSS tùy biến cho thẻ `<section>` ngoài cùng |

## Responsive Behavior

- Khung ngoài `<section>` giới hạn chiều rộng tối đa `max-w-[1900px]` với lề responsive `px-4 sm:px-6 xl:px-[50px]`.
- Vùng chứa nội dung bên trong tự động co giãn theo 3 mốc:
  - Mobile: `w-full`
  - Tablet: `sm:max-w-[620px]`
  - Laptop: `lg:max-w-[940px]`
  - Desktop: `xl:max-w-[1580px]`
- Khoảng cách giữa tiêu đề và lưới thẻ: `mb-6 sm:mb-10`.

## Basic Usage

```tsx
import { CardGridSection } from "@/components/shared/section-title/card-grid-section";
import { CardImageTitle } from "@/components/shared/card-image-title";

export function PopularGamesSection() {
  return (
    <CardGridSection
      title="Board Game Thịnh Hành"
      more={{ label: "Xem tất cả 50+ tựa game", href: "/collections/by-game-name" }}
    >
      <CardImageTitle
        title="Dune: Imperium"
        imageSrc="/images/dune.jpg"
        imageAlt="Dune"
        href="/collections/dune"
        isClicked
      />
      <CardImageTitle
        title="Root"
        imageSrc="/images/root.jpg"
        imageAlt="Root"
        href="/collections/root"
        isClicked
      />
    </CardGridSection>
  );
}
```

## Composition

Component kết hợp cấu trúc hai cấp:

```tsx
<CardGridSection>
  {/* Children thường là danh sách các thẻ CardImageTitle */}
  <CardImageTitle {...item1} />
  <CardImageTitle {...item2} />
  <CardImageTitle {...item3} />
</CardGridSection>
```

## Dependencies

### Internal

- `SectionHeading`, `createSectionTitleId` từ `./section-heading`
- `CardImageTitleGrid` từ `@/components/shared/card-image-title`
- `SectionTitleMoreProps` từ `./types`
- `cn` từ `@/utils/cn`

### External

- Không có dependencies bên ngoài.

## Accessibility

- Thẻ bao ngoài là `<section>` liên kết với tiêu đề thông qua thuộc tính `aria-labelledby={titleId}` (id sinh tự động từ slug của tiêu đề).

## Implementation Notes

- Thường được sử dụng gián tiếp thông qua facade `SectionTitle`, nhưng hoàn toàn có thể import độc lập khi muốn giảm bớt switch logic.
