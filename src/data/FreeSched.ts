// src/data/FreeSched.ts

export interface FreeSchedule {
  id: number;
  tutorId: number; // ID của Tutor sở hữu lịch này
  date: string;    // Ngày: YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  status: "available" | "booked"; // Trạng thái
}

export const freeSchedules: FreeSchedule[] = [
  {
    id: 1,
    tutorId: 20210001, // Nguyễn Văn A
    date: "2025-12-15", // Trong tuần này (giả định)
    startTime: "08:00",
    endTime: "10:00",
    status: "available",
  },
  {
    id: 2,
    tutorId: 20210001,
    date: "2025-12-16",
    startTime: "14:00",
    endTime: "16:00",
    status: "available",
  },
  {
    id: 3,
    tutorId: 20210001,
    date: "2025-12-17",
    startTime: "09:00",
    endTime: "11:00",
    status: "booked", // Đã có người đặt
  },
  {
    id: 4,
    tutorId: 20210001,
    date: "2025-12-18",
    startTime: "13:00",
    endTime: "15:00",
    status: "available",
  },
  // Data cho tutor khác...
];