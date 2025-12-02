import React, { useState } from "react";
import { CheckCircle, Clock, MessageCircle, CircleX, User, Calendar, Users, Check, Undo2 } from "lucide-react";
import { tutors } from "@/data/tutors";
import { mentees } from "@/data/mentees";

interface ProgramRequest {
  id: number;
  title: string;
  description: string;
  date: string;
  mentees: number;
  status: "pending" | "approved";
}

interface Feedback {
  id: number;
  userId: number;
  userType: "mentee" | "tutor";
  level: "Cao" | "Trung bình" | "Thấp";
  date: string;
  comment: string;
  programName: string;
}

const feedbacks: Feedback[] = [
  {
    id: 1,
    userId: 20220001,
    userType: "mentee",
    level: "Cao",
    date: "20/11/2024",
    comment: "Chương trình Python nâng cao rất tốt nhưng thời gian học hơi dày đặc...",
    programName: "Python nâng cao",
  },
  {
    id: 2,
    userId: 20210002,
    userType: "tutor",
    level: "Trung bình",
    date: "19/11/2024",
    comment: "Đề xuất bổ sung thêm tài liệu tham khảo...",
    programName: "Cơ sở dữ liệu",
  },
  {
    id: 3,
    userId: 20220003,
    userType: "mentee",
    level: "Thấp",
    date: "18/11/2024",
    comment: "Cảm ơn thầy cô đã hỗ trợ...",
    programName: "Mobile App Development",
  },
  {
    id: 4,
    userId: 20210004,
    userType: "tutor",
    level: "Cao",
    date: "17/11/2024",
    comment: "Phòng thực hành cần cải thiện thêm trang thiết bị...",
    programName: "Backend Development",
  },
];

export default function AdminData(): React.ReactElement {
  const [programRequests, setProgramRequests] = useState<ProgramRequest[]>([
    {
      id: 1,
      title: "Web Development",
      description:
        "Yêu cầu mở chương trình đào tạo Web Development cho học kỳ tới với dự kiến 50 sinh viên tham gia. Chương trình bao gồm HTML, CSS, JavaScript và React.",
      date: "15/10/2024",
      mentees: 50,
      status: "pending",
    },
    {
      id: 2,
      title: "Data Science",
      description:
        "Đề xuất mở chương trình Data Science với Python, Machine Learning và Deep Learning cho 30 sinh viên năm 3, 4.",
      date: "18/11/2024",
      mentees: 30,
      status: "pending",
    },
    {
      id: 3,
      title: "Mobile Development",
      description: "Chương trình đào tạo phát triển ứng dụng di động với Flutter và React Native.",
      date: "10/11/2024",
      mentees: 40,
      status: "approved",
    },
  ]);

  const [filter, setFilter] = useState<"all" | "level">("all");

  const approveRequest = (id: number) => {
    setProgramRequests((prev) => prev.map((p) => (p.id === id ? { ...p, status: "approved" } : p)));
  };
  const rejectRequest = (id: number) => {
    setProgramRequests((prev) => prev.filter((p) => p.id !== id));
  };
  const [perPage, setPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const options = [4, 5, 6, 7, 8, 9, 10];
  const totalPages = Math.ceil(feedbacks.length / perPage);
  const displayedFeedbacks = feedbacks.slice((currentPage - 1) * perPage, currentPage * perPage);

  const getUser = (userId: number, userType: "mentee" | "tutor") =>
    userType === "mentee" ? mentees.find((m) => m.id === userId) : tutors.find((t) => t.id === userId);

  const levelColorMap: Record<string, string> = {
    Cao: "text-red-600 bg-red-100",
    "Trung bình": "text-orange-600 bg-yellow-100",
    Thấp: "text-green-700 bg-green-100",
  };
  const typeColorMap: Record<string, string> = {
    mentee: "text-blue-700 bg-blue-100",
    tutor: "text-purple-700 bg-purple-100",
  };

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      {/* Header */}
      <h1 className='text-2xl font-bold'>Dữ liệu & Yêu cầu</h1>
      <p className='mt-1 text-gray-500'>Quản lý dữ liệu, yêu cầu mở chương trình và ý kiến từ sinh viên, tutor</p>

      {/* Stat cards */}
      <div className='mt-6 grid grid-cols-4 gap-4'>
        <StatCard
          label='Yêu cầu xử lý'
          value='24'
          icon={<Clock className='h-6 w-6 text-orange-500' />}
          valueColor='text-orange-600'
        />
        <StatCard
          label='Ý kiến mới'
          value='47'
          icon={<MessageCircle className='h-6 w-6 text-blue-500' />}
          valueColor='text-blue-600'
        />
        <StatCard
          label='Đã xử lý'
          value='156'
          icon={<CheckCircle className='h-6 w-6 text-green-500' />}
          valueColor='text-green-600'
        />
        <StatCard
          label='Từ chối'
          value='12'
          icon={<CircleX className='h-6 w-6 text-red-500' />}
          valueColor='text-red-600'
        />
      </div>

      {/* Program Requests */}
      <div className='mt-8'>
        <h2 className='mb-3 text-lg font-semibold'>Yêu cầu mở chương trình</h2>
        <div className='flex flex-col gap-4'>
          {programRequests.map((p) => (
            <div
              key={p.id}
              className={`rounded-lg border border-gray-300 p-4 ${p.status === "approved" ? "bg-green-50" : "bg-white"}`}
            >
              <div className='flex items-start justify-between'>
                <div>
                  <h3 className='font-semibold'>{p.title}</h3>
                  <p className='mt-1 line-clamp-3 text-sm text-gray-600'>{p.description}</p>
                  <div className='mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500'>
                    <div className='flex items-center gap-1'>
                      <User className='h-3.5 w-3.5' />
                      TS. Nguyễn Văn A
                    </div>
                    <div className='flex items-center gap-1'>
                      <Calendar className='h-3.5 w-3.5' />
                      {p.date}
                    </div>
                    <div className='flex items-center gap-1'>
                      <Users className='h-3.5 w-3.5' />
                      {p.mentees} sinh viên dự kiến
                    </div>
                  </div>
                </div>
                <div className='flex gap-2'>
                  {p.status === "pending" ? (
                    <>
                      <button
                        onClick={() => {
                          approveRequest(p.id);
                        }}
                        className='rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700'
                      >
                        Duyệt
                      </button>
                      <button
                        onClick={() => {
                          rejectRequest(p.id);
                        }}
                        className='rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700'
                      >
                        Từ chối
                      </button>
                    </>
                  ) : (
                    <span className='flex items-center gap-1 rounded bg-gray-200 px-3 py-1 text-sm text-green-700'>
                      <CheckCircle className='h-4 w-4' />
                      Đã duyệt
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Section */}
      <div className='mt-8'>
        <div className='mb-3 flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>Ý kiến từ Sinh viên & Tutor</h2>
          {/* Filters */}
          <div className='flex gap-2'>
            <button
              className={`rounded border border-gray-300 px-3 py-1 text-gray-600 ${filter === "all" ? "bg-gray-200" : "bg-white"}`}
              onClick={() => {
                setFilter("all");
              }}
            >
              Tất cả
            </button>
            <button
              className={`rounded border border-gray-300 px-3 py-1 text-gray-600 ${filter === "level" ? "bg-gray-200" : "bg-white"}`}
              onClick={() => {
                setFilter("level");
              }}
            >
              Mức độ
            </button>
          </div>
        </div>
        {displayedFeedbacks.map((f) => {
          const user = getUser(f.userId, f.userType);
          if (!user) return null;

          return (
            <div key={f.id} className='flex justify-between gap-4 rounded-lg border border-gray-300 bg-white p-4'>
              {/* Avatar */}
              <img src={user.avatarUrl} alt={user.name} className='h-12 w-12 rounded-full object-cover' />

              {/* Content */}
              <div className='flex-1'>
                <div className='flex flex-wrap items-center gap-2'>
                  <span className='font-semibold'>{user.name}</span>
                  <span className={`rounded px-1 text-xs ${typeColorMap[f.userType]}`}>
                    {f.userType === "mentee" ? "Sinh viên" : "Tutor"}
                  </span>
                  <span className={`rounded px-1 text-xs ${levelColorMap[f.level]}`}>{f.level}</span>
                </div>
                <p className='mt-1 text-sm text-gray-600'>{f.comment}</p>
                <div className='mt-1 text-sm text-gray-500'>Chương trình: {f.programName}</div>
              </div>

              {/* Utilities */}
              <div className='flex flex-col items-end gap-2 text-right'>
                <div className='text-sm font-medium text-gray-700'>{f.date}</div>
                <div className='flex items-center gap-2'>
                  <span className='flex items-center gap-1 text-sm text-green-600'>
                    <Check className='h-4 w-4' /> Xử lý
                  </span>
                  <Undo2 className='h-4 w-4 cursor-pointer text-blue-500' />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SELECT*/}
      <div className='mt-4 mb-2 flex items-center justify-between text-sm text-gray-600'>
        <div className='flex items-center gap-2'>
          <span>Hiển thị</span>
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className='rounded border border-gray-300 px-2 py-1 text-sm text-gray-600'
          >
            {options.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <span>trên tổng số {feedbacks.length} ý kiến</span>
        </div>
      </div>
      {/* Pagination */}
      <div className='mt-2 flex justify-end gap-2'>
        <button
          onClick={() => {
            setCurrentPage((prev) => Math.max(prev - 1, 1));
          }}
          className='rounded border border-gray-300 bg-white px-3 py-1 hover:bg-gray-50'
        >
          ‹
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => {
              setCurrentPage(i + 1);
            }}
            className={`rounded border border-gray-300 px-3 py-1 ${currentPage === i + 1 ? "bg-sky-600 text-white" : "bg-white hover:bg-gray-50"}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => {
            setCurrentPage((prev) => Math.min(prev + 1, totalPages));
          }}
          className='rounded border border-gray-300 bg-white px-3 py-1 hover:bg-gray-50'
        >
          ›
        </button>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  valueColor = "text-gray-900",
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  valueColor?: string;
}) {
  return (
    <div className='flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm'>
      <div>
        <div className='text-sm text-gray-500'>{label}</div>
        <div className={`text-3xl font-semibold ${valueColor}`}>{value}</div>
      </div>
      <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100'>{icon}</div>
    </div>
  );
}
