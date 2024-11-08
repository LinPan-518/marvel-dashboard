import React from "react";
import type { TableHeader } from "@/lib/types";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import Spinner from "./spinner";

interface TableProps {
  children: React.ReactElement;
  headers: TableHeader[];
  sortAsc: boolean;
  loading: boolean;

  handleSort: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const CharacterTable: React.FC<TableProps> = ({ headers, handleSort, sortAsc, loading, children }) => {
  return (
    <>
      <table className="w-full text-left border-separate border-spacing-0 border border-gray-200">
        <thead className="bg-background text-white">
          <tr className="w-full">
            {headers.map((header: TableHeader) => (
              <th className="p-3 border border-gray-300 capitalize" key={header.label}>
                <div className="flex items-center justify-between">
                  <span>{header.label}</span>
                  {header.sortable && (
                    <div onClick={handleSort} className="ml-2 cursor-pointer">
                      {sortAsc ? <GoArrowUp size={24} /> : <GoArrowDown size={24} />}
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
          {loading && (
            <tr>
              <td colSpan={headers.length} className="h-[400px]">
                <div className="flex items-center justify-center w-full h-full">
                  <Spinner size={48} />
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default CharacterTable;
