"use client";
import { Bell, Search, Settings } from "lucide-react";
import { useState } from "react";
import { SettingsModal } from "./SettingsModal";
import { NotificationsDropdown } from "./NotificationsDropdown";

export function Topbar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
    if (!isSettingsOpen) setIsNotificationsOpen(false); // Close notifications when opening settings
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (!isNotificationsOpen) setIsSettingsOpen(false);
  };

  return (
    <>
      <header className="h-16 border-b border-[#1E293B] bg-[#0B0F14]/90 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-10 glassmorphism relative">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-96 max-w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search threats, IPs, hashes..."
              className="w-full bg-[#121821] border border-[#1E293B] rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#00D4FF] focus:shadow-[0_0_10px_rgba(0,212,255,0.2)] transition-all"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 relative">
          <button 
            onClick={toggleNotifications}
            className={`p-2 transition-colors relative ${isNotificationsOpen ? 'text-white' : 'text-[#94A3B8] hover:text-[#00D4FF]'}`}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF4D4F] rounded-full glow-alert ring-2 ring-[#0B0F14]"></span>
          </button>
          <button 
            onClick={toggleSettings}
            className={`p-2 transition-colors ${isSettingsOpen ? 'text-white' : 'text-[#94A3B8] hover:text-white'}`}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>
      
      <NotificationsDropdown 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />
      
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
}
