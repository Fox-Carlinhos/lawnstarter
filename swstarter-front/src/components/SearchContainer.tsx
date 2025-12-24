import { useState } from "react";
import { RadioButton } from "./RadioButton";
import { Card } from "./Card";
import {
  ResourceType,
  type ResourceTypeValue,
} from "../constants/resourceTypes";

interface SearchContainerProps {
  onSearch: (query: string, type: ResourceTypeValue) => void;
}

export const SearchContainer = ({ onSearch }: SearchContainerProps) => {
  const [searchType, setSearchType] = useState<ResourceTypeValue>(
    ResourceType.PEOPLE
  );
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim(), searchType);
    }
  };

  const isSearchDisabled = !query.trim();

  return (
    <Card className="w-[292px] p-5 mx-auto md:mx-0">
      <h2 className="w-[146px] h-3 mb-2 text-[10px] font-semibold text-[#383838]">
        What are you searching for?
      </h2>

      <div className="flex items-center gap-4 mb-3">
        <RadioButton
          id="people"
          name="searchType"
          value={ResourceType.PEOPLE}
          label="People"
          checked={searchType === ResourceType.PEOPLE}
          onChange={(value) => setSearchType(value as ResourceTypeValue)}
        />
        <RadioButton
          id="movies"
          name="searchType"
          value={ResourceType.MOVIES}
          label="Movies"
          checked={searchType === ResourceType.MOVIES}
          onChange={(value) => setSearchType(value as ResourceTypeValue)}
        />
      </div>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isSearchDisabled) {
              handleSearch();
            }
          }}
          placeholder={
            searchType === ResourceType.PEOPLE
              ? "e.g. Chewbacca, Yoda, Boba Fett"
              : "e.g. A New Hope, The Empire Strikes Back"
          }
          className="w-[249px] h-7 px-2 py-1.5 rounded shadow-[inset_0_0.5px_1.5px_0_rgba(0,0,0,0.15)] border-[0.5px] border-gray-300 bg-white text-[10px] placeholder:text-gray-400 focus:outline-none focus:border-teal-500 font-normal"
        />

        <button
          onClick={handleSearch}
          disabled={isSearchDisabled}
          className={`w-[249px] h-6 px-[103px] py-1 rounded-[10px] border-[0.5px] text-[10px] font-bold transition-colors ${
            isSearchDisabled
              ? "border-gray-300 bg-gray-300 text-gray-500 cursor-not-allowed"
              : "border-teal-500 bg-teal-500 text-white hover:bg-teal-600 cursor-pointer"
          }`}
        >
          SEARCH
        </button>
      </div>
    </Card>
  );
};
