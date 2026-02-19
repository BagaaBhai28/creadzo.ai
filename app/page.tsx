"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <div className="bg-stone-50 font-sans min-h-screen pb-12">
      <Navbar />

      <main className="max-w-5xl mx-auto p-6 mt-8">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-stone-800">
            Welcome back, [User Name]! 👋
          </h2>
          <p className="text-stone-500 mt-2">
            Manage your financial identity and explore opportunities.
          </p>
        </header>

        {/* Micro-Credit Line Card */}
        <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 rounded-3xl p-8 mb-6 shadow-2xl shadow-stone-900/20 border border-stone-700/50 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500 rounded-full opacity-5 blur-3xl"></div>

          <div className="w-full md:w-1/2 relative z-10">
            <p className="text-stone-400 text-sm font-medium mb-1 tracking-wide uppercase">
              Credzo Micro-Credit Line
            </p>
            <div className="flex items-baseline gap-2 mb-2">
              <h3 className="text-5xl font-bold text-white">₹15,000</h3>
              <span className="text-stone-400 font-medium">Available</span>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-xs text-stone-400 mb-1">
                <span>Used: ₹0</span>
                <span>Total Limit: ₹15,000</span>
              </div>
              <div className="w-full bg-stone-700 h-2 rounded-full overflow-hidden">
                <div className="bg-teal-400 h-full rounded-full w-0"></div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto relative z-10 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-teal-400 text-sm font-medium mb-1 md:justify-end">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
              </span>
              Pre-Approved via Trust CV
            </div>
            <Link
              href="/loan-application"
              className="w-full md:w-auto bg-teal-500 hover:bg-teal-400 text-stone-900 font-bold text-lg px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.25)] transition-all hover:scale-[1.03] flex items-center justify-center gap-2"
            >
              Get Loan
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Trust Score Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 mb-6 shadow-sm border border-stone-200/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="relative flex items-center justify-center">
              <svg className="w-28 h-28 transform -rotate-90">
                <circle className="text-stone-100" strokeWidth="10" stroke="currentColor" fill="transparent" r="54" cx="56" cy="56" />
                <circle className="text-teal-500" strokeWidth="10" strokeDasharray="339" strokeDashoffset="61" strokeLinecap="round" stroke="currentColor" fill="transparent" r="54" cx="56" cy="56" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold text-stone-800">742</span>
                <span className="text-[9px] font-bold text-teal-600 tracking-widest mt-1">HIGH TRUST</span>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-stone-800 mb-2">Your Credzo Trust Score</h3>
              <p className="text-stone-500 text-sm max-w-md">
                Your financial identity is strong! Consistent utility payments and responsible spending habits have boosted your limit.
              </p>
            </div>
          </div>

          <Link
            href="/credit-analysis"
            className="w-full md:w-auto bg-teal-50 text-teal-700 hover:bg-teal-700 hover:text-white font-semibold px-6 py-3 rounded-xl transition-all border border-teal-100 hover:border-teal-700 flex items-center justify-center gap-2 group whitespace-nowrap"
          >
            Full analysis
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Upload Section */}
        <Link href="/credit-analysis" className="block bg-white p-8 rounded-3xl shadow-sm border-2 border-dashed border-teal-200/60 mb-10 hover:bg-teal-50/30 transition-colors cursor-pointer text-center group relative overflow-hidden">
          <div className="bg-amber-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform border border-amber-100">
            <span className="text-2xl">📄</span>
          </div>
          <h3 className="text-xl font-bold text-stone-800 mb-2">Upload Bank Statement for AI Analysis</h3>
          <p className="text-stone-500 text-sm max-w-lg mx-auto mb-6">
            Upload your last 6 months&apos; bank statement (PDF or Image). Our Gemini AI will analyze your spending patterns to generate or update your Credzo Trust Score.
          </p>
          <span className="bg-teal-700 hover:bg-teal-800 text-white font-semibold px-8 py-3 rounded-xl transition shadow-md shadow-teal-700/15 flex items-center justify-center gap-2 mx-auto relative z-10 w-fit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            Upload &amp; Analyze
          </span>
        </Link>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/bank-accounts" className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200/60 hover:shadow-lg hover:-translate-y-1 transition duration-300 cursor-pointer group">
            <div className="bg-emerald-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition border border-emerald-100">
              <span className="text-2xl">🏦</span>
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-2">Bank Accounts</h3>
            <p className="text-sm text-stone-500 mb-4">Link your Account Aggregator or view previously linked accounts.</p>
            <span className="text-teal-700 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              Manage Accounts
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </Link>

          <Link href="/credit-analysis" className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200/60 hover:shadow-lg hover:-translate-y-1 transition duration-300 cursor-pointer group relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">CORE ENGINE</div>
            <div className="bg-amber-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-100 transition border border-amber-100">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-2">Credit Analysis</h3>
            <p className="text-sm text-stone-500 mb-4">View your Gemini-powered Trust CV, score breakdown, and financial signals.</p>
            <span className="text-amber-700 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              View Trust Score
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </Link>

          <Link href="/loan-application" className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200/60 hover:shadow-lg hover:-translate-y-1 transition duration-300 cursor-pointer group">
            <div className="bg-violet-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-violet-100 transition border border-violet-100">
              <span className="text-2xl">💸</span>
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-2">Micro-Loans</h3>
            <p className="text-sm text-stone-500 mb-4">Explore eligible credit lines and loan offers based on your alternative score.</p>
            <span className="text-violet-700 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              Explore Offers
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
}
