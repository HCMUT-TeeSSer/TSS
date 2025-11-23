import { useState } from "react";

interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export default function RejectModal({ isOpen, onClose, onConfirm }: RejectModalProps) {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(reason);
    setReason("");
    onClose();
  };

  return (
    <div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-gray-900'>
      <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-xl'>
        <h3 className='text-lg font-semibold text-gray-900'>Lý do từ chối lịch hẹn</h3>
        <p className='mt-2 text-sm text-gray-500'>Vui lòng cho biết lý do bạn muốn hủy lịch hẹn đã được duyệt.</p>
        <textarea
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
          }}
          rows={4}
          className='mt-4 w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-blue-500'
          placeholder='Nhập lý do...'
        />
        <div className='mt-4 flex justify-end space-x-3'>
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
            disabled={!reason.trim()}
            className='rounded-lg border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 disabled:bg-red-300'
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
