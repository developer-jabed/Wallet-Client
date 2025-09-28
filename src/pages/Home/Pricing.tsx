// Pricing.tsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Pricing() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (sectionRef.current) {
            gsap.from(sectionRef.current.children, {
                y: 50,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
            });
        }
    }, []);

    const plans = [
        {
            name: "Basic",
            price: "$9/mo",
            features: [
                "Access to user dashboard",
                "Basic transaction management",
                "Email support",
            ],
            bg: "bg-indigo-600",
        },
        {
            name: "Pro",
            price: "$29/mo",
            features: [
                "Full user & agent dashboard access",
                "Advanced transaction management",
                "Priority email & chat support",
                "Reports & analytics",
            ],
            bg: "bg-purple-600",
        },
        {
            name: "Enterprise",
            price: "$99/mo",
            features: [
                "Admin dashboard full access",
                "Custom integrations",
                "Dedicated account manager",
                "Advanced security & analytics",
            ],
            bg: "bg-pink-600",
        },
    ];

    return (
        <div
            ref={sectionRef}
            className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-6 md:p-20 flex flex-col gap-16"
        >
            <section className="text-center max-w-3xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
                    Pricing Plans 💳
                </h1>
                <p className="text-lg md:text-xl text-white/90 drop-shadow-md">
                    Choose a plan that suits your needs. Transparent pricing and full dashboard features included in all plans.
                </p>
            </section>

            {/* Pricing Cards */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {plans.map((plan, idx) => (
                    <div
                        key={idx}
                        className={`rounded-3xl p-8 shadow-2xl flex flex-col justify-between transition-transform duration-300 hover:scale-105 ${plan.bg}`}
                    >
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">{plan.name}</h2>
                            <p className="text-2xl font-semibold drop-shadow-md">{plan.price}</p>
                        </div>
                        <ul className="flex-1 mb-6 space-y-3">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-white/90">
                                    <span>✔️</span>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <a
                            href="/register"
                            className="px-6 py-3 bg-white text-black font-semibold rounded-xl shadow-lg text-center hover:bg-white/90 transition-all duration-300"
                        >
                            Get Started
                        </a>
                    </div>
                ))}
            </section>

            {/* Call to Action */}
            <section className="text-center max-w-2xl mx-auto mt-12">
                <p className="text-white/90 mb-6 drop-shadow-md">
                    All plans come with secure authentication, role-based access, and full platform features.
                </p>
                <a
                    href="/register"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 ease-in-out active:scale-95"
                >
                    Choose Your Plan
                </a>
            </section>
        </div>
    );
}
