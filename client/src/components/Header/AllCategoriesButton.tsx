import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, ChevronRight, Home } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "react-router-dom";
import CategoryModule from "@/contexts/CategoryContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import GlobalRefreshButton from "../Commons/GlobalRefreshButton";

const { CategoryContext } = CategoryModule;

interface FormattedCategory {
  label: string;
  href: string;
  image?: string;
  color?: string;
  subItems?: string[];
}

interface AllCategoriesButtonProps {
  withHome?: boolean;
}

const AllCategoriesButton: React.FC<AllCategoriesButtonProps> = ({
  withHome = false,
}) => {
  const { categories, loading, error } = useContext(CategoryContext);
  const navigate = useNavigate();

  const homeBtnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/");
  };

  const formattedCategories: FormattedCategory[] = categories.map((cat) => ({
    label: cat.name,
    color: cat.color,
    image: cat.images?.[0] || "",
    href: `/categories/${cat._id}`,
    subItems: [],
  }));

  return (
    <div className="flex flex-row justify-center items-center gap-1">
      {withHome && (
        <Button
          onClick={homeBtnClick}
          className="bg-header-catbtn text-white rounded-l-full px-4 py-3 font-semibold text-lg flex items-center gap-2 hover:bg-header-catbtnhover transition-colors"
        >
          <Home className="w-6 h-6" />
        </Button>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {withHome ? (
            <Button className="bg-header-catbtn text-white rounded-r-full px-6 py-3 font-semibold text-lg flex items-center gap-2 hover:bg-header-catbtnhover transition-colors">
              <span>ALL CATEGORIES</span>
              <ChevronDown className="w-6 h-6" />
            </Button>
          ) : (
            <Button className="bg-header-catbtn text-white rounded-full px-6 py-3 font-semibold text-lg flex items-center gap-2 hover:bg-header-catbtnhover transition-colors">
              <Menu className="w-6 h-6" />
              <span>ALL CATEGORIES</span>
              <ChevronDown className="w-6 h-6" />
            </Button>
          )}
        </DropdownMenuTrigger>

        <DropdownMenuContent className="ml-4 w-72 pl-4 pr-2 rounded-xl text-lg z-30 pt-10 pb-2">
          {error ? (
            <div className="text min-h-28-sm px-4 pb-4">
              <GlobalRefreshButton />
            </div>
          ) : !loading ? (
            formattedCategories.map(
              ({ label, href, subItems, color, image }, index) => (
                <React.Fragment key={label}>
                  <HoverCard openDelay={50} closeDelay={0}>
                    <HoverCardTrigger asChild>
                      <Link to={href}>
                        <DropdownMenuItem
                          className="text-lg cursor-pointer flex flex-row items-center justify-between gap-2 font-semibold transition-all duration-200 hover:shadow-md hover:scale-[1.01]"
                          style={{ backgroundColor: color }}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={image} alt={label} />
                              <AvatarFallback>C</AvatarFallback>
                            </Avatar>
                            <span>{label}</span>
                          </div>
                          <ChevronRight className="w-6 h-6 text-gray-400" />
                        </DropdownMenuItem>
                      </Link>
                    </HoverCardTrigger>

                    {subItems && subItems.length > 0 && (
                      <HoverCardContent
                        side="right"
                        align="start"
                        className="w-56 pl-8 pt-2 pr-2 pb-4"
                      >
                        <ul className="space-y-2">
                          {subItems.map((sub: string) => (
                            <li
                              key={sub}
                              className="w-full hover:text-header-catbtnhover py-1 cursor-pointer"
                            >
                              <span className="text-lg font-semibold">
                                {sub}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </HoverCardContent>
                    )}
                  </HoverCard>

                  {index < formattedCategories.length - 1 && (
                    <DropdownMenuSeparator />
                  )}
                </React.Fragment>
              )
            )
          ) : (
            Array.from({ length: 5 }).map((_, idx) => (
              <React.Fragment key={idx}>
                <DropdownMenuItem className="py-2">
                  <Skeleton className="h-[20px] w-[150px] rounded-full" />
                </DropdownMenuItem>
                {idx < 4 && <DropdownMenuSeparator />}
              </React.Fragment>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AllCategoriesButton;
