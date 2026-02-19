import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      return NextResponse.json(
        { error: "GEMINI_API_KEY not configured. Add your key to .env.local" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { bankStatement, pdfBase64, fileName } = body;

    const genAI = new GoogleGenerativeAI(apiKey);
    // Switching to 1.5-flash which has better free tier availability
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const analysisPrompt = `You are a senior credit analyst AI for Credzo.ai — a fintech platform providing alternative credit scoring for underbanked individuals in India who don't have CIBIL scores.

Your task: Analyze the bank statement data provided and generate a COMPREHENSIVE credit analysis.

IMPORTANT INSTRUCTIONS:
- Analyze every transaction you can find
- Look at 6 months of history if available
- Identify income patterns, spending patterns, and savings behavior
- Be specific with numbers and dates where possible

Return a JSON object with EXACTLY this structure (raw JSON only, no markdown):
{
  "scoreOverview": {
    "trustScore": <number 300-900>,
    "trustLevel": "<LOW TRUST | MODERATE TRUST | HIGH TRUST | EXCELLENT TRUST>",
    "scoreExplanation": "<3-4 sentence human-readable explanation of why this exact score was given>",
    "scoreBreakdown": {
      "incomeStability": <0-100>,
      "spendingDiscipline": <0-100>,
      "savingsBehavior": <0-100>,
      "paymentConsistency": <0-100>,
      "accountHealth": <0-100>
    }
  },
  "improvementSuggestions": {
    "whyThisScore": "<2-3 sentences explaining the primary reasons for this score>",
    "factors": [
      {"factor": "<specific transaction pattern or habit>", "impact": "<POSITIVE | NEGATIVE | NEUTRAL>", "detail": "<explanation>"}
    ],
    "actionableAdvice": [
      {"title": "<short title>", "description": "<specific actionable step>", "potentialImpact": "<e.g. +20-30 points>"}
    ]
  },
  "spendingAnalysis": {
    "categories": [
      {"name": "<category name>", "percentage": <number>, "amount": <number in INR>, "color": "<hex color>"}
    ],
    "totalSpending": <number>,
    "totalIncome": <number>,
    "savingsRate": <percentage number>,
    "spendingHabitsText": "<3-4 sentence text explanation of spending patterns>"
  },
  "aiInsights": {
    "financialHealthSummary": "<2-3 sentence overview of financial stability>",
    "riskLevel": "<Low Risk | Moderate Risk | High Risk>",
    "riskExplanation": "<why this risk level>",
    "spendingBehavior": {
      "patterns": ["<pattern 1>", "<pattern 2>", "<pattern 3>"],
      "unusualActivity": "<any unusual spending patterns detected or 'None detected'>",
      "consistencyScore": "<Highly Consistent | Moderately Consistent | Inconsistent>"
    }
  },
  "trustFactorAnalysis": {
    "positiveSignals": [
      {"signal": "<signal name>", "description": "<specific evidence from the statement>", "strength": "<Strong | Moderate | Weak>"}
    ],
    "missingSignals": [
      {"signal": "<what's missing>", "howToFix": "<how to address this>"}
    ],
    "riskFactors": [
      {"factor": "<risk factor>", "traditionalBankView": "<how a normal bank sees this>", "credzoView": "<how Credzo's AI interprets this differently>"}
    ]
  },
  "recommendedCreditLimit": <number in INR>,
  "scorePercentile": <number 1-100>
}`;

    // Build the content parts
    const parts: Part[] = [];

    // If PDF is provided, send it as inline data
    if (pdfBase64) {
      parts.push({
        inlineData: {
          mimeType: "application/pdf",
          data: pdfBase64,
        },
      });
      parts.push({
        text: `${analysisPrompt}\n\nThe bank statement PDF "${fileName || "statement.pdf"}" has been provided above. Analyze all transactions in detail.`,
      });
    } else {
      // Fallback to text input
      parts.push({
        text: `${analysisPrompt}\n\nBank Statement Data:\n${bankStatement || "Sample: Monthly income ₹18,000 from gig work (Swiggy/Zomato). Regular UPI payments for utilities (electricity ₹850, phone ₹299, WiFi ₹599). Grocery spending ₹3,500/month at BigBasket and local kirana. End-of-month balance averages ₹1,200. No bounced transactions. Consistent weekly deposits of ₹4,000-₹5,000. Occasional Zomato food orders ₹200-400. One-time medical expense ₹2,500."}`,
      });
    }

    const result = await model.generateContent(parts);
    const response = result.response;
    const text = response.text();

    // Parse the JSON from the response
    let analysis;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch {
      return NextResponse.json(
        { error: "Failed to parse AI response. Please try again.", rawResponse: text },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, analysis });
  } catch (error: any) {
    console.error("Analysis error:", error);

    let errorMessage = error.message || "Unknown error";
    if (errorMessage.includes("429") || errorMessage.includes("Quota exceeded")) {
      return NextResponse.json(
        { error: "Gemini API Quota Exceeded. Please wait a minute and try again. (Free tier limit reached)" },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Analysis failed: " + errorMessage },
      { status: 500 }
    );
  }
}
