import React from "react";
import { CalendarIcon, ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import SessionsData from "@/data/sessions.json";
import { useParams } from "react-router-dom";
import path from "@/constants/path";
import { Bookmark, CornerUpRight, Download, Users, Video } from "lucide-react";
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

export default function TutorSessions() {
  const { programId } = useParams<{ programId?: string }>();
  const programID = Number(programId ?? 1);
  const program = programs.find((p) => p.id === programID);
  const programTitle = program?.title ?? "Lập trình Python Nâng cao";
  const isPythonProgram = program?.id === 1;

  const MEET_URL = "https://meet.google.com/tow-zzir-waj";

  const handleJoinMeet = () => {
    toast.info("Bắt đầu buổi tư vấn...");
    window.open(MEET_URL, "_blank", "noopener,noreferrer");
  };

  type FilterType = "upcoming" | "completed" | "all";
  const [filter, setFilter] = React.useState<FilterType>("upcoming");
  const [showScheduleModal, setShowScheduleModal] = React.useState(false);
  const [newSessionTopic, setNewSessionTopic] = React.useState("");
  const [newSessionDate, setNewSessionDate] = React.useState("");
  const [newSessionTime, setNewSessionTime] = React.useState("");
  const [newSessionDuration, setNewSessionDuration] = React.useState("60");

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

  const handleCreateSession = async () => {
    if (!newSessionTopic.trim() || !newSessionDate || !newSessionTime) {
      toast.error("Vui lòng điền đầy đủ thông tin buổi tư vấn.");
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 400));
      toast.success("Buổi tư vấn mới đã được tạo thành công!");
      setShowScheduleModal(false);
      setNewSessionTopic("");
      setNewSessionDate("");
      setNewSessionTime("");
      setNewSessionDuration("60");
    } catch {
      toast.error("Không thể tạo buổi tư vấn. Vui lòng thử lại sau.");
    }
  };

  const handleCancelSession = (sessionId: number) => {
    toast.warning(`Đã hủy buổi tư vấn #${String(sessionId)}`);
  };

  return (
    <>
      <div className='min-h-screen bg-gray-50 pb-12'>
        <ProgramBreadcrumb backLink={path.tutorProgramList} currentTitle={programTitle} />

        <div className='container mx-auto mt-6 px-4'>
          <div className='overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm'>
            <ProgramHeaderInfo
              title={programTitle}
              subtitle='Quản lý buổi tư vấn'
              statusLabel='Đang hoạt động'
              metaText='15 học viên đã đăng ký'
              progress={undefined}
              actions={
                <>
                  <button className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700'>
                    <Bookmark className='h-4 w-4' /> Lưu lịch
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

            <ProgramTabs activeTab='docs' programId={programID} userRole='tutor' />
          </div>

          <div className='mt-6'>
            <div className='grid grid-cols-1 items-start gap-8 lg:grid-cols-3'>
              <div className='flex flex-col gap-6 lg:col-span-2'>
                {/* FILTER BAR */}
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
                    className='inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700'
                    onClick={() => {
                      setShowScheduleModal(true);
                    }}
                  >
                    <CalendarIcon className='h-4 w-4' />
                    Tạo buổi tư vấn mới
                  </button>
                </div>

                {/* SESSION LIST */}
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
                          <div className='flex items-start justify-between'>
                            <div className='flex-1'>
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

                              <p className='mt-2 text-sm text-slate-600'>{s.description}</p>

                              <div className='mt-3 flex flex-wrap gap-4 text-xs text-slate-500'>
                                <span className='flex items-center gap-1.5'>
                                  <CalendarIcon className='h-4 w-4' />
                                  {s.date}
                                </span>
                                <span className='flex items-center gap-1.5'>
                                  <ClockIcon className='h-4 w-4' />
                                  {s.time} ({s.duration} phút)
                                </span>
                                <span className='flex items-center gap-1.5'>
                                  <Users className='h-4 w-4' />3 học viên đã đăng ký
                                </span>
                              </div>

                              {/* TUTOR ACTIONS */}
                              <div className='mt-4 flex items-center gap-2'>
                                {!done && (
                                  <>
                                    <button
                                      onClick={handleJoinMeet}
                                      className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
                                    >
                                      <Video className='h-4 w-4' />
                                      Vào phòng
                                    </button>
                                    <button
                                      onClick={() => {
                                        handleCancelSession(s.id);
                                      }}
                                      className='flex items-center gap-2 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200'
                                    >
                                      <XMarkIcon className='h-4 w-4' />
                                      Hủy buổi
                                    </button>
                                  </>
                                )}
                                {done && (
                                  <button className='flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50'>
                                    <Download className='h-4 w-4' />
                                    Xem báo cáo
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className='rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500'>
                      Không có buổi tư vấn nào trong danh mục này.
                    </div>
                  )
                ) : (
                  <div className='rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500'>
                    Chương trình này chưa có buổi tư vấn.
                  </div>
                )}
              </div>

              {/* RIGHT SIDEBAR */}
              <div className='rounded-xl border border-slate-100 bg-white p-6 shadow-sm'>
                <h3 className='mb-4 text-lg font-semibold text-slate-900'>Thống kê buổi tư vấn</h3>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-4'>
                    <span className='text-sm text-slate-600'>Tổng số buổi</span>
                    <span className='text-xl font-bold text-slate-900'>{sessions.length}</span>
                  </div>
                  <div className='flex items-center justify-between rounded-lg border border-blue-100 bg-blue-50 p-4'>
                    <span className='text-sm text-blue-700'>Sắp diễn ra</span>
                    <span className='text-xl font-bold text-blue-700'>
                      {sessions.filter((s) => !isSessionCompleted(s.status)).length}
                    </span>
                  </div>
                  <div className='flex items-center justify-between rounded-lg border border-emerald-100 bg-emerald-50 p-4'>
                    <span className='text-sm text-emerald-700'>Đã hoàn thành</span>
                    <span className='text-xl font-bold text-emerald-700'>
                      {sessions.filter((s) => isSessionCompleted(s.status)).length}
                    </span>
                  </div>
                </div>

                <div className='mt-6'>
                  <h4 className='mb-3 text-sm font-semibold text-slate-900'>Học viên đăng ký nhiều nhất</h4>
                  <ul className='space-y-2 text-sm text-slate-600'>
                    <li className='flex items-center justify-between'>
                      <span>Nguyễn Văn A</span>
                      <span className='font-medium text-slate-900'>8 buổi</span>
                    </li>
                    <li className='flex items-center justify-between'>
                      <span>Trần Thị B</span>
                      <span className='font-medium text-slate-900'>6 buổi</span>
                    </li>
                    <li className='flex items-center justify-between'>
                      <span>Lê Văn C</span>
                      <span className='font-medium text-slate-900'>5 buổi</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CREATE SESSION MODAL */}
      {showScheduleModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div className='w-full max-w-lg rounded-xl bg-white p-6 shadow-xl'>
            <h2 className='mb-4 text-2xl font-bold text-slate-900'>Tạo buổi tư vấn mới</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void handleCreateSession();
              }}
            >
              <div className='space-y-4'>
                <div>
                  <label className='mb-1 block text-sm font-medium text-slate-700'>Chủ đề</label>
                  <input
                    type='text'
                    value={newSessionTopic}
                    onChange={(e) => {
                      setNewSessionTopic(e.target.value);
                    }}
                    className='w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
                    required
                    placeholder='Nhập chủ đề buổi tư vấn'
                    title='Chủ đề buổi tư vấn'
                  />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='mb-1 block text-sm font-medium text-slate-700'>Ngày</label>
                    <input
                      type='date'
                      value={newSessionDate}
                      onChange={(e) => {
                        setNewSessionDate(e.target.value);
                      }}
                      className='w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
                      required
                      title='Ngày buổi tư vấn'
                    />
                  </div>
                  <div>
                    <label className='mb-1 block text-sm font-medium text-slate-700'>Giờ</label>
                    <input
                      type='time'
                      value={newSessionTime}
                      onChange={(e) => {
                        setNewSessionTime(e.target.value);
                      }}
                      className='w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
                      required
                      title='Giờ buổi tư vấn'
                    />
                  </div>
                </div>
                <div>
                  <label className='mb-1 block text-sm font-medium text-slate-700'>Thời lượng (phút)</label>
                  <select
                    value={newSessionDuration}
                    onChange={(e) => {
                      setNewSessionDuration(e.target.value);
                    }}
                    className='w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
                    title='Thời lượng buổi tư vấn'
                  >
                    <option value='30'>30 phút</option>
                    <option value='45'>45 phút</option>
                    <option value='60'>60 phút</option>
                    <option value='90'>90 phút</option>
                    <option value='120'>120 phút</option>
                  </select>
                </div>
              </div>
              <div className='mt-6 flex justify-end gap-3'>
                <button
                  type='button'
                  onClick={() => {
                    setShowScheduleModal(false);
                  }}
                  className='rounded-lg border border-slate-300 bg-white px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50'
                  title='Hủy tạo buổi tư vấn'
                >
                  Hủy
                </button>
                <button
                  type='submit'
                  className='rounded-lg bg-emerald-600 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-700'
                >
                  Tạo buổi tư vấn
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
