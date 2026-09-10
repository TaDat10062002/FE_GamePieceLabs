/** Inline error state cố định cho product detail không tải được. Component hiện không nhận props; nếu cần reuse cho resource khác, tách `message` thành public prop thay vì hard-code text mới. */
export default function PageNotFound() {
  return (
    <div role="alert" className="type-prose rounded-xl border border-red-200 bg-red-50 p-4 text-base text-red-700 sm:p-5">
      Không thể tải chi tiết sản phẩm. Vui lòng kiểm tra lại sản phẩm hoặc API.
    </div>
  );
}
