"use client";

import { useState } from "react";
import { UploadCloud, Shield, AlertTriangle, ShieldCheck, Camera, Loader2, Fingerprint } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DeepfakeDetection() {
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleScan = async () => {
    if (!file) return;
    setIsScanning(true);
    setResult(null);
    setErrorMsg("");

    try {
      const res = await fetch("/api/deepfake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, fileType: file.type }),
      });
      const data = await res.json();
      
      if (res.ok && !data.error) {
        setResult(data);
      } else {
        setErrorMsg(data.error || "Analysis failed.");
      }
    } catch (e) {
      setErrorMsg("Network error connecting to deepfake detector.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-space-grotesk text-white flex items-center gap-3">
            <Shield className="w-8 h-8 text-[#7A5CFF]" />
            Deepfake & Media Authenticity
          </h1>
          <p className="text-[#94A3B8] mt-1">Detect synthetic GAN generation, face-swaps, and audio-visual manipulation.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
        {/* Upload Panel */}
        <div className="bg-[#121821] border border-[#1E293B] rounded-xl flex flex-col glassmorphism overflow-hidden">
           <div className="border-b border-[#1E293B] bg-[#0B0F14] px-4 py-3">
             <span className="text-sm font-medium text-[#94A3B8] uppercase tracking-wider">Media Target</span>
           </div>
           <div className="flex-1 p-6 flex flex-col">
              <div 
                onDragOver={(e) => e.preventDefault()} 
                onDrop={handleFileDrop}
                className={`flex-1 border-2 border-dashed ${file ? 'border-[#7A5CFF] bg-[#7A5CFF]/5' : 'border-[#1E293B] hover:border-[#475569]'} rounded-xl flex flex-col items-center justify-center text-center p-6 transition-all group`}
              >
                {!file ? (
                  <>
                    <UploadCloud className="w-12 h-12 text-[#475569] group-hover:text-[#94A3B8] mb-4 transition-colors" />
                    <h3 className="text-white font-medium mb-1">Drag & drop media file</h3>
                    <p className="text-[#94A3B8] text-sm">Supports MP4, JPG, PNG (Max 50MB)</p>
                    <label className="mt-6 px-4 py-2 bg-[#1E293B] text-white text-sm font-medium rounded-lg cursor-pointer hover:bg-[#334155] transition-colors">
                      Browse Files
                      <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                    </label>
                  </>
                ) : (
                  <>
                    <Camera className="w-12 h-12 text-[#7A5CFF] mb-4" />
                    <h3 className="text-white font-medium mb-1">{file.name}</h3>
                    <p className="text-[#94A3B8] text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <button onClick={() => setFile(null)} className="mt-4 text-sm text-[#FF4D4F] hover:underline">Remove File</button>
                  </>
                )}
              </div>

              <button 
                onClick={handleScan}
                disabled={isScanning || !file}
                className="mt-6 w-full bg-gradient-to-r from-[#7A5CFF] to-[#00D4FF] text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(122,92,255,0.3)] hover:shadow-[0_0_25px_rgba(122,92,255,0.5)] focus:outline-none focus:ring-2 focus:ring-[#7A5CFF] focus:ring-offset-2 focus:ring-offset-[#0B0F14]"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                     Extracting Neural Signatures...
                  </>
                ) : (
                  <>
                    <Fingerprint className="w-5 h-5" />
                    Authenticate Media
                  </>
                )}
              </button>
           </div>
        </div>

        {/* Results Panel */}
        <div className="bg-[#121821] border border-[#1E293B] rounded-xl glassmorphism overflow-hidden relative flex flex-col">
          {!result && !isScanning && !errorMsg && (
            <div className="flex-1 flex flex-col items-center justify-center text-[#475569] p-6 text-center">
              <Shield className="w-16 h-16 mb-4 opacity-50" />
              <p>Awaiting media payload.</p>
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
              <div className="absolute inset-0 bg-[#7A5CFF]/10 animate-pulse" />
              
              <div className="relative w-32 h-32 mb-6">
                <div className="absolute inset-0 border-4 border-dashed border-[#7A5CFF] rounded-full animate-[spin_4s_linear_infinite]" />
                <div className="absolute inset-2 border-4 border-dashed border-[#00D4FF] rounded-full animate-[spin_3s_linear_infinite_reverse]" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <Shield className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <p className="text-[#E2E8F0] font-mono typing-animation">Cross-referencing generative models...</p>
            </div>
          )}

          <AnimatePresence>
            {result && !isScanning && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 p-6 relative overflow-y-auto"
              >
                <div className="absolute top-0 right-0 p-4">
                  <div className={`px-4 py-2 rounded-full border text-sm font-bold uppercase tracking-wider ${result.riskScore > 50 ? 'bg-[#FF4D4F]/20 text-[#FF4D4F] border-[#FF4D4F]/50' : 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/50'}`}>
                    {result.authenticity}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-[#94A3B8] font-medium uppercase tracking-wider text-sm mb-4">Verification Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#0B0F14] border border-[#1E293B] rounded-lg p-4">
                      <p className="text-sm text-[#94A3B8] mb-1">Deepfake Prob.</p>
                      <p className={`text-3xl font-bold ${result.riskScore > 50 ? 'text-[#FF4D4F]' : 'text-white'}`}>{result.riskScore}%</p>
                    </div>
                    <div className="bg-[#0B0F14] border border-[#1E293B] rounded-lg p-4">
                      <p className="text-sm text-[#94A3B8] mb-1">AI Confidence</p>
                      <p className="text-3xl font-bold text-[#00D4FF]">{result.confidenceScore}%</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0B0F14] border border-[#1E293B] rounded-lg p-4 mb-6">
                   <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                     <AlertTriangle className="w-4 h-4 text-[#FF4D4F]" /> Analysis Report
                   </h4>
                   <p className="text-[#94A3B8] text-sm leading-relaxed">{result.explanation}</p>
                </div>

                {result.artifacts && (
                  <div>
                    <h4 className="text-white font-medium mb-3">Detected Manipulations</h4>
                    <ul className="space-y-2 text-sm text-[#E2E8F0]">
                      {result.artifacts.map((art: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D4F] glow-alert" />
                          {art}
                        </li>
                      ))}
                    </ul>
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
