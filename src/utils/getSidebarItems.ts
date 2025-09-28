
import { role } from "@/constants/role";
import { adminSidebarItems } from "@/Router/adminSidebarItems";
import { userSidebarItems } from "@/Router/userSidebarItems";
import type { TRole } from "@/types";


export const getSidebarItems = (userRole: TRole) => {
    switch (userRole) {
        case role.admin:
            return [...adminSidebarItems];
        case role.agent:
            return [...adminSidebarItems];
        case role.user:
            return [...userSidebarItems];
        default:
            return [];
    }
};