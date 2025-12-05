// src/data/FreeSched.ts

export interface FreeSchedule {
  id: number;
  tutorId: number;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  status: "available" | "booked";
}

export const freeSchedules: FreeSchedule[] = [
  // Ngày 05/12/2025
  { id: 1, tutorId: 20210001, date: "2025-12-05", startTime: "09:00", endTime: "10:00", status: "available" },
  { id: 2, tutorId: 20210001, date: "2025-12-05", startTime: "10:00", endTime: "11:00", status: "available" },
  { id: 3, tutorId: 20210001, date: "2025-12-05", startTime: "14:00", endTime: "15:00", status: "booked" },

  // Ngày 06/12/2025
  { id: 4, tutorId: 20210001, date: "2025-12-06", startTime: "08:00", endTime: "10:00", status: "available" },
  { id: 5, tutorId: 20210001, date: "2025-12-06", startTime: "15:00", endTime: "17:00", status: "available" },

  // Ngày 08/12/2025
  { id: 6, tutorId: 20210001, date: "2025-12-08", startTime: "19:00", endTime: "21:00", status: "available" },

  // Ngày 15/12/2025 (Ngày demo mặc định)
  { id: 7, tutorId: 20210001, date: "2025-12-15", startTime: "08:00", endTime: "10:00", status: "available" },
  { id: 8, tutorId: 20210001, date: "2025-12-15", startTime: "14:00", endTime: "16:00", status: "available" },
  { id: 9, tutorId: 20210001, date: "2025-12-15", startTime: "16:00", endTime: "17:00", status: "booked" },

  // Ngày 16/12/2025
  { id: 10, tutorId: 20210001, date: "2025-12-16", startTime: "09:00", endTime: "11:00", status: "available" },
  { id: 11, tutorId: 20210001, date: "2025-12-16", startTime: "13:00", endTime: "15:00", status: "available" },
];