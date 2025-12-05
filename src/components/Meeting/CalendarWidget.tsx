// src/components/Meeting/CalendarWidget.tsx
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { programs } from "@/data/programs";
import {type Meet } from "@/data/meets";

interface CalendarWidgetProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  meetList: Meet[];
  userRole: "student" | "tutor";
  userName: string; 
}

export default function CalendarWidget({ selectedDate = new Date(), onDateSelect, meetList, userRole, userName}: CalendarWidgetProps) {
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
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    // Đếm các lịch hẹn 'approved' hoặc 'pending' của user hiện tại
    return meetList.filter(m => 
      m.date === dateStr && 
      ((userRole === "student" && m.menteeName ===  userName && (m.status === 'approved' || m.status === 'pending')) 
      || userRole === "tutor" && m.tutorName === userName &&  m.status === 'approved')
    ).length;
  };

  // --- Render Grid ---
  const renderCalendarDays = () => {
    const totalSlots = 35; 
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dateToCheck = new Date(year, month, i);
      dateToCheck.setHours(0,0,0,0);
      
      const isSelected = dateToCheck.getTime() === new Date(selectedDate.setHours(0,0,0,0)).getTime();
      const isPast = dateToCheck.getTime() < today.getTime();
      const isToday = dateToCheck.getTime() === today.getTime();
      
      // Lấy số lượng lịch hẹn
      const meetCount = getDailyMeetCount(i);

      let className = "aspect-square flex flex-col items-center justify-center rounded-lg text-sm cursor-pointer transition-all relative ";
      
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
        <div 
          key={i} 
          className={className}
          onClick={() => handleDateClick(i)}
      >
          {/* Số ngày */}
          <span className={meetCount > 0 ? "mb-1" : ""}>{i}</span>

            {/* Số lượng lịch hẹn */}
            {meetCount > 0 && (
              <div className={`absolute bottom-1.5 flex items-center justify-center`}>
                <span className={`text-[10px] leading-none font-bold ${isSelected ? 'text-blue-200' : 'text-gray-400'}`}>
                  ({meetCount})
                </span>
              </div>
            )}
        </div>
      );
    }
    
    while (days.length < totalSlots) {
      days.push(<div key={`empty-next-${days.length}`} className="aspect-square" />);
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
    <div className="bg-white rounded-xl border border-gray-200 p-4 h-full flex flex-col relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 capitalize">
          Tháng {month + 1} {year}
        </h3>
        <div className="flex gap-2">
          <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded text-gray-500 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded text-gray-500 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-gray-400 font-medium">
        {daysLabel.map(d => <div key={d}>{d}</div>)}
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center text-sm flex-1">
        {renderCalendarDays()}
      </div>

      {userRole === 'student' && (
        <button
          onClick={() => setShowProgramModal(true)}
          className="w-full mt-4 bg-blue-600 text-white rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-sm active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" /> Đặt lịch mới
        </button>
      )}

      {showProgramModal && (
        <div className="absolute inset-0 bg-white z-20 flex flex-col p-4 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
            <h4 className="font-bold text-gray-900">Chọn chương trình</h4>
            <button 
              onClick={() => setShowProgramModal(false)} 
              className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
            
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {myPrograms.length > 0 ? (
              myPrograms.map(prog => (
                <button
                  key={prog.id}
                  onClick={() => handleProgramSelect(prog.id)}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group relative"
                >
                  <p className="font-semibold text-gray-900 group-hover:text-blue-700 text-sm line-clamp-1">
                    {prog.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <span>Tutor: {prog.mainTutor.name}</span>
                  </p>
                </button>
              ))
            ) : (
              <p className="text-center text-sm text-gray-500 mt-4">Bạn chưa tham gia chương trình nào.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}