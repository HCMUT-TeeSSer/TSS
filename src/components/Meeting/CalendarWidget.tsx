// src/components/Meeting/CalendarWidget.tsx
import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { programs } from "@/data/programs";

export default function CalendarWidget() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showProgramModal, setShowProgramModal] = useState(false);

  // --- Calendar Logic ---
  const today = new Date();
  // Reset giờ của 'today' về 0 để so sánh ngày chính xác
  today.setHours(0, 0, 0, 0);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Lấy số ngày trong tháng và ngày bắt đầu của tháng
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // 0 = CN, 1 = T2...

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Helper kiểm tra ngày
  const getDayStatus = (day: number) => {
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    checkDate.setHours(0, 0, 0, 0);

    if (checkDate.getTime() < today.getTime()) return "past";
    if (checkDate.getTime() === today.getTime()) return "today";
    return "future";
  };

  // --- Render Grid ---
  const renderCalendarDays = () => {
    const totalSlots = 35; // 5 hàng x 7 cột
    const days = [];
    
    // Ô trống đầu tháng
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />);
    }

    // Các ngày trong tháng
    for (let i = 1; i <= daysInMonth; i++) {
			const status = getDayStatus(i);
			let className = "aspect-square flex items-center justify-center rounded-lg text-sm cursor-default ";
			
			if (status === "past") {
				className += "text-gray-300"; // Ngày quá khứ: Màu xám
			} else if (status === "today") {
				className += "bg-blue-600 text-white font-bold cursor-pointer hover:bg-blue-700 shadow-md"; // Hôm nay
			} else {
				className += "text-gray-700 cursor-pointer hover:bg-blue-50 font-medium"; // Tương lai
			}

			days.push(
				<div key={i} className={className}>
					{i}
				</div>
			);
    }
    
    // Fill ô trống cuối
    while (days.length < totalSlots) {
			days.push(<div key={`empty-next-${days.length}`} className="aspect-square" />);
    }

    return days;
  };

  // --- Xử lý chọn chương trình ---
  const handleProgramSelect = (programId: number) => {
		// Chuyển hướng đến trang lịch hẹn của chương trình đó
		navigate(`/student/meet/${programId}`);
		setShowProgramModal(false);
  };

  // Mock: Giả sử sinh viên tham gia 5 chương trình đầu tiên trong danh sách
  const myPrograms = programs.slice(0, 5);

  const daysLabel = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 h-full flex flex-col relative overflow-hidden">
      {/* Header Lịch */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 capitalize">
          Tháng {currentDate.getMonth() + 1} {currentDate.getFullYear()}
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
      
      {/* Label Thứ */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-gray-400 font-medium">
        {daysLabel.map(d => <div key={d}>{d}</div>)}
      </div>
      
      {/* Grid Ngày */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm flex-1">
        {renderCalendarDays()}
      </div>

      {/* Nút Đặt lịch mới - Chỉ hiện cho Student */}
      {user?.role === 'student' && (
        <button
          onClick={() => setShowProgramModal(true)}
          className="w-full mt-4 bg-blue-600 text-white rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-sm active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" /> Đặt lịch mới
        </button>
      )}

      {/* Modal Chọn Chương Trình (Overlay ngay trên Widget) */}
      {showProgramModal && (
        <div className="absolute inset-0 bg-white z-10 flex flex-col p-4 animate-in fade-in slide-in-from-bottom-4 duration-200">
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