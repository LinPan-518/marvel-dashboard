import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MaskContainer from "@/component/mask";
import SearchBar from "@/component/search";
import SkeletonLoader from "@/component/listPage/loading";
import InfiniteLoadTable from "@/component/infiniteLoadTable";
import SectionHeader from "@/component/sectionHeader";

import { PAGE_LIMIT } from "@/lib/constants";

type MarvelListPageProps<T> = {
  title: string;
  subTitle?: string;
  imgPath: string;
  headers: { label: string; sortable: boolean; sortKey?: string; defaultSort?: boolean }[];
  renderRow: (rowData: T) => React.ReactElement;
  useData: (searchString: string, orderBy: string) => any;
  placeholder: string;
};

function MarvelListPage<T>({
  title,
  subTitle,
  imgPath,
  headers,
  renderRow,
  useData,
  placeholder,
}: MarvelListPageProps<T>) {
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");
  const [orderBy, setOrderBy] = useState<string>("");
  const [sort, setSort] = useState<{ sortKey: string; sortValue: boolean } | undefined>();

  const { data, error, size, setSize, isLoading, isValidating } = useData(searchString, orderBy);

  const items = data ? (data as T[][]).flat() : [];
  const isReachingEnd = data && data[data.length - 1]?.length < PAGE_LIMIT;

  useEffect(() => {
    const defaultSortHeader = headers.find((header) => header.defaultSort);
    if (defaultSortHeader) {
      setSort({ sortKey: defaultSortHeader.sortKey || "", sortValue: true });
      handleSort(defaultSortHeader.sortKey || "");
    }
    // eslint-disable-next-line
  }, [headers]);

  const handleSort = (sortKey: string) => {
    const isSameKey = sort?.sortKey === sortKey;
    const newSortValue = isSameKey ? !sort.sortValue : true;
    const newSortKey = newSortValue ? sortKey : `-${sortKey}`;
    setSort({ sortKey, sortValue: newSortValue });
    setOrderBy(newSortKey);
  };

  if (error) {
    navigate("/error_404");
    return null;
  }

  return (
    <>
      <MaskContainer imgPath={imgPath} title={title} subTitle={subTitle} />
      <div className="container mx-auto p-4">
        <SectionHeader title={title} />
        <SearchBar
          className={"mt-10 mb-8 w-[90%] sm:max-w-[800px]"}
          onSearch={(searchString) => setSearchString(searchString?.trim())}
          placeholder={placeholder}
          autoFocus={true}
        />
        {isLoading && <SkeletonLoader />}
        {items.length > 0 ? (
          <InfiniteLoadTable<T>
            data={items}
            loadMore={() => {
              if (!isValidating && !isReachingEnd) {
                setSize(size + 1);
              }
            }}
            sort={sort}
            onSort={handleSort}
            isReachingEnd={isReachingEnd ?? false}
            headers={headers}
            renderRow={(rowData: T) => <>{renderRow(rowData)}</>}
          />
        ) : (
          !isLoading && !isValidating && <p className="mt-4 text-center text-3xl font-bold">No data found</p>
        )}
      </div>
    </>
  );
}

export default MarvelListPage;
