import React from "react";
import AllCategoriesButton from "./AllCategoriesButton";
import MainNavigation from "./MainNavigation";

const Navbar: React.FC = () => {
  return (
    <div className="navbar w-full flex justify-start items-center gap-6 px-4 pt-3 pb-1">
      <AllCategoriesButton />
      <MainNavigation />
    </div>
  );
};

export default Navbar;
