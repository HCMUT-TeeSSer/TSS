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
    (m) => m.status === "rejected" || (m.status === "approved" && new Date(m.date) < new Date())
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
    <div className='mt-8'>
      <div className='rounded-xl border border-gray-200 bg-white p-6'>
        <h3 className='mb-6 text-lg font-bold text-gray-900'>Lịch sử buổi hẹn</h3>
        <div className='space-y-3'>
          {historyList.length > 0 ? (
            historyList.map((item) => {
              // Kiểm tra xem buổi hẹn này đã được đánh giá chưa
              const isRated = ratedMeetIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className='flex flex-col items-center justify-between rounded-xl border border-gray-100 bg-gray-50/30 p-4 transition-all hover:bg-white hover:shadow-sm sm:flex-row'
                >
                  <div className='mb-3 flex w-full items-center gap-4 sm:mb-0 sm:w-auto'>
                    <img
                      src={getTutorAvatar(item.tutorName)}
                      alt={item.tutorName}
                      className='h-10 w-10 rounded-full object-cover'
                    />
                    <div>
                      <div className='flex items-center gap-2'>
                        <h4 className='text-sm font-bold text-gray-900'>{item.tutorName}</h4>
                      </div>
                      <p className='mt-0.5 text-sm text-gray-600'>
                        {item.subject} - {item.topic}
                      </p>
                      <p className='mt-0.5 flex items-center gap-1 text-xs text-gray-400'>
                        <Clock className='h-3 w-3' /> {item.date.split("-").reverse().join("/")} • {item.beginTime} -{" "}
                        {item.endTime}
                      </p>
                    </div>
                  </div>

                  <div className='flex w-full items-center justify-end gap-3 sm:w-auto'>
                    {/* Trạng thái */}
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] tracking-wide ${
                        item.status === "approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status === "approved" ? "Hoàn thành" : "Đã hủy"}
                    </span>
                    {/* Rating  */}
                    {item.status === "approved" ? (
                      isRated ? (
                        // Trạng thái ĐÃ ĐÁNH GIÁ (ngôi sao vàng)
                        <div className='flex cursor-default items-center gap-1 text-sm font-medium text-yellow-500'>
                          <Star className='h-4 w-4 fill-yellow-500' /> Đã đánh giá
                        </div>
                      ) : (
                        // Đánh giá
                        <button
                          onClick={() => handleRateClick(item.id)}
                          className='flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700'
                        >
                          <Star className='h-4 w-4 fill-blue-500' /> Đánh giá
                        </button>
                      )
                    ) : (
                      // Nút ĐẶT LẠI (cho trạng thái rejected)
                      <button
                        onClick={() => handleRebook(item.programId)}
                        className='flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700'
                      >
                        <RotateCcw className='h-4 w-4' /> Đặt lại
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className='text-center text-gray-500'>Chưa có lịch sử.</p>
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
