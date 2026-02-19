"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<"login" | "personal" | "identity" | "income">("login");
    const [showPassword, setShowPassword] = useState(false);
    const [sameAddress, setSameAddress] = useState(false);
    const [currentAddress, setCurrentAddress] = useState("");
    const [permanentAddress, setPermanentAddress] = useState("");

    const handleSameAddress = (checked: boolean) => {
        setSameAddress(checked);
        if (checked) {
            setPermanentAddress(currentAddress);
        } else {
            setPermanentAddress("");
        }
    };

    const steps = ["Account", "Personal", "Identity", "Income"];
    const stepIndex = { login: 0, personal: 1, identity: 2, income: 3 };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-stone-100 via-stone-50 to-teal-50/30">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl" />
            </div>

            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 overflow-hidden relative z-10">
                {/* Header */}
                <div className="bg-gradient-to-br from-stone-900 to-stone-800 p-6 text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl" />
                    <div className="relative z-10">
                        <h1 className="text-2xl font-bold tracking-wider">
                            CREDZO<span className="text-teal-400">.ai</span>
                        </h1>
                        <p className="text-sm text-stone-400 mt-1">Unlock your financial identity</p>
                    </div>
                    <span className="absolute top-4 right-4 text-xs bg-teal-600/80 px-2 py-1 rounded font-medium z-10">
                        New Profile
                    </span>
                </div>

                {/* Step Indicator */}
                <div className="px-8 pt-6">
                    <div className="flex items-center justify-between mb-2">
                        {steps.map((step, i) => (
                            <div key={step} className="flex items-center gap-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i <= stepIndex[currentStep]
                                        ? "bg-teal-700 text-white"
                                        : "bg-stone-100 text-stone-400"
                                    }`}>
                                    {i + 1}
                                </div>
                                {i < steps.length - 1 && (
                                    <div className={`h-0.5 w-8 sm:w-12 transition-all ${i < stepIndex[currentStep] ? "bg-teal-700" : "bg-stone-200"
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-stone-400 font-medium mb-2">
                        {steps.map((step) => (
                            <span key={step}>{step}</span>
                        ))}
                    </div>
                </div>

                <div className="p-8 pt-4">
                    {/* Step 1: Create Account */}
                    {currentStep === "login" && (
                        <div>
                            <h2 className="text-xl font-semibold text-stone-800 mb-6">Create Account</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-stone-600 mb-1.5">Email / Phone</label>
                                    <input type="text" placeholder="Enter your email or phone" className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none bg-stone-50/50" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-600 mb-1.5">Password</label>
                                    <div className="relative">
                                        <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none pr-10 bg-stone-50/50" />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-teal-600 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                {showPassword ? (
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                ) : (
                                                    <>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </>
                                                )}
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <button onClick={() => setCurrentStep("personal")} className="w-full bg-teal-700 text-white font-semibold py-3 rounded-xl hover:bg-teal-800 transition mt-4 shadow-md shadow-teal-700/15">
                                    Save & Continue
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Personal Details */}
                    {currentStep === "personal" && (
                        <div>
                            <h2 className="text-xl font-semibold text-stone-800 mb-6">Personal Details</h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-stone-600 mb-1">First Name</label>
                                        <input type="text" placeholder="First" className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none bg-stone-50/50" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-stone-600 mb-1">Middle</label>
                                        <input type="text" placeholder="(Optional)" className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none bg-stone-50/50" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-stone-600 mb-1">Last Name</label>
                                        <input type="text" placeholder="Last" className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none bg-stone-50/50" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-600 mb-1">Date of Birth</label>
                                    <input type="date" className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none bg-stone-50/50" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-600 mb-1">Current Address</label>
                                    <textarea rows={2} value={currentAddress} onChange={(e) => setCurrentAddress(e.target.value)} className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none bg-stone-50/50" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="sameAddress" checked={sameAddress} onChange={(e) => handleSameAddress(e.target.checked)} className="w-4 h-4 accent-teal-600 rounded" />
                                    <label htmlFor="sameAddress" className="text-sm text-stone-600">Permanent Address is same as Current</label>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-600 mb-1">Permanent Address</label>
                                    <textarea rows={2} value={permanentAddress} onChange={(e) => setPermanentAddress(e.target.value)} readOnly={sameAddress} className={`w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none ${sameAddress ? "bg-stone-100" : "bg-stone-50/50"}`} />
                                </div>
                                <div className="flex gap-3 mt-6">
                                    <button onClick={() => setCurrentStep("login")} className="w-1/3 bg-stone-100 text-stone-600 font-semibold py-3 rounded-xl hover:bg-stone-200 transition">Back</button>
                                    <button onClick={() => setCurrentStep("identity")} className="w-2/3 bg-teal-700 text-white font-semibold py-3 rounded-xl hover:bg-teal-800 transition shadow-md shadow-teal-700/15">Next Step</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Identity Verification */}
                    {currentStep === "identity" && (
                        <div>
                            <h2 className="text-xl font-semibold text-stone-800 mb-6">Identity Verification</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-stone-600 mb-1">PAN Number</label>
                                    <input type="text" placeholder="ABCDE1234F" className="w-full px-4 py-2 border border-stone-200 rounded-lg uppercase focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none bg-stone-50/50" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-600 mb-1">Aadhaar Number</label>
                                    <input type="text" placeholder="XXXX XXXX XXXX" className="w-full px-4 py-2 border border-stone-200 rounded-lg tracking-widest focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none bg-stone-50/50" />
                                </div>
                                <div className="bg-amber-50 border border-amber-200/60 p-3 rounded-xl flex gap-3 mt-4">
                                    <span>ℹ️</span>
                                    <p className="text-xs text-amber-800">For this demo, strict government API verification is bypassed. Your data is stored locally and securely.</p>
                                </div>
                                <div className="flex gap-3 mt-6">
                                    <button onClick={() => setCurrentStep("personal")} className="w-1/3 bg-stone-100 text-stone-600 font-semibold py-3 rounded-xl hover:bg-stone-200 transition">Back</button>
                                    <button onClick={() => setCurrentStep("income")} className="w-2/3 bg-teal-700 text-white font-semibold py-3 rounded-xl hover:bg-teal-800 transition shadow-md shadow-teal-700/15">Next Step</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Income Details */}
                    {currentStep === "income" && (
                        <div>
                            <h2 className="text-xl font-semibold text-stone-800 mb-6">Income Details</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-stone-600 mb-1">Job Type</label>
                                    <select className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none bg-white">
                                        <option>Select Job Type...</option>
                                        <option>Gig Worker (Delivery, Ride-share, etc.)</option>
                                        <option>Self-Employed / Small Business</option>
                                        <option>Salaried (Unorganized Sector)</option>
                                        <option>Student / First-time Borrower</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-600 mb-1">Monthly Income (Estimated)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-2.5 text-stone-500 font-semibold">₹</span>
                                        <input type="number" placeholder="15000" className="w-full pl-8 pr-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none bg-stone-50/50" />
                                    </div>
                                </div>
                                <div className="flex gap-3 mt-6">
                                    <button onClick={() => setCurrentStep("identity")} className="w-1/3 bg-stone-100 text-stone-600 font-semibold py-3 rounded-xl hover:bg-stone-200 transition">Back</button>
                                    <button onClick={() => router.push("/")} className="w-2/3 bg-teal-600 text-white font-semibold py-3 rounded-xl hover:bg-teal-700 transition shadow-lg shadow-teal-600/20">
                                        Submit to Credzo Engine
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
