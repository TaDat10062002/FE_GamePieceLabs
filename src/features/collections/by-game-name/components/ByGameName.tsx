import { CardImageTitle } from "@/components/shared/card-image-title";
import Filter, { FilterMobileGroup } from "@/components/shared/filter";
import { ImageFrame } from "@/components/shared/image/image-frame";
import { MarqueeText } from "@/components/shared/marquee-text";
import { ProductList } from "@/components/shared/product/product-list";
import { SectionTitle } from "@/components/shared/section-title";
import Wrapper from "@/components/shared/wrapper";
import type { ByGameNamePageData } from "@/features/collections/by-game-name/types/by-game-name";

interface ByGameNameProps {
  data: ByGameNamePageData;
}

const sortOptions = [
  "featured",
  "most relevant",
  "best selling",
  "alphabetically, a-z",
  "alphabetically, z-a",
  "price, low to high",
  "price, high to low",
  "date, old to new",
  "date, new to old",
] as const;

export function ByGameName({ data }: ByGameNameProps) {
  const { title, editorial, products, otherCategories } = data;
  const filters = {
    availability: <Filter variant="switch" label="In stock only" activeLabel="In Stock" defaultChecked={false} labelPosition="left" showActiveBadge />,
    type: <Filter items={[{ id: "insert", label: "Insert", count: 1 }]} title="Product" variant="type" />,
    price: <Filter variant="price" min={0} max={283500} step={5000} currency="VND" />,
    sort: <Filter variant="sort" items={sortOptions} />,
  };

  return (
    <>
      <Wrapper>
        <h1 className="type-h1 pb-8 text-center text-neutral-950">
          {title}
        </h1>

        <div className="grid w-full grid-cols-2 items-center gap-x-2 gap-y-4 border-y border-neutral-200 py-4 max-sm:hidden sm:flex sm:justify-between sm:gap-x-5">
          {filters.availability}

          <div className="contents sm:flex sm:flex-wrap sm:items-center sm:gap-x-2 sm:gap-y-3">
            {filters.type}
            {filters.price}
          </div>

          {filters.sort}
        </div>

        <section className="pt-10" aria-labelledby="by-game-products-heading">
          <div className="mb-7 flex items-center justify-between gap-4">
            <h2 id="by-game-products-heading" className="sr-only">
              {title} products
            </h2>
            <p className="text-sm text-neutral-600">
              {products.pagination.totalItems} product
            </p>
          </div>

          <FilterMobileGroup>
            {filters.availability}
            {filters.type}
            {filters.price}
            {filters.sort}
          </FilterMobileGroup>

          <ProductList
            products={products.data}
            columns={4}
            alignPagination="center"
            pagination={products.pagination}
            variantPagination="simple"
            isShowed={false}
          />
        </section>
      </Wrapper>

      <MarqueeText
        title="Mastery is a never-ending exploration"
        speed={50}
        fontSize="text-8xl"
      />

      <SectionTitle
        content="split"
        image={{
          src: editorial.imageSrc,
          alt: editorial.imageAlt,
          aspectRatio: "aspect-[784/600]",
        }}
        className="pb-10"
      >
        <ImageFrame
          src={editorial.emblemSrc}
          alt={editorial.emblemAlt}
          aspectRatio="aspect-[78/83]"
          objectFit="contain"
          sizes="52px"
          containerClassName="w-[52px] max-w-none sm:w-[52px] xl:w-[52px]"
          className="rounded-none border-0 bg-transparent shadow-none sm:rounded-none"
        />
      </SectionTitle>

      <SectionTitle
        title="Explore Other Categories"
        more={{ label: "view all categories", href: "/collections" }}
        className="pb-16 sm:pb-20"
      >
        {otherCategories.map((category) => (
          <CardImageTitle
            key={category.href}
            {...category}
            prefix="/collections"
          />
        ))}
      </SectionTitle>
    </>
  );
}
