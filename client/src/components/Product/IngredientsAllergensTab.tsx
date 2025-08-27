import React from "react";

interface IngredientsAllergensTabProps {
  ingredients: string[];
  allergens: string[];
}

const IngredientsAllergensTab: React.FC<IngredientsAllergensTabProps> = ({
  ingredients,
  allergens,
}) => (
  <div className="mt-8 p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
          Ingredients
        </h3>
        <ul className="space-y-2">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-600 flex items-start">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
          Allergen Information
        </h3>
        <ul className="space-y-2">
          {allergens.map((allergen, index) => (
            <li key={index} className="text-gray-600 flex items-start">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {allergen}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default IngredientsAllergensTab;
