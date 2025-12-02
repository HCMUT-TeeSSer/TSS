// MeetList.tsx
import React, { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { programs } from "@/data/programs";
import { Check, Plus, X, Video, Calendar, Clock, GraduationCap, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

// Imports từ các file cùng folder đã tách
import { type Meet, type MeetData, type MeetListProps } from "@/data/meets";
import { meets } from "@/data/meets"; // Dữ liệu tĩnh
import { updateMeetStatus, getBoxClass, getSentTimeAgo, parseDateTime, isThisWeek } from "./util";
import NewMeetModal from "./NewMeetModal";
import RejectModal from "./RejectModal";

const filterOptions = [
  { value: "all", label: "Tất cả lịch hẹn" },
  { value: "approved", label: "Lịch hẹn đã duyệt" },
  { value: "pending", label: "Lịch hẹn chưa duyệt" },
];

const MeetList: React.FC<MeetListProps> = ({ userRole, programId }) => {
  const { user } = useAuth();
  const [Meets, setMeets] = useState<Meet[]>([]);
  const [allMeets, setAllMeets] = useState<Meet[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "approved" | "pending">("all");
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isNewMeetModalOpen, setIsNewMeetModalOpen] = useState(false);
  const [selectedMeetId, setSelectedMeetId] = useState<number | null>(null);
  const [editingMeet, setEditingMeet] = useState<MeetData | undefined>(undefined);

  useEffect(() => {
    const loadMeets = async () => {
      try {
        setLoading(true);
        const data = await new Promise<Meet[]>((resolve) => setTimeout(() => resolve([...meets]), 500));

        let filteredData = data.filter((app) => app.status !== "rejected");
        filteredData = filteredData.filter((app) => app.programId === programId);
        
        if (user?.fullName) {
          if (userRole === "mentee") {
            filteredData = filteredData.filter((app) => app.menteeName === user.fullName);
          } else {
            filteredData = filteredData.filter((app) => app.tutorName === user.fullName);
          }
        }

        const now = new Date();
        const futureMeets = filteredData.filter((app) => {
          const endDateTime = parseDateTime(app.date, app.endTime);
          return endDateTime > now;
        });

        setAllMeets(filteredData);
        setMeets(futureMeets);
      } catch {
        toast.error("Không thể tải danh sách lịch hẹn.");
      } finally {
        setLoading(false);
      }
    };
    void loadMeets();
  }, [programId, userRole, user]);

  if (loading) {
    return <Loading />;
  }

  const getNextMeet = () => {
    const now = new Date();
    const approved = Meets.filter((m) => m.status === "approved");

    const upcoming = approved
      .map((m) => {
        const startDateTime = parseDateTime(m.date, m.beginTime);
        return { ...m, startDateTime };
      })
      .filter((m) => m.startDateTime && m.startDateTime > now)
      .sort((a, b) => a.startDateTime.getTime() - b.startDateTime.getTime());

    return upcoming.length > 0 ? upcoming[0] : null;
  };

  const nextMeet = getNextMeet();

  const getDaysUntilLabel = (targetDate: Date) => {
    const now = new Date();
    const diffTime = targetDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Hôm nay";
    if (diffDays === 1) return "Ngày mai";
    return `Trong ${String(diffDays)} ngày`;
  };

  const handleAction = async (id: number, status: "approved" | "rejected" | "deleted", reason?: string) => {
    try {
      await updateMeetStatus(id, status, reason);
      const updateMeetList = (list: Meet[]) => {
        return list
          .map((app) => {
            if (app.id === id) {
              return {
                ...app,
                status: status === "deleted" ? "rejected" : status,
                reason: status === "rejected" ? (reason ?? "") : status === "approved" ? "Đã đồng ý" : app.reason,
              };
            }
            return app;
          })
          .filter((app) => status !== "deleted" || app.id !== id);
      };

      setMeets(updateMeetList(Meets));
      setAllMeets(updateMeetList(allMeets));

      const actionText = status === "approved" ? "duyệt" : status === "rejected" ? "từ chối" : "xóa";
      toast.success(`Lịch hẹn đã được ${actionText}!`);
    } catch {
      toast.error("Thao tác thất bại.");
    }
  };

  const handleAcceptMeetDelete = (id: number) => {
    setSelectedMeetId(id);
    setIsRejectModalOpen(true);
  };

  const handleTutorReject = (id: number) => {
    void handleAction(id, "rejected", "Tutor đã từ chối.");
  };

  const handleRejectConfirm = (reason: string) => {
    if (selectedMeetId !== null) {
      void handleAction(selectedMeetId, "rejected", reason);
    }
    setSelectedMeetId(null);
  };

  const handleTutorApprove = (id: number) => {
    void handleAction(id, "approved");
  };

  const handlementeeDelete = (id: number) => {
    void handleAction(id, "deleted");
  };

  const handleEditMeet = (id: number) => {
    const meetToEdit = Meets.find((m) => m.id === id);
    if (meetToEdit) {
      setEditingMeet({
        id: meetToEdit.id,
        topic: meetToEdit.topic,
        date: meetToEdit.date,
        describe: meetToEdit.describe,
        beginTime: meetToEdit.beginTime,
        endTime: meetToEdit.endTime,
      });
      setIsNewMeetModalOpen(true);
    }
  };

  const handleNewMeetConfirm = (data: MeetData) => {
    if (data.id) {
      const updatedMeets = Meets.map((meet) => {
        if (meet.id === data.id) {
          return {
            ...meet,
            topic: data.topic,
            describe: data.describe,
            date: data.date,
            beginTime: data.beginTime,
            endTime: data.endTime,
          };
        }
        return meet;
      });
      setMeets(updatedMeets);
      toast.success("Đã cập nhật thông tin lịch hẹn.");
    } else {
      const currentProgram = programs.find((p) => p.id === programId);
      const CURRENT_TUTOR_NAME = currentProgram?.mainTutor.name ?? "Giảng viên";
      const CURRENT_MENTEE_NAME = user?.fullName ?? "Học viên";

      const newApp: Meet = {
        id: Date.now(),
        programId: programId,
        type: userRole === "mentee" ? "mentee" : "tutor",
        status: "pending",
        tutorName: CURRENT_TUTOR_NAME,
        menteeName: CURRENT_MENTEE_NAME,
        topic: data.topic,
        describe: data.describe,
        createAt: new Date().toISOString(),
        date: data.date,
        beginTime: data.beginTime,
        endTime: data.endTime,
        subject: "Khoa học máy tính",
        reason: "Chưa duyệt",
      };
      setMeets([newApp, ...Meets]);
      toast.success("Đã tạo lịch hẹn mới, đang chờ duyệt.");
    }
  };

  const filteredMeets = Meets.filter((app) => {
    if (app.status === "rejected") return false;
    if (filter === "all") return true;
    return app.status === filter;
  });

  const pendingMeets = Meets.filter((app) => app.status === "pending");
  const approvedMeets = Meets.filter((app) => app.status === "approved");

  const getMeetLabel = (app: Meet) => {
    if (app.status === "approved") return "Đã đồng ý";
    if (app.status === "pending") return "Chờ duyệt";
    return "Lịch hẹn đã từ chối";
  };

  const getStatusClass = (status: Meet["status"]) => {
    if (status === "approved") return "bg-green-100 text-green-700";
    if (status === "pending") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const renderMeetItem = (app: Meet) => (
    <div key={app.id} className={`mb-6 rounded-lg border p-4 shadow-sm ${getBoxClass(app.status)}`}>
      <div className='flex justify-between'>
        <div className='flex items-center space-x-3'>
          <span className={`h-2.5 w-2.5 rounded-full ${app.status === "approved" ? "bg-green-500" : "bg-red-500"}`} />
          <h4 className='text-md font-semibold text-gray-900'>{app.menteeName}</h4>
          <span className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium ${getStatusClass(app.status)}`}>
            {getMeetLabel(app)}
          </span>
        </div>

        {userRole === "mentee" && (
          <div className='space-x-2'>
            {app.status === "pending" && (
              <>
                <button
                  onClick={() => handleEditMeet(app.id)}
                  className='rounded-lg bg-yellow-600 px-3 py-1 text-sm font-medium text-white shadow-sm hover:bg-yellow-700'
                >
                  Điều chỉnh
                </button>
                <button
                  onClick={() => handlementeeDelete(app.id)}
                  className='rounded-lg bg-red-100 px-3 py-1 text-sm font-medium text-red-700 shadow-sm hover:bg-red-200'
                >
                  Xóa
                </button>
              </>
            )}
          </div>
        )}

        {app.status === "approved" && (
          <div className='space-x-2'>
            <button
              onClick={() => handleAcceptMeetDelete(app.id)}
              className='rounded-lg bg-red-100 px-3 py-1 text-sm font-medium text-red-700 shadow-sm hover:bg-red-200'
            >
              Xóa
            </button>
          </div>
        )}
      </div>

      <div className='mt-3 flex items-center justify-between text-sm'>
        <p className='flex-1'><span className='text-sm font-medium'></span> {app.topic}</p>
      </div>

      <div className='mt-2 flex items-center justify-between text-sm text-gray-600'>
        <p className='flex-1'>{app.describe}</p>
      </div>

      <div className='mt-2 flex items-center space-x-10 text-sm text-gray-600'>
        <div className='flex items-center space-x-1'><Calendar className='h-4 w-4 text-gray-500' />
          {/* <p>{app.date}</p> */}
          <p>{app.date.split("-").reverse().join("/")}</p>
        </div>
        <div className='flex items-center space-x-1'><Clock className='h-4 w-4 text-gray-500' /><p>{app.beginTime} - {app.endTime}</p></div>
        <div className='flex items-center space-x-1'><GraduationCap className='h-4 w-4 text-gray-500' /><p>{app.subject}</p></div>
      </div>

      {userRole === "mentee" && app.status === "pending" && (
        <div className='mt-4 flex items-center justify-between border-t border-gray-200 pt-3'>
          <div className='flex items-center space-x-1 text-sm font-medium text-gray-600'>
            <Clock className='h-5 w-5' /><span>Đang chờ {app.tutorName} duyệt</span>
          </div>
        </div>
      )}

      {userRole === "tutor" && app.status === "pending" && (
        <div className='mt-4 flex items-center justify-between border-t border-gray-200 pt-3'>
          <div className='flex items-center space-x-1 text-sm font-medium text-gray-600'>
            <Clock className='h-5 w-5' /><span>Yêu cầu {getSentTimeAgo(app.createAt)}</span>
          </div>
          <div className='flex items-center space-x-5'>
            <button
              onClick={() => handleTutorReject(app.id)}
              className='inline-flex items-center rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-200'
            >
              <X className='mr-2 h-4 w-4' /> Từ chối
            </button>
            <button
              onClick={() => handleTutorApprove(app.id)}
              className='inline-flex items-center rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-700 shadow-sm hover:bg-green-200'
            >
              <Check className='mr-2 h-4 w-4' /> Đồng ý
            </button>
          </div>
        </div>
      )}

      {app.status === "approved" && (
        <div className='mt-4 flex items-center justify-between border-t border-gray-200 pt-3'>
          {userRole === "mentee" && (
            <div className='flex items-center space-x-1 text-sm font-medium text-green-600'>
              <Check className='h-5 w-5' /><span>Đã được {app.tutorName} đồng ý</span>
            </div>
          )}
          {userRole === "tutor" && (
            <div className='flex items-center space-x-1 text-sm font-medium text-green-600'>
              <Check className='h-5 w-5' /><span>Liên kết cuộc họp đã được tạo</span>
            </div>
          )}
          <button
            onClick={() => window.open("https://meet.google.com/sah-uyrf-fqn", "_blank")}
            className='inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700'
          >
            <Video className='mr-2 h-4 w-4' /> Bắt đầu cuộc họp
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className='bg-gray-50 p-6'>
      <div className='flex space-x-6'>
        <div className='flex-1'>
          <div className='mb-4 flex items-center justify-between'>
            <h3 className='mb-4 text-xl font-bold text-gray-900'>Lịch hẹn</h3>
            <div className='mb-4 flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <label htmlFor='filter' className='sr-only'>Lọc</label>
                <select
                  id='filter'
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as "all" | "approved" | "pending")}
                  className='rounded-lg border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500'
                >
                  {filterOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>

                {userRole === "mentee" && (
                  <button
                    onClick={() => {
                      setEditingMeet(undefined);
                      setIsNewMeetModalOpen(true);
                    }}
                    className='inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700'
                  >
                    <Plus className='mr-2 h-4 w-4' /> Tạo lịch hẹn
                  </button>
                )}

                {userRole === "tutor" && (
                  <span className='inline-flex items-center rounded-lg bg-red-100 px-3 py-1 text-sm font-medium text-red-700'>
                    <Clock className='mr-2 h-4 w-4' /> {Meets.filter((a) => a.status === "pending").length} đang chờ
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className='space-y-8'>
            {filter === "all" ? (
              <>
                {pendingMeets.length > 0 && (
                  <div className='space-y-4 rounded-lg border border-gray-300 bg-white p-4 shadow-md'>
                    <div className='flex items-center space-x-2 text-red-600'>
                      <AlertCircle className='h-6 w-6' /><h4 className='text font-bold text-gray-800'>Lịch hẹn chưa duyệt</h4>
                    </div>
                    <div className='space-y-4'>{pendingMeets.map(renderMeetItem)}</div>
                  </div>
                )}
                {approvedMeets.length > 0 && (
                  <div className='space-y-4 rounded-lg border border-gray-300 bg-white p-4 shadow-md'>
                    <div className='flex items-center space-x-2 text-green-600'>
                      <CheckCircle className='h-6 w-6' /><h4 className='text font-bold text-gray-800'>Lịch hẹn hiện tại</h4>
                    </div>
                    <div className='space-y-4'>{approvedMeets.map(renderMeetItem)}</div>
                  </div>
                )}
                {pendingMeets.length === 0 && approvedMeets.length === 0 && (
                  <div className='rounded-lg bg-white py-10 text-center text-gray-500 shadow-sm'>Không có lịch hẹn nào phù hợp.</div>
                )}
              </>
            ) : (
              <div className='space-y-6'>
                {filteredMeets.length > 0 ? (
                  filteredMeets.map(renderMeetItem)
                ) : (
                  <div className='rounded-lg bg-white py-10 text-center text-gray-500 shadow-sm'>
                    Không có lịch hẹn nào {filter === "approved" ? "đã duyệt" : "chưa duyệt"}.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className='w-80 space-y-6'>
          {userRole === "mentee" && (
            <div className='rounded-lg bg-white p-4 shadow-md'>
              <h4 className='font-semibold text-gray-900'>Thống kê lịch hẹn</h4>
              <ul className='mt-3 space-y-2 text-sm'>
                <li className='flex justify-between text-gray-600'><span>Tổng số lịch hẹn</span><span className='font-medium text-gray-900'>{Meets.length}</span></li>
                <li className='flex justify-between text-gray-600'><span>Đã được đồng ý</span><span className='font-medium text-green-600'>{Meets.filter((a) => a.status === "approved").length}</span></li>
                <li className='flex justify-between text-gray-600'><span>Chờ phê duyệt</span><span className='font-medium text-yellow-600'>{Meets.filter((a) => a.status === "pending").length}</span></li>
                <li className='flex justify-between text-gray-600'>
                  <span>Hoàn thành</span>
                  <span className='font-medium text-blue-600'>
                    {allMeets.filter((a) => {
                        const endDateTime = parseDateTime(a.date, a.endTime);
                        return a.status === "approved" && endDateTime <= new Date();
                      }).length}
                  </span>
                </li>
              </ul>
            </div>
          )}
          {userRole === "tutor" && (
            <div className='rounded-lg bg-white p-4 shadow-md'>
              <h4 className='font-semibold text-gray-900'>Tổng quan lịch hẹn</h4>
              <ul className='mt-3 space-y-2 text-sm'>
                <li className='flex justify-between text-gray-600'><span>Tổng yêu cầu</span><span className='font-medium text-gray-900'>{allMeets.length}</span></li>
                <li className='flex justify-between text-gray-600'><span>Chờ phê duyệt</span><span className='font-medium text-yellow-600'>{Meets.filter((a) => a.status === "pending").length}</span></li>
                <li className='flex justify-between text-gray-600'><span>Đã đồng ý</span><span className='font-medium text-green-600'>{allMeets.filter((a) => a.status === "approved").length}</span></li>
                <li className='flex justify-between text-gray-600'>
                  <span>Đã hoàn thành</span>
                  <span className='font-medium text-blue-600'>
                    {allMeets.filter((a) => {
                        const endDateTime = parseDateTime(a.date, a.endTime);
                        return a.status === "approved" && endDateTime <= new Date();
                      }).length}
                  </span>
                </li>
                <li className='flex justify-between text-gray-600'>
                  <span>Tuần này</span>
                  <span className='font-medium text-purple-600'>
                    {Meets.filter((a) => a.status === "approved" && isThisWeek(a.date)).length}
                  </span>
                </li>
              </ul>
            </div>
          )}

          <div className='rounded-lg bg-white p-4 shadow-md'>
            <h4 className='font-semibold text-gray-900'>{userRole === "mentee" ? "Lịch rảnh của Tutor" : "Lịch rảnh tuần này"}</h4>
            <div className='mt-3 space-y-2 text-sm'>
              <p className='mb-2 text-gray-500'>{userRole === "mentee" ? "Tutor rảnh vào:" : "Lịch rảnh của tôi trong tuần này:"}</p>
              <div className='flex justify-between rounded-lg bg-gray-50 p-3'><span className='font-medium'>Thứ 2, 04/11</span><span className='text-green-700'>9:00 - 12:00</span></div>
              <div className='flex justify-between rounded-lg bg-gray-50 p-3'><span className='font-medium'>Thứ 3, 05/11</span><span className='text-green-700'>14:00 - 17:00</span></div>
              <div className='flex justify-between rounded-lg bg-gray-50 p-3'><span className='font-medium'>Thứ 6, 08/11</span><span className='text-green-700'>10:00 - 14:00</span></div>
              {userRole === "tutor" && (
                <button
                  onClick={() => toast.info("Tính năng chỉnh sửa lịch rảnh chưa được hiện thực")}
                  className='mt-4 inline-flex w-full justify-center rounded-lg border border-blue-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-blue-50'
                >
                  <Calendar className='mr-2 h-4 w-4' /> Chỉnh sửa lịch rảnh
                </button>
              )}
            </div>
          </div>

          <div className='rounded-lg bg-white p-4 shadow-md'>
            <h4 className='font-semibold text-gray-900'>Lịch hẹn tiếp theo </h4>
            {nextMeet ? (
              <div className='space-y-2 pt-4 text-sm'>
                <div className={`rounded-lg p-3 ${userRole === "mentee" ? "bg-green-50" : "bg-blue-50"}`}>
                  <p className={`font-bold ${userRole === "mentee" ? "text-green-800" : "text-blue-800"}`}>{nextMeet.topic}</p>
                  <p className={`pt-1 text-sm flex flex-wrap items-center gap-1 ${userRole === "mentee" ? "text-green-700" : "text-blue-700"}`}>
                    <span className="font-medium">
                      Thứ {new Date(nextMeet.date).getDay() + 1}, 
                    </span>
                    <span>
                      {nextMeet.date.split("-").reverse().join("/")},
                    </span>
                    <span>
                      {nextMeet.beginTime} - {nextMeet.endTime}
                    </span>
                  </p>
                  <p className={`mt-1 text-sm ${userRole === "mentee" ? "text-green-600" : "text-blue-600"}`}>
                    với {userRole === "mentee" ? nextMeet.tutorName : nextMeet.menteeName}
                  </p>
                  <div className={`mt-2 inline-block rounded px-2 py-1 text-xs font-medium ${userRole === "mentee" ? "bg-green-100 text-green-500" : "bg-blue-100 text-blue-500"}`}>
                    {getDaysUntilLabel(nextMeet.startDateTime!)}
                  </div>
                </div>
                <button
                  onClick={() => window.open("https://meet.google.com/sah-uyrf-fqn", "_blank")}
                  className={`mt-2 inline-flex w-full justify-center rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm ${userRole === "mentee" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                  <Video className='mr-2 h-4 w-4' />
                  {userRole === "mentee" ? "Tham gia khi sẵn sàng" : "Bắt đầu cuộc họp"}
                </button>
              </div>
            ) : (
              <div className='pt-4 text-sm text-gray-500'>Không có lịch hẹn nào sắp tới.</div>
            )}
          </div>
        </div>
      </div>
      <RejectModal isOpen={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)} onConfirm={handleRejectConfirm} />
      {userRole === "mentee" && isNewMeetModalOpen && (
        <NewMeetModal
          key={editingMeet ? `edit-${String(editingMeet.id)}` : "create-new"}
          isOpen={true}
          initialMeet={editingMeet}
          onClose={() => {
            setIsNewMeetModalOpen(false);
            setEditingMeet(undefined);
          }}
          onConfirm={(data) => {
            handleNewMeetConfirm(data);
            setEditingMeet(undefined);
          }}
        />
      )}
    </div>
  );
};

export default MeetList;