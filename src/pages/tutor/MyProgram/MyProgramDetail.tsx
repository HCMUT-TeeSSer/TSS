import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CalendarPlus, Users, FileText, AlertCircle } from "lucide-react";
import { programs } from "@/data/programs";
import MeetList from "@/pages/mentee/MyProgram/components/meetList";

import ProgramBreadcrumb from "@/components/Program/ProgramBreadcrumb";
import ProgramHeaderInfo from "@/components/Program/ProgramHeaderInfo";
import ProgramTabs, { type TabKey } from "@/components/Program/ProgramTabs";
import ProgramDescription from "@/components/Program/ProgramDescription";

export default function ProgramDetail() {
  const { programId } = useParams<{ programId: string }>();
  const [activeTab, setActiveTab] = useState<TabKey>("meet");
  const program = programs.find((p) => p.id === Number(programId));

  if (!program) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center space-y-4 bg-gray-50'>
        <AlertCircle className='h-16 w-16 text-red-500' />
        <h2 className='text-2xl font-bold text-gray-900'>Không tìm thấy chương trình</h2>
        <Link to='/tutor/programs' className='font-medium text-blue-600 hover:underline'>
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  const currentProgramId = Number(programId);

  return (
    <div className='min-h-screen bg-gray-50 pb-12'>
      <ProgramBreadcrumb backLink='/tutor/programs' currentTitle={program.title} />

      <div className='container mx-auto mt-6 px-4'>
        <div className='overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm'>
          <ProgramHeaderInfo
            title={program.title}
            subtitle='Bảng điều khiển cho Tutor'
            statusLabel='Đang hoạt động'
            metaText='15 học viên đã đăng ký'
            progress={undefined} // KHÔNG truyền progress -> Ẩn thanh bar
            actions={
              <>
                <button className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700'>
                  <CalendarPlus className='h-4 w-4' /> Đặt lịch rảnh
                </button>
                <button className='flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700'>
                  <Users className='h-4 w-4' /> Xem học viên
                </button>
                <button className='flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50'>
                  <FileText className='h-4 w-4' /> Báo cáo
                </button>
              </>
            }
          />

          <ProgramTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className='mt-6'>
          {activeTab === "meet" && <MeetList userRole='tutor' programId={currentProgramId} />}

          {activeTab === "content" && (
            <ProgramDescription description={program.description} department={program.department} />
          )}

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
