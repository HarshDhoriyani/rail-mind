"use client";

import { useState, useEffect, useRef } from "react";
import { Camera, Play, Pause } from "lucide-react";

const CCTVS = [
  { id: "CAM-01", name: "Platform 1 - CSMT", src: "https://images.pexels.com/photos/1132968/pexels-photo-1132968.jpeg?auto=compress&cs=tinysrgb&w=640" },
  { id: "CAM-02", name: "Track Section A12", src: "https://images.pexels.com/photos/169813/pexels-photo-169813.jpeg?auto=compress&cs=tinysrgb&w=640" },
  { id: "CAM-03", name: "Main Concourse - Dadar", src: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=640" },
  { id: "CAM-04", name: "Platform 3 - Thane", src: "https://images.pexels.com/photos/1051073/pexels-photo-1051073.jpeg?auto=compress&cs=tinysrgb&w=640" },
];

export default function CctvFeed() {
  const [activeCam, setActiveCam] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setActiveCam((prev) => (prev + 1) % CCTVS.length);
    }, 5000);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
      <div className="px-4 py-2 border-b border-slate-700 flex items-center justify-between">
        <h2 className="text-white text-sm font-semibold flex items-center gap-2">
          <Camera className="w-4 h-4 text-blue-400" />
          CCTV Feed
        </h2>
        <button
          onClick={() => setPlaying(!playing)}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition"
        >
          {playing ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          {playing ? "Auto-rotate ON" : "Paused"}
        </button>
      </div>
      <div className="relative bg-black">
        <img
          src={CCTVS[activeCam].src}
          alt={CCTVS[activeCam].name}
          className="w-full h-[200px] object-cover"
        />
        <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white font-mono">
          {CCTVS[activeCam].id}
        </div>
        <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
          {CCTVS[activeCam].name}
        </div>
        <div className="absolute bottom-2 right-2 bg-red-600 px-2 py-0.5 rounded text-[10px] text-white font-mono animate-pulse">
          LIVE
        </div>
      </div>
      <div className="flex gap-1 p-2 overflow-x-auto">
        {CCTVS.map((cam, i) => (
          <button
            key={cam.id}
            onClick={() => { setActiveCam(i); setPlaying(false); }}
            className={`flex-shrink-0 w-16 h-10 rounded overflow-hidden border-2 transition ${
              i === activeCam ? "border-blue-500" : "border-transparent opacity-60 hover:opacity-90"
            }`}
          >
            <img src={cam.src} alt={cam.name} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
