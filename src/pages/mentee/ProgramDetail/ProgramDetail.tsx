import React from "react";
import { useNavigate } from "react-router-dom";

interface ModuleItem {
  id: number;
  name: string;
  status: "done" | "in-progress" | "locked";
  description: string;
  progress: number;
}

interface ResourceItem {
  id: number;
  label: string;
  description: string;
}

const modules: ModuleItem[] = [
  {
    id: 1,
    name: "Module 1: Khởi động Python nâng cao",
    status: "done",
    description: "Ôn tập nhanh cú pháp Python, môi trường làm việc, best practices.",
    progress: 100,
  },
  {
    id: 2,
    name: "Module 2: Cấu trúc dữ liệu & Thuật toán",
    status: "in-progress",
    description: "Làm việc với list, dict, set, comprehension, tối ưu hiệu năng.",
    progress: 60,
  },
  {
    id: 3,
    name: "Module 3: Phát triển Web với Django",
    status: "in-progress",
    description: "Xây dựng web app RESTful, template, ORM, authentication.",
    progress: 30,
  },
  {
    id: 4,
    name: "Module 4: Machine Learning cơ bản với NumPy & scikit-learn",
    status: "locked",
    description: "Pipeline ML cơ bản, train/test, đánh giá mô hình.",
    progress: 0,
  },
];

const resources: ResourceItem[] = [
  { id: 1, label: "Tài liệu khóa học", description: "Slide, PDF và note tổng hợp từng buổi học." },
  { id: 2, label: "Bài tập thực hành", description: "Các bài lab có file mẫu, test case và gợi ý." },
  { id: 3, label: "Video ghi hình", description: "Ghi hình các buổi tutor để xem lại." },
  { id: 4, label: "Bài tập tự luyện", description: "Các bài coding challenge trên nền tảng online." },
];

const ProgramDetailPage: React.FC = () => {
  const navigate = useNavigate(); // ✔ đặt đúng vị trí: bên trong component

  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='container mx-auto px-4 py-8'>
        {/* Breadcrumb */}
        <div className='mb-3 text-sm text-slate-500'>
          <span className='cursor-pointer hover:text-slate-700'>Chương trình học</span>
          <span className='mx-2'>/</span>
          <span className='font-medium text-slate-900'>Lập trình Python nâng cao</span>
        </div>

        {/* HEADER */}
        <div className='mb-4 rounded-xl border border-slate-100 bg-white p-6 shadow-sm'>
          <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            {/* LEFT */}
            <div className='flex items-start gap-4'>
              <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl font-semibold text-blue-600'>
                {"</>"}
              </div>

              <div>
                <h1 className='mb-1 text-2xl font-semibold text-slate-900'>Lập trình Python Nâng cao</h1>
                <p className='mb-2 text-sm text-slate-500'>Với TS. Trần Minh Đức • 32 buổi • Đã hoàn thành 65%</p>

                {/* Progress bar */}
                <div className='flex items-center gap-3'>
                  <div className='h-2 flex-1 overflow-hidden rounded-full bg-slate-100'>
                    <div className='h-2 w-[65%] rounded-full bg-blue-500' />
                  </div>
                  <span className='text-xs font-medium text-slate-600'>65% hoàn thành</span>
                </div>
              </div>
            </div>

            {/* RIGHT ACTIONS */}
            <div className='flex flex-wrap items-center gap-2'>
              <button className='rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50'>
                Lưu chương trình
              </button>
              <button className='rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50'>
                Chia sẻ
              </button>
              <button className='rounded-lg bg-emerald-500 px-3 py-2 text-sm text-white hover:bg-emerald-600'>
                Xuất file
              </button>
            </div>
          </div>

          {/* TABS */}
          <div className='mt-6 flex flex-wrap gap-4 border-t border-slate-100 pt-3 text-sm'>
            {/* TAB: Tổng quan */}
            <button className='rounded-lg bg-blue-50 px-3 py-2 font-medium text-blue-600'>Tổng quan</button>

            {/* TAB: Buổi tư vấn (✔ navigate) */}
            <button
              onClick={() => {
                void navigate("/mentee/sessions");
              }}
              className='rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-50'
            >
              Buổi tư vấn
            </button>

            <button className='rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-50'>Tài liệu</button>
            <button className='rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-50'>Lộ trình</button>
            <button className='rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-50'>Người học</button>
          </div>
        </div>

        {/* ==== MAIN CONTENT LAYOUT ==== */}
        <div className='grid grid-cols-1 gap-6 pb-10 lg:grid-cols-3'>
          {/* LEFT 2/3 CONTENT */}
          <div className='space-y-6 lg:col-span-2'>
            {/* Tổng quan chương trình */}
            <section className='rounded-xl border border-slate-100 bg-white p-6 shadow-sm'>
              <h2 className='mb-2 text-lg font-semibold text-slate-900'>Tổng quan chương trình</h2>
              <p className='text-sm leading-relaxed text-slate-600'>
                Khóa học Python nâng cao được thiết kế dành cho những người đã nắm vững kiến thức cơ bản và muốn ứng
                dụng Python trong các bài toán thực tế như xử lý dữ liệu, xây dựng web app và machine learning.
              </p>
            </section>

            {/* Mục tiêu học tập */}
            <section className='rounded-xl border border-slate-100 bg-white p-6 shadow-sm'>
              <h2 className='mb-4 text-lg font-semibold text-slate-900'>Mục tiêu học tập</h2>
              <ul className='space-y-2 text-sm text-slate-700'>
                <li className='flex items-start gap-2'>
                  <span className='mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-xs text-emerald-600'>
                    ✓
                  </span>
                  Thành thạo Python nâng cao trong xử lý dữ liệu & automation.
                </li>

                <li className='flex items-start gap-2'>
                  <span className='mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-xs text-emerald-600'>
                    ✓
                  </span>
                  Xây dựng ứng dụng web với Django và REST API.
                </li>

                <li className='flex items-start gap-2'>
                  <span className='mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-xs text-emerald-600'>
                    ✓
                  </span>
                  Hiểu pipeline Machine Learning & mô hình scikit-learn.
                </li>
              </ul>
            </section>

            {/* Modules */}
            <section className='rounded-xl border border-slate-100 bg-white p-6 shadow-sm'>
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='text-lg font-semibold text-slate-900'>Các module khóa học</h2>
                <span className='text-xs text-slate-500'>{modules.length} module • Cập nhật 11/2025</span>
              </div>

              <div className='space-y-4'>
                {modules.map((m) => (
                  <div key={m.id} className='rounded-lg border border-slate-100 p-4 transition hover:bg-slate-50'>
                    <div className='mb-1 flex items-center justify-between'>
                      <h3 className='text-sm font-semibold text-slate-900'>{m.name}</h3>
                      <span
                        className={
                          "rounded-full px-2 py-1 text-xs font-medium " +
                          (m.status === "done"
                            ? "bg-emerald-50 text-emerald-700"
                            : m.status === "in-progress"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-slate-100 text-slate-500")
                        }
                      >
                        {m.status === "done" ? "Hoàn thành" : m.status === "in-progress" ? "Đang học" : "Chưa mở"}
                      </span>
                    </div>

                    <p className='mb-3 text-xs text-slate-600'>{m.description}</p>

                    <div className='flex items-center gap-3'>
                      <div className='h-2 flex-1 overflow-hidden rounded-full bg-slate-100'>
                        <div className='h-2 rounded-full bg-blue-500' style={{ width: `${String(m.progress)}%` }}></div>
                      </div>
                      <span className='text-xs text-slate-500'>{m.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Nguồn tài liệu */}
            <section className='rounded-xl border border-slate-100 bg-white p-6 shadow-sm'>
              <h2 className='mb-4 text-lg font-semibold text-slate-900'>Nguồn học liệu & Tài liệu khóa học</h2>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                {resources.map((r) => (
                  <div key={r.id} className='rounded-lg border border-slate-100 p-4 transition hover:bg-slate-50'>
                    <p className='text-sm font-semibold text-slate-900'>{r.label}</p>
                    <p className='text-xs text-slate-600'>{r.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className='space-y-4'>
            {/* Chi tiết chương trình */}
            <section className='rounded-xl border border-slate-100 bg-white p-5 text-sm shadow-sm'>
              <h3 className='mb-3 font-semibold text-slate-900'>Chi tiết chương trình</h3>

              <dl className='space-y-2'>
                <div className='flex justify-between'>
                  <dt className='text-slate-500'>Trạng thái</dt>
                  <dd className='font-medium text-emerald-600'>Đang theo học</dd>
                </div>
                <div className='flex justify-between'>
                  <dt className='text-slate-500'>Số buổi</dt>
                  <dd className='font-medium text-slate-800'>32 buổi</dd>
                </div>
                <div className='flex justify-between'>
                  <dt className='text-slate-500'>Thời lượng</dt>
                  <dd className='font-medium text-slate-800'>48 giờ</dd>
                </div>
              </dl>
            </section>

            {/* Giảng viên */}
            <section className='rounded-xl border border-slate-100 bg-white p-5 text-sm shadow-sm'>
              <h3 className='mb-3 font-semibold text-slate-900'>Giảng viên</h3>

              <div className='mb-2 flex items-center gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 font-semibold text-sky-700'>
                  Đ
                </div>
                <div>
                  <p className='font-medium text-slate-900'>TS. Trần Minh Đức</p>
                  <p className='text-xs text-slate-500'>Python • Web • Machine Learning</p>
                </div>
              </div>

              <p className='mb-2 text-xs text-slate-600'>
                8+ năm kinh nghiệm phát triển Python backend tại doanh nghiệp.
              </p>
              <p className='text-xs text-slate-500'>⭐ 4.8 • 120 học viên</p>
            </section>

            {/* Lớp tiếp theo */}
            <section className='rounded-xl border border-slate-100 bg-white p-5 text-sm shadow-sm'>
              <h3 className='mb-3 font-semibold text-slate-900'>Lớp tiếp theo</h3>

              <p className='mb-1 text-sm font-medium text-slate-900'>Buổi 10: Web API với Django REST</p>
              <p className='mb-1 text-xs text-slate-600'>Thứ 5, 28/11/2025 • 18:30–20:30</p>
              <p className='mb-4 text-xs text-slate-500'>Hình thức: Trực tuyến qua MS Teams</p>

              <button className='w-full rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700'>
                Tham gia lớp tiếp theo
              </button>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetailPage;
