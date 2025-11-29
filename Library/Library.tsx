import React, { useState } from "react";
import { FiDownload, FiEye, FiPlay, FiShare2, FiClock } from "react-icons/fi";
import { Cpu, Cog, Zap, FlaskConical, Ruler, Sigma } from "lucide-react";
import libraryData from "@/data/library.json";

interface DocumentItem {
  id: number;
  tag: string;
  tagColor: string;
  title: string;
  author: string;
  desc: string;
  views: string;
  downloads: string | null;
  update: string;
  duration?: string;

  faculty: string;   // Khoa/Ngành
  docType: string;   // Loại tài liệu
  language: string;  // Ngôn ngữ
  year: number;      // Năm xuất bản

  meetLink?: string | null;
  pdfUrl?: string | null;
  youtubeUrl?: string | null;
}

const docs = libraryData.docs as DocumentItem[];
const PAGE_SIZE = 6;

// fallback demo nếu doc không có link riêng
const DEFAULT_MEET = "https://meet.google.com/abc-defg-hij";
const DEFAULT_PDF = "/files/main.pdf";
const DEFAULT_YOUTUBE = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

const getFacebookShareUrl = (url: string) =>
  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

/** Màu cho ô chữ tag */
const getTagChipClass = (tag: string) => {
  switch (tag) {
    case "Sách giáo khoa":
      return "bg-red-50 text-red-600 border border-red-200";
    case "Bài báo":
      return "bg-green-50 text-green-700 border border-green-200";
    case "Video":
      return "bg-purple-50 text-purple-700 border border-purple-200";
    case "Luận văn":
      return "bg-yellow-50 text-yellow-700 border border-yellow-200";
    case "Tài liệu tham khảo":
      return "bg-blue-50 text-blue-700 border border-blue-200";
    case "Video bài giảng":
      return "bg-pink-50 text-pink-700 border border-pink-200";
    default:
      return "bg-slate-50 text-slate-700 border border-slate-200";
  }
};

const Library: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [chipFilter, setChipFilter] = useState<string>("Tất cả"); // thanh "Lọc theo" trên
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);

  // dropdown filters
  const [facultyFilter, setFacultyFilter] = useState<string>("Tất cả khoa");
  const [docTypeFilter, setDocTypeFilter] = useState<string>("Tất cả loại");
  const [languageFilter, setLanguageFilter] = useState<string>("Tất cả ngôn ngữ");
  const [yearFilter, setYearFilter] = useState<string>("Tất cả năm");

  // trang hiện tại
  const [currentPage, setCurrentPage] = useState<number>(1);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  // build options từ dữ liệu
  const facultyOptions = [
    "Tất cả khoa",
    ...Array.from(new Set(docs.map((d) => d.faculty))).sort(),
  ];

  const docTypeOptions = [
    "Tất cả loại",
    ...Array.from(new Set(docs.map((d) => d.docType))).sort(),
  ];

  const languageOptions = [
    "Tất cả ngôn ngữ",
    ...Array.from(new Set(docs.map((d) => d.language))).sort(),
  ];

  const yearOptions = [
    "Tất cả năm",
    ...Array.from(new Set(docs.map((d) => d.year)))
      .sort((a, b) => b - a)
      .map((y) => y.toString()),
  ];

  const typeFilters = [
    { icon: "✨", label: "Tất cả" },
    { icon: "📘", label: "Sách giáo khoa" },
    { icon: "📰", label: "Bài báo" },
    { icon: "🎓", label: "Luận văn" },
    { icon: "📚", label: "Tài liệu tham khảo" },
    { icon: "🎥", label: "Video" }, // gom Video + Video bài giảng
  ];

  const handleDownload = (doc: DocumentItem) => {
    const pdf = doc.pdfUrl || DEFAULT_PDF;
    const link = document.createElement("a");
    link.href = pdf;
    link.download = `${doc.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setPreviewDoc(doc);
  };

  const filteredDocs = docs.filter((doc) => {
    // 1. Lọc theo chipFilter (thanh filter trên)
    if (chipFilter !== "Tất cả") {
      if (chipFilter === "Video") {
        if (!(doc.tag === "Video" || doc.tag === "Video bài giảng")) {
          return false;
        }
      } else if (doc.tag !== chipFilter) {
        return false;
      }
    }

    // 2. Lọc dropdown: Khoa/Ngành
    if (facultyFilter !== "Tất cả khoa" && doc.faculty !== facultyFilter) {
      return false;
    }

    // 3. Lọc dropdown: Loại tài liệu
    if (docTypeFilter !== "Tất cả loại" && doc.docType !== docTypeFilter) {
      return false;
    }

    // 4. Lọc dropdown: Ngôn ngữ
    if (languageFilter !== "Tất cả ngôn ngữ" && doc.language !== languageFilter) {
      return false;
    }

    // 5. Lọc dropdown: Năm xuất bản
    if (yearFilter !== "Tất cả năm" && doc.year.toString() !== yearFilter) {
      return false;
    }

    // 6. Tìm kiếm
    if (!normalizedSearch) return true;

    const text = (
      doc.title +
      " " +
      doc.author +
      " " +
      doc.desc
    ).toLowerCase();

    return text.includes(normalizedSearch);
  });

  // ====== PAGINATION: mỗi trang 6 tài liệu ======
  const totalPages = Math.max(1, Math.ceil(filteredDocs.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const paginatedDocs = filteredDocs.slice(startIndex, endIndex);

  return (
    <div className="w-full min-h-screen bg-slate-50">
      {/* HEADER */}
      <div className="w-full bg-indigo-500 text-white py-12">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-4xl font-semibold tracking-wide">
            Thư viện Tài liệu HCMUT
          </h1>
          <p className="text-base opacity-90 mt-3 max-w-6xl mx-auto whitespace-nowrap">
            Truy cập hàng nghìn tài liệu học tập, sách giáo khoa và tài nguyên
            nghiên cứu từ Thư viện Đại học Bách Khoa TP HCM
          </p>

          {/* SEARCH BAR */}
          <div className="mt-6 flex w-full max-w-4xl mx-auto gap-4 justify-center">
            <input
              type="text"
              placeholder="Tìm kiếm tài liệu, sách..."
              className="flex-1 px-5 py-3.5 rounded-lg text-black border border-slate-200 text-base"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // đổi search thì quay về trang 1
              }}
            />
            <button
              className="px-7 py-3.5 bg-blue-600 rounded-lg hover:bg-blue-700 text-base font-medium"
              onClick={() => setSearchTerm((prev) => prev.trim())}
            >
              Tìm kiếm
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 w-full max-w-5xl mx-auto">
            {[
              ["25,847", "Tài liệu"],
              ["8,392", "Sinh viên sử dụng"],
              ["12,156", "Lượt tải xuống"],
              ["150+", "Chuyên ngành"],
            ].map(([value, label], i) => (
              <div
                key={i}
                className="bg-white/20 backdrop-blur-lg py-6 px-8 rounded-2xl text-center"
              >
                <p className="text-3xl font-bold">{value}</p>
                <p className="text-sm opacity-90 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BODY CONTENT */}
      <div className="container py-12">
        {/* FILTER BAR (chips) */}
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-600 mb-3">Lọc theo:</p>

          <div className="flex gap-3 flex-wrap items-center">
            {typeFilters.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setChipFilter(item.label);
                  setCurrentPage(1); // đổi filter thì quay về trang 1
                }}
                className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-xl transition ${
                  chipFilter === item.label
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </button>
            ))}

            {/* SORT – có thể gắn logic sau */}
            <select className="px-4 py-2 text-sm border rounded-xl h-[42px]">
              <option>Sắp xếp theo độ phổ biến</option>
              <option>Ngày cập nhật</option>
              <option>Lượt xem</option>
              <option>Lượt tải xuống</option>
            </select>

            {/* Grid view (mock) */}
            <button className="w-10 h-10 rounded-xl border flex items-center justify-center text-slate-600 hover:bg-slate-100">
              🔳
            </button>

            {/* List view (mock) */}
            <button className="w-10 h-10 rounded-xl border flex items-center justify-center text-slate-600 hover:bg-slate-100">
              📋
            </button>
          </div>
        </div>

        {/* SUB-FILTERS */}
        <div className="grid grid-cols-4 gap-4 mb-12">
          {/* Khoa/Ngành */}
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-slate-600">
              Khoa/Ngành
            </span>
            <select
              className="px-4 py-2 border rounded-lg bg-slate-50"
              value={facultyFilter}
              onChange={(e) => {
                setFacultyFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              {facultyOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Loại tài liệu */}
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-slate-600">
              Loại tài liệu
            </span>
            <select
              className="px-4 py-2 border rounded-lg bg-slate-50"
              value={docTypeFilter}
              onChange={(e) => {
                setDocTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              {docTypeOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Ngôn ngữ */}
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-slate-600">
              Ngôn ngữ
            </span>
            <select
              className="px-4 py-2 border rounded-lg bg-slate-50"
              value={languageFilter}
              onChange={(e) => {
                setLanguageFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              {languageOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Năm xuất bản */}
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-slate-600">
              Năm xuất bản
            </span>
            <select
              className="px-4 py-2 border rounded-lg bg-slate-50"
              value={yearFilter}
              onChange={(e) => {
                setYearFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              {yearOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* CATEGORIES (demo) */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-semibold">Danh mục phổ biến</h2>
          <p className="text-sm text-slate-500 mt-6">
            Khám phá tài liệu theo chuyên ngành
          </p>
        </div>

        <div className="grid grid-cols-6 gap-4 mb-16">
          {[
            {
              icon: <Cpu size={28} />,
              title: "Khoa học máy tính",
              count: "3,247 tài liệu",
            },
            { icon: <Cog size={28} />, title: "Cơ khí", count: "2,189 tài liệu" },
            {
              icon: <Zap size={28} />,
              title: "Điện - Điện tử",
              count: "1,955 tài liệu",
            },
            {
              icon: <FlaskConical size={28} />,
              title: "Hóa học",
              count: "1,534 tài liệu",
            },
            {
              icon: <Ruler size={28} />,
              title: "Vật lý",
              count: "1,298 tài liệu",
            },
            {
              icon: <Sigma size={28} />,
              title: "Toán học",
              count: "1,067 tài liệu",
            },
          ].map((c, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl border shadow-sm hover:shadow transition flex flex-col items-center"
            >
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-3">
                {c.icon}
              </div>
              <p className="font-semibold">{c.title}</p>
              <p className="text-sm text-slate-500">{c.count}</p>
            </div>
          ))}
        </div>

        {/* FEATURED DOCUMENTS TITLE */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-semibold">Tài liệu nổi bật</h2>
          <p className="text-sm text-slate-500 mt-6">
            Những tài liệu được truy cập nhiều nhất tuần này
          </p>
        </div>

        {/* PREVIEW PDF */}
        {previewDoc && (
          <div className="mb-8 bg-white border rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-slate-500">
                  Đang xem trước tài liệu
                </p>
                <h3 className="text-sm font-semibold">{previewDoc.title}</h3>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="text-xs px-3 py-1 border rounded-lg hover:bg-slate-100"
              >
                Đóng
              </button>
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

        {/* DOCUMENT CARDS */}
        <div className="grid grid-cols-3 gap-6">
          {paginatedDocs.map((d) => {
            const isVideo = d.tag === "Video" || d.tag === "Video bài giảng";
            const hasDownloads = !!d.downloads;

            const meet = d.meetLink || DEFAULT_MEET;
            const pdf = d.pdfUrl || DEFAULT_PDF;
            const youtube = d.youtubeUrl || DEFAULT_YOUTUBE;

            return (
              <div
                key={d.id}
                className="bg-white p-5 rounded-xl border shadow-sm hover:shadow transition"
              >
                {/* TAG */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`w-6 h-6 flex items-center justify-center text-sm rounded-md ${d.tagColor}`}
                  >
                    {d.tag === "Sách giáo khoa" && "📘"}
                    {d.tag === "Bài báo" && "📗"}
                    {d.tag === "Video" && "🎥"}
                    {d.tag === "Luận văn" && "📒"}
                    {d.tag === "Tài liệu tham khảo" && "📘"}
                    {d.tag === "Video bài giảng" && "🎞"}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getTagChipClass(
                      d.tag
                    )}`}
                  >
                    {d.tag}
                  </span>
                </div>

                {/* TITLE */}
                <h3 className="mt-3 font-semibold text-lg">{d.title}</h3>
                <p className="text-sm text-slate-500">{d.author}</p>

                <p className="text-xs text-slate-400 mt-1">
                  {d.faculty} · {d.docType} · {d.language} · {d.year}
                </p>

                <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                  {d.desc}
                </p>

                {/* METRICS */}
                {isVideo ? (
                  <div className="flex items-center justify-between mt-4 text-sm text-slate-500 min-h-[24px]">
                    <span className="flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      <span>{d.duration ?? "—"}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <FiEye className="w-4 h-4" />
                      <span>{d.views}</span>
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between mt-4 text-sm text-slate-500 min-h-[24px]">
                    <span className="flex items-center gap-1">
                      <FiDownload className="w-4 h-4" />
                      <span>{hasDownloads ? d.downloads : "—"}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <FiEye className="w-4 h-4" />
                      <span>{d.views}</span>
                    </span>
                  </div>
                )}

                <p className="text-xs text-slate-400 mt-2">
                  Cập nhật: {d.update}
                </p>

                {/* BUTTONS */}
                <div className="flex gap-3 mt-4">
                  {isVideo ? (
                    <>
                      {/* XEM VIDEO -> YouTube riêng */}
                      <a
                        href={youtube}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                      >
                        <FiPlay className="w-4 h-4" />
                        Xem video
                      </a>

                      {/* TẢI XUỐNG -> pdfUrl riêng + preview */}
                      <button
                        onClick={() => handleDownload(d)}
                        className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-slate-100"
                      >
                        <FiDownload className="w-4 h-4" />
                        Tải xuống
                      </button>

                      {/* CHIA SẺ -> Facebook (share youtube) */}
                      <a
                        href={getFacebookShareUrl(youtube)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-slate-100"
                      >
                        <FiShare2 className="w-4 h-4" />
                      </a>
                    </>
                  ) : (
                    <>
                      {/* XEM ONLINE -> Meet riêng */}
                      <a
                        href={meet}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                      >
                        <FiEye className="w-4 h-4" />
                        Xem online
                      </a>

                      {/* TẢI XUỐNG -> pdfUrl riêng + preview */}
                      <button
                        onClick={() => handleDownload(d)}
                        className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-slate-100"
                      >
                        <FiDownload className="w-4 h-4" />
                        Tải xuống
                      </button>

                      {/* CHIA SẺ -> Facebook (share meet) */}
                      <a
                        href={getFacebookShareUrl(meet)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-slate-100"
                      >
                        <FiShare2 className="w-4 h-4" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER / PAGINATION INFO */}
        <div className="flex justify-between items-center mt-12 text-sm">
          <p>
            {filteredDocs.length === 0
              ? "Không có tài liệu nào phù hợp"
              : `Hiển thị ${
                  startIndex + 1
                }–${Math.min(endIndex, filteredDocs.length)} / ${
                  filteredDocs.length
                } tài liệu`}
          </p>

          <div className="flex gap-2 items-center">
            {/* Nút Trước */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.max(1, prev - 1))
              }
              disabled={safeCurrentPage === 1}
              className="px-3 py-1 border rounded-lg bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Trước
            </button>

            {/* Các nút số trang: 1,2,3,...,last */}
            {(() => {
              const items: (number | "ellipsis")[] =
                totalPages <= 5
                  ? Array.from({ length: totalPages }, (_, i) => i + 1)
                  : [1, 2, 3, "ellipsis", totalPages]; // ví dụ: 1 2 3 ... 25

              return items.map((item, idx) => {
                if (item === "ellipsis") {
                  return (
                    <span
                      key={`ellipsis-${idx}`}
                      className="px-3 text-slate-500"
                    >
                      ...
                    </span>
                  );
                }

                const page = item;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded-lg ${
                      page === safeCurrentPage
                        ? "bg-blue-600 text-white"
                        : "bg-white"
                    }`}
                  >
                    {page}
                  </button>
                );
              });
            })()}

            {/* Nút Sau */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={safeCurrentPage === totalPages}
              className="px-3 py-1 border rounded-lg bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sau
            </button>
          </div>
        </div>
      </div> 
    </div>   
  );
};

export default Library;
