import { Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/auth/login.page";
import RegisterPage from "../pages/auth/register.page";
import LayoutDashboard from "../layouts/dashboard.layout";
import MarketplacePage from "../pages/product/marketplace/marketplace.page";
import { DashboardAInventoryPage } from "../pages/product/admin/inventory-admin.page";

export const AppRoutesPath = {
  authRegisterPath: "/admin/auth/register",
  authLoginPath: "/admin/auth",
  dashboardAdminPath: "/admin/dashboard",
  marketplacePath: "/marketplace",
}

export const DashboardRoutesPath = {
  createProductAdminPath: "/admin/dashboard/product/create",
  productAdminPath: "/admin/dashboard/product",
  inventoryAdminPath: "/admin/dashboard/inventory",
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={AppRoutesPath.authLoginPath} element={<LoginPage />} />
      <Route path={AppRoutesPath.authRegisterPath} element={<RegisterPage />} />
      <Route path={"/"} element={<MarketplacePage />} />

      <Route path={AppRoutesPath.dashboardAdminPath} element={<LayoutDashboard />}>
        <Route index element={<Navigate to={DashboardRoutesPath.inventoryAdminPath} replace />} />
        <Route path={DashboardRoutesPath.inventoryAdminPath} element={<DashboardAInventoryPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
