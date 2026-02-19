"use client";

import { useState, FormEvent } from "react";
import Navbar from "@/components/Navbar";

interface BankAccount {
    bankName: string;
    maskedAccount: string;
    gradient: string;
}

export default function BankAccountsPage() {
    const [showForm, setShowForm] = useState(false);
    const [accounts, setAccounts] = useState<BankAccount[]>([]);
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [ifsc, setIfsc] = useState("");

    const handleLinkAccount = (e: FormEvent) => {
        e.preventDefault();
        const maskedAcc = "XXXX-XXXX-" + accountNumber.slice(-4);
        const gradients = [
            "from-emerald-600 to-teal-800",
            "from-amber-600 to-orange-800",
            "from-violet-600 to-purple-800",
            "from-rose-600 to-pink-800",
        ];
        setAccounts([
            ...accounts,
            {
                bankName,
                maskedAccount: maskedAcc,
                gradient: gradients[accounts.length % gradients.length],
            },
        ]);
        setBankName("");
        setAccountNumber("");
        setIfsc("");
        setShowForm(false);
    };

    const cancelAddAccount = () => {
        setShowForm(false);
        setBankName("");
        setAccountNumber("");
        setIfsc("");
    };

    return (
        <div className="bg-stone-50 font-sans min-h-screen pb-12">
            <Navbar showBack />

            <main className="max-w-3xl mx-auto p-6 mt-6">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-stone-800">Linked Accounts</h2>
                        <p className="text-stone-500 text-sm">Manage your bank connections</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Default SBI Account */}
                    <div className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-2xl p-6 text-white shadow-lg shadow-stone-900/15 relative overflow-hidden">
                        <div className="absolute -top-12 -right-12 w-40 h-40 bg-teal-500/10 rounded-full blur-2xl" />
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <p className="text-stone-400 text-xs font-medium uppercase tracking-wide">Primary Account</p>
                                    <p className="text-xl font-bold mt-1">State Bank of India</p>
                                </div>
                                <div className="bg-white/10 p-2 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-lg tracking-widest text-stone-300">XXXX-XXXX-4527</span>
                                <span className="bg-teal-500/20 text-teal-400 text-[10px] font-bold px-2 py-0.5 rounded-full">VERIFIED</span>
                            </div>
                        </div>
                    </div>

                    {/* Additional Accounts */}
                    {accounts.map((acc, i) => (
                        <div key={i} className={`bg-gradient-to-br ${acc.gradient} rounded-2xl p-6 text-white shadow-lg relative overflow-hidden`}>
                            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <p className="text-white/60 text-xs font-medium uppercase tracking-wide">Linked Account</p>
                                        <p className="text-xl font-bold mt-1">{acc.bankName}</p>
                                    </div>
                                    <div className="bg-white/10 p-2 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
                                        </svg>
                                    </div>
                                </div>
                                <span className="font-mono text-lg tracking-widest text-white/80">{acc.maskedAccount}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Account Button */}
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="w-full mt-6 bg-white hover:bg-teal-50 text-teal-700 font-semibold py-4 rounded-2xl border-2 border-dashed border-teal-200 transition-all flex items-center justify-center gap-2 group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add Another Bank Account
                    </button>
                )}

                {/* Add Account Form */}
                {showForm && (
                    <div className="mt-6 bg-white p-8 rounded-2xl shadow-sm border border-stone-200/60">
                        <h3 className="text-lg font-bold text-stone-800 mb-6 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-teal-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                            Link New Account
                        </h3>
                        <form onSubmit={handleLinkAccount} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1.5">Bank Name</label>
                                <input
                                    type="text"
                                    required
                                    value={bankName}
                                    onChange={(e) => setBankName(e.target.value)}
                                    placeholder="e.g. HDFC Bank"
                                    className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none bg-stone-50/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1.5">Account Number</label>
                                <input
                                    type="text"
                                    required
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                    placeholder="Enter account number"
                                    className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none bg-stone-50/50 font-mono"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1.5">IFSC Code</label>
                                <input
                                    type="text"
                                    required
                                    value={ifsc}
                                    onChange={(e) => setIfsc(e.target.value)}
                                    placeholder="e.g. SBIN0001234"
                                    className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none bg-stone-50/50 uppercase"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={cancelAddAccount} className="w-1/3 bg-stone-100 text-stone-600 font-semibold py-3 rounded-xl hover:bg-stone-200 transition">
                                    Cancel
                                </button>
                                <button type="submit" className="w-2/3 bg-teal-700 text-white font-semibold py-3 rounded-xl hover:bg-teal-800 transition shadow-md shadow-teal-700/15 flex items-center justify-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                    </svg>
                                    Securely Link Account
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
}
