import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../Home/ProductItem";
import { Product } from "../../types"; // Adjust this import if you have types defined
import ProductCardRow from "../Home/ProductItemRow";

interface ProductListProps {
  products: Product[];
  viewMode: string;
}

const ProductList: React.FC<ProductListProps> = ({ products, viewMode }) => {
  return (
    <motion.div
      key={viewMode}
      layout
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.8 }}
      transition={{ duration: 1 }}
      className={`${
        viewMode === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
          : viewMode === "grid2"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          : "flex flex-col space-y-4"
      }`}
    >
      <AnimatePresence>
        {products.length > 0 ? (
          products.map((product) => (
            <motion.div
              key={product._id}
              layout
              initial={{ opacity: 0.8, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.8, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {viewMode === "list" ? (
                <ProductCardRow product={product} />
              ) : (
                <ProductCard product={product} />
              )}
            </motion.div>
          ))
        ) : (
          <motion.div
            className={`text-center py-12 ${
              viewMode === "list" ? "w-full" : "col-span-full"
            }`}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-gray-500 text-lg">
              No products available in this category
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Try selecting a different category
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductList;
