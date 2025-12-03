import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

export default function CalendarWidget() {
  const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const dates = Array.from({ length: 35 }, (_, i) => {
    const day = i - 2;
    return {
      day: day > 0 && day <= 31 ? day : day <= 0 ? 30 + day : day - 31,
      currentMonth: day > 0 && day <= 31,
      selected: day === 28,
    };
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Tháng 12 2025</h3>
        <div className="flex gap-2">
          <button className="p-1 hover:bg-gray-100 rounded text-gray-500">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded text-gray-500">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
        {days.map((d) => (
          <div key={d} className="text-gray-400 font-medium py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm flex-1">
        {dates.map((date, i) => (
          <div
            key={i}
            className={`aspect-square flex items-center justify-center rounded-lg cursor-pointer transition-colors ${
              !date.currentMonth
                ? "text-gray-300"
                : date.selected
                ? "bg-blue-600 text-white font-bold"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            {date.day}
          </div>
        ))}
      </div>
      <button className="w-full mt-4 bg-blue-600 text-white rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-sm">
        <Plus className="w-4 h-4" /> Đặt lịch mới
      </button>
    </div>
  );
}