// src/components/Meeting/WeeklyScheduleOverview.tsx
import { useMemo } from "react";
import { type FreeSchedule } from "@/data/FreeSched";

interface WeeklyScheduleOverviewProps {
  schedules: FreeSchedule[];
}

export default function WeeklyScheduleOverview({ schedules }: WeeklyScheduleOverviewProps) {
  // 1. Xác định tuần hiện tại
  const currentWeekDays = useMemo(() => {
    const today = new Date();
    const day = today.getDay(); 
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Thứ 2 đầu tuần
    const monday = new Date(today.setDate(diff));
    monday.setHours(0, 0, 0, 0);

    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(monday);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, []);

  // 2. Tạo danh sách giờ ĐỘNG dựa trên dữ liệu lịch
  const activeTimeRows = useMemo(() => {
    const weekDateStrings = currentWeekDays.map(d => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    });

    const activeSchedules = schedules.filter(s => 
      // s.tutorId === 20210001 && 
      weekDateStrings.includes(s.date) &&
      (s.status === 'available' || s.status === 'booked')
    );

    const uniqueTimes = new Set(activeSchedules.map(s => s.startTime));
    return Array.from(uniqueTimes).sort();
  }, [schedules, currentWeekDays]);

  // 3. Helper lấy trạng thái
  const getStatusForCell = (date: Date, time: string) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    const schedule = schedules.find(s => {
      return s.date === dateStr && s.startTime === time; //s.tutorId === 2
    });

    if (!schedule) return "blocked"; 
    return schedule.status; 
  };

  const renderCell = (status: string) => {
    let badgeStyle = "";
    let text = "-";

    switch (status) {
      case "available":
        badgeStyle = "bg-green-100 text-green-700 border border-green-200"; 
        text = "Có thể đặt";
        break;
      case "booked":
        badgeStyle = "bg-red-100 text-red-700 border border-red-200";
        text = "Đã đặt";
        break;
      default:
        // Trường hợp không có lịch: Trả về dấu gạch ngang mờ, không cần badge
        badgeStyle = "bg-gray-100 text-gray-700 border border-gray-200";
        text = "Đã chặn";
    }

    // 2. Trả về cấu trúc: Div cha căn giữa -> Span con chứa màu
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className={`px-3 py-1 rounded-full text-[11px] tracking-wide whitespace-nowrap ${badgeStyle}`}>
          {text}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mt-8 flex flex-col h-full">
      <h3 className="text-lg font-bold text-gray-900 mb-4 shrink-0">Tổng quan lịch tuần</h3>

      {activeTimeRows.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-gray-200 rounded-lg bg-gray-50">
          <p className="text-gray-500 text-sm">Chưa có lịch rảnh nào được thiết lập trong tuần này.</p>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col">
          {/* ĐÃ CHỈNH SỬA: Xóa overflow-y-auto và max-h-[400px] để bỏ scroll */}
          <div className="relative">
            
            {/* Sử dụng table-fixed để chia đều cột */}
            <table className="w-full min-w-[800px] border-collapse table-fixed">
              <thead className="bg-white shadow-sm">
                <tr>
                  {/* Cột Thời Gian (Width nhỏ hơn) */}
                  <th className="py-4 px-4 text-left w-24 border-b border-gray-200 bg-gray-50/95 backdrop-blur border-r border-gray-100">
                    <span className="text-xs font-bold text-gray-500 uppercase">Thời gian</span>
                  </th>
                  
                  {/* Các Cột Ngày (Width tự động chia đều) */}
                  {currentWeekDays.map((day) => {
                    // const isToday = new Date().toDateString() === day.toDateString();
                    return (
                      <th 
                        key={day.toString()} 
                        className={`py-3 px-2 text-center border-b border-gray-200 bg-gray-50/95 backdrop-blur border-r border-gray-100 last:border-r-0`}
                        // ${isToday ? 'bg-blue-50/90' : ''}
                      >
                        <div className={`text-xs font-bold uppercase mb-1`}>  
                          {/* ${isToday ? 'text-blue-600' : 'text-gray-500'} */}
                          {day.toLocaleDateString('vi-VN', { weekday: 'short' })}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              
              <tbody>
                {activeTimeRows.map((time) => (
                  <tr key={time} className="hover:bg-gray-50/30 transition-colors">
                    {/* Cột thời gian */}
                    <td className="py-3 px-4 text-sm font-bold text-gray-900 border-b border-gray-100 border-r bg-white sticky left-0 z-1">
                      {time}
                    </td>
                    
                    {/* Các ô trạng thái */}
                    {currentWeekDays.map((day) => {
                      const status = getStatusForCell(day, time);
                      return (
                        <td key={day.toString()} className="p-2 border-b border-r border-gray-100 last:border-r-0 h-16 align-middle">
                          {renderCell(status)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}