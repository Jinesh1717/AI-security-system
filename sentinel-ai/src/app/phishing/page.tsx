"use client";

import { useState } from "react";
import { ShieldAlert, Send, ScanLine, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PhishingDetection() {
  const [input, setInput] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleScan = async () => {
    if (!input.trim()) return;
    setIsScanning(true);
    setResult(null);
    setErrorMsg("");

    try {
      const res = await fetch("/api/phishing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      
      if (res.ok && !data.error) {
        setResult(data);
      } else {
        setErrorMsg(data.error || "Failed to analyze. Did you set GEMINI_API_KEY in .env.local?");
      }
    } catch (e) {
      console.error(e);
      setErrorMsg("Network error connecting to detection backend.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-space-grotesk text-white flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-[#7A5CFF]" />
            Phishing Detection Engine
          </h1>
          <p className="text-[#94A3B8] mt-1">Analyze emails, URLs, or SMS for malicious intents using Gemini.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
        {/* Input Panel */}
        <div className="bg-[#121821] border border-[#1E293B] rounded-xl p-6 glassmorphism flex flex-col">
          <label className="text-sm font-medium text-[#94A3B8] mb-2 uppercase tracking-wider">Target Content</label>
          <textarea 
            className="flex-1 bg-[#0B0F14] border border-[#1E293B] rounded-lg p-4 text-[#E2E8F0] placeholder-[#475569] resize-none focus:outline-none focus:border-[#7A5CFF] focus:shadow-[0_0_15px_rgba(122,92,255,0.2)] transition-all font-mono text-sm CustomScrollbar"
            placeholder="Paste suspicious email text, SMS message, or URL here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            onClick={handleScan}
            disabled={isScanning || !input}
            className="mt-4 w-full bg-[#7A5CFF] hover:bg-[#6246E5] text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group focus:outline-none focus:ring-2 focus:ring-[#7A5CFF] focus:ring-offset-2 focus:ring-offset-[#0B0F14]"
          >
            {isScanning ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing Patterns...
              </>
            ) : (
              <>
                <ScanLine className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Initialize Scan
              </>
            )}
          </button>
        </div>

        {/* Results Panel */}
        <div className="bg-[#121821] border border-[#1E293B] rounded-xl glassmorphism overflow-hidden relative flex flex-col">
          {!result && !isScanning && !errorMsg && (
            <div className="flex-1 flex flex-col items-center justify-center text-[#475569]">
              <ShieldAlert className="w-16 h-16 mb-4 opacity-50" />
              <p>Awaiting input for analysis...</p>
            </div>
          )}

          {errorMsg && !isScanning && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <AlertTriangle className="w-16 h-16 text-[#FF4D4F] mb-4 glow-alert" />
              <p className="text-[#FF4D4F] font-medium">{errorMsg}</p>
            </div>
          )}

          {isScanning && (
            <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[#7A5CFF]/5 animate-pulse" />
              <ScanLine className="w-16 h-16 text-[#7A5CFF] animate-bounce mb-4 glow-accent" />
              <p className="text-[#00D4FF] font-mono typing-animation">Running Neural Analysis...</p>
            </div>
          )}

          <AnimatePresence>
            {result && !isScanning && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex-1 p-6 relative overflow-y-auto ${result.severity === 'high' || result.severity === 'critical' ? 'shadow-[inset_0_0_100px_rgba(255,77,79,0.05)]' : 'shadow-[inset_0_0_100px_rgba(0,212,255,0.05)]'}`}
              >
                <div className={`absolute top-0 left-0 w-full h-1 ${result.severity === 'high' || result.severity === 'critical' ? 'bg-[#FF4D4F] glow-alert' : 'bg-[#00D4FF] glow-accent'}`} />
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#0B0F14] border border-[#1E293B] rounded-lg p-4 flex flex-col items-center justify-center relative overflow-hidden">
                    <h3 className="text-[#94A3B8] text-sm font-medium mb-1 z-10">Risk Score</h3>
                    <p className={`text-4xl font-bold z-10 ${result.severity === 'high' || result.severity === 'critical' ? 'text-[#FF4D4F]' : 'text-[#00D4FF]'}`}>
                      {result.riskScore}<span className="text-xl text-[#475569]">/100</span>
                    </p>
                    <div className={`absolute -bottom-10 -right-10 w-32 h-32 blur-3xl opacity-20 ${result.severity === 'high' || result.severity === 'critical' ? 'bg-[#FF4D4F]' : 'bg-[#00D4FF]'}`} />
                  </div>
                  <div className="bg-[#0B0F14] border border-[#1E293B] rounded-lg p-4 flex flex-col items-center justify-center">
                    <h3 className="text-[#94A3B8] text-sm font-medium mb-1">Confidence</h3>
                    <p className="text-4xl font-bold text-white">{result.confidenceScore}%</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                    {result.severity === 'high' || result.severity === 'critical' ? <AlertTriangle className="w-5 h-5 text-[#FF4D4F]" /> : <CheckCircle className="w-5 h-5 text-[#00D4FF]" />}
                    AI Threat Explanation
                  </h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed bg-[#0B0F14] border border-[#1E293B] p-4 rounded-lg">
                    {result.explanation}
                  </p>
                </div>

                {result.suspiciousPhrases && result.suspiciousPhrases.length > 0 && (
                  <div>
                    <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                       Flags & Artifacts
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.suspiciousPhrases.map((phrase: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-[#FF4D4F]/10 border border-[#FF4D4F]/30 text-[#FF4D4F] rounded-full text-xs font-medium">
                          "{phrase}"
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
