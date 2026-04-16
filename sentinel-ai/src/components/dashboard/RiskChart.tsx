"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { time: "00:00", threats: 12 },
  { time: "04:00", threats: 25 },
  { time: "08:00", threats: 45 },
  { time: "12:00", threats: 30 },
  { time: "16:00", threats: 80 },
  { time: "20:00", threats: 40 },
  { time: "24:00", threats: 15 },
];

export function RiskChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF4D4F" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FF4D4F" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" stroke="#1E293B" tick={{ fill: "#94A3B8", fontSize: 12 }} />
          <YAxis stroke="#1E293B" tick={{ fill: "#94A3B8", fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: "#121821", borderColor: "#1E293B", color: "#E2E8F0" }}
            itemStyle={{ color: "#FF4D4F" }}
          />
          <Area type="monotone" dataKey="threats" stroke="#FF4D4F" fillOpacity={1} fill="url(#colorThreats)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
