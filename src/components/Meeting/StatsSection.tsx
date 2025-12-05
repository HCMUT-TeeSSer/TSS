// src/components/Meeting/StatsSection.tsx

import { Calendar as CalendarIcon, CheckCircle2, User, Clock, Users, BookOpen } from "lucide-react";
import { type Meet } from "@/data/meets";
import { tutors } from "@/data/tutors";
import { freeSchedules } from "@/data/FreeSched"; // Import dữ liệu lịch rảnh

interface StatsSectionProps {
  meetList: Meet[];
  userRole: "student" | "tutor"; // Thêm prop để xác định role
  userName: string;
}

export default function StatsSection({ meetList, userRole, userName }: StatsSectionProps) {
  // --- LOGIC CHUNG: Tìm buổi tiếp theo gần nhất ---
  const nextMeet = meetList
    .filter((m) => m.status === "approved" && new Date(m.date + "T" + m.beginTime) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  const nextMeetValue = nextMeet ? nextMeet.beginTime : "--:--";
  const nextMeetSub = nextMeet ? nextMeet.date.split("-").reverse().slice(0, 2).join("/") : "Chưa có";

  // --- LOGIC CHO STUDENT ---
  // 1. Buổi tuần này (Pending + Approved)
  const pendingCount = meetList.filter((m) => m.status === "pending").length;
  const approvedCount = meetList.filter((m) => m.status === "approved").length;
  const studentThisWeek = pendingCount + approvedCount; // (Giả sử meetList đã được lọc theo tuần ở parent hoặc đây là tổng số sắp tới)

  // 2. Hoàn thành
  const studentCompleted = meetList.filter((m) => {
    const meetDate = new Date(m.date);
    return m.status === "approved" && meetDate < new Date();
  }).length + 12; // Cộng số giả định lịch sử

  // 3. Mentor (Số lượng mentor hệ thống hoặc mentor đã học)
  const studentMentors = tutors.length;


  // --- LOGIC CHO TUTOR ---
  // 1. Giờ rảnh (Tuần này) - Tính từ FreeSched
  // Giả sử tutor hiện tại là ID 20210001 (Nguyễn Văn A) - Trong thực tế lấy từ AuthContext
  //const currentTutorId = 20210001; 
  const CURRENT_TUTOR_NAME = userName;
  const freeSlots = freeSchedules.filter(s => s.tutorName === CURRENT_TUTOR_NAME && s.status === "available");
  // mỗi slot là 1 tiếng
  const tutorFreeHours = freeSlots.length; 

  // 2. Buổi đã đặt (Tuần này) - Approved meets
  const tutorBookedThisWeek = meetList.filter(m => m.status === "approved").length; // Cần lọc theo tuần thực tế nếu muốn chính xác

  // 3. Số sinh viên (Unique students)
  const uniqueStudents = new Set(meetList.map(m => m.menteeName)).size;


  // --- DỮ LIỆU HIỂN THỊ ---
  let stats = [];

  if (userRole === "student") {
    stats = [
      {
        label: "Buổi tuần này",
        value: String(studentThisWeek),
        sub: "Đã đặt lịch",
        icon: CalendarIcon,
        color: "bg-blue-100 text-blue-600",
      },
      {
        label: "Hoàn thành",
        value: String(studentCompleted),
        sub: "Tổng cộng",
        icon: CheckCircle2,
        color: "bg-green-100 text-green-600",
      },
      {
        label: "Mentor",
        value: String(studentMentors),
        sub: "Đang hoạt động",
        icon: User,
        color: "bg-purple-100 text-purple-600",
      },
      {
        label: "Buổi tiếp theo",
        value: nextMeetValue,
        sub: nextMeetSub,
        icon: Clock,
        color: "bg-orange-100 text-orange-600",
      },
    ];
  } else {
    // Dữ liệu cho Tutor
    stats = [
      {
        label: "Giờ rảnh",
        value: `${tutorFreeHours}h`,
        sub: "Tuần này",
        icon: Clock, // Hoặc icon khác phù hợp
        color: "bg-blue-100 text-blue-600",
      },
      {
        label: "Buổi đã đặt",
        value: String(tutorBookedThisWeek),
        sub: "Tuần này",
        icon: BookOpen, // Hoặc CalendarCheck
        color: "bg-green-100 text-green-600",
      },
      {
        label: "Số sinh viên",
        value: String(uniqueStudents),
        sub: "Đang hướng dẫn",
        icon: Users,
        color: "bg-purple-100 text-purple-600",
      },
      {
        label: "Buổi tiếp theo",
        value: nextMeetValue,
        sub: nextMeetSub,
        icon: CalendarIcon,
        color: "bg-orange-100 text-orange-600",
      },
    ];
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</h3>
              <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
}