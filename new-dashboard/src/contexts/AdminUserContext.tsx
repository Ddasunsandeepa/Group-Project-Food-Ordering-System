import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

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
}

const AdminUserContext = createContext<AdminUserContextType | undefined>(undefined);

export const AdminUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    const stored = localStorage.getItem("admin");
    if (!stored) return null;

    const parsed: AdminUser = JSON.parse(stored);
    if (parsed.token) {
      try {
        const decoded: JwtPayload = jwtDecode(parsed.token);
        const now = Date.now() / 1000;
        if (decoded.exp > now) return parsed; // token still valid
      } catch {
        // invalid token
      }
    }

    localStorage.removeItem("admin");
    return null;
  });

  const login = (adminData: AdminUser) => {
    setAdmin(adminData);
    localStorage.setItem("admin", JSON.stringify(adminData));
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
  };

  const isAuthenticated = !!admin?.token;

  // Auto-logout when JWT expires
  useEffect(() => {
    if (!admin?.token) return;

    let timeout: NodeJS.Timeout;

    try {
      const decoded: JwtPayload = jwtDecode(admin.token);
      const now = Date.now();
      const expTime = decoded.exp * 1000; // convert seconds → ms
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

  return (
    <AdminUserContext.Provider value={{ admin, login, logout, isAuthenticated }}>
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
