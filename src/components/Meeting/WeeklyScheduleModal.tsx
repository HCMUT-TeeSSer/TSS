// src/components/Meeting/WeeklyScheduleModal.tsx
import { useState, useEffect, useMemo } from "react";
// import { useAuth } from "@/hooks/useAuth";
import { Check } from "lucide-react";
import { type FreeSchedule } from "@/data/FreeSched";

interface WeeklyScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  existingSchedules: FreeSchedule[];
  onSave: (newSchedules: FreeSchedule[]) => void;
  userName: string;
}

const START_HOUR = 0;
const END_HOUR = 24;
const TIME_STEP = 60; // phút

export default function WeeklyScheduleModal({
  isOpen,
  onClose,
  selectedDate,
  existingSchedules,
  onSave,
  userName,
}: WeeklyScheduleModalProps) {
  // Set lưu trữ dạng "YYYY-MM-DD|HH:mm"
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [isSelecting, setIsSelecting] = useState(true);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date());
  // const { user } = useAuth();

  // 1. Khởi tạo tuần
  useEffect(() => {
    if (isOpen) {
      const startOfWeek = new Date(selectedDate);
      const day = startOfWeek.getDay();
      const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
      const monday = new Date(startOfWeek.setDate(diff));
      monday.setHours(0, 0, 0, 0);
      setCurrentWeekStart(monday);
    }
  }, [isOpen, selectedDate]);

  // 2. Load dữ liệu cũ vào state (Chỉ load những cái available)
  useEffect(() => {
    if (isOpen) {
      const newSet = new Set<string>();
      existingSchedules.forEach((s) => {
        if (s.status === "available") {
          newSet.add(`${s.date}|${s.startTime}`);
        }
      });
      setSelectedSlots(newSet);
    }
  }, [isOpen, existingSchedules]);

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(currentWeekStart);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [currentWeekStart]);

  const timeRows = useMemo(() => {
    const times = [];
    for (let h = START_HOUR; h < END_HOUR; h++) {
      for (let m = 0; m < 60; m += TIME_STEP) {
        const timeStr = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
        times.push(timeStr);
      }
    }
    return times;
  }, []);

  const getEndTimeLabel = (startTime: string) => {
    const [h, m] = startTime.split(":").map(Number);
    const endH = h + 1;
    return `${endH.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };

  const isSlotDisabled = (date: Date, time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    const slotDateTime = new Date(date);
    slotDateTime.setHours(hour, minute, 0, 0);
    const now = new Date();
    // Disable quá khứ hoặc < 1h tới
    return slotDateTime.getTime() < now.getTime() + 60 * 60 * 1000;
  };

  const getBookedInfo = (dateStr: string, time: string) => {
    return existingSchedules.find((s) => {
      if (s.date !== dateStr || s.status !== "booked") return false;
      return s.startTime <= time && s.endTime > time;
    });
  };

  // --- Handlers ---
  const handleMouseDown = (key: string, disabled: boolean, booked: boolean) => {
    if (disabled || booked) return;
    setIsDragging(true);
    const newSet = new Set(selectedSlots);
    if (newSet.has(key)) {
      setIsSelecting(false); // Mode: Bỏ chọn
      newSet.delete(key);
    } else {
      setIsSelecting(true); // Mode: Chọn
      newSet.add(key);
    }
    setSelectedSlots(newSet);
  };

  const handleMouseEnter = (key: string, disabled: boolean, booked: boolean) => {
    if (!isDragging || disabled || booked) return;
    const newSet = new Set(selectedSlots);
    if (isSelecting) {
      newSet.add(key);
    } else {
      newSet.delete(key);
    }
    setSelectedSlots(newSet);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSave = () => {
    const result: FreeSchedule[] = [];

    // Chỉ đơn giản là chuyển đổi các ô đang được bôi xanh (selectedSlots) thành dữ liệu
    selectedSlots.forEach((key) => {
      const [date, time] = key.split("|");
      const [h, m] = time.split(":").map(Number);
      const endTime = `${(h + 1).toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;

      result.push({
        id: Math.random(),
        tutorId: 20210002,
        tutorName: userName,
        date: date,
        startTime: time,
        endTime: endTime,
        status: "available",
      });
    });

    // Bắn danh sách này ra cho cha (FreeTimeSlots) xử lý
    onSave(result);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className='animate-in fade-in fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4 duration-200'
      onMouseUp={handleMouseUp}
    >
      <div className='flex h-[90vh] w-full max-w-[1200px] flex-col overflow-hidden rounded-lg bg-white shadow-xl'>
        {/* HEADER */}
        <div className='flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6 py-4'>
          <div>
            <h2 className='text-xl font-bold text-gray-900'>Thiết lập lịch rảnh</h2>
            <p className='mt-1 text-sm text-gray-500'>Kéo chuột để chọn/bỏ chọn các khung giờ.</p>
          </div>
          <div className='flex gap-3'>
            <button
              onClick={onClose}
              className='rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              className='flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700'
            >
              <Check className='h-4 w-4' /> Lưu thay đổi
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className='custom-scrollbar relative flex-1 overflow-auto bg-white'>
          <div className='flex min-w-[800px]'>
            {/* CỘT THỜI GIAN (Sticky Left) */}
            <div className='sticky left-0 z-20 border-r border-gray-200 bg-white'>
              {/* Header placeholder (để căn chỉnh với dòng ngày) */}
              <div className='sticky top-0 z-30 h-[73px] border-b border-gray-200 bg-gray-50'></div>

              {/* Các dòng giờ */}
              {timeRows.map((time) => (
                <div key={time} className='relative box-border h-8 w-16 border-b border-gray-100'>
                  <span className='absolute -top-2.5 right-2 text-xs font-medium text-gray-400'>
                    {time !== "00:00" ? time : ""}
                  </span>
                </div>
              ))}
            </div>

            {/* CÁC CỘT NGÀY */}
            <div className='flex flex-1'>
              {weekDays.map((d, i) => {
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, "0");
                const dayStr = String(d.getDate()).padStart(2, "0");
                const dateStr = `${year}-${month}-${dayStr}`;
                const isToday = new Date().toDateString() === d.toDateString();

                return (
                  <div key={i} className='flex min-w-[100px] flex-1 flex-col border-r border-gray-200 last:border-r-0'>
                    {/* Header Ngày (Sticky Top) */}
                    <div
                      className={`sticky top-0 z-10 flex h-[73px] flex-col justify-center border-b border-gray-200 py-3 text-center ${isToday ? "bg-blue-50/80 backdrop-blur" : "bg-gray-50"}`}
                    >
                      <div
                        className={`mb-1 text-xs font-semibold uppercase ${isToday ? "text-blue-600" : "text-gray-500"}`}
                      >
                        {d.toLocaleDateString("vi-VN", { weekday: "short" })}
                      </div>
                      <div className={`text-xl font-bold ${isToday ? "text-blue-600" : "text-gray-800"}`}>
                        {d.getDate()}
                      </div>
                    </div>

                    {/* Các ô giờ */}
                    {timeRows.map((time) => {
                      const disabled = isSlotDisabled(d, time);
                      const bookedInfo = getBookedInfo(dateStr, time);
                      const isBooked = !!bookedInfo;
                      const key = `${dateStr}|${time}`;
                      const isSelected = selectedSlots.has(key);

                      // Style
                      let cellClass =
                        "h-8 border-b border-gray-100 relative cursor-pointer select-none transition-colors duration-100 ";

                      if (isBooked) {
                        cellClass += "rounded bg-red-200 border-red-300 cursor-not-allowed ";
                      } else if (disabled) {
                        cellClass += "bg-gray-50/80 cursor-not-allowed ";
                      } else if (isSelected) {
                        cellClass += "rounded bg-green-600 border-green-700 z-0 "; // Vuông vức khi chọn, màu xanh
                      } else {
                        cellClass += "hover:bg-gray-50 ";
                      }

                      return (
                        <div
                          key={time}
                          className={cellClass}
                          onMouseDown={() => handleMouseDown(key, disabled, isBooked)}
                          onMouseEnter={() => handleMouseEnter(key, disabled, isBooked)}
                        >
                          {/* Hiển thị giờ khi chọn */}
                          {isSelected && !isBooked && !disabled && (
                            <div className='absolute inset-0 flex items-center justify-center text-[10px] font-medium text-white'>
                              {time} - {getEndTimeLabel(time)}
                            </div>
                          )}

                          {/* Hiển thị Booked */}
                          {isBooked && (
                            <div className='absolute inset-0 flex items-center justify-center text-[10px] font-bold text-red-400'>
                              Đã đặt
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
