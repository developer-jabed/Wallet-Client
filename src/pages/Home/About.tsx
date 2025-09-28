// About.tsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function About() {
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

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 text-white p-6 md:p-20 flex flex-col gap-16"
    >
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          About MyBrand 🚀
        </h1>
        <p className="text-lg md:text-xl text-white/90 drop-shadow-md">
          MyBrand is a cutting-edge platform designed to simplify your life.
          With modern features and a seamless interface, we provide the best
          experience for users, agents, and admins alike.
        </p>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          { title: "User Friendly", desc: "Simple and intuitive interface for everyone." },
          { title: "Secure", desc: "Top-notch security for all your data and transactions." },
          { title: "Fast & Reliable", desc: "Lightning-fast operations with 99.9% uptime." },
          { title: "24/7 Support", desc: "Our team is always here to help you anytime." },
          { title: "Modern Design", desc: "Sleek UI with professional aesthetics." },
          { title: "Cross-Platform", desc: "Access from any device anytime." },
        ].map((feature, i) => (
          <div
            key={i}
            className="bg-gray-900 bg-opacity-70 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col gap-4"
          >
            <h2 className="text-2xl font-bold drop-shadow-lg">{feature.title}</h2>
            <p className="text-white text-opacity-90 drop-shadow-md">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg">
          Join MyBrand Today!
        </h2>
        <p className="text-white/90 mb-6 drop-shadow-md">
          Experience the future of seamless transactions and management. Get started now and enjoy our professional, modern, and secure platform.
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
