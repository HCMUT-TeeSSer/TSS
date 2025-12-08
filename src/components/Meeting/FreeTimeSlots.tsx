// src/components/Meeting/FreeTimeSlots.tsx
import { useState, useMemo } from "react";
import { Plus, CheckCircle2, XCircle, CalendarX } from "lucide-react";
import { type FreeSchedule } from "@/data/FreeSched";
// import { useAuth } from "@/hooks/useAuth";
import WeeklyScheduleModal from "./WeeklyScheduleModal";
import { toast } from "react-toastify";

const getPeriod = (startTime: string) => {
  const hour = parseInt(startTime.split(":")[0]);
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
};

interface FreeTimeSlotsProps {
  selectedDate: Date;
  schedules: FreeSchedule[]; // Nhận dữ liệu từ cha
  onUpdateSchedules: (newSchedules: FreeSchedule[]) => void; // Hàm cập nhật dữ liệu lên cha
  userName: string;
}

export default function FreeTimeSlots({ selectedDate, schedules, onUpdateSchedules, userName }: FreeTimeSlotsProps) {
  // const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dateIso = useMemo(() => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, [selectedDate]);

  const dateDisplay = selectedDate.toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Lọc lịch hiển thị (dùng props 'schedules')
  const daySlots = useMemo(() => {
    return schedules.filter((s) => s.date === dateIso);
  }, [schedules, dateIso]);

  const groupedSlots = {
    morning: daySlots
      .filter((s) => getPeriod(s.startTime) === "morning")
      .sort((a, b) => a.startTime.localeCompare(b.startTime)),
    afternoon: daySlots
      .filter((s) => getPeriod(s.startTime) === "afternoon")
      .sort((a, b) => a.startTime.localeCompare(b.startTime)),
    evening: daySlots
      .filter((s) => getPeriod(s.startTime) === "evening")
      .sort((a, b) => a.startTime.localeCompare(b.startTime)),
  };

  const handleSaveSchedules = (newSchedules: FreeSchedule[]) => {
    // Xác định 7 ngày của tuần đang chọn
    const current = new Date(selectedDate);
    const day = current.getDay();
    const diff = current.getDate() - day + (day === 0 ? -6 : 1); // Tìm thứ 2
    const monday = new Date(current);
    monday.setDate(diff);

    const weekDatesToCheck = new Set<string>();
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const dayStr = String(d.getDate()).padStart(2, "0");
      weekDatesToCheck.add(`${year}-${month}-${dayStr}`);
    }

    // Lọc danh sách gốc
    const prevSchedulesKeep = schedules.filter((s) => {
      // Giữ lịch Booked
      if (s.status === "booked") return true;
      // Giữ lịch của các tuần khác
      if (!weekDatesToCheck.has(s.date)) return true;
      // Còn lại: Là lịch available cũ trong tuần này -> XÓA (return false)
      // Lý do: sẽ thay thế hoàn toàn bằng danh sách newSchedules
      return false;
    });

    // 3. Gộp lại và cập nhật
    onUpdateSchedules([...prevSchedulesKeep, ...newSchedules]);
    toast.success("Đã cập nhật lịch rảnh thành công!");
  };

  const renderSlotList = (slots: FreeSchedule[]) => {
    if (slots.length === 0) return <p className='py-2 text-xs text-gray-400 italic'>Không có lịch</p>;

    return slots.map((slot) => (
      <div
        key={slot.id}
        className={`mb-2 flex items-center justify-between rounded-lg border p-3 transition-all ${
          slot.status === "available"
            ? "border-green-300 bg-green-100 text-green-800"
            : "border-red-300 bg-red-100 text-red-800"
        }`}
      >
        <div>
          <p className='text-sm font-bold'>
            {slot.startTime} - {slot.endTime}
          </p>
          <p className='mt-0.5 text-[10px] font-semibold opacity-80'>
            {slot.status === "available" ? "Có thể đặt" : "Đã đặt"}
          </p>
        </div>
        {slot.status === "available" ? (
          <CheckCircle2 className='h-4 w-4 text-green-600' />
        ) : (
          <XCircle className='h-4 w-4 text-red-600' />
        )}
      </div>
    ));
  };

  return (
    <div className='flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-bold text-gray-900'>Khung giờ rảnh</h3>
          <p className='mt-1 text-sm text-gray-500'>{dateDisplay}</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className='flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-blue-700 active:scale-95'
        >
          <Plus className='h-4 w-4' /> Thêm lịch rảnh
        </button>
      </div>

      {daySlots.length === 0 ? (
        <div className='flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-100 bg-gray-50/50 py-12 text-center'>
          <div className='mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm'>
            <CalendarX className='h-7 w-7 text-gray-300' />
          </div>
          <p className='font-semibold text-gray-900'>Chưa có lịch rảnh</p>
          <p className='mt-1 text-sm text-gray-500'>Bạn chưa thiết lập thời gian rảnh cho ngày này.</p>
        </div>
      ) : (
        <div className='custom-scrollbar grid max-h-[500px] grid-cols-1 gap-4 overflow-y-auto pr-2 md:grid-cols-3'>
          {/* Cột Sáng */}
          <div className='rounded-xl border border-gray-100 bg-gray-50/50 p-3'>
            <h4 className='mb-3 flex items-center gap-2 text-xs tracking-wider text-gray-500'>
              <span className='h-2 w-2 rounded-full bg-yellow-400'></span> Buổi sáng
            </h4>
            <div>{renderSlotList(groupedSlots.morning)}</div>
          </div>

          {/* Cột Chiều */}
          <div className='rounded-xl border border-gray-100 bg-gray-50/50 p-3'>
            <h4 className='mb-3 flex items-center gap-2 text-xs tracking-wider text-gray-500'>
              <span className='h-2 w-2 rounded-full bg-orange-400'></span> Buổi chiều
            </h4>
            <div>{renderSlotList(groupedSlots.afternoon)}</div>
          </div>

          {/* Cột Tối */}
          <div className='rounded-xl border border-gray-100 bg-gray-50/50 p-3'>
            <h4 className='mb-3 flex items-center gap-2 text-xs tracking-wider text-gray-500'>
              <span className='h-2 w-2 rounded-full bg-indigo-400'></span> Buổi tối
            </h4>
            <div>{renderSlotList(groupedSlots.evening)}</div>
          </div>
        </div>
      )}

      {/* Modal - Truyền toàn bộ schedules để hiển thị */}
      <WeeklyScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        existingSchedules={schedules}
        onSave={handleSaveSchedules}
        userName={userName}
      />
    </div>
  );
}
