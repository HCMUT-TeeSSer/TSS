import { useState } from "react";
import { Star, X } from "lucide-react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

export default function ReviewModal({ isOpen, onClose, onSubmit }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rating, comment);
    // Reset form sau khi submit
    setRating(0);
    setComment("");
  };

  return (
    <div className='animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 duration-200'>
      <div className='w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl'>
        {/* Header */}
        <div className='flex items-center justify-between border-b border-gray-100 p-4'>
          <h3 className='text-lg font-bold text-gray-900'>Đánh giá buổi học</h3>
          <button
            onClick={onClose}
            className='rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600'
          >
            <X className='h-5 w-5' />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className='p-6'>
          <div className='mb-6 flex flex-col items-center'>
            <p className='mb-3 text-sm text-gray-500'>Bạn cảm thấy buổi hướng dẫn thế nào?</p>

            {/* Star Rating */}
            <div className='flex gap-2'>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type='button'
                  className='transition-transform hover:scale-110 focus:outline-none'
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoverRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className='mt-2 h-5 text-sm font-medium text-yellow-600'>
              {hoverRating || rating
                ? ["Rất tệ", "Tệ", "Bình thường", "Tốt", "Tuyệt vời"][(hoverRating || rating) - 1]
                : ""}
            </p>
          </div>

          {/* Comment */}
          <div className='mb-6'>
            <label htmlFor='comment' className='mb-1 block text-sm font-medium text-gray-700'>
              Nhận xét (Tùy chọn)
            </label>
            <textarea
              id='comment'
              rows={4}
              className='w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
              placeholder='Chia sẻ thêm về trải nghiệm của bạn...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className='flex gap-3'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50'
            >
              Hủy
            </button>
            <button
              type='submit'
              disabled={rating === 0}
              className='flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50'
            >
              Gửi đánh giá
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
