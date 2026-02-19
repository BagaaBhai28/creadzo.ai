"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

/* ───────── Type Definitions ───────── */

interface ScoreBreakdown {
    incomeStability: number;
    spendingDiscipline: number;
    savingsBehavior: number;
    paymentConsistency: number;
    accountHealth: number;
}

interface ScoreOverview {
    trustScore: number;
    trustLevel: string;
    scoreExplanation: string;
    scoreBreakdown: ScoreBreakdown;
}

interface Factor {
    factor: string;
    impact: string;
    detail: string;
}

interface Advice {
    title: string;
    description: string;
    potentialImpact: string;
}

interface ImprovementSuggestions {
    whyThisScore: string;
    factors: Factor[];
    actionableAdvice: Advice[];
}

interface SpendingCategory {
    name: string;
    percentage: number;
    amount: number;
    color: string;
}

interface SpendingAnalysis {
    categories: SpendingCategory[];
    totalSpending: number;
    totalIncome: number;
    savingsRate: number;
    spendingHabitsText: string;
}

interface SpendingBehavior {
    patterns: string[];
    unusualActivity: string;
    consistencyScore: string;
}

interface AiInsights {
    financialHealthSummary: string;
    riskLevel: string;
    riskExplanation: string;
    spendingBehavior: SpendingBehavior;
}

interface PositiveSignal {
    signal: string;
    description: string;
    strength: string;
}

interface MissingSignal {
    signal: string;
    howToFix: string;
}

interface RiskFactor {
    factor: string;
    traditionalBankView: string;
    credzoView: string;
}

interface TrustFactorAnalysis {
    positiveSignals: PositiveSignal[];
    missingSignals: MissingSignal[];
    riskFactors: RiskFactor[];
}

interface LimitFactor {
    factor: string;
    impact: string;
    detail: string;
}

interface CreditLimitBreakdown {
    approvedLimit: number;
    maxEligibleLimit: number;
    limitReasoning: string;
    incomeToLimitRatio: string;
    limitFactors: LimitFactor[];
    repaymentCapacity: number;
    confidenceLevel: string;
}

interface FullAnalysis {
    scoreOverview: ScoreOverview;
    improvementSuggestions: ImprovementSuggestions;
    spendingAnalysis: SpendingAnalysis;
    aiInsights: AiInsights;
    trustFactorAnalysis: TrustFactorAnalysis;
    creditLimitBreakdown: CreditLimitBreakdown;
    recommendedCreditLimit: number;
    scorePercentile: number;
}

/* ───────── Component ───────── */

export default function CreditAnalysisPage() {
    const [analysis, setAnalysis] = useState<FullAnalysis | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [bankStatementText, setBankStatementText] = useState("");
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    /* ── Persist analysis to localStorage ── */
    useEffect(() => {
        if (analysis) {
            localStorage.setItem("credzoAnalysis", JSON.stringify({
                creditLimit: analysis.creditLimitBreakdown?.approvedLimit || analysis.recommendedCreditLimit,
                trustScore: analysis.scoreOverview.trustScore,
                trustLevel: analysis.scoreOverview.trustLevel,
                scorePercentile: analysis.scorePercentile,
                repaymentCapacity: analysis.creditLimitBreakdown?.repaymentCapacity,
                timestamp: Date.now(),
            }));
        }
    }, [analysis]);

    /* ── File handling ── */
    const handleFileSelect = (file: File) => {
        if (file.type !== "application/pdf") {
            setError("Please upload a PDF file");
            return;
        }
        if (file.size > 20 * 1024 * 1024) {
            setError("File too large. Max 20MB.");
            return;
        }
        setUploadedFile(file);
        setError("");
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files[0]) handleFileSelect(e.dataTransfer.files[0]);
    };

    /* ── Run Analysis ── */
    const runAnalysis = useCallback(async () => {
        setIsAnalyzing(true);
        setError("");

        try {
            let pdfBase64: string | undefined;
            let fileName: string | undefined;

            if (uploadedFile) {
                // Read file as base64
                const buffer = await uploadedFile.arrayBuffer();
                const bytes = new Uint8Array(buffer);
                let binary = "";
                for (let i = 0; i < bytes.length; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                pdfBase64 = btoa(binary);
                fileName = uploadedFile.name;
            }

            const res = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    pdfBase64,
                    fileName,
                    bankStatement: !uploadedFile ? bankStatementText || undefined : undefined,
                }),
            });

            const data = await res.json();
            if (data.success) {
                setAnalysis(data.analysis);
            } else {
                setError(data.error || "Analysis failed. Please try again.");
            }
        } catch {
            setError("Network error — please check your connection and try again.");
        } finally {
            setIsAnalyzing(false);
        }
    }, [uploadedFile, bankStatementText]);

    /* ── Score ring offset calculation ── */
    const scoreOffset = analysis
        ? 339 - (339 * analysis.scoreOverview.trustScore) / 900
        : 339 - (339 * 0) / 900;

    /* ── Pie chart SVG generation ── */
    const renderPieChart = (categories: SpendingCategory[]) => {
        let cumulativePercent = 0;
        const size = 200;
        const radius = 80;
        const cx = size / 2;
        const cy = size / 2;

        return (
            <svg viewBox={`0 0 ${size} ${size}`} className="w-52 h-52">
                {categories.map((cat, i) => {
                    const startAngle = cumulativePercent * 3.6 * (Math.PI / 180);
                    cumulativePercent += cat.percentage;
                    const endAngle = cumulativePercent * 3.6 * (Math.PI / 180);
                    const largeArc = cat.percentage > 50 ? 1 : 0;

                    const x1 = cx + radius * Math.cos(startAngle - Math.PI / 2);
                    const y1 = cy + radius * Math.sin(startAngle - Math.PI / 2);
                    const x2 = cx + radius * Math.cos(endAngle - Math.PI / 2);
                    const y2 = cy + radius * Math.sin(endAngle - Math.PI / 2);

                    return (
                        <path
                            key={i}
                            d={`M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                            fill={cat.color}
                            stroke="white"
                            strokeWidth="2"
                            className="hover:opacity-80 transition-opacity cursor-pointer"
                        />
                    );
                })}
                {/* Center hole for donut effect */}
                <circle cx={cx} cy={cy} r="45" fill="white" />
            </svg>
        );
    };

    return (
        <div className="bg-stone-50 font-sans min-h-screen pb-12">
            <Navbar showBack />

            <main className="max-w-5xl mx-auto p-6 mt-6">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-stone-800">Credit Analysis</h2>
                    <p className="text-stone-500 mt-1">Powered by Google Gemini AI — Upload your bank statement for a complete financial analysis</p>
                </div>

                {/* ═══════════════════════════════════
            UPLOAD SECTION
        ═══════════════════════════════════ */}
                {!analysis && !isAnalyzing && (
                    <div className="space-y-6">
                        {/* PDF Upload */}
                        <div
                            className={`bg-white rounded-3xl p-10 border-2 border-dashed transition-all cursor-pointer ${dragActive
                                ? "border-teal-500 bg-teal-50/50"
                                : uploadedFile
                                    ? "border-teal-300 bg-teal-50/30"
                                    : "border-stone-200 hover:border-teal-300"
                                }`}
                            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                            onDragLeave={() => setDragActive(false)}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf"
                                className="hidden"
                                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                            />
                            <div className="text-center">
                                {uploadedFile ? (
                                    <>
                                        <div className="bg-teal-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-teal-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-teal-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <p className="text-lg font-semibold text-stone-800">{uploadedFile.name}</p>
                                        <p className="text-sm text-stone-500 mt-1">{(uploadedFile.size / 1024).toFixed(1)} KB — Ready for analysis</p>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setUploadedFile(null); }}
                                            className="text-sm text-red-500 hover:underline mt-2"
                                        >
                                            Remove file
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="bg-stone-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-stone-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-stone-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                            </svg>
                                        </div>
                                        <p className="text-lg font-semibold text-stone-800 mb-1">Drop your bank statement PDF here</p>
                                        <p className="text-sm text-stone-500">or click to browse — Max 20MB</p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-px bg-stone-200" />
                            <span className="text-sm text-stone-400 font-medium">OR</span>
                            <div className="flex-1 h-px bg-stone-200" />
                        </div>

                        {/* Text Input Fallback */}
                        <div className="bg-white rounded-2xl p-6 border border-stone-200/60 shadow-sm">
                            <p className="text-sm font-medium text-stone-700 mb-3">
                                Describe your financial activity (for demo / no PDF):
                            </p>
                            <textarea
                                rows={4}
                                value={bankStatementText}
                                onChange={(e) => setBankStatementText(e.target.value)}
                                placeholder="E.g.: Monthly income ₹18,000 from gig work (Swiggy). Regular UPI payments for electricity ₹850, phone ₹299. Grocery spending ₹3,500/month. End-of-month balance averages ₹1,200. No bounced transactions..."
                                className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none bg-stone-50/50 text-sm"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        {/* Analyze Button */}
                        <button
                            onClick={runAnalysis}
                            disabled={!uploadedFile && !bankStatementText}
                            className="w-full bg-teal-700 text-white font-bold py-4 rounded-2xl hover:bg-teal-800 transition-all shadow-lg shadow-teal-700/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                            </svg>
                            Analyze with Gemini AI
                        </button>
                    </div>
                )}

                {/* ═══════════════════════════════════
            LOADING STATE
        ═══════════════════════════════════ */}
                {isAnalyzing && (
                    <div className="bg-white rounded-3xl p-16 border border-stone-200/60 shadow-sm text-center">
                        <div className="relative w-20 h-20 mx-auto mb-6">
                            <div className="absolute inset-0 rounded-full border-4 border-stone-100" />
                            <div className="absolute inset-0 rounded-full border-4 border-teal-500 border-t-transparent animate-spin" />
                        </div>
                        <h3 className="text-xl font-bold text-stone-800 mb-2">Analyzing your finances...</h3>
                        <p className="text-stone-500 text-sm">Gemini AI is reading your bank statement and building your Trust CV</p>
                        <div className="flex justify-center gap-1 mt-4">
                            <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce [animation-delay:0ms]" />
                            <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce [animation-delay:150ms]" />
                            <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce [animation-delay:300ms]" />
                        </div>
                    </div>
                )}

                {/* ═══════════════════════════════════
            SECTION A: SCORE OVERVIEW
        ═══════════════════════════════════ */}
                {analysis && (
                    <>
                        {/* Re-analyze button */}
                        <div className="flex justify-end mb-6">
                            <button
                                onClick={() => { setAnalysis(null); setUploadedFile(null); setBankStatementText(""); }}
                                className="bg-stone-100 hover:bg-stone-200 text-stone-600 font-medium px-4 py-2 rounded-xl transition text-sm flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                                </svg>
                                New Analysis
                            </button>
                        </div>

                        {/* ═══════════════════════════════════
                    CREDIT LIMIT APPROVED HERO CARD
                ═══════════════════════════════════ */}
                        <div className="bg-gradient-to-br from-teal-700 via-teal-800 to-stone-900 rounded-3xl p-8 mb-6 shadow-2xl shadow-teal-900/30 relative overflow-hidden">
                            {/* Decorative elements */}
                            <div className="absolute -top-20 -right-20 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl" />
                            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-amber-400/8 rounded-full blur-3xl" />

                            <div className="relative z-10">
                                {/* Badge */}
                                <div className="flex items-center gap-2 mb-5">
                                    <div className="bg-teal-400/20 border border-teal-400/30 text-teal-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        CREDIT LIMIT APPROVED
                                    </div>
                                    {analysis.creditLimitBreakdown?.confidenceLevel && (
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${analysis.creditLimitBreakdown.confidenceLevel === "High" ? "bg-teal-400/15 text-teal-300" :
                                                analysis.creditLimitBreakdown.confidenceLevel === "Medium" ? "bg-amber-400/15 text-amber-300" :
                                                    "bg-red-400/15 text-red-300"
                                            }`}>
                                            {analysis.creditLimitBreakdown.confidenceLevel} Confidence
                                        </span>
                                    )}
                                </div>

                                {/* Main amount */}
                                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                                    <div>
                                        <p className="text-teal-300/70 text-sm font-medium mb-1">Your Approved Credit Limit</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-6xl font-bold text-white tracking-tight">
                                                ₹{(analysis.creditLimitBreakdown?.approvedLimit || analysis.recommendedCreditLimit).toLocaleString()}
                                            </span>
                                        </div>
                                        {analysis.creditLimitBreakdown?.maxEligibleLimit && (
                                            <p className="text-teal-300/50 text-sm mt-2">
                                                Max eligible: ₹{analysis.creditLimitBreakdown.maxEligibleLimit.toLocaleString()}
                                            </p>
                                        )}
                                    </div>

                                    <Link
                                        href="/loan-application"
                                        className="bg-white text-teal-800 font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shrink-0"
                                    >
                                        Apply for Loan
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </Link>
                                </div>

                                {/* Stats row */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
                                    {analysis.creditLimitBreakdown?.incomeToLimitRatio && (
                                        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                                            <p className="text-[10px] text-teal-300/50 uppercase font-medium">Income Ratio</p>
                                            <p className="text-white font-bold mt-0.5">{analysis.creditLimitBreakdown.incomeToLimitRatio}</p>
                                        </div>
                                    )}
                                    {analysis.creditLimitBreakdown?.repaymentCapacity && (
                                        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                                            <p className="text-[10px] text-teal-300/50 uppercase font-medium">Monthly Repayment</p>
                                            <p className="text-white font-bold mt-0.5">₹{analysis.creditLimitBreakdown.repaymentCapacity.toLocaleString()}</p>
                                        </div>
                                    )}
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                                        <p className="text-[10px] text-teal-300/50 uppercase font-medium">Trust Score</p>
                                        <p className="text-white font-bold mt-0.5">{analysis.scoreOverview.trustScore}/900</p>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                                        <p className="text-[10px] text-teal-300/50 uppercase font-medium">Percentile</p>
                                        <p className="text-white font-bold mt-0.5">Top {100 - analysis.scorePercentile}%</p>
                                    </div>
                                </div>

                                {/* Reasoning */}
                                {analysis.creditLimitBreakdown?.limitReasoning && (
                                    <div className="mt-6 pt-5 border-t border-white/10">
                                        <p className="text-teal-200/80 text-sm leading-relaxed">{analysis.creditLimitBreakdown.limitReasoning}</p>
                                    </div>
                                )}

                                {/* Limit Factors */}
                                {analysis.creditLimitBreakdown?.limitFactors && analysis.creditLimitBreakdown.limitFactors.length > 0 && (
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {analysis.creditLimitBreakdown.limitFactors.map((lf, i) => (
                                            <span key={i} className={`text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${lf.impact === "POSITIVE" ? "bg-teal-400/15 text-teal-300 border border-teal-400/20" :
                                                    "bg-red-400/10 text-red-300 border border-red-400/15"
                                                }`}>
                                                {lf.impact === "POSITIVE" ? "↑" : "↓"} {lf.factor}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-8 mb-6 shadow-sm border border-stone-200/60">
                            <div className="flex flex-col lg:flex-row items-center gap-8">
                                {/* Score Ring */}
                                <div className="relative flex items-center justify-center shrink-0">
                                    <svg className="w-48 h-48 transform -rotate-90">
                                        <circle className="text-stone-100" strokeWidth="14" stroke="currentColor" fill="transparent" r="54" cx="96" cy="96" />
                                        <circle
                                            className="text-teal-500"
                                            strokeWidth="14"
                                            strokeDasharray="339"
                                            strokeDashoffset={scoreOffset}
                                            strokeLinecap="round"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="54"
                                            cx="96"
                                            cy="96"
                                            style={{ transition: "stroke-dashoffset 1.5s ease" }}
                                        />
                                    </svg>
                                    <div className="absolute flex flex-col items-center">
                                        <span className="text-5xl font-bold text-stone-800">{analysis.scoreOverview.trustScore}</span>
                                        <span className="text-[10px] font-bold text-teal-600 tracking-widest mt-1">{analysis.scoreOverview.trustLevel}</span>
                                    </div>
                                </div>

                                {/* Score Details */}
                                <div className="flex-1 text-center lg:text-left">
                                    <h3 className="text-2xl font-bold text-stone-800 mb-3">Your Credzo Trust Score</h3>
                                    <p className="text-stone-500 text-sm mb-6 leading-relaxed">{analysis.scoreOverview.scoreExplanation}</p>

                                    {/* Score Breakdown Bars */}
                                    <div className="space-y-3">
                                        {Object.entries(analysis.scoreOverview.scoreBreakdown).map(([key, value]) => (
                                            <div key={key}>
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-stone-600 font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                                                    <span className="text-stone-800 font-bold">{value}/100</span>
                                                </div>
                                                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-1000 ${value >= 75 ? "bg-teal-500" : value >= 50 ? "bg-amber-500" : "bg-red-400"
                                                            }`}
                                                        style={{ width: `${value}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom stats */}
                            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-stone-100">
                                <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
                                    <p className="text-xs text-stone-400 uppercase font-medium">Recommended Credit Limit</p>
                                    <p className="text-xl font-bold text-teal-700 mt-1">₹{analysis.recommendedCreditLimit.toLocaleString()}</p>
                                </div>
                                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                                    <p className="text-xs text-stone-400 uppercase font-medium">Score Percentile</p>
                                    <p className="text-xl font-bold text-amber-700 mt-1">Top {100 - analysis.scorePercentile}%</p>
                                </div>
                            </div>
                        </div>

                        {/* ═══════════════════════════════════
                SECTION D: AI INSIGHTS
            ═══════════════════════════════════ */}
                        <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl p-8 mb-6 text-white relative overflow-hidden">
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-500/8 rounded-full blur-3xl" />
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-500/8 rounded-full blur-3xl" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-amber-500/20 p-2.5 rounded-xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-amber-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold">Gemini AI Insights</h3>
                                </div>

                                {/* Financial Health Summary */}
                                <div className="mb-6">
                                    <p className="text-stone-300 leading-relaxed">{analysis.aiInsights.financialHealthSummary}</p>
                                </div>

                                {/* Risk + Consistency */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                        <p className="text-xs text-stone-400 font-medium uppercase mb-2">Risk Level</p>
                                        <p className={`text-lg font-bold ${analysis.aiInsights.riskLevel === "Low Risk" ? "text-teal-400" :
                                            analysis.aiInsights.riskLevel === "Moderate Risk" ? "text-amber-400" : "text-red-400"
                                            }`}>{analysis.aiInsights.riskLevel}</p>
                                        <p className="text-stone-400 text-sm mt-1">{analysis.aiInsights.riskExplanation}</p>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                        <p className="text-xs text-stone-400 font-medium uppercase mb-2">Consistency</p>
                                        <p className="text-lg font-bold text-white">{analysis.aiInsights.spendingBehavior.consistencyScore}</p>
                                        <p className="text-stone-400 text-sm mt-1">{analysis.aiInsights.spendingBehavior.unusualActivity}</p>
                                    </div>
                                </div>

                                {/* Spending Behavior Patterns */}
                                <div>
                                    <p className="text-xs text-stone-400 font-medium uppercase mb-3">Behavior Patterns Detected</p>
                                    <div className="flex flex-wrap gap-2">
                                        {analysis.aiInsights.spendingBehavior.patterns.map((pattern, i) => (
                                            <span key={i} className="bg-white/10 border border-white/10 text-stone-200 text-sm px-3 py-1.5 rounded-lg">
                                                {pattern}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ═══════════════════════════════════
                SECTION C: SPENDING ANALYSIS
            ═══════════════════════════════════ */}
                        <div className="bg-white rounded-3xl p-8 mb-6 shadow-sm border border-stone-200/60">
                            <h3 className="text-xl font-bold text-stone-800 mb-6">Spending Analysis</h3>

                            <div className="flex flex-col lg:flex-row items-center gap-8">
                                {/* Pie Chart */}
                                <div className="shrink-0">
                                    {renderPieChart(analysis.spendingAnalysis.categories)}
                                </div>

                                {/* Category Legend + Stats */}
                                <div className="flex-1 w-full">
                                    {/* Income / Spending / Savings */}
                                    <div className="grid grid-cols-3 gap-3 mb-6">
                                        <div className="bg-teal-50 rounded-xl p-3 border border-teal-100 text-center">
                                            <p className="text-[10px] text-stone-400 uppercase font-medium">Income</p>
                                            <p className="text-lg font-bold text-teal-700">₹{analysis.spendingAnalysis.totalIncome.toLocaleString()}</p>
                                        </div>
                                        <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 text-center">
                                            <p className="text-[10px] text-stone-400 uppercase font-medium">Spending</p>
                                            <p className="text-lg font-bold text-stone-700">₹{analysis.spendingAnalysis.totalSpending.toLocaleString()}</p>
                                        </div>
                                        <div className="bg-amber-50 rounded-xl p-3 border border-amber-100 text-center">
                                            <p className="text-[10px] text-stone-400 uppercase font-medium">Savings Rate</p>
                                            <p className="text-lg font-bold text-amber-700">{analysis.spendingAnalysis.savingsRate}%</p>
                                        </div>
                                    </div>

                                    {/* Category breakdown */}
                                    <div className="space-y-3">
                                        {analysis.spendingAnalysis.categories.map((cat, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                                                <div className="flex-1">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-stone-700 font-medium">{cat.name}</span>
                                                        <span className="text-stone-500">₹{cat.amount.toLocaleString()} ({cat.percentage}%)</span>
                                                    </div>
                                                    <div className="w-full bg-stone-100 h-1.5 rounded-full mt-1 overflow-hidden">
                                                        <div className="h-full rounded-full" style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Spending habits text */}
                            <div className="mt-6 pt-6 border-t border-stone-100">
                                <p className="text-stone-500 text-sm leading-relaxed">{analysis.spendingAnalysis.spendingHabitsText}</p>
                            </div>
                        </div>

                        {/* ═══════════════════════════════════
                SECTION B: IMPROVEMENT SUGGESTIONS
            ═══════════════════════════════════ */}
                        <div className="bg-white rounded-3xl p-8 mb-6 shadow-sm border border-stone-200/60">
                            <h3 className="text-xl font-bold text-stone-800 mb-2">Why This Score?</h3>
                            <p className="text-stone-500 text-sm mb-6 leading-relaxed">{analysis.improvementSuggestions.whyThisScore}</p>

                            {/* Factors */}
                            <h4 className="text-sm font-bold text-stone-700 uppercase tracking-wide mb-4">Contributing Factors</h4>
                            <div className="space-y-3 mb-8">
                                {analysis.improvementSuggestions.factors.map((f, i) => (
                                    <div key={i} className={`p-4 rounded-xl border flex items-start gap-3 ${f.impact === "POSITIVE" ? "bg-teal-50/50 border-teal-100" :
                                        f.impact === "NEGATIVE" ? "bg-red-50/50 border-red-100" :
                                            "bg-stone-50 border-stone-200"
                                        }`}>
                                        <span className={`mt-0.5 text-lg ${f.impact === "POSITIVE" ? "text-teal-500" :
                                            f.impact === "NEGATIVE" ? "text-red-400" : "text-stone-400"
                                            }`}>
                                            {f.impact === "POSITIVE" ? "↑" : f.impact === "NEGATIVE" ? "↓" : "→"}
                                        </span>
                                        <div>
                                            <p className="text-sm font-semibold text-stone-800">{f.factor}</p>
                                            <p className="text-sm text-stone-500 mt-0.5">{f.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Actionable Advice */}
                            <h4 className="text-sm font-bold text-stone-700 uppercase tracking-wide mb-4">How to Improve</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {analysis.improvementSuggestions.actionableAdvice.map((advice, i) => (
                                    <div key={i} className="bg-stone-50 p-5 rounded-xl border border-stone-100 hover:border-teal-200 transition-colors">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-teal-100 text-teal-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0">{i + 1}</div>
                                            <div>
                                                <h5 className="font-semibold text-stone-800 text-sm">{advice.title}</h5>
                                                <p className="text-stone-500 text-sm mt-1">{advice.description}</p>
                                                <span className="inline-block mt-2 text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">{advice.potentialImpact}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ═══════════════════════════════════
                SECTION E: TRUST FACTOR ANALYSIS
            ═══════════════════════════════════ */}
                        <div className="space-y-6">
                            {/* Positive Signals */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200/60">
                                <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                                    <div className="bg-teal-100 p-1.5 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-teal-700">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    Positive Signals
                                </h3>
                                <div className="space-y-3">
                                    {analysis.trustFactorAnalysis.positiveSignals.map((s, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 bg-teal-50/50 rounded-xl border border-teal-100/60">
                                            <div className={`mt-1 px-1.5 py-0.5 text-[10px] font-bold rounded ${s.strength === "Strong" ? "bg-teal-200 text-teal-800" :
                                                s.strength === "Moderate" ? "bg-teal-100 text-teal-700" :
                                                    "bg-stone-200 text-stone-600"
                                                }`}>{s.strength}</div>
                                            <div>
                                                <p className="text-sm font-semibold text-stone-800">{s.signal}</p>
                                                <p className="text-sm text-stone-500 mt-0.5">{s.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Missing Signals */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200/60">
                                <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                                    <div className="bg-amber-100 p-1.5 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-amber-700">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                        </svg>
                                    </div>
                                    Missing Signals
                                </h3>
                                <div className="space-y-3">
                                    {analysis.trustFactorAnalysis.missingSignals.map((s, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-100/60">
                                            <span className="text-amber-500 mt-0.5 shrink-0">⚠</span>
                                            <div>
                                                <p className="text-sm font-semibold text-stone-800">{s.signal}</p>
                                                <p className="text-sm text-stone-500 mt-0.5">💡 {s.howToFix}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Risk Factors — Credzo vs Traditional Banks */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200/60">
                                <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                                    <div className="bg-violet-100 p-1.5 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-violet-700">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                        </svg>
                                    </div>
                                    Credzo vs Traditional Banks
                                </h3>
                                <div className="space-y-4">
                                    {analysis.trustFactorAnalysis.riskFactors.map((rf, i) => (
                                        <div key={i} className="p-4 bg-stone-50 rounded-xl border border-stone-100">
                                            <p className="text-sm font-bold text-stone-800 mb-3">{rf.factor}</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                                                    <p className="text-[10px] font-bold text-red-600 uppercase mb-1">Traditional Bank says</p>
                                                    <p className="text-sm text-stone-600">{rf.traditionalBankView}</p>
                                                </div>
                                                <div className="bg-teal-50 p-3 rounded-lg border border-teal-100">
                                                    <p className="text-[10px] font-bold text-teal-700 uppercase mb-1">Credzo AI sees</p>
                                                    <p className="text-sm text-stone-600">{rf.credzoView}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
