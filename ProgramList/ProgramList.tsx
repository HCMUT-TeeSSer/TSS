// src/pages/ProgramList.tsx

import React, { useState } from "react";
import programsData from "@/data/program.json";
import { BookOpen, Play, CheckCircle, Plus, Download } from "lucide-react";
import { jsPDF } from "jspdf";

interface Program {
  id: number;
  title: string;
  tutor: string;
  desc: string;
  start: string;
  session: string;
  progress: number;
  status: "active" | "done" | string;
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
  const [programList, setProgramList] = useState<Program[]>(
    programsData as Program[]
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "done">(
    "all"
  );
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [sortOption, setSortOption] = useState<"newest" | "oldest">("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const [showSuggest, setShowSuggest] = useState(false);

  // Preview PDF
  const [previewDoc, setPreviewDoc] = useState<PreviewDoc | null>(null);

  const itemsPerPage = 4;

  // Parse chuỗi ngày dạng "Bắt đầu: 15 tháng 3, 2024" / "Hoàn thành: 1 tháng 3, 2024"
  const parseDateFromStart = (startText: string): number => {
    const match = startText.match(
      /(\d{1,2})\s+tháng\s+(\d{1,2}),\s*(\d{4})/
    );
    if (!match) return 0;
    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);
    return new Date(year, month - 1, day).getTime();
  };

  const searchLower = search.toLowerCase().trim();

  // Dùng title làm "môn học"
  const subjectOptions = Array.from(
    new Set(programList.map((p) => p.title))
  );

  // FILTER
  const filteredPrograms = programList.filter((p) => {
    const matchesSearch =
      !searchLower ||
      p.title.toLowerCase().includes(searchLower) ||
      p.tutor.toLowerCase().includes(searchLower) ||
      p.desc.toLowerCase().includes(searchLower);

    const matchesStatus =
      statusFilter === "all" ? true : p.status === statusFilter;

    const matchesSubject =
      subjectFilter === "all" ? true : p.title === subjectFilter;

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
  const currentPrograms = sortedPrograms.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const startItem = totalItems === 0 ? 0 : startIndex + 1;
  const endItem =
    totalItems === 0 ? 0 : Math.min(startIndex + itemsPerPage, totalItems);

  const handlePrevPage = () =>
    setCurrentPage((prev) => Math.max(1, prev - 1));

  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  const handleChangePage = (page: number) => setCurrentPage(page);

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
        doc.text(`${index + 1}. ${p.title}`, 14, y);
        y += 6;
        doc.text(`Giảng viên: ${p.tutor}`, 18, y);
        y += 5;
        doc.text(
          `Trạng thái: ${
            p.status === "active" ? "Đang học" : "Đã hoàn thành"
          }`,
          18,
          y
        );
        y += 5;
        doc.text(`Tiến độ: ${p.progress}%`, 18, y);
        y += 8;
      });
    }

    doc.save("tien-do-chuong-trinh.pdf");
  };

  // Panel gợi ý 3 khóa
  const handleToggleSuggest = () => setShowSuggest((prev) => !prev);

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

  // Placeholder cho "Xem chi tiết"
  const handleViewDetail = (program: Program) => {
    alert(`Trang chi tiết cho "${program.title}" đang được phát triển.`);
  };

  // Mở preview tài liệu / chứng chỉ
  const openPreviewDoc = (title: string, pdfUrl?: string) => {
    setPreviewDoc({ title, pdfUrl });
  };

  const handlePreviewMaterial = (program: Program) => {
    openPreviewDoc(`Tài liệu: ${program.title}`, program.materialUrl);
  };

  const handlePreviewCertificate = (program: Program) => {
    openPreviewDoc(
      `Chứng chỉ: ${program.title}`,
      program.certificateUrl || DEFAULT_PDF
    );
  };

  // Tải file ngay từ block preview
  const handleDownloadPreview = () => {
    if (!previewDoc) return;
    const pdfUrl = previewDoc.pdfUrl || DEFAULT_PDF;

    if (typeof document === "undefined") return;

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <div className="container pt-10 pb-20">
        {/* HEADER */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          {/* Title + actions */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                Chương trình của tôi
              </h1>
              <p className="text-sm text-slate-500 mt-2">
                Quản lý các chương trình đã đăng ký và theo dõi tiến độ học tập
              </p>
            </div>

            <div className="flex gap-3">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleToggleSuggest}
              >
                <Plus size={18} />
                Đăng ký chương trình khác
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-slate-100 bg-white"
                onClick={handleExportPdf}
              >
                <Download size={18} />
                Xuất tiến độ (PDF)
              </button>
            </div>
          </div>

          {/* Search + filters */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <input
              type="text"
              placeholder="Tìm kiếm chương trình (tên, giảng viên, mô tả)..."
              className="flex-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />

            <select
              className="px-4 py-2 border rounded-lg text-sm bg-white"
              value={statusFilter}
              onChange={(e) =>
                handleStatusChange(e.target.value as "all" | "active" | "done")
              }
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="done">Đã hoàn thành</option>
            </select>

            <select
              className="px-4 py-2 border rounded-lg text-sm bg-white"
              value={subjectFilter}
              onChange={(e) => handleSubjectChange(e.target.value)}
            >
              <option value="all">Tất cả môn học</option>
              {subjectOptions.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-2 border rounded-lg text-sm bg-white"
              value={sortOption}
              onChange={(e) =>
                handleSortChange(e.target.value as "newest" | "oldest")
              }
            >
              <option value="newest">Sắp xếp: Mới nhất</option>
              <option value="oldest">Sắp xếp: Cũ nhất</option>
            </select>
          </div>
        </div>

        {/* SUGGESTED PROGRAMS */}
        {showSuggest && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-slate-800">
                Chọn một trong các chương trình được đề xuất để đăng ký
              </p>
              <button
                className="text-xs text-slate-500 hover:text-slate-800"
                onClick={() => setShowSuggest(false)}
              >
                Đóng
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {suggestedPrograms.map((p) => {
                const already = programList.some((x) => x.id === p.id);
                return (
                  <div
                    key={p.id}
                    className={`bg-white border rounded-lg p-4 flex flex-col justify-between ${
                      already ? "opacity-60" : ""
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {p.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {p.tutor}
                      </p>
                      <p className="text-xs text-slate-600 mt-2">
                        {p.desc}
                      </p>
                    </div>
                    <button
                      className="mt-4 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                      disabled={already}
                      onClick={() => handleRegisterSuggestedProgram(p)}
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
              <BookOpen className="text-blue-600 h-6 w-6" />
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">
                {programList.length}
              </p>
              <p className="text-sm text-slate-500 mt-1">Tổng chương trình</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
              <Play className="text-green-600 h-6 w-6" />
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">
                {programList.filter((p) => p.status === "active").length}
              </p>
              <p className="text-sm text-slate-500 mt-1">Đang hoạt động</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-purple-100">
              <CheckCircle className="text-purple-600 h-6 w-6" />
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">
                {programList.filter((p) => p.status === "done").length}
              </p>
              <p className="text-sm text-slate-500 mt-1">Đã hoàn thành</p>
            </div>
          </div>
        </div>

        {/* PROGRAM LIST */}
        <div className="mt-10 space-y-5">
          {currentPrograms.length === 0 ? (
            <p className="text-sm text-slate-500">
              Không tìm thấy chương trình phù hợp với bộ lọc hiện tại.
            </p>
          ) : (
            currentPrograms.map((p) => (
              <div
                key={p.id}
                className="bg-white p-6 rounded-xl border shadow-sm"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  {/* LEFT: icon + info */}
                  <div className="flex gap-4">
                    <div
                      className={`h-12 w-12 flex items-center justify-center rounded-full border 
                        ${
                          p.color === "bg-blue-500"
                            ? "bg-blue-50 border-blue-200"
                            : ""
                        }
                        ${
                          p.color === "bg-purple-500"
                            ? "bg-purple-50 border-purple-200"
                            : ""
                        }
                        ${
                          p.color === "bg-green-500"
                            ? "bg-green-50 border-green-200"
                            : ""
                        }
                        ${
                          p.color === "bg-red-500"
                            ? "bg-red-50 border-red-200"
                            : ""
                        }
                      `}
                    >
                      <span className="text-xl">{p.icon}</span>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">
                        {p.title}
                      </h2>

                      <p className="text-xs mt-1">
                        <span className="px-2 py-0.5 bg-green-100 text-green-600 rounded-md capitalize">
                          {p.status === "active"
                            ? "Đang học"
                            : p.status === "done"
                            ? "Đã hoàn thành"
                            : p.status}
                        </span>
                      </p>

                      <p className="text-sm text-slate-500 font-medium mt-1">
                        {p.tutor}
                      </p>

                      <p className="mt-2 text-sm text-slate-600">{p.desc}</p>
                    </div>
                  </div>

                  {/* RIGHT: buttons */}
                  {p.progress === 100 ? (
                    // Khóa đã hoàn thành 100%: chỉ xem chứng chỉ + xem tài liệu
                    <div className="flex flex-wrap gap-3 justify-end">
                      <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                        onClick={() => handlePreviewCertificate(p)}
                      >
                        Xem chứng chỉ
                      </button>
                      <button
                        className="px-4 py-2 border rounded-lg text-sm hover:bg-slate-100 bg-white"
                        onClick={() => handlePreviewMaterial(p)}
                      >
                        Xem tài liệu
                      </button>
                    </div>
                  ) : (
                    // Khóa chưa 100%: xem chi tiết + xem tài liệu
                    <div className="flex flex-wrap gap-3 justify-end">
                      <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                        onClick={() => handleViewDetail(p)}
                      >
                        Xem chi tiết
                      </button>
                    </div>
                  )}
                </div>

                {/* INFO ROW */}
                <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <p>{p.start}</p>
                  </div>

                  {p.session && (
                    <div className="flex items-center gap-2">
                      <span>⏱</span>
                      <p>{p.session}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <span>🔥</span>
                    <p>Tiến độ: {p.progress}%</p>
                  </div>
                </div>

                {/* PROGRESS BAR */}
                <div className="w-full h-2 bg-slate-200 rounded-full mt-3">
                  <div
                    className={`h-full rounded-full ${p.color}`}
                    style={{ width: `${p.progress}%` }}
                  ></div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* PAGINATION */}
        {totalItems > 0 && (
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-10 text-sm">
            <p className="text-slate-600">
              Hiển thị {startItem} đến {endItem} trong {totalItems} chương trình
            </p>

            <div className="flex gap-2">
              <button
                className="px-3 py-1 border rounded-lg bg-white hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handlePrevPage}
                disabled={effectiveCurrentPage === 1}
              >
                Trước
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handleChangePage(pageNum)}
                    className={`px-3 py-1 border rounded-lg text-sm ${
                      pageNum === effectiveCurrentPage
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:bg-slate-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}

              <button
                className="px-3 py-1 border rounded-lg bg-white hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div className="mt-10 mb-8 bg-white border rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-slate-500">
                  Đang xem trước tài liệu
                </p>
                <h3 className="text-sm font-semibold">{previewDoc.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadPreview}
                  className="text-xs px-3 py-1 border rounded-lg hover:bg-slate-100"
                >
                  Tải xuống PDF
                </button>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="text-xs px-3 py-1 border rounded-lg hover:bg-slate-100"
                >
                  Đóng
                </button>
              </div>
            </div>

            <div className="w-full h-[480px] border rounded-lg overflow-hidden">
              <iframe
                src={previewDoc.pdfUrl || DEFAULT_PDF}
                title={previewDoc.title}
                className="w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramList;
