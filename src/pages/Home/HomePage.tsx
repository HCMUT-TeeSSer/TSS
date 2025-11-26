import React, { useState } from "react";

// --- IMPORTS ẢNH TRỰC TIẾP ---
// Lưu ý: Vite sẽ tự động xử lý các file này khi build
import vector4 from "@/assets/images/vector4.png";
import vector5 from "@/assets/images/vector5.png";
import vector6 from "@/assets/images/vector6.png";
import vector7 from "@/assets/images/vector7.png";
import vector8 from "@/assets/images/vector8.png";
import vector9 from "@/assets/images/vector9.png";
import vector10 from "@/assets/images/vector10.png";
import imgMark from "@/assets/images/img.jpg";
import imgJessica from "@/assets/images/image.jpg";
import imgRyan from "@/assets/images/img-2.jpg";
import starIcon from "@/assets/images/vector3.png";
import iconCheck from "@/assets/images/vector.png";
import iconClock from "@/assets/images/vector2.png";
import iconRating from "@/assets/images/vector3.png";

// --- DATA HARD-CODED ---
const stats = [
  { value: "1,247", label: "Gia sư hoạt động" },
  { value: "15,832", label: "Học sinh đã hỗ trợ" },
  { value: "4.9/5", label: "Đánh giá trung bình" },
  { value: "50+", label: "Môn học có sẵn" },
];

const subjects = [
  { id: 1, name: "DSA", tutorCount: 247, bgColor: "bg-blue-100", icon: vector5, type: "bg" },
  { id: 2, name: "Giải tích", tutorCount: 189, bgColor: "bg-purple-100", icon: vector6, type: "bg" },
  { id: 3, name: "Vật lý 1", tutorCount: 156, bgColor: "bg-green-100", icon: vector7, type: "img" },
  { id: 4, name: "Hóa đại cương", tutorCount: 134, bgColor: "bg-yellow-100", icon: vector8, type: "bg" },
  { id: 5, name: "Hóa Sinh", tutorCount: 98, bgColor: "bg-red-100", icon: vector9, type: "bg" },
  { id: 6, name: "Vi xử lý", tutorCount: 112, bgColor: "bg-orange-100", icon: vector10, type: "img" },
];

const testimonials = [
  {
    id: 1,
    name: "Mark Stevens",
    role: "Sinh viên KHMT",
    avatar: imgMark,
    content:
      '"Cảm ơn thầy Duy đã giúp em hiểu bản chất của môn Mạng máy tính, thầy đã tổng hợp kiến thức cho final và cung cấp tài liệu hữu ích. Em đã đạt A+ cho kỳ này ạ"',
    rating: 5,
  },
  {
    id: 2,
    name: "Jessica Park",
    role: "Sinh viên QLCN",
    avatar: imgJessica,
    content:
      '"Môn QLSX siêu khó hiểu với em, mặc dù vậy, thầy Sơn và các bạn học chung luôn hướng dẫn và luyện đề cho em quen với các case-study, và em đạt điểm rất cao!!!"',
    rating: 5,
  },
  {
    id: 3,
    name: "Ryan Martinez",
    role: "Sinh viên CK",
    avatar: imgRyan,
    content:
      '"Cô Châu đã đồng hành cùng em từ những buổi học chuyên ngành cuối cùng và là một mentor tận tâm giúp em apply vị trí fresher của công ty V"',
    rating: 5,
  },
];

const howItWorks = [
  {
    number: "1",
    title: "Chọn chương trình và Tutor",
    description:
      "Duyệt danh sách đầy đủ các Tutor có trình độ, lọc theo môn học và đọc các đánh giá để tìm được người phù hợp nhất.",
  },
  {
    number: "2",
    title: "Đăng ký tham gia",
    description: "Tham gia buổi học theo lịch rảnh của bạn và đặt mục tiêu học tập.",
  },
  {
    number: "3",
    title: "Bắt đầu học thôi",
    description:
      "Bắt đầu hành trình học tập cá nhân của bạn với sự hướng dẫn của Tutor và theo dõi tiến trình của bạn trong suốt quá trình.",
  },
];

const ctaFeatures = [
  { text: "Đảm bảo hài lòng 100%", icon: iconCheck },
  { text: "Hỗ trợ 24/7", icon: iconClock },
  { text: "Đánh giá trung bình 4.9/5", icon: iconRating },
];

// --- COMPONENTS ---

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching:", searchQuery);
  };

  return (
    <section className='relative bg-gradient-to-r from-[#667eea] to-[#764ba2] py-20'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-4xl text-center'>
          <h1 className='mb-4 text-4xl font-bold text-white md:text-5xl'>Tìm Gia Sư Hoàn Hảo</h1>
          <p className='mb-8 text-xl text-blue-100'>
            Kết nối với các gia sư chuyên nghiệp trong mọi lĩnh vực và tăng tốc hành trình học tập của bạn
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className='relative mx-auto mb-12 max-w-2xl'>
            <div className='relative flex items-center rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-sm'>
              <div className='pl-4'>
                <img src={vector4} alt='Search' className='h-4 w-4 opacity-70' />
              </div>
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Tìm kiếm gia sư, chương trình...'
                className='w-full flex-1 bg-transparent px-4 py-3 text-white placeholder-blue-200 outline-none'
              />
              <button
                type='submit'
                className='rounded-full bg-white px-6 py-2.5 font-medium text-blue-600 transition-colors hover:bg-blue-50'
              >
                Tìm kiếm
              </button>
            </div>
          </form>

          {/* Stats Grid */}
          <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
            {stats.map((stat, index) => (
              <div key={index} className='rounded-xl bg-white/20 p-6 backdrop-blur-sm'>
                <div className='text-3xl font-bold text-white mb-1'>{stat.value}</div>
                <div className='text-sm text-blue-100'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SubjectsSection = () => {
  return (
    <section className='bg-white py-20'>
      <div className='container mx-auto px-4'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 text-3xl font-bold text-gray-900'>Duyệt theo Môn học</h2>
          <p className='text-lg text-gray-600'>Tìm gia sư chuyên môn trong lĩnh vực học tập của bạn</p>
        </div>

        <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6'>
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className='flex cursor-pointer flex-col items-center rounded-xl border border-gray-200 p-6 transition-shadow hover:shadow-lg'
            >
              <div
                className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${subject.bgColor}`}
              >
                <img
                  src={subject.icon}
                  alt={subject.name}
                  className={subject.type === "img" ? "h-full w-full object-contain p-1" : "h-6 w-6"}
                />
              </div>
              <h3 className='mb-1 text-center font-semibold text-gray-900'>{subject.name}</h3>
              <p className='text-sm text-gray-500'>{subject.tutorCount} gia sư</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: Math.floor(rating) }, (_, index) => (
      <img
        key={index}
        src={starIcon}
        alt='star'
        className='h-4 w-4 object-contain'
      />
    ));
  };

  return (
    <section className='bg-gray-50 py-20'>
      <div className='container mx-auto px-4'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 text-3xl font-bold text-gray-900'>Sinh viên nói gì về chương trình Tutor?</h2>
          <p className='text-lg text-gray-600'>
            Hãy xem những bạn Sinh viên Bách Khoa đã tiến bộ như thế nào sau chương trình
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {testimonials.map((item) => (
            <div key={item.id} className='flex flex-col rounded-xl bg-white p-8 shadow-sm'>
              <div className='mb-6 flex items-center gap-4'>
                <img
                  src={item.avatar}
                  alt={item.name}
                  className='h-12 w-12 rounded-full object-cover'
                />
                <div>
                  <div className='font-semibold text-gray-900'>{item.name}</div>
                  <div className='text-sm text-gray-500'>{item.role}</div>
                </div>
              </div>
              <p className='mb-6 flex-1 text-gray-700 italic'>{item.content}</p>
              <div className='flex gap-1'>{renderStars(item.rating)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StepsSection = () => {
  return (
    <section className='bg-blue-600 py-20 text-white'>
      <div className='container mx-auto px-4'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 text-3xl font-bold'>Cách thức hoạt động</h2>
          <p className='text-xl text-blue-100'>Bắt đầu tham gia chương trình chỉ với 3 bước</p>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {howItWorks.map((step, index) => (
            <div key={index} className='flex flex-col items-center text-center'>
              <div className='mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-2xl font-bold'>
                {step.number}
              </div>
              <h3 className='mb-4 text-xl font-semibold'>{step.title}</h3>
              <p className='text-blue-100'>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CtaSection = () => {
  return (
    <section className='bg-gray-900 py-20'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-4xl text-center'>
          <h2 className='mb-4 text-4xl font-bold text-white'>Sẵn sàng trở thành Sinh viên xuất sắc chưa?</h2>
          <p className='mb-8 text-xl text-gray-300'>
            Tham gia cùng hàng ngàn sinh viên đã cải thiện điểm số của mình với các Tutor có chuyên môn của chúng tôi
          </p>

          <div className='mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <button className='h-14 rounded-lg bg-blue-600 px-8 font-semibold text-white transition-colors hover:bg-blue-700'>
              Tìm Tutor
            </button>
            <button className='h-14 rounded-lg border border-gray-400 px-8 font-semibold text-white transition-colors hover:bg-white/10'>
              Tìm hiểu thêm
            </button>
          </div>

          <div className='flex flex-col items-center justify-center gap-8 sm:flex-row'>
            {ctaFeatures.map((feature, index) => (
              <div key={index} className='flex items-center gap-2'>
                <div className='flex h-6 w-6 items-center justify-center'>
                  <img src={feature.icon} alt='' className='h-4 w-4 object-contain' />
                </div>
                <span className='text-sm text-white'>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- MAIN HOME PAGE COMPONENT ---
export default function HomePage() {
  return (
    <main className='flex min-h-screen flex-col'>
      <HeroSection />
      <SubjectsSection />
      <TestimonialsSection />
      <StepsSection />
      <CtaSection />
    </main>
  );
}