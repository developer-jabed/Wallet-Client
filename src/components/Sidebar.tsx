import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { dashboardMenu } from "@/config/dashboardMenu";
import type { TRole } from "@/types";
import { GripHorizontal, ChevronDown, ChevronRight } from "lucide-react";
import { useAppSelector } from "@/app/hooks";
import { AnimatePresence, motion } from "framer-motion";

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const role = (useAppSelector((s) => s.auth.role) as TRole) || null;
    const loc = useLocation();

    if (!role) return <div>Loading...</div>;

    const roleKey = role.toLowerCase() as keyof typeof dashboardMenu;
    const items = dashboardMenu[roleKey];

    const toggleMenu = (path: string) => {
        setOpenMenu(openMenu === path ? null : path);
    };

    return (
        <aside
            className={`h-screen transition-all duration-300 flex flex-col ${collapsed ? "w-20" : "w-64"
                } bg-gray-50 border-r shadow-md`}
        >
            {/* Toggle button */}
            <div className="flex items-center justify-end p-2 border-b border-gray-200">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1 rounded hover:bg-gray-200 transition-colors"
                >
                    <GripHorizontal
                        className={`w-6 h-6 text-gray-500 transition-transform ${collapsed ? "rotate-180" : ""
                            }`}
                    />
                </button>
            </div>

            {/* Panel header */}
            {!collapsed && (
                <div className="p-4 font-semibold border-b border-gray-200 text-gray-700">
                    {role.toUpperCase()} PANEL
                </div>
            )}

            {/* Menu items */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {items.map((it) => {
                    const active = loc.pathname.includes(it.path);

                    if (it.children) {
                        return (
                            <div key={it.path}>
                                {/* Parent button */}
                                <button
                                    onClick={() => toggleMenu(it.path)}
                                    className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors ${active
                                            ? "bg-blue-100 text-blue-700"
                                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {it.icon && (
                                            <it.icon
                                                className={`w-5 h-5 ${active ? "text-blue-600" : "text-gray-500"
                                                    } ${collapsed ? "mx-auto" : ""}`}
                                            />
                                        )}
                                        {!collapsed && <span>{it.label}</span>}
                                    </div>
                                    {!collapsed &&
                                        (openMenu === it.path ? (
                                            <ChevronDown className="w-4 h-4" />
                                        ) : (
                                            <ChevronRight className="w-4 h-4" />
                                        ))}
                                </button>

                                {/* Dropdown children */}
                                <AnimatePresence>
                                    {!collapsed && openMenu === it.path && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="ml-4 mt-1 space-y-1"
                                        >
                                            {it.children.map((child) => {
                                                const childActive = loc.pathname.includes(
                                                    `${it.path}/${child.path}`
                                                );
                                                return (
                                                    <Link
                                                        key={child.path}
                                                        to={`/dashboard/${it.path}/${child.path}`}
                                                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${childActive
                                                                ? "bg-blue-50 text-blue-700"
                                                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                                            }`}
                                                    >
                                                        {/* Render child icon if available */}
                                                        {child.icon ? (
                                                            <child.icon
                                                                className={`w-4 h-4 ${childActive ? "text-blue-600" : "text-gray-500"
                                                                    }`}
                                                            />
                                                        ) : (
                                                            <span className="w-4 h-4" />
                                                        )}
                                                        <span>{child.label}</span>
                                                    </Link>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    }

                    // Top-level menu item without children
                    return (
                        <Link
                            key={it.path}
                            to={`/dashboard/${it.path}`}
                            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${active
                                    ? "bg-blue-100 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                }`}
                        >
                            {it.icon && (
                                <it.icon
                                    className={`w-5 h-5 transition-colors ${active ? "text-blue-600" : "text-gray-500"
                                        } ${collapsed ? "mx-auto" : ""}`}
                                />
                            )}
                            {!collapsed && <span>{it.label}</span>}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;
