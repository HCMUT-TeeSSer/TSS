import React from "react";
import { Code2 } from "lucide-react"; // Icon đại diện khóa học

interface ProgramHeaderInfoProps {
  title: string;
  subtitle: string;
  statusLabel?: string;
  metaText?: string;
  progress?: number;
  actions?: React.ReactNode;
}

export default function ProgramHeaderInfo({
  title,
  subtitle,
  statusLabel = "Đang hoạt động",
  metaText,
  progress,
  actions,
}: ProgramHeaderInfoProps) {
  return (
    <div className='rounded-t-2xl bg-white p-6 pb-0'>
      {/* Top Row: Icon - Info - Actions */}
      <div className='flex flex-col gap-6 md:flex-row md:items-start md:justify-between'>
        {/* Left: Icon & Text */}
        <div className='flex gap-5'>
          {/* Course Icon Box */}
          <div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600'>
            <Code2 className='h-8 w-8' />
          </div>

          {/* Info Text */}
          <div className='flex flex-col gap-1'>
            <h1 className='text-2xl font-bold text-gray-900'>{title}</h1>
            <p className='text-sm text-gray-500'>{subtitle}</p>

            {/* Status & Meta Row */}
            <div className='mt-2 flex items-center gap-3'>
              <span className='rounded-full bg-emerald-500 px-3 py-0.5 text-xs font-bold text-white'>
                {statusLabel}
              </span>
              {metaText && <span className='text-sm text-gray-500'>{metaText}</span>}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className='flex shrink-0 gap-3 pt-1'>{actions}</div>
      </div>

      {/* eslint-disable @typescript-eslint/restrict-template-expressions */}
      {/* Bottom Row: Progress Bar (Optional) */}
      {typeof progress === "number" && (
        <div className='mt-6 mb-2'>
          <div className='h-2 w-full max-w-2xl overflow-hidden rounded-full bg-gray-100'>
            <div
              className='h-full rounded-full bg-blue-600 transition-all duration-500'
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
