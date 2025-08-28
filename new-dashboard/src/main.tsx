import { StrictMode } from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { AdminUserProvider } from "./contexts/AdminUserContext";
import { ThemeProvider } from "./contexts/Themeprovider";
import { ProductProvider } from "./contexts/ProductContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ProductProvider>
          <AdminUserProvider>
            <AppRoutes />
          </AdminUserProvider>
        </ProductProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
