import { Category } from "@/types";
import { CategoryActions } from "./CategoryActions";
import { useNavigate } from "react-router-dom";
import { useDeleteCategory } from "@/hooks/useDeleteCategory";
import { useAdminUser } from "@/contexts/AdminUserContext";
import CategoryModule from "../../contexts/CategoryContext";
import { toast } from "sonner";
import { useContext } from "react";

const { CategoryContext } = CategoryModule;

interface CategoryRowProps {
  category: Category;
}

export default function CategoryRow({ category }: CategoryRowProps) {
  const navigate = useNavigate();
  const { deleteCategory } = useDeleteCategory();
  const { admin } = useAdminUser();
  const { refetch } = useContext(CategoryContext);

  const handleEdit = () => {
    navigate(`/dashboard/categories/${category._id}/edit`);
  };

  const handleDelete = async () => {
    if (!admin?.isSuper) {
      alert("Only super admins can delete categories.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      await deleteCategory(category._id);
      toast.success("Category deleted successfully");
      refetch();
    } catch (err) {
      console.error("Failed to delete category:", err);
      toast.error("Error deleting category");
    }
  };

  return (
    <tr className="border-b border-gray-800 hover:bg-gray-900 transition-colors">
      <td className="px-4 py-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
            <img
              src={category.images[0]}
              alt={category.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-200 truncate">
              {category.name}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-200">
        {category.description}
      </td>
      <td className="px-4 py-4 text-sm text-gray-200">
        <div
          className="w-6 h-6 rounded-full"
          style={{ backgroundColor: category.color }}
        />
      </td>
      <td className="px-4 py-4">
        <CategoryActions onEdit={handleEdit} onDelete={handleDelete} />
      </td>
    </tr>
  );
}
