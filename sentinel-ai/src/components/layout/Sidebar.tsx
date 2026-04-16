import { Activity, ShieldAlert, FileCode2, Shield, LayoutDashboard } from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Phishing Detection", href: "/phishing", icon: ShieldAlert },
  { name: "Log Monitor", href: "/logs", icon: Activity },
  { name: "Code Scanner", href: "/scanner", icon: FileCode2 },
  { name: "Deepfake Detection", href: "/deepfake", icon: Shield },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-[#1E293B] bg-[#0B0F14] flex flex-col h-full shrink-0 z-10 glassmorphism relative">
      <div className="p-6 border-b border-[#1E293B]">
        <h1 className="text-2xl font-bold font-space-grotesk text-white flex items-center gap-2">
          <Shield className="w-8 h-8 text-[#00D4FF] glow-accent" />
          Sentinel AI
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-2 relative overflow-y-auto">
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#1E293B]/10 to-transparent pointer-events-none" />
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#121821] hover:shadow-[inset_2px_0_0_0_#00D4FF] transition-all group"
            >
              <Icon className="w-5 h-5 group-hover:text-[#00D4FF] transition-colors" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-[#1E293B]">
        <div className="flex items-center gap-3 px-4 py-2 hover:bg-[#121821] rounded-lg cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-[#121821] border border-[#1E293B] shadow-[0_0_10px_rgba(122,92,255,0.3)] flex items-center justify-center">
            <span className="text-sm font-bold text-[#7A5CFF]">SA</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white line-clamp-1">System Admin</p>
            <p className="text-xs text-[#00D4FF]">Level 5 Clearance</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
