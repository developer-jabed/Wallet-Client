import { Link } from "react-router-dom"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Rocket, Shield, CreditCard, Users } from "lucide-react"

export function FeaturesMenu() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                    <NavigationMenuContent className="absolute top-full left-0 mt-2 w-[95vw] max-w-[500px] bg-background shadow-lg rounded-md border p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <NavigationMenuLink asChild>
                                <Link
                                    to="/features/performance"
                                    className="flex gap-3 items-start hover:bg-accent p-3 rounded-md transition"
                                >
                                    <Rocket className="w-6 h-6 text-secondary" />
                                    <div>
                                        <p className="font-medium">Fast Performance</p>
                                        <p className="text-sm text-muted-foreground">
                                            Blazing fast transactions & UX.
                                        </p>
                                    </div>
                                </Link>
                            </NavigationMenuLink>

                            <NavigationMenuLink asChild>
                                <Link
                                    to="/features/security"
                                    className="flex gap-3 items-start hover:bg-accent p-3 rounded-md transition"
                                >
                                    <Shield className="w-6 h-6 text-secondary" />
                                    <div>
                                        <p className="font-medium">Secure</p>
                                        <p className="text-sm text-muted-foreground">
                                            End-to-end encryption & protection.
                                        </p>
                                    </div>
                                </Link>
                            </NavigationMenuLink>

                            <NavigationMenuLink asChild>
                                <Link
                                    to="/features/payments"
                                    className="flex gap-3 items-start hover:bg-accent p-3 rounded-md transition"
                                >
                                    <CreditCard className="w-6 h-6 text-secondary" />
                                    <div>
                                        <p className="font-medium">Flexible Payments</p>
                                        <p className="text-sm text-muted-foreground">
                                            Multiple options for transactions.
                                        </p>
                                    </div>
                                </Link>
                            </NavigationMenuLink>

                            <NavigationMenuLink asChild>
                                <Link
                                    to="/features/usability"
                                    className="flex gap-3 items-start hover:bg-accent p-3 rounded-md transition"
                                >
                                    <Users className="w-6 h-6 text-secondary" />
                                    <div>
                                        <p className="font-medium">User Friendly</p>
                                        <p className="text-sm text-muted-foreground">
                                            Simple, modern, and intuitive.
                                        </p>
                                    </div>
                                </Link>
                            </NavigationMenuLink>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
