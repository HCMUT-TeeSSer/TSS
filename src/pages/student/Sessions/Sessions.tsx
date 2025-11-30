import React from "react";
import { CalendarIcon, ClockIcon, PlayIcon, BellIcon, ArrowDownTrayIcon, PlusIcon } from "@heroicons/react/24/outline";

import SessionsData from "@/data/sessions.json";
import { useParams } from "react-router-dom";
import path from "@/constants/path";

import { Bookmark, CornerUpRight, Download, Eye, FileText, Star, Video } from "lucide-react";

// dữ liệu chương trình
import { programs } from "@/data/programs";
import { toast } from "react-toastify";
import ProgramBreadcrumb from "@/components/Program/ProgramBreadcrumb";
import ProgramHeaderInfo from "@/components/Program/ProgramHeaderInfo";
import ProgramTabs from "@/components/Program/ProgramTabs";

const sessions = SessionsData as {
  id: number;
  topic: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  tutor: string;
  avatar: string;
  status: string;
}[];

export default function Sessions() {
  const { programId } = useParams<{ programId?: string }>();

  // lấy id từ URL /student/session/:programID, mặc định = 1
  const programID = Number(programId ?? 1);
  const program = programs.find((p) => p.id === programID);

  const programTitle = program?.title ?? "Lập trình Python Nâng cao";

  // chỉ khóa Python (id = 1) mới có dữ liệu buổi tư vấn mock
  const isPythonProgram = program?.id === 1;

  const MEET_URL = "https://meet.google.com/tow-zzir-waj";

  const handleJoinMeet = () => {
    toast.info("Bắt đầu buổi tư vấn...");
    window.open(MEET_URL, "_blank", "noopener,noreferrer");
  };

  // ====== FILTER BUỔI TƯ VẤN ======
  type FilterType = "upcoming" | "completed" | "all";
  const [filter, setFilter] = React.useState<FilterType>("upcoming");

  // mọi status có chữ "hoàn thành" được xem là đã hoàn thành
  const isSessionCompleted = React.useCallback((status: string) => {
    const normalized = status.toLowerCase();
    return normalized.includes("hoàn thành");
  }, []);

  const filteredSessions = React.useMemo(() => {
    if (!isPythonProgram) return [];
    return sessions.filter((s) => {
      const done = isSessionCompleted(s.status);
      if (filter === "upcoming") return !done;
      if (filter === "completed") return done;
      return true;
    });
  }, [filter, isPythonProgram, isSessionCompleted]);

  // ====== MODAL YÊU CẦU BUỔI TƯ VẤN MỚI ======
  const [isRequestModalOpen, setIsRequestModalOpen] = React.useState(false);
  const [requestTopic, setRequestTopic] = React.useState("");
  const [requestNote, setRequestNote] = React.useState("");
  const [requestPreferredTime, setRequestPreferredTime] = React.useState("");

  const sendSessionRequest = (payload: { programId: number; topic: string; note: string; preferredTime: string }) => {
    return new Promise<void>((resolve) => {
      console.log("Sending session request:", payload);
      setTimeout(resolve, 400);
    });
  };

  const handleSubmitRequest = async () => {
    if (!requestTopic.trim()) {
      toast.error("Vui lòng nhập chủ đề buổi tư vấn.");
      return;
    }

    try {
      await sendSessionRequest({
        programId: programID,
        topic: requestTopic.trim(),
        note: requestNote.trim(),
        preferredTime: requestPreferredTime.trim(),
      });

      toast.success("Yêu cầu buổi tư vấn đã được gửi đến tutor.");
      setIsRequestModalOpen(false);
      setRequestTopic("");
      setRequestNote("");
      setRequestPreferredTime("");
    } catch {
      toast.error("Không thể gửi yêu cầu. Vui lòng thử lại sau.");
    }
  };

  const handleOpenRequestModal = () => {
    setIsRequestModalOpen(true);
  };

  const handleCloseRequestModal = () => {
    setIsRequestModalOpen(false);
  };

  return (
    <>
      <div className='min-h-screen bg-gray-50 pb-12'>
        <ProgramBreadcrumb backLink={path.studentPrograms} currentTitle={programTitle} />

        <div className='container mx-auto mt-6 px-4'>
          {/* Container trắng bao quanh Header và Tabs */}
          <div className='overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm'>
            {/* Header Info */}
            <ProgramHeaderInfo
              title={programTitle}
              subtitle={`với ${program?.mainTutor.name ?? "TS. Trần Minh Đức"}`}
              statusLabel='Đang hoạt động'
              metaText={`Tiến độ: ${String(program?.progress ?? 65)}%`}
              progress={program?.progress ?? 65}
              actions={
                <>
                  <button className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700'>
                    <Bookmark className='h-4 w-4' /> Lưu chương trình
                  </button>
                  <button className='flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700'>
                    <CornerUpRight className='h-4 w-4' /> Chia sẻ
                  </button>
                  <button className='flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50'>
                    <Download className='h-4 w-4' /> Xuất file
                  </button>
                </>
              }
            />

            {/* Tabs */}
            <ProgramTabs activeTab='docs' programId={programID} />
          </div>

          {/* Nội dung Tab */}
          <div className='mt-6'>
            <div className='grid grid-cols-1 items-start gap-8 lg:grid-cols-3'>
              {/* LEFT – session list */}
              <div className='flex flex-col gap-6 lg:col-span-2'>
                {/* FILTER BAR + BUTTON TRÊN CÙNG (đều nằm bên phải) */}
                <div className='mb-2 flex items-center justify-end gap-3'>
                  <select
                    value={filter}
                    aria-label='Lọc buổi tư vấn'
                    onChange={(e) => {
                      setFilter(e.target.value as FilterType);
                    }}
                    className='h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                  >
                    <option value='upcoming'>Buổi sắp tới</option>
                    <option value='completed'>Buổi đã hoàn thành</option>
                    <option value='all'>Tất cả buổi tư vấn</option>
                  </select>

                  <button
                    type='button'
                    className='inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700'
                    onClick={handleOpenRequestModal}
                  >
                    <PlusIcon className='h-4 w-4' />
                    Yêu cầu buổi tư vấn mới
                  </button>
                </div>

                {isPythonProgram ? (
                  filteredSessions.length > 0 ? (
                    filteredSessions.map((s) => {
                      const done = isSessionCompleted(s.status);
                      const isRunning = s.status.toLowerCase().includes("đang diễn ra");

                      return (
                        <div
                          key={s.id}
                          className='rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md'
                        >
                          {/* TITLE + STATUS + ACTION ICONS */}
                          <div className='flex items-start justify-between'>
                            <div>
                              <div className='flex items-center gap-3'>
                                <h2 className='text-base font-semibold text-slate-900'>{s.topic}</h2>
                                <span
                                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                                    done
                                      ? "bg-emerald-50 text-emerald-700"
                                      : isRunning
                                        ? "bg-blue-50 text-blue-600"
                                        : "bg-slate-100 text-slate-600"
                                  }`}
                                >
                                  {s.status}
                                </span>
                              </div>
                              <p className='mt-1 text-sm text-slate-600'>{s.description}</p>
                            </div>

                            <div className='mt-1 flex items-center gap-2 text-slate-400'>
                              <button
                                type='button'
                                aria-label='Xem chi tiết'
                                className='rounded-full p-1 hover:bg-slate-100 hover:text-slate-600'
                              >
                                <Eye className='h-4 w-4' />
                              </button>
                              <button
                                type='button'
                                aria-label='Xuất file'
                                className='rounded-full p-1 hover:bg-slate-100 hover:text-slate-600'
                              >
                                <ArrowDownTrayIcon className='h-4 w-4' />
                              </button>
                            </div>
                          </div>

                          {/* INFO ROW */}
                          <div className='mt-3 flex flex-wrap items-center gap-6 text-sm text-slate-600'>
                            <div className='flex items-center gap-1'>
                              <CalendarIcon className='h-4 w-4 text-slate-500' />
                              <span>{s.date}</span>
                            </div>

                            <div className='flex items-center gap-1'>
                              <ClockIcon className='h-4 w-4 text-slate-500' />
                              <span>{s.time}</span>
                            </div>

                            <div className='flex items-center gap-1'>
                              <ClockIcon className='h-4 w-4 text-slate-500' />
                              <span>{s.duration} phút</span>
                            </div>
                          </div>

                          {/* DIVIDER */}
                          <div className='mt-3 border-t border-slate-100' />

                          {/* BOTTOM ROW */}
                          {done ? (
                            <div className='mt-3 flex items-center justify-between text-sm'>
                              <div className='flex items-center gap-2'>
                                <div className='flex h-7 w-7 items-center justify-center rounded-full bg-slate-200'>
                                  {s.avatar}
                                </div>
                                <span className='text-sm text-slate-700'>với {s.tutor}</span>
                              </div>

                              <div className='flex items-center gap-4 text-xs font-medium'>
                                <button
                                  type='button'
                                  className='flex items-center gap-1 text-blue-600 hover:text-blue-700'
                                >
                                  <Star className='h-4 w-4 fill-blue-600 text-blue-600' />
                                  <span>Đánh giá</span>
                                </button>
                                <button
                                  type='button'
                                  className='flex items-center gap-1 text-blue-600 hover:text-blue-700'
                                >
                                  <FileText className='h-4 w-4' />
                                  <span>Ghi chú</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className='mt-3 flex items-center justify-between text-sm'>
                              <div className='flex items-center gap-2'>
                                <div className='flex h-7 w-7 items-center justify-center rounded-full bg-slate-200'>
                                  {s.avatar}
                                </div>
                                <span className='text-sm text-slate-700'>với {s.tutor}</span>
                              </div>

                              <div className='flex items-center gap-4'>
                                {isRunning ? (
                                  <button
                                    type='button'
                                    className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700'
                                    onClick={handleJoinMeet}
                                  >
                                    <PlayIcon className='h-4 w-4' />
                                    Tham gia ngay
                                  </button>
                                ) : (
                                  <button
                                    type='button'
                                    className='flex items-center gap-2 rounded-lg border border-blue-500 px-4 py-1.5 text-blue-600 hover:bg-blue-50'
                                    onClick={() => toast.info(`Buổi tư vấn "${s.topic}" đã được thêm vào lịch.`)}
                                  >
                                    <CalendarIcon className='h-4 w-4' />
                                    Thêm vào lịch
                                  </button>
                                )}

                                <button
                                  type='button'
                                  className='flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:text-slate-900'
                                  onClick={() => toast.info(`Đã đặt nhắc nhở cho buổi tư vấn "${s.topic}" (giả lập).`)}
                                >
                                  <BellIcon className='h-4 w-4' />
                                  Đặt nhắc nhở
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className='rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500'>
                      Không có buổi tư vấn nào phù hợp với bộ lọc hiện tại.
                    </div>
                  )
                ) : (
                  <div className='rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500'>
                    Hiện chưa có buổi tư vấn nào cho chương trình này. Thông tin sẽ được cập nhật sau.
                  </div>
                )}
              </div>

              {/* RIGHT SIDEBAR */}
              <div className='flex flex-col gap-6 lg:sticky lg:top-24'>
                {/* Statistics */}
                <div className='rounded-2xl border bg-white p-6 shadow-sm'>
                  <h3 className='mb-4 text-lg font-semibold'>Thông số</h3>

                  <div className='space-y-3 text-sm'>
                    <div className='flex justify-between'>
                      <span className='text-slate-600'>Số buổi</span>
                      <span className='font-bold text-slate-900'>{isPythonProgram ? 12 : "—"}</span>
                    </div>

                    <div className='flex justify-between'>
                      <span className='text-slate-600'>Đã hoàn thành</span>
                      <span className='font-bold text-green-600'>{isPythonProgram ? 4 : "—"}</span>
                    </div>

                    <div className='flex justify-between'>
                      <span className='text-slate-600'>Sắp tới</span>
                      <span className='font-bold text-blue-600'>{isPythonProgram ? 3 : "—"}</span>
                    </div>

                    <div className='flex justify-between'>
                      <span className='text-slate-600'>Tổng thời gian</span>
                      <span className='font-bold text-slate-900'>{isPythonProgram ? "18.5" : "—"}</span>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className='rounded-2xl border bg-white p-6 shadow-sm'>
                  <h3 className='mb-4 text-lg font-semibold'>Các hành động</h3>

                  <div className='flex flex-col gap-3 text-sm'>
                    <button
                      className='mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700'
                      type='button'
                      onClick={handleOpenRequestModal}
                    >
                      <PlusIcon className='h-4 w-4' />
                      Yêu cầu buổi tư vấn mới
                    </button>

                    <button className='w-full rounded-xl border px-4 py-2 text-slate-700 hover:bg-slate-50'>
                      Xem tất cả buổi tư vấn
                    </button>

                    <button className='flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2 text-slate-700 hover:bg-slate-50'>
                      <ArrowDownTrayIcon className='h-4 w-4' />
                      Xuất file
                    </button>
                  </div>
                </div>

                {/* Next Session */}
                <div className='rounded-2xl border bg-white p-6 shadow-sm'>
                  <h3 className='mb-4 text-lg font-semibold'>Next Session</h3>

                  {isPythonProgram ? (
                    <div className='rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm'>
                      <p className='font-semibold text-slate-900'>Cấu trúc dữ liệu nâng cao</p>
                      <p className='text-slate-600'>Hôm nay, 14:00 - 15:30</p>
                      <p className='text-slate-600'>Với TS. Nguyễn Minh Hoàng</p>

                      <button
                        className='mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700'
                        type='button'
                        onClick={handleJoinMeet}
                      >
                        <Video className='h-6 w-6' />
                        Tham gia buổi tư vấn
                      </button>
                    </div>
                  ) : (
                    <div className='rounded-xl border border-dashed border-blue-200 bg-blue-50 p-4 text-sm text-slate-600'>
                      Thông tin buổi tư vấn tiếp theo cho chương trình này sẽ được cập nhật sau.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL YÊU CẦU BUỔI TƯ VẤN MỚI */}
      {isRequestModalOpen && (
        <div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-gray-900'>
          <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-xl'>
            <h3 className='text-lg font-semibold text-gray-900'>Yêu cầu buổi tư vấn mới</h3>
            <p className='mt-2 text-sm text-gray-500'>
              Điền thông tin buổi tư vấn mà bạn muốn đề xuất cho tutor. Yêu cầu chỉ được gửi, chưa hiển thị trong danh
              sách buổi tư vấn.
            </p>

            <div className='mt-4 space-y-4'>
              <div>
                <label htmlFor='request-topic' className='mb-1 block text-sm font-medium text-gray-700'>
                  Chủ đề <span className='text-red-500'>*</span>
                </label>
                <input
                  id='request-topic'
                  type='text'
                  value={requestTopic}
                  onChange={(e) => {
                    setRequestTopic(e.target.value);
                  }}
                  className='w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-blue-500'
                  placeholder='Ví dụ: Ôn tập trước kỳ giữa kỳ'
                />
              </div>

              <div>
                <label htmlFor='request-note' className='mb-1 block text-sm font-medium text-gray-700'>
                  Nội dung trao đổi
                </label>
                <textarea
                  id='request-note'
                  rows={3}
                  value={requestNote}
                  onChange={(e) => {
                    setRequestNote(e.target.value);
                  }}
                  className='w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-blue-500'
                  placeholder='Mô tả ngắn về chủ đề bạn muốn trao đổi...'
                />
              </div>

              <div>
                <label htmlFor='request-preferred-time' className='mb-1 block text-sm font-medium text-gray-700'>
                  Thời gian mong muốn (tuỳ chọn)
                </label>
                <input
                  id='request-preferred-time'
                  type='text'
                  value={requestPreferredTime}
                  onChange={(e) => {
                    setRequestPreferredTime(e.target.value);
                  }}
                  className='w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-blue-500'
                  placeholder='Ví dụ: Tối thứ 5, sau 19:00'
                />
              </div>
            </div>

            <div className='mt-6 flex justify-end space-x-3'>
              <button
                type='button'
                onClick={handleCloseRequestModal}
                className='rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50'
              >
                Hủy
              </button>
              <button
                type='button'
                onClick={() => {
                  void handleSubmitRequest();
                }}
                disabled={!requestTopic.trim()}
                className='rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:bg-blue-300'
              >
                Gửi yêu cầu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
