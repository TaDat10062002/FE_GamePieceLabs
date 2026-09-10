import type { ReactElement, ReactNode } from "react";

export interface SectionTitleGroupProps {
  /** Các section title được xếp dọc với khoảng cách chuẩn. */
  children: ReactNode;
}

export function SectionTitleGroupProps({
  children,
}: SectionTitleGroupProps): ReactElement {
  return <div className="mt-10 space-y-16 sm:space-y-20">{children}</div>;
}
