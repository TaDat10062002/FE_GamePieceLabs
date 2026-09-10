/** Container giới hạn chiều rộng và padding ngang chuẩn storefront. */
export type WrapperProps = {
  /** Nội dung cần đặt trong max-width layout. */
  children: React.ReactNode;
};

export default function Wrapper({ children }: WrapperProps) {
  return (
    <div className="mx-auto w-[calc(100%-2rem)] max-w-[1580px] pt-6 sm:w-[calc(100%-3rem)] sm:pt-8 xl:w-[calc(100%-100px)] xl:pt-10">
      {children}
    </div>
  );
}
