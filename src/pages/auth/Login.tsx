import { LoginForm } from "@/components/modules/Authentication/LoginForm";
import { Link } from "react-router";
import { motion } from "framer-motion";

export default function Login() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-6 md:p-10">
            <motion.div
                className="w-full  flex flex-col md:flex-row  rounded-3xl shadow-2xl overflow-hidden"
                initial={{ opacity: 1, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Left Side - Welcome Section */}
                <div className="hidden md:flex flex-col justify-center items-start bg-indigo-600 text-white p-10 w-1/2">
                    <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
                    <p className="text-lg text-indigo-100 mb-6">
                        Enter your details to access your account and continue managing your transactions seamlessly.
                    </p>
                    <Link
                        to="/auth/register"
                        className="mt-auto bg-white text-indigo-600 font-semibold py-2 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        Create Account
                    </Link>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full md:w-1/2 p-8 md:p-10 flex items-center justify-center bg-white">
                    <LoginForm className="w-full" />
                </div>
            </motion.div>
        </div>
    );
}
