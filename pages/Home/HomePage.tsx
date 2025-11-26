import React, { useState } from "react";
import homeData from "@/data/home.json";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { stats } = homeData;

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
            <div className='relative flex items-center rounded-full bg-white/10 border border-white/20 backdrop-blur-sm p-1'>
              <div className='pl-4'>
                <img src='/images/vector4.png' alt='Search' className='h-4 w-4 opacity-70' />
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
                className='rounded-full bg-white px-6 py-2.5 font-medium text-blue-600 hover:bg-blue-50 transition-colors'
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
  const { subjects } = homeData;

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
              className='flex flex-col items-center rounded-xl border border-gray-200 p-6 transition-shadow hover:shadow-lg cursor-pointer'
            >
              <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${subject.bgColor}`}>
                <img src={subject.icon} alt={subject.name} className={subject.type === "img" ? "h-full w-full object-contain p-1" : "h-6 w-6"} />
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
  const { testimonials } = homeData;

  const renderStars = (rating: number) => {
    return Array.from({ length: Math.floor(rating) }, (_, index) => (
      <img 
        key={index}
        src="/images/vector3.png" 
        alt="star" 
        className="h-4 w-4 object-contain" // Kích thước icon
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
                <img src={item.avatar} alt={item.name} className='h-12 w-12 rounded-full object-cover' />
                <div>
                  <div className='font-semibold text-gray-900'>{item.name}</div>
                  <div className='text-sm text-gray-500'>{item.role}</div>
                </div>
              </div>
              <p className='mb-6 flex-1 text-gray-700 italic'>{item.content}</p>
              <div className="flex gap-1">
                {renderStars(item.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 4. How It Works Section ---
const StepsSection = () => {
  const { howItWorks } = homeData;

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

// --- 5. CTA Section ---
const CtaSection = () => {
  const { ctaFeatures } = homeData;

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