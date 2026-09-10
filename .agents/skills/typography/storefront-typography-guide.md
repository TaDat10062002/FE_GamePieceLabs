# Hướng Dẫn Typography Cho Giao Diện Cửa Hàng

Tài liệu này dùng để tái sử dụng hierarchy chữ cho các trang giao diện cửa hàng sau này, nhất là `home`, `product details`, `cart`, `listing` và các khối banner quảng bá.

## 1. Nguyên tắc tổng

- Ưu tiên để người dùng nhìn thấy: tiêu đề khu vực, tên sản phẩm, giá, nút hành động.
- Mỗi cấp chữ phải có độ chênh rõ ràng: Banner chính > Tiêu đề khu vực > Thẻ sản phẩm > Thông tin phụ > Chữ hướng dẫn.
- Không để quá nhiều cấp font-size trong cùng một màn hình.
- Chữ cho giao diện bán hàng nên đậm, gọn, dễ quét mắt nhanh.
- Nếu đã dùng `Ant Design Typography`, chỉ dùng nó để chuẩn hóa tiêu đề và đoạn văn; không nên làm mất phong cách bằng các style mặc định quá trung tính.

## 2. Hierarchy đề xuất

### Banner chính
- `Nhãn nhỏ / badge`
  - Size: `11px`
  - Weight: `600`
  - Tracking: `0.28em`
  - Uppercase
- `Tiêu đề banner`
  - Mobile: `text-4xl`
  - Tablet: `text-5xl`
  - Desktop: `text-7xl`
  - Weight: `900`
  - Leading: `0.9`
  - Tracking: `-0.04em`
- `Mô tả banner`
  - Mobile: `text-sm`
  - Desktop: `text-lg`
  - Leading: `1.75`
  - Màu: trắng mờ `80%`
- `Nút hành động chính`
  - Size: `text-sm` -> `text-base`
  - Weight: `600`

### Tiêu đề khu vực
- `Nhãn khu vực`
  - Size: `11px`
  - Weight: `600`
  - Uppercase
  - Tracking: `0.28em` -> `0.32em`
- `Tiêu đề khu vực chính`
  - Mobile: `text-3xl`
  - Desktop: `text-4xl`
  - Weight: `700`
  - Tracking: `tight`
- `Mô tả khu vực`
  - Size: `text-sm` -> `text-base`
  - Màu: `text-neutral-500` hoặc `text-neutral-600`

### Thẻ danh mục
- `Tên danh mục`
  - Size: `text-sm` hoặc `15px`
  - Weight: `500`
  - Leading: `tight`

### Thẻ sản phẩm
- `Nhà cung cấp / thông tin phụ`
  - Size: `10px`
  - Uppercase
  - Tracking: `0.2em`
  - Màu: `text-neutral-400`
- `Tên sản phẩm`
  - Size: `text-sm` -> `15px`
  - Weight: `600`
  - Leading: `1.5`
  - Tối đa 2 dòng
- `Giá`
  - Size: `text-lg` -> `text-2xl`
  - Weight: `900`
- `Nhãn hành động phụ`
  - Size: `11px`
  - Weight: `600`
  - Uppercase
  - Tracking: `0.14em`

### Trang chi tiết sản phẩm
- `Đường dẫn điều hướng`
  - Size: `text-sm`
  - Màu: `text-neutral-500`
- `Tên sản phẩm`
  - Mobile: `text-3xl`
  - Desktop: `text-5xl`
  - Weight: `900`
  - Tracking: `tight`
- `Giá sản phẩm`
  - Mobile: `text-3xl`
  - Desktop: `text-5xl`
  - Weight: `900`
- `Tiêu đề khối nội dung`
  - Size: `text-2xl` -> `text-3xl`
  - Weight: `700`
- `Nội dung mô tả`
  - Size: `text-sm` -> `text-base`
  - Leading: `loose`

### Trang giỏ hàng
- `Tiêu đề trang`
  - Mobile: `text-3xl`
  - Desktop: `text-4xl`
  - Weight: `900`
- `Tên sản phẩm trong giỏ`
  - Size: `text-lg`
  - Weight: `700`
- `Tiêu đề tóm tắt đơn hàng`
  - Size: `text-2xl`
  - Weight: `700`
- `Tổng tiền cuối`
  - Size: `text-2xl` -> `text-3xl`
  - Weight: `900`

## 3. Bộ màu chữ nên ưu tiên

- `text-neutral-950`: tiêu đề chính, giá, thông tin quan trọng
- `text-neutral-700`: nội dung phụ nhưng vẫn cần đọc rõ
- `text-neutral-500` / `600`: mô tả, chữ hướng dẫn, nhãn phụ
- `text-blue-600`: link hành động, badge nhận diện, điểm nhấn thương hiệu
- `text-white/80`: mô tả trên banner nền ảnh đậm

## 4. Cách dùng với Ant Design Typography

Nếu muốn chuẩn hóa bằng `Typography` của Ant Design:

- `Typography.Title`
  - Dùng cho tiêu đề banner, tiêu đề khu vực, tên sản phẩm ở trang chi tiết
  - Luôn override `className` để giữ đúng size của giao diện bán hàng
- `Typography.Text`
  - Dùng cho nhà cung cấp, thông tin phụ, chữ hướng dẫn
- `Typography.Paragraph`
  - Dùng cho mô tả sản phẩm, mô tả banner, ghi chú

Ví dụ:

```tsx
<Typography.Title level={2} className="!mb-0 !text-3xl !font-bold !tracking-tight md:!text-4xl">
  Tìm theo danh mục
</Typography.Title>
```

Lưu ý: khi dùng Ant Design, nên ưu tiên `className` để tránh bị token mặc định của AntD làm giao diện bị "enterprise" quá, mất chất cửa hàng.

## 5. Quy tắc nhanh để áp dụng cho các web sau này

- Trang chủ bán hàng:
  - Banner thật lớn, tiêu đề khu vực rõ, thẻ sản phẩm gọn
- Trang chi tiết:
  - Tên sản phẩm và giá là cấp chữ lớn nhất
- Trang giỏ hàng:
  - Tổng tiền và nút thanh toán phải nhìn thấy ngay
- Trang danh sách sản phẩm:
  - Tiêu đề khu vực và bộ lọc là cấp 1, thẻ sản phẩm là cấp 2

## 6. Checklist khi review typography

- Nhìn vào màn hình 3 giây có biết khu vực này đang bán cái gì không?
- Tên sản phẩm có nổi bật hơn nhà cung cấp không?
- Giá có đủ mạnh hơn mô tả không?
- Nút hành động có dễ thấy mà không lòe loẹt không?
- Có quá nhiều size chữ trong cùng một block không?

Nếu có, ưu tiên giảm bớt style, không phải thêm thêm style.
