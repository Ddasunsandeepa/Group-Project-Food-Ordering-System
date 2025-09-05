import { useAdminUser } from "@/contexts/AdminUserContext";
import { useProductContext } from "@/contexts/ProductContext";

export const useDeleteProduct = () => {
  const { admin } = useAdminUser();
  const { fetchProducts } = useProductContext();

  const deleteProduct = async (productId: string) => {
    if (!admin?.permissions.includes("super")) {
      alert("You do not have permission to delete products.");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete product");

      await res.json();
      await fetchProducts(); // Refresh product list
      alert("Product deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  };

  return { deleteProduct };
};
