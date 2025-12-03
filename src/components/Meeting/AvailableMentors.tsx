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
  const filteredTutors = tutors.filter((t) => {
    const isActive = t.status === "Hoạt động";
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
    return isActive && matchesSearch;
  }).slice(0, 6); // Lấy tối đa 6 người để hiển thị cho đẹp

  // 2. Lấy danh sách khóa học của Tutor đang chọn
  // Logic: Tìm trong data programs xem khóa nào có mainTutor hoặc listTutor chứa id của tutor này
  const getTutorPrograms = (tutorId: number) => {
    return programs.filter(
      (p) =>
        p.mainTutor.id === tutorId || p.listTutor.some((t) => t.id === tutorId)
    );
  };

  // Xử lý khi chọn khóa học -> Chuyển trang
  const handleSelectProgram = (programId: number) => {
    navigate(`/student/meet/${programId}`);
    setSelectedTutor(null); // Đóng modal
  };

  return (
    <div className="mt-8">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {/* --- Header & Search Bar --- */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <h3 className="text-lg font-bold text-gray-900">Mentor có sẵn</h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm mentor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* --- Tutor Grid --- */}
        {filteredTutors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTutors.map((mentor) => (
              <div
                key={mentor.id}
                className="border border-gray-200 rounded-xl p-4 flex gap-4 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group bg-white"
              >
                <img
                  src={mentor.avatarUrl}
                  alt={mentor.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-50"
                />
                <div className="flex-1 flex flex-col h-full">
                  <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {mentor.name}
                  </h4>
                  {/* Giả định chuyên ngành */}
                  <p className="text-xs text-gray-500 font-medium">Khoa học máy tính</p>
                  
                  <div className="flex items-center gap-1 mt-1 mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(mentor.rating) ? "fill-current" : ""
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400 font-medium">
                      ({mentor.rating})
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-auto">
                    Có sẵn: <span className="text-gray-700 font-medium">Hôm nay 15:00</span>
                  </p>
                </div>
                <div className="flex flex-col justify-end">
                  <button
                    onClick={() => setSelectedTutor(mentor)}
                    className="bg-blue-50 text-blue-600 text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    Đặt lịch
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 text-sm">
            Không tìm thấy mentor nào phù hợp.
          </div>
        )}
      </div>

      {/* --- Modal Chọn Khóa Học --- */}
      {selectedTutor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-bold text-gray-900">Chọn khóa học</h3>
              <button
                onClick={() => setSelectedTutor(null)}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                Bạn muốn đặt lịch hẹn cho khóa học nào với mentor <span className="font-bold text-blue-600">{selectedTutor.name}</span>?
              </p>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {getTutorPrograms(selectedTutor.id).length > 0 ? (
                  getTutorPrograms(selectedTutor.id).map((prog) => (
                    <button
                      key={prog.id}
                      onClick={() => handleSelectProgram(prog.id)}
                      className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">
                            {prog.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {prog.category}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                    </button>
                  ))
                ) : (
                  <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <p className="text-sm text-gray-500">
                      Bạn chưa tham gia khóa học nào của mentor này.
                    </p>
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