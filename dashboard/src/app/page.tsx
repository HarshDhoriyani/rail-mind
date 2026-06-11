import DashboardHeader from "@/components/DashboardHeader";
import MapView from "@/components/MapView";
import CctvFeed from "@/components/CctvFeed";
import RiskAlertPanel from "@/components/RiskAlertPanel";
import EmergencyRecommendations from "@/components/EmergencyRecommendations";
import AiChatAssistant from "@/components/AiChatAssistant";

export default function Dashboard() {
  return (
    <div className="h-full flex flex-col">
      <DashboardHeader />
      <main className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 auto-rows-max">
          <div className="lg:col-span-2">
            <MapView />
          </div>
          <div>
            <CctvFeed />
          </div>
          <div>
            <RiskAlertPanel />
          </div>
          <div className="lg:col-span-2">
            <EmergencyRecommendations />
          </div>
          <div className="lg:col-span-3">
            <AiChatAssistant />
          </div>
        </div>
      </main>
    </div>
  );
}
