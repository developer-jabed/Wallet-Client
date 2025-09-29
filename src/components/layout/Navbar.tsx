// src/components/Navbar.tsx
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, CreditCard } from "lucide-react";
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/features/auth/auth.api";
import { useAppDispatch } from "@/app/hooks";
import { role as roleConstants } from "@/constants/role";
import { toast } from "sonner";
import gsap from "gsap";

const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
    { name: "Dashboard", path: "/dashboard/user", role: roleConstants.user },
    { name: "Dashboard", path: "/dashboard/agent", role: roleConstants.agent },
    { name: "Dashboard", path: "/dashboard/admin", role: roleConstants.admin },
];

export function Navbar() {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const navRefs = useRef<HTMLAnchorElement[]>([]);
    const mobileNavRefs = useRef<HTMLAnchorElement[]>([]);
    const underlineRef = useRef<HTMLDivElement>(null);

    const { data: userData, isLoading: userLoading } = useUserInfoQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    const [logout] = useLogoutMutation();

    const handleLogout = async () => {
        await logout(undefined);
        dispatch(authApi.util.resetApiState());
        console.log(userData)
        toast.success(`${userData?.data?.name} logout successfully`);
        navigate("/");
    };

    const isLoggedIn = Boolean(userData?.data?.email);
    const userRoleNormalized = userData?.data?.role?.toUpperCase();
    const isRoleLoading = userLoading || !userRoleNormalized;

    const publicLinks = navItems.filter((item) => !item.role);
    const dashboardLinks = !isRoleLoading
        ? navItems.filter((item) => item.role === userRoleNormalized)
        : [];
    const filteredNavItems = [...publicLinks, ...dashboardLinks];

    const renderButton = () => {
        if (userLoading) return <span className="text-white px-3 py-2">Loading...</span>;
        return isLoggedIn ? (
            <Button
                onClick={handleLogout}
                className="mt-0 p-3 rounded-lg bg-white text-blue-600 hover:bg-gray-100"
            >
                Logout
            </Button>
        ) : (
            <Link
                to="/login"
                className="mt-0 p-3 rounded-lg bg-white text-blue-600 hover:bg-gray-100"
            >
                Get Started
            </Link>
        );
    };

    // Animate Desktop Menu
    useEffect(() => {
        if (!userLoading && navRefs.current.length) {
            gsap.from(navRefs.current, {
                y: -10,
                opacity: 1,
                stagger: 0.1,
                duration: 0.5,
                ease: "power3.out",
            });
        }
    }, [filteredNavItems, userLoading]);

    // Animate Mobile Menu on Open
    useEffect(() => {
        if (open && mobileNavRefs.current.length) {
            gsap.from(mobileNavRefs.current, {
                x: 50,
                opacity: 1,
                stagger: 0.1,
                duration: 0.5,
                ease: "power3.out",
            });
        }
    }, [open]);

    // Animate Gradient Underline
    useEffect(() => {
        if (underlineRef.current) {
            gsap.to(underlineRef.current, {
                x: 20,
                duration: 1.2,
                yoyo: true,
                repeat: -1,
                ease: "power1.inOut",
            });
            gsap.to(underlineRef.current, {
                scaleX: 1.3,
                duration: 0.8,
                yoyo: true,
                repeat: -1,
                ease: "power1.inOut",
            });
        }
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link
                    to="/"
                    className="flex flex-col items-center gap-1 text-2xl font-bold tracking-tight hover:opacity-90 transition"
                >
                    <div className="flex items-center gap-2">
                        <CreditCard className="w-8 h-8 text-white" />
                        <span>WalletPro</span>
                    </div>
                    {/* Gradient Animated Underline */}
                    <div className="h-1 w-12 rounded-full overflow-hidden">
                        <div
                            ref={underlineRef}
                            className="h-full w-full bg-gradient-to-r from-white via-blue-200 to-white transform scale-x-100 origin-center"
                        />
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-6 items-center">
                    {filteredNavItems.map((item, index) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            ref={(el) => {
                                if (el) navRefs.current[index] = el;
                            }}
                            className={({ isActive }) =>
                                cn(
                                    "px-3 py-2 rounded-md transition-colors hover:bg-white hover:text-blue-600",
                                    isActive
                                        ? "bg-white text-blue-600 font-semibold"
                                        : "text-white"
                                )
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                    {renderButton()}
                </div>

                {/* Mobile Menu */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6 text-white" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="right"
                        className="bg-gradient-to-b from-blue-600 to-indigo-600 text-white p-6"
                    >
                        <nav className="flex flex-col gap-4 mt-6">
                            {filteredNavItems.map((item, index) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    ref={(el) => {
                                        if (el) mobileNavRefs.current[index] = el;
                                    }}
                                    onClick={() => setOpen(false)}
                                    className={({ isActive }) =>
                                        cn(
                                            "px-3 py-2 rounded-md transition-colors hover:bg-white hover:text-blue-600",
                                            isActive
                                                ? "bg-white text-blue-600 font-semibold"
                                                : "text-white"
                                        )
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                            {renderButton()}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
