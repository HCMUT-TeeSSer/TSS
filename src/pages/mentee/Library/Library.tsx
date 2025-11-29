import { FiDownload, FiEye } from "react-icons/fi";
import libraryData from "@/data/library.json";

const categories = libraryData.categories;
const docs = libraryData.docs;

const Library = () => {
  return (
    <div className='min-h-screen w-full bg-slate-50'>
      {/* ========== HEADER BLUE ========== */}
      <div className='w-full bg-indigo-500 py-10 text-white'>
        <div className='container'>
          <h1 className='text-3xl font-semibold'>Thư viện Tài liệu HCMUT</h1>
          <p className='mt-2 text-sm opacity-90'>
            Truy cập hàng ngàn tài liệu học tập, sách giáo khoa và tài nguyên nghiên cứu từ Thư viện Đại học Bách Khoa
            TP HCM
          </p>

          {/* Search */}
          <div className='mt-6 flex gap-3'>
            <input
              type='text'
              placeholder='Tìm kiếm tài liệu...'
              className='flex-1 rounded-lg border border-slate-200 px-4 py-3 text-black'
            />
            <button className='rounded-lg bg-blue-600 px-6 py-3 hover:bg-blue-700'>Tìm kiếm</button>
          </div>

          {/* Stats */}
          <div className='mt-8 grid grid-cols-4 gap-6'>
            {[
              ["25,847", "Tài liệu"],
              ["8,392", "Sinh viên sử dụng"],
              ["12,156", "Lượt tải xuống"],
              ["150+", "Chuyên ngành"],
            ].map(([value, label], i) => (
              <div key={i} className='rounded-xl bg-white/20 p-5 backdrop-blur-lg'>
                <p className='text-3xl font-bold'>{value}</p>
                <p className='text-sm opacity-90'>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BODY CONTENT */}
      <div className='container py-12'>
        {/* FILTER BAR */}
        <div className='mb-6'>
          <p className='mb-3 text-sm font-medium text-slate-600'>Lọc theo:</p>

          <div className='flex flex-wrap gap-3'>
            {[
              { icon: "✨", label: "Tất cả", active: true },
              { icon: "📘", label: "Sách giáo khoa" },
              { icon: "📰", label: "Bài báo" },
              { icon: "🎓", label: "Luận văn" },
              { icon: "📚", label: "Tài liệu tham khảo" },
              { icon: "🎥", label: "Video bài giảng" },
            ].map((item, idx) => (
              <button
                key={idx}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition ${
                  item.active ? "border-blue-600 bg-blue-600 text-white" : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span className='text-base'>{item.icon}</span>
                {item.label}
              </button>
            ))}

            {/* SORT */}
            <select className='h-[42px] rounded-xl border px-4 py-2 text-sm' aria-label='Sắp xếp'>
              <option>Sắp xếp theo độ phổ biến</option>
              <option>Ngày cập nhật</option>
              <option>Lượt xem</option>
              <option>Lượt tải xuống</option>
            </select>

            {/* Grid view */}
            <button className='flex h-10 w-10 items-center justify-center rounded-xl border text-slate-600 hover:bg-slate-100'>
              🔳
            </button>

            {/* List view */}
            <button className='flex h-10 w-10 items-center justify-center rounded-xl border text-slate-600 hover:bg-slate-100'>
              📋
            </button>
          </div>
        </div>

        {/* SUB-FILTERS */}
        <div className='mb-12 grid grid-cols-4 gap-4'>
          <select className='rounded-lg border px-4 py-2' aria-label='Khoa'>
            <option>Tất cả khoa</option>
          </select>
          <select className='rounded-lg border px-4 py-2' aria-label='Loại tài liệu'>
            <option>Tất cả loại</option>
          </select>
          <select className='rounded-lg border px-4 py-2' aria-label='Ngôn ngữ'>
            <option>Tất cả ngôn ngữ</option>
          </select>
          <select className='rounded-lg border px-4 py-2' aria-label='Năm'>
            <option>Tất cả năm</option>
          </select>
        </div>

        {/* CATEGORIES */}
        <h2 className='mb-2 text-xl font-semibold'>Danh mục phổ biến</h2>
        <p className='mb-6 text-sm text-slate-500'>Khám phá tài liệu theo chuyên ngành</p>

        <div className='mb-16 grid grid-cols-6 gap-4'>
          {categories.map((c, i) => (
            <div key={i} className='rounded-xl border bg-white p-5 shadow-sm transition hover:shadow'>
              <div className='text-3xl'>{c.icon}</div>
              <p className='mt-3 font-semibold'>{c.title}</p>
              <p className='text-sm text-slate-500'>{c.count}</p>
            </div>
          ))}
        </div>

        {/* FEATURED DOCUMENTS */}
        <h2 className='text-xl font-semibold'>Tài liệu nổi bật</h2>
        <p className='mb-6 text-sm text-slate-500'>Những tài liệu được truy cập nhiều nhất tuần này</p>

        <div className='grid grid-cols-3 gap-6'>
          {docs.map((d) => (
            <div key={d.id} className='rounded-xl border bg-white p-5 shadow-sm transition hover:shadow'>
              {/* TAG */}
              <div className='mb-2 flex items-center gap-2'>
                <span className={`flex h-5 w-5 items-center justify-center rounded-md text-sm ${d.tagColor}`}>
                  {d.tag === "Sách giáo khoa" && "📘"}
                  {d.tag === "Bài báo" && "📗"}
                  {d.tag === "Video" && "🎥"}
                  {d.tag === "Luận văn" && "📒"}
                  {d.tag === "Tài liệu tham khảo" && "📘"}
                  {d.tag === "Video bài giảng" && "🎞"}
                </span>
                <span className='text-xs font-medium text-slate-600'>{d.tag}</span>
              </div>

              {/* TITLE */}
              <h3 className='mt-3 text-lg font-semibold'>{d.title}</h3>
              <p className='text-sm text-slate-500'>{d.author}</p>

              <p className='mt-2 line-clamp-2 text-sm text-slate-600'>{d.desc}</p>

              {/* METRICS */}
              <div className='mt-4 flex items-center gap-4 text-sm text-slate-500'>
                <span className='flex items-center gap-1'>
                  <FiEye /> {d.views}
                </span>
                {d.downloads && (
                  <span className='flex items-center gap-1'>
                    <FiDownload /> {d.downloads}
                  </span>
                )}
              </div>

              <p className='mt-2 text-xs text-slate-400'>Cập nhật: {d.update}</p>

              {/* BUTTONS */}
              <div className='mt-4 flex gap-3'>
                {d.tag.includes("Video") ? (
                  <button className='rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700'>
                    Xem video
                  </button>
                ) : (
                  <>
                    <button className='rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700'>
                      Xem online
                    </button>
                    <button className='rounded-lg border px-4 py-2 text-sm hover:bg-slate-100'>Tải xuống</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className='mt-12 flex items-center justify-between text-sm'>
          <p>Hiển thị trong kết quả 1–6/2,547</p>
          <div className='flex gap-2'>
            <button className='rounded-lg border bg-white px-3 py-1'>Trước</button>
            <button className='rounded-lg border bg-blue-600 px-3 py-1 text-white'>1</button>
            <button className='rounded-lg border bg-white px-3 py-1'>2</button>
            <button className='rounded-lg border bg-white px-3 py-1'>3</button>
            <span className='px-3 text-slate-500'>...</span>
            <button className='rounded-lg border bg-white px-3 py-1'>25</button>
            <button className='rounded-lg border bg-white px-3 py-1'>Sau</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
