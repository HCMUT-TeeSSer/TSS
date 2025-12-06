import { useState } from "react";
import { Clock, Star, RotateCcw } from "lucide-react";
import { type Meet } from "@/data/meets";
import { tutors } from "@/data/tutors";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReviewModal from "./ReviewModal";

const getTutorAvatar = (tutorName: string) => {
  const tutor = tutors.find((t) => t.name === tutorName);
  return tutor ? tutor.avatarUrl : "https://i.pravatar.cc/150?u=default";
};

interface MeetingHistoryProps {
  meetList: Meet[];
}

export default function MeetingHistory({ meetList }: MeetingHistoryProps) {
  const navigate = useNavigate();
  
  // State quản lý Modal
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedMeetId, setSelectedMeetId] = useState<number | null>(null);

  // State lưu các ID buổi hẹn đã được đánh giá (giả lập database)
  const [ratedMeetIds, setRatedMeetIds] = useState<number[]>([]);

  // Lọc lịch sử
  const historyList = meetList.filter(
    (m) =>
      m.status === "rejected" ||
      (m.status === "approved" && new Date(m.date) < new Date())
  );

  // Mở modal đánh giá
  const handleRateClick = (meetId: number) => {
    setSelectedMeetId(meetId);
    setIsReviewModalOpen(true);
  };

  // Xử lý submit đánh giá
  const handleReviewSubmit = (rating: number, comment: string) => {
    // Logic gọi API lưu đánh giá sẽ ở đây
    console.log(`Submitting review for meet #${selectedMeetId}:`, { rating, comment });
    
    // Cập nhật trạng thái "Đã đánh giá" cho buổi hẹn này
    if (selectedMeetId !== null) {
      setRatedMeetIds((prev) => [...prev, selectedMeetId]);
    }

    toast.success("Cảm ơn bạn đã đánh giá!");
    setIsReviewModalOpen(false);
    setSelectedMeetId(null);
  };

  const handleRebook = (programId: number) => {
    navigate(`/student/meet/${programId}`);
  };

  return (
    <div className="mt-8">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Lịch sử buổi hẹn</h3>
        <div className="space-y-3">
          {historyList.length > 0 ? (
            historyList.map((item) => {
              // Kiểm tra xem buổi hẹn này đã được đánh giá chưa
              const isRated = ratedMeetIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50/30 hover:bg-white hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto mb-3 sm:mb-0">
                    <img
                      src={getTutorAvatar(item.tutorName)}
                      alt={item.tutorName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-900 text-sm">{item.tutorName}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mt-0.5">
                          {item.subject} - {item.topic}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {item.date.split("-").reverse().join("/")} • {item.beginTime} -{" "}
                        {item.endTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    {/* Trạng thái */}
										<span
											className={`px-3 py-1 rounded-full text-[10px] tracking-wide ${
												item.status === "approved"
													? "bg-green-100 text-green-700"
													: "bg-red-100 text-red-700"
											}`}
										>
											{item.status === "approved" ? "Hoàn thành" : "Đã hủy"}
										</span>
										{/* Rating  */}
										{item.status === "approved" ? (
                      isRated ? (
                        // Trạng thái ĐÃ ĐÁNH GIÁ (ngôi sao vàng)
                        <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium cursor-default">
                          <Star className="w-4 h-4 fill-yellow-500" /> Đã đánh giá
                        </div>
                      ) : (
                        // Đánh giá
                        <button 
                            onClick={() => handleRateClick(item.id)}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                        >
                          <Star className="w-4 h-4 fill-blue-500" /> Đánh giá
                        </button>
                      )
                    ) : (
                      // Nút ĐẶT LẠI (cho trạng thái rejected)
                      <button 
                          onClick={() => handleRebook(item.programId)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" /> Đặt lại
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">Chưa có lịch sử.</p>
          )}
        </div>
      </div>

      {/* Review Modal Component */}
      <ReviewModal 
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
}