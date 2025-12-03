import { Clock, Video, MessageSquare, MapPin, Edit } from "lucide-react";
import { type Meet } from "@/data/meets";
import { tutors } from "@/data/tutors";

// Helper lấy avatar
const getTutorAvatar = (tutorName: string) => {
  const tutor = tutors.find((t) => t.name === tutorName);
  return tutor ? tutor.avatarUrl : "https://i.pravatar.cc/150?u=default";
};

interface UpcomingScheduleProps {
  meetList: Meet[];
  selectedDate: Date; // Nhận thêm prop ngày đã chọn
}

export default function UpcomingSchedule({ meetList, selectedDate }: UpcomingScheduleProps) {
  // Format ngày để hiển thị tiêu đề (Ví dụ: 28 Tháng 10, 2025)
  const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const dateDisplay = selectedDate.toLocaleDateString('vi-VN', dateOptions);
  
  // Format ngày để so sánh với dữ liệu (YYYY-MM-DD)
  const year = selectedDate.getFullYear();
  const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
  const day = String(selectedDate.getDate()).padStart(2, '0');
  const selectedIso = `${year}-${month}-${day}`;

  // Kiểm tra xem ngày được chọn có phải là hôm nay không để hiển thị text phù hợp
  const today = new Date();
  const isToday = selectedIso === `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  const titlePrefix = isToday ? "Lịch hôm nay" : "Lịch hẹn";

  // Lọc lịch hẹn: Chỉ lấy 'approved' VÀ trùng khớp với ngày được chọn
  const filteredMeets = meetList.filter(
    (m) => m.status === "approved" && m.date === selectedIso
  );

  const handleJoinMeet = () => {
    window.open("https://meet.google.com/sah-uyrf-fqn", "_blank");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">
          {titlePrefix} - {dateDisplay}
        </h3>
        <span className="text-sm text-gray-500">{filteredMeets.length} buổi hẹn</span>
      </div>

      <div className="space-y-4">
        {filteredMeets.length > 0 ? (
          filteredMeets.map((item) => (
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
                      <Clock className="w-3 h-3" /> {item.beginTime} - {item.endTime}
                    </span>
                    <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">
                      <Video className="w-3 h-3" /> Online
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button 
                  onClick={handleJoinMeet}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-sm"
                >
                  <Video className="w-4 h-4" /> Tham gia
                </button>

                <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors shadow-sm border border-gray-200">
                  <MessageSquare className="w-4 h-4" /> Nhắn tin
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <div className="bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-900 font-medium">Không có lịch hẹn vào ngày này</p>
            <p className="text-sm text-gray-500 mt-1">Bạn có thể đặt lịch mới với mentor.</p>
          </div>
        )}
      </div>
    </div>
  );
}