import { RiskChart } from "@/components/dashboard/RiskChart";
import { LiveActivityFeed } from "@/components/dashboard/LiveActivityFeed";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-space-grotesk text-white">Security Overview</h1>
          <p className="text-[#94A3B8] mt-1">Real-time threat intelligence and system monitoring.</p>
        </div>
      </div>
      
      {/* Top Value Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#121821] border border-[#1E293B] rounded-xl p-6 glassmorphism">
          <h3 className="text-[#94A3B8] font-medium mb-2">Total Threats Handled</h3>
          <p className="text-3xl font-bold text-white">1,248</p>
          <div className="mt-4 flex items-center text-sm font-medium text-emerald-400">
            <span>+12.5% from last week</span>
          </div>
        </div>
        <div className="bg-[#121821] border border-[#1E293B] rounded-xl p-6 glassmorphism relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <div className="w-24 h-24 bg-[#FF4D4F] rounded-full blur-3xl"></div>
          </div>
          <h3 className="text-[#94A3B8] font-medium mb-2">Active Critical Alerts</h3>
          <p className="text-3xl font-bold text-[#FF4D4F] glow-text">12</p>
          <div className="mt-4 flex items-center text-sm font-medium text-[#FF4D4F]">
            <span>Requires immediate attention</span>
          </div>
        </div>
        <div className="bg-[#121821] border border-[#1E293B] rounded-xl p-6 glassmorphism">
          <h3 className="text-[#94A3B8] font-medium mb-2">System AI Health</h3>
          <p className="text-3xl font-bold text-[#00D4FF] glow-accent">98.5%</p>
          <div className="mt-4 flex items-center text-sm font-medium text-[#00D4FF]">
            <span>All AI models operational</span>
          </div>
        </div>
      </div>

      {/* Main Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#121821] border border-[#1E293B] rounded-xl p-6 glassmorphism">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Threat Volume (Last 24h)</h2>
          </div>
          <RiskChart />
        </div>
        <div className="bg-[#121821] border border-[#1E293B] rounded-xl p-6 glassmorphism flex flex-col">
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-lg font-bold text-white">Live Activity Feed</h2>
          </div>
          <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
            <LiveActivityFeed />
          </div>
        </div>
      </div>
    </div>
  );
}
