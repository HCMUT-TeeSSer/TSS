// src/components/Meeting/CreateScheduleModal.tsx
import { useState, useEffect } from "react";
import { X, Check, Clock } from "lucide-react";
import { toast } from "react-toastify";

interface CreateScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  onSave: (newSlots: string[]) => void;
}

// Tạo danh sách các khung giờ từ 7:00 đến 21:00
const timeSlots = Array.from({ length: 15 }, (_, i) => {
  const hour = i + 7;
  return `${hour.toString().padStart(2, '0')}:00 - ${(hour + 1).toString().padStart(2, '0')}:00`;
});

export default function CreateScheduleModal({ isOpen, onClose, selectedDate, onSave }: CreateScheduleModalProps) {
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<Set<string>>(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [isSelecting, setIsSelecting] = useState(true); // True: adding, False: removing

  // Reset khi mở modal hoặc đổi ngày
  useEffect(() => {
    if (isOpen) {
      setSelectedTimeSlots(new Set());
    }
  }, [isOpen, selectedDate]);

  if (!isOpen) return null;

  const dateDisplay = selectedDate.toLocaleDateString('vi-VN', { 
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
  });

  // Logic kéo thả chuột
  const handleMouseDown = (slot: string) => {
    setIsDragging(true);
    const newSet = new Set(selectedTimeSlots);
    if (newSet.has(slot)) {
      setIsSelecting(false); // Bắt đầu chế độ bỏ chọn
      newSet.delete(slot);
    } else {
      setIsSelecting(true); // Bắt đầu chế độ chọn
      newSet.add(slot);
    }
    setSelectedTimeSlots(newSet);
  };

  const handleMouseEnter = (slot: string) => {
    if (isDragging) {
      const newSet = new Set(selectedTimeSlots);
      if (isSelecting) {
        newSet.add(slot);
      } else {
        newSet.delete(slot);
      }
      setSelectedTimeSlots(newSet);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSave = () => {
    if (selectedTimeSlots.size === 0) {
      toast.warning("Vui lòng chọn ít nhất một khung giờ!");
      return;
    }
    onSave(Array.from(selectedTimeSlots).sort());
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200"
      onMouseUp={handleMouseUp}
    >
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Tạo lịch rảnh</h3>
            <p className="text-sm text-gray-500 capitalize mt-1">{dateDisplay}</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body - Grid chọn giờ */}
        <div className="p-8 overflow-y-auto select-none bg-white">
          <p className="text-sm text-gray-600 mb-6 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" /> 
            <span className="font-medium">Kéo hoặc click chuột để chọn các khung giờ:</span>
          </p>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {timeSlots.map((slot) => {
              const isSelected = selectedTimeSlots.has(slot);
              return (
                <div
                  key={slot}
                  onMouseDown={() => handleMouseDown(slot)}
                  onMouseEnter={() => handleMouseEnter(slot)}
                  className={`
                    relative flex items-center justify-center py-4 px-2
                    text-sm font-semibold cursor-pointer transition-all duration-200 ease-in-out
                    border-2 rounded-2xl
                    ${isSelected 
                      ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200 scale-105" 
                      : "bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-sm"}
                  `}
                >
                  {/* Nội dung giờ bên trong */}
                  <span className="z-10">{slot}</span>
                  
                  {/* Hiệu ứng icon check chìm khi chọn (trang trí thêm) */}
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 bg-white text-emerald-600 rounded-full p-0.5 shadow-sm">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> Xác nhận lịch
          </button>
        </div>
      </div>
    </div>
  );
}