import React from "react";
import { Product } from "../../types";
import { Link } from "react-router-dom";

interface DescriptionTabProps {
  product: Product;
}

const DescriptionTab: React.FC<DescriptionTabProps> = ({ product }) => (
  <div className="mt-8 p-6 bg-white rounded-lg border border-gray-100 shadow-sm space-y-6">
    {/* Product Description */}
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Product Description
      </h3>
      <p className="text-gray-600 leading-relaxed text-base">
        {product.description}
      </p>
    </div>

    {/* Metadata */}
    <div className="grid md:grid-cols-2 gap-6">
      {/* Category */}
      <div>
        <h4 className="text-md font-semibold text-gray-700 mb-1">Category</h4>
        {product.category?._id && (
          <Link
            to={`/categories/${product.category._id}`}
            className="inline-block px-3 py-1 text-gray-700 hover:underline text-base rounded-full transition"
            style={{ backgroundColor: product.category.color }}
          >
            {product.catName || product.category.name}
          </Link>
        )}
      </div>

      {/* Product Type */}
      <div>
        <h4 className="text-md font-semibold text-gray-700 mb-1">Product Type</h4>
        <p className="text-gray-600">{product.type || "N/A"}</p>
      </div>

      {/* Available Sizes */}
      <div>
        <h4 className="text-md font-semibold text-gray-700 mb-1">Available Sizes</h4>
        <p className="text-gray-600">
          {product.size?.length ? product.size.join(", ") : "N/A"}
        </p>
      </div>
    </div>
  </div>
);

export default DescriptionTab;
