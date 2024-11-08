import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import type { Character, TableHeader } from "@/lib/types";
import Spinner from "@/component/spinner";
import Table from "@/component/tableDisplay";

interface TableProps {
  data: Character[];
  loadMore: (page: number) => void;
}

const TableHeader = [
  { label: "image", key: "path.extension", sortable: false },
  { label: "name", key: "name", sortable: true },
  { label: "description", key: "description", sortable: false },
];

const TableRow = ({ rowData }: { rowData: Character }) => {
  const { id, name, thumbnail, description } = rowData;
  return (
    <tr key={id} className="hover:bg-gray-100">
      <td className="p-3 border-b">
        {/* Display character image */}
        <img src={`${thumbnail?.path}.${thumbnail?.extension}`} alt={name} className="w-16 h-16 object-cover rounded" />
      </td>
      <td className="p-3 border-b">
        <Link to={`/character/${id}`} className="hover:text-red-700">
          {name}
        </Link>
      </td>
      <td className="p-3 border-b">{description}</td>
    </tr>
  );
};

const CharacterTable: React.FC<TableProps> = ({ data, loadMore }) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState<Character[]>([]);

  useEffect(() => {
    setTable(data);
  }, [data]);

  // Handle sorting of data
  const handleSort = () => {
    setSortAsc(!sortAsc);
    setTable((prev) =>
      [...prev].sort((a, b) => (sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)))
    );
  };

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // useEffect(() => {
  //   console.log(page)
  //   loadMore(page);
  // }, [page]);

  return (
    <>
      <Table headers={TableHeader} handleSort={handleSort} sortAsc={sortAsc} loading={false}>
        <>
          {table.map((row: Character) => (
            <TableRow key={row.id} rowData={row} />
          ))}
        </>
      </Table>
      {!hasMore && <p className="text-center p-4">No more data to load</p>}
    </>
  );
};

export default CharacterTable;
