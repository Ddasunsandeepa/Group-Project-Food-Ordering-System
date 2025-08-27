import React from "react";

type Props = {
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  resetPriceRange: () => void; // New prop for reset
};

const PriceFilter: React.FC<Props> = ({
  priceRange,
  setPriceRange,
  resetPriceRange,
}) => {
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">FILTER BY PRICE</h2>
        <button
          onClick={resetPriceRange}
          className="text-sm text-gray-500 hover:underline"
        >
          Reset
        </button>
      </div>
      <div className="space-y-4">
        <div className="flex justify-start text-sm text-gray-600 mb-1">
          <label htmlFor="min-price" className="font-medium">
            Min Price: ${priceRange[0]}
          </label>
        </div>
        <input
          id="min-price"
          type="range"
          min={0}
          max={1000}
          step={10}
          value={priceRange[0]}
          onChange={(e) =>
            setPriceRange([Number(e.target.value), priceRange[1]])
          }
          className="w-full accent-header-catbtn"
        />
        <div className="flex justify-end text-sm text-gray-600 mb-1">
          <label htmlFor="max-price" className="font-medium">
            Max Price: ${priceRange[1]}
          </label>
        </div>
        <input
          id="max-price"
          type="range"
          min={0}
          max={1000}
          step={10}
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
          className="w-full accent-header-catbtn"
        />
      </div>
    </div>
  );
};

export default PriceFilter;
