import React from "react";
import { FiDownload, FiEye } from "react-icons/fi";

const Library = () => {
  const categories = [
    { icon: "💻", title: "Khoa học máy tính", count: "3,247 tài liệu" },
    { icon: "⚙️", title: "Cơ khí", count: "2,189 tài liệu" },
    { icon: "⚡", title: "Điện - Điện tử", count: "1,955 tài liệu" },
    { icon: "🧪", title: "Hóa học", count: "1,534 tài liệu" },
    { icon: "📐", title: "Vật lý", count: "1,298 tài liệu" },
    { icon: "📊", title: "Toán học", count: "1,067 tài liệu" }
  ];

  const docs = [
    {
      id: 1,
      tag: "Sách giáo khoa",
      tagColor: "bg-red-100 text-red-600",
      title: "Cấu trúc dữ liệu và Giải thuật",
      author: "Tác giả: TS. Nguyễn Văn A",
      desc: "Giới thiệu cơ bản về các cấu trúc dữ liệu và thuật toán trong lĩnh vực khoa học máy tính...",
      views: "12,531 lượt xem",
      downloads: "7,432 lượt tải",
      update: "03/11/2025"
    },
    {
      id: 2,
      tag: "Bài báo",
      tagColor: "bg-green-100 text-green-700",
      title: "Machine Learning trong IoT",
      author: "Tác giả: PGS.TS. Trần Thị B",
      desc: "Nghiên cứu về ứng dụng Machine Learning trong hệ thống Internet of Things...",
      views: "8,234 lượt xem",
      downloads: "6,785 lượt tải",
      update: "29/10/2025"
    },
    {
      id: 3,
      tag: "Video",
      tagColor: "bg-purple-100 text-purple-700",
      title: "Bài giảng Vật lý đại cương",
      author: "Giảng viên: TS. Lê Văn C",
      desc: "Series bài giảng về các nguyên lý cơ bản trong vật lý đại cương...",
      views: "12,345 lượt xem",
      downloads: null,
      update: "22/10/2025"
    },
    {
      id: 4,
      tag: "Luận văn",
      tagColor: "bg-yellow-100 text-yellow-700",
      title: "Ứng dụng AI trong y tế",
      author: "Tác giả: Nguyễn Minh D",
      desc: "Luận văn về ứng dụng trí tuệ nhân tạo trong chẩn đoán và điều trị bệnh lý...",
      views: "8,892 lượt xem",
      downloads: "4,532 lượt tải",
      update: "19/09/2025"
    },
    {
      id: 5,
      tag: "Tài liệu tham khảo",
      tagColor: "bg-blue-100 text-blue-700",
      title: "Tài liệu tham khảo về AI",
      author: "Tác giả: PGS.TS. Nguyễn Văn E",
      desc: "Tài liệu tham khảo cho nghiên cứu ứng dụng trí tuệ nhân tạo...",
      views: "1,607 lượt xem",
      downloads: "987 lượt tải",
      update: "16/09/2025"
    },
    {
      id: 6,
      tag: "Video bài giảng",
      tagColor: "bg-pink-100 text-pink-700",
      title: "Video bài giảng về Kỹ thuật phần mềm",
      author: "Giảng viên: PGS.TS. Phạm Tí F",
      desc: "Video bài giảng về quy trình phát triển phần mềm...",
      views: "9,423 lượt xem",
      downloads: null,
      update: "02/09/2025"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50">

      {/* ========== HEADER BLUE ========== */}
      <div className="w-full bg-indigo-500 text-white py-10">
        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-3xl font-semibold">Thư viện Tài liệu HCMUT</h1>
          <p className="text-sm opacity-90 mt-2">
            Truy cập hàng ngàn tài liệu học tập, sách giáo khoa và tài nguyên nghiên cứu từ Thư viện Đại học Bách Khoa TP HCM
          </p>

          {/* Search */}
          <div className="mt-6 flex gap-3">
            <input
              type="text"
              placeholder="Tìm kiếm tài liệu..."
              className="flex-1 px-4 py-3 rounded-lg text-black border border-slate-200"
            />
            <button className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700">Tìm kiếm</button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 mt-8">
            {[
              ["25,847", "Tài liệu"],
              ["8,392", "Sinh viên sử dụng"],
              ["12,156", "Lượt tải xuống"],
              ["150+", "Chuyên ngành"]
            ].map(([value, label], i) => (
              <div key={i} className="bg-white/20 backdrop-blur-lg p-5 rounded-xl">
                <p className="text-3xl font-bold">{value}</p>
                <p className="text-sm opacity-90">{label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ========== BODY CONTENT ========== */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* ================= FILTER BAR ================= */}
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-600 mb-3">Lọc theo:</p>

          <div className="flex gap-3 flex-wrap">
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
                className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-xl transition ${
                  item.active
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </button>
            ))}
            {/* Dropdown Sắp xếp */}
            <select className="px-4 py-2 text-sm border rounded-xl h-[42px]">
              <option>Sắp xếp theo độ phổ biến</option>
              <option>Ngày cập nhật</option>
              <option>Lượt xem</option>
              <option>Lượt tải xuống</option>
            </select>

            {/* Grid view */}
            <button className="w-10 h-10 rounded-xl border flex items-center justify-center text-slate-600 hover:bg-slate-100">
              🔳
            </button>

            {/* List view */}
            <button className="w-10 h-10 rounded-xl border flex items-center justify-center text-slate-600 hover:bg-slate-100">
              📋
            </button>

          </div>
        </div>

        {/* SUB-FILTERS */}
        <div className="grid grid-cols-4 gap-4 mb-12">
          <select className="px-4 py-2 border rounded-lg"><option>Tất cả khoa</option></select>
          <select className="px-4 py-2 border rounded-lg"><option>Tất cả loại</option></select>
          <select className="px-4 py-2 border rounded-lg"><option>Tất cả ngôn ngữ</option></select>
          <select className="px-4 py-2 border rounded-lg"><option>Tất cả năm</option></select>
        </div>

        {/* POPULAR CATEGORIES */}
        <h2 className="text-xl font-semibold mb-2">Danh mục phổ biến</h2>
        <p className="text-sm text-slate-500 mb-6">Khám phá tài liệu theo chuyên ngành</p>

        <div className="grid grid-cols-6 gap-4 mb-16">
          {categories.map((c, i) => (
            <div key={i} className="bg-white p-5 rounded-xl border shadow-sm hover:shadow transition">
              <div className="text-3xl">{c.icon}</div>
              <p className="mt-3 font-semibold">{c.title}</p>
              <p className="text-sm text-slate-500">{c.count}</p>
            </div>
          ))}
        </div>

        {/* FEATURED DOCUMENTS */}
        <h2 className="text-xl font-semibold">Tài liệu nổi bật</h2>
        <p className="text-sm text-slate-500 mb-6">Những tài liệu được truy cập nhiều nhất tuần này</p>

        <div className="grid grid-cols-3 gap-6">
          {docs.map((d) => (
            <div key={d.id} className="bg-white p-5 rounded-xl border shadow-sm hover:shadow transition">

              {/* TAG AREA */}
<div className="flex items-center gap-2 mb-2">

  {/* ICON BOX */}
  <span
    className={`w-5 h-5 flex items-center justify-center text-sm rounded-md ${d.tagColor}`}
  >
    {d.tag === "Sách giáo khoa" && "📘"}
    {d.tag === "Bài báo" && "📗"}
    {d.tag === "Video" && "🎥"}
    {d.tag === "Luận văn" && "📒"}
    {d.tag === "Tài liệu tham khảo" && "📘"}
    {d.tag === "Video bài giảng" && "🎞"}
  </span>

  {/* TEXT TAG */}
  <span className="text-xs font-medium text-slate-600">{d.tag}</span>
</div>

              {/* TITLE */}
              <h3 className="mt-3 font-semibold text-lg">{d.title}</h3>
              <p className="text-sm text-slate-500">{d.author}</p>

              {/* DESCRIPTION */}
              <p className="text-sm text-slate-600 mt-2 line-clamp-2">{d.desc}</p>

              {/* METRICS */}
              <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <FiEye /> {d.views}
                </span>

                {d.downloads && (
                  <span className="flex items-center gap-1">
                    <FiDownload /> {d.downloads}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-400 mt-2">Cập nhật: {d.update}</p>

              {/* BUTTONS */}
              <div className="flex gap-3 mt-4">
                {d.tag.includes("Video") ? (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                    Xem video
                  </button>
                ) : (
                  <>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                      Xem online
                    </button>
                    <button className="px-4 py-2 border rounded-lg text-sm hover:bg-slate-100">
                      Tải xuống
                    </button>
                  </>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center mt-12 text-sm">
          <p>Hiển thị trong kết quả 1–12/2,547</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-lg bg-white">Trước</button>
            <button className="px-3 py-1 border rounded-lg bg-blue-600 text-white">1</button>
            <button className="px-3 py-1 border rounded-lg bg-white">2</button>
            <button className="px-3 py-1 border rounded-lg bg-white">3</button>
            <span className="px-3 text-slate-500">...</span>
            <button className="px-3 py-1 border rounded-lg bg-white">25</button>
            <button className="px-3 py-1 border rounded-lg bg-white">Sau</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Library;
