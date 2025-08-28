import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LogIn";
import Dashboard from "./layouts/Dashboard";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { NoAccessPage } from "./pages/NoAccessPage";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/admin-login" element={<LoginPage />} />
      <Route path="/no-access" element={<NoAccessPage />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard>
              <div>Home</div>
            </Dashboard>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
