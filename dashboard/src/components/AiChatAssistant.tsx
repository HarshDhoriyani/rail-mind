"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import type { ChatMessage } from "@/lib/types";

const initialMessages: ChatMessage[] = [
  {
    id: "init",
    role: "assistant",
    text: "Welcome to RailMind Command Center. I can help you with:\n- Incident status and recommendations\n- Train delays and causes\n- Risk zone information\n- Emergency response coordination\n\nHow can I assist you today?",
    timestamp: new Date(),
  },
];

const responses: Record<string, string> = {
  "delay": "Train **12045** (Mumbai-Pune Intercity) is delayed by **12 minutes** due to signal congestion near Nashik. Estimated recovery: **18 minutes**. Suggested action: Run on platform 4 to reduce cascading delays.",
  "risk": "Current high-risk zones:\n- **Section A12** — Risk 82/100 (critical) — Heavy rain, high traffic, previous faults\n- **Section B7** — Risk 65/100 (high) — Poor track condition, sharp curvature\n- **Platform 3, Dadar** — Risk 92/100 — Fire hazard detected",
  "emergency": "Active emergencies:\n1. **Human Intrusion** — Section A12 (CRITICAL) — Person on track\n   → Stop trains, notify RPF, dispatch unit\n2. **Fire Hazard** — Platform 3, Dadar (CRITICAL) — Sparks near panel\n   → Evacuate, cut power, notify fire dept",
  "train": "Train **12045** — Mumbai-Pune Intercity\n- Status: Delayed (12 min)\n- Speed: 85 km/h\n- Location: Approaching Nashik\n- Passengers: ~850\n\nTrain **16346** — Netravati Express\n- Status: Critical (28 min delay)\n- Speed: 45 km/h\n- Location: Near Kalyan",
};

export default function AiChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    const lower = text.toLowerCase();
    let reply = "";
    if (lower.includes("delay")) reply = responses.delay;
    else if (lower.includes("risk") || lower.includes("danger") || lower.includes("zone")) reply = responses.risk;
    else if (lower.includes("emergency") || lower.includes("incident")) reply = responses.emergency;
    else if (lower.includes("train") || lower.includes("locomotive")) reply = responses.train;
    else reply = "I can help with:\n- Train delays and causes\n- Risk zone information\n- Active emergencies and recommendations\n- Incident coordination\n\nPlease ask about any of these topics.";

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        role: "assistant",
        text: reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700 flex flex-col h-[320px]">
      <div className="px-4 py-2 border-b border-slate-700 flex items-center gap-2">
        <Bot className="w-4 h-4 text-blue-400" />
        <h2 className="text-white text-sm font-semibold">AI Assistant</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "assistant" && (
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <Bot className="w-3 h-3 text-white" />
              </div>
            )}
            <div className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed whitespace-pre-line ${
              msg.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-200"
            }`}>
              {msg.text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
                part.startsWith("**") && part.endsWith("**")
                  ? <strong key={i} className="text-white">{part.slice(2, -2)}</strong>
                  : part
              )}
            </div>
            {msg.role === "user" && (
              <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0">
                <User className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="border-t border-slate-700 p-2 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about delays, risks, or emergencies..."
          className="flex-1 bg-slate-800 text-white text-xs rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-slate-500"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-3 py-2 transition"
        >
          <Send className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
