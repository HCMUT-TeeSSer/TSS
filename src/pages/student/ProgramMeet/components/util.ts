// utils.ts
import { type Meet } from "@/data/meets";

export const updateMeetStatus = async (id: number, status: string, reason?: string) => {
  return new Promise<void>((resolve) => {
    console.log(`Updating Meet ${String(id)} to ${status}. Reason: ${reason ?? "N/A"}`);
    setTimeout(resolve, 300);
  });
};

export const getBoxClass = (status: Meet["status"]) => {
  if (status === "approved") return "border-green-200 bg-green-50";
  if (status === "pending") return "border-yellow-200 bg-yellow-50";
  return "border-gray-200 bg-white";
};

export const getSentTimeAgo = (createdAt: string) => {
  const now = new Date();
  const sentDate = new Date(createdAt);
  if (isNaN(sentDate.getTime())) return "không rõ";

  const diffMs = now.getTime() - sentDate.getTime();
  if (diffMs < 60000) return "vừa gửi";

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays > 0) return `${String(diffDays)} ngày trước`;
  if (diffHours > 0) return `${String(diffHours)} giờ trước`;
  return `${String(diffMinutes)} phút trước`;
};

export const parseDateTime = (dateStr: string, timeStr: string) => {
  const dateObj = new Date(`${dateStr}T${timeStr}:00`);
  if (isNaN(dateObj.getTime())) {
    return new Date(dateStr);
  }
  return dateObj;
};

export const isThisWeek = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);
  return date >= startOfWeek && date < endOfWeek;
};