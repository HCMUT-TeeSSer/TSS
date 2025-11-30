import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Bookmark, CornerUpRight, Download, AlertCircle } from "lucide-react";
import { programs } from "@/data/programs";
import MeetList from "./components/meetList";

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
        <Link to='/mentee/programs' className='font-medium text-blue-600 hover:underline'>
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  const currentProgramId = Number(programId);

  return (
    <div className='min-h-screen bg-gray-50 pb-12'>
      <ProgramBreadcrumb backLink='/mentee/programs' currentTitle={program.title} />

      <div className='container mx-auto mt-6 px-4'>
        {/* Container trắng bao quanh Header và Tabs */}
        <div className='overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm'>
          {/* Header Info */}
          <ProgramHeaderInfo
            title={program.title}
            subtitle='với TS. Trần Minh Khoa'
            statusLabel='Đang hoạt động'
            metaText='Tiến độ: 65%'
            progress={65}
            actions={
              <>
                <button className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700'>
                  <Bookmark className='h-4 w-4' /> Lưu chương trình
                </button>
                <button className='flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700'>
                  <CornerUpRight className='h-4 w-4' /> Chia sẻ
                </button>
                <button className='flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50'>
                  <Download className='h-4 w-4' /> Xuất file
                </button>
              </>
            }
          />

          {/* Tabs */}
          <ProgramTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Nội dung Tab */}
        <div className='mt-6'>
          {activeTab === "meet" && <MeetList userRole='mentee' programId={currentProgramId} />}

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
