import { Train, Station, RiskZone, Alert, EmergencyRecommendation } from "./types";

export const trains: Train[] = [
  { id: "12045", name: "Mumbai-Pune Intercity", lat: 19.076, lng: 72.877, speed: 85, status: "delayed", delay_minutes: 12 },
  { id: "12123", name: "Deccan Queen", lat: 18.975, lng: 73.072, speed: 92, status: "on_time", delay_minutes: 0 },
  { id: "11027", name: "Chennai Express", lat: 19.124, lng: 72.851, speed: 65, status: "on_time", delay_minutes: 0 },
  { id: "16346", name: "Netravati Express", lat: 19.210, lng: 72.825, speed: 45, status: "critical", delay_minutes: 28 },
  { id: "22105", name: "Indrayani Express", lat: 18.890, lng: 73.115, speed: 110, status: "on_time", delay_minutes: 0 },
  { id: "12115", name: "Siddheshwar Express", lat: 19.045, lng: 72.940, speed: 70, status: "delayed", delay_minutes: 8 },
];

export const stations: Station[] = [
  { id: "S1", name: "Chhatrapati Shivaji Maharaj Terminus", lat: 18.940, lng: 72.835, crowd_density: "high" },
  { id: "S2", name: "Dadar", lat: 19.018, lng: 72.844, crowd_density: "critical" },
  { id: "S3", name: "Kalyan", lat: 19.235, lng: 73.129, crowd_density: "medium" },
  { id: "S4", name: "Thane", lat: 19.218, lng: 72.978, crowd_density: "high" },
  { id: "S5", name: "Nashik Road", lat: 19.959, lng: 73.825, crowd_density: "low" },
  { id: "S6", name: "Igatpuri", lat: 19.700, lng: 73.550, crowd_density: "low" },
  { id: "S7", name: "Panvel", lat: 19.000, lng: 73.105, crowd_density: "medium" },
  { id: "S8", name: "Lonavala", lat: 18.748, lng: 73.405, crowd_density: "low" },
];

export const riskZones: RiskZone[] = [
  { id: "R1", section: "A12", lat: 19.080, lng: 72.880, radius: 1200, risk_score: 82, risk_category: "critical", top_factors: ["Heavy rain", "High traffic", "Previous fault reports"] },
  { id: "R2", section: "B7", lat: 19.150, lng: 72.900, radius: 800, risk_score: 65, risk_category: "high", top_factors: ["Track condition: poor", "Curvature > 8deg"] },
  { id: "R3", section: "C4", lat: 18.960, lng: 72.860, radius: 1000, risk_score: 45, risk_category: "elevated", top_factors: ["Crowd density: high", "Level crossing present"] },
  { id: "R4", section: "D9", lat: 19.220, lng: 73.100, radius: 600, risk_score: 20, risk_category: "low", top_factors: ["Routine monitoring"] },
];

export const alerts: Alert[] = [
  { id: "A1", type: "human_intrusion", label: "Human Intrusion", location: "Section A12, km 45", severity: "critical", timestamp: new Date(Date.now() - 2 * 60000), description: "Person detected walking on tracks" },
  { id: "A2", type: "fire_hazard", label: "Fire Hazard", location: "Platform 3, Dadar", severity: "critical", timestamp: new Date(Date.now() - 5 * 60000), description: "Sparks detected near electrical panel" },
  { id: "A3", type: "unattended_object", label: "Unattended Object", location: "CSMT, Main Concourse", severity: "high", timestamp: new Date(Date.now() - 15 * 60000), description: "Suspicious bag near ticket counter" },
  { id: "A4", type: "track_obstacle", label: "Track Obstacle", location: "Section B7, near Kalyan", severity: "medium", timestamp: new Date(Date.now() - 30 * 60000), description: "Debris reported on track" },
  { id: "A5", type: "crowd_density", label: "Overcrowding", location: "Thane Station", severity: "high", timestamp: new Date(Date.now() - 45 * 60000), description: "Platform density exceeding threshold" },
];

export const emergencyRecommendations: EmergencyRecommendation[] = [
  {
    id: "ER1",
    incident_type: "human_intrusion",
    location: "Section A12, between Nashik and Igatpuri",
    severity: "critical",
    category: "Human Intrusion",
    escalation_level: "critical",
    summary: "Person detected walking on track at km marker 45/2. Immediate action required.",
    actions: [
      { step: 1, action: "Stop all trains approaching the affected section", priority: "immediate", assigned_to: "Train Controller" },
      { step: 2, action: "Notify nearest station master", priority: "immediate", assigned_to: "Station Master" },
      { step: 3, action: "Activate platform announcement system", priority: "short_term", assigned_to: "Control Room" },
      { step: 4, action: "Alert Railway Protection Force (RPF)", priority: "short_term", assigned_to: "RPF Control" },
      { step: 5, action: "Dispatch emergency response unit to location", priority: "ongoing", assigned_to: "Dispatch" },
    ],
  },
  {
    id: "ER2",
    incident_type: "fire_hazard",
    location: "Platform 3, Dadar Station",
    severity: "critical",
    category: "Fire Hazard",
    escalation_level: "critical",
    summary: "Sparks and smoke detected near electrical panel. Immediate evacuation required.",
    actions: [
      { step: 1, action: "Stop all trains in the affected zone", priority: "immediate", assigned_to: "Train Controller" },
      { step: 2, action: "Activate fire suppression system", priority: "immediate", assigned_to: "Station Master" },
      { step: 3, action: "Notify fire department immediately", priority: "short_term", assigned_to: "Fire Dept" },
      { step: 4, action: "Evacuate nearby structures and platforms", priority: "short_term", assigned_to: "Station Staff" },
      { step: 5, action: "Cut off power supply to the section", priority: "ongoing", assigned_to: "Power Control" },
    ],
  },
];
