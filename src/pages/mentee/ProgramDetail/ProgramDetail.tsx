import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Save,
  Share2,
  FileDown,
  ChevronRight,
  Clock,
  Star,
  Calendar,
  Users,
  Award,
  Video,
} from "lucide-react";
import { UserGroupIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";

// dữ liệu chương trình
import { programs } from "@/data/programs";

type ModuleItem = {
  id: number;
  name: string;
  status: "done" | "in-progress" | "locked";
  description: string;
  progress: number;
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
  const navigate = useNavigate();
  const { programId } = useParams<{ programId?: string }>();

  // id từ URL, mặc định = 1, chống NaN
  const programID = Number(programId ?? 1) || 1;
  const program = programs.find((p) => p.id === programID);

  const programTitle = program?.title ?? "Lập trình Python Nâng cao";
  const programDepartment =
    program?.department ?? program?.category ?? "Khoa học máy tính";
  const programDuration = program?.duration ?? "12 tuần";
  const programDifficulty = program?.difficulty ?? "Nâng cao";
  const programRating = program?.rating ?? 4.9;

  const isPythonProgram = program?.id === 1;

  const currentTab: "overview" | "sessions" | "meet" | "skills" = "overview";

  const tabs = [
    {
      id: "overview" as const,
      label: "Nội dung",
      onClick: () => navigate(`/mentee/my-program/${programID}`),
    },
    {
      id: "sessions" as const,
      label: "Buổi tư vấn",
      onClick: () => navigate(`/mentee/session/${programID}`),
    },
    {
      id: "meet" as const,
      label: "Lịch hẹn",
      onClick: () => {
        // TODO: route lịch hẹn
      },
    },
    {
      id: "skills" as const,
      label: "Năng lực",
      onClick: () => {
        // TODO: route năng lực
      },
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* BREADCRUMB */}
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center px-6 py-3 text-sm text-slate-500">
          <button
            type="button"
            onClick={() => navigate("/mentee/programs")}
            className="hover:text-blue-600"
          >
            Chương trình học
          </button>
          <ChevronRight className="mx-2 h-4 w-4 text-slate-400" />
          <span className="truncate font-medium text-slate-900">
            {programTitle}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-6 pb-10">
        {/* HEADER + TABS */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          {/* Hàng trên: icon + title + nút */}
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            {/* LEFT: icon + title */}
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-2xl font-semibold text-blue-600">
                <Video className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {programTitle}
                </h1>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                  <span>{programDepartment}</span>
                  <span>•</span>
                  <span>TS. Trần Minh Đức</span>
                </div>
              </div>
            </div>

            {/* RIGHT: actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                <Save className="h-4 w-4" />
                Lưu chương trình
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600">
                <Share2 className="h-4 w-4" />
                Chia sẻ
              </button>
              <button
                type="button"
                onClick={() => toast.info("Bắt đầu tải về")}
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-50"
              >
                <FileDown className="h-4 w-4" />
                Xuất file
              </button>
            </div>
          </div>

          {/* META + PROGRESS FULL-WIDTH */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-slate-500" />
                  {programDuration}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  {programRating.toFixed(1)}
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium">
                  {programDifficulty}
                </span>
              </div>

              <span className="ml-4 whitespace-nowrap font-semibold text-slate-700">
                Tiến độ: <span className="text-slate-600">65%</span>
              </span>
            </div>

            <div className="mt-2 h-[6px] w-full rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{ width: "65%" }}
              />
            </div>
          </div>

          {/* TABS */}
          <div className="mt-6 flex gap-8 border-b border-slate-100">
            {tabs.map((tab) => {
              const active = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={tab.onClick}
                  className={`relative pb-3 text-sm font-medium transition-colors ${
                    active
                      ? "text-blue-600"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab.label}
                  {active && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-t-full bg-blue-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="mt-8 grid grid-cols-1 gap-6 pb-10 lg:grid-cols-3">
          {/* Left: main sections */}
          <div className="space-y-6 lg:col-span-2">
            {/* Tổng quan chương trình */}
            <section className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="mb-2 text-lg font-semibold text-slate-900">
                Tổng quan chương trình
              </h2>
              <p className="text-sm leading-relaxed text-slate-600">
                {isPythonProgram
                  ? "Khóa học Python nâng cao được thiết kế dành cho những người đã nắm vững kiến thức cơ bản và muốn ứng dụng Python trong các bài toán thực tế như xử lý dữ liệu, xây dựng web app và machine learning. Sinh viên sẽ vừa học lý thuyết, vừa thực hành qua dự án nhỏ để củng cố kiến thức."
                  : "Thông tin chi tiết cho chương trình này đang được cập nhật. Vui lòng quay lại sau để xem thêm nội dung."}
              </p>
            </section>

            {/* Mục tiêu học tập */}
            <section className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                Mục tiêu học tập
              </h2>

              {isPythonProgram ? (
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-xs text-emerald-600">
                      ✓
                    </span>
                    <span>
                      Thành thạo áp dụng Python nâng cao vào các bài toán xử lý
                      dữ liệu và automation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-xs text-emerald-600">
                      ✓
                    </span>
                    <span>
                      Xây dựng được ứng dụng web với Django, tích hợp REST API.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-xs text-emerald-600">
                      ✓
                    </span>
                    <span>
                      Hiểu pipeline cơ bản của Machine Learning và sử dụng
                      scikit-learn cho mô hình đơn giản.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-xs text-emerald-600">
                      ✓
                    </span>
                    <span>
                      Tự tin đọc tài liệu, debug và tối ưu mã nguồn Python trong
                      dự án thực tế.
                    </span>
                  </li>
                </ul>
              ) : (
                <p className="text-sm text-slate-600">
                  Mục tiêu cụ thể cho chương trình này đang được cập nhật. Bạn
                  vẫn có thể đăng ký theo dõi chương trình để nhận thông báo khi
                  có thông tin mới.
                </p>
              )}
            </section>

            {/* Modules */}
            <section className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
                  Các module khóa học
                </h2>
                {isPythonProgram && (
                  <span className="text-xs text-slate-500">
                    {modules.length} module • Cập nhật lần cuối 11/2025
                  </span>
                )}
              </div>

              {isPythonProgram ? (
                <div className="space-y-4">
                  {modules.map((m) => (
                    <div
                      key={m.id}
                      className="rounded-lg border border-slate-100 p-4 transition hover:bg-slate-50"
                    >
                      <div className="mb-1 flex items-center justify-between gap-4">
                        <h3 className="text-sm font-semibold text-slate-900">
                          {m.name}
                        </h3>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            m.status === "done"
                              ? "bg-emerald-50 text-emerald-700"
                              : m.status === "in-progress"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {m.status === "done"
                            ? "Hoàn thành"
                            : m.status === "in-progress"
                            ? "Đang học"
                            : "Chưa mở"}
                        </span>
                      </div>
                      <p className="mb-3 text-xs text-slate-600">
                        {m.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${
                              m.progress === 100
                                ? "bg-emerald-500"
                                : "bg-blue-500"
                            }`}
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
              ) : (
                <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  Hiện chưa có danh sách module chi tiết cho chương trình này.
                  Thông tin sẽ được cập nhật sau.
                </div>
              )}
            </section>

            {/* Nguồn học liệu */}
            <section className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                Nguồn học liệu & Tài liệu khóa học
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {resources.map((r) => (
                  <div
                    key={r.id}
                    className="flex flex-col gap-1 rounded-lg border border-slate-100 p-4 transition hover:bg-slate-50"
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
            <section className="rounded-xl border border-slate-200 bg-white p-5 text-sm shadow-sm">
              <h3 className="mb-4 text-sm font-semibold text-slate-900">
                Chi tiết chương trình
              </h3>

              <div className="space-y-4">
                {/* Thời lượng */}
                <div className="flex gap-3">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Thời lượng</p>
                    <p className="text-xs text-slate-500">{programDuration}</p>
                  </div>
                </div>

                {/* Thời gian học */}
                <div className="flex gap-3">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Thời gian học</p>
                    <p className="text-xs text-slate-500">6–8 tiếng/ tuần</p>
                  </div>
                </div>

                {/* Sĩ số lớp */}
                <div className="flex gap-3">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Sĩ số lớp</p>
                    <p className="text-xs text-slate-500">
                      Tối đa 15 học sinh
                    </p>
                  </div>
                </div>

                {/* Chứng chỉ */}
                <div className="flex gap-3">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Chứng chỉ</p>
                    <p className="text-xs text-slate-500">
                      Sau khi hoàn thành
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Giảng viên */}
            <section className="rounded-xl border border-slate-100 bg-white p-5 text-sm shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-slate-900">
                Giảng viên
              </h3>
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-700 font-semibold">
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
              <p className="mb-2 text-xs text-slate-600">
                8+ năm kinh nghiệm giảng dạy và phát triển hệ thống backend sử
                dụng Python cho doanh nghiệp.
              </p>

              <div className="mt-1 flex items-center gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span>4.9/5</span>
                </div>
                <div className="flex items-center gap-1">
                  <UserGroupIcon className="h-4 w-4 text-slate-400" />
                  <span>2.500+ sinh viên</span>
                </div>
              </div>
            </section>

            {/* Lớp tiếp theo */}
            <section className="rounded-xl border border-slate-100 bg-white p-5 text-sm shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-slate-900">
                Lớp tiếp theo
              </h3>

              {isPythonProgram ? (
                <>
                  <p className="mb-1 text-sm font-medium text-slate-900">
                    Buổi 10: Web API với Django REST
                  </p>
                  <p className="mb-1 text-xs text-slate-600">
                    Thứ 5, 28/11/2025 • 18:30–20:30
                  </p>
                  <p className="mb-4 text-xs text-slate-500">
                    Hình thức: Trực tuyến qua MS Teams
                  </p>
                  <button
                    type="button"
                    onClick={() => toast.info("Bắt đầu cuộc họp")}
                    className="flex w-full items-center justify-center gap-3
                          rounded-md bg-blue-600 px-6 py-3
                          text-base font-medium text-white
                          shadow-sm hover:bg-blue-700
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                  >
                    <Video className="h-5 w-5" />
                    <span>Tham gia</span>
                  </button>
                </>
              ) : (
                <p className="text-xs text-slate-600">
                  Thông tin về lớp tiếp theo của chương trình này sẽ được cập
                  nhật sau.
                </p>
              )}
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetailPage;
