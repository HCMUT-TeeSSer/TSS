import React, { useState } from "react";
import programs from "@/data/program.json";
import { BookOpen, Play, CheckCircle } from "lucide-react";

interface Program {
  id: number;
  title: string;
  tutor: string;
  desc: string;
  start: string;
  session: string;
  progress: number;
  status: string;
  color: string;
  icon?: string;
}

const ProgramList: React.FC = () => {
  const [search, setSearch] = useState("");

  // Lọc theo search
  const filtered = programs.filter((p: Program) => p.title.toLowerCase().includes(search.toLowerCase()));

  // Pagination logic (không dùng chuyển trang, chỉ hiển thị số trang)
  const itemsPerPage = 4;
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className='min-h-screen w-full bg-slate-50'>
      <div className='container pt-10 pb-20'>
        {/* TITLE */}
        <h1 className='text-2xl font-semibold text-slate-900'>Chương trình của tôi</h1>
        <p className='mt-2 text-sm text-slate-500'>Quản lý các chương trình đã đăng ký và theo dõi tiến độ học tập</p>

        {/* ACTION BUTTONS */}
        <div className='mt-6 flex justify-end gap-3'>
          <button className='rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'>
            + Đăng ký chương trình
          </button>
          <button className='rounded-lg border px-4 py-2 hover:bg-slate-100'>Xuất tiến độ</button>
        </div>

        {/* SEARCH + FILTER */}
        <div className='mt-6 flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm'>
          <input
            type='text'
            placeholder='Tìm kiếm chương trình...'
            className='flex-1 rounded-lg border px-4 py-2'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          <select className='rounded-lg border px-4 py-2' aria-label='Trạng thái'>
            <option>Tất cả trạng thái</option>
          </select>

          <select className='rounded-lg border px-4 py-2' aria-label='Môn học'>
            <option>Tất cả môn học</option>
          </select>

          <select className='rounded-lg border px-4 py-2' aria-label='Sắp xếp'>
            <option>Sắp xếp theo ngày</option>
          </select>
        </div>

        {/* STATS */}
        <div className='mt-8 grid grid-cols-3 gap-4'>
          <div className='flex items-center gap-4 rounded-xl border bg-white p-6 shadow-sm'>
            <BookOpen className='h-8 w-8 text-blue-600' />
            <div>
              <p className='text-3xl font-bold text-blue-600'>{programs.length}</p>
              <p className='mt-1 text-sm text-slate-500'>Tổng chương trình</p>
            </div>
          </div>

          <div className='flex items-center gap-4 rounded-xl border bg-white p-6 shadow-sm'>
            <Play className='h-8 w-8 text-green-600' />
            <div>
              <p className='text-3xl font-bold text-green-600'>
                {programs.filter((p: Program) => p.status === "active").length}
              </p>
              <p className='mt-1 text-sm text-slate-500'>Đang hoạt động</p>
            </div>
          </div>

          <div className='flex items-center gap-4 rounded-xl border bg-white p-6 shadow-sm'>
            <CheckCircle className='h-8 w-8 text-purple-600' />
            <div>
              <p className='text-3xl font-bold text-purple-600'>
                {programs.filter((p: Program) => p.status === "done").length}
              </p>
              <p className='mt-1 text-sm text-slate-500'>Đã hoàn thành</p>
            </div>
          </div>
        </div>

        {/* PROGRAM LIST */}
        <div className='mt-10 space-y-5'>
          {filtered.slice(0, 4).map((p: Program) => (
            <div key={p.id} className='rounded-xl border bg-white p-6 shadow-sm'>
              <div className='flex items-start justify-between'>
                <div className='flex gap-4'>
                  {/* ICON */}
                  <div className='text-3xl'>{p.icon ?? "📘"}</div>

                  {/* TEXT INFO */}
                  <div>
                    <h2 className='text-lg font-semibold text-slate-900'>{p.title}</h2>

                    <p className='mt-1 text-xs'>
                      <span className='rounded-md bg-green-100 px-2 py-0.5 text-green-600'>{p.status}</span>
                    </p>

                    <p className='mt-1 text-sm font-medium text-slate-500'>{p.tutor}</p>

                    <p className='mt-2 text-sm text-slate-600'>{p.desc}</p>
                  </div>
                </div>

                {/* RIGHT BUTTONS */}
                {p.status === "done" ? (
                  <div className='flex gap-3'>
                    <button className='rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700'>
                      Xem chứng chỉ
                    </button>
                    <button className='rounded-lg border px-4 py-2 text-sm hover:bg-slate-100'>Tải tài liệu</button>
                  </div>
                ) : (
                  <button className='rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700'>
                    Xem chi tiết
                  </button>
                )}
              </div>

              {/* INFO ROW */}
              <div className='mt-4 flex items-center gap-10 text-sm text-slate-500'>
                <p>{p.start}</p>
                {p.session && <p>{p.session}</p>}
                <p>Tiến độ: {p.progress}%</p>
              </div>

              {/* PROGRESS BAR */}
              <div className='mt-3 h-2 w-full rounded-full bg-slate-200'>
                <div className={`h-full rounded-full ${p.color}`} style={{ width: `${String(p.progress)}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className='mt-10 flex items-center justify-between text-sm'>
          <p>
            Hiển thị 1 đến {Math.min(4, filtered.length)} trong {filtered.length} chương trình
          </p>

          <div className='flex gap-2'>
            <button className='rounded-lg border bg-white px-3 py-1 hover:bg-slate-100'>Trước</button>

            {/* Page numbers tự động */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                className={`rounded-lg border px-3 py-1 ${
                  pageNum === 1 ? "bg-blue-600 text-white" : "bg-white hover:bg-slate-100"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button className='rounded-lg border bg-white px-3 py-1 hover:bg-slate-100'>Sau</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramList;
