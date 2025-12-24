import { useState } from "react";
import { SWRadioButton } from "./SWRadioButton";
import { SWCard } from "./SWCard";
import {
  ResourceType,
  type ResourceTypeValue,
} from "../../constants/resourceTypes";

interface SWSearchContainerProps {
  onSearch: (query: string, type: ResourceTypeValue) => void;
}

export const SWSearchContainer = ({ onSearch }: SWSearchContainerProps) => {
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
    <SWCard className="w-[320px] p-6 mx-auto md:mx-0">
      <h2 className="text-sm font-semibold tracking-wide text-[#8892b0] mb-4">
        What are you searching for?
      </h2>

      <div className="flex items-center gap-6 mb-5">
        <SWRadioButton
          id="sw-people"
          name="swSearchType"
          value={ResourceType.PEOPLE}
          label="People"
          checked={searchType === ResourceType.PEOPLE}
          onChange={(value) => setSearchType(value as ResourceTypeValue)}
        />
        <SWRadioButton
          id="sw-movies"
          name="swSearchType"
          value={ResourceType.MOVIES}
          label="Movies"
          checked={searchType === ResourceType.MOVIES}
          onChange={(value) => setSearchType(value as ResourceTypeValue)}
        />
      </div>

      <div className="flex flex-col gap-4">
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
              : "e.g. A New Hope, Empire Strikes Back"
          }
          className="
            w-full h-11 px-4 rounded-lg
            bg-[#0a0a0f]/80 border border-[#4a9eff]/30
            text-white text-sm placeholder:text-[#4a5568]
            focus:outline-none focus:border-[#4a9eff] focus:shadow-[0_0_15px_rgba(74,158,255,0.2)]
            transition-all duration-300
          "
        />

        <button
          onClick={handleSearch}
          disabled={isSearchDisabled}
          className={`
            w-full h-11 rounded-lg font-bold text-sm tracking-wider uppercase
            ${
              isSearchDisabled
                ? "bg-[#1a1a2e] text-[#4a5568] cursor-not-allowed border border-[#2a2a3e]"
                : "force-button bg-[#ffd700] text-black cursor-pointer"
            }
          `}
        >
          Search the Galaxy
        </button>
      </div>
    </SWCard>
  );
};
