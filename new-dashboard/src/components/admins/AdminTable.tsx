"use client";

import React, { useState, useMemo } from "react";
import AdminRow from "./AdminRow";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AdminUser } from "@/contexts/AdminUserContext";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface AdminTableProps {
  admins: AdminUser[];
  onDelete?: (id: string) => void;
}

const AdminTable: React.FC<AdminTableProps> = ({
  admins,
  onDelete,
}) => {
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<"all" | "Managers" | "Kitchen Staff">(
    "all"
  );
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5; // 🔹 adjust how many admins per page

  // Filter admins by search + role
  const filteredAdmins = useMemo(() => {
    return admins.filter((a) => {
      const matchesSearch =
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole =
        filterRole === "all" ||
        (filterRole === "Managers" &&
          a.permissions.some((p) => p === "write")) ||
        (filterRole === "Kitchen Staff" &&
          a.permissions.every((p) => p === "view" && !a.isSuper));

      return matchesSearch && matchesRole;
    });
  }, [admins, search, filterRole]);

  const totalPages = Math.ceil(filteredAdmins.length / pageSize);

  // Paginate
  const paginatedAdmins = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAdmins.slice(start, start + pageSize);
  }, [filteredAdmins, currentPage, pageSize]);

  return (
    <div className="w-full space-y-4 mb-60 mt-8">
      {/* Controls */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Input
          placeholder="Search admins by name or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset to first page when searching
          }}
          className="max-w-xs bg-gray-900 border-gray-700 text-gray-200"
        />

        <div className="flex gap-2">
          <Button
            size="sm"
            variant={filterRole === "all" ? "default" : "outline"}
            onClick={() => {
              setFilterRole("all");
              setCurrentPage(1);
            }}
          >
            All
          </Button>
          <Button
            size="sm"
            variant={filterRole === "Managers" ? "default" : "outline"}
            onClick={() => {
              setFilterRole("Managers");
              setCurrentPage(1);
            }}
          >
            Managers
          </Button>
          <Button
            size="sm"
            variant={filterRole === "Kitchen Staff" ? "default" : "outline"}
            onClick={() => {
              setFilterRole("Kitchen Staff");
              setCurrentPage(1);
            }}
          >
            Kitchen Staff
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-800">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                Permissions
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 bg-gray-950">
            {paginatedAdmins.length > 0 ? (
              paginatedAdmins.map((admin) => (
                <AdminRow
                  key={admin.id}
                  admin={admin}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-sm text-gray-400"
                >
                  No admins found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 bg-gray-900 border border-gray-800 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((p) => Math.max(p - 1, 1));
                  }}
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(i + 1);
                    }}
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
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((p) => Math.min(p + 1, totalPages));
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default AdminTable;
