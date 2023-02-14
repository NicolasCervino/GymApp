import { useState } from "react";
import { BsSearch } from "react-icons/bs";

function SearchBar() {
  const [query, setQuery] = useState<string>("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query !== "") alert(query);
  };

  return (
    <div className="w-full p-6 outline-none flex items-center">
      <label className="bg-[#252525] h-8 flex items-center px-6 rounded-l-xl">
        <BsSearch />
      </label>
      <input
        className="outline-none w-full bg-[#252525] h-8 rounded-r-xl"
        type="text"
        placeholder="Search exercises"
        onKeyDown={handleSearch}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
