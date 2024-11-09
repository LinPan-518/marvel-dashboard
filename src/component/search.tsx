import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { GoSearch } from "react-icons/go";
import { useDebounce } from "use-debounce";

import Button from "@/component/button";

interface SearchBarProps {
  className: string;
  placeholder?: string;
  autoFocus?: boolean;
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ className, onSearch, placeholder, autoFocus = false }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 600);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(debouncedSearchTerm);
    }
  };

  // Whenever the debounced search term changes, trigger the search callback
  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(debouncedSearchTerm);
  };

  return (
    <section className={`${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="flex w-full items-center gap-10">
          <div className="flex items-center p-2 border-b-2 border-black-default w-full">
            <GoSearch size={24} />
            <input
              name="search"
              placeholder={placeholder ?? "Search ..."}
              className="border-none outline-none px-3 w-full"
              autoFocus={autoFocus}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button label={"Search"} type="submit" variant="primary" />
        </div>
      </form>
    </section>
  );
};

export default SearchBar;
