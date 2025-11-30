import React from "react";
import { useParams } from "react-router-dom";
import { Star, Calendar, Users, Video, Download, Edit, TrendingUp } from "lucide-react";
import { toast } from "react-toastify";
import path from "@/constants/path";
import { programs } from "@/data/programs";
import ProgramBreadcrumb from "@/components/Program/ProgramBreadcrumb";
import ProgramHeaderInfo from "@/components/Program/ProgramHeaderInfo";
import ProgramTabs from "@/components/Program/ProgramTabs";

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

const TutorProgramDetailPage: React.FC = () => {
  const { programId } = useParams<{ programId?: string }>();
  const programID = Number(programId ?? 1) || 1;
  const program = programs.find((p) => p.id === programID);
  const programTitle = program?.title ?? "Lập trình Python Nâng cao";
  const isPythonProgram = program?.id === 1;

  const MEET_URL = "https://meet.google.com/tow-zzir-waj";

  const handleJoinMeet = () => {
    toast.info("Bắt đầu vào phòng họp...");
    window.open(MEET_URL, "_blank", "noopener,noreferrer");
  };

  const handleEditModule = (moduleId: number) => {
    toast.info(`Chỉnh sửa module #${String(moduleId)}`);
  };

  const handleEditContent = () => {
    toast.info("Chức năng chỉnh sửa nội dung đang được phát triển");
  };

  return (
    <div className='min-h-screen bg-gray-50 pb-12'>
      <ProgramBreadcrumb backLink={path.tutorProgramList} currentTitle={programTitle} />

      <div className='container mx-auto mt-6 px-4'>
        <div className='overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm'>
          <ProgramHeaderInfo
            title={programTitle}
            subtitle='Quản lý nội dung chương trình'
            statusLabel='Đang hoạt động'
            metaText='15 học viên đã đăng ký'
            progress={undefined}
            actions={
              <>
                <button
                  onClick={handleEditContent}
                  className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700'
                >
                  <Edit className='h-4 w-4' /> Chỉnh sửa
                </button>
                <button className='flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700'>
                  <TrendingUp className='h-4 w-4' /> Thống kê
                </button>
                <button className='flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50'>
                  <Download className='h-4 w-4' /> Xuất file
                </button>
              </>
            }
          />

          <ProgramTabs activeTab='content' programId={programID} userRole='tutor' />
        </div>

        <div className='mt-6'>
          <div className='grid grid-cols-1 gap-6 pb-10 lg:grid-cols-3'>
            <div className='space-y-6 lg:col-span-2'>
              {/* Tổng quan chương trình */}
              <section className='rounded-xl border border-slate-100 bg-white p-6 shadow-sm'>
                <div className='mb-4 flex items-center justify-between'>
                  <h2 className='text-lg font-semibold text-slate-900'>Tổng quan chương trình</h2>
                  <button onClick={handleEditContent} className='text-sm text-blue-600 hover:text-blue-700'>
                    Chỉnh sửa
                  </button>
                </div>
                <p className='text-sm leading-relaxed text-slate-600'>
                  {isPythonProgram
                    ? "Khóa học Python nâng cao được thiết kế dành cho những người đã nắm vững kiến thức cơ bản và muốn ứng dụng Python trong các bài toán thực tế như xử lý dữ liệu, xây dựng web app và machine learning. Sinh viên sẽ vừa học lý thuyết, vừa thực hành qua dự án nhỏ để củng cố kiến thức."
                    : "Thông tin chi tiết cho chương trình này đang được cập nhật."}
                </p>
              </section>

              {/* Mục tiêu học tập */}
              <section className='rounded-xl border border-slate-100 bg-white p-6 shadow-sm'>
                <div className='mb-4 flex items-center justify-between'>
                  <h2 className='text-lg font-semibold text-slate-900'>Mục tiêu học tập</h2>
                  <button onClick={handleEditContent} className='text-sm text-blue-600 hover:text-blue-700'>
                    Chỉnh sửa
                  </button>
                </div>

                {isPythonProgram ? (
                  <ul className='space-y-2 text-sm text-slate-700'>
                    <li className='flex items-start gap-2'>
                      <span className='mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-xs text-emerald-600'>
                        ✓
                      </span>
                      <span>Thành thạo áp dụng Python nâng cao vào các bài toán xử lý dữ liệu và automation.</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-xs text-emerald-600'>
                        ✓
                      </span>
                      <span>Xây dựng được ứng dụng web với Django, tích hợp REST API.</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-xs text-emerald-600'>
                        ✓
                      </span>
                      <span>
                        Hiểu pipeline cơ bản của Machine Learning và sử dụng scikit-learn cho mô hình đơn giản.
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-xs text-emerald-600'>
                        ✓
                      </span>
                      <span>Tự tin đọc tài liệu, debug và tối ưu mã nguồn Python trong dự án thực tế.</span>
                    </li>
                  </ul>
                ) : (
                  <p className='text-sm text-slate-600'>Mục tiêu cụ thể cho chương trình này đang được cập nhật.</p>
                )}
              </section>

              {/* Modules */}
              <section className='rounded-xl border border-slate-100 bg-white p-6 shadow-sm'>
                <div className='mb-4 flex items-center justify-between'>
                  <h2 className='text-lg font-semibold text-slate-900'>Các module khóa học</h2>
                  {isPythonProgram && (
                    <div className='flex items-center gap-3'>
                      <span className='text-xs text-slate-500'>
                        {modules.length} module • Cập nhật lần cuối 11/2025
                      </span>
                      <button onClick={handleEditContent} className='text-sm text-blue-600 hover:text-blue-700'>
                        Quản lý
                      </button>
                    </div>
                  )}
                </div>

                {isPythonProgram ? (
                  <div className='space-y-4'>
                    {modules.map((mod) => {
                      let statusColor = "bg-slate-100 text-slate-600";
                      let statusText = "Chưa mở";
                      if (mod.status === "done") {
                        statusColor = "bg-emerald-100 text-emerald-700";
                        statusText = "Hoàn thành";
                      } else if (mod.status === "in-progress") {
                        statusColor = "bg-blue-100 text-blue-700";
                        statusText = "Đang học";
                      }

                      return (
                        <div
                          key={mod.id}
                          className='rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:bg-white hover:shadow-sm'
                        >
                          <div className='mb-2 flex items-start justify-between'>
                            <div className='flex-1'>
                              <h3 className='text-base font-semibold text-slate-900'>{mod.name}</h3>
                              <p className='mt-1 text-sm text-slate-600'>{mod.description}</p>
                            </div>
                            <div className='ml-4 flex items-center gap-2'>
                              <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor}`}>
                                {statusText}
                              </span>
                              <button
                                onClick={() => {
                                  handleEditModule(mod.id);
                                }}
                                className='rounded-lg p-2 text-blue-600 hover:bg-blue-50'
                                title={`Chỉnh sửa ${mod.name}`}
                              >
                                <Edit className='h-4 w-4' />
                              </button>
                            </div>
                          </div>

                          {mod.progress > 0 && (
                            <div className='mt-3'>
                              <div className='mb-1 flex items-center justify-between text-xs text-slate-500'>
                                <span>Tiến độ học viên trung bình</span>
                                <span className='font-semibold'>{mod.progress}%</span>
                              </div>
                              <div className='h-2 overflow-hidden rounded-full bg-slate-200'>
                                <div
                                  className='h-full rounded-full bg-emerald-500'
                                  style={{ width: `${String(mod.progress)}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className='text-sm text-slate-600'>Chưa có module nào cho chương trình này.</p>
                )}
              </section>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className='space-y-6'>
              {/* Quick Actions */}
              <div className='rounded-xl border border-slate-100 bg-white p-6 shadow-sm'>
                <h3 className='mb-4 text-base font-semibold text-slate-900'>Thao tác nhanh</h3>
                <div className='space-y-2'>
                  <button
                    onClick={handleJoinMeet}
                    className='flex w-full items-center gap-3 rounded-lg bg-blue-50 px-4 py-3 text-left text-sm font-medium text-blue-700 transition hover:bg-blue-100'
                  >
                    <Video className='h-5 w-5' />
                    Vào phòng họp
                  </button>
                  <button
                    onClick={() => toast.info("Xem danh sách học viên")}
                    className='flex w-full items-center gap-3 rounded-lg bg-emerald-50 px-4 py-3 text-left text-sm font-medium text-emerald-700 transition hover:bg-emerald-100'
                  >
                    <Users className='h-5 w-5' />
                    Danh sách học viên
                  </button>
                  <button
                    onClick={() => toast.info("Xem lịch tư vấn")}
                    className='flex w-full items-center gap-3 rounded-lg bg-purple-50 px-4 py-3 text-left text-sm font-medium text-purple-700 transition hover:bg-purple-100'
                  >
                    <Calendar className='h-5 w-5' />
                    Lịch tư vấn
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className='rounded-xl border border-slate-100 bg-white p-6 shadow-sm'>
                <h3 className='mb-4 text-base font-semibold text-slate-900'>Thống kê</h3>
                <div className='space-y-3 text-sm'>
                  <div className='flex items-center justify-between'>
                    <span className='text-slate-600'>Tổng học viên</span>
                    <span className='font-semibold text-slate-900'>15</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-slate-600'>Tiến độ trung bình</span>
                    <span className='font-semibold text-blue-600'>65%</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-slate-600'>Buổi tư vấn</span>
                    <span className='font-semibold text-emerald-600'>8/12</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-slate-600'>Đánh giá</span>
                    <span className='flex items-center gap-1 font-semibold text-yellow-600'>
                      <Star className='h-4 w-4 fill-yellow-500' />
                      4.8/5
                    </span>
                  </div>
                </div>
              </div>

              {/* Resources */}
              <div className='rounded-xl border border-slate-100 bg-white p-6 shadow-sm'>
                <div className='mb-4 flex items-center justify-between'>
                  <h3 className='text-base font-semibold text-slate-900'>Tài nguyên</h3>
                  <button onClick={handleEditContent} className='text-sm text-blue-600 hover:text-blue-700'>
                    Quản lý
                  </button>
                </div>
                <ul className='space-y-3'>
                  {resources.map((res) => (
                    <li key={res.id} className='rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm'>
                      <div className='font-medium text-slate-900'>{res.label}</div>
                      <div className='mt-1 text-xs text-slate-600'>{res.description}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProgramDetailPage;
