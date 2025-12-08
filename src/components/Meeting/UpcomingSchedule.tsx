import { Clock, Video, Edit, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { type Meet } from "@/data/meets";
import { useAuth } from "@/hooks/useAuth";
import { tutors } from "@/data/tutors";
import { mentees } from "@/data/mentees";

// Helper lấy avatar
const getTutorAvatar = (tutorName: string) => {
  const tutor = tutors.find((t) => t.name === tutorName);
  return tutor ? tutor.avatarUrl : "https://i.pravatar.cc/150?u=default";
};

const getStudentAvatar = (studentName: string) => {
  const student = mentees.find((t) => t.name === studentName);
  return student ? student.avatarUrl : "https://i.pravatar.cc/150?u=default";
};

interface UpcomingScheduleProps {
  meetList: Meet[];
  selectedDate: Date; // Nhận thêm prop ngày đã chọn
  userRole: "student" | "tutor";
}

export default function UpcomingSchedule({ meetList, selectedDate, userRole }: UpcomingScheduleProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  // Format ngày để hiển thị tiêu đề (Ví dụ: 28 Tháng 10, 2025)
  const dateOptions: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
  const dateDisplay = selectedDate.toLocaleDateString("vi-VN", dateOptions);

  // Format ngày để so sánh với dữ liệu (YYYY-MM-DD)
  const year = selectedDate.getFullYear();
  const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
  const day = String(selectedDate.getDate()).padStart(2, "0");
  const selectedIso = `${year}-${month}-${day}`;

  // Kiểm tra xem ngày được chọn có phải là hôm nay không để hiển thị text phù hợp
  const today = new Date();
  const isToday =
    selectedIso ===
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const titlePrefix = isToday ? "Lịch hôm nay" : "Lịch hẹn";

  // Lọc lịch hẹn: Chỉ lấy 'approved' VÀ trùng khớp với ngày được chọn
  const filteredMeets = meetList.filter(
    // (m) => m.status === "approved" && m.date === selectedIso
    (m) => (m.status === "approved" || m.status === "pending") && m.date === selectedIso
  );

  const handleJoinMeet = () => {
    window.open("https://meet.google.com/sah-uyrf-fqn", "_blank");
  };
  const handleProgramSelect = (programId: number) => {
    navigate(`/student/meet/${programId}`);
  };

  return (
    <div className='h-full rounded-xl border border-gray-200 bg-white p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <h3 className='text-lg font-bold text-gray-900'>
          {titlePrefix} - {dateDisplay}
        </h3>
        <span className='text-sm text-gray-500'>{filteredMeets.length} buổi hẹn</span>
      </div>

      <div className='space-y-4'>
        {filteredMeets.length > 0 ? (
          filteredMeets.map((item) => (
            <div
              key={item.id}
              className='flex flex-col items-start justify-between rounded-xl border border-gray-100 p-4 transition-all duration-200 hover:shadow-md sm:flex-row sm:items-center'
            >
              <div className='mb-4 flex items-center gap-4 sm:mb-0'>
                {user?.role === "student" && (
                  <img
                    src={getTutorAvatar(item.tutorName)}
                    alt={item.tutorName}
                    className='h-12 w-12 rounded-full object-cover ring-2 ring-gray-100'
                  />
                )}
                {user?.role === "tutor" && (
                  <img
                    src={getStudentAvatar(item.menteeName)}
                    alt={item.menteeName}
                    className='h-12 w-12 rounded-full object-cover ring-2 ring-gray-100'
                  />
                )}
                <div>
                  {user?.role === "student" && <h4 className='font-bold text-gray-900'>{item.tutorName}</h4>}
                  {user?.role === "tutor" && <h4 className='font-bold text-gray-900'>{item.menteeName}</h4>}
                  <p className='text-sm text-gray-500'>
                    {item.subject} - {item.topic}
                  </p>
                  <div className='mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-500'>
                    <span className='flex items-center gap-1 rounded bg-gray-50 px-2 py-0.5'>
                      <Clock className='h-3 w-3' /> {item.beginTime} - {item.endTime}
                    </span>
                    <span className='flex items-center gap-1 rounded border border-blue-100 bg-blue-50 px-2 py-0.5 text-blue-700'>
                      <Video className='h-3 w-3' /> Online
                    </span>
                  </div>
                </div>
              </div>

              <div className='flex flex-col items-end gap-3'>
                <span className='rounded-full bg-yellow-100 px-3 py-1 text-[10px] font-semibold tracking-wide text-yellow-700'>
                  Sắp tới
                </span>
                <div className='flex w-full items-center gap-2 sm:w-auto'>
                  {item.status === "approved" && (
                    <button
                      onClick={handleJoinMeet}
                      className='flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-800 sm:flex-none'
                    >
                      <Video className='h-4 w-4' /> Tham gia
                    </button>
                  )}
                  {item.status === "pending" && userRole === "student" && (
                    <button
                      onClick={() => handleProgramSelect(item.programId)}
                      className='flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-800 sm:flex-none'
                    >
                      <Edit className='h-4 w-4' /> Điều chỉnh
                    </button>
                  )}
                  <button className='flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800 sm:flex-none'>
                    <MessageSquare className='fill-black-200 h-4 w-4' /> Nhắn tin
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='py-10 text-center'>
            <div className='mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50'>
              <Clock className='h-8 w-8 text-gray-400' />
            </div>
            {/* <p className="text-gray-900 font-medium">Không có lịch hẹn vào ngày này</p> */}
            <p className='mt-1 text-sm text-gray-500'>Không có lịch hẹn vào ngày này.</p>
          </div>
        )}
      </div>
    </div>
  );
}
