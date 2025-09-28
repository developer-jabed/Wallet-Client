import { RegisterForm } from "@/components/modules/Authentication/RegistrationForm";
import { Link } from "react-router";

export default function Register() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col">
            {/* Header / Logo */}
            <div className="flex justify-center md:justify-start p-6 md:p-10">
                <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
                    {/* You can place your logo here */}
                    MyApp
                </Link>
            </div>

            {/* Centered Form */}
            <div className="flex flex-1 items-center justify-center px-4 md:px-10">
                <div className="w-full max-w-md">
                    {/* Card */}
                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-6">
                            Create Account
                        </h1>
                        <p className="text-center text-gray-500 mb-8">
                            Join us today! Fill in your details below.
                        </p>

                        {/* Registration Form */}
                        <RegisterForm />

                        {/* Footer / Redirect to login */}
                        <div className="text-center mt-6 text-gray-500">
                            Already have an account?{" "}
                            <Link to="/auth/login" className="text-indigo-600 hover:underline font-medium">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Optional footer */}
            <div className="text-center text-gray-100 text-sm py-6">
                &copy; {new Date().getFullYear()} MyApp. All rights reserved.
            </div>
        </div>
    );
}
