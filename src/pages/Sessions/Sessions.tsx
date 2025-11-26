import {
  CalendarIcon,
  ClockIcon,
  PlayIcon,
  BellIcon,
  ArrowDownTrayIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import SessionsData from "../../data/sessions.json";

// ====================== MOCK DATA ============================
const sessions = SessionsData;



// =============================================================

export default function Sessions() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8">
      
      {/* ===================== HEADER ======================= */}
      <div className="mb-8">
        {/* Breadcrumb */}
        <p className="text-sm text-gray-500 mb-3">
          Chương trình học / <span className="text-blue-600 font-medium">Lập trình Python nâng cao</span>
        </p>

        {/* Header box */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm flex flex-col lg:flex-row justify-between gap-6">
          
          {/* LEFT */}
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 text-2xl font-bold">
              {"</>"}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">Lập trình Python Nâng cao</h1>
              <p className="text-gray-600 text-sm mt-1">
                Với TS. Trần Minh Đức • 32 buổi • Đã hoàn thành 65%
              </p>

              {/* Progress */}
              <div className="mt-3">
                <div className="flex justify-between text-xs text-blue-600 mb-1">
                  65% hoàn thành
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: "65%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT BUTTONS */}
          <div className="flex gap-3 self-start lg:self-center">
            <button className="px-4 py-2 border rounded-lg text-sm bg-white hover:bg-gray-50">
              Lưu chương trình
            </button>
            <button className="px-4 py-2 border rounded-lg text-sm bg-white hover:bg-gray-50">
              Chia sẻ
            </button>
            <button className="px-4 py-2 rounded-lg text-sm bg-green-600 text-white hover:bg-green-700">
              Xuất file
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-5 border-b flex gap-6">
          <button className="pb-3 text-gray-600 hover:text-gray-800">
            Tổng quan
          </button>
          <button className="pb-3 border-b-2 border-blue-600 text-blue-600 font-medium">
            Buổi tư vấn
          </button>
          <button className="pb-3 text-gray-600 hover:text-gray-800">
            Tài liệu
          </button>
          <button className="pb-3 text-gray-600 hover:text-gray-800">
            Lộ trình
          </button>
          <button className="pb-3 text-gray-600 hover:text-gray-800">
            Người học
          </button>
        </div>
      </div>

      {/* ===================== MAIN CONTENT ======================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">


        {/* LEFT – Sessions list */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {sessions.map((s) => (
            <div
  key={s.id}
  className="rounded-[20px] border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
>
  {/* TITLE + BADGE + DOWNLOAD */}
  <div className="flex justify-between items-start">
    <div>
      <h2 className="text-lg font-semibold text-gray-900">{s.topic}</h2>
      <p className="text-gray-600 text-sm mt-1">{s.description}</p>
    </div>

    <div className="flex items-center gap-3">
      <span
        className={`px-3 py-[2px] text-xs rounded-full border ${s.statusColor}`}
      >
        {s.status}
      </span>

      <ArrowDownTrayIcon className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
    </div>
  </div>

  {/* INFO ROW */}
  <div className="flex items-center gap-6 text-sm text-gray-700 mt-4">
    <div className="flex items-center gap-1">
      <CalendarIcon className="w-4 h-4 text-gray-500" />
      <span>{s.date}</span>
    </div>

    <div className="flex items-center gap-1">
      <ClockIcon className="w-4 h-4 text-gray-500" />
      <span>{s.time}</span>
    </div>

    <div className="flex items-center gap-1">
      <ClockIcon className="w-4 h-4 text-gray-500" />
      <span>{s.duration} phút</span>
    </div>
  </div>

  {/* TUTOR */}
  <div className="flex items-center gap-2 mt-3">
    <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
      {s.avatar}
    </div>
    <span className="text-sm text-gray-700">với {s.tutor}</span>
  </div>

  {/* ACTION BUTTONS */}
  <div className="flex items-center gap-4 mt-5">

    {s.status === "Đang diễn ra" && (
      <button className="px-4 py-[6px] bg-blue-600 text-white rounded-lg flex items-center gap-2 shadow-sm hover:bg-blue-700">
        <PlayIcon className="w-4 h-4" />
        Tham gia ngay
      </button>
    )}

    {s.status !== "Đang diễn ra" && (
      <button className="px-4 py-[6px] border border-blue-500 text-blue-600 rounded-lg flex items-center gap-2 hover:bg-blue-50">
        <CalendarIcon className="w-4 h-4" />
        Thêm vào lịch
      </button>
    )}

    <button className="px-3 py-[6px] text-gray-600 hover:text-gray-900 flex items-center gap-2">
      <BellIcon className="w-4 h-4" />
      Đặt nhắc nhở
    </button>
  </div>
</div>



          ))}
        </div>

        {/* ===================== RIGHT SIDEBAR ======================= */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-24">


          {/* Thống số */}
          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Thống số</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Số buổi</span>
                <span className="font-bold text-gray-900">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Đã hoàn thành</span>
                <span className="font-bold text-green-600">4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sắp tới</span>
                <span className="font-bold text-blue-600">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tổng thời gian</span>
                <span className="font-bold text-gray-900">18.5</span>
              </div>
            </div>
          </div>

          {/* Hành động */}
          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Các hành động</h3>

            <div className="flex flex-col gap-3 text-sm">

              {/* Yêu cầu */}
              <button className="w-full px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 font-medium rounded-xl flex items-center justify-center gap-2">

                <PlusIcon className="w-4 h-4" />
                Yêu cầu buổi tư vấn mới
              </button>

              {/* Xem tất cả */}
              <button className="w-full px-4 py-2 border text-gray-700 rounded-xl hover:bg-gray-50 flex items-center justify-center">

                Xem tất cả buổi tư vấn
              </button>

              {/* Xuất file */}
              <button className="w-full px-4 py-2 border text-gray-700 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50">

                <ArrowDownTrayIcon className="w-4 h-4" />
                Xuất file
              </button>

            </div>
          </div>

          {/* Next Session */}
          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Next Session</h3>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-sm">
              <p className="font-semibold text-gray-900">Cấu trúc dữ liệu nâng cao</p>
              <p className="text-gray-600">Hôm nay, 14:00 - 15:30</p>
              <p className="text-gray-600">Với TS. Nguyễn Minh Hoàng</p>

              <button className="w-full mt-4 py-2 rounded-xl bg-blue-600 text-white font-medium flex items-center justify-center gap-2 hover:bg-blue-700">
                <CalendarIcon className="w-4 h-4" />
                Tham gia buổi tư vấn
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

