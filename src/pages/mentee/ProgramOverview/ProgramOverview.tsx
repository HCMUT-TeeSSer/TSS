import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { programs } from "@/data/programs";
import { tutors } from "@/data/tutors";
import { ArrowLeft, Star, CheckCircle, Filter, ChevronDown } from "lucide-react";

const curriculum = [
  {
    id: 1,
    title: "Lập trình hướng đối tượng nâng cao",
    duration: "4 giờ",
    summary: "Lớp, kế thừa, đa hình, mẫu thiết kế.",
  },
  {
    id: 2,
    title: "Cấu trúc dữ liệu & Thuật toán",
    duration: "6 giờ",
    summary: "Thuật toán sắp xếp, tìm kiếm, tối ưu hoá.",
  },
  {
    id: 3,
    title: "Phát triển Web với Django",
    duration: "8 giờ",
    summary: "Xây dựng web, REST API, cơ sở dữ liệu.",
  },
  {
    id: 4,
    title: "Phân tích dữ liệu với Pandas",
    duration: "6 giờ",
    summary: "Tiền xử lý dữ liệu, trực quan hoá, phân tích thống kê.",
  },
  {
    id: 5,
    title: "Machine Learning cơ bản",
    duration: "8 giờ",
    summary: "Giới thiệu về ML, Scikit-learn, và các thuật toán cơ bản.",
  },
  {
    id: 6,
    title: "Dự án cuối khóa",
    duration: "10 giờ",
    summary: "Xây dựng ứng dụng thực tế tổng hợp kiến thức đã học.",
  },
];

const prerequisites = [
  "Kiến thức lập trình Python cơ bản",
  "Hiểu về biến, hàm và cấu trúc điều khiển",
  "Kiến thức dòng lệnh cơ bản",
];

const outcomes = [
  "Khai niệm OOP nâng cao và mẫu thiết kế",
  "Phát triển web với framework hiện đại",
  "Cơ bản về học máy và tối ưu hoá mã",
  "Kỹ thuật xử lý dữ liệu và trực quan hoá dữ liệu",
];

const extendedTutors = [
  {
    ...tutors[0],
    title: "Senior Python Developer",
    bio: "Tiến sĩ Khoa học Máy tính với hơn 8 năm kinh nghiệm phát triển Python. Chuyên về Django, data science và machine learning.",
    slots: "3/5 slot",
    schedule: ["Hôm nay 14h", "Hôm nay 16h", "Ngày mai 10h"],
    tags: ["Sẵn slot"],
    tagColor: "text-emerald-600",
    dotColor: "bg-emerald-500",
  },
  {
    ...tutors[1],
    title: "Giảng viên khoa KH-MT",
    bio: "Giáo sư đại học với hơn 12 năm kinh nghiệm giảng dạy. Chuyên gia về thuật toán, cấu trúc dữ liệu và nguyên lý kỹ thuật phần mềm.",
    slots: "4/5 slot",
    schedule: ["Hôm nay 19h", "Ngày mai 09h", "Ngày mai 14h"],
    tags: ["Slot trống còn ít"],
    tagColor: "text-amber-600",
    dotColor: "bg-amber-500",
  },
  {
    ...tutors[2],
    title: "Full-Stack Developer",
    bio: "Chuyên gia trong ngành với hơn 6 năm kinh nghiệm tại các công ty khởi nghiệp công nghệ. Chuyên về phát triển web, API và kỹ năng lập trình thực tế.",
    slots: "2/5 slot",
    schedule: ["Hôm nay 10h", "Hôm nay 13h", "Ngày mai 11h"],
    tags: ["Sẵn slot"],
    tagColor: "text-emerald-600",
    dotColor: "bg-emerald-500",
  },
  {
    ...tutors[3],
    title: "Chuyên gia Data Science",
    bio: "Tiến sĩ Thống kê với chuyên môn về Python để phân tích dữ liệu, học máy và tính toán khoa học. Cựu nhà khoa học dữ liệu của Google.",
    slots: "5/5 slot",
    schedule: ["Ngày mai 10h", "Ngày mai 15h"],
    tags: ["Đủ slot"],
    tagColor: "text-red-500",
    dotColor: "bg-red-500",
  },
];

type SortOption = "rating" | "availability" | "experience";

const ProgramOverview: React.FC = () => {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();
  const program = programs.find((p) => String(p.id) === programId);

  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<(typeof extendedTutors)[0] | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  if (!program) {
    return (
      <div className='min-h-screen bg-gray-50'>
        <div className='container mx-auto px-4 py-16 text-center'>
          <p className='text-lg font-medium text-gray-600'>Không tìm thấy chương trình.</p>
          <Link to='/mentee/programs' className='mt-4 inline-flex items-center gap-2 text-blue-600 hover:underline'>
            <ArrowLeft size={16} /> Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  const stats = [
    { value: "12", label: "Chương" },
    { value: "48", label: "Giờ học" },
    { value: program.difficulty, label: "Cấp độ" },
    { value: "Chứng chỉ", label: "Bao gồm" },
  ];

  const isTutorFull = (slots: string) => {
    return slots === "5/5 slot";
  };

  const getAvailableSlots = (slots: string) => {
    const match = /(\d+)\/(\d+)/.exec(slots);
    if (match) {
      const used = parseInt(match[1]);
      const total = parseInt(match[2]);
      return total - used;
    }
    return 0;
  };

  // Sort options
  const sortOptions = [
    { value: "rating" as SortOption, label: "Đánh giá cao nhất" },
    { value: "availability" as SortOption, label: "Slot còn nhiều nhất" },
    { value: "experience" as SortOption, label: "Kinh nghiệm" },
  ];

  const getSortLabel = () => {
    const option = sortOptions.find((opt) => opt.value === sortBy);
    return option ? option.label : "Sắp xếp";
  };

  const sortedTutors = [...extendedTutors].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "availability":
        return getAvailableSlots(b.slots) - getAvailableSlots(a.slots);
      case "experience":
        return b.totalMentee - a.totalMentee;
      default:
        return 0;
    }
  });

  const handleRequestTutor = (tutor: (typeof extendedTutors)[0]) => {
    setSelectedTutor(tutor);
    setShowRegistrationModal(true);
  };

  const handleConfirmRegistration = async () => {
    setIsRegistering(true);
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 1500);
    });

    setIsRegistering(false);
    setShowRegistrationModal(false);
    void navigate("/mentee/program-list", {
      state: {
        message: "Đăng ký chương trình thành công!",
        program: program,
        tutor: selectedTutor,
      },
    });
  };

  const handleCancelRegistration = () => {
    setShowRegistrationModal(false);
    setSelectedTutor(null);
  };

  return (
    <div className='min-h-screen bg-gray-50 pb-20 font-sans'>
      {/* Breadcrumb */}
      <div className='border-b border-gray-200 bg-white'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center gap-2 text-sm text-gray-500'>
            <Link to='/mentee/programs' className='hover:text-blue-600'>
              Chương trình
            </Link>
            <span className='text-gray-300'>/</span>
            <span>{program.department}</span>
            <span className='text-gray-300'>/</span>
            <span className='font-medium text-gray-900'>{program.title}</span>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='grid gap-8 lg:grid-cols-3'>
          {/* Main Content- Trai */}
          <div className='space-y-8 lg:col-span-2'>
            {/* Hero Section */}
            <section className='rounded-3xl bg-white p-8 shadow-sm'>
              <div className='flex items-center gap-3'>
                <span className='rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700'>
                  Chương trình nổi bật
                </span>
                <div className='flex items-center gap-1 text-sm font-medium text-gray-700'>
                  <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                  <span>{program.rating}</span>
                  <span className='text-gray-400'>({program.totalMentee} đánh giá)</span>
                </div>
              </div>

              <h1 className='mt-4 text-4xl font-bold text-gray-900'>{program.title}</h1>
              <p className='mt-4 text-lg leading-relaxed text-gray-600'>
                {program.description}
                <br />
                Chương trình toàn diện này được thiết kế cho sinh viên muốn nâng cao kỹ năng Python lên tầm cao mới và
                chuẩn bị cho các thử thách phát triển phần mềm thực tế.
              </p>

              {/* Stats */}
              <div className='mt-8 grid grid-cols-2 gap-4 md:grid-cols-4'>
                {stats.map((stat) => (
                  <div key={stat.label} className='rounded-2xl bg-gray-50 p-4 text-center'>
                    <p className='text-2xl font-bold text-gray-900'>{stat.value}</p>
                    <p className='text-xs font-medium text-gray-500'>{stat.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum Section */}
            <section className='rounded-3xl bg-white p-8 shadow-sm'>
              <div className='mb-6 flex items-center justify-between'>
                <div>
                  <p className='text-xs font-bold tracking-wider text-blue-600'>Chương trình giảng dạy</p>
                  <h2 className='mt-1 text-2xl font-bold text-gray-900'>Lộ trình 12 chương</h2>
                </div>
                <button className='text-sm font-medium text-blue-600 hover:underline'>Xem chương trình đầy đủ →</button>
              </div>

              <div className='space-y-4'>
                {curriculum.map((item, index) => (
                  <div
                    key={item.id}
                    className='flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition-colors hover:bg-gray-50 md:flex-row md:items-center'
                  >
                    <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-lg font-bold text-blue-600'>
                      {index + 1}
                    </div>
                    <div className='flex-1'>
                      <h3 className='font-bold text-gray-900'>{item.title}</h3>
                      <p className='text-sm text-gray-500'>{item.summary}</p>
                    </div>
                    <div className='shrink-0 text-sm font-medium text-gray-500'>{item.duration}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Prerequisites & Outcomes */}
            <section className='rounded-3xl bg-white p-8 shadow-sm'>
              <div className='grid gap-8 md:grid-cols-2'>
                <div>
                  <p className='text-xs font-bold tracking-wider text-emerald-600'>Yêu cầu tiên quyết</p>
                  <h3 className='mt-1 mb-4 text-xl font-bold text-gray-900'>Trước khi tham gia</h3>
                  <ul className='space-y-3'>
                    {prerequisites.map((item, idx) => (
                      <li key={idx} className='flex items-start gap-3'>
                        <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 fill-emerald-100 text-emerald-600' />
                        <span className='text-sm font-medium text-gray-700'>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className='text-xs font-bold tracking-wider text-blue-600'>Bạn sẽ học được gì</p>
                  <h3 className='mt-1 mb-4 text-xl font-bold text-gray-900'>Kết quả đạt được</h3>
                  <ul className='space-y-3'>
                    {outcomes.map((item, idx) => (
                      <li key={idx} className='flex items-start gap-3'>
                        <Star className='mt-0.5 h-5 w-5 shrink-0 fill-blue-100 text-blue-600' />
                        <span className='text-sm font-medium text-gray-700'>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar - Phai */}
          <div className='lg:col-span-1'>
            <div className='sticky top-8 space-y-6'>
              <div className='overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100'>
                <div className='flex flex-col items-center bg-white p-8 pb-0 text-center'>
                  <div className='mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 shadow-lg shadow-blue-200'>
                    <span className='text-3xl font-bold text-white'>&lt;/&gt;</span>
                  </div>
                  <h2 className='text-xl font-bold text-gray-900'>{program.title}</h2>
                  <div className='mt-2 flex items-center justify-center gap-1'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                    ))}
                    <span className='ml-1 text-sm font-medium text-gray-600'>
                      {program.rating} ({program.totalMentee} đánh giá)
                    </span>
                  </div>
                </div>

                <div className='p-6'>
                  <div className='space-y-4 rounded-2xl bg-gray-50 p-4'>
                    <div className='flex justify-between text-sm'>
                      <span className='text-gray-500'>Chương trình:</span>
                      <span className='font-semibold text-blue-600'>Chương trình học</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span className='text-gray-500'>Thời lượng:</span>
                      <span className='font-semibold text-gray-900'>{program.duration}</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span className='text-gray-500'>Tutor có sẵn:</span>
                      <span className='font-semibold text-emerald-600'>{program.availableTutors} tutor</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span className='text-gray-500'>Ngày bắt đầu:</span>
                      <span className='font-semibold text-gray-900'>Tùy chọn</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const tutorsSection = document.getElementById("tutors-section");
                      tutorsSection?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className='mt-6 w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300 active:scale-[0.98]'
                  >
                    Đăng ký chương trình
                  </button>

                  <div className='mt-4 text-center'>
                    <p className='text-xs text-gray-500'>Có câu hỏi về chương trình này?</p>
                    <button className='mt-1 text-xs font-semibold text-blue-600 hover:underline'>
                      Liên hệ cố vấn học thuật
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Tutors Section */}
        <div id='tutors-section' className='mt-16'>
          <div className='mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
            <div>
              <h2 className='text-2xl font-bold text-gray-900'>Tutor có sẵn</h2>
              <p className='mt-1 text-gray-500'>Chọn từ các Tutor Python programming của chúng tôi</p>
            </div>
            <div className='flex gap-3'>
              <div className='relative'>
                <button
                  onClick={() => {
                    setShowSortMenu(!showSortMenu);
                  }}
                  className='inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50'
                >
                  {getSortLabel()} <ChevronDown size={16} />
                </button>
                {showSortMenu && (
                  <div className='absolute right-0 z-10 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-lg'>
                    <div className='py-2'>
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setShowSortMenu(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                            sortBy === option.value ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button className='inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50'>
                <Filter size={16} /> Filters
              </button>
            </div>
          </div>

          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {sortedTutors.map((tutor) => {
              const isFullyBooked = isTutorFull(tutor.slots);

              return (
                <div
                  key={tutor.id}
                  className='group flex flex-col rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md'
                >
                  <div className='flex items-start gap-4'>
                    <div className='relative'>
                      <img
                        src={tutor.avatarUrl}
                        alt={tutor.name}
                        className='h-16 w-16 rounded-full object-cover ring-4 ring-gray-50'
                      />
                      <div className='absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm'>
                        <div className={`h-3 w-3 rounded-full ${tutor.dotColor}`} />
                      </div>
                    </div>
                    <div>
                      <h3 className='font-bold text-gray-900 transition-colors group-hover:text-blue-600'>
                        {tutor.name}
                      </h3>
                      <p className='text-xs font-medium text-gray-500'>{tutor.title}</p>
                      <div className='mt-1.5 flex items-center gap-1 text-xs font-medium'>
                        <Star className='h-3.5 w-3.5 fill-yellow-400 text-yellow-400' />
                        <span className='text-gray-900'>{tutor.rating}</span>
                        <span className='text-gray-400'>({tutor.totalMentee})</span>
                      </div>
                    </div>
                  </div>

                  <p className='mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600'>{tutor.bio}</p>

                  <div className='mt-5 flex items-center justify-between border-t border-gray-50 pt-4 text-sm'>
                    <div className={`flex items-center gap-2 ${tutor.tagColor}`}>
                      <div className={`h-2 w-2 rounded-full ${tutor.dotColor}`} />
                      <span className='font-semibold'>{tutor.tags[0]}</span>
                    </div>
                    <span className='font-bold text-blue-600'>{tutor.slots}</span>
                  </div>

                  <div className='mt-4 space-y-2.5'>
                    <p className='text-xs font-semibold tracking-wide text-gray-400'>Khung giờ rảnh có sẵn:</p>
                    <div className='flex flex-wrap gap-2'>
                      {tutor.schedule.map((time, idx) => (
                        <span
                          key={idx}
                          className='rounded-lg bg-gray-50 px-2.5 py-1.5 text-xs font-medium text-gray-600'
                        >
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (!isFullyBooked) handleRequestTutor(tutor);
                    }}
                    disabled={isFullyBooked}
                    className={`mt-6 w-full rounded-xl py-3 text-sm font-bold transition-colors ${
                      isFullyBooked
                        ? "cursor-not-allowed bg-gray-100 text-gray-400"
                        : "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"
                    }`}
                  >
                    {isFullyBooked ? "Đã đủ slot" : "Yêu cầu Tutor"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Box xac nhan dang ky */}
      {showRegistrationModal && selectedTutor && (
        <div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4'>
          <div className='w-full max-w-2xl rounded-3xl bg-white shadow-2xl'>
            {/* Modal Header */}
            <div className='border-b border-gray-100 p-6'>
              <h2 className='text-2xl font-bold text-gray-900'>Xác nhận đăng ký chương trình</h2>
              <p className='mt-1 text-sm text-gray-500'>Vui lòng kiểm tra thông tin trước khi xác nhận</p>
            </div>

            {/* Modal Content */}
            <div className='p-6'>
              {/* Thong tin Program */}
              <div className='mb-6 rounded-2xl bg-blue-50 p-5'>
                <p className='mb-2 text-xs font-semibold tracking-wide text-blue-600 uppercase'>Chương trình</p>
                <h3 className='text-xl font-bold text-gray-900'>{program.title}</h3>
                <div className='mt-3 flex flex-wrap gap-4 text-sm'>
                  <div className='flex items-center gap-2'>
                    <span className='text-gray-500'>Thời lượng:</span>
                    <span className='font-semibold text-gray-900'>{program.duration}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-gray-500'>Cấp độ:</span>
                    <span className='font-semibold text-gray-900'>{program.difficulty}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                    <span className='font-semibold text-gray-900'>{program.rating}</span>
                  </div>
                </div>
              </div>

              {/* Tutor Info */}
              <div className='rounded-2xl bg-gray-50 p-5'>
                <p className='mb-3 text-xs font-semibold tracking-wide text-gray-600 uppercase'>Tutor được chọn</p>
                <div className='flex items-start gap-4'>
                  <img
                    src={selectedTutor.avatarUrl}
                    alt={selectedTutor.name}
                    className='h-16 w-16 rounded-full object-cover ring-4 ring-white'
                  />
                  <div className='flex-1'>
                    <h4 className='text-lg font-bold text-gray-900'>{selectedTutor.name}</h4>
                    <p className='text-sm text-gray-600'>{selectedTutor.title}</p>
                    <div className='mt-2 flex items-center gap-4 text-sm'>
                      <div className='flex items-center gap-1'>
                        <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                        <span className='font-semibold text-gray-900'>{selectedTutor.rating}</span>
                        <span className='text-gray-500'>({selectedTutor.totalMentee})</span>
                      </div>
                      <div className={`flex items-center gap-1 ${selectedTutor.tagColor}`}>
                        <div className={`h-2 w-2 rounded-full ${selectedTutor.dotColor}`} />
                        <span className='font-semibold'>{selectedTutor.tags[0]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Notice */}
              <div className='mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4'>
                <p className='text-sm text-blue-800'>
                  <span className='font-semibold'>Lưu ý:</span> Sau khi xác nhận, bạn sẽ được đăng ký vào chương trình
                  với tutor đã chọn.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className='flex gap-3 border-t border-gray-100 p-6'>
              <button
                onClick={handleCancelRegistration}
                disabled={isRegistering}
                className='flex-1 rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  void handleConfirmRegistration();
                }}
                disabled={isRegistering}
                className='flex-1 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50'
              >
                {isRegistering ? (
                  <span className='flex items-center justify-center gap-2'>
                    <svg className='h-5 w-5 animate-spin' viewBox='0 0 24 24'>
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                        fill='none'
                      />
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      />
                    </svg>
                    Đang xử lý...
                  </span>
                ) : (
                  "Xác nhận đăng ký"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramOverview;
