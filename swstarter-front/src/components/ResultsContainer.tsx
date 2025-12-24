import { Card } from "./Card";
import { type ResourceTypeValue } from "../constants/resourceTypes";

export interface ResultItem {
  id: string;
  label: string;
  type: ResourceTypeValue;
}

interface ResultsContainerProps {
  results: ResultItem[];
  isLoading?: boolean;
  onSeeDetails?: (item: ResultItem) => void;
}

export const ResultsContainer = ({
  results,
  isLoading = false,
  onSeeDetails,
}: ResultsContainerProps) => {
  if (isLoading) {
    return (
      <Card className="w-full md:max-w-[480px] md:h-[414px] p-5 flex flex-col">
        <h3 className="w-[50px] h-4 mb-1.5 mr-4 text-[13px] font-bold text-black">
          Results
        </h3>
        <div className="pr-3">
          <div className="w-full h-[0.5px] mt-2 mb-1 bg-[#d3d3d3]" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[10px] font-bold text-gray-400">Searching...</p>
        </div>
      </Card>
    );
  }

  if (results.length === 0) {
    return (
      <Card className="w-full md:max-w-[480px] md:h-[414px] p-5 flex flex-col">
        <h3 className="w-[50px] h-4 mb-1.5 mr-4 text-[13px] font-bold text-black">
          Results
        </h3>
        <div className="pr-3">
          <div className="w-full h-[0.5px] mt-2 mb-1 bg-[#d3d3d3]" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="w-[230px] text-[10px] font-bold text-gray-400 text-center">
            There are zero matches. Use the form to search for People or Movies.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full md:max-w-[480px] md:h-[414px] p-5 flex flex-col">
      <h3 className="w-[50px] h-4 mb-1.5 mr-4 text-[13px] font-bold text-black">
        Results
      </h3>
      <div className="pr-3">
        <div className="w-full h-[0.5px] mt-2 mb-1 bg-[#d3d3d3]" />
      </div>
      <div className="flex-1 overflow-y-auto mt-1 pr-3">
        <div className="space-y-1.5">
          {results.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-2 border-b border-[#dadada]"
            >
              <p className="text-[12px] font-bold text-black">{item.label}</p>
              <button
                type="button"
                onClick={() => onSeeDetails?.(item)}
                className="px-4 py-1 rounded-full bg-[#00a85a] text-[9px] font-bold tracking-[0.05em] text-white hover:bg-[#00924e] transition-colors cursor-pointer"
              >
                SEE DETAILS
              </button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
