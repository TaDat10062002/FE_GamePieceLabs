# CardImageTitle

`CardImageTitle` và `CardImageTitleGrid` cung cấp thẻ bài trực quan kết hợp hình ảnh nền dạng overlay gradient tối và tiêu đề chữ nổi bật, thường dùng để điều hướng danh mục hoặc bộ sưu tập.

## Purpose

Tạo điểm nhấn thị giác cho danh mục sản phẩm, bộ sưu tập hoặc liên kết thương hiệu với hiệu ứng zoom ảnh mượt mà, hỗ trợ cả chế độ liên kết tương tác (`isClicked=true`) lẫn chế độ hiển thị tĩnh (`isClicked=false`).

## Use Cases

- Lưới danh mục game nổi bật trên Trang chủ (`game-categories`, `gear-categories`).
- Khối sản phẩm sắp ra mắt (`upcoming-products-section`).
- Khối liên kết thương hiệu/công ty (`company-links-section`).
- Các trang bộ sưu tập (`board-game-inserts`, `by-game-name`, `ox-product-family`, `tokens`).

## When to Use

- Cần hiển thị thẻ danh mục dạng ảnh lớn với tiêu đề nằm đè lên góc dưới hình ảnh.
- Cần bố cục dạng lưới responsive linh hoạt (2 cột trên mobile, 3 cột trên tablet/laptop, 5 cột trên desktop lớn) thông qua `CardImageTitleGrid`.
- Cần hiệu ứng tương tác hover mượt mà kèm icon mũi tên chuyển trang.

## When NOT to Use

- Hiển thị sản phẩm thương mại thông thường có giá cả, nút mua hàng, đánh giá sao (dùng `ProductCard`).
- Chỉ cần khung ảnh đơn giản không kèm link hay tiêu đề phủ (dùng `ImageFrame`).

## Import

```tsx
import {
  CardImageTitle,
  CardImageTitleGrid,
  type CardImageTitleAspectRatio,
  type CardImageTitleProps,
  type CardImageTitleGridProps,
} from "@/components/shared/card-image-title";
```

## Props

### `CardImageTitleProps`

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `imageSrc` | `string` | Yes | — | Đường dẫn URL hình ảnh hiển thị trong thẻ |
| `imageAlt` | `string` | Yes | — | Văn bản thay thế mô tả ảnh cho accessibility |
| `href` | `string` | Yes | — | Đường dẫn đích khi nhấn vào thẻ (sẽ kết hợp với `prefix` nếu có) |
| `title` | `string` | No | — | Tiêu đề hiển thị ở góc dưới thẻ |
| `prefix` | `string` | No | — | Tiền tố đường dẫn URL bổ sung vào trước `href` |
| `aspectRatio` | `CardImageTitleAspectRatio` | No | `"default"` | Tỉ lệ khung hình thẻ (`"default"`, `"square"`, `"portrait"`, `"landscape"`) |
| `isArrow` | `boolean` | No | `true` | Khi `true` và `isClicked=true`, hiển thị icon mũi tên tròn lướt vào khi hover trên desktop |
| `isClicked` | `boolean` | No | `false` | Quyết định khả năng tương tác. Khi `true`, bọc trong thẻ `<Link>`, bật hover zoom và hiệu ứng mũi tên. Khi `false`, render thẻ `<div>` tĩnh |
| `sizes` | `string` | No | `"(max-width: 639px) 50vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 20vw"` | Cấu hình `sizes` cho `next/image` tối ưu responsive loading |
| `imagePosition` | `CSSProperties["objectPosition"]` | No | `"center"` | Tọa độ căn chỉnh ảnh nền (`object-position`) |
| `className` | `string` | No | — | Lớp CSS tùy biến cho container bao ngoài |
| `titleClassName` | `string` | No | — | Lớp CSS tùy biến cho nhãn tiêu đề text |

### `CardImageTitleGridProps`

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `children` | `ReactNode` | Yes | — | Danh sách các thẻ `CardImageTitle` được render trong lưới |
| `className` | `string` | No | — | Lớp CSS tùy biến cho lưới container |

## Variants

### `aspectRatio`

- `default`: Tỉ lệ chuẩn `aspect-[1.05/1]`
- `square`: Tỉ lệ vuông `aspect-square` (1:1)
- `portrait`: Tỉ lệ chân dung `aspect-[4/5]`
- `landscape`: Tỉ lệ ngang rộng `aspect-[2.2/1]`

## States

- **Interactive State (`isClicked=true`)**: Con trỏ chuột chuyển dạng pointer, focus ring hiển thị khi dùng bàn phím, ảnh phóng to nhẹ (`group-hover:scale-[1.04]`), nút mũi tên tròn trắng hiện lên ở góc dưới phải.
- **Static State (`isClicked=false`)**: Thẻ chỉ hiển thị nội dung tĩnh dưới dạng `<div>`, không bọc liên kết `<Link>`.

## Responsive Behavior

- `CardImageTitleGrid` tự động phân chia cột:
  - Mobile (`< 640px`): 2 cột, khoảng cách gap-3.
  - Tablet (`sm: 640px - 1023px`): 2 cột, khoảng cách gap-5.
  - Laptop (`lg: 1024px - 1279px`): 3 cột.
  - Desktop (`xl: >= 1280px`): 5 cột.
- Icon mũi tên ẩn hoàn toàn trên màn hình nhỏ và chỉ xuất hiện từ breakpoint `sm:` trở lên khi hover.

## Basic Usage

```tsx
import { CardImageTitle } from "@/components/shared/card-image-title";

export function CategoryDemo() {
  return (
    <CardImageTitle
      title="Catan Inserts"
      imageSrc="/images/categories/catan.jpg"
      imageAlt="Hộp phụ kiện Catan"
      href="/collections/catan"
      isClicked
    />
  );
}
```

## Advanced Usage

### Kết hợp Lưới và Tiền tố URL

```tsx
import {
  CardImageTitle,
  CardImageTitleGrid,
} from "@/components/shared/card-image-title";

const categories = [
  { id: "1", title: "Nemesis", image: "/images/nemesis.jpg", slug: "nemesis" },
  { id: "2", title: "Terraforming Mars", image: "/images/tm.jpg", slug: "terraforming-mars" },
  { id: "3", title: "Dune Imperium", image: "/images/dune.jpg", slug: "dune-imperium" },
];

export function CategoriesGrid() {
  return (
    <CardImageTitleGrid className="xl:grid-cols-3">
      {categories.map((cat) => (
        <CardImageTitle
          key={cat.id}
          title={cat.title}
          imageSrc={cat.image}
          imageAlt={cat.title}
          href={cat.slug}
          prefix="/collections/by-game-name"
          aspectRatio="portrait"
          isClicked
          isArrow
        />
      ))}
    </CardImageTitleGrid>
  );
}
```

## Dependencies

### Internal

- `Card`, `CardContent` từ `@/components/ui/card`
- `cn` từ `@/utils/cn`

### External

- `next/image`
- `next/link`
- `lucide-react` (`ArrowRight`)

## Accessibility

- Khi `isClicked=true`, thẻ `Link` cung cấp `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4` cho người dùng bàn phím.
- Icon `ArrowRight` được ẩn với screen reader thông qua `aria-hidden="true"`.
- Lớp gradient phủ có thuộc tính `aria-hidden="true"`.

## Implementation Notes

- `isClicked` mặc định là `false`. Nếu muốn thẻ hoạt động như một liên kết chuyển hướng (`<Link>`), bắt buộc phải truyền `isClicked={true}`.
- Hàm `getPrefixedHref` tự động chuẩn hóa dấu gạch chéo nối giữa `prefix` và `href`.
