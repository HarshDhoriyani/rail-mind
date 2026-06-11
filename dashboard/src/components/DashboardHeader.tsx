"use client";

import { useEffect, useState } from "react";
import { Clock, Wifi, WifiOff } from "lucide-react";

export default function DashboardHeader() {
  const [time, setTime] = useState(new Date());
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="bg-slate-900 border-b border-slate-700 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
          RM
        </div>
        <h1 className="text-white text-lg font-semibold">RailMind Command Center</h1>
      </div>
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2 text-slate-400">
          {connected ? <Wifi className="w-4 h-4 text-green-400" /> : <WifiOff className="w-4 h-4 text-red-400" />}
          <span className={connected ? "text-green-400" : "text-red-400"}>
            {connected ? "All Systems Online" : "Disconnected"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <Clock className="w-4 h-4" />
          <span className="text-white font-mono">{time.toLocaleTimeString()}</span>
        </div>
      </div>
    </header>
  );
}
