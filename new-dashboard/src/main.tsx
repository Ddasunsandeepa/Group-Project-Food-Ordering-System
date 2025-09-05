import { StrictMode } from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { AdminUserProvider } from "./contexts/AdminUserContext";
import { ThemeProvider } from "./contexts/Themeprovider";
import { ProductProvider } from "./contexts/ProductContext";
import { Toaster } from "./components/ui/sonner";
import { CategoryProvider } from "./contexts/CategoryContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ProductProvider>
          <CategoryProvider>
            <AdminUserProvider>
              <AppRoutes />
              <Toaster />
            </AdminUserProvider>
          </CategoryProvider>
        </ProductProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
