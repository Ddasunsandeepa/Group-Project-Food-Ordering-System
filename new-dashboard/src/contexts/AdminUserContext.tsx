import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export type Permission = "view" | "write" | "super";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  permissions: Permission[];
  isSuper: boolean;
  token: string;
}

interface JwtPayload {
  exp: number; // expiration time in seconds
}

export interface AdminUserContextType {
  admin: AdminUser | null;
  login: (admin: AdminUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
  refetchAdmin : () => Promise<void>; // added
}

const AdminUserContext = createContext<AdminUserContextType | undefined>(undefined);

export const AdminUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    const stored = localStorage.getItem("admin");
    if (!stored) return null;

    try {
      const parsed: AdminUser = JSON.parse(stored);
      const decoded: JwtPayload = jwtDecode(parsed.token);
      const now = Date.now() / 1000;
      if (decoded.exp > now) return parsed;
    } catch {
      localStorage.removeItem("admin");
    }

    return null;
  });

  const login = (adminData: AdminUser) => {
    setAdmin(adminData);
    localStorage.setItem("admin", JSON.stringify(adminData));
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
    navigate("/admin-login");
  };

  const isAuthenticated = !!admin?.token;

  // Auto-logout when JWT expires
  useEffect(() => {
    if (!admin?.token) return;

    let timeout: NodeJS.Timeout;

    try {
      const decoded: JwtPayload = jwtDecode(admin.token);
      const now = Date.now();
      const expTime = decoded.exp * 1000;
      const delay = expTime - now;

      if (delay <= 0) {
        logout();
      } else {
        timeout = setTimeout(() => {
          logout();
        }, delay);
      }
    } catch {
      logout();
    }

    return () => clearTimeout(timeout);
  }, [admin?.token]);

  // Refetch current admin data from backend
  const refetchAdmin = async () => {
    if (!admin?.id || !admin.token) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/${admin.id}`, {
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      const data = await res.json();
      if (res.ok && data.status && data.admin) {
        const updatedAdmin: AdminUser = {
          ...data.admin,
          token: admin.token, // keep current token
        };
        setAdmin(updatedAdmin);
        localStorage.setItem("admin", JSON.stringify(updatedAdmin));
      } else {
        console.warn("Failed to refetch admin:", data.msg);
      }
    } catch (err) {
      console.error("Error refetching admin:", err);
    }
  };

  return (
    <AdminUserContext.Provider value={{ admin, login, logout, isAuthenticated, refetchAdmin }}>
      {children}
    </AdminUserContext.Provider>
  );
};

// Custom hook
export const useAdminUser = (): AdminUserContextType => {
  const context = useContext(AdminUserContext);
  if (!context) throw new Error("useAdminUser must be used within an AdminUserProvider");
  return context;
};
