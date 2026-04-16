import { AlertCircle, ShieldAlert, FileWarning, Fingerprint } from "lucide-react";

const activities = [
  { id: 1, type: "phishing", message: "Suspicious email detected in HR department", time: "2 min ago", severity: "high", icon: ShieldAlert },
  { id: 2, type: "anomaly", message: "Multiple failed logins from IP 192.168.1.45", time: "15 min ago", severity: "medium", icon: Fingerprint },
  { id: 3, type: "code", message: "SQL Injection vulnerability found in Auth module", time: "1 hour ago", severity: "critical", icon: FileWarning },
  { id: 4, type: "deepfake", message: "Deepfake synthesis detected in video upload", time: "3 hours ago", severity: "high", icon: AlertCircle },
];

export function LiveActivityFeed() {
  return (
    <div className="space-y-4">
      {activities.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.id} className="flex items-start gap-4 p-4 rounded-lg bg-[#0B0F14] border border-[#1E293B] hover:border-[#00D4FF]/30 transition-colors cursor-default">
            <div className={`p-2 rounded-full ${item.severity === 'critical' ? 'bg-[#FF4D4F]/20 text-[#FF4D4F] glow-alert' : item.severity === 'high' ? 'bg-[#FF4D4F]/20 text-[#FF4D4F]' : 'bg-[#7A5CFF]/20 text-[#7A5CFF]'}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-[#E2E8F0] text-sm font-medium">{item.message}</p>
              <div className="flex items-center gap-3 mt-1 text-xs font-medium">
                <span className={`${item.severity === 'critical' || item.severity === 'high' ? 'text-[#FF4D4F]' : 'text-[#7A5CFF]'} uppercase tracking-wider`}>{item.severity}</span>
                <span className="text-[#94A3B8]">•</span>
                <span className="text-[#94A3B8]">{item.time}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
