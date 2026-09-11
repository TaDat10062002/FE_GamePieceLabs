# SectionTitleGroupProps

`SectionTitleGroupProps` (được đặt tên theo tên hàm xuất bản trong mã nguồn) là component container bọc ngoài dùng để gom nhóm nhiều phân đoạn `SectionTitle`, thiết lập khoảng cách dọc (`vertical spacing`) đồng nhất giữa các khối phân đoạn lớn trên trang.

## Purpose

Tạo nhịp điệu khoảng cách khoảng trống (whitespace rhythm) tiêu chuẩn giữa các section nội dung liên tiếp trong trang web mà không phải thủ công đặt các class `mt-` hay `space-y-` riêng rẽ ở từng trang.

## Use Cases

- Trang chủ hoặc trang giới thiệu có nhiều khối `SectionTitle` xếp chồng lên nhau liên tiếp.

## When to Use

- Cần hiển thị từ 2 khối `SectionTitle` trở lên liên tiếp nhau với khoảng cách dọc chuẩn (`space-y-16 sm:space-y-20`).

## When NOT to Use

- Trang chỉ có duy nhất một `SectionTitle`.
- Các section yêu cầu khoảng cách tùy biến đặc biệt hoặc có dải phân cách màu nền xen kẽ.

## Import

```tsx
import { SectionTitleGroupProps } from "@/components/shared/section-title/section-title-group";
// Hoặc import từ barrel file:
// import { SectionTitleGroupProps } from "@/components/shared/section-title";
```

## Props

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `children` | `ReactNode` | Yes | — | Danh sách các section con (thường là `<SectionTitle />`) |

## Responsive Behavior

- Khoảng cách phía trên: `mt-10`.
- Khoảng cách giữa các section con:
  - Mobile: `space-y-16` (64px).
  - Tablet/Desktop (`sm:`): `sm:space-y-20` (80px).

## Basic Usage

```tsx
import { SectionTitleGroupProps } from "@/components/shared/section-title/section-title-group";
import { SectionTitle } from "@/components/shared/section-title";

export function GroupedSectionsDemo() {
  return (
    <SectionTitleGroupProps>
      <SectionTitle title="Nhóm sản phẩm 1">
        {/* Content 1 */}
      </SectionTitle>

      <SectionTitle title="Nhóm sản phẩm 2">
        {/* Content 2 */}
      </SectionTitle>
    </SectionTitleGroupProps>
  );
}
```

## Dependencies

### Internal

- Không có dependencies component nội bộ.

### External

- Không có dependencies bên ngoài.

## Implementation Notes

- **API Note / Naming Note**: Trong mã nguồn, cả interface lẫn tên hàm component đều được đặt tên là `SectionTitleGroupProps`:
  ```tsx
  export interface SectionTitleGroupProps {
    children: ReactNode;
  }
  export function SectionTitleGroupProps({ children }: SectionTitleGroupProps): ReactElement {
    return <div className="mt-10 space-y-16 sm:space-y-20">{children}</div>;
  }
  ```
  Developer khi sử dụng cần chú ý import đúng tên định danh hàm đã xuất bản.
