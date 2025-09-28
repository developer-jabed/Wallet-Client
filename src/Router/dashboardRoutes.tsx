import DashboardLayout from "@/components/layout/DashboardLayout";
import { dashboardMenu } from "@/config/dashboardMenu";
import type { RouteObject } from "react-router";
import PrivateRoute from "./PrivateRoute";
import type { TRole } from "@/types";

// helper function to generate routes (supports nested children)
const generateRoutes = (
    role: TRole,
    menuItems: typeof dashboardMenu[keyof typeof dashboardMenu]
): RouteObject[] =>
    menuItems.map((item) => {
        const route: RouteObject = {
            path: item.path,
            element: item.component ? (
                <PrivateRoute roles={[role]}>
                    <item.component />
                </PrivateRoute>
            ) : undefined,
            children: item.children
                ? item.children.map((child) => ({
                    path: child.path.replace(`${item.path}/`, ""), // relative path
                    element: child.component ? (
                        <PrivateRoute roles={[role]}>
                            <child.component />
                        </PrivateRoute>
                    ) : undefined,
                }))
                : undefined,
        };
        return route;
    });

export const dashboardRoutes: RouteObject = {
    path: "dashboard",
    element: <DashboardLayout />,
    children: Object.entries(dashboardMenu).flatMap(([role, menuItems]) =>
        generateRoutes(role.toUpperCase() as TRole, menuItems)
    ),
};
