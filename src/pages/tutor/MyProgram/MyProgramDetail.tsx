import { useState } from "react"; // React
import { useParams, Link } from "react-router-dom"; // {useParams}
import MeetList from "@/pages/mentee/MyProgram/components/meetList"; // Import component lịch hẹn đã làm sạch
import { Video, Save, Share2, FileDown, ChevronRight, AlertCircle, BookOpen, Clock, Star } from "lucide-react";
import { programs } from "@/data/programs";

export default function ProgramDetail() {
  //const { programId } = useParams();
  // State quản lý Tab, mặc định vào tab "meet" (Lịch hẹn) để bạn test
  const { programId } = useParams<{ programId: string }>();
  const [activeTab, setActiveTab] = useState<"content" | "docs" | "meet" | "do">("meet");
  const program = programs.find((p) => p.id === Number(programId));

  if (!program) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center space-y-4 bg-gray-50'>
        <AlertCircle className='h-16 w-16 text-red-500' />
        <h2 className='text-2xl font-bold text-gray-900'>Không tìm thấy chương trình</h2>
        <p className='text-gray-500'>Chương trình bạn đang tìm kiếm không tồn tại.</p>
        <Link to='/mentee/programs' className='font-medium text-blue-600 hover:underline'>
          Quay lại danh sách
        </Link>
      </div>
    );
  }
  // Mock data cho Header
  const programInfo = {
    title: program.title,
    tutor: "TS. Trần Minh Khoa", // Placeholder vì programs.ts chưa có field tutor cụ thể
    progress: 65, // Placeholder
    category: program.category,
    description: program.description,
    difficulty: program.difficulty,
    duration: program.duration,
    rating: program.rating,
    department: program.department,
  };

  const currentProgramId = Number(programId);

  return (
    <div className='min-h-screen bg-gray-50 pb-12'>
      {/* Breadcrumb */}
      <div className='border-b bg-white'>
        <div className='container mx-auto flex items-center px-4 py-3 text-sm text-gray-500'>
          <Link to='/mentee/programs' className='hover:text-indigo-600'>
            Chương trình
          </Link>
          <ChevronRight className='mx-2 h-4 w-4' />
          <span className='max-w-xs truncate font-medium text-gray-900'>{programInfo.title}</span>
        </div>
      </div>

      <div className='container mx-auto mt-6 px-4'>
        {/* --- KHỐI UPPER PROGRAM INFO --- */}
        <div className='mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
          <div className='mb-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
            <div className='flex items-center gap-4'>
              <div className='rounded-xl bg-blue-50 p-3'>
                <Video className='h-8 w-8 text-blue-600' />
              </div>
              <div>
                <h1 className='text-2xl font-bold text-gray-900'>{programInfo.title}</h1>
                <div className='mt-1 flex items-center gap-2 text-sm text-gray-500'>
                  <span>{programInfo.category}</span>
                  <span>•</span>
                  <span>{programInfo.tutor}</span>
                </div>
              </div>
            </div>
            <div className='flex gap-2'>
              <button className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'>
                <Save className='h-4 w-4' /> Đặt lịch rảnh
              </button>
              <button className='flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700'>
                <Share2 className='h-4 w-4' /> Xem học viên
              </button>
              <button className='bg-white-600 flex items-center gap-2 rounded-lg border-gray-400 px-4 py-2 text-sm font-medium text-black hover:bg-gray-400'>
                <FileDown className='h-4 w-4' /> Báo cáo
              </button>
              {/* Các nút khác... */}
            </div>
          </div>

          {/* Progress Bar & Stats */}
          <div className='mt-6 mb-1 flex items-center justify-between text-sm text-gray-600'>
            <div className='flex gap-4'>
              <span className='flex items-center gap-1'>
                <Clock className='h-4 w-4' /> {programInfo.duration}
              </span>
              <span className='flex items-center gap-1'>
                <Star className='h-4 w-4 fill-yellow-500 text-yellow-500' /> {programInfo.rating}
              </span>
              <span className='rounded bg-gray-100 px-2 py-0.5 text-xs font-medium'>{programInfo.difficulty}</span>
            </div>
            <span className='font-bold'>Tiến độ: {programInfo.progress}%</span>
          </div>
          <div className='mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100'>
            <div
              className='h-full rounded-full bg-blue-600'
              style={{ width: `${String(programInfo.progress)}%` }}
            ></div>
          </div>

          {/* --- THANH TABS --- */}
          <div className='mt-8 flex gap-8 border-b border-gray-100'>
            {[
              { id: "content", label: "Nội dung" },
              { id: "docs", label: "Buổi tư vấn" },
              { id: "meet", label: "Lịch hẹn" },
              { id: "do", label: "Năng lực" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as "content" | "meet" | "docs" | "do");
                }}
                className={`relative pb-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className='absolute bottom-0 left-0 h-0.5 w-full rounded-t-full bg-blue-600'></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* --- KHỐI HIỂN THỊ NỘI DUNG TAB --- */}
        <div>
          {activeTab === "meet" && <MeetList userRole='tutor' programId={currentProgramId} />}

          {activeTab === "content" && (
            <div className='rounded-xl border border-gray-100 bg-white p-6'>
              <h3 className='mb-3 flex items-center gap-2 text-lg font-bold'>
                <BookOpen className='h-5 w-5 text-blue-600' />
                Mô tả chi tiết
              </h3>
              <p className='leading-relaxed text-gray-600'>{programInfo.description}</p>
              <div className='mt-4 rounded-lg bg-gray-50 p-4'>
                <p className='text-sm text-gray-500'>
                  Khoa quản lý: <span className='font-medium text-gray-900'>{programInfo.department}</span>
                </p>
              </div>
            </div>
          )}

          {/* Các tab khác */}
          {(activeTab === "docs" || activeTab === "do") && (
            <div className='rounded-xl border border-gray-100 bg-white p-12 text-center text-gray-500'>
              Nội dung đang được cập nhật...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
