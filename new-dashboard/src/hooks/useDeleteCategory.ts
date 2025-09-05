import { useAdminUser } from "@/contexts/AdminUserContext";
import CategoryModule from "../contexts/CategoryContext";
import { useContext } from "react";

const { CategoryContext } = CategoryModule;

export const useDeleteCategory = () => {
  const { admin } = useAdminUser();
    const { refetch } = useContext(CategoryContext);

  const deleteCategory = async (categoryId: string) => {
    if (!admin?.permissions.includes("super")) {
      alert("You do not have permission to delete categories.");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/category/${categoryId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete category");

      await res.json();
      refetch();
      alert("Category deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Error deleting category");
    }
  };

  return { deleteCategory };
};
