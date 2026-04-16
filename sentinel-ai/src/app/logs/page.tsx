"use client";

import { useState, useEffect } from "react";
import { Activity, Play, Square, Filter, AlertTriangle, ShieldCheck } from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  source: string;
  event: string;
  severity: "low" | "medium" | "high" | "critical";
}

const mockLogs: LogEntry[] = [
  { id: "L-001", timestamp: "10:42:01", source: "Auth Service", event: "User login successful", severity: "low" },
  { id: "L-002", timestamp: "10:42:15", source: "API Gateway", event: "Rate limit exceeded for IP 192.168.1.100", severity: "medium" },
  { id: "L-003", timestamp: "10:45:22", source: "Database", event: "Multiple failed connection attempts", severity: "high" },
  { id: "L-004", timestamp: "10:46:10", source: "Auth Service", event: "Admin access granted to unknown device", severity: "critical" },
];

export default function LogsMonitor() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // Simulation of log stream
  useEffect(() => {
    if (!isStreaming) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      setLogs(prev => {
        const newLog = mockLogs[currentIndex % mockLogs.length];
        const nextId = "L-" + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return [{...newLog, id: nextId, timestamp: new Date().toLocaleTimeString()}, ...prev].slice(0, 50);
      });
      currentIndex++;
    }, 2000);

    return () => clearInterval(interval);
  }, [isStreaming]);

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-space-grotesk text-white flex items-center gap-3">
            <Activity className="w-8 h-8 text-[#00D4FF]" />
            Security Logs Monitor
          </h1>
          <p className="text-[#94A3B8] mt-1">Real-time anomaly detection and system event tracking.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#121821] border border-[#1E293B] text-[#E2E8F0] rounded-lg flex items-center gap-2 hover:bg-[#1E293B]">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button 
            onClick={() => setIsStreaming(!isStreaming)}
            className={`px-4 py-2 ${isStreaming ? 'bg-[#FF4D4F]/20 text-[#FF4D4F] border-[#FF4D4F]/50 hover:bg-[#FF4D4F]/30' : 'bg-[#00D4FF]/20 text-[#00D4FF] border-[#00D4FF]/50 hover:bg-[#00D4FF]/30'} border rounded-lg flex items-center gap-2 transition-colors`}
          >
            {isStreaming ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />} 
            {isStreaming ? "Stop Stream" : "Live Stream"}
          </button>
        </div>
      </div>

      <div className="bg-[#121821] border border-[#1E293B] rounded-xl glassmorphism flex flex-col flex-1 min-h-0 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#1E293B] text-sm font-medium text-[#94A3B8] tracking-wider uppercase bg-[#0B0F14]/50">
          <div className="col-span-2">Timestamp</div>
          <div className="col-span-2">Source</div>
          <div className="col-span-6">Event Details</div>
          <div className="col-span-2 text-right">Severity</div>
        </div>
        
        {/* Logs List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          {logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[#475569]">
              <Activity className="w-12 h-12 mb-4 opacity-50" />
              <p>No anomalous activity detected recently.</p>
              <p className="text-xs mt-1">Click [Live Stream] to begin monitoring system events.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {logs.map((log) => (
                <div 
                  key={log.id} 
                  className={`grid grid-cols-12 gap-4 p-3 rounded-lg border items-center text-sm ${log.severity === 'critical' ? 'bg-[#FF4D4F]/10 border-[#FF4D4F]/30 shadow-[inset_0_0_10px_rgba(255,77,79,0.1)] glow-alert-subtle' : log.severity === 'high' ? 'bg-[#FF4D4F]/5 border-[#FF4D4F]/20' : log.severity === 'medium' ? 'bg-[#7A5CFF]/10 border-[#7A5CFF]/20' : 'bg-[#0B0F14] border-[#1E293B]'}`}
                >
                  <div className="col-span-2 font-mono text-[#94A3B8]">{log.timestamp}</div>
                  <div className="col-span-2 text-white">{log.source}</div>
                  <div className="col-span-6 text-[#E2E8F0]">{log.event}</div>
                  <div className="col-span-2 flex justify-end">
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                      ${log.severity === 'critical' ? 'bg-[#FF4D4F]/20 text-[#FF4D4F]' : 
                        log.severity === 'high' ? 'bg-[#FF4D4F]/10 text-[#FF4D4F]' : 
                        log.severity === 'medium' ? 'bg-[#7A5CFF]/20 text-[#7A5CFF]' : 
                        'bg-[#00D4FF]/10 text-[#00D4FF]'}`}
                    >
                      {log.severity === 'low' ? <ShieldCheck className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      {log.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
