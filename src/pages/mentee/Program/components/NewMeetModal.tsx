import { useState } from "react";

interface NewMeetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: unknown) => void;
}

export default function NewMeetModal({ isOpen, onClose, onConfirm }: NewMeetModalProps) {
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm({ topic, date, time });
    setTopic("");
    setDate("");
    setTime("");
    onClose();
  };

  return (
    <div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-gray-900'>
      <div className='w-full max-w-lg rounded-lg bg-white p-6 shadow-xl'>
        <h3 className='text-lg font-semibold text-gray-900'>Tạo lịch hẹn mới</h3>
        <p className='mt-2 text-sm text-gray-500'>Chọn thời gian và nội dung buổi tư vấn bạn muốn đặt.</p>
        <div className='mt-4 space-y-4'>
          <div>
            <label htmlFor='topic' className='mb-1 block text-sm font-medium text-gray-700'>
              Chủ đề
            </label>
            <input
              id='topic'
              type='text'
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
              }}
              className='w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-blue-500'
              placeholder='Ví dụ: Thảo luận thiết kế cơ sở dữ liệu'
            />
          </div>
          <div className='flex space-x-4'>
            <div className='flex-1'>
              <label htmlFor='date' className='mb-1 block text-sm font-medium text-gray-700'>
                Ngày
              </label>
              <input
                id='date'
                type='date'
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                className='w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-blue-500'
              />
            </div>
            <div className='flex-1'>
              <label htmlFor='time' className='mb-1 block text-sm font-medium text-gray-700'>
                Thời gian
              </label>
              <input
                id='time'
                type='time'
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                }}
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
            disabled={!topic.trim() || !date || !time}
            className='rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:bg-blue-300'
          >
            Tạo lịch hẹn
          </button>
        </div>
      </div>
    </div>
  );
}
