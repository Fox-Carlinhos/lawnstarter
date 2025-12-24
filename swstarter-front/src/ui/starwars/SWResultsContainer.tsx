import { SWCard } from "./SWCard";
import { MillenniumFalcon } from "./MillenniumFalcon";
import {
  ResourceType,
  type ResourceTypeValue,
} from "../../constants/resourceTypes";

export interface ResultItem {
  id: string;
  label: string;
  type: ResourceTypeValue;
}

interface SWResultsContainerProps {
  results: ResultItem[];
  isLoading?: boolean;
  onSeeDetails?: (item: ResultItem) => void;
}

const LoadingState = () => (
  <div className="flex flex-col items-center gap-4">
    <div className="falcon-loading">
      <MillenniumFalcon className="w-24 h-16" />
    </div>
    <p className="text-sm text-[#4a9eff] animate-pulse tracking-wide">
      Searching the galaxy...
    </p>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center gap-3 text-center px-4">
    <p className="text-sm text-[#8892b0] max-w-[220px]">
      No results found. Use the form to search for People or Movies across the
      galaxy.
    </p>
  </div>
);

export const SWResultsContainer = ({
  results,
  isLoading = false,
  onSeeDetails,
}: SWResultsContainerProps) => {
  return (
    <SWCard className="w-full md:max-w-[520px] md:h-[450px] p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-lg font-bold text-white tracking-wide">Results</h3>
        {results.length > 0 && (
          <span className="px-2 py-0.5 rounded-full bg-[#ffd700]/20 text-[#ffd700] text-xs font-semibold">
            {results.length}
          </span>
        )}
      </div>

      <div className="w-full h-px bg-[#4a9eff]/30 mb-4" />

      {isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <LoadingState />
        </div>
      )}

      {!isLoading && results.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <EmptyState />
        </div>
      )}

      {!isLoading && results.length > 0 && (
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          {results.map((item, index) => (
            <div
              key={item.id}
              className="
                group flex items-center justify-between p-4 rounded-lg
                bg-[#0a0a0f]/50 border border-[#4a9eff]/10
                hover:border-[#4a9eff]/40 hover:bg-[#0a0a0f]/80
                transition-all duration-300
              "
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#4a9eff]/10 flex items-center justify-center border border-[#4a9eff]/20">
                  <span className="text-xs text-[#4a9eff]">
                    {item.type === ResourceType.PEOPLE ? "👤" : "🎬"}
                  </span>
                </div>
                <p className="text-sm font-semibold text-white group-hover:text-[#ffd700] transition-colors duration-300">
                  {item.label}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onSeeDetails?.(item)}
                className="
                  px-4 py-2 rounded-lg text-xs font-bold tracking-wide uppercase cursor-pointer
                  bg-[#4a9eff]/10 border border-[#4a9eff]/40 text-[#4a9eff]
                  hover:bg-[#4a9eff]/20 hover:border-[#4a9eff]
                  transition-all duration-300
                "
              >
                Details
              </button>
            </div>
          ))}
        </div>
      )}
    </SWCard>
  );
};
