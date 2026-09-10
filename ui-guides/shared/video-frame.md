# VideoFrame

`VideoFrame` là component phát video với khung hình chuẩn tỉ lệ 16:9 (`aspect-video`), hỗ trợ cả video lưu trữ cục bộ (`local`) bằng thẻ HTML5 `<video>` lẫn video nhúng từ nền tảng ngoài (`youtube`) qua thẻ `<iframe>`.

## Purpose

Cung cấp khung trình chiếu video chuẩn responsive, tối ưu hiển thị trên mọi kích thước màn hình, phục vụ cho việc trình diễn sản phẩm, video quy trình chế tác in 3D hoặc trailer giới thiệu.

## Use Cases

- Trình diễn quy trình sản xuất thủ công trên trang Giới thiệu (`about-craftsmanship.tsx`).
- Khối video giới thiệu sản phẩm trên Trang chủ (`page.tsx`).
- Video hướng dẫn lắp ráp phụ kiện trên trang Chi tiết sản phẩm (`products/[id]/page.tsx`).

## When to Use

- Cần phát video MP4/WebM lưu cục bộ trong thư mục public hoặc qua URL CDN.
- Cần nhúng video YouTube (embed URL) với đầy đủ quyền phát tự động, toàn màn hình và picture-in-picture.
- Đảm bảo tỉ lệ khung hình luôn chuẩn 16:9 không bị méo mó.

## When NOT to Use

- Cần trình phát video nâng cao với custom controls (thanh tua tùy biến, phụ đề subtitle phức tạp, playlist).
- Video nền tự động phát lặp lại ở background banner (hero background video).

## Import

```tsx
import { VideoFrame, type VideoFrameProps } from "@/components/shared/video-frame";
```

## Props

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `type` | `'local'` \| `'youtube'` | Yes | — | Loại nguồn phát: video file cục bộ (`'local'`) hoặc iframe nhúng YouTube (`'youtube'`) |
| `src` | `string` | Yes | — | Đường dẫn URL file video cục bộ hoặc URL embed YouTube |
| `title` | `string` | No | `'Video'` | Tiêu đề mô tả video cho thuộc tính `title` của iframe/video (dùng cho accessibility) |

## Variants

### `type="local"`

- Render thẻ HTML5 `<video controls playsInline>` với thẻ con `<source src={src} />`.
- Đi kèm thông báo dự phòng bằng tiếng Việt: *"Trình duyệt của bạn không hỗ trợ video."*.

### `type="youtube"`

- Render thẻ `<iframe>` với các thuộc tính bảo mật và cấp quyền chuẩn:
  - `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"`
  - `referrerPolicy="strict-origin-when-cross-origin"`
  - `allowFullScreen`

## Responsive Behavior

- Tự động duy trì tỉ lệ 16:9 thông qua class Tailwind `aspect-video w-full overflow-hidden bg-black`. Video tự động co giãn 100% theo chiều rộng của thẻ cha.

## Basic Usage

### Video YouTube

```tsx
import { VideoFrame } from "@/components/shared/video-frame";

export function ProductVideo() {
  return (
    <VideoFrame
      type="youtube"
      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
      title="Video giới thiệu phụ kiện Catan"
    />
  );
}
```

### Video File Cục bộ

```tsx
import { VideoFrame } from "@/components/shared/video-frame";

export function CraftsmanshipVideo() {
  return (
    <VideoFrame
      type="local"
      src="/videos/craftsmanship-demo.mp4"
      title="Quy trình in 3D và hoàn thiện thủ công"
    />
  );
}
```

## Dependencies

### Internal

- Không phụ thuộc component nội bộ nào.

### External

- Không phụ thuộc thư viện bên ngoài.

## Accessibility

- Thẻ `<iframe>` và `<video>` đều nhận thuộc tính `title` để screen reader có thể đọc tên nội dung video.
- Thẻ `<video>` có thuộc tính `playsInline` để hỗ trợ trải nghiệm mượt mà trên trình duyệt di động iOS Safari.

## Implementation Notes

- Khi sử dụng với YouTube, `src` phải là link dạng embed (ví dụ `https://www.youtube.com/embed/...`), không dùng link xem thông thường (`https://www.youtube.com/watch?v=...`) vì YouTube sẽ chặn nhúng qua chính sách CORS / X-Frame-Options.
