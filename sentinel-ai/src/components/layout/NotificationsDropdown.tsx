"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsDropdown({ isOpen, onClose }: NotificationsDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const notifications = [
    {
      id: 1,
      type: "critical",
      title: "Suspicious API Activity",
      message: "Multiple failed authentication attempts detected from IP 192.168.1.45.",
      time: "2 mins ago",
      icon: ShieldAlert,
      color: "text-[#FF4D4F]",
      bg: "bg-[#FF4D4F]/10",
      border: "border-[#FF4D4F]/20"
    },
    {
      id: 2,
      type: "warning",
      title: "Model Accuracy Drop",
      message: "Phishing detection model confidence fell below 95% threshold in the last hour.",
      time: "15 mins ago",
      icon: AlertTriangle,
      color: "text-[#FACC15]",
      bg: "bg-[#FACC15]/10",
      border: "border-[#FACC15]/20"
    },
    {
      id: 3,
      type: "info",
      title: "System Update Complete",
      message: "Sentinel AI engine successfully updated to v2.4.1.",
      time: "1 hour ago",
      icon: Info,
      color: "text-[#00D4FF]",
      bg: "bg-[#00D4FF]/10",
      border: "border-[#00D4FF]/20"
    },
    {
      id: 4,
      type: "success",
      title: "Threat Mitigated",
      message: "Automatically blocked simulated ransomware attack payload.",
      time: "3 hours ago",
      icon: CheckCircle2,
      color: "text-[#10B981]",
      bg: "bg-[#10B981]/10",
      border: "border-[#10B981]/20"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-16 right-16 w-96 max-h-[500px] overflow-hidden bg-[#0B0F14]/95 backdrop-blur-xl border border-[#1E293B] rounded-2xl shadow-2xl z-50 flex flex-col glassmorphism"
        >
          <div className="flex items-center justify-between p-4 border-b border-[#1E293B]/50 bg-[#121821]/50">
            <div>
              <h3 className="text-white font-medium">Notifications</h3>
              <p className="text-xs text-[#94A3B8]">You have 2 unread messages</p>
            </div>
            <button className="text-xs text-[#00D4FF] hover:text-white transition-colors">
              Mark all as read
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="flex flex-col">
                {notifications.map((notif) => {
                  const Icon = notif.icon;
                  return (
                    <div 
                      key={notif.id} 
                      className={`p-4 border-b border-[#1E293B]/50 hover:bg-[#1E293B]/30 transition-colors cursor-pointer flex gap-4 ${notif.id <= 2 ? 'bg-[#1E293B]/10' : ''}`}
                    >
                      <div className={`mt-1 p-2 rounded-lg shrink-0 ${notif.bg} ${notif.border} border`}>
                        <Icon className={`w-5 h-5 ${notif.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium text-white">{notif.title}</h4>
                          <span className="text-xs text-[#94A3B8]">{notif.time}</span>
                        </div>
                        <p className="text-sm text-[#94A3B8] leading-snug">{notif.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center text-[#94A3B8]">
                <Bell className="w-8 h-8 mx-auto mb-3 opacity-20" />
                <p>No new notifications</p>
              </div>
            )}
          </div>
          
          <div className="p-3 text-center border-t border-[#1E293B]/50 bg-[#121821]/50">
            <button className="text-sm text-[#94A3B8] hover:text-white transition-colors w-full">
              View all notification history
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
