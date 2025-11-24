import React from "react";

const ProgramList = () => {
  const programs = [
    {
      id: 1,
      title: "Lập trình Python nâng cao",
      tutor: "TS. Trần Minh Đức",
      desc: "Thành thạo Python với các dự án thực hành bám giảng trình mới, phân tích dữ liệu và các nguyên lý cơ bản của machine learning.",
      start: "Bắt đầu: 15 tháng 3, 2024",
      session: "Buổi tiếp theo: Thứ Năm, 10:00 AM",
      progress: 65,
      status: "Đang hoạt động",
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Tư duy Toán học",
      tutor: "TS. Trần Ngọc Diễm",
      desc: "Bài học toán học nền tảng giúp bạn làm quen giải hình, đại số, phân tích và các ứng dụng thực tế.",
      start: "Bắt đầu: 28 tháng 2, 2024",
      session: "Buổi tiếp theo: Hôm nay, 11:00 AM",
      progress: 82,
      status: "Đang hoạt động",
      color: "bg-purple-500",
    },
    {
      id: 3,
      title: "Nguyên lý Vật lý",
      tutor: "TS. Lê Nguyễn Bảo Thư",
      desc: "Khám phá các nguyên lý vật lý, tính chất sóng và hiện tượng tương tự với đời sống và thực tế.",
      start: "Bắt đầu: 8 tháng 3, 2024",
      session: "Buổi tiếp theo: Thứ Sáu, 2:00 PM",
      progress: 45,
      status: "Đang hoạt động",
      color: "bg-green-500",
    },
    {
      id: 4,
      title: "Hóa học Sinh học",
      tutor: "TS. Huỳnh Ngọc Oanh",
      desc: "Khám phá thế giới của tế bào, acid nucleic, DNA, tổng hợp protein và kỹ thuật sinh học.",
      start: "Hoàn thành: 1 tháng 3, 2024",
      session: "",
      progress: 100,
      status: "Hoàn thành",
      color: "bg-red-500",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-20">

        {/* PAGE TITLE */}
        <h1 className="text-2xl font-semibold text-slate-900">
          Chương trình của tôi
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Quản lý các chương trình đã đăng ký và theo dõi tiến độ học tập
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            + Đăng ký chương trình
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-slate-100">
            Xuất tiến độ
          </button>
        </div>

        {/* SEARCH + FILTER */}
        <div className="mt-6 bg-white p-4 rounded-xl border shadow-sm flex items-center gap-4">
          <input
            type="text"
            placeholder="Tìm kiếm chương trình..."
            className="flex-1 px-4 py-2 border rounded-lg"
          />

          <select className="px-4 py-2 border rounded-lg">
            <option>Tất cả trạng thái</option>
          </select>

          <select className="px-4 py-2 border rounded-lg">
            <option>Tất cả môn học</option>
          </select>

          <select className="px-4 py-2 border rounded-lg">
            <option>Sắp xếp theo ngày</option>
          </select>
        </div>

        {/* STATS BOX */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[
            ["7", "Tổng chương trình"],
            ["5", "Đang hoạt động"],
            ["2", "Đã hoàn thành"],
          ].map(([value, label], index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border shadow-sm"
            >
              <p className="text-3xl font-bold text-blue-600">{value}</p>
              <p className="text-sm text-slate-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* PROGRAM LIST */}
        <div className="mt-10 space-y-5">
          {programs.map((p) => (
            <div
              key={p.id}
              className="bg-white p-6 rounded-xl border shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="text-3xl">📘</div>

                  <div>
                    {/* TITLE */}
                    <h2 className="text-lg font-semibold text-slate-900">
                      {p.title}
                    </h2>

                    {/* STATUS */}
                    <p className="text-xs mt-1">
                      <span className="px-2 py-0.5 bg-green-100 text-green-600 rounded-md text-xs">
                        {p.status}
                      </span>
                    </p>

                    {/* TUTOR */}
                    <p className="text-sm text-slate-500 font-medium mt-1">
                      {p.tutor}
                    </p>

                    {/* DESCRIPTION */}
                    <p className="mt-2 text-sm text-slate-600">{p.desc}</p>
                  </div>
                </div>

                {/* RIGHT BUTTONS */}
        {p.status === "Hoàn thành" ? (
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              Xem chứng chỉ
            </button>
            <button className="px-4 py-2 border rounded-lg text-sm hover:bg-slate-100">
              Tải tài liệu
            </button>
          </div>
        ) : (
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
            Xem chi tiết
          </button>
        )}
      </div>

              {/* INFO ROW */}
              <div className="flex items-center gap-10 mt-4 text-sm text-slate-500">
                <p>{p.start}</p>
                {p.session && <p>{p.session}</p>}
                <p>Tiến độ: {p.progress}%</p>
              </div>

              {/* PROGRESS BAR */}
              <div className="w-full h-2 bg-slate-200 rounded-full mt-3">
                <div
                  className={`h-full rounded-full ${p.color}`}
                  style={{ width: `${p.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center mt-10 text-sm">
          <p>Hiển thị 1 đến 4 trong 7 chương trình</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-lg bg-white">Trước</button>
            <button className="px-3 py-1 border rounded-lg bg-white">1</button>
            <button className="px-3 py-1 border rounded-lg bg-white">2</button>
            <button className="px-3 py-1 border rounded-lg bg-white">Sau</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramList;
