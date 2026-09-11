# StoreSectionHeading

`StoreSectionHeading` là component tiêu đề phân đoạn linh hoạt, hỗ trợ hiển thị dòng dẫn đề (`eyebrow`), tiêu đề chính (`title`), đoạn mô tả (`description`), nút hành động phụ (`action`), cùng hai chế độ bố cục: có đường kẻ phân cách hai bên (`divider`) hoặc xếp hàng ngang với nút hành động.

## Purpose

Chuẩn hóa hệ thống tiêu đề phân đoạn trong storefront, hỗ trợ cấu trúc phân cấp typographic hoàn chỉnh và các nút hành động điều hướng đi kèm.

## Use Cases

- Trang Giỏ hàng (`src/app/(storefront)/cart/page.tsx`).
- Các phân đoạn danh mục hoặc danh sách sản phẩm yêu cầu tiêu đề có mô tả và nút bấm bên phải.
- Khối phân đoạn trang trí có đường kẻ hai bên (`divider=true`).

## When to Use

- Cần tiêu đề phân đoạn có đầy đủ eyebrow, tiêu đề chính, mô tả và nút CTA (Call To Action) ở góc phải.
- Cần tiêu đề căn giữa có hai đường kẻ phân cách ngang hai bên.

## When NOT to Use

- Đang sử dụng hệ thống `SectionTitle` lồng ghép lưới thẻ `CardImageTitleGrid` hoặc `split` content (hãy dùng `SectionTitle`).

## Import

```tsx
import StoreSectionHeading from "@/components/shared/store-section-heading";
```

## Props

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `title` | `string` | Yes | — | Tiêu đề chính của section (thẻ `<h2>`) |
| `eyebrow` | `string` | No | — | Dòng chữ dẫn đề nhỏ phía trên tiêu đề |
| `description` | `string` | No | — | Đoạn văn bản mô tả phụ phía dưới tiêu đề |
| `action` | `ReactNode` | No | — | Phần tử hành động (nút bấm, liên kết) hiển thị ở góc phải |
| `centered` | `boolean` | No | `false` | Căn giữa toàn bộ nội dung chữ |
| `divider` | `boolean` | No | `false` | Hiển thị hai đường kẻ ngang mảnh hai bên tiêu đề |
| `className` | `string` | No | — | Lớp CSS tùy biến cho container bao ngoài |

## Responsive Behavior

- **Bố cục tiêu chuẩn (`divider=false`)**:
  - Mobile (`< 640px`): Xếp dọc (`flex-col gap-4`), nút `action` nằm dưới tiêu đề.
  - Tablet/Desktop (`>= 640px`): Xếp ngang (`sm:flex-row sm:items-end sm:justify-between`), nút `action` nằm sát mép phải.
- **Bố cục phân cách (`divider=true`)**:
  - Hai đường kẻ ngang `bg-neutral-200` ẩn trên mobile (`hidden`) và chỉ hiện từ màn hình tablet trở lên (`sm:block`).

## Basic Usage

```tsx
import StoreSectionHeading from "@/components/shared/store-section-heading";
import { Button } from "@/components/ui/button";

export function CartHeading() {
  return (
    <StoreSectionHeading
      eyebrow="Giỏ hàng của bạn"
      title="Sản phẩm đã chọn"
      description="Xem lại các sản phẩm và tiến hành thanh toán."
      action={<Button variant="outline">Tiếp tục mua sắm</Button>}
    />
  );
}
```

## Advanced Usage

### Tiêu đề căn giữa có đường kẻ trang trí (Divider Layout)

```tsx
import StoreSectionHeading from "@/components/shared/store-section-heading";

export function CenteredDividerHeading() {
  return (
    <StoreSectionHeading
      title="Sản phẩm tương tự"
      description="Những phụ kiện boardgame có thể bạn cũng quan tâm"
      centered
      divider
      className="my-12"
    />
  );
}
```

## Dependencies

### Internal

- Không phụ thuộc component nội bộ nào.

### External

- `clsx`

## Accessibility

- Tiêu đề chính sử dụng thẻ ngữ nghĩa `<h2>` với class kích thước chuẩn `type-h2`.
- Cấu trúc flexbox giữ trật tự đọc tự nhiên cho screen reader: Eyebrow -> Title -> Description -> Action.

## Styling

- Tích hợp các typography token chuẩn của dự án:
  - `type-eyebrow text-neutral-500`
  - `type-h2 text-neutral-950`
  - `type-prose text-neutral-600`
