import React from "react";
import { FaArrowDownShortWide, FaArrowUpShortWide } from "react-icons/fa6";

import Spinner from "@/component/spinner";
import useIntersectionObserver from "@/hook/useIntersectionObserver";

export type SortOption = {
  sortKey: string;
  sortValue: boolean;
};

interface TableProps<T> {
  data: T[];
  sort: SortOption | undefined;
  isReachingEnd: boolean;
  isLoadingMore?: boolean;
  headers: { label: string; sortable: boolean; sortKey?: string; defaultSort?: boolean }[];
  loadMore: () => void;
  onSort: (sortKey: string) => void;
  renderRow: (rowData: T) => React.ReactElement;
}

const InfiniteLoadTable = <T,>({ data, loadMore, onSort, sort, isReachingEnd, headers, renderRow }: TableProps<T>) => {
  const bottomRef = useIntersectionObserver(loadMore, {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });

  return (
    <div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header.label}
                className={`p-3 border-b capitalize ${header.sortable ? "cursor-pointer" : ""}`}
                onClick={() => header.sortable && onSort(header?.sortKey || "")}
              >
                <span className="flex items-center">
                  <span>{header.label}</span>
                  {header.sortable && (
                    <span className="ml-2 transition-transform duration-300">
                      {sort?.sortKey === header.sortKey ? (
                        sort?.sortValue ? (
                          <FaArrowUpShortWide size={24} color="crimson" />
                        ) : (
                          <FaArrowDownShortWide size={24} color="crimson" />
                        )
                      ) : (
                        <FaArrowUpShortWide size={24} color="gray" />
                      )}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((rowData, index) => (
            <tr key={index} className="hover:bg-gray-100 text-center">
              {renderRow(rowData)}
            </tr>
          ))}
        </tbody>
      </table>
      {!isReachingEnd && (
        <div ref={bottomRef} className="flex flex-col items-center my-5">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default InfiniteLoadTable;
