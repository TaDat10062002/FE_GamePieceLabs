# BreadCrumbs

`BreadCrumbs` là component điều hướng phân cấp (breadcrumb navigation) tĩnh, hiển thị đường dẫn vị trí hiện tại của người dùng trong cấu trúc storefront.

## Purpose

Cung cấp ngữ cảnh vị trí trang trong luồng duyệt sản phẩm (Trang chủ > Danh mục > Chi tiết sản phẩm) và cho phép người dùng quay lại các cấp điều hướng cha một cách nhanh chóng.

## Use Cases

- Trang chi tiết sản phẩm (`/products/[id]`).
- Các trang nội dung có phân cấp điều hướng 3 tầng cơ bản.

## When to Use

- Cần hiển thị đường dẫn vị trí tĩnh cho trang chi tiết sản phẩm trong storefront.
- Cần thanh điều hướng nhỏ gọn hỗ trợ cuộn ngang trên thiết bị di động.

## When NOT to Use

- Cần breadcrumb động linh hoạt dựa theo URL route params hoặc danh mục thực tế của sản phẩm (cần mở rộng props hoặc tạo component dynamic breadcrumbs).
- Trang cấp 1 (Trang chủ) không có cấp cha.

## Import

```tsx
import BreadCrumbs from "@/components/shared/breadcrumbs";
```

## Props

Component hiện tại là static presentation component và **không nhận props**:

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| — | — | — | — | Không có props ngoài |

## Responsive Behavior

- Sử dụng class `no-scrollbar overflow-x-auto` kết hợp `w-max min-w-full` và `whitespace-nowrap` giúp thanh breadcrumb tự động cuộn ngang trơn tru trên màn hình di động nhỏ mà không làm vỡ layout.

## Basic Usage

```tsx
import BreadCrumbs from "@/components/shared/breadcrumbs";

export default function ProductDetailPage() {
  return (
    <div className="container mx-auto px-4">
      <BreadCrumbs />
      {/* Product detail content */}
    </div>
  );
}
```

## Dependencies

### Internal

- Không phụ thuộc component nội bộ nào.

### External

- `next/link`

## Accessibility

- Thẻ `<nav>` sử dụng `aria-label="Breadcrumb"` chuẩn ngữ nghĩa WAI-ARIA.
- Cấu trúc danh sách `<ol>` và `<li>` chuẩn SEO và screen reader.
- Ký tự phân cách `/` được bọc trong `<li aria-hidden="true">` để screen reader bỏ qua.
- Mục trang hiện tại có thuộc tính `aria-current="page"`.

## Styling

- Sử dụng Tailwind CSS với màu sắc neutral: `text-neutral-500`, hover sang `text-neutral-900`.
- Khoảng cách bottom cố định `mb-5`.
- Ẩn scrollbar với tiện ích `no-scrollbar`.

## Implementation Notes

- Hiện tại nội dung đường dẫn được hard-code ("Trang chủ" -> "Danh mục" -> "Chi tiết sản phẩm"). Khi cần hỗ trợ danh mục động theo từng sản phẩm, nên bổ sung prop nhận danh sách items.
