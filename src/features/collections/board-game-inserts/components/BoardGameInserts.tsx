import { CardImageTitle } from "@/components/shared/card-image-title";
import Filter, { FilterMobileGroup } from "@/components/shared/filter";
import { SectionTitle } from "@/components/shared/section-title";
import Wrapper from "@/components/shared/wrapper";
import { CollectionsPageData } from "../types/board-game-inserts";
import { MarqueeText } from "@/components/shared/marquee-text";
import { ImageFrame } from "@/components/shared/image/image-frame";
import { ProductList } from "@/components/shared/product/product-list";

interface BoardGameInsertsProps {
  data: CollectionsPageData;
}

export function BoardGameInserts({ data }: BoardGameInsertsProps) {
  const { hero, editorial, products, otherCategories } = data;
  const filters = {
    availability: (
      <Filter
        variant="switch"
        label="In stock only"
        activeLabel="In Stock"
        defaultChecked={false}
        labelPosition="left"
        showActiveBadge
      />
    ),
    type: (
      <Filter
        items={[
          { id: "accessories", label: "Accessories", count: 1 },
          { id: "divider", label: "Divider", count: 4 },
          { id: "insert", label: "Insert", count: 276 },
        ]}
        title="Product"
        variant="type"
      />
    ),
    price: <Filter variant="price" min={0} max={274} step={1} currency="USD" />,
    sort: (
      <Filter
        variant="sort"
        items={[
          "featured",
          "most relevant",
          "best selling",
          "alphabetically, a-z",
          "alphabetically, z-a",
          "price, low to high",
          "price, high to low",
          "date, old to new",
          "date, new to old",
        ]}
      />
    ),
  };

  return (
    <>
      <ImageFrame
        src={hero.imageSrc}
        alt={hero.imageAlt}
        header={hero.header}
        description={hero.description}
        headerSize="h1"
        textAlign="left"
        priority
        aspectRatio="aspect-[4/3] sm:aspect-[16/7] lg:aspect-[22/5]"
        sizes="100vw"
        containerClassName="w-full max-w-none sm:w-full xl:w-full"
        className="rounded-none border-0 shadow-none sm:rounded-none"
        imageClassName="object-center"
      />

      <Wrapper>
        <div className="grid w-full grid-cols-2 items-start gap-x-2 gap-y-1 py-3 max-sm:hidden sm:flex sm:gap-0">
          <div className="min-w-0 text-left sm:flex-1">
            {filters.availability}
          </div>

          <div className="contents sm:flex sm:flex-1 sm:items-start sm:justify-center sm:gap-2 sm:text-center">
            {filters.type}
            {filters.price}
          </div>

          <div className="min-w-0 text-right sm:flex-1">{filters.sort}</div>
        </div>

        <section aria-labelledby="collection-products-heading">
          <FilterMobileGroup>
            {filters.availability}
            {filters.type}
            {filters.price}
            {filters.sort}
          </FilterMobileGroup>

          <div className="mb-7 flex items-center justify-between gap-4">
            <h2 id="collection-products-heading" className="sr-only">
              Board game inserts
            </h2>
            <p className="text-sm text-neutral-600">
              {products.pagination.totalItems} products
            </p>
          </div>

          <ProductList
            products={products.data}
            columns={4}
            alignPagination="center"
            pagination={products.pagination}
            variantPagination="simple"
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
        image={{ src: editorial.imageSrc, alt: editorial.imageAlt }}
        className="pb-10"
      >
        <div className="flex max-w-xl flex-col items-center text-center">
          <ImageFrame
            src={editorial.emblemSrc}
            alt={editorial.emblemAlt}
            aspectRatio="aspect-square"
            objectFit="contain"
            sizes="48px"
            containerClassName="w-12 max-w-none sm:w-12 xl:w-12"
            className="rounded-none border-0 bg-transparent shadow-none sm:rounded-none"
          />

          <h2 className="type-h2 mt-7 text-neutral-950">{editorial.heading}</h2>
          <p className="type-prose mt-6 text-base text-neutral-700">
            {editorial.description}
          </p>
        </div>
      </SectionTitle>

      <SectionTitle
        title="Explore Other Categories"
        more={{ label: "view all categories", href: "#" }}
        className="pb-16 sm:pb-20"
      >
        {otherCategories.map((category) => (
          <CardImageTitle
            key={category.href}
            {...category}
            prefix="/collections"
            isClicked={true}
          />
        ))}
      </SectionTitle>
    </>
  );
}
