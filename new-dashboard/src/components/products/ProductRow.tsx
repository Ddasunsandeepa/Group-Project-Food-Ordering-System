import { Product } from "@/types";
import { ProductActions } from "./ActionColumn";
import { formatPrice } from "@/utils/helpers";
import { useNavigate } from "react-router-dom";

interface ProductRowProps {
  product: Product;
}

export default function ProductRow({ product }: ProductRowProps) {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/dashboard/products/${product._id}`);
  };
  const handleEdit = () => {
  navigate(`/dashboard/products/${product._id}/edit`);
};

  const handleDelete = () => console.log("Delete", product.name);

  return (
    <tr className="border-b border-gray-800 hover:bg-gray-900 transition-colors">
      <td className="px-4 py-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-200 truncate">
              {product.name}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-200 hidden md:block">
        {product.category.name}
      </td>
      <td className="px-4 py-4 text-sm text-gray-200 hidden md:block">
        {product.discount}%
      </td>
      <td className="px-4 py-4 text-sm font-medium text-gray-200">
        {formatPrice(product.price)}
      </td>
      <td className="px-4 py-4">
        <ProductActions
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </td>
    </tr>
  );
}
