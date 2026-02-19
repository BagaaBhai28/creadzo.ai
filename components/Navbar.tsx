"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavbarProps {
    showBack?: boolean;
}

export default function Navbar({ showBack = false }: NavbarProps) {
    const router = useRouter();
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const storedUser = localStorage.getItem("credzoUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Get initials
    const initials = user?.name
        ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
        : "UN";

    return (
        <nav className="bg-white/80 backdrop-blur-lg border-b border-stone-200/60 px-6 py-4 flex justify-between items-center sticky top-0 z-20">
            <div className="flex items-center gap-4">
                {showBack && (
                    <button
                        onClick={() => router.push("/")}
                        className="text-stone-400 hover:text-teal-700 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                            />
                        </svg>
                    </button>
                )}
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="bg-teal-700 text-white p-1.5 rounded-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                            />
                        </svg>
                    </div>
                    <h1 className="text-xl font-bold text-stone-800 tracking-wide">
                        CREDZO<span className="text-stone-400 font-medium">.ai</span>
                    </h1>
                </Link>
            </div>

            {mounted && (
                user ? (
                    <Link href="/profile" className="flex items-center gap-3 hover:bg-stone-50 p-2 rounded-xl transition cursor-pointer">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-semibold text-stone-700">{user.name}</p>
                            <p className="text-xs text-stone-400">View Profile</p>
                        </div>
                        <div className="bg-teal-50 text-teal-700 font-bold w-10 h-10 rounded-full flex items-center justify-center border-2 border-teal-100">
                            {initials}
                        </div>
                    </Link>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link
                            href="/onboarding/sign-in"
                            className="text-sm font-semibold text-stone-600 hover:text-teal-700 transition"
                        >
                            Log In
                        </Link>
                        <Link
                            href="/onboarding/sign-up"
                            className="bg-teal-700 hover:bg-teal-800 text-white text-sm font-bold px-4 py-2 rounded-lg transition shadow-lg shadow-teal-700/20"
                        >
                            Join Now
                        </Link>
                    </div>
                )
            )}
        </nav>
    );
}
