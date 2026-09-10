# SplitContentSection

`SplitContentSection` là component bố cục phân đoạn chia đôi nội dung (split content section), hỗ trợ hai chế độ: bố cục ngang (`horizon`) kết hợp một bên là khung ảnh `ImageFrame` và một bên là văn bản `children`, hoặc bố cục dọc (`vertical`) với tiêu đề dọc và khối nội dung bên dưới.

## Purpose

Tạo các khối giới thiệu chuyên sâu (Storytelling, Tính năng sản phẩm, Quy trình sản xuất) với thiết kế chia đôi màn hình 50/50 hiện đại, giúp cân bằng giữa hình ảnh trực quan và văn bản mô tả.

## Use Cases

- Giới thiệu công nghệ in 3D hoặc câu chuyện thương hiệu trên Trang chủ hoặc trang Giới thiệu.
- Bố cục chia đôi được điều phối bởi `SectionTitle (content="split")`.

## When to Use

- Cần bố cục chia đôi màn hình (1 bên ảnh `ImageFrame`, 1 bên nội dung tự do `children`).
- Cần linh hoạt đảo vị trí giữa ảnh và chữ: ảnh bên trái hoặc ảnh bên phải (`contentPosition="left" | "right"`).

## When NOT to Use

- Lưới nhiều thẻ ảnh (dùng `CardGridSection`).
- Chỉ hiển thị một đoạn văn bản thẳng hàng dưới tiêu đề (dùng `TextContentSection`).

## Import

```tsx
import { SplitContentSection } from "@/components/shared/section-title/split-content";
import type {
  SectionTitleSplitProps,
  SectionTitleHorizonSplitProps,
  SectionTitleVerticalSplitProps,
} from "@/components/shared/section-title/types";
```

## Props

`SectionTitleSplitProps` là union của hai cấu hình:

### 1. Bố cục Ngang (`orientation="horizon"` hoặc mặc định - `SectionTitleHorizonSplitProps`)

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `content` | `"split"` | Yes | — | Định danh chế độ split |
| `children` | `ReactNode` | Yes | — | Khối nội dung văn bản / JSX hiển thị bên cạnh ảnh |
| `image` | `{ src: string; alt: string; aspectRatio?: string }` | Yes | — | Thông tin hình ảnh (URL, alt, và tỉ lệ khung hình) |
| `contentPosition` | `"left"` \| `"right"` | No | `"right"` | Vị trí của phần văn bản so với hình ảnh trên desktop |
| `orientation` | `"horizon"` | No | `"horizon"` | Định hướng bố cục ngang |
| `className` | `string` | No | — | Lớp CSS tùy biến cho thẻ `<section>` ngoài cùng |

### 2. Bố cục Dọc (`orientation="vertical"` - `SectionTitleVerticalSplitProps`)

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `content` | `"split"` | Yes | — | Định danh chế độ split |
| `orientation` | `"vertical"` | Yes | — | Định hướng bố cục dọc |
| `children` | `ReactNode` | Yes | — | Nội dung bên dưới tiêu đề |
| `title` | `string` | No | — | Tiêu đề của section |
| `ariaLabel` | `string` | No | — | Nhãn trợ năng khi không truyền `title` |
| `more` | `SectionTitleMore` | No | — | Nút liên kết xem thêm |
| `align` | `SectionTitleAlign` | No | `"left"` | Căn lề tiêu đề |
| `className` | `string` | No | — | Lớp CSS tùy biến |

## Responsive Behavior

- **Trong bố cục Horizon Split**:
  - **Mobile / Tablet (`< 1024px`)**: Ảnh và chữ xếp chồng lên nhau thành 1 cột dọc (ảnh ở trên, chữ ở dưới).
  - **Desktop (`lg: >= 1024px`)**: Chia thành 12 cột (`lg:grid-cols-12`):
    - Khối ảnh chiếm 6 cột (`lg:col-span-6`).
    - Khối chữ chiếm 6 cột (`lg:col-span-6`).
    - Nếu `contentPosition="left"`, khối chữ được đẩy sang trái (`lg:order-1`) và ảnh sang phải (`lg:order-2`).
- Toàn bộ khối có nền trắng `bg-white` và bo góc lớn mềm mại: `rounded-2xl sm:rounded-3xl overflow-hidden`.

## Basic Usage

```tsx
import { SplitContentSection } from "@/components/shared/section-title/split-content";

export function BrandStory() {
  return (
    <SplitContentSection
      content="split"
      contentPosition="right"
      image={{
        src: "/images/story/craft.jpg",
        alt: "Thợ thủ công đang kiểm tra insert",
        aspectRatio: "aspect-square",
      }}
    >
      <div className="space-y-4">
        <h3 className="type-h3 text-neutral-950">Chất lượng tạo nên sự khác biệt</h3>
        <p className="type-prose text-neutral-600">
          Từng góc cạnh đều được vát mép cẩn thận để người chơi lấy thẻ bài dễ dàng nhất ngay cả khi đã bọc sleeve dày.
        </p>
      </div>
    </SplitContentSection>
  );
}
```

## Dependencies

### Internal

- `ImageFrame` từ `@/components/shared/image/image-frame`
- `SectionHeading`, `createSectionTitleId` từ `./section-heading`
- `cn` từ `@/utils/cn`

### External

- Không có dependencies bên ngoài.

## Accessibility

- Hỗ trợ `aria-labelledby={titleId}` hoặc `aria-label={ariaLabel}` trên thẻ `<section>`.
- Khung ảnh `ImageFrame` có đầy đủ thuộc tính `alt`.
