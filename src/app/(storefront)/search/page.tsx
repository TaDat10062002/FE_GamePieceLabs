import { SearchResultsView } from "@/features/search/components/search-results-view";

type SearchPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getSearchParamValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = (await searchParams) ?? {};
  const initialQuery = getSearchParamValue(params.q);

  return <SearchResultsView initialQuery={initialQuery} />;
}
