# TextContentSection

`TextContentSection` là component bố cục phân đoạn văn bản, kết hợp tiêu đề `SectionHeading` và khối nội dung văn bản `children` tự do bên dưới, thuộc hệ thống `SectionTitle`.

## Purpose

Cung cấp layout chuẩn cho các phần nội dung dạng chữ, hướng dẫn sử dụng, mô tả dài hoặc câu hỏi thường gặp (FAQ) có tiêu đề phân đoạn và nút xem thêm.

## Use Cases

- Phần mô tả thông số kỹ thuật hoặc giới thiệu chi tiết trong các trang bộ sưu tập.
- Được điều phối tự động bởi `SectionTitle (content="text")`.

## When to Use

- Cần một section có tiêu đề chuẩn và bên dưới là văn bản, danh sách gạch đầu dòng hoặc accordion.
- Cần nút "Xem thêm" dẫn tới trang bài viết hoặc trang chính sách tương ứng.

## When NOT to Use

- Lưới thẻ ảnh (dùng `CardGridSection`).
- Bố cục chia đôi có ảnh minh họa bên cạnh (dùng `SplitContentSection`).

## Import

```tsx
import { TextContentSection } from "@/components/shared/section-title/text-content-section";
import type { SectionTitleMoreProps } from "@/components/shared/section-title/types";
```

## Props

Nhận các thuộc tính từ interface `SectionTitleMoreProps`:

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `title` | `string` | Yes | — | Tiêu đề của section |
| `children` | `ReactNode` | Yes | — | Nội dung văn bản / JSX hiển thị bên dưới tiêu đề |
| `more` | `SectionTitleMore` (`{ label?: string; href?: string }`) | No | — | Cấu hình liên kết xem thêm |
| `align` | `SectionTitleAlign` (`"left"` \| `"center"` \| `"right"`) | No | `"left"` | Căn chỉnh vị trí tiêu đề |
| `orientation` | `SectionTitleOrientation` (`"horizon"` \| `"vertical"`) | No | `"horizon"` | Bố cục tiêu đề và nút 'more': cùng hàng (`horizon`) hoặc xếp dọc (`vertical`) |
| `className` | `string` | No | — | Lớp CSS tùy biến cho thẻ `<section>` ngoài cùng |

## Responsive Behavior

- Container ngoài cùng giới hạn chiều rộng tối đa `max-w-[1900px]`.
- Vùng chứa nội dung tự động co giãn theo 3 nấc:
  - Mobile: `w-full`
  - Tablet: `sm:max-w-[620px]`
  - Laptop: `lg:max-w-[940px]`
  - Desktop: `xl:max-w-[1580px]`
- Khoảng cách dưới tiêu đề: `sm:mb-5`.

## Basic Usage

```tsx
import { TextContentSection } from "@/components/shared/section-title/text-content-section";

export function InstructionsSection() {
  return (
    <TextContentSection
      title="Hướng Dẫn Bảo Quản Phụ Kiện In 3D"
      more={{ label: "Đọc thêm cẩm nang", href: "/guides/care" }}
    >
      <div className="type-prose space-y-4 text-neutral-700">
        <p>
          Các sản phẩm in 3D từ nhựa PLA nên được bảo quản ở nơi thoáng mát, tránh ánh nắng trực tiếp và nhiệt độ cao trên 55°C.
        </p>
        <p>
          Khi vệ sinh, chỉ cần sử dụng khăn ẩm mềm lau nhẹ, không dùng cồn hoặc chất tẩy rửa mạnh.
        </p>
      </div>
    </TextContentSection>
  );
}
```

## Dependencies

### Internal

- `SectionHeading`, `createSectionTitleId` từ `./section-heading`
- `SectionTitleMoreProps` từ `./types`
- `cn` từ `@/utils/cn`

### External

- Không có dependencies bên ngoài.

## Accessibility

- Thẻ `<section>` nhận thuộc tính `aria-labelledby={titleId}` gắn với thẻ `<h2>` của tiêu đề.

## Implementation Notes

- Được tích hợp sẵn trong component cha `SectionTitle`. Khi gọi `<SectionTitle content="text" title="...">...</SectionTitle>`, nó sẽ tự động ủy quyền render cho `TextContentSection`.
