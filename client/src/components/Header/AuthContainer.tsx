import React from "react";
import { Button } from "../ui/button";
import UserDetailsButton from "./UserDetailsButton";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { Skeleton } from "../ui/skeleton";

interface AuthContainerProps {
  variant: "full" | "mini";
}

const AuthContainer: React.FC<AuthContainerProps> = ({ variant }) => {
  const { isLoggedIn, loading } = useUser();
  const location = useLocation();

  return (
    <div>
      {!loading ? (
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <Link to="/sign-in" state={{ from: location.pathname }}>
              <Button className="bg-header-signin hover:bg-header-strip transition-colors px-8 py-6 rounded-full">
                <span className="text-white font-semibold text-base">
                  Sign In
                </span>
              </Button>
            </Link>
          ) : (
            <UserDetailsButton variant={variant} />
          )}
        </div>
      ) : (
        <Skeleton className="w-20 h-12 rounded-full" />
      )}
    </div>
  );
};

export default AuthContainer;
