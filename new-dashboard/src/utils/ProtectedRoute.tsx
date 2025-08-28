import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAdminUser } from "@/contexts/AdminUserContext";

interface Props {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const { admin, isAuthenticated } = useAdminUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait until the auth state is known
    setLoading(false);
  }, [isAuthenticated]);

  if (loading) {
    return <div className="p-4 text-gray-400">Loading...</div>; // or a spinner
  }

  if (!isAuthenticated) {
    // Not logged in → redirect to login
    return <Navigate to="/admin-login" replace />;
  }

  if (!admin?.isSuper) {
    // Logged in but insufficient permissions
    return <Navigate to="/" replace />; // or anywhere safe, not /no-access yet
  }

  return <>{children}</>;
};
