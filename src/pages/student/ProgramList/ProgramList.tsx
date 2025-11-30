import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import programsData from "@/data/program.json";
import { BookOpen, Play, CheckCircle, Plus, Download } from "lucide-react";
import { jsPDF } from "jspdf";
import path from "@/constants/path";

interface Program {
  id: number;
  title: string;
  tutor: string;
  desc: string;
  start: string;
  session: string;
  progress: number;
  status: "active" | "done";
  color: string; // tailwind bg-*
  icon?: string;
  materialUrl: string;
  certificateUrl?: string;
}

interface PreviewDoc {
  title: string;
  pdfUrl?: string;
}

const DEFAULT_PDF = "/files/default.pdf"; // PDF mặc định nếu thiếu đường dẫn

// 3 khóa gợi ý để đăng ký thêm
const suggestedPrograms: Program[] = [
  {
    id: 8,
    icon: "📘",
    title: "Nhập môn Machine Learning",
    tutor: "TS. Phan Nguyễn Tiến Đạt",
    desc: "Giới thiệu khái niệm cơ bản của machine learning, supervised/unsupervised learning và bài toán thực tế.",
    start: "Bắt đầu: 22 tháng 3, 2024",
    session: "Buổi tiếp theo: Thứ Ba, 7:30 PM",
    progress: 0,
    status: "active",
    color: "bg-blue-500",
    materialUrl: "/files/material-ml.pdf",
  },
  {
    id: 9,
    icon: "✍️",
    title: "Kỹ năng viết học thuật",
    tutor: "ThS. Lê Thanh Đức",
    desc: "Hướng dẫn cấu trúc bài luận, trích dẫn tài liệu và trình bày báo cáo khoa học chuẩn chỉnh.",
    start: "Bắt đầu: 18 tháng 3, 2024",
    session: "Buổi tiếp theo: Chủ Nhật, 9:00 AM",
    progress: 0,
    status: "active",
    color: "bg-purple-500",
    materialUrl: "/files/material-academic-writing.pdf",
  },
  {
    id: 10,
    icon: "🧩",
    title: "Cấu trúc dữ liệu & Giải thuật",
    tutor: "TS. Đỗ Lê Anh Khoa",
    desc: "Ôn tập các cấu trúc dữ liệu cốt lõi và kỹ thuật giải thuật giúp tối ưu chương trình.",
    start: "Hoàn thành: 12 tháng 3, 2024",
    session: "",
    progress: 0,
    status: "done",
    color: "bg-green-500",
    materialUrl: "/files/material-dsa.pdf",
    certificateUrl: "/files/cert-dsa.pdf",
  },
];

const ProgramList: React.FC = () => {
  const navigate = useNavigate();
  const [programList, setProgramList] = useState<Program[]>(programsData as Program[]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "done">("all");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [sortOption, setSortOption] = useState<"newest" | "oldest">("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const [showSuggest, setShowSuggest] = useState(false);

  // Preview PDF
  const [previewDoc, setPreviewDoc] = useState<PreviewDoc | null>(null);

  const itemsPerPage = 4;

  // Parse chuỗi ngày dạng "Bắt đầu: 15 tháng 3, 2024" / "Hoàn thành: 1 tháng 3, 2024"
  const parseDateFromStart = (startText: string): number => {
    const match = /(\d{1,2})\s+tháng\s+(\d{1,2}),\s*(\d{4})/.exec(startText);
    if (!match) return 0;
    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);
    return new Date(year, month - 1, day).getTime();
  };

  const searchLower = search.toLowerCase().trim();

  // Dùng title làm "môn học"
  const subjectOptions = Array.from(new Set(programList.map((p) => p.title)));

  // FILTER
  const filteredPrograms = programList.filter((p) => {
    const matchesSearch =
      !searchLower ||
      p.title.toLowerCase().includes(searchLower) ||
      p.tutor.toLowerCase().includes(searchLower) ||
      p.desc.toLowerCase().includes(searchLower);

    const matchesStatus = statusFilter === "all" ? true : p.status === statusFilter;

    const matchesSubject = subjectFilter === "all" ? true : p.title === subjectFilter;

    return matchesSearch && matchesStatus && matchesSubject;
  });

  // SORT
  const sortedPrograms = [...filteredPrograms].sort((a, b) => {
    const timeA = parseDateFromStart(a.start);
    const timeB = parseDateFromStart(b.start);
    return sortOption === "newest" ? timeB - timeA : timeA - timeB;
  });

  // PAGINATION
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
  const handleSubjectChange = (value: string) => {
    setSubjectFilter(value);
    setCurrentPage(1);
  };
  const handleSortChange = (value: "newest" | "oldest") => {
    setSortOption(value);
    setCurrentPage(1);
  };

  // Xuất tiến độ ra PDF bằng jsPDF
  const handleExportPdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Báo cáo tiến độ chương trình", 14, 20);

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
        doc.text(`Giảng viên: ${p.tutor}`, 18, y);
        y += 5;
        doc.text(`Trạng thái: ${p.status === "active" ? "Đang học" : "Đã hoàn thành"}`, 18, y);
        y += 5;
        doc.text(`Tiến độ: ${String(p.progress)}%`, 18, y);
        y += 8;
      });
    }

    doc.save("tien-do-chuong-trinh.pdf");
  };

  // Panel gợi ý 3 khóa
  const handleToggleSuggest = () => {
    setShowSuggest((prev) => !prev);
  };

  const handleRegisterSuggestedProgram = (program: Program) => {
    setProgramList((prev) => {
      if (prev.some((p) => p.id === program.id)) {
        alert("Bạn đã đăng ký chương trình này rồi.");
        return prev;
      }
      alert(`Đã đăng ký: ${program.title}`);
      return [...prev, program];
    });
    setShowSuggest(false);
  };

  // Chuyển đến trang chi tiết
  const handleViewDetail = (program: Program) => {
    void navigate(path.studentProgramDetailView.replace(":programId", String(program.id)));
  };

  // Mở preview tài liệu / chứng chỉ
  const openPreviewDoc = (title: string, pdfUrl?: string) => {
    setPreviewDoc({ title, pdfUrl });
  };

  const handlePreviewMaterial = (program: Program) => {
    openPreviewDoc(`Tài liệu: ${program.title}`, program.materialUrl);
  };

  const handlePreviewCertificate = (program: Program) => {
    openPreviewDoc(`Chứng chỉ: ${program.title}`, program.certificateUrl ?? DEFAULT_PDF);
  };

  // Tải file ngay từ block preview
  const handleDownloadPreview = () => {
    if (!previewDoc) return;
    const pdfUrl = previewDoc.pdfUrl ?? DEFAULT_PDF;

    if (typeof document === "undefined") return;

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='min-h-screen w-full bg-slate-50'>
      <div className='container pt-10 pb-20'>
        {/* HEADER */}
        <div className='rounded-xl border bg-white p-6 shadow-sm'>
          {/* Title + actions */}
          <div className='mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            <div>
              <h1 className='text-2xl font-semibold text-slate-900'>Chương trình của tôi</h1>
              <p className='mt-2 text-sm text-slate-500'>
                Quản lý các chương trình đã đăng ký và theo dõi tiến độ học tập
              </p>
            </div>

            <div className='flex gap-3'>
              <button
                className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
                onClick={handleToggleSuggest}
              >
                <Plus size={18} />
                Đăng ký chương trình khác
              </button>
              <button
                className='flex items-center gap-2 rounded-lg border bg-white px-4 py-2 hover:bg-slate-100'
                onClick={handleExportPdf}
              >
                <Download size={18} />
                Xuất tiến độ (PDF)
              </button>
            </div>
          </div>

          {/* Search + filters */}
          <div className='flex flex-col items-stretch gap-4 md:flex-row md:items-center'>
            <input
              type='text'
              placeholder='Tìm kiếm chương trình (tên, giảng viên, mô tả)...'
              className='flex-1 rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/60 focus:outline-none'
              value={search}
              aria-label='Tìm kiếm chương trình'
              onChange={(e) => {
                handleSearchChange(e.target.value);
              }}
            />

            <select
              className='rounded-lg border bg-white px-4 py-2 text-sm'
              value={statusFilter}
              aria-label='Lọc theo trạng thái'
              onChange={(e) => {
                handleStatusChange(e.target.value as "all" | "active" | "done");
              }}
            >
              <option value='all'>Tất cả trạng thái</option>
              <option value='active'>Đang hoạt động</option>
              <option value='done'>Đã hoàn thành</option>
            </select>

            <select
              className='rounded-lg border bg-white px-4 py-2 text-sm'
              value={subjectFilter}
              aria-label='Lọc theo môn học'
              onChange={(e) => {
                handleSubjectChange(e.target.value);
              }}
            >
              <option value='all'>Tất cả môn học</option>
              {subjectOptions.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>

            <select
              className='rounded-lg border bg-white px-4 py-2 text-sm'
              value={sortOption}
              aria-label='Sắp xếp'
              onChange={(e) => {
                handleSortChange(e.target.value as "newest" | "oldest");
              }}
            >
              <option value='newest'>Sắp xếp: Mới nhất</option>
              <option value='oldest'>Sắp xếp: Cũ nhất</option>
            </select>
          </div>
        </div>

        {/* SUGGESTED PROGRAMS */}
        {showSuggest && (
          <div className='mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4'>
            <div className='mb-3 flex items-center justify-between'>
              <p className='mb-3 text-sm font-medium text-slate-800'>
                Chọn một trong các chương trình được đề xuất để đăng ký
              </p>
              <button
                className='text-xs text-slate-500 hover:text-slate-800'
                onClick={() => {
                  setShowSuggest(false);
                }}
              >
                Đóng
              </button>
            </div>
            <div className='grid gap-4 md:grid-cols-3'>
              {suggestedPrograms.map((p) => {
                const already = programList.some((x) => x.id === p.id);
                return (
                  <div
                    key={p.id}
                    className={`flex flex-col justify-between rounded-lg border bg-white p-4 ${
                      already ? "opacity-60" : ""
                    }`}
                  >
                    <div>
                      <p className='text-sm font-semibold text-slate-900'>{p.title}</p>
                      <p className='mt-1 text-xs text-slate-500'>{p.tutor}</p>
                      <p className='mt-2 text-xs text-slate-600'>{p.desc}</p>
                    </div>
                    <button
                      className='mt-4 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300'
                      disabled={already}
                      onClick={() => {
                        handleRegisterSuggestedProgram(p);
                      }}
                    >
                      {already ? "Đã đăng ký" : "Đăng ký khóa này"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STATS */}
        <div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3'>
          <div className='flex items-center gap-4 rounded-xl border bg-white p-6 shadow-sm'>
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-100'>
              <BookOpen className='h-6 w-6 text-blue-600' />
            </div>
            <div>
              <p className='text-3xl font-bold text-blue-600'>{programList.length}</p>
              <p className='mt-1 text-sm text-slate-500'>Tổng chương trình</p>
            </div>
          </div>

          <div className='flex items-center gap-4 rounded-xl border bg-white p-6 shadow-sm'>
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>
              <Play className='h-6 w-6 text-green-600' />
            </div>
            <div>
              <p className='text-3xl font-bold text-green-600'>
                {programList.filter((p) => p.status === "active").length}
              </p>
              <p className='mt-1 text-sm text-slate-500'>Đang hoạt động</p>
            </div>
          </div>

          <div className='flex items-center gap-4 rounded-xl border bg-white p-6 shadow-sm'>
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-purple-100'>
              <CheckCircle className='h-6 w-6 text-purple-600' />
            </div>
            <div>
              <p className='text-3xl font-bold text-purple-600'>
                {programList.filter((p) => p.status === "done").length}
              </p>
              <p className='mt-1 text-sm text-slate-500'>Đã hoàn thành</p>
            </div>
          </div>
        </div>

        {/* PROGRAM LIST */}
        <div className='mt-10 space-y-5'>
          {currentPrograms.length === 0 ? (
            <p className='text-sm text-slate-500'>Không tìm thấy chương trình phù hợp với bộ lọc hiện tại.</p>
          ) : (
            currentPrograms.map((p) => (
              <div key={p.id} className='rounded-xl border bg-white p-6 shadow-sm'>
                <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
                  {/* LEFT: icon + info */}
                  <div className='flex gap-4'>
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full border ${
                        p.color === "bg-blue-500" ? "border-blue-200 bg-blue-50" : ""
                      } ${p.color === "bg-purple-500" ? "border-purple-200 bg-purple-50" : ""} ${
                        p.color === "bg-green-500" ? "border-green-200 bg-green-50" : ""
                      } ${p.color === "bg-red-500" ? "border-red-200 bg-red-50" : ""} `}
                    >
                      <span className='text-xl'>{p.icon}</span>
                    </div>

                    <div>
                      <h2 className='text-lg font-semibold text-slate-900'>{p.title}</h2>

                      <p className='mt-1 text-xs'>
                        <span className='rounded-md bg-green-100 px-2 py-0.5 text-green-600 capitalize'>
                          {p.status === "active" ? "Đang học" : "Đã hoàn thành"}
                        </span>
                      </p>

                      <p className='mt-1 text-sm font-medium text-slate-500'>{p.tutor}</p>

                      <p className='mt-2 text-sm text-slate-600'>{p.desc}</p>
                    </div>
                  </div>

                  {/* RIGHT: buttons */}
                  {p.progress === 100 ? (
                    // Khóa đã hoàn thành 100%: chỉ xem chứng chỉ + xem tài liệu
                    <div className='flex flex-wrap justify-end gap-3'>
                      <button
                        className='rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700'
                        onClick={() => {
                          handlePreviewCertificate(p);
                        }}
                      >
                        Xem chứng chỉ
                      </button>
                      <button
                        className='rounded-lg border bg-white px-4 py-2 text-sm hover:bg-slate-100'
                        onClick={() => {
                          handlePreviewMaterial(p);
                        }}
                      >
                        Xem tài liệu
                      </button>
                    </div>
                  ) : (
                    // Khóa chưa 100%: xem chi tiết + xem tài liệu
                    <div className='flex flex-wrap justify-end gap-3'>
                      <button
                        className='rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700'
                        onClick={() => {
                          handleViewDetail(p);
                        }}
                      >
                        Xem chi tiết
                      </button>
                    </div>
                  )}
                </div>

                {/* INFO ROW */}
                <div className='mt-4 flex flex-wrap items-center gap-6 text-sm text-slate-600'>
                  <div className='flex items-center gap-2'>
                    <span>📅</span>
                    <p>{p.start}</p>
                  </div>

                  {p.session && (
                    <div className='flex items-center gap-2'>
                      <span>⏱</span>
                      <p>{p.session}</p>
                    </div>
                  )}

                  <div className='flex items-center gap-2'>
                    <span>🔥</span>
                    <p>Tiến độ: {p.progress}%</p>
                  </div>
                </div>

                {/* PROGRESS BAR */}
                <div className='mt-3 h-2 w-full rounded-full bg-slate-200'>
                  <div className={`h-full rounded-full ${p.color}`} style={{ width: `${String(p.progress)}%` }}></div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* PAGINATION */}
        {totalItems > 0 && (
          <div className='mt-10 flex flex-col items-center justify-between gap-4 text-sm md:flex-row'>
            <p className='text-slate-600'>
              Hiển thị {startItem} đến {endItem} trong {totalItems} chương trình
            </p>

            <div className='flex gap-2'>
              <button
                className='rounded-lg border bg-white px-3 py-1 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50'
                onClick={handlePrevPage}
                disabled={effectiveCurrentPage === 1}
              >
                Trước
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => {
                    handleChangePage(pageNum);
                  }}
                  className={`rounded-lg border px-3 py-1 text-sm ${
                    pageNum === effectiveCurrentPage
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "bg-white hover:bg-slate-100"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                className='rounded-lg border bg-white px-3 py-1 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50'
                onClick={handleNextPage}
                disabled={effectiveCurrentPage === totalPages}
              >
                Sau
              </button>
            </div>
          </div>
        )}

        {/* PREVIEW PDF */}
        {previewDoc && (
          <div className='mt-10 mb-8 rounded-xl border bg-white p-4 shadow-sm'>
            <div className='mb-3 flex items-center justify-between'>
              <div>
                <p className='text-xs text-slate-500'>Đang xem trước tài liệu</p>
                <h3 className='text-sm font-semibold'>{previewDoc.title}</h3>
              </div>
              <div className='flex items-center gap-2'>
                <button
                  onClick={handleDownloadPreview}
                  className='rounded-lg border px-3 py-1 text-xs hover:bg-slate-100'
                >
                  Tải xuống PDF
                </button>
                <button
                  onClick={() => {
                    setPreviewDoc(null);
                  }}
                  className='rounded-lg border px-3 py-1 text-xs hover:bg-slate-100'
                >
                  Đóng
                </button>
              </div>
            </div>

            <div className='h-[480px] w-full overflow-hidden rounded-lg border'>
              <iframe src={previewDoc.pdfUrl ?? DEFAULT_PDF} title={previewDoc.title} className='h-full w-full' />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramList;
