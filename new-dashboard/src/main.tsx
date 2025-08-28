import { StrictMode } from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { AdminUserProvider } from "./contexts/AdminUserContext";
import { ThemeProvider } from "./contexts/Themeprovider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AdminUserProvider>
        <AppRoutes />
      </AdminUserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
