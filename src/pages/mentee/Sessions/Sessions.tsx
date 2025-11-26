import { CalendarIcon, ClockIcon, PlayIcon, BellIcon, ArrowDownTrayIcon, PlusIcon } from "@heroicons/react/24/outline";
import SessionsData from "@/data/sessions.json";
import { useNavigate } from "react-router-dom";

const sessions = SessionsData;

export default function Sessions() {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='container mx-auto px-4 py-8'>
        {/* ===================== HEADER ======================= */}
        <div className='mb-8'>
          {/* Breadcrumb */}
          <div className='mb-3 text-sm text-slate-500'>
            <span className='cursor-pointer hover:text-slate-700'>Chương trình học</span>
            <span className='mx-2'>/</span>
            <span className='font-medium text-slate-900'>Lập trình Python nâng cao</span>
          </div>

          {/* Header Box */}
          <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
            <div className='flex flex-col justify-between gap-6 lg:flex-row'>
              {/* LEFT */}
              <div className='flex gap-4'>
                <div className='flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-2xl font-bold text-blue-600'>
                  {"</>"}
                </div>

                <div>
                  <h1 className='text-2xl font-bold text-slate-900'>Lập trình Python Nâng cao</h1>

                  <p className='mt-1 text-sm text-gray-600'>Với TS. Trần Minh Đức • 32 buổi • Đã hoàn thành 65%</p>

                  {/* Progress */}
                  <div className='mt-3'>
                    <div className='mb-1 text-xs text-blue-600'>65% hoàn thành</div>
                    <div className='h-2 w-full overflow-hidden rounded-full bg-slate-200'>
                      <div className='h-full w-[65%] rounded-full bg-blue-600' />
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT BUTTONS */}
              <div className='flex gap-3 self-start lg:self-center'>
                <button className='rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-50'>
                  Lưu chương trình
                </button>
                <button className='rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-50'>
                  Chia sẻ
                </button>
                <button className='rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700'>
                  Xuất file
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className='mt-6 flex flex-wrap gap-4 border-t border-slate-100 pt-3 text-sm'>
              {/* TAB: Tổng quan */}
              <button
                onClick={() => {
                  void navigate("/mentee/program-detail");
                }}
                className='rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-50'
              >
                Tổng quan
              </button>

              {/* TAB: Buổi tư vấn (✔ navigate) */}
              <button className='rounded-lg bg-blue-50 px-3 py-2 font-medium text-blue-600'>Buổi tư vấn</button>

              <button className='rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-50'>Tài liệu</button>
              <button className='rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-50'>Lộ trình</button>
            </div>
          </div>
        </div>

        {/* ===================== MAIN CONTENT ======================= */}
        <div className='grid grid-cols-1 items-start gap-8 lg:grid-cols-3'>
          {/* LEFT – session list */}
          <div className='flex flex-col gap-6 lg:col-span-2'>
            {sessions.map((s) => (
              <div
                key={s.id}
                className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md'
              >
                {/* TITLE + STATUS + DOWNLOAD */}
                <div className='flex items-start justify-between'>
                  <div>
                    <h2 className='text-lg font-semibold text-slate-900'>{s.topic}</h2>
                    <p className='mt-1 text-sm text-slate-600'>{s.description}</p>
                  </div>

                  <div className='flex items-center gap-3'>
                    <span className={`rounded-full border px-3 py-0.5 text-xs ${s.statusColor}`}>{s.status}</span>

                    <ArrowDownTrayIcon className='h-4 w-4 cursor-pointer text-slate-400 hover:text-slate-600' />
                  </div>
                </div>

                {/* INFO ROW */}
                <div className='mt-4 flex items-center gap-6 text-sm text-slate-700'>
                  <div className='flex items-center gap-1'>
                    <CalendarIcon className='h-4 w-4 text-slate-500' />
                    <span>{s.date}</span>
                  </div>

                  <div className='flex items-center gap-1'>
                    <ClockIcon className='h-4 w-4 text-slate-500' />
                    <span>{s.time}</span>
                  </div>

                  <div className='flex items-center gap-1'>
                    <ClockIcon className='h-4 w-4 text-slate-500' />
                    <span>{s.duration} phút</span>
                  </div>
                </div>

                {/* TUTOR */}
                <div className='mt-3 flex items-center gap-2'>
                  <div className='flex h-7 w-7 items-center justify-center rounded-full bg-slate-200'>{s.avatar}</div>
                  <span className='text-sm text-slate-700'>với {s.tutor}</span>
                </div>

                {/* ACTION BUTTONS */}
                <div className='mt-5 flex items-center gap-4'>
                  {s.status === "Đang diễn ra" ? (
                    <button className='flex items-center gap-2 rounded-lg border border-blue-500 px-4 py-1.5 text-blue-600 hover:bg-blue-50'>
                      <PlayIcon className='h-4 w-4' />
                      Tham gia ngay
                    </button>
                  ) : (
                    <button className='flex items-center gap-2 rounded-lg border border-blue-500 px-4 py-1.5 text-blue-600 hover:bg-blue-50'>
                      <CalendarIcon className='h-4 w-4' />
                      Thêm vào lịch
                    </button>
                  )}

                  <button className='flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:text-slate-900'>
                    <BellIcon className='h-4 w-4' />
                    Đặt nhắc nhở
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDEBAR (unchanged) */}
          <div className='flex flex-col gap-6 lg:sticky lg:top-24'>
            {/* Statistics */}
            <div className='rounded-2xl border bg-white p-6 shadow-sm'>
              <h3 className='mb-4 text-lg font-semibold'>Thống số</h3>

              <div className='space-y-3 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-slate-600'>Số buổi</span>
                  <span className='font-bold text-slate-900'>12</span>
                </div>

                <div className='flex justify-between'>
                  <span className='text-slate-600'>Đã hoàn thành</span>
                  <span className='font-bold text-green-600'>4</span>
                </div>

                <div className='flex justify-between'>
                  <span className='text-slate-600'>Sắp tới</span>
                  <span className='font-bold text-blue-600'>3</span>
                </div>

                <div className='flex justify-between'>
                  <span className='text-slate-600'>Tổng thời gian</span>
                  <span className='font-bold text-slate-900'>18.5</span>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className='rounded-2xl border bg-white p-6 shadow-sm'>
              <h3 className='mb-4 text-lg font-semibold'>Các hành động</h3>

              <div className='flex flex-col gap-3 text-sm'>
                <button className='flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 font-medium text-blue-600'>
                  <PlusIcon className='h-4 w-4' />
                  Yêu cầu buổi tư vấn mới
                </button>

                <button className='w-full rounded-xl border px-4 py-2 text-slate-700 hover:bg-slate-50'>
                  Xem tất cả buổi tư vấn
                </button>

                <button className='flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2 text-slate-700 hover:bg-slate-50'>
                  <ArrowDownTrayIcon className='h-4 w-4' />
                  Xuất file
                </button>
              </div>
            </div>

            {/* Next Session */}
            <div className='rounded-2xl border bg-white p-6 shadow-sm'>
              <h3 className='mb-4 text-lg font-semibold'>Next Session</h3>

              <div className='rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm'>
                <p className='font-semibold text-slate-900'>Cấu trúc dữ liệu nâng cao</p>
                <p className='text-slate-600'>Hôm nay, 14:00 - 15:30</p>
                <p className='text-slate-600'>Với TS. Nguyễn Minh Hoàng</p>

                <button className='mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2 font-medium text-white hover:bg-blue-700'>
                  <CalendarIcon className='h-4 w-4' />
                  Tham gia buổi tư vấn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
