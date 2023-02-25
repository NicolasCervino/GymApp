import { useState } from "react";
import { BsSearch } from "react-icons/bs";

function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="w-full p-6 outline-none flex items-center" onSubmit={handleSubmit}>
      <label className="bg-[#252525] h-8 flex items-center px-6 rounded-l-xl">
        <BsSearch />
      </label>
      <input
        className="outline-none w-full bg-[#252525] h-8 rounded-r-xl"
        type="text"
        placeholder="Search exercises by name"
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchBar;
