// src/pages/tutor/Calendar/calendar.tsx
import { useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { meets } from "@/data/meets";
import { freeSchedules, type FreeSchedule } from "@/data/FreeSched"; // Import dữ liệu

import StatsSection from "@/components/Meeting/StatsSection";
import CalendarWidget from "@/components/Meeting/CalendarWidget";
import FreeTimeSlots from "@/components/Meeting/FreeTimeSlots";
import WeeklyScheduleOverview from "@/components/Meeting/WeeklyScheduleOverview";
import UpcomingSchedule from "@/components/Meeting/UpcomingSchedule";

export default function TutorCalendar() {
  const { user } = useAuth();
  
  const [allSchedules, setAllSchedules] = useState<FreeSchedule[]>(freeSchedules);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const myMeets = useMemo(() => {
    if (!user) return [];
    return meets.filter((m) => m.tutorName === user.fullName);
  }, [user]);

  // const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  // const dateDisplay = selectedDate.toLocaleDateString('vi-VN', dateOptions);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Quản lý lịch giảng dạy</h1>
          <StatsSection meetList={myMeets} userRole="tutor" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <CalendarWidget 
              selectedDate={selectedDate} 
              onDateSelect={setSelectedDate} 
            />
          </div>

          <div className="lg:col-span-2">
            {/* Truyền state và hàm set xuống */}
            <FreeTimeSlots 
              selectedDate={selectedDate} 
              schedules={allSchedules}
              onUpdateSchedules={setAllSchedules}
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Buổi tiếp theo</h2>
          <UpcomingSchedule meetList={myMeets} selectedDate={selectedDate} />
        </div>

        <div className="mb-8">
          {/* Truyền state xuống */}
          <WeeklyScheduleOverview schedules={allSchedules} />
        </div>

      </div>
    </div>
  );
}