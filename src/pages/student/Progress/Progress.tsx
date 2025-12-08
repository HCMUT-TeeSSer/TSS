import React, { useState } from "react";
import {
  BookOpen,
  Calendar,
  Clock,
  ChartLine,
  Download,
  Play,
  Star,
  Database,
  Code,
  BarChart3,
  Globe,
  Eye,
  User,
  Award,
  ChevronRight,
} from "lucide-react";

interface Program {
  id: number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  tutor: string;
  startDate: string;
  nextSession?: string;
  duration?: string;
  progress: number;
  progressText: string;
  completionDate?: string;
  status: "in-progress" | "completed";
  progressColor: string;
  badge?: string;
  badgeColor?: string;
  difficulty?: string;
}

const Progress: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock data - Chương trình đang học
  const inProgressPrograms: Program[] = [
    {
      id: 1,
      icon: <BookOpen className='h-5 w-5' />,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      title: "Cơ Bản Học Máy",
      description: "Học các khái niệm cơ bản của học máy và khám sức mạnh của những giải thuật học máy.",
      tutor: "Alex Chen",
      startDate: "Bắt đầu: 15 Tháng 3, 2024",
      nextSession: "Thứ Ba, 7:30 PM",
      duration: "8 tuần",
      progress: 75,
      progressText: "9 trong 12 bài học đã hoàn thành",
      completionDate: "Dự kiến hoàn thành: 20 Tháng 5, 2024",
      status: "in-progress",
      progressColor: "bg-blue-500",
      badge: "Đang học",
      badgeColor: "bg-blue-100 text-blue-700",
    },
    {
      id: 2,
      icon: <Code className='h-5 w-5' />,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      title: "Lập Trình Python Nâng Cao",
      description:
        "Thành thạo các kỹ thuật lập trình nâng cao với Python, bao gồm các thư viện, frameworks, và các kỹ thuật lập trình ứng dụng.",
      tutor: "Sarah Martinez",
      startDate: "Bắt đầu: 10 Tháng 3, 2023",
      nextSession: "Thứ Ba, 7:30 PM",
      duration: "10 tuần",
      progress: 82,
      progressText: "11 trong 13 bài học đã hoàn thành",
      completionDate: "Dự kiến hoàn thành: 28 Tháng 5, 2024",
      status: "in-progress",
      progressColor: "bg-purple-500",
      badge: "Đang học",
      badgeColor: "bg-purple-100 text-purple-700",
    },
    {
      id: 3,
      icon: <Database className='h-5 w-5' />,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      title: "Thiết Kế Cơ Sở Dữ Liệu SQL",
      description:
        "Học các nguyên tắc thiết kế cơ sở dữ liệu và kỹ thuật SQL để xây dựng các hệ thống dữ liệu hiệu quả.",
      tutor: "David Kim",
      startDate: "Bắt đầu: 7 Tháng 2, 2025",
      nextSession: "Thứ Ba, 7:30 PM",
      duration: "6 tuần",
      progress: 45,
      progressText: "4 trong 9 bài học đã hoàn thành",
      completionDate: "Dự kiến hoàn thành: 23 Tháng 3, 2024",
      status: "in-progress",
      progressColor: "bg-blue-500",
      badge: "Đang học",
      badgeColor: "bg-blue-100 text-blue-700",
    },
  ];

  // Mock data - Chương trình hoàn thành
  const completedPrograms: Program[] = [
    {
      id: 4,
      icon: <BarChart3 className='h-5 w-5' />,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      title: "Biểu Đồ Dữ Liệu Phân Tích",
      description:
        "Truyền thông các kỹ năng biểu đồ dữ liệu để trình bày các thông tin và phương pháp tốt nhất để truyền đạt thông tin.",
      tutor: "Michael Wong",
      startDate: "Hoàn thành: 20 Tháng 1, 2024",
      progress: 100,
      progressText: "9 trong 9 bài học đã hoàn thành",
      completionDate: "Hoàn thành sớm hơn kế hoạch",
      status: "completed",
      progressColor: "bg-green-500",
      badge: "Hoàn thành",
      badgeColor: "bg-green-100 text-green-700",
      difficulty: "Điểm A",
    },
    {
      id: 5,
      icon: <Globe className='h-5 w-5' />,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      title: "Lập Trình Web Cơ Bản",
      description: "Học HTML, CSS và JavaScript để xây dựng các trang web tương tác và ứng dụng web hiện đại.",
      tutor: "Jennifer Adams",
      startDate: "Hoàn thành: 15 Tháng 12, 2023",
      progress: 100,
      progressText: "Hoàn thành toàn bộ khóa học",
      completionDate: "Hoàn thành đúng hạn",
      status: "completed",
      progressColor: "bg-green-500",
      badge: "Hoàn thành",
      badgeColor: "bg-green-100 text-green-700",
      difficulty: "Điểm A-",
    },
  ];

  const allPrograms = [...inProgressPrograms, ...completedPrograms];

  // Pagination
  const totalPages = Math.ceil(allPrograms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPrograms = allPrograms.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const buttons: (number | string)[] = [];
    buttons.push(1);
    if (currentPage > 3) {
      buttons.push("...");
    }

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i !== 1 && i !== totalPages) {
        buttons.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      buttons.push("...");
    }

    if (totalPages > 1) {
      buttons.push(totalPages);
    }

    return buttons;
  };

  return (
    <div className='min-h-screen bg-white pb-20 font-sans'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Tiến Trình Học Tập</h1>
          <p className='mt-2 text-sm text-gray-600'>Theo dõi tiến độ học tập và thành tích của bạn</p>
        </div>

        {/* Chương Trình Đang Học */}
        <section className='mb-10'>
          <h2 className='mb-5 text-xl font-bold text-gray-900'>Chương Trình Đang Học</h2>

          <div className='space-y-4'>
            {currentPrograms
              .filter((p) => p.status === "in-progress")
              .map((program) => (
                <div
                  key={program.id}
                  className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md'
                >
                  <div className='flex items-start gap-4'>
                    {/* Icon */}
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${program.iconBg}`}>
                      <div className={program.iconColor}>{program.icon}</div>
                    </div>

                    {/* Content */}
                    <div className='flex-1'>
                      <div className='flex items-start justify-between'>
                        <div className='flex-1'>
                          <h3 className='text-lg font-bold text-gray-900'>{program.title}</h3>
                          <p className='mt-1 text-sm text-gray-600'>{program.description}</p>
                        </div>
                        {program.badge && (
                          <span
                            className={`ml-4 shrink-0 rounded-md px-2.5 py-1 text-xs font-semibold ${program.badgeColor ?? ""}`}
                          >
                            {program.badge}
                          </span>
                        )}
                      </div>

                      {/* Meta Info */}
                      <div className='mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500'>
                        <div className='flex items-center gap-1.5'>
                          <User className='h-3.5 w-3.5' />
                          <span>{program.tutor}</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                          <Calendar className='h-3.5 w-3.5' />
                          <span>{program.startDate}</span>
                        </div>
                        {program.nextSession && (
                          <div className='flex items-center gap-1.5'>
                            <Clock className='h-3.5 w-3.5' />
                            <span>{program.duration}</span>
                          </div>
                        )}
                        {program.difficulty && (
                          <div className='flex items-center gap-1.5'>
                            <Star className='h-3.5 w-3.5' />
                            <span>{program.difficulty}</span>
                          </div>
                        )}
                      </div>

                      {/* Progress Section */}
                      <div className='mt-4'>
                        <div className='mb-1.5 flex items-center justify-between text-xs'>
                          <span className='font-medium text-gray-700'>Tiến độ</span>
                          <span className='font-bold text-gray-900'>{program.progress}%</span>
                        </div>
                        <div className='mb-1.5 h-2 w-full overflow-hidden rounded-full bg-gray-100'>
                          <div
                            className={`h-full ${program.progressColor} transition-all duration-300`}
                            style={{ width: `${program.progress.toString()}%` }}
                          />
                        </div>
                        <div className='flex items-center justify-between text-xs text-gray-500'>
                          <span>{program.progressText}</span>
                          {program.completionDate && <span>{program.completionDate}</span>}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className='mt-4 flex flex-wrap gap-2'>
                        <button className='inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700'>
                          <Play className='h-3.5 w-3.5' />
                          Tiếp tục học
                        </button>
                        <button className='inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50'>
                          <Eye className='h-3.5 w-3.5' />
                          Xem chi tiết
                        </button>
                        <button className='inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50'>
                          <ChartLine className='h-3.5 w-3.5' />
                          Xem tiến trình
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Chương Trình Hoàn Thành */}
        <section className='mb-10'>
          <h2 className='mb-5 text-xl font-bold text-gray-900'>Chương Trình Hoàn Thành</h2>

          <div className='space-y-4'>
            {currentPrograms
              .filter((p) => p.status === "completed")
              .map((program) => (
                <div
                  key={program.id}
                  className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md'
                >
                  <div className='flex items-start gap-4'>
                    {/* Icon */}
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${program.iconBg}`}>
                      <div className={program.iconColor}>{program.icon}</div>
                    </div>

                    {/* Content */}
                    <div className='flex-1'>
                      <div className='flex items-start justify-between'>
                        <div className='flex-1'>
                          <h3 className='text-lg font-bold text-gray-900'>{program.title}</h3>
                          <p className='mt-1 text-sm text-gray-600'>{program.description}</p>
                        </div>
                        {program.badge && (
                          <span
                            className={`ml-4 shrink-0 rounded-md px-2.5 py-1 text-xs font-semibold ${program.badgeColor ?? ""}`}
                          >
                            {program.badge}
                          </span>
                        )}
                      </div>

                      {/* Meta Info */}
                      <div className='mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500'>
                        <div className='flex items-center gap-1.5'>
                          <User className='h-3.5 w-3.5' />
                          <span>{program.tutor}</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                          <Calendar className='h-3.5 w-3.5' />
                          <span>{program.startDate}</span>
                        </div>
                        {program.difficulty && (
                          <div className='flex items-center gap-1.5'>
                            <Star className='h-3.5 w-3.5 text-green-600' />
                            <span className='font-medium text-green-600'> {program.difficulty}</span>
                          </div>
                        )}
                      </div>

                      {/* Progress Section */}
                      <div className='mt-4'>
                        <div className='mb-1.5 flex items-center justify-between text-xs'>
                          <span className='font-medium text-gray-700'>Tiến độ</span>
                          <span className='font-bold text-green-600'>{program.progress}%</span>
                        </div>
                        <div className='mb-1.5 h-2 w-full overflow-hidden rounded-full bg-gray-100'>
                          <div
                            className={`h-full ${program.progressColor} transition-all duration-300`}
                            style={{ width: `${program.progress.toString()}%` }}
                          />
                        </div>
                        <div className='flex items-center justify-between text-xs text-gray-500'>
                          <span>{program.progressText}</span>
                          {program.completionDate && <span>{program.completionDate}</span>}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className='mt-4 flex flex-wrap gap-2'>
                        <button className='inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50'>
                          <Award className='h-3.5 w-3.5' />
                          Xem chứng chỉ
                        </button>
                        <button className='inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50'>
                          <Eye className='h-3.5 w-3.5' />
                          Xem chi tiết
                        </button>
                        <button className='inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50'>
                          <Download className='h-3.5 w-3.5' />
                          Tải tài liệu
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='mt-8 flex items-center justify-between'>
            <p className='text-sm text-gray-600'>
              Hiển thị {startIndex + 1}-{Math.min(startIndex + itemsPerPage, allPrograms.length)} trong{" "}
              {allPrograms.length} khóa học
            </p>

            <div className='flex items-center gap-2'>
              {/* Previous Button */}
              <button
                onClick={() => {
                  handlePageChange(Math.max(1, currentPage - 1));
                }}
                disabled={currentPage === 1}
                className='rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
              >
                Trước
              </button>

              {/* Page Numbers */}
              {renderPaginationButtons().map((page, index) => {
                if (page === "...") {
                  return (
                    <span key={`ellipsis-${index.toString()}`} className='px-2 text-sm text-gray-400'>
                      ...
                    </span>
                  );
                }

                const pageNum = page as number;
                return (
                  <button
                    key={pageNum}
                    onClick={() => {
                      handlePageChange(pageNum);
                    }}
                    className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                onClick={() => {
                  handlePageChange(Math.min(totalPages, currentPage + 1));
                }}
                disabled={currentPage === totalPages}
                className='rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
              >
                Sau
              </button>
            </div>
          </div>
        )}
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

export default Progress;
