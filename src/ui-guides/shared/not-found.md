# PageNotFound

`PageNotFound` là component cảnh báo lỗi tĩnh, hiển thị hộp thông báo màu đỏ khi không thể tải dữ liệu chi tiết sản phẩm hoặc khi gặp sự cố gọi API.

## Purpose

Thông báo cho người dùng một cách trực quan và dễ tiếp cận khi dữ liệu sản phẩm bị thiếu, không tồn tại hoặc lỗi kết nối mạng.

## Use Cases

- Trạng thái fallback khi fetch chi tiết sản phẩm thất bại trong trang `/products/[id]`.
- Vùng ranh giới lỗi cục bộ (error boundary) của tính năng sản phẩm.

## When to Use

- Cần một thông báo lỗi dạng inline box đỏ đơn giản, rõ ràng cho luồng tải sản phẩm.

## When NOT to Use

- Trang 404 toàn màn hình cấp ứng dụng (hãy dùng file chuẩn `not-found.tsx` của Next.js App Router tại `src/app/not-found.tsx`).
- Thông báo lỗi chung có nút thử lại "Retry" hoặc nút điều hướng quay về trang trước.

## Import

```tsx
import PageNotFound from "@/components/shared/not-found";
```

## Props

Component hiện tại là static presentation component và **không nhận props**:

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| — | — | — | — | Không nhận props ngoài |

## Responsive Behavior

- Tự động mở rộng theo 100% chiều rộng của container cha với padding thích ứng: `p-4 sm:p-5`.

## Basic Usage

```tsx
import PageNotFound from "@/components/shared/not-found";

export default function ProductDetail({ product }: { product: unknown }) {
  if (!product) {
    return <PageNotFound />;
  }

  return <div>{/* Product details */}</div>;
}
```

## Dependencies

### Internal

- Không có dependencies nội bộ.

### External

- Không có dependencies bên ngoài.

## Accessibility

- Có thuộc tính ngữ nghĩa `role="alert"`, giúp trình đọc màn hình tự động thông báo nội dung lỗi ngay khi component xuất hiện trên giao diện.

## Styling

- Phong cách cảnh báo lỗi tiêu chuẩn:
  - Nền đỏ nhạt: `bg-red-50`
  - Viền đỏ: `border border-red-200`
  - Chữ màu đỏ đậm: `text-red-700`
  - Bo góc nhẹ: `rounded-xl`
  - Kiểu chữ prose: `type-prose text-base`

## Implementation Notes

- Nội dung thông báo hiện tại là cố định tiếng Việt: *"Không thể tải chi tiết sản phẩm. Vui lòng kiểm tra lại sản phẩm hoặc API."*.
- Nếu cần đa ngôn ngữ hoặc tùy biến nội dung thông báo, nên mở rộng prop `message?: string` trong tương lai.
