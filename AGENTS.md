<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

<!-- END:nextjs-agent-rules -->

## Knowledge Answer Enhancement (Bắt buộc)

- Khi user hỏi kiến thức (trong đồ án hoặc trên mạng):
  - Trả lời kiến thức chính.
  - Thêm ít nhất 1 bài toán đời sống/thực tế thường gặp có sử dụng kiến thức đó.
  - Giải thích vì sao kiến thức đó phù hợp với bài toán.
- Ưu tiên ví dụ gần với FE web, user flow, hiệu năng, bảo trì hoặc e-commerce.

## Next Auth Route Rules (Bắt buộc)

- Ưu tiên dùng `src/app/api/**/route.ts` hoặc route group API tương đương cho auth logic (authorize redirect, callback, refresh, logout).
- Không đổi token trực tiếp trong client page nếu có thể đổi qua server route.
- Không lưu token OAuth trong `localStorage`/`sessionStorage`.
- Ưu tiên mô hình session cookie:
  - cookie `HttpOnly + Secure + SameSite=Strict`
  - token/refresh token lưu server-side (in-memory cho dev, DB/Redis cho production).
- UI pages (`src/app/**/page.tsx`) chỉ nên xử lý view state, không xử lý secret/token raw.

## Source Structure Rules (Bắt buộc)

- Toàn bộ application source đặt trong `src/`; alias `@/*` trỏ tới `src/*`.
- `src/app` chỉ giữ file conventions của Next.js: `page.tsx`, `layout.tsx`, `route.ts`, `loading.tsx`, `error.tsx`, metadata files và composition cần thiết cho route.
- Component dùng chung đặt trong:
  - `src/components/ui`: atomic component do shadcn quản lý.
  - `src/components/layouts`: Header, Footer và shell dùng chung.
  - `src/components/shared`: component được nhiều feature sử dụng.
- Ngoài các layout lớn như Header và Footer, component có thể xuất hiện lặp lại ở nhiều vị trí, trên nhiều trang hoặc với nhiều biến thể phải đặt trong `src/components/shared`.
- Chỉ đặt component trong `src/components/layouts` khi nó thực sự định nghĩa layout/shell lớn của ứng dụng.
- Không đặt component nghiệp vụ, type hoặc API client rải rác trong `src/app`.

## Feature Folder Rules (Bắt buộc)

- Mỗi feature gom code theo domain tại `src/features/<feature>`.
- Cấu trúc chỉ tạo khi thực sự cần:
  - `components/`: UI riêng của feature.
  - `data/`: typed mock data.
  - `services/`: API/backend communication.
  - `types/`: DTO và UI model của feature.
  - `lib/` hoặc `server/`: logic nội bộ hoặc server-only.
- API/type chỉ dùng cho một feature không đặt trong `src/lib`, `src/services` hoặc `src/types` dùng chung.
- Không tạo abstraction/repository/interface nếu feature chỉ có một implementation đơn giản.

## shadcn UI Rules (Bắt buộc)

- Mỗi UI mới phải ưu tiên component trong `src/components/ui` và thêm bằng shadcn CLI khi component chưa tồn tại.
- Không tự viết lại Button, Card, Input, Dialog, Sheet, Dropdown, Navigation Menu hoặc primitive khác nếu shadcn đã có.
- Tailwind chỉ dùng để composition, spacing, responsive và semantic theme tokens.
- Không thêm Ant Design/MUI/thư viện UI khác vào feature mới. Ant Design hiện tại được xem là legacy cho đến khi có task migrate riêng.
- Interactive component mới thêm `"use client"` tại boundary nhỏ nhất cần state/event/browser API; page và layout mặc định là Server Component.

## Mock Data & API Boundary

- Mock data phải có type rõ ràng và đặt trong `src/features/<feature>/data`.
- Component hiển thị nhận data qua props, không đọc URL backend hoặc environment variable trực tiếp.
- Khi nối API thật, đặt hàm giao tiếp backend trong `src/features/<feature>/services` hoặc BFF `route.ts` nếu có security-sensitive logic.
- Header/Footer mock không được gọi auth, cart hoặc product API khi user chưa yêu cầu nối dữ liệu thật.

## Verification Rules

- Không kết luận hoàn thành nếu build/type-check còn lỗi do thay đổi mới.
- Warning có sẵn phải được ghi nhận; không tranh thủ refactor warning ngoài scope.

## Storefront Layout Rules

- Storefront shell được compose tại `src/app/(storefront)/layout.tsx`.
- Header đặt tại `src/components/layouts/header`; Footer đặt tại `src/components/layouts/footer`.
- Typed mock data cho Header/Footer đặt tại `src/features/navigation/data` và type đặt tại `src/features/navigation/types`.
- Footer presentation nhận `FooterContent` qua props; không hard-code API URL hoặc gọi backend trong component.
- Currency/language selector chỉ là UI mock local cho đến khi user yêu cầu nối persistence/API thật.
