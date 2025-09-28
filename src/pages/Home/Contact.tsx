// Contact.tsx
import { useEffect, useRef } from "react";
import { FaFacebookF, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { gsap } from "gsap";

export default function Contact() {
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cardsRef.current) {
            gsap.from(cardsRef.current.children, {
                y: 50,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
            });
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6 md:p-20">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl p-10 flex flex-col gap-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-4 drop-shadow-md">
                    Contact Us 📬
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    We'd love to hear from you! Reach out via email, Facebook, or WhatsApp.
                </p>

                <div
                    ref={cardsRef}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
                >
                    {/* Email */}
                    <div className="flex flex-col items-center p-6 bg-indigo-50 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
                        <FaEnvelope className="text-indigo-600 text-4xl mb-3" />
                        <h3 className="font-semibold text-lg mb-1">Email</h3>
                        <a
                            href="mailto:jabed1780@gmail.com"
                            className="text-indigo-700 hover:underline"
                        >
                            jabed1780@gmail.com
                        </a>
                    </div>

                    {/* Facebook */}
                    <div className="flex flex-col items-center p-6 bg-blue-50 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
                        <FaFacebookF className="text-blue-600 text-4xl mb-3" />
                        <h3 className="font-semibold text-lg mb-1">Facebook</h3>
                        <a
                            href="https://facebook.com/jabed1780"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:underline"
                        >
                            facebook.com/jabed1780
                        </a>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex flex-col items-center p-6 bg-green-50 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
                        <FaWhatsapp className="text-green-600 text-4xl mb-3" />
                        <h3 className="font-semibold text-lg mb-1">WhatsApp</h3>
                        <a
                            href="https://wa.me/01893292965"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-700 hover:underline"
                        >
                            01893292965
                        </a>
                    </div>
                </div>

                <p className="text-center text-gray-500 mt-6">
                    We're available 24/7 to answer your questions and provide support.
                </p>
            </div>
        </div>
    );
}
