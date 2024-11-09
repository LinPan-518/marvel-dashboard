import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { GoSearch } from "react-icons/go";
import { useDebounce } from "use-debounce";
import Button from "./button";

interface SearchBarProps {
  className: string;
  onSearch: (searchTerm: string) => void; // Callback to trigger search in parent
}
export default function SearchBar({ className, onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 600);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      onSearch(debouncedSearchTerm);
    }
  };

  // Whenever the debounced search term changes, trigger the search callback
  useEffect(() => {
    if (debouncedSearchTerm) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(debouncedSearchTerm);
  };
  return (
    <section className={`${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="flex w-full items-center gap-10">
          <div className="flex items-center p-2 border-b-2 border-black-default w-[80%]">
            <GoSearch size={24} />
            <input
              name="search"
              placeholder="Search ..."
              className="border-none outline-none px-3 w-[80%]"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button label={"Search"} type="submit" variant="primary" />
        </div>
      </form>
    </section>
  );
}
