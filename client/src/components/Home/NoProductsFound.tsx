import React from "react";

const NoProductsFound: React.FC = () => (
  <div className="text-center py-8">
    <div className="text-6xl mb-4">🔍</div>
    <h3 className="text-xl font-semibold text-gray-600 mb-2">
      No Products Found
    </h3>
    <p className="text-gray-500">Try selecting a different category</p>
  </div>
);

export default NoProductsFound;
