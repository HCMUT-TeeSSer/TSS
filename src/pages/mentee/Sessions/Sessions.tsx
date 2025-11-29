import React, { useState } from "react";
import {
  CalendarIcon,
  ClockIcon,
  PlayIcon,
  BellIcon,
  ArrowDownTrayIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import SessionsData from "@/data/sessions.json";
import { useNavigate, useParams } from "react-router-dom";

import {
  Save,
  Share2,
  FileDown,
  ChevronRight,
  Clock,
  Star,
  Video,
  Eye,
  FileText,
} from "lucide-react";

import { toast } from "react-toastify";
import { programs } from "@/data/programs";

const sessions = SessionsData;

// Modal yêu cầu buổi tư vấn mới (chỉ gửi yêu cầu, không lưu vào list)
interface RequestSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RequestSessionModal: React.FC<RequestSessionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!topic.trim()) {
      toast.error("Vui lòng nhập chủ đề buổi tư vấn.");
      return;
    }
    toast.success("Đã gửi yêu cầu buổi tư vấn mới.");
    setTopic("");
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-slate-900">
          Yêu cầu buổi tư vấn mới
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Nhập nhanh thông tin mong muốn, yêu cầu sẽ được gửi đến Tutor phụ
          trách.
        </p>

        <div className="mt-4 space-y-3 text-sm">
          <div>
            <label className="mb-1 block font-medium text-slate-700">
              Chủ đề
            </label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Ví dụ: Ôn tập giữa kỳ, project cuối kỳ..."
            />
          </div>
          <div>
            <label className="mb-1 block font-medium text-slate-700">
              Mô tả (không bắt buộc)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Bạn muốn tập trung vào nội dung nào, khó khăn gì cần Tutor hỗ trợ..."
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2 text-sm">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-50"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Gửi yêu cầu
          </button>
        </div>
      </div>
    </div>
  );
};

type FilterMode = "all" | "upcoming" | "completed";

export default function Sessions() {
  const navigate = useNavigate();
  const { programId } = useParams<{ programId?: string }>();

  const programID = Number(programId ?? 1) || 1;
  const program = programs.find((p) => p.id === programID);

  const programTitle = program?.title ?? "Lập trình Python nâng cao";
  const programDepartment =
    program?.department ?? program?.category ?? "Khoa học máy tính";
  const programDuration = program?.duration ?? "12 tuần";
  const programRating = program?.rating ?? 4.9;
  const programDifficulty = program?.difficulty ?? "Nâng cao";

  const isPythonProgram = program?.id === 1;

  // Trang này là "Buổi tư vấn"
  const currentTab: "overview" | "sessions" | "meet" | "skills" = "sessions";

  const tabs = [
    {
      id: "overview" as const,
      label: "Nội dung",
      onClick: () => navigate(`/mentee/my-program/${programID}`),
    },
    {
      id: "sessions" as const,
      label: "Buổi tư vấn",
      onClick: () => navigate(`/mentee/session/${programID}`),
    },
    {
      id: "meet" as const,
      label: "Lịch hẹn",
      onClick: () => {
        // TODO: route lịch hẹn
      },
    },
    {
      id: "skills" as const,
      label: "Năng lực",
      onClick: () => {
        // TODO: route năng lực
      },
    },
  ];

  // Filter buổi
  const [filterMode, setFilterMode] = useState<FilterMode>("all");

  // Modal yêu cầu buổi tư vấn
  const [showRequestModal, setShowRequestModal] = useState(false);

  const handleJoinSession = () => {
    toast.info("Bắt đầu cuộc họp");
  };

  const handleExport = () => {
    toast.info("Bắt đầu tải về");
  };

  // Lọc sessions dựa trên status thay vì time thực
  const filteredSessions = !isPythonProgram
    ? []
    : sessions.filter((s) => {
        const isCompleted = s.status === "Đã hoàn thành";
        if (filterMode === "completed") return isCompleted;
        if (filterMode === "upcoming") return !isCompleted;
        return true; // all
      });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* BREADCRUMB */}
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center px-6 py-3 text-sm text-slate-500">
          <button
            type="button"
            onClick={() => navigate("/mentee/programs")}
            className="hover:text-blue-600"
          >
            Chương trình học
          </button>
          <ChevronRight className="mx-2 h-4 w-4 text-slate-400" />
          <span className="truncate font-medium text-slate-900">
            {programTitle}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-6 pb-10">
        {/* HEADER + TABS */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            {/* LEFT: icon + title */}
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-2xl font-semibold text-blue-600">
                <Video className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {programTitle}
                </h1>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                  <span>{programDepartment}</span>
                  <span>•</span>
                  <span>TS. Trần Minh Đức</span>
                </div>
              </div>
            </div>

            {/* RIGHT: actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                <Save className="h-4 w-4" />
                Lưu chương trình
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600">
                <Share2 className="h-4 w-4" />
                Chia sẻ
              </button>
              <button
                type="button"
                onClick={handleExport}
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-50"
              >
                <FileDown className="h-4 w-4" />
                Xuất file
              </button>
            </div>
          </div>

          {/* META + PROGRESS FULL-WIDTH */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-slate-500" />
                  {programDuration}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  {programRating.toFixed(1)}
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium">
                  {programDifficulty}
                </span>
              </div>

              <span className="ml-4 whitespace-nowrap font-semibold text-slate-700">
                Tiến độ: <span className="text-slate-600">65%</span>
              </span>
            </div>

            <div className="mt-2 h-[6px] w-full rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{ width: "65%" }}
              />
            </div>
          </div>

          {/* TABS */}
          <div className="mt-6 flex gap-8 border-b border-slate-100">
            {tabs.map((tab) => {
              const active = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={tab.onClick}
                  className={`relative pb-3 text-sm font-medium transition-colors ${
                    active
                      ? "text-blue-600"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab.label}
                  {active && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-t-full bg-blue-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          {/* LEFT – session list */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {/* Thanh tiêu đề + filter + nút yêu cầu */}
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">
                Danh sách buổi tư vấn
              </h3>

              <div className="flex items-center gap-3">
                {/* Filter pills */}
                <div className="inline-flex rounded-full bg-slate-100 p-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setFilterMode("all")}
                    className={`rounded-full px-3 py-1 font-medium transition ${
                      filterMode === "all"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    Tất cả buổi
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterMode("upcoming")}
                    className={`rounded-full px-3 py-1 font-medium transition ${
                      filterMode === "upcoming"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    Buổi sắp tới
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterMode("completed")}
                    className={`rounded-full px-3 py-1 font-medium transition ${
                      filterMode === "completed"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    Đã hoàn thành
                  </button>
                </div>

                {/* Nút yêu cầu buổi tư vấn mới */}
                <button
                  type="button"
                  onClick={() => setShowRequestModal(true)}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700"
                >
                  <PlusIcon className="h-4 w-4" />
                  Yêu cầu buổi tư vấn mới
                </button>
              </div>
            </div>

            {isPythonProgram ? (
              filteredSessions.length > 0 ? (
                filteredSessions.map((s) => {
                  const isDone = s.status === "Đã hoàn thành";
                  const isRunning = s.status === "Đang diễn ra";

                  return (
                    <div
                      key={s.id}
                      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                    >
                      {/* TITLE + STATUS + ACTION ICONS */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-base font-semibold text-slate-900">
                              {s.topic}
                            </h2>
                            <span
                              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                                isDone
                                  ? "bg-emerald-50 text-emerald-700"
                                  : isRunning
                                  ? "bg-blue-50 text-blue-600"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {s.status}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-slate-600">
                            {s.description}
                          </p>
                        </div>

                        <div className="flex items-start gap-2 text-slate-400">
                          <button
                            type="button"
                            className="rounded-full p-1 hover:bg-slate-100 hover:text-slate-600"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={handleExport}
                            className="rounded-full p-1 hover:bg-slate-100 hover:text-slate-600"
                          >
                            <ArrowDownTrayIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* INFO ROW */}
                      <div className="mt-3 flex flex-wrap items-center gap-6 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4 text-slate-500" />
                          <span>{s.date}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <ClockIcon className="h-4 w-4 text-slate-500" />
                          <span>{s.time}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <ClockIcon className="h-4 w-4 text-slate-500" />
                          <span>{s.duration} phút</span>
                        </div>
                      </div>

                      <div className="mt-3 border-t border-slate-100" />

                      {/* BOTTOM ROW */}
                      {isDone ? (
                        <div className="mt-3 flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200">
                              {s.avatar}
                            </div>
                            <span className="text-sm text-slate-700">
                              với {s.tutor}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 text-xs font-medium">
                            <button
                              type="button"
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                            >
                              <Star className="h-4 w-4 fill-blue-600 text-blue-600" />
                              <span>Đánh giá</span>
                            </button>
                            <button
                              type="button"
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                            >
                              <FileText className="h-4 w-4" />
                              <span>Ghi chú</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-3 flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200">
                              {s.avatar}
                            </div>
                            <span className="text-sm text-slate-700">
                              với {s.tutor}
                            </span>
                          </div>

                          <div className="flex items-center gap-4">
                            {isRunning ? (
                              <button
                                type="button"
                                onClick={handleJoinSession}
                                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
                              >
                                <PlayIcon className="h-4 w-4" />
                                Tham gia ngay
                              </button>
                            ) : (
                              <button className="flex items-center gap-2 rounded-lg border border-blue-500 px-4 py-1.5 text-blue-600 hover:bg-blue-50">
                                <CalendarIcon className="h-4 w-4" />
                                Thêm vào lịch
                              </button>
                            )}

                            <button className="flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:text-slate-900">
                              <BellIcon className="h-4 w-4" />
                              Đặt nhắc nhở
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
                  Không tìm thấy buổi tư vấn nào với bộ lọc hiện tại.
                </div>
              )
            ) : (
              <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
                Hiện chưa có buổi tư vấn nào cho chương trình này. Thông tin sẽ
                được cập nhật sau.
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-24">
            {/* Statistics */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">Thông số</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Số buổi</span>
                  <span className="font-bold text-slate-900">
                    {isPythonProgram ? 12 : "—"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">Đã hoàn thành</span>
                  <span className="font-bold text-green-600">
                    {isPythonProgram ? 4 : "—"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">Sắp tới</span>
                  <span className="font-bold text-blue-600">
                    {isPythonProgram ? 3 : "—"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">Tổng thời gian</span>
                  <span className="font-bold text-slate-900">
                    {isPythonProgram ? "18.5" : "—"}
                  </span>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">Các hành động</h3>

              <div className="flex flex-col gap-3 text-sm">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(true)}
                  className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  <PlusIcon className="h-4 w-4" />
                  Yêu cầu buổi tư vấn mới
                </button>

                <button className="w-full rounded-xl border px-4 py-2 text-slate-700 hover:bg-slate-50">
                  Xem tất cả buổi tư vấn
                </button>

                <button
                  type="button"
                  onClick={handleExport}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2 text-slate-700 hover:bg-slate-50"
                >
                  <ArrowDownTrayIcon className="h-4 w-4" />
                  Xuất file
                </button>
              </div>
            </div>

            {/* Next Session */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">Next Session</h3>

              {isPythonProgram ? (
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm">
                  <p className="font-semibold text-slate-900">
                    Cấu trúc dữ liệu nâng cao
                  </p>
                  <p className="text-slate-600">Hôm nay, 14:00 - 15:30</p>
                  <p className="text-slate-600">Với TS. Nguyễn Minh Hoàng</p>

                  <button
                    type="button"
                    onClick={handleJoinSession}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    <Video className="h-5 w-5" />
                    Tham gia buổi tư vấn
                  </button>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-blue-200 bg-blue-50 p-4 text-sm text-slate-600">
                  Thông tin buổi tư vấn tiếp theo cho chương trình này sẽ được
                  cập nhật sau.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal yêu cầu buổi tư vấn */}
      <RequestSessionModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
      />
    </div>
  );
}
