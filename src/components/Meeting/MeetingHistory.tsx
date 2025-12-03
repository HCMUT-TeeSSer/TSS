import { Clock, Star, RotateCcw } from "lucide-react";
import { type Meet } from "@/data/meets";
import { tutors } from "@/data/tutors";

const getTutorAvatar = (tutorName: string) => {
  const tutor = tutors.find((t) => t.name === tutorName);
  return tutor ? tutor.avatarUrl : "https://i.pravatar.cc/150?u=default";
};

interface MeetingHistoryProps {
  meetList: Meet[];
}

export default function MeetingHistory({ meetList }: MeetingHistoryProps) {
  // Lọc lịch sử: Status rejected hoặc ngày trong quá khứ
  const historyList = meetList.filter(
    (m) =>
      m.status === "rejected" ||
      (m.status === "approved" && new Date(m.date) < new Date("2026-01-01"))
  );

  return (
    <div className="mt-8">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Lịch sử buổi hẹn</h3>
        <div className="space-y-3">
          {historyList.length > 0 ? (
            historyList.map((item) => (
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
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                          item.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status === "approved" ? "Hoàn thành" : "Đã hủy"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5">{item.topic}</p>
                    <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.date} • {item.beginTime} -{" "}
                      {item.endTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  {item.status === "approved" ? (
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                      <Star className="w-4 h-4" /> Đánh giá
                    </button>
                  ) : (
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                      <RotateCcw className="w-4 h-4" /> Đặt lại
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Chưa có lịch sử.</p>
          )}
        </div>
      </div>
    </div>
  );
}