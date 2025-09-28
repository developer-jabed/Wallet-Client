import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRegisterMutation } from "@/features/auth/auth.api";
import Password from "@/components/ui/Password";

// ✅ Schema with BD phone validation
const registerSchema = z
    .object({
        name: z
            .string()
            .min(3, { message: "Name must be at least 3 characters" })
            .max(50, { message: "Name must not exceed 50 characters" }),
        email: z.string().email({ message: "Please enter a valid email address" }),
        phone: z.string().regex(/^01[3-9]\d{8}$/, {
            message: "Enter a valid Bangladeshi phone number (e.g., 017xxxxxxxx)",
        }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" }),
        confirmPassword: z
            .string()
            .min(8, { message: "Confirm Password must be at least 8 characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export function RegisterForm({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    const [register] = useRegisterMutation();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onTouched",
        shouldFocusError: true,
    });

    const onSubmit = async (data: z.infer<typeof registerSchema>) => {
        const userInfo = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password,
        };

        try {
            await register(userInfo).unwrap();
            toast.success("User created successfully");
            navigate("/");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const errorMessage =

                error?.data?.message || "Registration failed";
            toast.error(errorMessage);
            console.error(error);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Register your account</h1>
                <p className="text-sm text-muted-foreground">
                    Enter your details to create an account
                </p>
            </div>

            <div className="grid gap-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John Doe"
                                            {...field}
                                            className={cn(
                                                form.formState.errors.name &&
                                                "border-red-500 focus-visible:ring-red-500"
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="john.doe@company.com"
                                            type="email"
                                            {...field}
                                            className={cn(
                                                form.formState.errors.email &&
                                                "border-red-500 focus-visible:ring-red-500"
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Phone */}
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="017xxxxxxxx"
                                            type="tel"
                                            {...field}
                                            className={cn(
                                                form.formState.errors.phone &&
                                                "border-red-500 focus-visible:ring-red-500"
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Password
                                            {...field}
                                            className={cn(
                                                form.formState.errors.password &&
                                                "border-red-500 focus-visible:ring-red-500"
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Confirm Password */}
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Password
                                            {...field}
                                            className={cn(
                                                form.formState.errors.confirmPassword &&
                                                "border-red-500 focus-visible:ring-red-500"
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </form>
                </Form>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>

                <Button type="button" variant="outline" className="w-full cursor-pointer">
                    Login with Google
                </Button>
            </div>

            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                    Login
                </Link>
            </div>
        </div>
    );
}
