import { useEffect, useRef, useState } from "react";
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
import { useLoginMutation } from "@/features/auth/auth.api";
import { useAppDispatch } from "@/app/hooks";
import { setCredentials } from "@/features/auth/authSlice";
import { cn } from "@/lib/utils";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { gsap } from "gsap";
import { FiEye, FiEyeOff } from "react-icons/fi";

export function LoginForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const formRef = useRef<HTMLDivElement>(null);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm({
        defaultValues: {
            email: "jabed1780@gmail.com",
            password: "jabed1780",
        },
    });

    const [login, { isLoading }] = useLoginMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const res = await login(data).unwrap();
            if (res.success && res.data?.user) {
                dispatch(
                    setCredentials({
                        role: res.data.user.role.toLowerCase() as "user" | "agent" | "admin",
                        user: { id: res.data.user.id, email: res.data.user.email },
                    })
                );
                toast.success(`Welcome back, ${res.data.user.name}!`);
                navigate("/");
            } else {
                toast.error(res.message || "Login failed");
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Login error:", err);
            toast.error(err?.data?.message || err?.error || "Login failed");
        }
    };

    // GSAP animation
    useEffect(() => {
        if (formRef.current) {
            gsap.from(formRef.current.children, {
                y: 50,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
            });
        }
    }, []);

    return (
        <div
            ref={formRef}
            className={cn(
                "w-full min-h-screen flex items-center justify-center  p-6",
                className
            )}
            {...props}
        >
            {/* Card */}
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Welcome Back</h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="john@example.com"
                                            {...field}
                                            className="border-indigo-300 focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
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
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="********"
                                                {...field}
                                                className="border-indigo-300 focus:ring-2 focus:ring-indigo-500 transition-all duration-300 pr-10"
                                            />
                                        </FormControl>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                        >
                                            {showPassword ? <FiEyeOff /> : <FiEye />}
                                        </button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300"
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </Form>

                <div className="text-center mt-6 text-gray-500">
                    Don't have an account?{" "}
                    <Link to="/auth/register" className="text-indigo-600 hover:underline font-medium">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}
