import {
  CalendarIcon,
  ClockIcon,
  PlayIcon,
  BellIcon,
  ArrowDownTrayIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import SessionsData from "../../data/sessions.json";
import { useNavigate } from "react-router-dom";

const sessions = SessionsData;

export default function Sessions() {
    const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* ===================== HEADER ======================= */}
        <div className="mb-8">

          {/* Breadcrumb */}
          <div className="text-sm text-slate-500 mb-3">
          <span className="cursor-pointer hover:text-slate-700">
            Chương trình học
          </span>
          <span className="mx-2">/</span>
          <span className="text-slate-900 font-medium">
            Lập trình Python nâng cao
          </span>
        </div>

          {/* Header Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

            <div className="flex flex-col lg:flex-row justify-between gap-6">

              {/* LEFT */}
              <div className="flex gap-4">
                <div className="h-14 w-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 text-2xl font-bold">
                  {"</>"}
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Lập trình Python Nâng cao
                  </h1>

                  <p className="text-gray-600 text-sm mt-1">
                    Với TS. Trần Minh Đức • 32 buổi • Đã hoàn thành 65%
                  </p>

                  {/* Progress */}
                  <div className="mt-3">
                    <div className="text-xs text-blue-600 mb-1">
                      65% hoàn thành
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: "65%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT BUTTONS */}
              <div className="flex gap-3 self-start lg:self-center">
                <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm bg-white hover:bg-slate-50">
                  Lưu chương trình
                </button>
                <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm bg-white hover:bg-slate-50">
                  Chia sẻ
                </button>
                <button className="px-4 py-2 rounded-lg text-sm bg-green-600 text-white hover:bg-green-700">
                  Xuất file
                </button>
              </div>

            </div>

            {/* Tabs */}
            <div className="mt-6 border-t border-slate-100 pt-3 flex flex-wrap gap-4 text-sm">

            {/* TAB: Tổng quan */}
            <button 
            onClick={() => navigate("/mentee/test-program-detail")}
            className="px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-50">
              Tổng quan
            </button>

            {/* TAB: Buổi tư vấn (✔ navigate) */}
            <button
              
              className="px-3 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium"
            >
              Buổi tư vấn
            </button>

            <button className="px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-50">
              Tài liệu
            </button>
            <button className="px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-50">
              Lộ trình
            </button>
            <button className="px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-50">
              Người học
            </button>
          </div>

          </div>
        </div>

        {/* ===================== MAIN CONTENT ======================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* LEFT – session list */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {sessions.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                {/* TITLE + STATUS + DOWNLOAD */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      {s.topic}
                    </h2>
                    <p className="text-slate-600 text-sm mt-1">
                      {s.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-[2px] text-xs rounded-full border ${s.statusColor}`}
                    >
                      {s.status}
                    </span>

                    <ArrowDownTrayIcon className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer" />
                  </div>
                </div>

                {/* INFO ROW */}
                <div className="flex items-center gap-6 text-sm text-slate-700 mt-4">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4 text-slate-500" />
                    <span>{s.date}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4 text-slate-500" />
                    <span>{s.time}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4 text-slate-500" />
                    <span>{s.duration} phút</span>
                  </div>
                </div>

                {/* TUTOR */}
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center">
                    {s.avatar}
                  </div>
                  <span className="text-sm text-slate-700">với {s.tutor}</span>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex items-center gap-4 mt-5">
                  {s.status === "Đang diễn ra" ? (
                    <button className="px-4 py-[6px] bg-blue-600 text-white rounded-lg flex items-center gap-2 shadow-sm hover:bg-blue-700">
                      <PlayIcon className="w-4 h-4" />
                      Tham gia ngay
                    </button>
                  ) : (
                    <button className="px-4 py-[6px] border border-blue-500 text-blue-600 rounded-lg flex items-center gap-2 hover:bg-blue-50">
                      <CalendarIcon className="w-4 h-4" />
                      Thêm vào lịch
                    </button>
                  )}

                  <button className="px-3 py-[6px] text-slate-600 hover:text-slate-900 flex items-center gap-2">
                    <BellIcon className="w-4 h-4" />
                    Đặt nhắc nhở
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDEBAR (unchanged) */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-24">

            {/* Statistics */}
            <div className="bg-white rounded-2xl border p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Thống số</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Số buổi</span>
                  <span className="font-bold text-slate-900">12</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">Đã hoàn thành</span>
                  <span className="font-bold text-green-600">4</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">Sắp tới</span>
                  <span className="font-bold text-blue-600">3</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">Tổng thời gian</span>
                  <span className="font-bold text-slate-900">18.5</span>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="bg-white rounded-2xl border p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Các hành động</h3>

              <div className="flex flex-col gap-3 text-sm">

                <button className="w-full px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 font-medium rounded-xl flex items-center justify-center gap-2">
                  <PlusIcon className="w-4 h-4" />
                  Yêu cầu buổi tư vấn mới
                </button>

                <button className="w-full px-4 py-2 border text-slate-700 rounded-xl hover:bg-slate-50">
                  Xem tất cả buổi tư vấn
                </button>

                <button className="w-full px-4 py-2 border text-slate-700 rounded-xl hover:bg-slate-50 flex items-center justify-center gap-2">
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  Xuất file
                </button>
              </div>
            </div>

            {/* Next Session */}
            <div className="bg-white rounded-2xl border p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Next Session</h3>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-sm">
                <p className="font-semibold text-slate-900">
                  Cấu trúc dữ liệu nâng cao
                </p>
                <p className="text-slate-600">Hôm nay, 14:00 - 15:30</p>
                <p className="text-slate-600">Với TS. Nguyễn Minh Hoàng</p>

                <button className="w-full mt-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700">
                  <CalendarIcon className="w-4 h-4" />
                  Tham gia buổi tư vấn
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
