import React, { useContext } from "react";
import { LuDessert } from "react-icons/lu";
import { GiMeal, GiSodaCan, GiForkKnifeSpoon } from "react-icons/gi";
import NavDropdownButton from "./NavDropdownButton";
import CategoryModule from "../../../contexts/CategoryContext";

const { CategoryContext } = CategoryModule;

const NavCategoryButtons: React.FC = () => {
  const { categories } = useContext(CategoryContext);
  const getCategoryLink = (type: string) => {
    const cat = categories.find((c) =>
      c.name.toLowerCase().includes(type.toLowerCase())
    );
    return cat ? `/categories/${cat._id}` : "#";
  };

  return (
    <div className="flex gap-4">
      <NavDropdownButton
        name="Meals"
        icon={<GiForkKnifeSpoon size={19} />}
        link={getCategoryLink("Meal")}
      />
      <NavDropdownButton
        name="Desserts"
        icon={<LuDessert size={19} />}
        link={getCategoryLink("Dessert")}
      />
      <NavDropdownButton
        name="Combos"
        icon={<GiMeal size={19} />}
        link={getCategoryLink("Combo")}
      />
      <NavDropdownButton
        name="Drinks"
        icon={<GiSodaCan size={19} />}
        link={getCategoryLink("Drinks")}
      />
    </div>
  );
};

export default NavCategoryButtons;
