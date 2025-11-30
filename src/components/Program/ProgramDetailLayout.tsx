import React from "react";
import { useNavigate } from "react-router-dom";
import { Code2, Save, Share2, FileDown, Clock, Star } from "lucide-react";
import ProgramBreadcrumb from "@/components/Program/ProgramBreadcrumb";
import path from "@/constants/path";

export type TabId = "content" | "sessions" | "meet" | "competencies";

export interface TabConfig {
  id: TabId;
  label: string;
  path?: string;
}

interface ProgramDetailLayoutProps {
  // programId: number;
  programTitle: string;
  programSubtitle?: string;
  // programDepartment?: string;
  programDuration?: string;
  programRating?: number;
  programDifficulty?: string;
  programProgress?: number;
  statusLabel?: string;
  activeTab: TabId;
  tabs: TabConfig[];
  backLink?: string;
  backLabel?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  icon?: React.ReactNode;
}

export default function ProgramDetailLayout({
  programTitle,
  programSubtitle = "với TS. Trần Minh Khoa",
  programDuration,
  programRating,
  programDifficulty,
  programProgress,
  statusLabel = "Đang hoạt động",
  activeTab,
  tabs,
  backLink = path.studentPrograms,
  backLabel = "Chương trình học",
  children,
  actions,
  icon,
}: ProgramDetailLayoutProps) {
  const navigate = useNavigate();

  const defaultActions = (
    <>
      <button className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700'>
        <Save className='h-4 w-4' /> Lưu chương trình
      </button>
      <button className='flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600'>
        <Share2 className='h-4 w-4' /> Chia sẻ
      </button>
      <button className='flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50'>
        <FileDown className='h-4 w-4' /> Xuất file
      </button>
    </>
  );

  const defaultIcon = (
    <div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600'>
      <Code2 className='h-8 w-8' />
    </div>
  );

  const handleTabClick = (tab: TabConfig) => {
    if (tab.path) {
      void navigate(tab.path);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 pb-12'>
      <ProgramBreadcrumb backLink={backLink} backLabel={backLabel} currentTitle={programTitle} />

      <div className='container mx-auto mt-6 px-4'>
        {/* Header + Tabs Container */}
        <div className='overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm'>
          {/* Header Section */}
          <div className='rounded-t-2xl bg-white p-6 pb-0'>
            {/* Top Row: Icon - Info - Actions */}
            <div className='flex flex-col gap-6 md:flex-row md:items-start md:justify-between'>
              {/* Left: Icon & Text */}
              <div className='flex gap-5'>
                {icon ?? defaultIcon}

                {/* Info Text */}
                <div className='flex flex-col gap-1'>
                  <h1 className='text-2xl font-bold text-gray-900'>{programTitle}</h1>
                  <p className='text-sm text-gray-500'>{programSubtitle}</p>

                  {/* Status & Meta Row */}
                  <div className='mt-2 flex items-center gap-3'>
                    {statusLabel && (
                      <span className='rounded-full bg-emerald-500 px-3 py-0.5 text-xs font-bold text-white'>
                        {statusLabel}
                      </span>
                    )}
                    {programProgress !== undefined && (
                      <span className='text-sm text-gray-500'>Tiến độ: {programProgress}%</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className='flex shrink-0 gap-3 pt-1'>{actions ?? defaultActions}</div>
            </div>

            {/* Bottom Row: Meta Info + Progress Bar */}
            {(programDuration ?? programRating ?? programDifficulty ?? programProgress !== undefined) && (
              <div className='mt-6 mb-2'>
                {/* Meta Information */}
                {(programDuration ?? programRating ?? programDifficulty) && (
                  <div className='mb-3 flex flex-wrap items-center gap-4 text-xs text-gray-600'>
                    {programDuration && (
                      <span className='flex items-center gap-1'>
                        <Clock className='h-4 w-4 text-gray-500' />
                        {programDuration}
                      </span>
                    )}
                    {programRating && (
                      <span className='flex items-center gap-1'>
                        <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                        {programRating.toFixed(1)}
                      </span>
                    )}
                    {programDifficulty && (
                      <span className='rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium'>
                        {programDifficulty}
                      </span>
                    )}
                  </div>
                )}

                {/* Progress Bar */}
                {programProgress !== undefined && (
                  <div className='h-2 w-full max-w-2xl overflow-hidden rounded-full bg-gray-100'>
                    <div
                      className='h-full rounded-full bg-blue-600 transition-all duration-500'
                      style={{ width: `${String(programProgress)}%` }}
                    ></div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className='mt-6 flex gap-8 border-b border-gray-100 px-6'>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    handleTabClick(tab);
                  }}
                  className={`group relative flex items-center gap-2 pb-4 text-sm font-medium transition-colors ${
                    isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className='absolute bottom-0 left-0 h-0.5 w-full rounded-t-full bg-blue-600'></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className='mt-6'>{children}</div>
      </div>
    </div>
  );
}
