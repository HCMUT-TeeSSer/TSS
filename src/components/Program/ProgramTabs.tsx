import { BookOpen, MessageCircle, Calendar, BarChart2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import path from "@/constants/path";

export type TabKey = "content" | "docs" | "meet" | "do";

interface ProgramTabsProps {
  activeTab: TabKey;
  programId: string | number;
  userRole?: "student" | "tutor";
}

export default function ProgramTabs({ activeTab, programId, userRole }: ProgramTabsProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine user role from URL if not explicitly provided
  const isTutor = userRole === "tutor" || location.pathname.includes("/tutor/");

  const tabs = isTutor
    ? [
        { id: "content", label: "Nội dung", icon: BookOpen, path: path.tutorProgramDetailView },
        { id: "docs", label: "Buổi tư vấn", icon: MessageCircle, path: path.tutorSessions },
        { id: "meet", label: "Lịch hẹn", icon: Calendar, path: path.tutorProgramMeet },
        { id: "do", label: "Năng lực", icon: BarChart2, path: path.tutorProgramCompetencies },
      ]
    : [
        { id: "content", label: "Nội dung", icon: BookOpen, path: path.studentProgramDetailView },
        { id: "docs", label: "Buổi tư vấn", icon: MessageCircle, path: path.studentSessions },
        { id: "meet", label: "Lịch hẹn", icon: Calendar, path: path.studentProgramMeet },
        { id: "do", label: "Năng lực", icon: BarChart2, path: path.studentProgramCompetencies },
      ];

  const handleTabClick = (tabPath: string) => {
    const url = tabPath.replace(":programId", String(programId));
    void navigate(url);
  };

  return (
    <div className='mt-6 flex gap-8 border-b border-gray-100 px-6'>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => {
              handleTabClick(tab.path);
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
