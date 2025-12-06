// src/components/Meeting/TutorWeeklySlotsWidget.tsx
import { useState, useMemo } from "react";
import { Calendar } from "lucide-react";
import { type FreeSchedule } from "@/data/FreeSched";
import WeeklyScheduleModal from "./WeeklyScheduleModal"; // Import Modal chỉnh sửa
import { toast } from "react-toastify";

interface TutorWeeklySlotsWidgetProps {
  schedules: FreeSchedule[];
  userRole: "mentee" | "tutor";
  onUpdateSchedules: (newSchedules: FreeSchedule[]) => void;
  userName?: string;
}

export default function TutorWeeklySlotsWidget({ 
  schedules, 
  userRole, 
  onUpdateSchedules,
  userName = "Tutor"
}: TutorWeeklySlotsWidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const today = new Date();

  // 1. Lấy 7 ngày của tuần hiện tại
  const currentWeekDays = useMemo(() => {
    const current = new Date(today);
    const day = current.getDay();
    const diff = current.getDate() - day + (day === 0 ? -6 : 1); // Thứ 2 đầu tuần
    const monday = new Date(current.setDate(diff));
    monday.setHours(0,0,0,0);

    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(monday);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, []);

  // 2. Xử lý dữ liệu: Lọc Available + Gộp giờ liên tiếp
  const displaySlots = useMemo(() => {
    const result: { dateDisplay: string; timeRange: string }[] = [];

    currentWeekDays.forEach(dayDate => {
      const dateIso = `${dayDate.getFullYear()}-${String(dayDate.getMonth() + 1).padStart(2, '0')}-${String(dayDate.getDate()).padStart(2, '0')}`;
      
      // Lấy slot available, sắp xếp theo giờ
      const daySlots = schedules
        .filter(s => s.date === dateIso && s.status === "available")
        .sort((a, b) => a.startTime.localeCompare(b.startTime));

      if (daySlots.length === 0) return;

      // Logic gộp giờ (ví dụ: 09-10, 10-11 -> 09-11)
      let currentStart = daySlots[0].startTime;
      let currentEnd = daySlots[0].endTime;

      for (let i = 1; i < daySlots.length; i++) {
        if (daySlots[i].startTime === currentEnd) {
          currentEnd = daySlots[i].endTime; // Nối tiếp
        } else {
          // Ngắt quãng -> Đẩy vào mảng
          result.push({
            dateDisplay: dayDate.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric' }),
            timeRange: `${currentStart} - ${currentEnd}`
          });
          currentStart = daySlots[i].startTime;
          currentEnd = daySlots[i].endTime;
        }
      }
      // Đẩy item cuối
      result.push({
        dateDisplay: dayDate.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric' }),
        timeRange: `${currentStart} - ${currentEnd}`
      });
    });

    return result;
  }, [schedules, currentWeekDays]);

  // 3. Logic Lưu dữ liệu (như cũ)
  const handleSaveSchedules = (newSchedules: FreeSchedule[]) => {
    const current = new Date(today);
    const day = current.getDay();
    const diff = current.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(current);
    monday.setDate(diff);

    const weekDatesToCheck = new Set<string>();
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const dayStr = String(d.getDate()).padStart(2, '0');
      weekDatesToCheck.add(`${year}-${month}-${dayStr}`);
    }

    const prevSchedulesKeep = schedules.filter(s => {
      if (s.status === 'booked') return true;
      if (!weekDatesToCheck.has(s.date)) return true;
      return false; 
    });

    onUpdateSchedules([...prevSchedulesKeep, ...newSchedules]);
    toast.success("Đã cập nhật lịch rảnh thành công!");
  };

  return (
    <div className='rounded-lg bg-white p-4 shadow-md'>
      <h4 className='font-semibold text-gray-900'>
        {userRole === "mentee" ? "Lịch rảnh của Tutor" : "Lịch rảnh tuần này"}
      </h4>
      <div className='mt-3 space-y-2 text-sm'>
        <p className='mb-2 text-gray-500'>
          {userRole === "mentee" ? "Tutor rảnh vào (Tuần này):" : "Lịch rảnh của tôi trong tuần này:"}
        </p>

        {/* --- Phần hiển thị danh sách động --- */}
        {displaySlots.length > 0 ? (
          displaySlots.map((slot, idx) => (
            <div key={idx} className='flex justify-between rounded-lg bg-gray-50 p-3'>
              <span className='font-medium capitalize'>{slot.dateDisplay}</span>
              <span className='text-green-700 font-semibold'>{slot.timeRange}</span>
            </div>
          ))
        ) : (
          <div className="text-center py-4 border border-dashed border-gray-200 rounded-lg bg-gray-50">
            <p className="text-gray-400 italic text-xs">Chưa có lịch rảnh nào.</p>
          </div>
        )}

        {/* --- Nút chỉnh sửa cho Tutor --- */}
        {userRole === "tutor" && (
          <>
            <button
              onClick={() => setIsModalOpen(true)}
              className='mt-4 inline-flex w-full justify-center rounded-lg border border-blue-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-blue-50 transition-colors'
            >
              <Calendar className='mr-2 h-4 w-4' /> Chỉnh sửa lịch rảnh
            </button>
            
            {/* Modal chỉnh sửa */}
            <WeeklyScheduleModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              selectedDate={today}
              existingSchedules={schedules}
              onSave={handleSaveSchedules}
              userName={userName}
            />
          </>
        )}
      </div>
    </div>
  );
}