const API_BASE_RISK = process.env.NEXT_PUBLIC_RISK_API || "http://localhost:8001";
const API_BASE_EMERGENCY = process.env.NEXT_PUBLIC_EMERGENCY_API || "http://localhost:8002";

export async function predictRisk(data: Record<string, unknown>) {
  const res = await fetch(`${API_BASE_RISK}/risk/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Risk prediction failed");
  return res.json();
}

export async function assessEmergency(data: Record<string, unknown>) {
  const res = await fetch(`${API_BASE_EMERGENCY}/emergency/assess`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Emergency assessment failed");
  return res.json();
}
