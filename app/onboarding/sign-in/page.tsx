"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate login delay
        setTimeout(() => {
            // Check if user exists
            const storedUser = localStorage.getItem("credzoUser");

            if (storedUser) {
                // In a real app, we'd hash check password. Here we just accept.
            } else {
                // Auto-create demo user if none exists
                const demoUser = { name: "Demo User", email: email, phone: "" };
                localStorage.setItem("credzoUser", JSON.stringify(demoUser));
            }

            setIsLoading(false);
            router.push("/");
        }, 1200);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-stone-100 via-stone-50 to-teal-50/30">
            {/* Decorative background elements same as signup for consistency */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl" />
            </div>

            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 overflow-hidden relative z-10">
                {/* Header */}
                <div className="bg-gradient-to-br from-stone-900 to-stone-800 p-8 text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl" />
                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold tracking-wider">
                            Welcome Back
                        </h1>
                        <p className="text-sm text-stone-400 mt-2">
                            Log in to access your dashboard
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="p-8">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-stone-600 mb-1.5">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ravi@example.com"
                                className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all bg-stone-50/50"
                                required
                            />
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-stone-600 mb-1.5">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all bg-stone-50/50"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-10 text-stone-400 hover:text-stone-600 focus:outline-none"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-teal-700 text-white font-bold text-lg py-3.5 rounded-xl hover:bg-teal-800 transition-all shadow-lg shadow-teal-700/20 mt-4 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? "Logging in..." : "Log In"}
                        </button>

                        <p className="text-center text-sm text-stone-500 mt-4">
                            New to Credzo?{" "}
                            <Link
                                href="/onboarding/sign-up"
                                className="text-teal-700 font-semibold hover:underline"
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
