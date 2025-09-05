import React from "react";
import NavHomeBtn from "./Other/NavHomeBtn";
import NavCategoryButtons from "./Other/NavCategoryButtons";
import NavBlogBtn from "./Other/NavBlogBtn";
import NavContactBtn from "./Other/NavContactBtn";

const MainNavigation: React.FC = () => {
  return (
      <div className="w-full flex flex-row flex-nowrap justify-start items-center gap-x-3 mx-auto px-4 py-2">
        <NavHomeBtn />
        <NavCategoryButtons />
        <NavBlogBtn />
        <NavContactBtn />
      </div>
  );
};

export default MainNavigation;
