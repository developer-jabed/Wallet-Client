
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  Shield,
  DollarSign,
  Users,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import gsap from "gsap";

const footerFeatures = [
  { icon: CreditCard, title: "Add/Withdraw", description: "Deposit & withdraw money via agents." },
  { icon: Shield, title: "Secure", description: "Encrypted & safe transactions." },
  { icon: DollarSign, title: "Send Money", description: "Instant transfer via phone/email." },
  { icon: Users, title: "User Friendly", description: "Manage wallet & transactions easily." },
  { icon: CreditCard, title: "Analytics", description: "Track all your transactions in real-time." },
  { icon: Shield, title: "Support 24/7", description: "Our team is here to help anytime." },
];

const importantLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Features", path: "/features" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact", path: "/contact" },
  { name: "FAQ", path: "/faq" },
];

export function Footer() {
  const featureRefs = useRef<HTMLDivElement[]>([]);
  const socialRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (featureRefs.current.length) {
      gsap.from(featureRefs.current, {
        y: 30,
        opacity: 1,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
      });
    }

    if (socialRefs.current.length) {
      gsap.from(socialRefs.current, {
        y: 20,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <footer className="relative bg-gradient-to-r from-blue-700 to-indigo-700 text-white overflow-hidden">
 
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>
      <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>

      <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row justify-between gap-12 relative z-10">
        <div className="flex flex-col gap-4 lg:w-1/3">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:opacity-90 transition">
            <CreditCard className="w-7 h-7 text-white" />
            <span>WalletPro</span>
          </Link>
          <p className="text-gray-200 text-sm">
            WalletPro is a secure, fast, and modern digital wallet helping you manage money anytime, anywhere.
          </p>

          {/* Social Links */}
          <div className="flex gap-4 mt-2">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
              <div
                key={idx}
                ref={(el) => { if (el) socialRefs.current[idx] = el; }}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
              >
                <Icon className="w-4 h-4 text-white hover:scale-110 transition-transform" />
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="mt-4 text-gray-200 text-sm flex flex-col gap-1">
            <span>Email: support@walletpro.com</span>
            <span>Phone: +880 1234 567890</span>
            <span>Address: Dhaka, Bangladesh</span>
          </div>
        </div>

        {/* Footer Features */}
        <div className="flex flex-wrap gap-4 lg:w-2/3">
          {footerFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                ref={(el) => { if (el) featureRefs.current[idx] = el; }}
                className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl hover:bg-white/20 hover:scale-105 transition transform cursor-pointer flex-1 min-w-[150px]"
              >
                <Icon className="w-6 h-6 text-white" />
                <div className="flex flex-col">
                  <span className="font-medium text-white text-sm">{feature.title}</span>
                  <span className="text-white/80 text-xs">{feature.description}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Important Links */}
      <div className="border-t border-white/20 py-4 text-center text-gray-200 text-sm relative z-10 flex flex-wrap justify-center gap-4">
        {importantLinks.map((link, idx) => (
          <Link
            key={idx}
            to={link.path}
            className="hover:text-white/80 transition text-sm"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Copyright */}
      <div className="border-t border-white/20 py-2 text-center text-gray-200 text-sm relative z-10">
        &copy; {new Date().getFullYear()} WalletPro. All rights reserved.
      </div>
    </footer>
  );
}
