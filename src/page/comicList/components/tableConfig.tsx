import { Link } from "react-router-dom";
import { Comic } from "@/@types/comics";
import { formatDateToTimezone } from "@/lib/dateTimeHelper";
import { TableHeader } from "@/@types/response";

const headers: TableHeader[] = [
  { label: "image", sortable: false },
  { label: "title", sortKey: "title", sortable: true, defaultSort: true },
  { label: "onsale Date", sortKey: "onsaleDate", sortable: true },
  { label: "foc Date", sortKey: "focDate", sortable: true },
  { label: "unlimited Date", sortable: false },
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

const renderDateCell = (dates: { type: string; date: string }[], type: string) => (
  <TableCell id={type}>{formatDateToTimezone(dates.find((date) => date.type === type)?.date)}</TableCell>
);

const renderRow = (rowData: Comic) => {
  const { id, title, thumbnail, dates } = rowData;
  return (
    <>
      <TableCell id={`${id}-image`}>
        <img
          src={`${thumbnail?.path}.${thumbnail?.extension}`}
          alt={title}
          className="w-16 h-16 object-cover rounded"
        />
      </TableCell>
      <TableCell id={`${id}-title`} className="text-left">
        <Link to={`/comics/${id}`} className="text-blue-500 italic underline hover:text-red-700">
          {title}
        </Link>
      </TableCell>
      {renderDateCell(dates, "onsaleDate")}
      {renderDateCell(dates, "focDate")}
      {renderDateCell(dates, "unlimitedDate")}
    </>
  );
};

export { headers, renderRow };
