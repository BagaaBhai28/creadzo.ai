"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

interface UserProfile {
    name: string;
    email: string;
    phone: string;
    dob: string;
    currentAddress: string;
    permanentAddress: string;
    pan: string;
    aadhaar: string;
    employmentType: string;
    monthlyIncome: number;
}

export default function ProfilePage() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [stats, setStats] = useState<{ trustScore: number; creditLimit: number } | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<UserProfile | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Load User
        const storedUser = localStorage.getItem("credzoUser");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser(parsed);
            setFormData(parsed);
        } else {
            router.push("/onboarding/sign-in");
        }

        // Load Stats
        const storedAnalysis = localStorage.getItem("credzoAnalysis");
        if (storedAnalysis) {
            try {
                const parsed = JSON.parse(storedAnalysis);
                setStats({
                    trustScore: parsed.trustScore || 0,
                    creditLimit: parsed.creditLimit || 0
                });
            } catch { /* ignore */ }
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("credzoUser");
        router.push("/onboarding/sign-in");
    };

    const handleSave = () => {
        if (!formData) return;
        localStorage.setItem("credzoUser", JSON.stringify(formData));
        setUser(formData);
        setIsEditing(false);
    };

    if (!user || !formData) return null;

    return (
        <div className="bg-stone-50 min-h-screen pb-12 font-sans">
            <Navbar />

            <main className="max-w-6xl mx-auto p-6 mt-8">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-stone-800 mb-2">My Profile</h1>
                        <p className="text-stone-500">Manage your verified identity and financial data</p>
                    </div>
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium px-5 py-2.5 rounded-xl transition"
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <div className="flex gap-3">
                            <button
                                onClick={() => { setIsEditing(false); setFormData(user); }}
                                className="bg-stone-100 hover:bg-stone-200 text-stone-600 font-medium px-5 py-2.5 rounded-xl transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-6 py-2.5 rounded-xl transition shadow-lg shadow-teal-700/20"
                            >
                                Save Changes
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left & Middle Column: Full Details */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* 1. Personal Details */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200">
                            <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-teal-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                                Personal Details
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-stone-400 uppercase tracking-wide mb-1.5">Full Name</label>
                                    <p className="text-lg font-medium text-stone-800 border-b border-transparent py-1">{user.name}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-400 uppercase tracking-wide mb-1.5">Date of Birth</label>
                                    <p className="text-lg font-medium text-stone-800 border-b border-transparent py-1">{user.dob || "--"}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-400 uppercase tracking-wide mb-1.5">Email</label>
                                    {isEditing ? (
                                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full text-lg font-medium text-stone-800 border-b border-stone-300 focus:border-teal-500 outline-none py-1 bg-transparent" />
                                    ) : (
                                        <p className="text-lg font-medium text-stone-800 border-b border-transparent py-1">{user.email}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-400 uppercase tracking-wide mb-1.5">Phone</label>
                                    {isEditing ? (
                                        <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full text-lg font-medium text-stone-800 border-b border-stone-300 focus:border-teal-500 outline-none py-1 bg-transparent" />
                                    ) : (
                                        <p className="text-lg font-medium text-stone-800 border-b border-transparent py-1">{user.phone}</p>
                                    )}
                                </div>
                            </div>
                            <div className="mt-6">
                                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wide mb-1.5">Current Address</label>
                                {isEditing ? (
                                    <textarea rows={2} value={formData.currentAddress} onChange={(e) => setFormData({ ...formData, currentAddress: e.target.value })} className="w-full text-lg font-medium text-stone-800 border-b border-stone-300 focus:border-teal-500 outline-none py-1 bg-transparent resize-none" />
                                ) : (
                                    <p className="text-lg font-medium text-stone-800 border-b border-transparent py-1">{user.currentAddress || "--"}</p>
                                )}
                            </div>
                        </div>

                        {/* 2. Identity Verification (Read Only) */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200">
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-teal-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                    Identity Verification
                                </h2>
                                <span className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full border border-teal-100 flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                    </svg>
                                    VERIFIED
                                </span>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 opacity-80">
                                <div>
                                    <label className="block text-xs font-bold text-stone-400 uppercase tracking-wide mb-1.5">PAN Number</label>
                                    <div className="flex items-center gap-2">
                                        <p className="text-lg font-mono font-medium text-stone-800">{user.pan || "Not provided"}</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-stone-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-400 uppercase tracking-wide mb-1.5">Aadhaar Number</label>
                                    <div className="flex items-center gap-2">
                                        <p className="text-lg font-mono font-medium text-stone-800">
                                            {user.aadhaar ? `XXXX XXXX ${user.aadhaar.slice(-4)}` : "Not provided"}
                                        </p>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-stone-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Financial Profile */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200">
                            <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-teal-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Financial Profile
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-stone-400 uppercase tracking-wide mb-1.5">Employment Type</label>
                                    {isEditing ? (
                                        <select
                                            value={formData.employmentType}
                                            onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                                            className="w-full text-lg font-medium text-stone-800 border-b border-stone-300 focus:border-teal-500 outline-none py-1 bg-transparent appearance-none"
                                        >
                                            <option value="Salaried">Salaried</option>
                                            <option value="Self-Employed">Self-Employed / Business</option>
                                            <option value="Gig Worker">Gig Economy</option>
                                            <option value="Student">Student</option>
                                            <option value="Homemaker">Homemaker</option>
                                        </select>
                                    ) : (
                                        <div className="inline-flex bg-stone-100 text-stone-700 px-3 py-1 rounded-lg text-sm font-medium">
                                            {user.employmentType || "Not provided"}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-400 uppercase tracking-wide mb-1.5">Monthly Income</label>
                                    {isEditing ? (
                                        <div className="flex items-center">
                                            <span className="text-lg font-medium text-stone-500 mr-1">₹</span>
                                            <input
                                                type="number"
                                                value={formData.monthlyIncome}
                                                onChange={(e) => setFormData({ ...formData, monthlyIncome: Number(e.target.value) })}
                                                className="w-full text-lg font-medium text-stone-800 border-b border-stone-300 focus:border-teal-500 outline-none py-1 bg-transparent"
                                            />
                                        </div>
                                    ) : (
                                        <p className="text-lg font-medium text-stone-800 border-b border-transparent py-1">
                                            {user.monthlyIncome ? `₹${user.monthlyIncome.toLocaleString()}` : "--"}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Financial Snapshot (Sticky) */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden sticky top-28">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />

                            <h3 className="text-stone-400 text-xs font-bold uppercase tracking-wide mb-6">Financial Snapshot</h3>

                            <div className="mb-8">
                                <p className="text-sm text-stone-400 mb-2">Trust Score</p>
                                {stats ? (
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-bold text-teal-400">{stats.trustScore}</span>
                                        <span className="text-stone-500 font-medium">/900</span>
                                    </div>
                                ) : (
                                    <p className="text-stone-500 italic">Not calculated yet</p>
                                )}
                            </div>

                            <div className="mb-8">
                                <p className="text-sm text-stone-400 mb-2">Credit Limit</p>
                                {stats ? (
                                    <p className="text-3xl font-bold text-white tracking-tight">₹{stats.creditLimit.toLocaleString()}</p>
                                ) : (
                                    <p className="text-stone-500 italic">--</p>
                                )}
                            </div>

                            {!stats && (
                                <Link
                                    href="/credit-analysis"
                                    className="block w-full bg-teal-600 hover:bg-teal-500 text-white text-center py-3 rounded-xl font-bold transition shadow-lg shadow-teal-900/50"
                                >
                                    Get Analyzed
                                </Link>
                            )}
                        </div>

                        <button
                            onClick={handleLogout}
                            className="w-full py-4 border border-stone-200 text-stone-500 font-medium rounded-2xl hover:bg-stone-100 hover:text-stone-800 transition"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
