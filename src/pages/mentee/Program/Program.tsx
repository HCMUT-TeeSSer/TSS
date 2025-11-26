import { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import {
  Search,
  Grid3x3,
  List,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Star,
  Dna,
  Bot,
  Settings,
  Globe,
  FlaskConical,
} from "lucide-react";
import { programs } from "@/data/programs";

export default function Program() {
  const getDepartmentStyle = (dept: string) => {
    switch (dept) {
      case "Sinh học":
      case "Y học":
        return {
          bg: "bg-[#FF6B6B]",
          text: "text-[#FF6B6B]",
          bgLight: "bg-[#FFE8E8]",
          icon: <Dna size={48} color='white' />,
        }; // Màu Đỏ Cam
      case "Khoa học máy tính":
      case "Công nghệ":
        return {
          bg: "bg-[#9B72F5]",
          text: "text-[#9B72F5]",
          bgLight: "bg-[#F0E8FF]",
          icon: <Bot size={48} color='white' />,
        }; // Màu Tím
      case "Kỹ thuật":
      case "Vật lý":
        return {
          bg: "bg-[#EAB308]",
          text: "text-[#EAB308]",
          bgLight: "bg-[#FEF9C3]",
          icon: <Settings size={48} color='white' />,
        }; // Màu Vàng
      case "Hóa học":
        return {
          bg: "bg-[#2DD4BF]",
          text: "text-[#2DD4BF]",
          bgLight: "bg-[#CCFBF1]",
          icon: <FlaskConical size={48} color='white' />,
        }; // Màu Teal
      default:
        return {
          bg: "bg-[#3B82F6]",
          text: "text-[#3B82F6]",
          bgLight: "bg-[#DBEAFE]",
          icon: <Globe size={48} color='white' />,
        }; // Màu Xanh
    }
  };
  // --- STATE QUẢN LÝ BỘ LỌC ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("Tất cả khoa");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Tất cả mức độ");
  const [selectedDuration, setSelectedDuration] = useState("Mọi thời lượng");
  const [selectedLearningFormat, setSelectedLearningFormat] = useState("Tất cả hình thức");
  const [selectedTutorCount, setSelectedTutorCount] = useState("Tất cả");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // --- DỮ LIỆU CỐ ĐỊNH CHO BỘ LỌC ---
  const departments = [
    "Tất cả khoa",
    "Khoa học máy tính",
    "Toán học",
    "Vật lý",
    "Hóa học",
    "Sinh học",
    "Kỹ thuật",
    "Ngôn ngữ",
  ];
  const difficulties = ["Tất cả mức độ", "Cơ bản", "Trung bình", "Nâng cao"];
  const durations = ["Mọi thời lượng", "8 tuần", "10 tuần", "12 tuần", "14 tuần", "16 tuần"];
  const learningFormats = ["Tất cả hình thức", "Trực tiếp", "Trực tuyến", "Kết hợp"];
  const tutorCounts = ["Tất cả", "1 gia sư", "2-5 gia sư", "> 5 gia sư"];

  const itemsPerPage = 9;

  const filteredPrograms = programs.filter((program) => {
    // Tìm kiếm
    const matchesSearch =
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.department.toLowerCase().includes(searchQuery.toLowerCase());

    // Lọc theo Khoa (Department)
    const matchesDepartment = selectedDepartment === "Tất cả khoa" || program.department === selectedDepartment;

    // Lọc theo Mức độ (Difficulty)
    const matchesDifficulty = selectedDifficulty === "Tất cả mức độ" || program.difficulty === selectedDifficulty;

    // Lọc theo Thời lượng (Duration)
    const matchesDuration = selectedDuration === "Mọi thời lượng" || program.duration === selectedDuration;
    // Lọc theo Hình thức (Format)
    const matchesFormat =
      selectedLearningFormat === "Tất cả hình thức" || program.learningFormat === selectedLearningFormat;

    return matchesSearch && matchesDepartment && matchesDifficulty && matchesDuration && matchesFormat;
  });

  // --- PHÂN TRANG ---
  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPrograms = filteredPrograms.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    // Giả lập loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/*HERO SECTION */}
      <div className='bg-linear-to-br from-indigo-500 to-purple-600 py-12'>
        <div className='container mx-auto px-4'>
          <h1 className='mb-4 text-center text-4xl font-bold text-gray-200'>Tìm Gia Sư Hoàn Hảo</h1>
          <p className='mb-8 text-center text-lg text-blue-100'>
            Kết nối với các gia sư chuyên nghiệp và tăng tốc hành trình học tập
          </p>

          {/* Search Bar */}
          <div className='mx-auto mb-12 max-w-3xl'>
            <div className='relative'>
              <Search className='absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400' />
              <input
                type='text'
                placeholder='Tìm kiếm gia sư, chương trình...'
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                className='w-full rounded-full border border-white/20 bg-white/10 px-12 py-3.5 text-white placeholder-blue-200 backdrop-blur-sm focus:border-white/40 focus:ring-2 focus:ring-white/20 focus:outline-none'
              />
              <button
                onClick={handleSearch}
                className='absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white px-6 py-2 font-medium text-blue-600 transition-colors hover:bg-gray-50'
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className='container mx-auto px-4 py-8'>
        {/* BỘ LỌC (FILTER SECTION)*/}
        <div className='mb-8'>
          {/* Hàng 1: Label "Lọc theo" + Danh sách Khoa + Sort + ViewMode */}
          <div className='mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
            <div className='no-scrollbar flex flex-1 items-center gap-4 overflow-x-auto pb-2 lg:pb-0'>
              <span className='text-base font-bold whitespace-nowrap text-gray-800'>Lọc theo:</span>
              <div className='flex gap-2'>
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => {
                      setSelectedDepartment(dept);
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
                      selectedDepartment === dept
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            {/*Sort & View Mode */}
            <div className='flex shrink-0 items-center gap-3'>
              <div className='relative'>
                <select
                  aria-label='Sắp xếp'
                  className='cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-8 text-sm text-gray-700 transition-colors hover:border-gray-400 focus:border-blue-500 focus:outline-none'
                >
                  <option>Sắp xếp theo đánh giá</option>
                  <option>Mới nhất</option>
                  <option>Phổ biến nhất</option>
                </select>
                <ChevronDown className='pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-gray-400' />
              </div>

              <div className='flex rounded-lg border border-gray-200 bg-white p-1'>
                <button
                  onClick={() => {
                    setViewMode("grid");
                  }}
                  aria-label='Chế độ lưới'
                  className={`rounded p-1.5 transition-colors ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <Grid3x3 className='h-5 w-5' />
                </button>
                <button
                  onClick={() => {
                    setViewMode("list");
                  }}
                  aria-label='Chế độ danh sách'
                  className={`rounded p-1.5 transition-colors ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <List className='h-5 w-5' />
                </button>
              </div>
            </div>
          </div>

          {/* Hàng 2: Các Dropdown chi tiết (Mức độ, Thời lượng...) */}
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {/* Mức độ khó */}
            <div>
              <label className='mb-1.5 ml-1 block text-xs font-medium text-gray-500'>Mức độ khó</label>
              <div className='relative'>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => {
                    setSelectedDifficulty(e.target.value);
                  }}
                  aria-label='Mức độ khó'
                  className='w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                >
                  {difficulties.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                <ChevronDown className='pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400' />
              </div>
            </div>

            {/* Thời lượng */}
            <div>
              <label className='mb-1.5 ml-1 block text-xs font-medium text-gray-500'>Thời lượng</label>
              <div className='relative'>
                <select
                  value={selectedDuration}
                  onChange={(e) => {
                    setSelectedDuration(e.target.value);
                  }}
                  aria-label='Thời lượng'
                  className='w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                >
                  {durations.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <ChevronDown className='pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400' />
              </div>
            </div>

            {/* Số lượng gia sư */}
            <div>
              <label className='mb-1.5 ml-1 block text-xs font-medium text-gray-500'>Số lượng gia sư</label>
              <div className='relative'>
                <select
                  value={selectedTutorCount}
                  onChange={(e) => {
                    setSelectedTutorCount(e.target.value);
                  }}
                  aria-label='Số lượng gia sư'
                  className='w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                >
                  {tutorCounts.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown className='pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400' />
              </div>
            </div>

            {/* Hình thức học */}
            <div>
              <label className='mb-1.5 ml-1 block text-xs font-medium text-gray-500'>Hình thức học</label>
              <div className='relative'>
                <select
                  value={selectedLearningFormat}
                  onChange={(e) => {
                    setSelectedLearningFormat(e.target.value);
                  }}
                  aria-label='Hình thức học'
                  className='w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                >
                  {learningFormats.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
                <ChevronDown className='pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400' />
              </div>
            </div>
          </div>
        </div>

        {/* THÔNG TIN KẾT QUẢ */}
        <div className='mb-6 flex items-center justify-between border-b border-gray-100 pb-4'>
          <h2 className='text-xl font-bold text-gray-800'>Chương Trình Nổi Bật</h2>
          <p className='text-sm text-gray-500'>
            Hiển thị{" "}
            <span className='font-medium text-gray-900'>{filteredPrograms.length > 0 ? startIndex + 1 : 0}</span> -{" "}
            <span className='font-medium text-gray-900'>
              {Math.min(startIndex + itemsPerPage, filteredPrograms.length)}
            </span>{" "}
            trong tổng số <span className='font-medium text-gray-900'>{filteredPrograms.length}</span> kết quả
          </p>
        </div>

        {/* DANH SÁCH CHƯƠNG TRÌNH (GRID/LIST) */}
        {paginatedPrograms.length > 0 ? (
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-4"
            }
          >
            {paginatedPrograms.map((program) => {
              const style = getDepartmentStyle(program.department); // Lấy style động

              return (
                <div
                  key={program.id}
                  className='group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-xl'
                >
                  {/* HEADER MÀU */}
                  <div className={`${style.bg} flex h-48 items-center justify-center transition-colors`}>
                    <div className='transform transition-transform duration-300 group-hover:scale-110'>
                      {style.icon}
                    </div>
                  </div>

                  {/*  BODY CONTENT */}
                  <div className='flex flex-1 flex-col p-5'>
                    {/* Tags & Rating */}
                    <div className='mb-3 flex items-center justify-between'>
                      <span className={`rounded-full ${style.bgLight} ${style.text} px-3 py-1 text-xs font-bold`}>
                        {program.category || "Phổ biến"}
                      </span>
                      <div className='flex items-center gap-1 text-sm font-bold text-gray-700'>
                        <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                        <span>{program.rating}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className='mb-2 line-clamp-1 text-xl font-bold text-gray-900'>{program.title}</h3>

                    {/* Description */}
                    <p className='mb-4 line-clamp-2 text-sm text-gray-500'>{program.description}</p>

                    {/* Status Row (Có sẵn / Số lượng gia sư) */}
                    <div className='mt-auto mb-6 flex items-center justify-between text-sm'>
                      <span className='font-bold text-green-600'>Có sẵn</span>
                      <span className='text-gray-400'>15 gia sư có sẵn</span>
                    </div>

                    {/*  BUTTON FOOTER */}
                    <button
                      className={`w-full rounded-xl ${style.bg} py-3 text-sm font-bold text-white transition-opacity hover:opacity-90`}
                    >
                      Xem chi tiết chương trình
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className='rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center'>
            <div className='mx-auto mb-4 h-12 w-12 text-gray-300'>
              <Search className='h-full w-full' />
            </div>
            <h3 className='text-lg font-medium text-gray-900'>Không tìm thấy chương trình phù hợp</h3>
            <p className='mt-1 text-gray-500'>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDepartment("Tất cả khoa");
                setSelectedDifficulty("Tất cả mức độ");
                setSelectedDuration("Mọi thời lượng");
                setSelectedTutorCount("Tất cả");
                setSelectedLearningFormat("Tất cả hình thức");
              }}
              className='mt-4 rounded-full bg-blue-50 px-6 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100'
            >
              Xóa tất cả bộ lọc
            </button>
          </div>
        )}

        {/*PAGINATION*/}
        {totalPages > 1 && (
          <div className='mt-10 flex items-center justify-center gap-2'>
            <button
              onClick={() => {
                setCurrentPage((prev) => Math.max(1, prev - 1));
              }}
              disabled={currentPage === 1}
              aria-label='Trang trước'
              className='flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
            >
              <ChevronLeft className='h-5 w-5' />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                }}
                className={`h-10 w-10 rounded-lg border text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => {
                setCurrentPage((prev) => Math.min(totalPages, prev + 1));
              }}
              disabled={currentPage === totalPages}
              aria-label='Trang sau'
              className='flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
            >
              <ChevronRight className='h-5 w-5' />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
