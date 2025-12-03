import { useMemo } from "react";
import { meets } from "@/data/meets";

// Import các component con
import StatsSection from "@/components/Meeting/StatsSection";
import CalendarWidget from "@/components/Meeting/CalendarWidget";
import UpcomingSchedule from "@/components/Meeting/UpcomingSchedule";
import MeetingHistory from "@/components/Meeting/MeetingHistory";
import AvailableMentors from "@/components/Meeting/AvailableMentors";

export default function StudentMeet() {
  const myMeets = useMemo(() => {
    return meets.filter((m) => m.menteeName === "Nguyễn Văn A");
  }, []);
  return (
    <div className="min-h-screen bg-white">
    <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Lịch hẹn của tôi</h1>
        <p className="text-gray-500 mt-1 text-sm">
            Quản lý và theo dõi các buổi hướng dẫn với mentor
        </p>
        </div>

        {/* Section: Stats (Thống kê) */}
        <StatsSection meetList={myMeets} userRole="student"/>

        {/* Section: Calendar & Schedule (Lịch + Lịch hôm nay) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
            <CalendarWidget />
        </div>
        <div className="lg:col-span-2">
            <UpcomingSchedule meetList={myMeets} />
        </div>
        </div>

        {/* Section: History (Lịch sử) */}
        <MeetingHistory meetList={myMeets} />

        {/* Section: Available Mentors (Mentor có sẵn) */}
        <AvailableMentors />
    </div>
    </div>
  );
}