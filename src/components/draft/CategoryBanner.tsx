
import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { Info } from "lucide-react";

interface CategoryBannerProps {
  currentCategory: string;
  onSearch: (term: string) => void;
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({ currentCategory, onSearch }) => (
  <div className="flex items-center justify-between gap-4 w-full bg-[#333147] px-3 md:px-8 py-1.5 md:py-2 border-b border-[#232440] min-h-[40px]">
    <div>
      <h2 className="font-bold text-white text-xs md:text-sm whitespace-nowrap">Current Category: {currentCategory}</h2>
      <p className="text-white/80 text-[10px] md:text-xs mt-0.5">Select your pick for this category</p>
    </div>
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="text-gray-400 hover:text-white">
            <Info size={14} />
          </button>
        </TooltipTrigger>
        <TooltipContent className="bg-gray-800 text-white border-gray-700 max-w-xs text-xs p-3">
          <p>Category selection information</p>
        </TooltipContent>
      </Tooltip>
    </div>
  </div>
);

export default CategoryBanner;
