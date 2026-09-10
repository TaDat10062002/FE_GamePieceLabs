import type { ReactNode } from "react";

/** Canh heading/CTA trong section. */
export type SectionTitleAlign = "left" | "center" | "right";
/** Hướng xếp heading và content. */
export type SectionTitleOrientation = "vertical" | "horizon";
/** Vị trí text content so với ảnh trong horizontal split. */
export type SectionTitleSplitContentPosition = "left" | "right";

export interface SectionTitleMore {
  /** Text cho link xem thêm. */
  label?: string;
  /** Đường dẫn đích của link xem thêm. */
  href?: string;
}

/** Section heading thông thường, phù hợp cho text content hoặc card/image list. */
export interface SectionTitleMoreProps {
  /** Heading chính của section. */
  title: string;
  /** CTA "xem thêm" tùy chọn. */
  more?: SectionTitleMore;
  /** Canh heading và CTA. */
  align?: SectionTitleAlign;
  /** Hướng đặt heading và nội dung. */
  orientation?: SectionTitleOrientation;
  /** Nội dung section nằm dưới heading. */
  children: ReactNode;
  /** Class cho section wrapper. */
  className?: string;
  /** Chọn layout content text hoặc image grid. */
  content?: "text" | "imageList";
}

export interface SectionTitleHorizonSplitProps {
  /** Không dùng title riêng ở horizontal split; đặt heading trong `children`. */
  title?: never;
  /** Không có CTA ở horizontal split. */
  more?: never;
  /** Không áp dụng canh heading ở horizontal split. */
  align?: never;
  /** Bắt buộc để chọn image/text side-by-side layout. */
  orientation?: "horizon";
  /** Nội dung text/editorial đặt ở nửa còn lại của layout. */
  children: ReactNode;
  /** Class cho section wrapper. */
  className?: string;
  /** Chọn layout split có ảnh. */
  content: "split";
  /** Đặt content ở trái/phải trên desktop. Mặc định `right`. */
  contentPosition?: SectionTitleSplitContentPosition;
  /** Ảnh media trong split layout. */
  image: {
    /** URL/path ảnh. */
    src: string;
    /** Alt text mô tả ảnh. */
    alt: string;
    /** Tailwind aspect class tùy chọn cho ImageFrame. */
    aspectRatio?: string;
  };
}

/** Split layout dọc: heading phía trên, content phía dưới, không có ảnh bắt buộc. */
export interface SectionTitleVerticalSplitProps {
  /** Heading tùy chọn; cần `ariaLabel` nếu bỏ qua title. */
  title?: string;
  /** Tên accessibility cho section không có title. */
  ariaLabel?: string;
  /** CTA cạnh heading. */
  more?: SectionTitleMore;
  /** Canh heading và CTA. */
  align?: SectionTitleAlign;
  /** Bắt buộc để chọn vertical split layout. */
  orientation: "vertical";
  /** Nội dung section. */
  children: ReactNode;
  /** Class cho section wrapper. */
  className?: string;
  /** Chọn layout split. */
  content: "split";
  /** Không áp dụng cho vertical split. */
  contentPosition?: never;
  /** Không áp dụng cho vertical split. */
  image?: never;
}

/** Union props cho hai biến thể split. */
export type SectionTitleSplitProps =
  | SectionTitleHorizonSplitProps
  | SectionTitleVerticalSplitProps;

/** API public của `SectionTitle`; `content` và `orientation` quyết định biến thể render. */
export type SectionTitleProps =
  | SectionTitleMoreProps
  | SectionTitleSplitProps;
