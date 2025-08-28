"use client";

import { Category } from "@/types";
import { useState } from "react";
import CategoryRow from "./CategoryRow";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

interface CategoryTableProps {
  categories: Category[];
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

export default function CategoryTable({ categories }: CategoryTableProps) {
  const [filterColor, setFilterColor] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const colors = Array.from(new Set(categories.map((c) => c.color))).sort();

  // Filtered categories
  const filteredCategories = categories.filter((cat) => {
    return !filterColor || cat.color === filterColor;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-gray-950 rounded-lg shadow-md border border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-800">
        <h2 className="text-xl font-semibold text-gray-100">Categories</h2>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 bg-gray-900 border-b border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Dropdown
            label="Filter by Color"
            value={filterColor}
            options={colors}
            onChange={setFilterColor}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Color
              </th>
              <th className="px-4 text-center py-3 text-xs font-medium text-gray-200 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-gray-950 divide-y divide-gray-800">
            {paginatedCategories.length > 0 ? (
              paginatedCategories.map((category) => (
                <CategoryRow key={category._id} category={category} />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  No categories found matching the selected filters.
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
                    className={
                      currentPage === i + 1 ? "bg-gray-700 text-gray-100" : ""
                    }
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Footer */}
      {filteredCategories.length > 0 && (
        <div className="px-6 py-3 bg-gray-900 border-t border-gray-800">
          <p className="text-sm text-gray-400">
            Showing {paginatedCategories.length} of {filteredCategories.length}{" "}
            filtered categories
          </p>
        </div>
      )}
    </div>
  );
}
