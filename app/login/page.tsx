"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login delay
        setTimeout(() => {
            setIsLoading(false);
            router.push("/");
        }, 800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-stone-100 via-stone-50 to-teal-50/30">
            {/* Decorative background elements */}
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
                        <div className="inline-flex items-center gap-2 mb-3">
                            <div className="bg-teal-600 p-1.5 rounded-lg">
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
                        </div>
                        <h1 className="text-3xl font-bold tracking-wider">
                            CREDZO<span className="text-teal-400 text-xl">.ai</span>
                        </h1>
                        <p className="text-sm text-stone-400 mt-2">
                            Unlock your financial identity
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="p-8">
                    <h2 className="text-xl font-semibold text-stone-800 mb-6 text-center">
                        Welcome Back
                    </h2>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-stone-600 mb-1.5">
                                Email / Phone
                            </label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="xyz@example.com"
                                className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all bg-stone-50/50"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-stone-600 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none pr-12 transition-all bg-stone-50/50"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-stone-400 hover:text-teal-600 focus:outline-none transition-colors"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        {showPassword ? (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                            />
                                        ) : (
                                            <>
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </>
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-teal-700 text-white font-bold text-lg py-3.5 rounded-xl hover:bg-teal-800 transition-all shadow-lg shadow-teal-700/20 mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Signing in...
                                </>
                            ) : (
                                "Login & Continue"
                            )}
                        </button>

                        <p className="text-center text-sm text-stone-500 mt-4">
                            New to Credzo?{" "}
                            <Link
                                href="/onboarding"
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
