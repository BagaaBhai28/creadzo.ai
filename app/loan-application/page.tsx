"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function LoanApplicationPage() {
    const [amount, setAmount] = useState(5000);
    const [tenure, setTenure] = useState(3);
    const [emi, setEmi] = useState(0);
    const [totalPayable, setTotalPayable] = useState(0);
    const [maxLimit, setMaxLimit] = useState(25000);
    const [hasAnalysis, setHasAnalysis] = useState(false);

    // Read credit limit from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("credzoAnalysis");
        if (stored) {
            try {
                const data = JSON.parse(stored);
                if (data.creditLimit) {
                    setMaxLimit(data.creditLimit);
                    setHasAnalysis(true);
                    // Clamp current amount to new max
                    setAmount(prev => Math.min(prev, data.creditLimit));
                }
            } catch { /* ignore */ }
        }
    }, []);

    useEffect(() => {
        const rate = 0.015; // 1.5% monthly interest
        const monthlyRate = rate;
        const emiCalc = (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
        setEmi(Math.round(emiCalc));
        setTotalPayable(Math.round(emiCalc * tenure));
    }, [amount, tenure]);

    return (
        <div className="bg-stone-50 font-sans min-h-screen pb-12">
            <Navbar showBack />

            <main className="max-w-2xl mx-auto p-6 mt-6">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-stone-800">Loan Application</h2>
                    <p className="text-stone-500 text-sm mt-1">Customize your micro-loan offer</p>
                    {hasAnalysis && (
                        <div className="mt-2 inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 text-xs font-medium px-3 py-1 rounded-full border border-teal-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Based on your Credzo Trust Score
                        </div>
                    )}
                </div>

                {/* Loan Customization Card */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200/60 mb-6">
                    <h3 className="text-lg font-bold text-stone-800 mb-6">Customize Your Loan</h3>

                    {/* Amount Slider */}
                    <div className="mb-8">
                        <div className="flex justify-between items-baseline mb-3">
                            <label className="text-sm font-medium text-stone-600">Loan Amount</label>
                            <span className="text-2xl font-bold text-teal-700">₹{amount.toLocaleString()}</span>
                        </div>
                        <input
                            type="range"
                            min="1000"
                            max={maxLimit}
                            step="500"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs text-stone-400 mt-1">
                            <span>₹1,000</span>
                            <span>₹{maxLimit.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Tenure Slider */}
                    <div className="mb-8">
                        <div className="flex justify-between items-baseline mb-3">
                            <label className="text-sm font-medium text-stone-600">Repayment Tenure</label>
                            <span className="text-2xl font-bold text-teal-700">{tenure} months</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="12"
                            step="1"
                            value={tenure}
                            onChange={(e) => setTenure(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs text-stone-400 mt-1">
                            <span>1 month</span>
                            <span>12 months</span>
                        </div>
                    </div>
                </div>

                {/* EMI Summary */}
                <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl p-8 text-white relative overflow-hidden mb-6">
                    <div className="absolute -top-16 -right-16 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <p className="text-stone-400 text-sm font-medium uppercase tracking-wide mb-2">Estimated EMI</p>
                        <p className="text-4xl font-bold text-white mb-6">₹{emi.toLocaleString()}<span className="text-lg text-stone-400 font-normal">/month</span></p>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                <p className="text-xs text-stone-400 mb-1">Principal</p>
                                <p className="text-sm font-bold">₹{amount.toLocaleString()}</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                <p className="text-xs text-stone-400 mb-1">Total Payable</p>
                                <p className="text-sm font-bold">₹{totalPayable.toLocaleString()}</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                <p className="text-xs text-stone-400 mb-1">Interest</p>
                                <p className="text-sm font-bold text-amber-400">₹{(totalPayable - amount).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <Link
                        href="/"
                        className="w-1/3 bg-stone-100 text-stone-600 font-semibold py-3.5 rounded-xl hover:bg-stone-200 transition text-center"
                    >
                        Cancel
                    </Link>
                    <button className="w-2/3 bg-teal-700 text-white font-bold py-3.5 rounded-xl hover:bg-teal-800 transition shadow-lg shadow-teal-700/20 flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Apply for Loan
                    </button>
                </div>
            </main>
        </div>
    );
}
