import React, { useState } from "react";
import programs from "../../data/program.json";
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
  const filtered = programs.filter((p: Program) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic (không dùng chuyển trang, chỉ hiển thị số trang)
  const itemsPerPage = 4;
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-20">

        {/* TITLE */}
        <h1 className="text-2xl font-semibold text-slate-900">Chương trình của tôi</h1>
        <p className="text-sm text-slate-500 mt-2">
          Quản lý các chương trình đã đăng ký và theo dõi tiến độ học tập
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            + Đăng ký chương trình
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-slate-100">
            Xuất tiến độ
          </button>
        </div>

        {/* SEARCH + FILTER */}
        <div className="mt-6 bg-white p-4 rounded-xl border shadow-sm flex items-center gap-4">
          <input
            type="text"
            placeholder="Tìm kiếm chương trình..."
            className="flex-1 px-4 py-2 border rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select className="px-4 py-2 border rounded-lg">
            <option>Tất cả trạng thái</option>
          </select>

          <select className="px-4 py-2 border rounded-lg">
            <option>Tất cả môn học</option>
          </select>

          <select className="px-4 py-2 border rounded-lg">
            <option>Sắp xếp theo ngày</option>
          </select>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
            <BookOpen className="text-blue-600 h-8 w-8" />
            <div>
              <p className="text-3xl font-bold text-blue-600">{programs.length}</p>
              <p className="text-sm text-slate-500 mt-1">Tổng chương trình</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
            <Play className="text-green-600 h-8 w-8" />
            <div>
              <p className="text-3xl font-bold text-green-600">
                {programs.filter((p: Program) => p.status === "active").length}
              </p>
              <p className="text-sm text-slate-500 mt-1">Đang hoạt động</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
            <CheckCircle className="text-purple-600 h-8 w-8" />
            <div>
              <p className="text-3xl font-bold text-purple-600">
                {programs.filter((p: Program) => p.status === "done").length}
              </p>
              <p className="text-sm text-slate-500 mt-1">Đã hoàn thành</p>
            </div>
          </div>
        </div>

        {/* PROGRAM LIST */}
        <div className="mt-10 space-y-5">
          {filtered.slice(0, 4).map((p: Program) => (
            <div key={p.id} className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  {/* ICON */}
                  <div className="text-3xl">{p.icon || "📘"}</div>

                  {/* TEXT INFO */}
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{p.title}</h2>

                    <p className="text-xs mt-1">
                      <span className="px-2 py-0.5 bg-green-100 text-green-600 rounded-md">
                        {p.status}
                      </span>
                    </p>

                    <p className="text-sm text-slate-500 font-medium mt-1">{p.tutor}</p>

                    <p className="mt-2 text-sm text-slate-600">{p.desc}</p>
                  </div>
                </div>

                {/* RIGHT BUTTONS */}
                {p.status === "done" ? (
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                      Xem chứng chỉ
                    </button>
                    <button className="px-4 py-2 border rounded-lg text-sm hover:bg-slate-100">
                      Tải tài liệu
                    </button>
                  </div>
                ) : (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                    Xem chi tiết
                  </button>
                )}
              </div>

              {/* INFO ROW */}
              <div className="flex items-center gap-10 mt-4 text-sm text-slate-500">
                <p>{p.start}</p>
                {p.session && <p>{p.session}</p>}
                <p>Tiến độ: {p.progress}%</p>
              </div>

              {/* PROGRESS BAR */}
              <div className="w-full h-2 bg-slate-200 rounded-full mt-3">
                <div
                  className={`h-full rounded-full ${p.color}`}
                  style={{ width: `${p.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center mt-10 text-sm">
          <p>
            Hiển thị 1 đến {Math.min(4, filtered.length)} trong {filtered.length} chương trình
          </p>

          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-lg bg-white hover:bg-slate-100">
              Trước
            </button>

            {/* Page numbers tự động */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                className={`px-3 py-1 border rounded-lg ${
                  pageNum === 1
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-slate-100"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button className="px-3 py-1 border rounded-lg bg-white hover:bg-slate-100">
              Sau
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProgramList;
