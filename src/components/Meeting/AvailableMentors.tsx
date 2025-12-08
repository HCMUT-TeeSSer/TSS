// src/components/Meeting/AvailableMentors.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Star, X, BookOpen, ChevronRight } from "lucide-react";
import { tutors, type Tutor } from "@/data/tutors";
import { programs } from "@/data/programs";

export default function AvailableMentors() {
  const navigate = useNavigate();

  // State tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");

  // State quản lý modal chọn khóa học
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);

  // 1. Lọc danh sách Mentor theo từ khóa và trạng thái hoạt động
  const filteredTutors = tutors
    .filter((t) => {
      const isActive = t.status === "Hoạt động";
      const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
      return isActive && matchesSearch;
    })
    .slice(0, 6); // Lấy tối đa 6 người để hiển thị cho đẹp

  // 2. Lấy danh sách khóa học của Tutor đang chọn
  // Logic: Tìm trong data programs xem khóa nào có mainTutor hoặc listTutor chứa id của tutor này
  const getTutorPrograms = (tutorId: number) => {
    return programs.filter((p) => p.mainTutor.id === tutorId || p.listTutor.some((t) => t.id === tutorId));
  };

  // Xử lý khi chọn khóa học -> Chuyển trang
  const handleSelectProgram = (programId: number) => {
    navigate(`/student/meet/${programId}`);
    setSelectedTutor(null); // Đóng modal
  };

  return (
    <div className='mt-8'>
      <div className='rounded-xl border border-gray-200 bg-white p-6'>
        {/* --- Header & Search Bar --- */}
        <div className='mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row'>
          <h3 className='text-lg font-bold text-gray-900'>Mentor có sẵn</h3>
          <div className='relative w-full sm:w-64'>
            <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              placeholder='Tìm kiếm mentor...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full rounded-lg border border-gray-200 py-2 pr-4 pl-9 text-sm transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
            />
          </div>
        </div>

        {/* --- Tutor Grid --- */}
        {filteredTutors.length > 0 ? (
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {filteredTutors.map((mentor) => (
              <div
                key={mentor.id}
                className='group flex cursor-pointer gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-blue-200 hover:shadow-md'
              >
                <img
                  src={mentor.avatarUrl}
                  alt={mentor.name}
                  className='h-14 w-14 rounded-full object-cover ring-2 ring-gray-50'
                />
                <div className='flex h-full flex-1 flex-col'>
                  <h4 className='font-bold text-gray-900 transition-colors group-hover:text-blue-600'>{mentor.name}</h4>
                  {/* Giả định chuyên ngành */}
                  <p className='text-xs font-medium text-gray-500'>Khoa học máy tính</p>

                  <div className='mt-1 mb-2 flex items-center gap-1'>
                    <div className='flex text-yellow-400'>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < Math.floor(mentor.rating) ? "fill-current" : ""}`} />
                      ))}
                    </div>
                    <span className='text-xs font-medium text-gray-400'>({mentor.rating})</span>
                  </div>
                  <p className='mt-auto text-xs text-gray-500'>
                    Có sẵn: <span className='font-medium text-gray-700'>Hôm nay 15:00</span>
                  </p>
                </div>
                <div className='flex flex-col justify-end'>
                  <button
                    onClick={() => setSelectedTutor(mentor)}
                    className='rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-600 hover:text-white'
                  >
                    Đặt lịch
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='py-8 text-center text-sm text-gray-500'>Không tìm thấy mentor nào phù hợp.</div>
        )}
      </div>

      {/* --- Modal Chọn Khóa Học --- */}
      {selectedTutor && (
        <div className='animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 duration-200'>
          <div className='w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl'>
            {/* Modal Header */}
            <div className='flex items-center justify-between border-b border-gray-100 bg-gray-50 p-4'>
              <h3 className='font-bold text-gray-900'>Chọn khóa học</h3>
              <button
                onClick={() => setSelectedTutor(null)}
                className='rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600'
              >
                <X className='h-5 w-5' />
              </button>
            </div>

            {/* Modal Body */}
            <div className='p-4'>
              <p className='mb-4 text-sm text-gray-600'>
                Bạn muốn đặt lịch hẹn cho khóa học nào với mentor{" "}
                <span className='font-bold text-blue-600'>{selectedTutor.name}</span>?
              </p>

              <div className='max-h-60 space-y-2 overflow-y-auto pr-1'>
                {getTutorPrograms(selectedTutor.id).length > 0 ? (
                  getTutorPrograms(selectedTutor.id).map((prog) => (
                    <button
                      key={prog.id}
                      onClick={() => handleSelectProgram(prog.id)}
                      className='group flex w-full items-center justify-between rounded-lg border border-gray-200 p-3 text-left transition-all hover:border-blue-500 hover:bg-blue-50'
                    >
                      <div className='flex items-center gap-3'>
                        <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600'>
                          <BookOpen className='h-4 w-4' />
                        </div>
                        <div>
                          <p className='text-sm font-semibold text-gray-900 group-hover:text-blue-700'>{prog.title}</p>
                          <p className='text-xs text-gray-500'>{prog.category}</p>
                        </div>
                      </div>
                      <ChevronRight className='h-4 w-4 text-gray-400 group-hover:text-blue-500' />
                    </button>
                  ))
                ) : (
                  <div className='rounded-lg border border-dashed border-gray-300 bg-gray-50 py-6 text-center'>
                    <p className='text-sm text-gray-500'>Bạn chưa tham gia khóa học nào của mentor này.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
