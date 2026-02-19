"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        // Step 1: Personal
        name: "",
        email: "",
        phone: "",
        dob: "",
        currentAddress: "",
        permanentAddress: "",
        sameAddress: false,
        password: "",

        // Step 2: Identity
        pan: "",
        aadhaar: "",

        // Step 3: Financial
        employmentType: "Salaried",
        monthlyIncome: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({
                ...prev,
                [name]: checked,
                permanentAddress: checked ? prev.currentAddress : prev.permanentAddress
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
                permanentAddress: (name === 'currentAddress' && prev.sameAddress) ? value : prev.permanentAddress
            }));
        }
    };

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(prev => prev + 1);
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API delay & Verification
        setTimeout(() => {
            // Save user to localStorage
            const user = {
                ...formData,
                monthlyIncome: Number(formData.monthlyIncome), // Ensure number
                joinedDate: new Date().toISOString()
            };

            localStorage.setItem("credzoUser", JSON.stringify(user));

            setIsLoading(false);
            router.push("/");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-stone-100 via-stone-50 to-teal-50/30 font-sans">
            {/* Decorative background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl" />
            </div>

            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 overflow-hidden relative z-10 transition-all duration-500">
                {/* Header with Progress Steps */}
                <div className="bg-gradient-to-br from-stone-900 to-stone-800 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl" />
                    <div className="relative z-10">
                        <h1 className="text-2xl font-bold tracking-wide mb-1">Create Account</h1>
                        <p className="text-stone-400 text-sm">Complete your KYC to unlock credit limits</p>

                        {/* Stepper */}
                        <div className="flex items-center mt-6">
                            {[1, 2, 3].map((s) => (
                                <div key={s} className="flex items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 
                                        ${step >= s ? "bg-teal-500 border-teal-500 text-stone-900" : "bg-transparent border-stone-600 text-stone-500"}`}>
                                        {step > s ? "✓" : s}
                                    </div>
                                    {s < 3 && <div className={`w-16 h-1 mx-2 rounded-full ${step > s ? "bg-teal-500" : "bg-stone-700"}`} />}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-xs text-stone-400 mt-2 pr-4 max-w-xs">
                            <span>Personal</span>
                            <span className="pl-4">Identity</span>
                            <span>Financial</span>
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <form onSubmit={step === 3 ? handleSubmit : handleNext} className="p-8">

                    {/* STEP 1: Personal Details */}
                    {step === 1 && (
                        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-stone-600 mb-1.5">Full Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Ravi Kumar" className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition bg-stone-50/50" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-600 mb-1.5">Date of Birth</label>
                                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition bg-stone-50/50" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-stone-600 mb-1.5">Email Address</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="ravi@example.com" className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition bg-stone-50/50" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-600 mb-1.5">Phone Number</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 98765 43210" className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition bg-stone-50/50" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1.5">Current Address</label>
                                <textarea name="currentAddress" value={formData.currentAddress} onChange={handleChange} required rows={2} placeholder="Flat No, Building, Street, City, Pincode" className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition bg-stone-50/50 resize-none" />
                            </div>

                            <div>
                                <div className="flex items-center gap-2 mb-1.5">
                                    <input type="checkbox" id="sameAddress" name="sameAddress" checked={formData.sameAddress} onChange={handleChange} className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500" />
                                    <label htmlFor="sameAddress" className="text-sm font-medium text-stone-600 cursor-pointer">Permanent Address same as Current</label>
                                </div>
                                {!formData.sameAddress && (
                                    <textarea name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} required rows={2} placeholder="Permanent Address" className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition bg-stone-50/50 resize-none" />
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1.5">Create Password</label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition bg-stone-50/50" />
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Identity Verification */}
                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 shrink-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                </svg>
                                We verify this information with government databases instantly to approve your profile.
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1.5">PAN Card Number</label>
                                <input type="text" name="pan" value={formData.pan} onChange={(e) => handleChange({ ...e, target: { ...e.target, value: e.target.value.toUpperCase(), name: 'pan' } } as any)} required maxLength={10} placeholder="ABCDE1234F" className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition bg-stone-50/50 font-mono tracking-wide" />
                                <p className="text-xs text-stone-400 mt-1">Format: 5 Letters, 4 Numbers, 1 Letter</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1.5">Aadhaar Number</label>
                                <input type="text" name="aadhaar" value={formData.aadhaar} onChange={(e) => handleChange({ ...e, target: { ...e.target, value: e.target.value.replace(/\D/g, ''), name: 'aadhaar' } } as any)} required maxLength={12} placeholder="1234 5678 9012" className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition bg-stone-50/50 font-mono tracking-wide" />
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Financial Profile */}
                    {step === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1.5">Employment Type</label>
                                <select name="employmentType" value={formData.employmentType} onChange={handleChange} className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition bg-stone-50/50 appearance-none">
                                    <option value="Salaried">Salaried</option>
                                    <option value="Self-Employed">Self-Employed / Business</option>
                                    <option value="Gig Worker">Gig Economy (Delivery, Ride-share, Freelance)</option>
                                    <option value="Student">Student</option>
                                    <option value="Homemaker">Homemaker</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1.5">Monthly Income (₹)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3.5 text-stone-400">₹</span>
                                    <input type="number" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} required placeholder="25000" className="w-full pl-8 pr-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition bg-stone-50/50" />
                                </div>
                                <p className="text-xs text-stone-400 mt-1">Enter your average earnings per month</p>
                            </div>

                            <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 mt-6">
                                <h4 className="text-teal-800 font-bold text-sm mb-1">Verify details before submitting</h4>
                                <ul className="text-xs text-teal-700 space-y-1">
                                    <li>• {formData.name}</li>
                                    <li>• {formData.pan} / {formData.aadhaar}</li>
                                    <li>• {formData.employmentType} - ₹{formData.monthlyIncome}/mo</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="mt-8 flex gap-3">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="w-1/3 bg-stone-100 text-stone-600 font-semibold py-3.5 rounded-xl hover:bg-stone-200 transition"
                            >
                                Back
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`flex-1 bg-teal-700 text-white font-bold text-lg py-3.5 rounded-xl hover:bg-teal-800 transition shadow-lg shadow-teal-700/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                        >
                            {isLoading ? "Verifying..." : step === 3 ? "Complete Registration" : "Next Step"}
                        </button>
                    </div>

                    {step === 1 && (
                        <p className="text-center text-sm text-stone-500 mt-6">
                            Already have an account?{" "}
                            <Link href="/onboarding/sign-in" className="text-teal-700 font-semibold hover:underline">
                                Log in
                            </Link>
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
