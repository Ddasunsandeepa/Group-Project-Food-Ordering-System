import React from "react";
import { useUser } from "../../contexts/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, Heart, List } from "lucide-react";
import { Link } from "react-router-dom";

type UserDetailsButtonProps = {
  variant?: "full" | "mini";
};

const UserDetailsButton: React.FC<UserDetailsButtonProps> = ({
  variant = "full",
}) => {
  const { user, logout } = useUser();
  console.log("user:",user?.id);

  const handleLogout = () => {
    logout()
  };

  const getAvatarFallback = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };
  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {variant === "full" ? (
            <div className="min-h-16 flex items-center space-x-4 cursor-pointer hover:bg-gray-100 transition select-none px-6 py-4 rounded-full">
              <Avatar className="h-12 w-12 ring-1 ring-header-signin/40 ring-offset-2 ring-offset-white">
                <AvatarImage src="/" />
                <AvatarFallback className="bg-header-signin/90 font-semibold text-white text-lg">
                  {getAvatarFallback(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-gray-700 font-semibold">{user.name}</span>
                <span className="text-gray-500 text-sm">{user.email}</span>
              </div>
            </div>
          ) : (
            <div className="min-h-12 flex items-center justify-center cursor-pointer">
              <Avatar className="h-10 w-10 ring-1 ring-header-signin/40 ring-offset-2 ring-offset-white">
                <AvatarImage src={"/"} />
                <AvatarFallback className="bg-header-signin/90 font-semibold text-white text-base">
                  {getAvatarFallback(user.name)}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-64 px-4 pb-4 rounded-xl shadow-lg"
        >
          <DropdownMenuLabel>
            <span className="text-gray-500 font-normal">My Account</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <Link to="/favorites">
            <DropdownMenuItem className="flex items-center gap-3 cursor-pointer">
              <Heart className="w-5 h-5 text-gray-500" />
              <span className="text-lg">My List</span>
            </DropdownMenuItem>
          </Link>

          <Link to="/orders">
            <DropdownMenuItem className="flex items-center gap-3 cursor-pointer">
              <List className="w-5 h-5 text-gray-500" />
              <span className="text-lg">My Orders</span>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>
            <span className="text-gray-500 font-normal">Action centre</span>
          </DropdownMenuLabel>

          <DropdownMenuItem
            className="flex items-center gap-3 cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 text-header-catbtn" />
            <span className="text-lg  text-header-catbtn hover:text-header-catbtnhover transition-colors">
              Log out
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
};

export default UserDetailsButton;
