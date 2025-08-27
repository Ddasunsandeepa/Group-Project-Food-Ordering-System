import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CategoryModule from "../../../contexts/CategoryContext";

const { CategoryContext } = CategoryModule;

const NoResultsSuggestions: React.FC = () => {
  const { categories } = useContext(CategoryContext);
  const suggestions = categories.slice(0, 4);

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-6 px-4 py-6">
      <img
        src="/foodman-shy.webp"
        alt="No results illustration"
        className="h-40 w-auto opacity-80"
      />
      <div className="text-center text-gray-400 space-y-1">
        <p className="text-sm font-medium">Oops! No results found.</p>
        <p className="text-sm text-gray-500">
          But maybe you'd like one of these?
        </p>
      </div>

      <div className="w-full flex flex-row justify-center flex-wrap gap-3 w-full max-w-sm">
        {suggestions.map(({ id, name, color, images }) => (
          <Link
            to={`/categories/${id}`}
            key={id}
            className="w-fit rounded-full px-4 py-2 flex items-center justify-between font-semibold text-base hover:shadow-md hover:scale-[1.01] transition-all"
            style={{ backgroundColor: color || "#f4f4f4" }}
          >
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={images?.[0]} alt={name} />
                <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span>{name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NoResultsSuggestions;
