"use client";

import { Product } from "@/types";
import { useState } from "react";
import ProductRow from "./ProductRow";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

interface ProductTableProps {
  products: Product[];
}

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

function Dropdown({ label, value, options, onChange }: DropdownProps) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-300 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-700 rounded-md p-2 bg-gray-800 text-gray-200 hover:border-gray-500"
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function ProductTable({ products }: ProductTableProps) {
  const [showBy, setShowBy] = useState("");
  const [categoryBy, setCategoryBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const categories = Array.from(
    new Set(products.map((p) => p.category.name))
  ).sort();
  const types = Array.from(new Set(products.map((p) => p.type))).sort();

  // Filtered products
  const filteredProducts = products.filter((product) => {
    const matchesShow = !showBy || product.type === showBy;
    const matchesCategory = !categoryBy || product.category.name === categoryBy;
    return matchesShow && matchesCategory;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-gray-950 rounded-lg shadow-md border border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-800">
        <h2 className="text-xl font-semibold text-gray-100">Products</h2>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 bg-gray-900 border-b border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Dropdown label="Show By" value={showBy} options={types} onChange={setShowBy} />
          <Dropdown label="Category By" value={categoryBy} options={categories} onChange={setCategoryBy} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Product
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Discount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 text-center py-3 text-xs font-medium text-gray-200 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-950 divide-y divide-gray-800">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <ProductRow key={product._id} product={product} />
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                  No products found matching the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 bg-gray-900 border-t border-gray-800 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    onClick={() => setCurrentPage(i + 1)}
                    className={currentPage === i + 1 ? "bg-gray-700 text-gray-100" : ""}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Footer */}
      {filteredProducts.length > 0 && (
        <div className="px-6 py-3 bg-gray-900 border-t border-gray-800">
          <p className="text-sm text-gray-400">
            Showing {paginatedProducts.length} of {filteredProducts.length} filtered products
          </p>
        </div>
      )}
    </div>
  );
}
