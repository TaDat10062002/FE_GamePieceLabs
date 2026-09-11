# Wrapper

`Wrapper` là component layout container cơ bản dùng để chuẩn hóa độ rộng tối đa (`max-w-[1580px]`), căn giữa (`mx-auto`) và khoảng cách đệm lề hai bên theo chuẩn thiết kế của storefront Game Piece Labs.

## Purpose

Tạo ra một khung nội dung thống nhất cho toàn bộ các trang bộ sưu tập và các khối nội dung lớn, tránh hiện tượng lệch mép hoặc tràn màn hình trên các màn hình có độ phân giải siêu rộng (Ultrawide / 4K).

## Use Cases

- Bao bọc toàn bộ nội dung của các trang bộ sưu tập (`board-game-inserts`, `by-game-name`, `ox-product-family`, `tokens`).
- Khung giới hạn nội dung chữ bên trong component `ImageFrame`.

## When to Use

- Cần một container chuẩn có chiều rộng tối đa `1580px` và đệm lề hai bên tự động co giãn theo 3 nấc breakpoint chính của hệ thống.

## When NOT to Use

- Khối nội dung cần hiển thị tràn viền 100% toàn màn hình (full-bleed/edge-to-edge) như banner hero slider hoặc dải màu nền toàn trang.

## Import

```tsx
import Wrapper from "@/components/shared/wrapper";
```

## Props

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `children` | `React.ReactNode` | Yes | — | Nội dung bên trong container |

## Responsive Behavior

Độ rộng và khoảng cách padding top được tính toán chính xác theo công thức:

- **Mobile (`< 640px`)**:
  - Chiều rộng: `w-[calc(100%-2rem)]` (chừa lề 16px mỗi bên).
  - Đệm trên: `pt-6` (24px).
- **Tablet (`sm: 640px - 1279px`)**:
  - Chiều rộng: `sm:w-[calc(100%-3rem)]` (chừa lề 24px mỗi bên).
  - Đệm trên: `sm:pt-8` (32px).
- **Desktop / Ultrawide (`xl: >= 1280px`)**:
  - Chiều rộng: `xl:w-[calc(100%-100px)]` (chừa lề 50px mỗi bên), giới hạn tối đa `max-w-[1580px]`.
  - Đệm trên: `xl:pt-10` (40px).

## Basic Usage

```tsx
import Wrapper from "@/components/shared/wrapper";

export function CollectionPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Wrapper>
        {children}
      </Wrapper>
    </main>
  );
}
```

## Composition

Component chủ yếu được dùng làm thẻ bọc ngoài (outer wrapper) ở cấp trang hoặc phân đoạn:

```tsx
<main>
  <Wrapper>
    <BreadCrumbs />
    <CollectionHero />
    <FilterSection />
    <ProductList />
  </Wrapper>
</main>
```

## Dependencies

### Internal

- Không phụ thuộc component nội bộ nào.

### External

- Không phụ thuộc thư viện ngoài.

## Styling

- Sử dụng Tailwind CSS với các giá trị tính toán cụ thể `calc()` để đảm bảo khoảng cách lề hai bên luôn cân xứng tuyệt đối với mép màn hình.
