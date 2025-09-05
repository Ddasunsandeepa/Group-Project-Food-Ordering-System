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
import Home from "./pages/Home";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductEditPage from "./pages/ProductEditPage";
import ProductAddPage from "./pages/ProductAddPage";
import CategoryEditPage from "./pages/CategoryEditPage";
import CategoryAddPage from "./pages/CategoryAddPage";
import AddAdminPage from "./pages/AddAdminPage";
import EditAdminpage from "./pages/EditAdminpage";

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
              <Home />
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
        path="/dashboard/products/:id"
        element={
          <ProtectedRoute>
            <Dashboard>
              <ProductDetailPage />
            </Dashboard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/products/:id/edit"
        element={
          <ProtectedRoute>
            <Dashboard>
              <ProductEditPage />
            </Dashboard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/products/add"
        element={
          <ProtectedRoute>
            <Dashboard>
              <ProductAddPage />
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
        path="/dashboard/categories/:id/edit"
        element={
          <ProtectedRoute>
            <Dashboard>
              <CategoryEditPage />
            </Dashboard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/categories/add"
        element={
          <ProtectedRoute>
            <Dashboard>
              <CategoryAddPage />
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
        path="/dashboard/admins/:id/edit"
        element={
          <ProtectedRoute>
            <Dashboard>
              <EditAdminpage />
            </Dashboard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admins/add"
        element={
          <ProtectedRoute>
            <Dashboard>
              <AddAdminPage />
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
