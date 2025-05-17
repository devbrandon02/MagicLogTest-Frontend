import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AppRoutesPath } from "./app.routes"
import LayoutDashboard from "../layouts/dashboard.layout"
import { DashboardAInventoryPage } from "../pages/product/admin/inventory-admin.page"


export const DashboardRoutesPath = {
  createProductAdminPath: "/admin/dashboard/product/create",
  productAdminPath: "/admin/dashboard/product",
  inventoryAdminPath: "/admin/dashboard/inventory",
}

export const DashboardRoutes = () => {
  return (
    <Route path={AppRoutesPath.dashboardAdminPath} element={<LayoutDashboard />}>
      <Route path={DashboardRoutesPath.inventoryAdminPath} element={<DashboardAInventoryPage />} />
      <Route path="" element={<Navigate to={DashboardRoutesPath.inventoryAdminPath} replace />} />
    </Route>
  )
}