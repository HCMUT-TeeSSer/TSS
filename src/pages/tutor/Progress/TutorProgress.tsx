import React from "react";
import {
  BookOpen,
  Users,
  Clock,
  Star,
  BarChart3,
  PieChart,
  CheckCircle2,
  FileText,
  ChevronRight,
  Calendar,
  Download,
  Brain,
  Layout,
} from "lucide-react";

interface TeachingProgram {
  id: number;
  title: string;
  description?: string;
  status: "ongoing" | "completed";
  students: number;
  progress: number;
  avgScore: number;
  rating: number;
  participation: number;
  studentsA: string;
  nextSession?: string;
  startDate?: string;
  endDate?: string;
  duration?: string;
  lecturesCompleted?: number;
  totalLectures?: number;
  completionRate?: number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

const ongoingCourses: TeachingProgram[] = [
  {
    id: 1,
    title: "Cơ Bản Học Máy",
    description: "Dạy các khái niệm cốt lõi của học máy cho sinh viên năm cuối.",
    status: "ongoing",
    students: 45,
    progress: 60,
    avgScore: 8.2,
    rating: 4.9,
    participation: 94,
    studentsA: "28/40",
    startDate: "15 Tháng 1, 2024",
    endDate: "10 Tháng 3, 2024",
    duration: "8 tuần",
    lecturesCompleted: 6,
    totalLectures: 10,
    icon: <Brain className='h-5 w-5' />,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    title: "Lập Trình Python Nâng Cao",
    description: "Khóa học chuyên sâu về Python và các ứng dụng thực tế.",
    status: "ongoing",
    students: 38,
    progress: 35,
    avgScore: 7.8,
    rating: 4.7,
    participation: 91,
    studentsA: "24/35",
    startDate: "12 Tháng 1, 2024",
    endDate: "20 Tháng 3, 2024",
    duration: "10 tuần",
    lecturesCompleted: 4,
    totalLectures: 12,
    icon: <BookOpen className='h-5 w-5' />,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    id: 3,
    title: "Thiết Kế Cơ Sở Dữ Liệu SQL",
    description: "Hướng dẫn thiết kế và tối ưu hóa cơ sở dữ liệu quan hệ.",
    status: "ongoing",
    students: 52,
    progress: 50,
    avgScore: 8.5,
    rating: 4.8,
    participation: 96,
    studentsA: "30/45",
    startDate: "22 Tháng 1, 2024",
    endDate: "30 Tháng 3, 2024",
    duration: "8 tuần",
    lecturesCompleted: 5,
    totalLectures: 10,
    icon: <PieChart className='h-5 w-5' />,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
];

const completedCourses: TeachingProgram[] = [
  {
    id: 4,
    title: "Phát Triển Web Full-Stack",
    description: "Hoàn thành khóa học về frontend và backend development.",
    status: "completed",
    students: 35,
    progress: 100,
    avgScore: 7.9,
    rating: 4.6,
    participation: 89,
    studentsA: "22/35",
    completionRate: 89,
    endDate: "10 Tháng 12, 2023",
    icon: <Layout className='h-5 w-5' />,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
  {
    id: 5,
    title: "Biểu Đồ Dữ Liệu & Phân Tích",
    description: "Khóa học về trực quan hóa dữ liệu và phân tích kinh doanh.",
    status: "completed",
    students: 40,
    progress: 100,
    avgScore: 8.7,
    rating: 4.9,
    participation: 95,
    studentsA: "28/40",
    completionRate: 92,
    endDate: "15 Tháng 1, 2024",
    icon: <BarChart3 className='h-5 w-5' />,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
  },
];

const TutorProgress: React.FC = () => {
  return (
    <div className='min-h-screen bg-white pb-16'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>Tiến trình giảng dạy</h1>
            <p className='mt-1 text-sm text-gray-600'>Theo dõi hoạt động giảng dạy và thành tích của bạn</p>
          </div>
        </div>

        {/* Top stats */}
        <div className='mb-6 grid gap-4 md:grid-cols-4'>
          <div className='rounded-xl bg-white p-4 shadow-sm'>
            <div className='flex items-center justify-between'>
              <span className='text-xs font-medium tracking-wide text-gray-500 uppercase'>Tổng Sinh Viên</span>
              <div className='rounded-full bg-blue-50 p-2'>
                <Users className='h-4 w-4 text-blue-600' />
              </div>
            </div>
            <p className='mt-3 text-2xl font-bold text-gray-900'>247</p>
            <p className='mt-1 text-xs text-emerald-600'>▲ +18 tháng này</p>
          </div>

          <div className='rounded-xl bg-white p-4 shadow-sm'>
            <div className='flex items-center justify-between'>
              <span className='text-xs font-medium tracking-wide text-gray-500 uppercase'>Khóa Học Đang Dạy</span>
              <div className='rounded-full bg-violet-50 p-2'>
                <BookOpen className='h-4 w-4 text-violet-600' />
              </div>
            </div>
            <p className='mt-3 text-2xl font-bold text-gray-900'>12</p>
            <p className='mt-1 text-xs text-blue-500'>📘4 khóa mới</p>
          </div>

          <div className='rounded-xl bg-white p-4 shadow-sm'>
            <div className='flex items-center justify-between'>
              <span className='text-xs font-medium tracking-wide text-gray-500 uppercase'>Giờ Giảng Dạy</span>
              <div className='rounded-full bg-green-50 p-2'>
                <Clock className='h-4 w-4 text-green-600' />
              </div>
            </div>
            <p className='mt-3 text-2xl font-bold text-gray-900'>1,284</p>
            <p className='mt-1 text-xs text-gray-900'>⌚156h tháng này</p>
          </div>

          <div className='rounded-xl bg-white p-4 shadow-sm'>
            <div className='flex items-center justify-between'>
              <span className='text-xs font-medium tracking-wide text-gray-500 uppercase'>Đánh Giá Trung Bình</span>
              <div className='rounded-full bg-yellow-50 p-2'>
                <Star className='h-4 w-4 text-yellow-500' />
              </div>
            </div>
            <p className='mt-3 text-2xl font-bold text-gray-900'>4.8</p>
            <p className='mt-1 text-xs text-yellow-500'>⭐189 đánh giá</p>
          </div>
        </div>

        {/* Charts (ve tuong trung) */}
        <div className='mb-8 grid gap-4 md:grid-cols-2'>
          <div className='rounded-xl bg-white p-4 shadow-sm'>
            <div className='mb-4 flex items-center justify-between'>
              <span className='text-sm font-semibold text-gray-900'>Thống Kê Sinh Viên Theo Tháng</span>
              <BarChart3 className='h-4 w-4 text-blue-500' />
            </div>
            <div className='mt-4 flex h-40 items-end justify-between gap-3'>
              {[60, 72, 80, 88, 95].map((value, idx) => {
                const heightPx = (value / 100) * 140;
                return (
                  <div key={idx} className='flex flex-1 flex-col items-center justify-end gap-2'>
                    <div className='w-6 rounded-t-lg bg-blue-500' style={{ height: `${heightPx.toString()}px` }} />
                    <span className='text-xs text-gray-400'>T{idx + 1}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className='rounded-xl bg-white p-4 shadow-sm'>
            <div className='mb-4 flex items-center justify-between'>
              <span className='text-sm font-semibold text-gray-900'>Phân Bố Khóa Học</span>
              <PieChart className='h-4 w-4 text-violet-500' />
            </div>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center gap-4'>
                <div className='relative h-32 w-32'>
                  <div
                    className='absolute inset-0 rounded-full opacity-90'
                    style={{
                      backgroundImage:
                        "conic-gradient(#3b82f6 0 35%, #8b5cf6 35% 63%, #10b981 63% 85%, #f59e0b 85% 100%)",
                    }}
                  />
                  <div className='absolute inset-4 rounded-full bg-white' />
                  <div className='absolute inset-8 flex items-center justify-center'>
                    <p className='text-center text-xs font-semibold text-gray-700'>
                      12 khóa
                      <br />
                      đang dạy
                    </p>
                  </div>
                </div>
                <div className='flex-1 space-y-2 text-xs'>
                  <div className='flex items-center gap-2'>
                    <span className='h-2 w-2 rounded-full bg-blue-500' />
                    <span className='text-gray-600'>Khoa học dữ liệu</span>
                    <span className='ml-auto font-medium text-gray-900'>35%</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='h-2 w-2 rounded-full bg-violet-500' />
                    <span className='text-gray-600'>Lập trình</span>
                    <span className='ml-auto font-medium text-gray-900'>28%</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='h-2 w-2 rounded-full bg-emerald-500' />
                    <span className='text-gray-600'>Web & Mobile</span>
                    <span className='ml-auto font-medium text-gray-900'>22%</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='h-2 w-2 rounded-full bg-amber-400' />
                    <span className='text-gray-600'>Khác</span>
                    <span className='ml-auto font-medium text-gray-900'>15%</span>
                  </div>
                </div>
              </div>
              <div className='flex w-full justify-center gap-3'>
                <span className='h-1.5 w-5 rounded-full bg-blue-500' />
                <span className='h-1.5 w-5 rounded-full bg-violet-500' />
                <span className='h-1.5 w-5 rounded-full bg-emerald-500' />
                <span className='h-1.5 w-5 rounded-full bg-amber-400' />
              </div>
            </div>
          </div>
        </div>

        {/* Ongoing courses */}
        <div className='mb-6'>
          <div className='mb-3 flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-gray-900'>Khóa học đang dạy</h2>
            <span className='rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700'>Đang dạy</span>
          </div>

          <div className='space-y-4'>
            {ongoingCourses.map((course) => (
              <div
                key={course.id}
                className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md'
              >
                <div className='flex gap-4'>
                  {/* Icon */}
                  <div
                    className={`mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${course.iconBg}`}
                  >
                    <span className={course.iconColor}>{course.icon}</span>
                  </div>

                  {/* Content */}
                  <div className='flex flex-1 flex-col gap-4'>
                    <div className='flex-1'>
                      <div className='mb-1 flex items-start justify-between'>
                        <div>
                          <h3 className='text-lg font-bold text-gray-900'>{course.title}</h3>
                          <p className='mt-1 text-sm text-gray-600'>{course.description}</p>
                        </div>
                        <span className='shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700'>
                          Đang dạy
                        </span>
                      </div>

                      <div className='mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500'>
                        <div className='flex items-center gap-2'>
                          <Users className='h-4 w-4' />
                          <span>{course.students} sinh viên</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Calendar className='h-4 w-4' />
                          <span>Bắt đầu {course.startDate}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Clock className='h-4 w-4' />
                          <span>{course.duration}</span>
                        </div>
                      </div>

                      <div className='mt-6'>
                        <div className='mb-2 flex items-center justify-between'>
                          <span className='font-medium text-gray-900'>Tiến độ khóa học</span>
                          <span className='font-bold text-blue-600'>{course.progress}%</span>
                        </div>
                        <div className='mb-2 h-2.5 w-full overflow-hidden rounded-full bg-gray-100'>
                          <div
                            className='h-full rounded-full bg-blue-600 transition-all'
                            style={{ width: `${course.progress.toString()}%` }}
                          />
                        </div>
                        <div className='flex items-center justify-between text-xs text-gray-500'>
                          <span>
                            Đã hoàn thành {course.lecturesCompleted} trong {course.totalLectures} bài giảng
                          </span>
                          <span>Kết thúc: {course.endDate}</span>
                        </div>
                      </div>

                      <div className='mt-6 grid gap-4 rounded-xl bg-gray-50 p-4 sm:grid-cols-3'>
                        <div className='text-center'>
                          <p className='text-xs font-medium text-gray-500'>Tỷ lệ tham gia</p>
                          <p className='mt-1 text-lg font-bold text-gray-900'>{course.participation}%</p>
                        </div>
                        <div className='border-l border-gray-200 text-center'>
                          <p className='text-xs font-medium text-gray-500'>Điểm TB</p>
                          <p className='mt-1 text-lg font-bold text-gray-900'>{course.avgScore}</p>
                        </div>
                        <div className='border-l border-gray-200 text-center'>
                          <p className='text-xs font-medium text-gray-500'>Đánh giá</p>
                          <div className='mt-1 flex items-center justify-center gap-1'>
                            <span className='text-lg font-bold text-gray-900'>{course.rating}</span>
                            <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='flex flex-wrap gap-3'>
                      <button className='inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700'>
                        <BarChart3 className='mr-2 h-4 w-4' />
                        Quản lý lớp học
                      </button>
                      <button className='inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50'>
                        <Users className='mr-2 h-4 w-4' />
                        Danh sách SV
                      </button>
                      <button className='inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50'>
                        <FileText className='mr-2 h-4 w-4' />
                        Bài tập
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed courses */}
        <div className='mb-6'>
          <div className='mb-3 flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-gray-900'>Khóa học đã hoàn thành</h2>
            <span className='rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700'>Hoàn thành</span>
          </div>

          <div className='space-y-4'>
            {completedCourses.map((course) => (
              <div
                key={course.id}
                className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md'
              >
                <div className='flex gap-4'>
                  {/* Icon */}
                  <div
                    className={`mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${course.iconBg}`}
                  >
                    <span className={course.iconColor}>{course.icon}</span>
                  </div>

                  {/* Content */}
                  <div className='flex flex-1 flex-col gap-4'>
                    <div className='flex-1'>
                      <div className='mb-1 flex items-start justify-between'>
                        <div>
                          <h3 className='text-lg font-bold text-gray-900'>{course.title}</h3>
                          <p className='mt-1 text-sm text-gray-600'>{course.description}</p>
                        </div>
                        <span className='shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700'>
                          Hoàn thành
                        </span>
                      </div>

                      <div className='mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500'>
                        <div className='flex items-center gap-2'>
                          <Users className='h-4 w-4' />
                          <span>{course.students} sinh viên</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <CheckCircle2 className='h-4 w-4' />
                          <span>Hoàn thành {course.endDate}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                          <span>Đánh giá: {course.rating}</span>
                        </div>
                      </div>

                      <div className='mt-6 grid gap-4 rounded-xl bg-gray-50 p-4 sm:grid-cols-3'>
                        <div className='text-center'>
                          <p className='text-xs font-medium text-gray-500'>Tỷ lệ hoàn thành</p>
                          <p className='mt-1 text-lg font-bold text-gray-900'>{course.completionRate}%</p>
                        </div>
                        <div className='border-l border-gray-200 text-center'>
                          <p className='text-xs font-medium text-gray-500'>Điểm TB cuối kỳ</p>
                          <p className='mt-1 text-lg font-bold text-gray-900'>{course.avgScore}</p>
                        </div>
                        <div className='border-l border-gray-200 text-center'>
                          <p className='text-xs font-medium text-gray-500'>SV đạt điểm A</p>
                          <p className='mt-1 text-lg font-bold text-gray-900'>{course.studentsA}</p>
                        </div>
                      </div>
                    </div>

                    <div className='flex flex-wrap gap-3'>
                      <button className='inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50'>
                        <FileText className='mr-2 h-4 w-4' />
                        Xem báo cáo
                      </button>
                      <button className='inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50'>
                        <Download className='mr-2 h-4 w-4' />
                        Tải tài liệu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className='mt-6 flex items-center justify-between text-xs text-gray-500'>
          <span>Hiển thị 1–5 trong 12 khóa học</span>
          <div className='inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1 shadow-sm'>
            <button className='rounded px-2 py-1 text-gray-400 hover:bg-gray-50'>
              <ChevronRight className='h-3 w-3 rotate-180' />
            </button>
            <button className='rounded bg-blue-600 px-2 py-1 text-xs font-semibold text-white'>1</button>
            <button className='rounded px-2 py-1 text-xs text-gray-600 hover:bg-gray-50'>2</button>
            <button className='rounded px-2 py-1 text-xs text-gray-600 hover:bg-gray-50'>3</button>
            <button className='rounded px-2 py-1 text-gray-400 hover:bg-gray-50'>
              <ChevronRight className='h-3 w-3' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProgress;
