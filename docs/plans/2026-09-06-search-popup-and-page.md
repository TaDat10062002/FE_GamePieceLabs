# Search Popup And Page Implementation Plan

> **For Codex:** implement in the current storefront without adding a new test framework.

**Goal:** Add a search popup with quick product previews and a `/search` page with full results and filters.

**Architecture:** Search data is mapped from existing mock product details through one feature-level helper. The header owns only the trigger/popup, while the search page reads URL params and renders filtered results. This keeps the UI mock-first and makes the future API swap small.

**Tech Stack:** Next.js App Router, React client components, Tailwind CSS, existing `ProductCard`, `Sheet`, `Input`, and mock product data.

---

### Task 1: Search Data Helpers

**Files:**
- Create: `src/features/search/types/search-product.ts`
- Create: `src/features/search/lib/search-products.ts`

**Steps:**
1. Map `mockProductDetails` into a storefront search product model.
2. Implement query matching by product name, description, slug, and material.
3. Implement filters for stock, product type, price range, and sort.

### Task 2: Search Popup

**Files:**
- Create: `src/features/search/components/search-drawer.tsx`
- Modify: `src/components/layouts/header/site-header.tsx`

**Steps:**
1. Use the existing search icon as a trigger.
2. Show a right-side drawer with a large input.
3. Show up to 5 matching products.
4. Navigate to `/search?q=value` on Enter or search action.

### Task 3: Search Page

**Files:**
- Create: `src/features/search/components/search-results-view.tsx`
- Create: `src/app/(storefront)/search/page.tsx`

**Steps:**
1. Read initial query from `searchParams`.
2. Render full result count, search input, filter sidebar, sort, and product grid.
3. Keep filter state client-side while mock data is used.

### Task 4: Verification

**Commands:**
- `npx.cmd tsc --noEmit`
- `npm.cmd run lint`
