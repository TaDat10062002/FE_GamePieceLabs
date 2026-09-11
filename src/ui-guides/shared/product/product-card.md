# ProductCard

`ProductCard` là component thẻ sản phẩm thương mại tiêu chuẩn của Game Piece Labs, hiển thị hình ảnh vuông, tên sản phẩm, số sao đánh giá, giá tiền được định dạng theo đơn vị tiền tệ, cùng nút liên kết tư vấn/đặt mua nhanh.

## Purpose

Hiển thị thông tin tóm tắt của một sản phẩm trong danh sách catalog hoặc carousel nổi bật, thu hút khách hàng click xem chi tiết hoặc liên hệ tư vấn trực tiếp qua kênh Fanpage.

## Use Cases

- Các mục trong lưới danh sách sản phẩm `ProductList`.
- Mục trong carousel sản phẩm nổi bật `ProductGallery (type="featured")`.
- Khối gợi ý sản phẩm liên quan ("You may also like").

## When to Use

- Cần hiển thị thẻ sản phẩm có đầy đủ ảnh, tên, giá bán và đánh giá sao.
- Cần tự động sinh đường dẫn chi tiết sản phẩm theo chuẩn SEO: `/products/${slug}-${gui}`.
- Cần nút bấm liên hệ đặt hàng dẫn trực tiếp tới Fanpage Facebook.

## When NOT to Use

- Thẻ danh mục bộ sưu tập (dùng `CardImageTitle`).
- Ảnh thu nhỏ trong trang chi tiết sản phẩm (dùng `ProductThumbnail`).

## Import

```tsx
import {
  ProductCard,
  type ProductCardProps,
} from "@/components/shared/product/product-card";
```

## Props

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `name` | `string` | Yes | — | Tên đầy đủ của sản phẩm |
| `imageSrc` | `string` | Yes | — | Đường dẫn URL hình ảnh sản phẩm |
| `imageAlt` | `string` | Yes | — | Văn bản thay thế cho ảnh sản phẩm |
| `price` | `number` | Yes | — | Đơn giá sản phẩm dưới dạng số nguyên/thực |
| `currency` | `SupportedCurrency` (`"USD"` \| `"VND"`) | Yes | — | Đơn vị tiền tệ hiển thị |
| `rating` | `number` | Yes | — | Điểm đánh giá trung bình (ví dụ: 4.8, 5.0) |
| `slug` | `string` | Yes | — | Chuỗi định danh thân thiện URL (SEO slug) |
| `gui` | `string` | Yes | — | Mã định danh GUID của sản phẩm |
| `quickAddLabel` | `string` | No | `"Liên hệ"` | Nhãn hiển thị trên nút bấm hành động ở chân thẻ |
| `sizes` | `string` | No | `"(max-width: 639px) 88vw, ..."` | Cấu hình `sizes` cho `next/image` |
| `className` | `string` | No | — | Lớp CSS tùy biến cho thẻ Card |

## Responsive Behavior

- Khung ảnh sản phẩm giữ tỉ lệ vuông hoàn hảo `aspect-square`.
- Tiêu đề sản phẩm tự động giới hạn tối đa 2 dòng (`line-clamp-2`), chữ lớn hơn trên mobile (`max-sm:text-xl`).
- Phần nội dung thông tin giữ chiều cao cố định (`h-[196px] sm:h-[212px]`) giúp các thẻ trong cùng một hàng luôn thẳng hàng ngay ngắn dù tên sản phẩm dài ngắn khác nhau.

## Basic Usage

```tsx
import { ProductCard } from "@/components/shared/product/product-card";

export function SingleProductDemo() {
  return (
    <ProductCard
      name="Bộ Insert Game Catan 3D Cực Đẹp"
      imageSrc="/images/products/catan-insert.jpg"
      imageAlt="Insert Catan"
      price={450000}
      currency="VND"
      rating={5.0}
      slug="bo-insert-game-catan-3d"
      gui="a1b2c3d4"
    />
  );
}
```

## Advanced Usage

### Tùy biến Nhãn Nút và Kích thước Grid

```tsx
import { ProductCard } from "@/components/shared/product/product-card";

export function CustomCard() {
  return (
    <ProductCard
      name="Terraforming Mars Deluxe Player Tray"
      imageSrc="/images/products/tm-tray.jpg"
      imageAlt="Terraforming Mars Tray"
      price={25}
      currency="USD"
      rating={4.9}
      slug="tm-deluxe-player-tray"
      gui="f9e8d7c6"
      quickAddLabel="Nhắn tin tư vấn"
      className="border-neutral-300 hover:shadow-md transition-shadow"
    />
  );
}
```

## Dependencies

### Internal

- `Button` từ `@/components/ui/button`
- `Card`, `CardContent` từ `@/components/ui/card`
- `formatCurrency`, `SupportedCurrency` từ `@/utils/format-currency`
- `cn` từ `@/utils/cn`

### External

- `next/image`
- `next/link`
- `lucide-react` (`Star`)

## Accessibility

- Thẻ liên kết bọc ảnh có `aria-label={"Xem chi tiết ${name}"}`.
- Số sao đánh giá có `aria-label={"${rating.toFixed(1)} out of 5 stars"}`.
- Nút liên hệ có `aria-label={"${quickAddLabel}: ${name}"}`.
- Icon sao có `aria-hidden="true"`.

## Styling

- Đường viền xám mảnh `border border-gray-200 bg-white`.
- Giá tiền dùng font số dạng bảng `tabular-nums font-semibold`.
- Nút bấm liên hệ bo tròn toàn phần `rounded-full bg-neutral-950 text-white hover:bg-black`.

## Implementation Notes

- Nút hành động ở chân thẻ hiện tại liên kết trực tiếp tới Fanpage Facebook của Game Piece Labs (`https://www.facebook.com/In3DPhuKienBoardgame?locale=vi_VN`) mở trong tab mới (`target="_blank"`).
- Đường dẫn trang chi tiết được ghép từ slug và gui: `/products/${slug}-${gui}`.
