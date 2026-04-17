"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Bell, Key, Settings as SettingsIcon, Monitor, User, Lock, Database } from "lucide-react";
import { useState } from "react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "security", label: "Security Policies", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "api", label: "API & Integrations", icon: Key },
    { id: "account", label: "Account", icon: User },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Appearance</h3>
              <div className="flex items-center justify-between p-4 bg-[#121821] rounded-xl border border-[#1E293B]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#1E293B] rounded-lg text-[#00D4FF]">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Dark Mode</p>
                    <p className="text-sm text-[#94A3B8]">Toggle the application theme</p>
                  </div>
                </div>
                <div className="w-12 h-6 bg-[#00D4FF] rounded-full relative cursor-pointer shadow-[0_0_10px_rgba(0,212,255,0.3)]">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-all"></div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-4">Dashboard Layout</h3>
              <div className="space-y-3">
                {[
                  { label: "Compact Mode", desc: "Display more items per page" },
                  { label: "Show Threat Map", desc: "Display the global threat matrix on dashboard" },
                ].map((setting, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-[#121821] rounded-xl border border-[#1E293B]">
                    <div>
                      <p className="text-white font-medium">{setting.label}</p>
                      <p className="text-sm text-[#94A3B8]">{setting.desc}</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#00D4FF] cursor-pointer" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "security":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Threat Detection</h3>
              <div className="space-y-3">
                <div className="p-4 bg-[#121821] rounded-xl border border-[#1E293B]">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-white font-medium">AI Sensitivity Level</p>
                      <p className="text-sm text-[#94A3B8]">Adjust the strictness of the scanner</p>
                    </div>
                    <span className="text-[#00D4FF] font-medium bg-[#1E293B] px-3 py-1 rounded-lg">High</span>
                  </div>
                  <input type="range" className="w-full accent-[#00D4FF]" min="1" max="100" defaultValue="85" />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-[#121821] rounded-xl border border-[#1E293B]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#1E293B] rounded-lg text-[#FF4D4F]">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Auto-Ban Malicious IPs</p>
                      <p className="text-sm text-[#94A3B8]">Automatically block IPs with critical severity</p>
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-[#00D4FF] rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-all"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "api":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
             <div>
              <h3 className="text-lg font-medium text-white mb-4">API Configurations</h3>
              <div className="p-4 bg-[#121821] rounded-xl border border-[#1E293B]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[#1E293B] rounded-lg text-[#FACC15]">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Gemini API Key</p>
                      <p className="text-sm text-[#94A3B8]">Connected to AI detection engine</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="password" 
                      value="********************************" 
                      readOnly
                      className="w-full bg-[#0B0F14] border border-[#1E293B] rounded-lg py-2 px-3 text-[#94A3B8] focus:outline-none"
                    />
                    <button className="px-4 py-2 bg-[#1E293B] text-white rounded-lg hover:bg-[#334155] transition-colors">
                      Edit
                    </button>
                  </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-64 text-[#94A3B8]">
            Settings for {activeTab} are coming soon.
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[70vh] bg-[#0B0F14]/90 backdrop-blur-xl border border-[#1E293B] rounded-2xl shadow-2xl z-50 flex overflow-hidden glassmorphism"
          >
            {/* Sidebar */}
            <div className="w-64 border-r border-[#1E293B] p-6 bg-[#0B0F14]/50">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold text-white">Settings</h2>
              </div>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === tab.id
                          ? "bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20 shadow-[0_0_15px_rgba(0,212,255,0.1)]"
                          : "text-[#94A3B8] hover:bg-[#1E293B] hover:text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col">
              <div className="flex justify-end p-4 border-b border-[#1E293B]/50">
                 <button 
                  onClick={onClose}
                  className="p-2 text-[#94A3B8] hover:text-white hover:bg-[#FF4D4F]/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8 flex-1 overflow-y-auto">
                {renderContent()}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
