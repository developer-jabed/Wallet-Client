
import User from "@/pages/Users/User";
import type { ISidebarItem } from "@/types";


export const userSidebarItems: ISidebarItem[] = [
    {
        title: "History",
        items: [
            {
                title: "Bookings",
                url: "/user/analitics",
                component: User,
            },
        ],
    },
];