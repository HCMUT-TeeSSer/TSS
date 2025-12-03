// src/data/meets.ts

// --- INTERFACES ---
export interface Meet {
  id: number;
  programId: number;
  status: "pending" | "approved" | "rejected";
  tutorName: string;
  menteeName: string;
  topic: string;
  describe: string;
  createAt: string;
  date: string;
  beginTime: string;
  endTime: string;
  subject: string;
  reason: string;
  type: "mentee" | "tutor";
  startDateTime?: Date; 
}

export interface MeetData {
  id?: number;
  topic: string;
  describe: string;
  date: string;
  beginTime: string;
  endTime: string;
}

// Interface props
export interface MeetListProps {
  userRole: "mentee" | "tutor";
  programId: number;
}

// mock data
export const meets: Meet[] = [
  {
    id: 1,
    programId: 1,
    type: "mentee",
    status: "approved", // Đã duyệt
    tutorName: "Trần Thị B",
    menteeName: "Nguyễn Văn A",
    topic: "Review code Python tuần 3",
    describe: "Nhờ cô xem giúp phần xử lý bất đồng bộ.",
    createAt: "2025-11-20T08:00:00Z",
    date: "2025-12-31",
    beginTime: "14:00",
    endTime: "15:00",
    subject: "Khoa học máy tính",
    reason: "Đã đồng ý",
  },
  {
    id: 2,
    programId: 1,
    type: "mentee",
    status: "pending", // Đang chờ duyệt
    tutorName: "Trần Thị B",
    menteeName: "Nguyễn Văn A",
    topic: "Hướng dẫn cài đặt Docker",
    describe: "Em bị lỗi khi chạy container trên Windows.",
    createAt: "2025-11-28T10:30:00Z",
    date: "2026-01-15",
    beginTime: "09:00",
    endTime: "10:00",
    subject: "Khoa học máy tính",
    reason: "Chưa duyệt",
  },

  // --- 2. Tutor Trần Thị B & Các Mentee Khác ---
  {
    id: 3,
    programId: 1,
    type: "mentee",
    status: "approved",
    tutorName: "Trần Thị B",
    menteeName: "Hoàng Minh E", // Mentee khác
    topic: "Cấu trúc dữ liệu nâng cao",
    describe: "Thảo luận về giải thuật cây nhị phân.",
    createAt: "2025-11-25T09:00:00Z",
    date: "2026-01-12",
    beginTime: "15:30",
    endTime: "16:30",
    subject: "Khoa học máy tính",
    reason: "Đã đồng ý",
  },
  {
    id: 4,
    programId: 2, // Program khác (Giải tích)
    type: "mentee",
    status: "rejected",
    tutorName: "Trần Thị B",
    menteeName: "Lê Văn C", // Mentee khác
    topic: "Ôn tập Tích phân",
    describe: "Em cần ôn lại trước kỳ thi.",
    createAt: "2025-11-15T14:00:00Z",
    date: "2026-01-01",
    beginTime: "19:00",
    endTime: "20:00",
    subject: "Toán học",
    reason: "Trùng lịch bận cá nhân",
  },

  // --- 3. ProgramID 1: Tutor KHÁC (Phạm Thị D) & Mentee Nguyễn Văn A ---
  {
    id: 5,
    programId: 1,
    type: "mentee",
    status: "approved",
    tutorName: "Phạm Thị D", // Tutor khác Trần Thị B
    menteeName: "Nguyễn Văn A", // Vẫn là Mentee A
    topic: "Tư vấn lộ trình DevOps",
    describe: "Em muốn hỏi thêm về hướng đi DevOps sau khóa học.",
    createAt: "2025-11-29T11:00:00Z",
    date: "2025-12-29",
    beginTime: "10:00",
    endTime: "11:00",
    subject: "Khoa học máy tính",
    reason: "Đã đồng ý",
  },
]