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

  const [allSchedules] = useState<FreeSchedule[]>(freeSchedules);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const myMeets = useMemo(() => {
    if (user?.fullName) {
      return meets.filter((m) => m.status === "approved" && m.tutorName === user.fullName);
    }
    return [];
  }, []);

  const myScheds = useMemo(() => {
    if (user?.fullName) {
      return allSchedules.filter((s) => s.tutorName === user.fullName);
    }
    return [];
  }, []);

  const myName = useMemo(() => {
    if (user?.fullName) {
      return user.fullName;
    }
    return "";
  }, []);

  const Meets = myMeets;
  const Name = myName;
  // const Scheds = myScheds;
  const [Scheds, setSchedules] = useState<FreeSchedule[]>(myScheds);
  // const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  // const dateDisplay = selectedDate.toLocaleDateString('vi-VN', dateOptions);

  return (
    <div className='min-h-screen bg-white'>
      <div className='container mx-auto px-4 py-8'>
        <div className='mb-8'>
          <h1 className='mb-6 text-2xl font-bold text-gray-900'>Quản lý lịch giảng dạy</h1>
          <StatsSection meetList={myMeets} userRole='tutor' userName={Name} />
        </div>

        <div className='mb-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-3'>
          <div className='lg:col-span-1'>
            <CalendarWidget
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              meetList={Meets}
              userRole='tutor'
              userName={Name}
            />
          </div>

          <div className='lg:col-span-2'>
            {/* Truyền state và hàm set xuống */}
            <FreeTimeSlots
              selectedDate={selectedDate}
              schedules={Scheds}
              onUpdateSchedules={setSchedules}
              userName={Name}
            />
          </div>
        </div>

        <div className='mb-8'>
          {/* <h2 className="text-lg font-bold text-gray-900 mb-4">Buổi tiếp theo</h2> */}
          <UpcomingSchedule meetList={myMeets} selectedDate={selectedDate} userRole='tutor' />
        </div>

        <div className='mb-8'>
          {/* Truyền state xuống */}
          <WeeklyScheduleOverview schedules={Scheds} />
        </div>
      </div>
    </div>
  );
}
