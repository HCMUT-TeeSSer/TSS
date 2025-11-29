import { BookOpen, MessageCircle, Calendar, BarChart2 } from "lucide-react";

export type TabKey = "content" | "docs" | "meet" | "do";

interface ProgramTabsProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export default function ProgramTabs({ activeTab, onTabChange }: ProgramTabsProps) {
  const tabs = [
    { id: "content", label: "Nội dung", icon: BookOpen },
    { id: "docs", label: "Buổi tư vấn", icon: MessageCircle },
    { id: "meet", label: "Lịch hẹn", icon: Calendar },
    { id: "do", label: "Năng lực", icon: BarChart2 },
  ];

  return (
    <div className='mt-6 flex gap-8 border-b border-gray-100 px-6'>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => {
              onTabChange(tab.id as TabKey);
            }}
            className={`group relative flex items-center gap-2 pb-4 text-sm font-medium transition-colors ${
              isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon className={`h-4 w-4 ${isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}`} />
            {tab.label}
            {isActive && <span className='absolute bottom-0 left-0 h-0.5 w-full rounded-t-full bg-blue-600'></span>}
          </button>
        );
      })}
    </div>
  );
}
