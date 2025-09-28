// Faq.tsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "How do I create an account?",
        answer:
            "You can create an account by clicking on the Register button on the top right and filling out the registration form.",
    },
    {
        question: "Is my data secure?",
        answer:
            "Yes! We use advanced encryption and security measures to protect your personal and payment data.",
    },
    {
        question: "Can I upgrade my plan later?",
        answer:
            "Absolutely! You can upgrade or change your plan anytime from your dashboard.",
    },
    {
        question: "How do I contact support?",
        answer:
            "You can reach out via email, Facebook, or WhatsApp. Visit the Contact page for full details.",
    },
    {
        question: "What payment methods are accepted?",
        answer:
            "We accept all major credit cards, debit cards, and online wallets.",
    },
];

export default function Faq() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        if (containerRef.current) {
            gsap.from(containerRef.current.children, {
                y: 50,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
            });
        }
    }, []);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6 md:p-20">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-10 flex flex-col gap-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center drop-shadow-md">
                    Frequently Asked Questions ❓
                </h1>
                <p className="text-center text-gray-600">
                    Find answers to the most common questions about our platform.
                </p>

                <div ref={containerRef} className="flex flex-col gap-4 mt-6">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className="bg-indigo-50 rounded-xl shadow-md p-5 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                            onClick={() => toggle(index)}
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-lg">{item.question}</h3>
                                {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                            </div>
                            {openIndex === index && (
                                <p className="mt-3 text-gray-700">{item.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
