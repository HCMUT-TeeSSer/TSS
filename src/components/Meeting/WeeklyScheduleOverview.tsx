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
    const weekDateStrings = currentWeekDays.map((d) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    });

    const activeSchedules = schedules.filter(
      (s) =>
        // s.tutorId === 20210001 &&
        weekDateStrings.includes(s.date) && (s.status === "available" || s.status === "booked")
    );

    const uniqueTimes = new Set(activeSchedules.map((s) => s.startTime));
    return Array.from(uniqueTimes).sort();
  }, [schedules, currentWeekDays]);

  // 3. Helper lấy trạng thái
  const getStatusForCell = (date: Date, time: string) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;

    const schedule = schedules.find((s) => {
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
      <div className='flex h-full w-full items-center justify-center'>
        <span className={`rounded-full px-3 py-1 text-[11px] tracking-wide whitespace-nowrap ${badgeStyle}`}>
          {text}
        </span>
      </div>
    );
  };

  return (
    <div className='mt-8 flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6'>
      <h3 className='mb-4 shrink-0 text-lg font-bold text-gray-900'>Tổng quan lịch tuần</h3>

      {activeTimeRows.length === 0 ? (
        <div className='rounded-lg border border-dashed border-gray-200 bg-gray-50 py-10 text-center'>
          <p className='text-sm text-gray-500'>Chưa có lịch rảnh nào được thiết lập trong tuần này.</p>
        </div>
      ) : (
        <div className='flex flex-col overflow-hidden rounded-lg border border-gray-200'>
          {/* ĐÃ CHỈNH SỬA: Xóa overflow-y-auto và max-h-[400px] để bỏ scroll */}
          <div className='relative'>
            {/* Sử dụng table-fixed để chia đều cột */}
            <table className='w-full min-w-[800px] table-fixed border-collapse'>
              <thead className='bg-white shadow-sm'>
                <tr>
                  {/* Cột Thời Gian (Width nhỏ hơn) */}
                  <th className='w-24 border-r border-b border-gray-100 border-gray-200 bg-gray-50/95 px-4 py-4 text-left backdrop-blur'>
                    <span className='text-xs font-bold text-gray-500 uppercase'>Thời gian</span>
                  </th>

                  {/* Các Cột Ngày (Width tự động chia đều) */}
                  {currentWeekDays.map((day) => {
                    // const isToday = new Date().toDateString() === day.toDateString();
                    return (
                      <th
                        key={day.toString()}
                        className={`border-r border-b border-gray-100 border-gray-200 bg-gray-50/95 px-2 py-3 text-center backdrop-blur last:border-r-0`}
                        // ${isToday ? 'bg-blue-50/90' : ''}
                      >
                        <div className={`mb-1 text-xs font-bold uppercase`}>
                          {/* ${isToday ? 'text-blue-600' : 'text-gray-500'} */}
                          {day.toLocaleDateString("vi-VN", { weekday: "short" })}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {activeTimeRows.map((time) => (
                  <tr key={time} className='transition-colors hover:bg-gray-50/30'>
                    {/* Cột thời gian */}
                    <td className='sticky left-0 z-1 border-r border-b border-gray-100 bg-white px-4 py-3 text-sm font-bold text-gray-900'>
                      {time}
                    </td>

                    {/* Các ô trạng thái */}
                    {currentWeekDays.map((day) => {
                      const status = getStatusForCell(day, time);
                      return (
                        <td
                          key={day.toString()}
                          className='h-16 border-r border-b border-gray-100 p-2 align-middle last:border-r-0'
                        >
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
