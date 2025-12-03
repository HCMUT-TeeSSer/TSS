import { Clock, Video, Edit, MessageSquare } from "lucide-react";
import { type Meet } from "@/data/meets";
import { tutors } from "@/data/tutors";

// Helper lấy avatar
const getTutorAvatar = (tutorName: string) => {
  const tutor = tutors.find((t) => t.name === tutorName);
  return tutor ? tutor.avatarUrl : "https://i.pravatar.cc/150?u=default";
};

interface UpcomingScheduleProps {
  meetList: Meet[];
}

export default function UpcomingSchedule({ meetList }: UpcomingScheduleProps) {
  // Lọc các meet sắp tới (pending hoặc approved chưa qua ngày)
  // Trong demo này lấy 3 cái đầu tiên
  const upcomingMeets = meetList
    .filter(
      (m) =>
        m.status === "pending" ||
        (m.status === "approved" && new Date(m.date) >= new Date("2024-01-01"))
    )
    .slice(0, 3);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Lịch sắp tới</h3>
        <span className="text-sm text-gray-500">{upcomingMeets.length} buổi hẹn</span>
      </div>

      <div className="space-y-4">
        {upcomingMeets.length > 0 ? (
          upcomingMeets.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <img
                  src={getTutorAvatar(item.tutorName)}
                  alt={item.tutorName}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{item.tutorName}</h4>
                  <p className="text-sm text-gray-500">
                    {item.subject} - {item.topic}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded">
                      <Clock className="w-3 h-3" /> {item.beginTime} - {item.endTime} (
                      {item.date})
                    </span>
                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded">
                      <Video className="w-3 h-3 text-blue-500" /> Online
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div
                  className={`hidden sm:block mr-2 px-2 py-1 text-xs font-medium rounded-full border ${
                    item.status === "approved"
                      ? "bg-green-50 text-green-700 border-green-100"
                      : "bg-yellow-50 text-yellow-700 border-yellow-100"
                  }`}
                >
                  {item.status === "approved" ? "Sắp tới" : "Chờ duyệt"}
                </div>

                {item.status === "approved" ? (
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-sm">
                    <Video className="w-4 h-4" /> Tham gia
                  </button>
                ) : (
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                    <Edit className="w-4 h-4" /> Sửa
                  </button>
                )}

                <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors shadow-sm">
                  <MessageSquare className="w-4 h-4" /> Nhắn
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">Không có lịch hẹn sắp tới.</p>
        )}
      </div>
    </div>
  );
}