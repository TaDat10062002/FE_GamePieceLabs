# ProductThumbnail

`ProductThumbnail` là component nút bấm hiển thị ảnh thu nhỏ (thumbnail button) của sản phẩm trong thư viện ảnh, hỗ trợ trạng thái được chọn (`isSelected`) với viền đỏ nổi bật và khả năng điều hướng bằng bàn phím.

## Purpose

Cung cấp nút chọn ảnh thu nhỏ chuẩn kích thước vuông trong thư viện ảnh chi tiết sản phẩm, cho phép người dùng click để chuyển đổi góc nhìn của ảnh lớn.

## Use Cases

- Các mục ảnh thu nhỏ trong component `ProductGallery (type="detail")`.
- Bất kỳ bộ chọn ảnh thumbnail nào trong trang Chi tiết sản phẩm.

## When to Use

- Cần nút chọn ảnh vuông nhỏ (`aspect-square`) có hiệu ứng viền sáng đỏ khi active.
- Cần độ mờ (`opacity-70`) khi chưa chọn và sáng rõ (`hover:opacity-100`) khi di chuột.

## When NOT to Use

- Thẻ sản phẩm đầy đủ có giá bán và tên sản phẩm (dùng `ProductCard`).
- Khung ảnh hero lớn (dùng `ImageFrame`).

## Import

```tsx
import {
  ProductThumbnail,
  type ProductThumbnailProps,
  type ProductThumbnailImage,
} from "@/components/shared/product/product-thumbnail";
```

## Props

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `image` | `ProductThumbnailImage` | Yes | — | Đối tượng dữ liệu ảnh thu nhỏ (`{ id, src, alt }`) |
| `isSelected` | `boolean` | No | `false` | Trạng thái ảnh này có đang được chọn hay không |
| `onSelect` | `(image: ProductThumbnailImage) => void` | No | — | Callback được gọi khi người dùng click vào nút ảnh |

### `ProductThumbnailImage` Interface

```ts
export interface ProductThumbnailImage {
  id: string;   // Mã định danh duy nhất của ảnh
  src: string;  // Đường dẫn URL hình ảnh
  alt: string;  // Mô tả ảnh cho accessibility
}
```

## States

- **Selected State (`isSelected=true`)**: Viền đỏ `border-red-700`, đổ bóng nhẹ `shadow-sm`, độ đục 100%, `aria-pressed="true"`.
- **Unselected State (`isSelected=false`)**: Viền trong suốt `border-transparent`, hơi mờ `opacity-70`, khi hover chuyển sang viền xám `hover:border-neutral-300` và độ đục `hover:opacity-100`.

## Responsive Behavior

- Tự động duy trì tỉ lệ vuông hoàn hảo `aspect-square w-full`. Thường được đặt trong các ô lưới hoặc slide carousel có chiều rộng khoảng `64px - 76px`.

## Basic Usage

```tsx
import { useState } from "react";
import {
  ProductThumbnail,
  type ProductThumbnailImage,
} from "@/components/shared/product/product-thumbnail";

const sampleImage: ProductThumbnailImage = {
  id: "img-01",
  src: "/images/products/catan-box-top.jpg",
  alt: "Mặt trên hộp insert Catan",
};

export function ThumbnailDemo() {
  const [selected, setSelected] = useState(false);

  return (
    <div className="size-20">
      <ProductThumbnail
        image={sampleImage}
        isSelected={selected}
        onSelect={() => setSelected(!selected)}
      />
    </div>
  );
}
```

## Dependencies

### Internal

- `cn` từ `@/utils/cn`

### External

- `next/image`

## Accessibility

- Thẻ bấm HTML `<button type="button">`.
- Thuộc tính trợ năng mô tả mục đích: `aria-label={"Xem ${image.alt}"}`.
- Thuộc tính trạng thái nút gạt: `aria-pressed={isSelected}` giúp screen reader thông báo trạng thái đang chọn.
- Hỗ trợ đường viền focus màu đỏ: `focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2`.

## Styling

- Bo góc mềm mại: `rounded-lg border-2`.
- Ảnh fill toàn bộ khung với `object-cover`.
- Sử dụng cờ `unoptimized` để tránh overhead nén ảnh nhiều lần đối với các icon/thumbnail kích thước nhỏ cố định (`sizes="72px"`).

## Implementation Notes

- Runtime: Đây là `"use client"` component.
- Kích thước render đề xuất: `size-16` (64px) đến `size-20` (80px).
