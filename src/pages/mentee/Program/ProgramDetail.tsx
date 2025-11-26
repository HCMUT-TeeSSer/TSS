import React from "react";

type ModuleItem = {
  id: number;
  name: string;
  status: "done" | "in-progress" | "locked";
  description: string;
  progress: number; // 0–100
};

type ResourceItem = {
  id: number;
  label: string;
  description: string;
};

const modules: ModuleItem[] = [
  {
    id: 1,
    name: "Module 1: Khởi động Python nâng cao",
    status: "done",
    description:
      "Ôn tập nhanh cú pháp Python, môi trường làm việc, best practices.",
    progress: 100,
  },
  {
    id: 2,
    name: "Module 2: Cấu trúc dữ liệu & Thuật toán",
    status: "in-progress",
    description:
      "Làm việc với list, dict, set, comprehension, tối ưu hiệu năng.",
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
  {
    id: 1,
    label: "Tài liệu khóa học",
    description: "Slide, PDF và note tổng hợp từng buổi học.",
  },
  {
    id: 2,
    label: "Bài tập thực hành",
    description: "Các bài lab có file mẫu, test case và gợi ý.",
  },
  {
    id: 3,
    label: "Video ghi hình",
    description: "Ghi hình các buổi tutor để xem lại.",
  },
  {
    id: 4,
    label: "Bài tập tự luyện",
    description: "Các bài coding challenge trên nền tảng online.",
  },
];

const ProgramDetailPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Fake top spacing to nằm dưới header chung của app */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="text-sm text-slate-500 mb-3">
          <span className="cursor-pointer hover:text-slate-700">
            Chương trình học
          </span>
          <span className="mx-2">/</span>
          <span className="text-slate-900 font-medium">
            Lập trình Python nâng cao
          </span>
        </div>

        {/* Header chương trình */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Left: icon + title */}
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 text-2xl font-semibold">
                {"</>"}
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-slate-900 mb-1">
                  Lập trình Python Nâng cao
                </h1>
                <p className="text-sm text-slate-500 mb-2">
                  Với TS. Trần Minh Đức • 32 buổi • Đã hoàn thành 65%
                </p>
                {/* Progress */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{ width: "65%" }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-600">
                    65% hoàn thành
                  </span>
                </div>
              </div>
            </div>

            {/* Right: actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button className="px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
                Lưu chương trình
              </button>
              <button className="px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
                Chia sẻ
              </button>
              <button className="px-3 py-2 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
                Xuất file
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 border-t border-slate-100 pt-3 flex flex-wrap gap-4 text-sm">
            <button className="px-3 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium">
              Tổng quan
            </button>
            <button className="px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-50">
              Buổi tư vấn
            </button>
            <button className="px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-50">
              Tài liệu
            </button>
            <button className="px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-50">
              Lộ trình
            </button>
            <button className="px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-50">
              Người học
            </button>
          </div>
        </div>

        {/* Main content layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-10">
          {/* Left: 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tổng quan chương trình */}
            <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">
                Tổng quan chương trình
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Khóa học Python nâng cao được thiết kế dành cho những người đã
                nắm vững kiến thức cơ bản và muốn ứng dụng Python trong các bài
                toán thực tế như xử lý dữ liệu, xây dựng web app và machine
                learning. Sinh viên sẽ vừa học lý thuyết, vừa thực hành qua dự
                án nhỏ để củng cố kiến thức.
              </p>
            </section>

            {/* Mục tiêu học tập */}
            <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Mục tiêu học tập
              </h2>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
                    ✓
                  </span>
                  <span>
                    Thành thạo áp dụng Python nâng cao vào các bài toán xử lý
                    dữ liệu và automation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
                    ✓
                  </span>
                  <span>
                    Xây dựng được ứng dụng web với Django, tích hợp REST API.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
                    ✓
                  </span>
                  <span>
                    Hiểu pipeline cơ bản của Machine Learning và sử dụng
                    scikit-learn cho mô hình đơn giản.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
                    ✓
                  </span>
                  <span>
                    Tự tin đọc tài liệu, debug và tối ưu mã nguồn Python trong
                    dự án thực tế.
                  </span>
                </li>
              </ul>
            </section>

            {/* Modules */}
            <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                  Các module khóa học
                </h2>
                <span className="text-xs text-slate-500">
                  {modules.length} module • Cập nhật lần cuối 11/2025
                </span>
              </div>

              <div className="space-y-4">
                {modules.map((m) => (
                  <div
                    key={m.id}
                    className="border border-slate-100 rounded-lg p-4 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <h3 className="text-sm font-semibold text-slate-900">
                        {m.name}
                      </h3>
                      <span
                        className={
                          "px-2 py-1 rounded-full text-xs font-medium " +
                          (m.status === "done"
                            ? "bg-emerald-50 text-emerald-700"
                            : m.status === "in-progress"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-slate-100 text-slate-500")
                        }
                      >
                        {m.status === "done"
                          ? "Hoàn thành"
                          : m.status === "in-progress"
                          ? "Đang học"
                          : "Chưa mở"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mb-3">
                      {m.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${m.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500">
                        {m.progress}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Nguồn học liệu */}
            <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Nguồn học liệu & Tài liệu khóa học
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources.map((r) => (
                  <div
                    key={r.id}
                    className="border border-slate-100 rounded-lg p-4 flex flex-col gap-1 hover:bg-slate-50 transition"
                  >
                    <span className="text-sm font-semibold text-slate-900">
                      {r.label}
                    </span>
                    <span className="text-xs text-slate-600">
                      {r.description}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: sidebar */}
          <aside className="space-y-4">
            {/* Chi tiết chương trình */}
            <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 text-sm">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Chi tiết chương trình
              </h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Trạng thái</dt>
                  <dd className="font-medium text-emerald-600">
                    Đang theo học
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Số buổi</dt>
                  <dd className="font-medium text-slate-800">32 buổi</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Thời lượng</dt>
                  <dd className="font-medium text-slate-800">48 giờ</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Cấp độ</dt>
                  <dd className="font-medium text-slate-800">Nâng cao</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Ngôn ngữ</dt>
                  <dd className="font-medium text-slate-800">Tiếng Việt</dd>
                </div>
              </dl>
            </section>

            {/* Giảng viên */}
            <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 text-sm">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Giảng viên
              </h3>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-semibold">
                  Đ
                </div>
                <div>
                  <p className="font-medium text-slate-900">
                    TS. Trần Minh Đức
                  </p>
                  <p className="text-xs text-slate-500">
                    Python • Web • Machine Learning
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 mb-2">
                8+ năm kinh nghiệm giảng dạy và phát triển hệ thống backend sử
                dụng Python cho doanh nghiệp.
              </p>
              <p className="text-xs text-slate-500">⭐ 4.8 • 120 học viên</p>
            </section>

            {/* Lớp tiếp theo */}
            <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 text-sm">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Lớp tiếp theo
              </h3>
              <p className="text-sm font-medium text-slate-900 mb-1">
                Buổi 10: Web API với Django REST
              </p>
              <p className="text-xs text-slate-600 mb-1">
                Thứ 5, 28/11/2025 • 18:30–20:30
              </p>
              <p className="text-xs text-slate-500 mb-4">
                Hình thức: Trực tuyến qua MS Teams
              </p>
              <button className="w-full px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
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
