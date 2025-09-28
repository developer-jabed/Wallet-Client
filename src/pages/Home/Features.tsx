// Features.tsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Features() {
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

  const features = [
    {
      title: "User Dashboard",
      desc: "View your profile, transaction history, cash-in and cash-out overview, and manage your account easily from a clean and intuitive dashboard.",
      icon: "👤",
    },
    {
      title: "Agent Dashboard",
      desc: "Manage cash-in and cash-out transactions, monitor user activity, update profile, and track all agent-specific operations in real time.",
      icon: "🏢",
    },
    {
      title: "Admin Dashboard",
      desc: "Access full system analytics, manage users and agents, review transactions, and control system settings with advanced administrative tools.",
      icon: "⚙️",
    },
    {
      title: "Transaction Management",
      desc: "Easily perform and track cash-in and cash-out transactions. Secure, fast, and reliable transaction handling for all roles.",
      icon: "💰",
    },
    {
      title: "Reports & Analytics",
      desc: "Admins can view detailed reports on user activity, transactions, and overall system performance to make informed decisions.",
      icon: "📊",
    },
    {
      title: "Secure & Reliable",
      desc: "Built with security in mind, including role-based access control, secure authentication, and data protection across the platform.",
      icon: "🔒",
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-6 md:p-20 flex flex-col gap-16"
    >
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          Platform Features 🚀
        </h1>
        <p className="text-lg md:text-xl text-white/90 drop-shadow-md">
          Explore the advanced features of our dashboard and platform, designed to provide a seamless experience for users, agents, and admins.
        </p>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-900 bg-opacity-70 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col gap-4"
          >
            <div className="text-4xl">{feature.icon}</div>
            <h2 className="text-2xl font-bold drop-shadow-lg">{feature.title}</h2>
            <p className="text-white text-opacity-90 drop-shadow-md">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg">
          Experience the Full Power of Our Dashboard
        </h2>
        <p className="text-white/90 mb-6 drop-shadow-md">
          Manage, track, and analyze everything from one platform. Get started now and enjoy a professional, secure, and efficient dashboard experience.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="/register"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 ease-in-out active:scale-95"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="px-6 py-3 border border-white/30 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 ease-in-out active:scale-95"
          >
            Login
          </a>
        </div>
      </section>
    </div>
  );
}
