import React, { useState, useEffect } from "react";
import { fetchJsonData } from "@/utils/mockApi";
import Loading from "@/components/Loading";
// import { Link } from "react-router-dom";
import { Check, Plus, X, Video, Calendar, Clock, GraduationCap, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

/* eslint-disable @typescript-eslint/no-unnecessary-condition */

interface Meet {
  id: number;
  programId: number;
  status: "pending" | "approved" | "rejected";
  tutorName: string;
  menteeName: string;
  topic: string;
  describe: string;
  createAt: string;
  date: string;
  beginTime: string;
  endTime: string;
  subject: string;
  reason: string;
  type: "mentee" | "tutor";
}

interface MeetData {
  id?: number;
  topic: string;
  describe: string;
  date: string;
  beginTime: string;
  endTime: string;
}

interface MeetListProps {
  userRole: "mentee" | "tutor";
  programId: number;
}

// Form for new Meet
interface NewMeetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: MeetData) => void;
  initialMeet?: MeetData;
}

function NewMeetModal({ isOpen, onClose, onConfirm, initialMeet }: NewMeetModalProps) {
  // Khởi tạo state ngay lập tức từ props.
  // Nhờ có prop "key" ở component cha, đoạn code này sẽ chạy lại mỗi khi mở modal.
  const [topic, setTopic] = useState(initialMeet?.topic ?? "");
  const [describe, setDescribe] = useState(initialMeet?.describe ?? "");
  const [date, setDate] = useState(initialMeet?.date ?? "");
  const [beginTime, setTime1] = useState(initialMeet?.beginTime ?? "");
  const [endTime, setTime2] = useState(initialMeet?.endTime ?? "");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setErrors] = useState({ time: "", future: "" });

  // Xác định chế độ dựa trên việc có ID hay không
  const isEditMode = !!initialMeet?.id;

  if (!isOpen) return null;

  const validateInputs = () => {
    let errorMsg = "";

    // Kiểm tra rỗng (Topic, Describe, Date, BeginTime, EndTime)
    if (!topic.trim() || !describe.trim() || !date || !beginTime || !endTime) {
      errorMsg = "Vui lòng điền đầy đủ tất cả các trường bắt buộc.";
    }

    const timeToMinutes = (timeStr: string) => {
      const [hour, minute] = timeStr.split(":").map(Number);
      return hour * 60 + minute;
    };
    // Kiểm tra Thời gian diễn ra < 1h
    if (!errorMsg && beginTime && endTime) {
      const MIN_DURATION = 60;

      const startMinutes = timeToMinutes(beginTime);
      const endMinutes = timeToMinutes(endTime);
      const durationMinutes = endMinutes - startMinutes;
      if (durationMinutes <= 0) {
        errorMsg = "Thời gian bắt đầu phải trước thời gian kết thúc.";
      } else if (durationMinutes < MIN_DURATION) {
        errorMsg = "Thời lượng lịch hẹn phải tối thiểu 60 phút.";
      }
    }

    // Lấy thời điểm hiện tại (đã bao gồm phần làm tròn phút)
    const now = new Date();
    const futureTime = new Date(now.getTime() + 60000);
    const year = futureTime.getFullYear();
    const month = String(futureTime.getMonth() + 1).padStart(2, "0");
    const day = String(futureTime.getDate()).padStart(2, "0");
    const currentISODate = `${String(year)}-${month}-${day}`;
    const currentMinute = now.getMinutes() + 1;
    const currentHour = now.getHours() + (currentMinute === 60 ? 1 : 0);
    const nextMinute = currentMinute === 60 ? 0 : currentMinute;
    const currentTime = `${String(currentHour).padStart(2, "0")}:${String(nextMinute).padStart(2, "0")}`;

    // Kiểm tra Ngày và Thời điểm > Hiện tại
    if (!errorMsg && date) {
      // So sánh ngày
      if (date < currentISODate) {
        errorMsg = "Lịch hẹn phải được đặt từ ngày hôm nay trở đi.";
      }
      // Nếu ngày là hôm nay, kiểm tra giờ (chỉ khi chưa có lỗi khác)
      else if (date === currentISODate && beginTime && beginTime < currentTime) {
        errorMsg = "Thời điểm hẹn phải lớn hơn thời điểm hiện tại.";
      }
    }

    // Cập nhật state errors cho UI hiển thị
    setErrors({
      time:
        (beginTime && endTime && beginTime >= endTime) || timeToMinutes(endTime) - timeToMinutes(beginTime) < 60
          ? "Thời gian cuộc hẹn tối thiểu 60 phút."
          : "",
      future: date && date < currentISODate ? "Lịch hẹn phải được đặt từ ngày hôm nay trở đi." : "",
    });

    return { isValid: !errorMsg, errorMsg }; // Trả về đối tượng
  };

  const handleConfirm = () => {
    const validationResult = validateInputs();
    if (!validationResult.isValid) {
      toast.error(validationResult.errorMsg || "Vui lòng kiểm tra lại thông tin lịch hẹn.");
      return;
    }
    onConfirm({
      id: initialMeet?.id, // Giữ lại ID nếu đang sửa
      topic,
      describe,
      date,
      beginTime,
      endTime,
    });
    onClose();
  };

  const now = new Date();
  // Thiết lập minDate cho input date
  const futureTime = new Date(now.getTime() + 60000);
  const year = futureTime.getFullYear();
  const month = String(futureTime.getMonth() + 1).padStart(2, "0");
  const day = String(futureTime.getDate()).padStart(2, "0");
  const minDate = `${String(year)}-${month}-${day}`;
  // Thiết lập minTime cho input date
  const currentMinute = now.getMinutes() + 1;
  const currentHour = now.getHours() + (currentMinute === 60 ? 1 : 0);
  const nextMinute = currentMinute === 60 ? 0 : currentMinute;
  const currentTime = `${String(currentHour).padStart(2, "0")}:${String(nextMinute).padStart(2, "0")}`;
  const minTime = date === minDate ? currentTime : undefined;

  return (
    <div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-gray-900'>
      <div className='w-full max-w-lg rounded-lg bg-white p-6 shadow-xl'>
        <h3 className='text-lg font-semibold text-gray-900'>
          {isEditMode ? "Chỉnh sửa lịch hẹn" : "Tạo lịch hẹn mới"}
        </h3>
        <p className='mt-2 text-sm text-gray-500'>
          {isEditMode
            ? "Cập nhật thông tin cho buổi tư vấn này."
            : "Chọn thời gian và nội dung buổi tư vấn bạn muốn đặt."}
        </p>

        <div className='mt-4 space-y-4'>
          {/* Topic Input */}
          <div>
            <label htmlFor='topic' className='mb-1 block text-sm font-medium text-gray-700'>
              Chủ đề
            </label>
            <input
              id='topic'
              type='text'
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
              }}
              className='w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-blue-500'
              placeholder='Ví dụ: Dự án cuối kỳ'
            />
          </div>

          {/* Describe Input */}
          <div>
            <label htmlFor='describe' className='mb-1 block text-sm font-medium text-gray-700'>
              Mô tả
            </label>
            <input
              id='describe'
              type='text'
              value={describe}
              onChange={(e) => {
                setDescribe(e.target.value);
              }}
              className='w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-blue-500'
              placeholder='Chi tiết nội dung cần trao đổi...'
            />
          </div>

          {/* Date & Time Inputs */}
          <div className='flex space-x-4'>
            <div className='flex-1'>
              <label htmlFor='date' className='mb-1 block text-sm font-medium text-gray-700'>
                Ngày
              </label>
              <input
                id='date'
                type='date'
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                min={minDate}
                className='w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-blue-500'
              />
            </div>
            <div className='flex-1'>
              <label htmlFor='beginTime' className='mb-1 block text-sm font-medium text-gray-700'>
                Bắt đầu
              </label>
              <input
                id='beginTime'
                type='time'
                value={beginTime}
                onChange={(e) => {
                  setTime1(e.target.value);
                }}
                min={minTime}
                className='w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-blue-500'
              />
            </div>
            <div className='flex-1'>
              <label htmlFor='endTime' className='mb-1 block text-sm font-medium text-gray-700'>
                Kết thúc
              </label>
              <input
                id='endTime'
                type='time'
                value={endTime}
                onChange={(e) => {
                  setTime2(e.target.value);
                }}
                min={minTime}
                className='w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-blue-500'
              />
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className='mt-6 flex justify-end space-x-3'>
          <button
            type='button'
            onClick={onClose}
            className='rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50'
          >
            Hủy
          </button>
          <button
            type='button'
            onClick={handleConfirm}
            disabled={!topic.trim() || !date || !beginTime || !endTime}
            className='rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:bg-blue-300'
          >
            {isEditMode ? "Lưu thay đổi" : "Tạo lịch hẹn"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Form for rejecting Meet
interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}
function RejectModal({ isOpen, onClose, onConfirm }: RejectModalProps) {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(reason);
    setReason("");
    onClose();
  };

  return (
    <div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-gray-900'>
      <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-xl'>
        <h3 className='text-lg font-semibold text-gray-900'>Lý do từ chối lịch hẹn</h3>
        <p className='mt-2 text-sm text-gray-500'>Vui lòng cho biết lý do bạn muốn hủy lịch hẹn.</p>
        <textarea
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
          }}
          rows={4}
          className='mt-4 w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-blue-500'
          placeholder='Nhập lý do...'
        />
        <div className='mt-4 flex justify-end space-x-3'>
          <button
            type='button'
            onClick={onClose}
            className='text-black-700 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-200'
          >
            Hủy
          </button>
          <button
            type='button'
            onClick={handleConfirm}
            disabled={!reason.trim()}
            className='text-green rounded-lg border border-transparent bg-green-300 px-4 py-2 text-sm font-medium shadow-sm hover:bg-green-500 disabled:bg-green-200'
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}

// Where and Who Meet appear
const CURRENT_MENTEE_NAME = "Nguyễn Thị Hà";
const CURRENT_TUTOR_NAME = "Trần Minh Khoa";
// const CURRENT_PROGRAM_NAME = "";

// Simulated update function
const updateMeetStatus = async (id: number, status: string, reason?: string) => {
  return new Promise<void>((resolve) => {
    console.log(`Updating Meet ${String(id)} to ${status}. Reason: ${reason ?? "N/A"}`);
    setTimeout(resolve, 300);
  });
};

const filterOptions = [
  { value: "all", label: "Tất cả lịch hẹn" },
  { value: "approved", label: "Lịch hẹn đã duyệt" },
  { value: "pending", label: "Lịch hẹn chưa duyệt" },
];

// Hàm trợ giúp mới để lấy class cho khung chứa (box)
const getBoxClass = (status: Meet["status"]) => {
  if (status === "approved") return "border-green-200 bg-green-50";
  // Màu vàng nhạt (bg-yellow-50) và viền vàng (border-yellow-400) cho trạng thái pending
  if (status === "pending") return "border-yellow-200 bg-yellow-50";
  // Mặc định hoặc cho các trạng thái khác (rejected đã bị lọc)
  return "border-gray-200 bg-white";
};
// Hàm trợ giúp để tính thời gian đã gửi
const getSentTimeAgo = (createdAt: string) => {
  const now = new Date();
  const sentDate = new Date(createdAt);

  if (isNaN(sentDate.getTime())) return "không rõ";

  const diffMs = now.getTime() - sentDate.getTime();
  if (diffMs < 60000) return "vừa gửi";

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    return `${String(diffDays)} ngày trước`;
  }
  if (diffHours > 0) {
    return `${String(diffHours)} giờ trước`;
  }
  return `${String(diffMinutes)} phút trước`;
};
// Hàm trợ giúp để phân tích ngày và giờ từ chuỗi
const parseDateTime = (dateStr: string, timeStr: string) => {
  const dateObj = new Date(`${dateStr}T${timeStr}:00`);
  if (isNaN(dateObj.getTime())) {
    return new Date(dateStr);
  }
  return dateObj;
};
// Hàm trợ giúp để kiểm tra xem một ngày có thuộc tuần hiện tại hay không
const isThisWeek = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();

  // Đặt về đầu tuần (ví dụ: Chủ nhật hoặc Thứ 2 tùy cài đặt locale, nhưng thường dùng để so sánh)
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  // Kiểm tra
  return date >= startOfWeek && date < endOfWeek;
};

const MeetList: React.FC<MeetListProps> = ({ userRole, programId }) => {
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
        const data = await fetchJsonData<Meet[]>("meets", 500);
        let filteredData = data.filter((app) => app.status !== "rejected");
        filteredData = filteredData.filter((app) => app.programId === programId);
        if (userRole === "mentee") {
          filteredData = filteredData.filter((app) => app.menteeName === CURRENT_MENTEE_NAME);
        } else {
          filteredData = filteredData.filter((app) => app.tutorName === CURRENT_TUTOR_NAME);
        }

        const now = new Date();

        const futureMeets = filteredData.filter((app) => {
          // if (app.status !== "approved") return true;
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
  }, [programId, userRole]);

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
      .filter((m) => m.startDateTime && m.startDateTime > now) // Chỉ lấy tương lai
      .sort((a, b) => a.startDateTime.getTime() - b.startDateTime.getTime()); // Sắp xếp gần nhất trước

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

  // Hàm xử lý hành động duyệt, từ chối, xóa
  const handleAction = async (id: number, status: "approved" | "rejected" | "deleted", reason?: string) => {
    try {
      await updateMeetStatus(id, status, reason);
      const updateMeetList = (list: Meet[]) => {
        return list
          .map((app) => {
            if (app.id === id) {
              // Thay đổi trạng thái, và lý do
              return {
                ...app,
                status: status === "deleted" ? "rejected" : status,
                reason: status === "rejected" ? (reason ?? "") : status === "approved" ? "Đã đồng ý" : app.reason,
              };
            }
            return app;
          })
          .filter((app) => status !== "deleted" || app.id !== id); // Lọc nếu là deleted
      };
      // const newMeets = Meets.map((app) => {
      //   if (app.id === id) {
      //     return {
      //       ...app,
      //       status: status === "deleted" ? "rejected" : status,
      //       reason: status === "rejected" ? (reason ?? "") : status === "approved" ? "Đã đồng ý" : app.reason,
      //     };
      //   }
      //   return app;
      // }).filter((app) => status !== "deleted" || app.id !== id);
      //setMeets(newMeets);

      setMeets(updateMeetList(Meets));
      setAllMeets(updateMeetList(allMeets));

      const actionText = status === "approved" ? "duyệt" : status === "rejected" ? "từ chối" : "xóa";
      toast.success(`Lịch hẹn đã được ${actionText}!`);
    } catch {
      toast.error("Thao tác thất bại.");
    }
  };

  // Xử lý xóa lịch hẹn đã đồng ý
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
      // Map dữ liệu từ Meet sang MeetData để truyền vào modal
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
            date: data.date,
            beginTime: data.beginTime,
            endTime: data.endTime,
            // Có thể reset status về pending nếu sửa đổi, hoặc giữ nguyên
            // status: "pending",
          };
        }
        return meet;
      });
      setMeets(updatedMeets);
      toast.success("Đã cập nhật thông tin lịch hẹn.");
    } else {
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

  // Render từng mục lịch hẹn
  const renderMeetItem = (app: Meet) => (
    <div key={app.id} className={`mb-6 rounded-lg border p-4 shadow-sm ${getBoxClass(app.status)}`}>
      {/* Upper Message */}
      <div className='flex justify-between'>
        {/* Show menteeName and meetStatus */}
        <div className='flex items-center space-x-3'>
          {}
          <span className={`h-2.5 w-2.5 rounded-full ${app.status === "approved" ? "bg-green-500" : "bg-red-500"}`} />
          <h4 className='text-md font-semibold text-gray-900'>{app.menteeName}</h4>
          <span
            className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium ${getStatusClass(app.status)}`}
          >
            {getMeetLabel(app)}
          </span>
        </div>

        {/* Show actions for mentee */}
        {userRole === "mentee" && (
          <div className='space-x-2'>
            {app.status === "pending" && (
              <>
                {/* Edit */}
                <button
                  onClick={() => {
                    handleEditMeet(app.id);
                  }}
                  className='rounded-lg bg-yellow-600 px-3 py-1 text-sm font-medium text-white shadow-sm hover:bg-yellow-700'
                  title='Điều chỉnh'
                >
                  Điều chỉnh
                </button>
                {/* Delete */}
                <button
                  onClick={() => {
                    handlementeeDelete(app.id);
                  }}
                  className='rounded-lg bg-red-100 px-3 py-1 text-sm font-medium text-red-700 shadow-sm hover:bg-red-200'
                  title='Xóa'
                >
                  Xóa
                </button>
              </>
            )}
          </div>
        )}

        {/* Actions for Tutor */}
        {app.status === "approved" && (
          <div className='space-x-2'>
            <button
              onClick={() => {
                handleAcceptMeetDelete(app.id);
              }}
              className='rounded-lg bg-red-100 px-3 py-1 text-sm font-medium text-red-700 shadow-sm hover:bg-red-200'
              title='Xóa'
            >
              Xóa
            </button>
          </div>
        )}
      </div>

      {/* Inner Message */}
      <div className='mt-3 flex items-center justify-between text-sm'>
        <p className='flex-1'>
          <span className='text-sm font-medium'></span> {app.topic}
        </p>
      </div>

      <div className='mt-2 flex items-center justify-between text-sm text-gray-600'>
        <p className='flex-1'>{app.describe}</p>
      </div>

      <div className='mt-2 flex items-center space-x-10 text-sm text-gray-600'>
        <div className='flex items-center space-x-1'>
          <Calendar className='h-4 w-4 text-gray-500' />
          <p>{app.date}</p>
        </div>
        <div className='flex items-center space-x-1'>
          <Clock className='h-4 w-4 text-gray-500' />
          <p>
            {app.beginTime} - {app.endTime}
          </p>
        </div>
        <div className='flex items-center space-x-1'>
          <GraduationCap className='h-4 w-4 text-gray-500' />
          <p>{app.subject}</p>
        </div>
      </div>

      {/* Left: status messages - Right: actives*/}
      {userRole === "mentee" && app.status === "pending" && (
        <div className='mt-4 flex items-center justify-between border-t border-gray-200 pt-3'>
          {/* Left Side: Status Message */}
          <div className='flex items-center space-x-1 text-sm font-medium text-gray-600'>
            <Clock className='h-5 w-5' />
            <span>Đang chờ {app.tutorName} duyệt</span>
          </div>
        </div>
      )}

      {userRole === "tutor" && app.status === "pending" && (
        <div className='mt-4 flex items-center justify-between border-t border-gray-200 pt-3'>
          {/* Status Message */}
          <div className='flex items-center space-x-1 text-sm font-medium text-gray-600'>
            <Clock className='h-5 w-5' />
            <span>Yêu cầu {getSentTimeAgo(app.createAt)}</span>
          </div>
          {/* Actives */}
          <div className='flex items-center space-x-5'>
            <button
              onClick={() => {
                handleTutorReject(app.id);
              }}
              className='inline-flex items-center rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-200'
              title='Từ chối'
            >
              <X className='mr-2 h-4 w-4' /> Từ chối
            </button>
            <button
              onClick={() => {
                handleTutorApprove(app.id);
              }}
              className='inline-flex items-center rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-700 shadow-sm hover:bg-green-200'
              title='Đồng ý'
            >
              <Check className='mr-2 h-4 w-4' /> Đồng ý
            </button>
          </div>
        </div>
      )}

      {app.status === "approved" && (
        <div className='mt-4 flex items-center justify-between border-t border-gray-200 pt-3'>
          {/* Left Side: Status Message */}
          {userRole === "mentee" && (
            <div className='flex items-center space-x-1 text-sm font-medium text-green-600'>
              <Check className='h-5 w-5' />
              <span>Đã được {app.tutorName} đồng ý</span>
            </div>
          )}
          {userRole === "tutor" && (
            <div className='flex items-center space-x-1 text-sm font-medium text-green-600'>
              <Check className='h-5 w-5' />
              <span>Liên kết cuộc họp đã được tạo</span>
            </div>
          )}

          {/* Right Side: Start Meeting Button */}
          <button
            onClick={() => toast.info("Bắt đầu cuộc họp")}
            className='inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700'
            title='Bắt đầu cuộc họp'
          >
            <Video className='mr-2 h-4 w-4' /> Bắt đầu cuộc họp
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className='bg-gray-50 p-6'>
      {/* Meet Page Content*/}
      <div className='flex space-x-6'>
        <div className='flex-1'>
          {/* Filter and Count */}
          <div className='mb-4 flex items-center justify-between'>
            <h3 className='mb-4 text-xl font-bold text-gray-900'>Lịch hẹn</h3>
            <div className='mb-4 flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                {/* Filter */}
                <label htmlFor='filter' className='sr-only'>
                  {" "}
                  Lọc{" "}
                </label>
                <select
                  id='filter'
                  value={filter}
                  onChange={(e) => {
                    setFilter(e.target.value as "all" | "approved" | "pending");
                  }}
                  className='rounded-lg border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500'
                >
                  {filterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* Create new meet for mentee */}
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

                {/* Show total pending meet for tutor */}
                {userRole === "tutor" && (
                  <span className='inline-flex items-center rounded-lg bg-red-100 px-3 py-1 text-sm font-medium text-red-700'>
                    <Clock className='mr-2 h-4 w-4' /> {Meets.filter((a) => a.status === "pending").length} đang chờ
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Meet Sections */}
          <div className='space-y-8'>
            {filter === "all" ? (
              <>
                {/* Pending */}
                {pendingMeets.length > 0 && (
                  <div className='space-y-4 rounded-lg border border-gray-300 bg-white p-4 shadow-md'>
                    <div className='flex items-center space-x-2 text-red-600'>
                      <AlertCircle className='h-6 w-6' />
                      <h4 className='text font-bold text-gray-800'>Lịch hẹn chưa duyệt</h4>
                    </div>
                    <div className='space-y-4'>{pendingMeets.map(renderMeetItem)}</div>
                  </div>
                )}

                {/* Approved */}
                {approvedMeets.length > 0 && (
                  <div className='space-y-4 rounded-lg border border-gray-300 bg-white p-4 shadow-md'>
                    <div className='flex items-center space-x-2 text-green-600'>
                      <CheckCircle className='h-6 w-6' />
                      <h4 className='text font-bold text-gray-800'>Lịch hẹn hiện tại</h4>
                    </div>
                    <div className='space-y-4'>{approvedMeets.map(renderMeetItem)}</div>
                  </div>
                )}

                {/* Trường hợp không có lịch nào */}
                {pendingMeets.length === 0 && approvedMeets.length === 0 && (
                  <div className='rounded-lg bg-white py-10 text-center text-gray-500 shadow-sm'>
                    Không có lịch hẹn nào phù hợp.
                  </div>
                )}
              </>
            ) : (
              // HIỂN THỊ DẠNG PHẲNG KHI DÙNG BỘ LỌC (CHƯA DUYỆT / ĐÃ DUYỆT)
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

        {/* Right Sidebar - Meet Summary and Tutor Availability */}
        <div className='w-80 space-y-6'>
          {/* Meet Summary */}
          {userRole === "mentee" && (
            <div className='rounded-lg bg-white p-4 shadow-md'>
              <h4 className='font-semibold text-gray-900'>Thống kê lịch hẹn</h4>
              <ul className='mt-3 space-y-2 text-sm'>
                <li className='flex justify-between text-gray-600'>
                  <span>Tổng số lịch hẹn</span>
                  <span className='font-medium text-gray-900'>{Meets.length}</span>
                </li>
                <li className='flex justify-between text-gray-600'>
                  <span>Đã được đồng ý</span>
                  <span className='font-medium text-green-600'>
                    {Meets.filter((a) => a.status === "approved").length}
                  </span>
                </li>
                <li className='flex justify-between text-gray-600'>
                  <span>Chờ phê duyệt</span>
                  <span className='font-medium text-yellow-600'>
                    {Meets.filter((a) => a.status === "pending").length}
                  </span>
                </li>
                <li className='flex justify-between text-gray-600'>
                  <span>Hoàn thành</span>
                  <span className='font-medium text-blue-600'>
                    {
                      allMeets.filter((a) => {
                        const endDateTime = parseDateTime(a.date, a.endTime);
                        return a.status === "approved" && endDateTime <= new Date();
                      }).length
                    }
                  </span>{" "}
                  {/* Mocked data */}
                </li>
              </ul>
            </div>
          )}
          {userRole === "tutor" && (
            <div className='rounded-lg bg-white p-4 shadow-md'>
              <h4 className='font-semibold text-gray-900'>Tổng quan lịch hẹn</h4>
              <ul className='mt-3 space-y-2 text-sm'>
                <li className='flex justify-between text-gray-600'>
                  <span>Tổng yêu cầu</span>
                  <span className='font-medium text-gray-900'>{allMeets.length}</span>
                </li>
                <li className='flex justify-between text-gray-600'>
                  <span>Chờ phê duyệt</span>
                  <span className='font-medium text-yellow-600'>
                    {Meets.filter((a) => a.status === "pending").length}
                  </span>
                </li>
                <li className='flex justify-between text-gray-600'>
                  <span>Đã đồng ý</span>
                  <span className='font-medium text-green-600'>
                    {allMeets.filter((a) => a.status === "approved").length}
                  </span>
                </li>
                <li className='flex justify-between text-gray-600'>
                  <span>Đã hoàn thành</span>
                  <span className='font-medium text-blue-600'>
                    {
                      allMeets.filter((a) => {
                        const endDateTime = parseDateTime(a.date, a.endTime);
                        return a.status === "approved" && endDateTime <= new Date();
                      }).length
                    }
                  </span>{" "}
                  {/* Mocked data */}
                </li>
                <li className='flex justify-between text-gray-600'>
                  <span>Tuần này</span>
                  <span className='font-medium text-purple-600'>
                    {Meets.filter((a) => a.status === "approved" && isThisWeek(a.date)).length}
                  </span>{" "}
                  {/* Mocked data */}
                </li>
              </ul>
            </div>
          )}

          {/* Tutor Free Schedule */}
          <div className='rounded-lg bg-white p-4 shadow-md'>
            <h4 className='font-semibold text-gray-900'>
              {userRole === "mentee" ? "Lịch rảnh của Tutor" : "Lịch rảnh tuần này"}
            </h4>

            {/* Hiển thị lịch rảnh */}
            <div className='mt-3 space-y-2 text-sm'>
              <p className='mb-2 text-gray-500'>
                {userRole === "mentee" ? "Tutor rảnh vào:" : "Lịch rảnh của tôi trong tuần này:"}
              </p>
              <div className='flex justify-between rounded-lg bg-gray-50 p-3'>
                <span className='font-medium'>Thứ 2, 04/11</span>
                <span className='text-green-700'>9:00 - 12:00</span>
              </div>
              <div className='flex justify-between rounded-lg bg-gray-50 p-3'>
                <span className='font-medium'>Thứ 3, 05/11</span>
                <span className='text-green-700'>14:00 - 17:00</span>
              </div>
              <div className='flex justify-between rounded-lg bg-gray-50 p-3'>
                <span className='font-medium'>Thứ 6, 08/11</span>
                <span className='text-green-700'>10:00 - 14:00</span>
              </div>
              {/*  */}
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

          {/*Next Meet */}
          <div className='rounded-lg bg-white p-4 shadow-md'>
            <h4 className='font-semibold text-gray-900'>Lịch hẹn tiếp theo </h4>

            {nextMeet ? (
              <div className='space-y-2 pt-4 text-sm'>
                <div className={`rounded-lg p-3 ${userRole === "mentee" ? "bg-green-50" : "bg-blue-50"}`}>
                  <p className={`font-bold ${userRole === "mentee" ? "text-green-800" : "text-blue-800"}`}>
                    {nextMeet.topic}
                  </p>

                  <p className={`pt-1 text-sm ${userRole === "mentee" ? "text-green-700" : "text-blue-700"}`}>
                    {/* Format lại hiển thị ngày giờ cho đẹp */}
                    Thứ {new Date(nextMeet.date).getDay() + 1}, {nextMeet.date}, {nextMeet.beginTime} -{" "}
                    {nextMeet.endTime}
                  </p>

                  <p className={`mt-1 text-sm ${userRole === "mentee" ? "text-green-600" : "text-blue-600"}`}>
                    với {userRole === "mentee" ? nextMeet.tutorName : nextMeet.menteeName}
                  </p>

                  <div
                    className={`mt-2 inline-block rounded px-2 py-1 text-xs font-medium ${
                      userRole === "mentee" ? "bg-green-100 text-green-500" : "bg-blue-100 text-blue-500"
                    }`}
                  >
                    {getDaysUntilLabel(nextMeet.startDateTime)}
                  </div>
                </div>

                <button
                  onClick={() => toast.info("Bắt đầu cuộc họp")}
                  className={`mt-2 inline-flex w-full justify-center rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm ${
                    userRole === "mentee" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                  }`}
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

      {/* Modals */}
      <RejectModal
        isOpen={isRejectModalOpen}
        onClose={() => {
          setIsRejectModalOpen(false);
        }}
        onConfirm={handleRejectConfirm}
      />
      {userRole === "mentee" && isNewMeetModalOpen && (
        <NewMeetModal
          key={editingMeet ? `edit-${String(editingMeet.id)}` : "create-new"}
          isOpen={true}
          initialMeet={editingMeet}
          onClose={() => {
            setIsNewMeetModalOpen(false);
            setEditingMeet(undefined); // Reset dữ liệu sửa khi đóng
          }}
          onConfirm={(data) => {
            handleNewMeetConfirm(data);
            setEditingMeet(undefined); // Reset dữ liệu sửa sau khi lưu
          }}
        />
      )}
    </div>
  );
};

export default MeetList;
