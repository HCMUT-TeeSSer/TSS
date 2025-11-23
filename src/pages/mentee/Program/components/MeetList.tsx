import React, { useState, useEffect } from "react";
import { fetchJsonData } from "@/utils/mockApi";
import Loading from "@/components/Loading";
import RejectModal from "./RejectModal";
import NewMeetModal from "./NewMeetModal";
import { Link } from "react-router-dom";
import { Check, Edit, Plus, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";

interface Meet {
  id: number;
  status: "pending" | "approved" | "rejected";
  mentorName: string;
  menteeName: string;
  topic: string;
  date: string;
  time: string;
  subject: string;
  reason: string;
  duration: string;
  type: "mentee" | "tutor";
}

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

interface MeetListProps {
  userRole: "mentee" | "tutor";
}

const MeetList: React.FC<MeetListProps> = ({ userRole }) => {
  const [Meets, setMeets] = useState<Meet[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "approved" | "pending">("all");
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isNewMeetModalOpen, setIsNewMeetModalOpen] = useState(false);
  const [selectedMeetId, setSelectedMeetId] = useState<number | null>(null);

  useEffect(() => {
    const loadMeets = async () => {
      try {
        setLoading(true);
        const data = await fetchJsonData<Meet[]>("meets", 500);
        setMeets(data.filter((app) => app.type === "mentee"));
      } catch {
        toast.error("Không thể tải danh sách lịch hẹn.");
      } finally {
        setLoading(false);
      }
    };
    void loadMeets();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleAction = async (id: number, status: "approved" | "rejected" | "deleted", reason?: string) => {
    try {
      await updateMeetStatus(id, status, reason);
      const newMeets = Meets.map((app) =>
        app.id === id
          ? {
              ...app,
              status: status === "deleted" ? "rejected" : status,
              reason: status === "rejected" ? (reason ?? "") : status === "approved" ? "Đã đồng ý" : app.reason,
            }
          : app
      ).filter((app) => status !== "deleted" || app.id !== id);
      setMeets(newMeets);
      toast.success(`Lịch hẹn đã được ${status === "approved" ? "duyệt" : status === "rejected" ? "từ chối" : "xóa"}!`);
    } catch {
      toast.error(`Thao tác thất bại.`);
    }
  };

  const handleMenteeReject = (id: number) => {
    setSelectedMeetId(id);
    setIsRejectModalOpen(true);
  };

  const handleTutorReject = (id: number) => {
    void handleAction(id, "rejected", "Tutor đã từ chối.");
  };

  const handleRejectConfirm = (reason: string) => {
    if (selectedMeetId) {
      void handleAction(selectedMeetId, "rejected", reason);
    }
    setSelectedMeetId(null);
  };

  const handleTutorApprove = (id: number) => {
    void handleAction(id, "approved");
  };

  const handleTutorDelete = (id: number) => {
    void handleAction(id, "deleted");
  };

  const handleNewMeetConfirm = (data: unknown) => {
    const newApp: Meet = {
      id: Date.now(),
      type: userRole === "mentee" ? "mentee" : "tutor",
      status: "pending",
      mentorName: userRole === "mentee" ? "Trần Minh Khoa" : "Mentee ABC",
      menteeName: userRole === "mentee" ? "Bạn" : "Mentee ABC",
      topic: (data as { topic: string }).topic,
      date: (data as { date: string }).date,
      time: (data as { time: string }).time,
      subject: "Khoa học máy tính",
      reason: "Chưa duyệt",
      duration: "1 giờ",
    };
    setMeets([newApp, ...Meets]);
    toast.success("Đã tạo lịch hẹn mới, đang chờ duyệt.");
  };

  const filteredMeets = Meets.filter((app) => {
    if (filter === "all") return true;
    return app.status === filter;
  });

  // FIX: Loại bỏ if check dư thừa cho trường hợp 'rejected'
  const getMeetLabel = (app: Meet) => {
    if (userRole === "mentee") {
      if (app.status === "approved") return "Lịch hẹn đã duyệt";
      if (app.status === "pending") return "Lịch hẹn chưa duyệt";
      return "Lịch hẹn đã từ chối"; // TypeScript biết chắc chắn đây là 'rejected'
    }
    // tutor role
    if (app.status === "approved") return "Lịch hẹn hiện tại";
    if (app.status === "pending") return "Lịch hẹn chưa duyệt";
    return "Lịch hẹn đã từ chối"; // TypeScript biết chắc chắn đây là 'rejected'
  };

  // FIX: Loại bỏ if check dư thừa cho trường hợp 'rejected'
  const getStatusClass = (status: Meet["status"]) => {
    if (status === "approved") return "bg-green-100 text-green-700";
    if (status === "pending") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700"; // TypeScript biết chắc chắn đây là 'rejected'
  };

  const renderMeetItem = (app: Meet) => (
    <div key={app.id} className='mb-6 rounded-lg border border-gray-200 p-4 shadow-sm'>
      <div className='flex justify-between'>
        <div className='flex items-center space-x-3'>
          <span className={`h-2.5 w-2.5 rounded-full ${app.status === "approved" ? "bg-green-500" : "bg-red-500"}`} />
          <h4 className='text-md font-semibold text-gray-900'>
            {userRole === "mentee" ? app.mentorName : app.menteeName}
          </h4>
          <span
            className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium ${getStatusClass(app.status)}`}
          >
            {getMeetLabel(app)}
          </span>
        </div>

        {/* Actions for Mentee */}
        {userRole === "mentee" && (
          <div className='space-x-2'>
            {app.status === "pending" && (
              <>
                <button
                  onClick={() => toast.info("Tính năng chỉnh sửa chưa được hiện thực")}
                  className='rounded-lg border border-gray-300 p-2 text-gray-700 hover:bg-gray-50'
                  title='Chỉnh sửa'
                >
                  <Edit className='h-4 w-4' />
                </button>
                <button
                  onClick={() => void handleAction(app.id, "deleted")}
                  className='rounded-lg border border-gray-300 p-2 text-gray-700 hover:bg-gray-50'
                  title='Xóa'
                >
                  <Trash2 className='h-4 w-4' />
                </button>
              </>
            )}
            {app.status === "approved" && (
              <button
                onClick={() => {
                  handleMenteeReject(app.id);
                }}
                className='rounded-lg border border-red-500 p-2 text-red-500 hover:bg-red-50'
                title='Từ chối'
              >
                <X className='h-4 w-4' />
              </button>
            )}
          </div>
        )}

        {/* Actions for Tutor */}
        {userRole === "tutor" && (
          <div className='space-x-2'>
            {app.status === "pending" && (
              <>
                <button
                  onClick={() => {
                    handleTutorReject(app.id);
                  }}
                  className='rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200'
                  title='Từ chối'
                >
                  <X className='h-4 w-4' />
                </button>
                <button
                  onClick={() => {
                    handleTutorApprove(app.id);
                  }}
                  className='rounded-lg bg-green-100 p-2 text-green-600 hover:bg-green-200'
                  title='Đồng ý'
                >
                  <Check className='h-4 w-4' />
                </button>
              </>
            )}
            {app.status === "approved" && (
              <button
                onClick={() => {
                  handleTutorDelete(app.id);
                }}
                className='rounded-lg border border-gray-300 p-2 text-gray-700 hover:bg-gray-50'
                title='Xóa'
              >
                <Trash2 className='h-4 w-4' />
              </button>
            )}
            {app.status === "approved" && (
              <button
                onClick={() => toast.info("Bắt đầu cuộc họp")}
                className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700'
                title='Bắt đầu cuộc họp'
              >
                Bắt đầu cuộc họp
              </button>
            )}
          </div>
        )}
      </div>

      <div className='mt-3 flex items-center justify-between text-sm text-gray-600'>
        <p className='flex-1'>
          <span className='font-medium text-gray-900'>Chủ đề:</span> {app.topic}
        </p>
      </div>
      <div className='mt-2 flex items-center justify-between text-sm text-gray-600'>
        <p className='flex-1'>
          <span className='font-medium text-gray-900'>Thời gian:</span> {app.date} | {app.time}
        </p>
        <p className='ml-4'>
          <span className='font-medium text-gray-900'>Môn học:</span> {app.subject}
        </p>
      </div>
      {app.status === "rejected" && (
        <div className='mt-2 text-sm text-red-600'>
          <span className='font-medium'>Lý do từ chối:</span> {app.reason}
        </div>
      )}
    </div>
  );

  return (
    <div className='bg-gray-50 p-6'>
      {/* Upper Program Info (Mock based on images) */}
      <div className='mb-6 rounded-lg bg-white p-6 shadow-md'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <span className='text-3xl font-bold text-gray-800'>Lập trình Python nâng cao</span>
          </div>
          <div className='space-x-3'>
            {userRole === "mentee" && (
              <button
                onClick={() => {
                  setIsNewMeetModalOpen(true);
                }}
                className='inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700'
              >
                <Plus className='mr-2 h-4 w-4' /> Tạo lịch mới
              </button>
            )}
            {userRole === "tutor" && (
              <Link
                to='/'
                className='inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700'
              >
                <Check className='mr-2 h-4 w-4' /> Duyệt lịch nhanh
              </Link>
            )}
            {userRole === "tutor" && (
              <Link
                to='/'
                className='inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50'
              >
                Xem học viên
              </Link>
            )}
            <Link
              to='/'
              className='inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50'
            >
              Báo cáo
            </Link>
          </div>
        </div>
        <p className='mt-2 text-sm text-gray-600'>với T.S. Trần Minh Khoa</p>
        <div className='mt-4 flex space-x-6 text-sm text-gray-600'>
          <div className='flex items-center space-x-1'>
            <span className='font-medium'>Đang hoạt động:</span>
            <span className='text-green-600'>Có</span>
          </div>
          <div className='flex items-center space-x-1'>
            <span className='font-medium'>Tiến độ:</span>
            <span>65%</span>
          </div>
        </div>

        {/* Tabs - Mocking active tab for "Lịch hẹn" */}
        <div className='mt-6 border-b border-gray-200'>
          <nav className='-mb-px flex space-x-8'>
            {["Nội dung", "Buổi tư vấn", "Lịch hẹn", "Năng lực"].map((tab) => (
              <button
                key={tab}
                className={`border-b-2 px-1 py-3 text-sm font-medium whitespace-nowrap ${
                  tab === "Lịch hẹn"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Meet Page Content */}
      <div className='flex space-x-6'>
        <div className='flex-1'>
          <h3 className='mb-4 text-xl font-bold text-gray-900'>Lịch hẹn</h3>

          {/* Filter and Count */}
          <div className='mb-4 flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <span className='text-sm text-gray-600'>Tất cả yêu cầu:</span>
              <span className='inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 text-xs font-medium text-red-700'>
                {Meets.filter((a) => a.status === "pending").length} chờ duyệt
              </span>
            </div>

            <div className='flex items-center space-x-3'>
              <label htmlFor='filter' className='sr-only'>
                Lọc
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
            </div>
          </div>

          {/* Meet Sections */}
          <div className='space-y-6'>
            {filteredMeets.length > 0 ? (
              filteredMeets.map(renderMeetItem)
            ) : (
              <div className='rounded-lg bg-white py-10 text-center text-gray-500 shadow-sm'>
                Không có lịch hẹn nào {filter === "all" ? "phù hợp" : filter === "approved" ? "đã duyệt" : "chưa duyệt"}
                .
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Meet Summary and Tutor Availability */}
        <div className='w-80 space-y-6'>
          {/* Meet Summary */}
          <div className='rounded-lg bg-white p-4 shadow-md'>
            <h4 className='font-semibold text-gray-900'>Thống kê lịch hẹn</h4>
            <ul className='mt-3 space-y-2 text-sm'>
              <li className='flex justify-between text-gray-600'>
                <span>Tổng yêu cầu</span>
                <span className='font-medium text-gray-900'>{Meets.length}</span>
              </li>
              <li className='flex justify-between text-gray-600'>
                <span>Đã đồng ý</span>
                <span className='font-medium text-green-600'>
                  {Meets.filter((a) => a.status === "approved").length}
                </span>
              </li>
              <li className='flex justify-between text-gray-600'>
                <span>Chờ duyệt</span>
                <span className='font-medium text-yellow-600'>
                  {Meets.filter((a) => a.status === "pending").length}
                </span>
              </li>
              <li className='flex justify-between text-gray-600'>
                <span>Hoàn thành</span>
                <span className='font-medium text-blue-600'>5</span> {/* Mocked data */}
              </li>
              <li className='flex justify-between text-gray-600'>
                <span>Tuần này</span>
                <span className='font-medium text-purple-600'>4</span> {/* Mocked data */}
              </li>
            </ul>
          </div>

          {/* Tutor Availability/Next Meet */}
          <div className='rounded-lg bg-white p-4 shadow-md'>
            <h4 className='font-semibold text-gray-900'>
              {userRole === "mentee" ? "Lịch rảnh của Tutor" : "Lịch rảnh rỗi"}
            </h4>

            {userRole === "tutor" ? (
              // Tutor Availability
              <div className='mt-3 space-y-2 text-sm'>
                <p className='mb-2 text-gray-500'>Lịch rảnh của tôi trong tuần này</p>
                <div className='flex justify-between'>
                  <span className='font-medium'>Thứ 2, 04/11</span>
                  <span className='text-gray-700'>9:00 - 12:00</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-medium'>Thứ 3, 05/11</span>
                  <span className='text-gray-700'>14:00 - 17:00</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-medium'>Thứ 6, 08/11</span>
                  <span className='text-gray-700'>10:00 - 14:00</span>
                </div>
                <button
                  onClick={() => toast.info("Tính năng chỉnh sửa lịch rảnh chưa được hiện thực")}
                  className='mt-4 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50'
                >
                  Chỉnh sửa lịch rảnh
                </button>
              </div>
            ) : (
              // Mentee: Next Meet
              <div className='mt-3 space-y-2 text-sm'>
                <h5 className='font-medium text-gray-900'>Lịch hẹn tiếp theo</h5>
                <p className='text-gray-600'>Dự án</p>
                <p className='text-gray-600'>Thứ 3, 05/11/2024, 14:00 - 15:00</p>
                <p className='text-gray-600'>với Nguyễn Thị Hà</p>
                <div className='mt-3 text-xs text-blue-600'>Trong 2 ngày nữa</div>
                <button className='mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700'>
                  Tham gia buổi họp
                </button>
              </div>
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
      {userRole === "mentee" && (
        <NewMeetModal
          isOpen={isNewMeetModalOpen}
          onClose={() => {
            setIsNewMeetModalOpen(false);
          }}
          onConfirm={handleNewMeetConfirm}
        />
      )}
    </div>
  );
};

export default MeetList;
