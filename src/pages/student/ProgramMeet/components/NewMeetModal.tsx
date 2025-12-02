// src/components/meets/NewMeetModal.tsx
import { useState } from "react";
import { toast } from "react-toastify";
import { type MeetData } from "@/data/meets";

interface NewMeetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: MeetData) => void;
  initialMeet?: MeetData;
}

export default function NewMeetModal({ isOpen, onClose, onConfirm, initialMeet }: NewMeetModalProps) {
  const [topic, setTopic] = useState(initialMeet?.topic ?? "");
  const [describe, setDescribe] = useState(initialMeet?.describe ?? "");
  const [date, setDate] = useState(initialMeet?.date ?? "");
  const [beginTime, setTime1] = useState(initialMeet?.beginTime ?? "");
  const [endTime, setTime2] = useState(initialMeet?.endTime ?? "");
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setErrors] = useState({ time: "", future: "" });

  const isEditMode = !!initialMeet?.id;

  if (!isOpen) return null;

  const validateInputs = () => {
    let errorMsg = "";

    if (!topic.trim() || !describe.trim() || !date || !beginTime || !endTime) {
      errorMsg = "Vui lòng điền đầy đủ tất cả các trường bắt buộc.";
    }

    const timeToMinutes = (timeStr: string) => {
      const [hour, minute] = timeStr.split(":").map(Number);
      return hour * 60 + minute;
    };

    if (!errorMsg && beginTime && endTime) {
      const MIN_DURATION = 60;
      const startMinutes = timeToMinutes(beginTime);
      const endMinutes = timeToMinutes(endTime);
      const durationMinutes = endMinutes - startMinutes;
      if (durationMinutes <= 0) {
        errorMsg = "Thời gian bắt đầu phải trước thời gian kết thúc.";
      } else if (durationMinutes < MIN_DURATION) {
        errorMsg = "Thời lượng lịch hẹn phải tối thiểu 60 phút.";
      }
    }

    const now = new Date();
    const futureTime = new Date(now.getTime() + 60000);
    const year = futureTime.getFullYear();
    const month = String(futureTime.getMonth() + 1).padStart(2, "0");
    const day = String(futureTime.getDate()).padStart(2, "0");
    const currentISODate = `${String(year)}-${month}-${day}`;
    const currentMinute = now.getMinutes() + 1;
    const currentHour = now.getHours() + (currentMinute === 60 ? 1 : 0);
    const nextMinute = currentMinute === 60 ? 0 : currentMinute;
    const currentTime = `${String(currentHour).padStart(2, "0")}:${String(nextMinute).padStart(2, "0")}`;

    if (!errorMsg && date) {
      if (date < currentISODate) {
        errorMsg = "Lịch hẹn phải được đặt từ ngày hôm nay trở đi.";
      } else if (date === currentISODate && beginTime && beginTime < currentTime) {
        errorMsg = "Thời điểm hẹn phải lớn hơn thời điểm hiện tại.";
      }
    }

    setErrors({
      time:
        (beginTime && endTime && beginTime >= endTime) || timeToMinutes(endTime) - timeToMinutes(beginTime) < 60
          ? "Thời gian cuộc hẹn tối thiểu 60 phút."
          : "",
      future: date && date < currentISODate ? "Lịch hẹn phải được đặt từ ngày hôm nay trở đi." : "",
    });

    return { isValid: !errorMsg, errorMsg };
  };

  const handleConfirm = () => {
    const validationResult = validateInputs();
    if (!validationResult.isValid) {
      toast.error(validationResult.errorMsg || "Vui lòng kiểm tra lại thông tin lịch hẹn.");
      return;
    }
    onConfirm({
      id: initialMeet?.id,
      topic,
      describe,
      date,
      beginTime,
      endTime,
    });
    onClose();
  };

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const minDate = `${String(year)}-${month}-${day}`;
  
  const currentMinute = now.getMinutes() + 1;
  const currentHour = now.getHours() + (currentMinute === 60 ? 1 : 0);
  const nextMinute = currentMinute === 60 ? 0 : currentMinute;
  const currentTime = `${String(currentHour).padStart(2, "0")}:${String(nextMinute).padStart(2, "0")}`;
  const minTime = date === minDate ? currentTime : undefined;

  return (
    <div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-gray-900'>
      <div className='w-full max-w-lg rounded-lg bg-white p-6 shadow-xl'>
        <h3 className='text-lg font-semibold text-gray-900'>
          {isEditMode ? "Chỉnh sửa lịch hẹn" : "Tạo lịch hẹn mới"}
        </h3>
        <p className='mt-2 text-sm text-gray-500'>
          {isEditMode
            ? "Cập nhật thông tin cho buổi tư vấn này."
            : "Chọn thời gian và nội dung buổi tư vấn bạn muốn đặt."}
        </p>

        <div className='mt-4 space-y-4'>
          <div>
            <label htmlFor='topic' className='mb-1 block text-sm font-medium text-gray-700'>Chủ đề</label>
            <input
              id='topic'
              type='text'
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className='w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-blue-500'
              placeholder='Ví dụ: Dự án cuối kỳ'
            />
          </div>

          <div>
            <label htmlFor='describe' className='mb-1 block text-sm font-medium text-gray-700'>Mô tả</label>
            <input
              id='describe'
              type='text'
              value={describe}
              onChange={(e) => setDescribe(e.target.value)}
              className='w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-blue-500'
              placeholder='Chi tiết nội dung cần trao đổi...'
            />
          </div>

          <div className='flex space-x-4'>
            <div className='flex-1'>
              <label htmlFor='date' className='mb-1 block text-sm font-medium text-gray-700'>Ngày</label>
              <input
                id='date'
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={minDate}
                className='w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-blue-500'
              />
            </div>
            <div className='flex-1'>
              <label htmlFor='beginTime' className='mb-1 block text-sm font-medium text-gray-700'>Bắt đầu</label>
              <input
                id='beginTime'
                type='time'
                value={beginTime}
                onChange={(e) => setTime1(e.target.value)}
                min={minTime}
                className='w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-blue-500'
              />
            </div>
            <div className='flex-1'>
              <label htmlFor='endTime' className='mb-1 block text-sm font-medium text-gray-700'>Kết thúc</label>
              <input
                id='endTime'
                type='time'
                value={endTime}
                onChange={(e) => setTime2(e.target.value)}
                min={minTime}
                className='w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-blue-500'
              />
            </div>
          </div>
        </div>

        <div className='mt-6 flex justify-end space-x-3'>
          <button
            type='button'
            onClick={onClose}
            className='rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50'
          >
            Hủy
          </button>
          <button
            type='button'
            onClick={handleConfirm}
            disabled={!topic.trim() || !date || !beginTime || !endTime}
            className='rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:bg-blue-300'
          >
            {isEditMode ? "Lưu thay đổi" : "Tạo lịch hẹn"}
          </button>
        </div>
      </div>
    </div>
  );
}