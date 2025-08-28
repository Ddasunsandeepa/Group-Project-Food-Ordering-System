import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LogIn";
import Dashboard from "./layouts/Dashboard";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { NoAccessPage } from "./pages/NoAccessPage";
import ProductsPage from "./pages/ProductsPage";
import CategoryPage from "./pages/CategoryPage";
import OrdersPage from "./pages/OrdersPage";
import ReviewsPage from "./pages/ReviewsPage";
import AdminsPage from "./pages/AdminsPage";
import SettingsPage from "./pages/SettingsPage";

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
      <Route
        path="/dashboard/products"
        element={
          <ProtectedRoute>
            <Dashboard>
              <ProductsPage />
            </Dashboard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/categories"
        element={
          <ProtectedRoute>
            <Dashboard>
              <CategoryPage />
            </Dashboard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/orders"
        element={
          <ProtectedRoute>
            <Dashboard>
              <OrdersPage />
            </Dashboard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/reviews"
        element={
          <ProtectedRoute>
            <Dashboard>
              <ReviewsPage />
            </Dashboard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admins"
        element={
          <ProtectedRoute>
            <Dashboard>
              <AdminsPage />
            </Dashboard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/settings"
        element={
          <ProtectedRoute>
            <Dashboard>
              <SettingsPage />
            </Dashboard>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
