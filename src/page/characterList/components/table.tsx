import { Link } from "react-router-dom";

import { Character } from "@/@types/character";
import { TableHeader } from "@/@types/response";

const headers: TableHeader[] = [
  { label: "image", sortable: false },
  { label: "name", sortKey: "name", sortable: true, defaultSort: true },
  { label: "description", sortable: false },
];

const TableCell: React.FC<{ id: string; className?: string; children: React.ReactNode }> = ({
  id,
  className,
  children,
}) => (
  <td key={id} className={`p-3 border-b ${className}`}>
    {children}
  </td>
);

const renderRow = (rowData: Character) => {
  const { id, name, thumbnail, description } = rowData;
  return (
    <>
      <TableCell id={`${id}-image`}>
        <img src={`${thumbnail?.path}.${thumbnail?.extension}`} alt={name} className="w-16 h-16 object-cover rounded" />
      </TableCell>
      <TableCell id={`${id}-name`} className="text-left">
        <Link to={`/character/${id}`} className="text-blue-500 italic underline hover:text-red-700">
          {name}
        </Link>
      </TableCell>
      <TableCell id={`${id}-description`}>{description}</TableCell>
    </>
  );
};

export { headers, renderRow };
