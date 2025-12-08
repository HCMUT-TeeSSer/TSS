// src/components/Meeting/CalendarWidget.tsx
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { programs } from "@/data/programs";
import { type Meet } from "@/data/meets";

interface CalendarWidgetProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  meetList: Meet[];
  userRole: "student" | "tutor";
  userName: string;
}

export default function CalendarWidget({
  selectedDate = new Date(),
  onDateSelect,
  meetList,
  userRole,
  userName,
}: CalendarWidgetProps) {
  const navigate = useNavigate();
  const [showProgramModal, setShowProgramModal] = useState(false);

  const [currentMonthView, setCurrentMonthView] = useState(new Date(selectedDate));

  useEffect(() => {
    setCurrentMonthView(new Date(selectedDate));
  }, [selectedDate]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = currentMonthView.getFullYear();
  const month = currentMonthView.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonthView(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthView(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day: number) => {
    if (onDateSelect) {
      const newDate = new Date(year, month, day);
      onDateSelect(newDate);
    }
  };

  // --- Hàm đếm lịch hẹn cho ngày cụ thể ---
  const getDailyMeetCount = (day: number) => {
    // Tạo chuỗi YYYY-MM-DD khớp với dữ liệu
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    // Đếm các lịch hẹn 'approved' hoặc 'pending' của user hiện tại
    return meetList.filter(
      (m) =>
        m.date === dateStr &&
        ((userRole === "student" && m.menteeName === userName && (m.status === "approved" || m.status === "pending")) ||
          (userRole === "tutor" && m.tutorName === userName && m.status === "approved"))
    ).length;
  };

  // --- Render Grid ---
  const renderCalendarDays = () => {
    const totalSlots = 35;
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className='aspect-square' />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dateToCheck = new Date(year, month, i);
      dateToCheck.setHours(0, 0, 0, 0);

      const isSelected = dateToCheck.getTime() === new Date(selectedDate.setHours(0, 0, 0, 0)).getTime();
      const isPast = dateToCheck.getTime() < today.getTime();
      const isToday = dateToCheck.getTime() === today.getTime();

      // Lấy số lượng lịch hẹn
      const meetCount = getDailyMeetCount(i);

      let className =
        "aspect-square flex flex-col items-center justify-center rounded-lg text-sm cursor-pointer transition-all relative ";

      if (isSelected) {
        className += "bg-blue-600 text-white font-bold shadow-md transform scale-105 z-10";
      } else if (isToday) {
        className += "border border-blue-600 text-blue-600 font-semibold";
      } else if (isPast) {
        className += "text-gray-400 hover:bg-gray-100";
      } else {
        className += "text-gray-700 hover:bg-blue-50 font-medium";
      }

      days.push(
        <div key={i} className={className} onClick={() => handleDateClick(i)}>
          {/* Số ngày */}
          <span className={meetCount > 0 ? "mb-1" : ""}>{i}</span>

          {/* Số lượng lịch hẹn */}
          {meetCount > 0 && (
            <div className={`absolute bottom-1.5 flex items-center justify-center`}>
              <span className={`text-[10px] leading-none font-bold ${isSelected ? "text-blue-200" : "text-gray-400"}`}>
                ({meetCount})
              </span>
            </div>
          )}
        </div>
      );
    }

    while (days.length < totalSlots) {
      days.push(<div key={`empty-next-${days.length}`} className='aspect-square' />);
    }

    return days;
  };

  const daysLabel = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const handleProgramSelect = (programId: number) => {
    navigate(`/student/meet/${programId}`);
    setShowProgramModal(false);
  };
  const myPrograms = programs.slice(0, 5);

  return (
    <div className='relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='font-semibold text-gray-900 capitalize'>
          Tháng {month + 1} {year}
        </h3>
        <div className='flex gap-2'>
          <button onClick={handlePrevMonth} className='rounded p-1 text-gray-500 transition-colors hover:bg-gray-100'>
            <ChevronLeft className='h-4 w-4' />
          </button>
          <button onClick={handleNextMonth} className='rounded p-1 text-gray-500 transition-colors hover:bg-gray-100'>
            <ChevronRight className='h-4 w-4' />
          </button>
        </div>
      </div>

      <div className='mb-2 grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-400'>
        {daysLabel.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className='grid flex-1 grid-cols-7 gap-1 text-center text-sm'>{renderCalendarDays()}</div>

      {userRole === "student" && (
        <button
          onClick={() => setShowProgramModal(true)}
          className='mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 active:scale-[0.98]'
        >
          <Plus className='h-4 w-4' /> Đặt lịch mới
        </button>
      )}

      {showProgramModal && (
        <div className='animate-in fade-in slide-in-from-bottom-4 absolute inset-0 z-20 flex flex-col bg-white p-4 duration-200'>
          <div className='mb-3 flex items-center justify-between border-b border-gray-100 pb-2'>
            <h4 className='font-bold text-gray-900'>Chọn chương trình</h4>
            <button
              onClick={() => setShowProgramModal(false)}
              className='rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100'
            >
              <X className='h-5 w-5' />
            </button>
          </div>

          <div className='custom-scrollbar flex-1 space-y-2 overflow-y-auto pr-1'>
            {myPrograms.length > 0 ? (
              myPrograms.map((prog) => (
                <button
                  key={prog.id}
                  onClick={() => handleProgramSelect(prog.id)}
                  className='group relative w-full rounded-lg border border-gray-200 p-3 text-left transition-all hover:border-blue-500 hover:bg-blue-50'
                >
                  <p className='line-clamp-1 text-sm font-semibold text-gray-900 group-hover:text-blue-700'>
                    {prog.title}
                  </p>
                  <p className='mt-1 flex items-center gap-1 text-xs text-gray-500'>
                    <span>Tutor: {prog.mainTutor.name}</span>
                  </p>
                </button>
              ))
            ) : (
              <p className='mt-4 text-center text-sm text-gray-500'>Bạn chưa tham gia chương trình nào.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
