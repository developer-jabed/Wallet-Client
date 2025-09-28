// Home.tsx
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function Home() {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 overflow-hidden flex flex-col items-center justify-center px-4 md:px-10 text-white">

            {/* Background animated circles */}
            <div className="absolute top-0 left-0 w-full h-full">
                <motion.div
                    className="absolute w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 top-10 left-10"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 bottom-0 right-10"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
            </div>

            {/* Hero content */}
            <motion.div
                className="relative z-10 flex flex-col items-center text-center max-w-3xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <motion.h1
                    className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    Welcome to <span className="text-yellow-300">Wallet Pro</span> 🚀
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl mb-8 text-gray-100"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    Your ultimate solution for modern web experiences.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    className="flex flex-col md:flex-row gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    <Link
                        to="/login"
                        className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:from-yellow-500 hover:to-orange-600 active:scale-95 focus:outline-none focus:ring-4 focus:ring-yellow-300"
                    >
                        Get Started
                    </Link>
                    <Link
                        to="/about"
                        className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-gray-100 active:scale-95 focus:outline-none focus:ring-4 focus:ring-white"
                    >
                        Learn More
                    </Link>
                </motion.div>
            </motion.div>

            {/* Optional animated underline or divider */}
            <motion.div
                className="absolute bottom-10 w-24 h-1 bg-yellow-300 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
            />
        </div>
    );
}
