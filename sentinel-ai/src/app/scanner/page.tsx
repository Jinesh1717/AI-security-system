"use client";

import { useState } from "react";
import { FileCode2, ScanLine, AlertTriangle, ShieldCheck, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CodeScanner() {
  const [code, setCode] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleScan = async () => {
    if (!code.trim()) return;
    setIsScanning(true);
    setResult(null);
    setErrorMsg("");

    try {
      const res = await fetch("/api/scanner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      
      if (res.ok && !data.error) {
        setResult(data);
      } else {
        setErrorMsg(data.error || "Analysis failed. Did you set GEMINI_API_KEY in .env.local?");
      }
    } catch (e) {
      console.error(e);
      setErrorMsg("Network error connecting to scanner backend.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-space-grotesk text-white flex items-center gap-3">
            <FileCode2 className="w-8 h-8 text-[#00D4FF]" />
            Code Vulnerability Scanner
          </h1>
          <p className="text-[#94A3B8] mt-1">SAST engine: Paste source code to detect Zero-Days and OWASP vulnerabilities.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
        {/* Editor Panel */}
        <div className="bg-[#121821] border border-[#1E293B] rounded-xl flex flex-col overflow-hidden glassmorphism">
          <div className="border-b border-[#1E293B] bg-[#0B0F14] px-4 py-3 flex items-center justify-between">
             <span className="text-sm font-medium text-[#94A3B8] uppercase tracking-wider">Source Code Payload</span>
          </div>
          <div className="flex-1 p-4 flex flex-col relative">
            <textarea 
              className="flex-1 bg-[#0B0F14] border border-[#1E293B] rounded-lg p-4 text-[#A7F3D0] placeholder-[#475569] resize-none focus:outline-none focus:border-[#00D4FF] focus:shadow-[0_0_15px_rgba(0,212,255,0.1)] transition-all font-mono text-sm custom-scrollbar"
              placeholder="// Paste your JavaScript, Python, C++, etc. here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button 
              onClick={handleScan}
              disabled={isScanning || !code}
              className="mt-4 w-full bg-[#00D4FF] hover:bg-[#00B4D8] text-[#0B0F14] py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isScanning ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Compiling AST & Analyzing...
                </>
              ) : (
                <>
                  <ScanLine className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Run Security Audit
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-[#121821] border border-[#1E293B] rounded-xl glassmorphism overflow-hidden relative flex flex-col">
          {!result && !isScanning && !errorMsg && (
            <div className="flex-1 flex flex-col items-center justify-center text-[#475569] p-6 text-center">
              <FileCode2 className="w-16 h-16 mb-4 opacity-50" />
              <p>Awaiting source payload.</p>
              <p className="text-sm mt-2 max-w-sm">Models will map AST to known CVE chains and structural vulnerability patterns.</p>
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
              <div className="absolute inset-0 bg-[#00D4FF]/5 animate-pulse" />
              <ScanLine className="w-16 h-16 text-[#00D4FF] animate-bounce mb-4 glow-accent" />
              <p className="text-[#E2E8F0] font-mono typing-animation">Scanning syntax tree...</p>
            </div>
          )}

          <AnimatePresence>
            {result && !isScanning && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 p-6 relative overflow-y-auto custom-scrollbar"
              >
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#1E293B]">
                  <div>
                    <h3 className="text-[#94A3B8] font-medium">Repository Risk Index</h3>
                    <div className="flex items-end gap-2 mt-1">
                      <p className={`text-4xl font-bold ${result.riskScore > 50 ? 'text-[#FF4D4F] glow-alert' : 'text-[#00D4FF]'}`}>
                        {result.riskScore}
                      </p>
                      <span className="text-xl text-[#475569] mb-1">/100</span>
                    </div>
                  </div>
                  <div className={`p-4 rounded-full ${result.riskScore > 50 ? 'bg-[#FF4D4F]/10 text-[#FF4D4F]' : 'bg-[#00D4FF]/10 text-[#00D4FF]'}`}>
                    {result.riskScore > 50 ? <AlertTriangle className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-medium mb-2">Detected Vulnerabilities</h3>
                  {(!result.vulnerabilities || result.vulnerabilities.length === 0) ? (
                     <div className="bg-[#0B0F14] border border-[#1E293B] rounded-lg p-6 text-center text-[#00D4FF]">
                        No critical vulnerabilities detected in the provided snippet.
                     </div>
                  ) : (
                    result.vulnerabilities.map((vuln: any, idx: number) => (
                      <div key={idx} className="bg-[#0B0F14] border border-[#1E293B] rounded-lg p-4 relative overflow-hidden">
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${vuln.severity === 'critical' ? 'bg-[#FF4D4F]' : vuln.severity === 'high' ? 'bg-orange-500' : 'bg-[#7A5CFF]'}`} />
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded bg-opacity-20 ${vuln.severity === 'critical' ? 'text-[#FF4D4F] bg-[#FF4D4F]' : vuln.severity === 'high' ? 'text-orange-500 bg-orange-500' : 'text-[#7A5CFF] bg-[#7A5CFF]'}`}>
                            {vuln.severity}
                          </span>
                          <span className="text-[#94A3B8] text-sm font-mono filter drop-shadow">Line: {vuln.line || 'N/A'}</span>
                        </div>
                        <h4 className="text-white font-medium mb-1">{vuln.issue}</h4>
                        <p className="text-[#94A3B8] text-sm">Suggested Fix: <span className="text-[#E2E8F0]">{vuln.fix}</span></p>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
