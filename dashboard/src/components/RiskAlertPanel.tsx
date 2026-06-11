"use client";

import { useState } from "react";
import { Bell, AlertTriangle, Flame, BaggageClaim, PersonStanding, TrainTrack } from "lucide-react";
import { alerts } from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";

const iconMap: Record<string, React.ReactNode> = {
  human_intrusion: <PersonStanding className="w-4 h-4" />,
  fire_hazard: <Flame className="w-4 h-4" />,
  unattended_object: <BaggageClaim className="w-4 h-4" />,
  track_obstacle: <TrainTrack className="w-4 h-4" />,
  crowd_density: <AlertTriangle className="w-4 h-4" />,
};

function severityColor(severity: string) {
  switch (severity) {
    case "critical": return "border-red-500 bg-red-500/10";
    case "high": return "border-orange-500 bg-orange-500/10";
    case "medium": return "border-yellow-500 bg-yellow-500/10";
    default: return "border-slate-500 bg-slate-500/10";
  }
}

function severityBadge(severity: string) {
  switch (severity) {
    case "critical": return "bg-red-600";
    case "high": return "bg-orange-500";
    case "medium": return "bg-yellow-500";
    default: return "bg-slate-500";
  }
}

export default function RiskAlertPanel() {
  const sorted = [...alerts].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
      <div className="px-4 py-2 border-b border-slate-700 flex items-center justify-between">
        <h2 className="text-white text-sm font-semibold flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-400" />
          Active Alerts
        </h2>
        <span className="text-xs text-slate-400">{alerts.length} active</span>
      </div>
      <div className="divide-y divide-slate-700/50 max-h-[320px] overflow-y-auto">
        {sorted.map((alert) => (
          <div key={alert.id} className={`px-4 py-3 border-l-2 ${severityColor(alert.severity)}`}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-slate-300 flex-shrink-0">{iconMap[alert.type] || <AlertTriangle className="w-4 h-4" />}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-medium truncate">{alert.label}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold text-white uppercase ${severityBadge(alert.severity)}`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{alert.location}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{alert.description}</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 whitespace-nowrap flex-shrink-0">
                {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
