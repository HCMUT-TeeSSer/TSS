import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Play, CheckCircle, Plus, Download, Users, Calendar, TrendingUp } from "lucide-react";
import { jsPDF } from "jspdf";
import path from "@/constants/path";
import { toast } from "react-toastify";

interface Program {
  id: number;
  title: string;
  tutor: string;
  desc: string;
  start: string;
  session: string;
  progress: number;
  status: "active" | "done";
  color: string;
  icon?: string;
  materialUrl: string;
  certificateUrl?: string;
}

// Mock data - các chương trình tutor đang dạy
const tutorPrograms: Program[] = [
  {
    id: 1,
    icon: "🐍",
    title: "Lập trình Python Nâng cao",
    tutor: "15 học viên",
    desc: "Hướng dẫn học viên về OOP, web development với Django, và machine learning cơ bản.",
    start: "Bắt đầu: 15 tháng 3, 2024",
    session: "Buổi tiếp theo: Thứ Hai, 10:00 AM",
    progress: 65,
    status: "active",
    color: "bg-blue-500",
    materialUrl: "/files/material-python.pdf",
  },
  {
    id: 2,
    icon: "☕",
    title: "Java Cơ bản",
    tutor: "12 học viên",
    desc: "Giảng dạy nền tảng Java, OOP và các design patterns quan trọng.",
    start: "Bắt đầu: 10 tháng 3, 2024",
    session: "Buổi tiếp theo: Thứ Tư, 2:00 PM",
    progress: 40,
    status: "active",
    color: "bg-orange-500",
    materialUrl: "/files/material-java.pdf",
  },
  {
    id: 3,
    icon: "📊",
    title: "Phân tích Dữ liệu",
    tutor: "20 học viên",
    desc: "Hướng dẫn pandas, numpy, visualization và statistical analysis.",
    start: "Hoàn thành: 1 tháng 3, 2024",
    session: "",
    progress: 100,
    status: "done",
    color: "bg-green-500",
    materialUrl: "/files/material-analysis.pdf",
    certificateUrl: "/files/cert-analysis.pdf",
  },
  {
    id: 4,
    icon: "⚛️",
    title: "React và TypeScript",
    tutor: "18 học viên",
    desc: "Phát triển ứng dụng web hiện đại với React, hooks, và TypeScript.",
    start: "Bắt đầu: 5 tháng 3, 2024",
    session: "Buổi tiếp theo: Thứ Sáu, 4:00 PM",
    progress: 55,
    status: "active",
    color: "bg-cyan-500",
    materialUrl: "/files/material-react.pdf",
  },
];

const TutorProgramList: React.FC = () => {
  const navigate = useNavigate();
  const [programList] = useState<Program[]>(tutorPrograms);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "done">("all");
  const [sortOption, setSortOption] = useState<"newest" | "oldest" | "students">("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  const parseDateFromStart = (startText: string): number => {
    const match = /(\d{1,2})\s+tháng\s+(\d{1,2}),\s*(\d{4})/.exec(startText);
    if (!match) return 0;
    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);
    return new Date(year, month - 1, day).getTime();
  };

  const searchLower = search.toLowerCase().trim();

  const filteredPrograms = programList.filter((p) => {
    const matchesSearch =
      !searchLower ||
      p.title.toLowerCase().includes(searchLower) ||
      p.tutor.toLowerCase().includes(searchLower) ||
      p.desc.toLowerCase().includes(searchLower);

    const matchesStatus = statusFilter === "all" ? true : p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedPrograms = [...filteredPrograms].sort((a, b) => {
    if (sortOption === "students") {
      const studentsA = parseInt(/\d+/.exec(a.tutor)?.[0] ?? "0");
      const studentsB = parseInt(/\d+/.exec(b.tutor)?.[0] ?? "0");
      return studentsB - studentsA;
    }
    const timeA = parseDateFromStart(a.start);
    const timeB = parseDateFromStart(b.start);
    return sortOption === "newest" ? timeB - timeA : timeA - timeB;
  });

  const totalItems = sortedPrograms.length;
  const totalPages = totalItems === 0 ? 1 : Math.ceil(totalItems / itemsPerPage);
  const effectiveCurrentPage = Math.min(currentPage, totalPages || 1);
  const startIndex = (effectiveCurrentPage - 1) * itemsPerPage;
  const currentPrograms = sortedPrograms.slice(startIndex, startIndex + itemsPerPage);
  const startItem = totalItems === 0 ? 0 : startIndex + 1;
  const endItem = totalItems === 0 ? 0 : Math.min(startIndex + itemsPerPage, totalItems);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: "all" | "active" | "done") => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: "newest" | "oldest" | "students") => {
    setSortOption(value);
    setCurrentPage(1);
  };

  const handleExportPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Báo cáo các chương trình giảng dạy", 14, 20);
    doc.setFontSize(11);
    let y = 30;

    if (sortedPrograms.length === 0) {
      doc.text("Không có chương trình nào phù hợp với bộ lọc hiện tại.", 14, y);
    } else {
      sortedPrograms.forEach((p, index) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.text(`${String(index + 1)}. ${p.title}`, 14, y);
        y += 6;
        doc.text(`Số học viên: ${p.tutor}`, 18, y);
        y += 5;
        doc.text(`Trạng thái: ${p.status === "active" ? "Đang dạy" : "Đã hoàn thành"}`, 18, y);
        y += 5;
        doc.text(`Tiến độ: ${String(p.progress)}%`, 18, y);
        y += 8;
      });
    }

    doc.save("bao-cao-giang-day.pdf");
    toast.success("Đã xuất báo cáo PDF thành công!");
  };

  const handleNavigateToProgram = (programId: number) => {
    void navigate(path.tutorProgramDetailView.replace(":programId", String(programId)));
  };

  const handleDownloadMaterial = (program: Program, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.info(`Đang tải tài liệu: ${program.title}`);
  };

  const handleDownloadCertificate = (program: Program, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.info(`Đang tải chứng chỉ: ${program.title}`);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 py-8'>
      <div className='container mx-auto px-4'>
        {/* HEADER */}
        <div className='mb-8 text-center'>
          <h1 className='mb-3 text-4xl font-bold text-slate-800'>Chương trình giảng dạy của tôi</h1>
          <p className='text-base text-slate-600'>
            Quản lý và theo dõi các chương trình bạn đang giảng dạy cho học viên
          </p>
        </div>

        {/* STATS CARDS */}
        <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          <div className='rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-slate-600'>Tổng chương trình</p>
                <p className='mt-2 text-3xl font-bold text-blue-600'>{programList.length}</p>
              </div>
              <BookOpen className='h-10 w-10 text-blue-500' />
            </div>
          </div>
          <div className='rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-slate-600'>Đang giảng dạy</p>
                <p className='mt-2 text-3xl font-bold text-emerald-600'>
                  {programList.filter((p) => p.status === "active").length}
                </p>
              </div>
              <Play className='h-10 w-10 text-emerald-500' />
            </div>
          </div>
          <div className='rounded-xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-6 shadow-sm'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-slate-600'>Tổng học viên</p>
                <p className='mt-2 text-3xl font-bold text-orange-600'>
                  {programList.reduce((sum, p) => {
                    const execResult = /\d+/.exec(p.tutor);
                    return sum + parseInt(execResult?.[0] ?? "0");
                  }, 0)}
                </p>
              </div>
              <Users className='h-10 w-10 text-orange-500' />
            </div>
          </div>
          <div className='rounded-xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-6 shadow-sm'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-slate-600'>Đã hoàn thành</p>
                <p className='mt-2 text-3xl font-bold text-purple-600'>
                  {programList.filter((p) => p.status === "done").length}
                </p>
              </div>
              <CheckCircle className='h-10 w-10 text-purple-500' />
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className='mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5'>
            <input
              type='text'
              placeholder='🔍 Tìm kiếm chương trình...'
              value={search}
              onChange={(e) => {
                handleSearchChange(e.target.value);
              }}
              className='rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
            />

            <select
              aria-label='Lọc trạng thái chương trình'
              value={statusFilter}
              onChange={(e) => {
                handleStatusChange(e.target.value as "all" | "active" | "done");
              }}
              className='rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
            >
              <option value='all'>📚 Tất cả trạng thái</option>
              <option value='active'>▶️ Đang giảng dạy</option>
              <option value='done'>✅ Đã hoàn thành</option>
            </select>

            <select
              aria-label='Sắp xếp chương trình'
              value={sortOption}
              onChange={(e) => {
                handleSortChange(e.target.value as "newest" | "oldest" | "students");
              }}
              className='rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
            >
              <option value='newest'>📅 Mới nhất</option>
              <option value='oldest'>⏰ Cũ nhất</option>
              <option value='students'>👥 Nhiều học viên nhất</option>
            </select>

            <button
              onClick={handleExportPdf}
              className='flex items-center justify-center gap-2 rounded-lg bg-slate-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800'
            >
              <Download className='h-4 w-4' />
              Xuất PDF
            </button>

            <button
              onClick={() => toast.info("Chức năng tạo chương trình mới đang được phát triển")}
              className='flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700'
            >
              <Plus className='h-4 w-4' />
              Tạo mới
            </button>
          </div>
        </div>

        {/* PROGRAM LIST */}
        {currentPrograms.length === 0 ? (
          <div className='rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm'>
            <p className='text-lg text-slate-500'>Không tìm thấy chương trình nào phù hợp.</p>
          </div>
        ) : (
          <>
            <div className='mb-4 text-sm text-slate-600'>
              Hiển thị {startItem} - {endItem} trong số {totalItems} chương trình
            </div>

            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
              {currentPrograms.map((program) => (
                <div
                  key={program.id}
                  onClick={() => {
                    handleNavigateToProgram(program.id);
                  }}
                  className='group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg'
                >
                  <div className='flex h-full'>
                    <div className={`w-2 ${program.color}`}></div>
                    <div className='flex-1 p-6'>
                      <div className='mb-3 flex items-start justify-between'>
                        <div className='flex items-center gap-3'>
                          <span className='text-3xl'>{program.icon}</span>
                          <div>
                            <h3 className='text-xl font-bold text-slate-800 group-hover:text-emerald-600'>
                              {program.title}
                            </h3>
                            <p className='mt-1 flex items-center gap-2 text-sm text-slate-600'>
                              <Users className='h-4 w-4' />
                              {program.tutor}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            program.status === "active"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {program.status === "active" ? "Đang dạy" : "Hoàn thành"}
                        </span>
                      </div>

                      <p className='mb-4 text-sm text-slate-600'>{program.desc}</p>

                      <div className='mb-4 space-y-2 text-xs text-slate-500'>
                        <div className='flex items-center gap-2'>
                          <Calendar className='h-4 w-4' />
                          {program.start}
                        </div>
                        {program.session && (
                          <div className='flex items-center gap-2'>
                            <Play className='h-4 w-4' />
                            {program.session}
                          </div>
                        )}
                      </div>

                      {program.status === "active" && (
                        <div className='mb-4'>
                          <div className='mb-2 flex items-center justify-between text-xs'>
                            <span className='text-slate-600'>Tiến độ</span>
                            <span className='font-semibold text-emerald-600'>{program.progress}%</span>
                          </div>
                          <div className='h-2 overflow-hidden rounded-full bg-slate-100'>
                            <div
                              className='h-full bg-emerald-500'
                              style={{ width: `${String(program.progress)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className='flex gap-2'>
                        <button
                          onClick={(e) => {
                            handleDownloadMaterial(program, e);
                          }}
                          className='flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200'
                        >
                          <Download className='h-4 w-4' />
                          Tài liệu
                        </button>
                        {program.certificateUrl && (
                          <button
                            onClick={(e) => {
                              handleDownloadCertificate(program, e);
                            }}
                            className='flex flex-1 items-center justify-center gap-2 rounded-lg bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-200'
                          >
                            <CheckCircle className='h-4 w-4' />
                            Chứng chỉ
                          </button>
                        )}
                        <button
                          title='Xem thống kê chương trình'
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.info(`Xem thống kê chương trình: ${program.title}`);
                          }}
                          className='flex items-center justify-center gap-2 rounded-lg bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-200'
                        >
                          <TrendingUp className='h-4 w-4' />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className='mt-8 flex items-center justify-center gap-2'>
                <button
                  onClick={handlePrevPage}
                  disabled={effectiveCurrentPage === 1}
                  className='rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50'
                >
                  Trước
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      handleChangePage(page);
                    }}
                    className={`rounded-lg px-4 py-2 text-sm font-medium ${
                      page === effectiveCurrentPage
                        ? "bg-emerald-600 text-white"
                        : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={handleNextPage}
                  disabled={effectiveCurrentPage === totalPages}
                  className='rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50'
                >
                  Sau
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TutorProgramList;
