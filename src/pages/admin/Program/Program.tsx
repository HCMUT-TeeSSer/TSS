import React, { useMemo, useState } from "react";
import {
  BookOpen,
  Users,
  GraduationCap,
  CheckCircle,
  Eye,
  Edit2,
  Trash2,
  Globe,
  Code,
  Calculator,
  Ear,
  Dna,
  Cpu,
  Search,
  BarChart2,
} from "lucide-react";

import { programs as PROGRAMS_DATA } from "../../../data/programs";
import type { Program } from "../../../data/programs";
import { tutors as TUTORS_DATA } from "@/data/tutors";

export type { Program };

export default function ProgramAdminPage(): React.ReactElement {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [programs, setPrograms] = useState<Program[]>(PROGRAMS_DATA);
  const [newProgramTitle, setNewProgramTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newBadge, setNewBadge] = useState("Mới");
  const [newColor, setNewColor] = useState("blue");
  const [newIcon, setNewIcon] = useState("globe");
  const [mainTutorId, setMainTutorId] = useState<number | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const totalTutors = PROGRAMS_DATA.reduce((acc, p) => acc + p.availableTutors, 0);
  const totalMentees = PROGRAMS_DATA.reduce((acc, p) => acc + p.totalMentee, 0);

  // Map program.icon string -> lucide-react icon
  const getProgramIcon = (iconName?: string) => {
    switch ((iconName ?? "").toLowerCase()) {
      case "az":
        return <Code className='h-6 w-6 text-white' />;
      case "calculator":
        return <Calculator className='h-6 w-6 text-white' />;
      case "settings":
        return <Ear className='h-6 w-6 text-white' />;
      case "dna":
        return <Dna className='h-6 w-6 text-white' />;
      case "robot":
        return <Cpu className='h-6 w-6 text-white' />;
      case "chart":
        return <BarChart2 className='h-6 w-6 text-white' />;
      default:
        return <Globe className='h-6 w-6 text-white' />;
    }
  };

  const colorMap = (color?: string) => {
    switch ((color ?? "").toLowerCase()) {
      case "pink":
        return { bg: "bg-pink-50", iconBg: "bg-pink-400", btn: "bg-pink-500" };
      case "blue":
        return { bg: "bg-blue-50", iconBg: "bg-blue-500", btn: "bg-blue-600" };
      case "green":
        return { bg: "bg-green-50", iconBg: "bg-green-400", btn: "bg-green-500" };
      case "orange":
        return { bg: "bg-orange-50", iconBg: "bg-orange-400", btn: "bg-orange-500" };
      case "purple":
        return { bg: "bg-violet-50", iconBg: "bg-violet-400", btn: "bg-violet-600" };
      case "red":
        return { bg: "bg-red-50", iconBg: "bg-red-400", btn: "bg-red-500" };
      default:
        return { bg: "bg-slate-50", iconBg: "bg-slate-400", btn: "bg-sky-600" };
    }
  };
  const filteredPrograms = useMemo(
    () => PROGRAMS_DATA.filter((p) => p.title.toLowerCase().includes(searchKeyword.toLowerCase())),
    [searchKeyword]
  );

  const totalPages = Math.max(1, Math.ceil(filteredPrograms.length / itemsPerPage));
  const paginatedPrograms = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPrograms.slice(start, start + itemsPerPage);
  }, [currentPage, filteredPrograms, itemsPerPage]);
  return (
    <main className='flex-1 p-8'>
      <h1 className='text-2xl font-bold'>Quản lí chương trình</h1>
      <p className='mt-1 text-sm text-gray-500'>Quản lý nội dung, tutor và sinh viên trong các chương trình học</p>

      {/* Stat cards */}
      <div className='mt-6 grid grid-cols-4 gap-4'>
        <StatCard
          label='Tổng chương trình'
          value={String(PROGRAMS_DATA.length)}
          icon={<BookOpen className='h-6 w-6 text-sky-600' />}
          valueColor='text-sky-600'
        />
        <StatCard
          label='Đang hoạt động'
          value={String(PROGRAMS_DATA.filter((p) => p.isAvailable).length)}
          icon={<CheckCircle className='h-6 w-6 text-green-600' />}
          valueColor='text-green-600'
        />
        <StatCard
          label='Tổng tutor'
          value={String(totalTutors)}
          icon={<Users className='h-6 w-6 text-violet-600' />}
          valueColor='text-violet-600'
        />
        <StatCard
          label='Tổng sinh viên'
          value={String(totalMentees)}
          icon={<GraduationCap className='h-6 w-6 text-amber-500' />}
          valueColor='text-amber-500'
        />
      </div>

      {/* Search + create */}
      <div className='mt-8 mb-4 flex items-center justify-between'>
        <h2 className='text-lg font-semibold'>Danh sách chương trình</h2>
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400' />
            <input
              className='w-80 rounded-lg border border-gray-200 py-2 pr-4 pl-9'
              placeholder='Tìm kiếm chương trình...'
              value={searchKeyword}
              onChange={(e) => {
                setSearchKeyword(e.target.value);
              }}
            />
          </div>
          <button
            className='rounded-lg bg-sky-600 px-4 py-2 text-white'
            onClick={() => {
              setShowCreateForm(true);
            }}
          >
            + Tạo chương trình
          </button>
        </div>
      </div>
      {showCreateForm && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div className='relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl'>
            {/* Nút tắt */}
            <button
              className='absolute top-3 right-3 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600'
              onClick={() => {
                setShowCreateForm(false);
              }}
            >
              ✕
            </button>

            <h2 className='mb-4 text-xl font-semibold text-gray-800'>Tạo chương trình mới</h2>

            <div className='space-y-3'>
              <input
                type='text'
                placeholder='Tên chương trình'
                className='w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none'
                value={newProgramTitle}
                onChange={(e) => {
                  setNewProgramTitle(e.target.value);
                }}
              />
              <textarea
                placeholder='Mô tả'
                className='w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none'
                value={newDescription}
                onChange={(e) => {
                  setNewDescription(e.target.value);
                }}
              />
              <input
                type='text'
                placeholder='Badge'
                className='w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none'
                value={newBadge}
                onChange={(e) => {
                  setNewBadge(e.target.value);
                }}
              />

              <div className='flex gap-2'>
                <select
                  value={newColor}
                  onChange={(e) => {
                    setNewColor(e.target.value);
                  }}
                  className='flex-1 rounded-lg border px-3 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none'
                  aria-label='Chọn màu chương trình'
                >
                  <option value='blue'>Blue</option>
                  <option value='pink'>Pink</option>
                  <option value='green'>Green</option>
                  <option value='orange'>Orange</option>
                  <option value='purple'>Purple</option>
                  <option value='red'>Red</option>
                </select>

                <select
                  value={newIcon}
                  onChange={(e) => {
                    setNewIcon(e.target.value);
                  }}
                  className='flex-1 rounded-lg border px-3 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none'
                  aria-label='Chọn biểu tượng chương trình'
                >
                  <option value='globe'>Globe</option>
                  <option value='az'>Code</option>
                  <option value='calculator'>Calculator</option>
                  <option value='dna'>DNA</option>
                  <option value='robot'>CPU</option>
                  <option value='chart'>Chart</option>
                </select>
              </div>

              {/* Main tutor */}
              <select
                value={mainTutorId ?? ""}
                onChange={(e) => {
                  setMainTutorId(Number(e.target.value));
                }}
                className='w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none'
                aria-label='Chọn tutor chính'
              >
                <option value=''>-- Chọn tutor chính --</option>
                {TUTORS_DATA.filter((t) => t.status === "Hoạt động").map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>

              <button
                className='w-full rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700'
                onClick={() => {
                  if (!newProgramTitle || !mainTutorId) {
                    alert("Vui lòng nhập tên chương trình và chọn tutor chính.");
                    return;
                  }
                  const mainTutor = TUTORS_DATA.find((t) => t.id === mainTutorId);
                  if (!mainTutor) {
                    alert("Tutor chính không hợp lệ.");
                    return;
                  }
                  const newProgram: Program = {
                    id: PROGRAMS_DATA[PROGRAMS_DATA.length - 1]?.id + 1 || 1,
                    title: newProgramTitle,
                    description: newDescription || "Mô tả chương trình mới",
                    isAvailable: true,
                    availableTutors: 1,
                    totalMentee: 0,
                    duration: "3 tháng",
                    progress: 0,
                    badge: newBadge,
                    color: newColor,
                    icon: newIcon,
                    mainTutor,
                    listTutor: [mainTutor], // chỉ mainTutor
                    rating: 0,
                    category: "Khác",
                    department: "Không xác định",
                    difficulty: "Dễ",
                    learningFormat: "...",
                    chapters: [],
                    competencies: [],
                  };

                  setPrograms([newProgram, ...programs]);
                  setNewProgramTitle("");
                  setNewDescription("");
                  setNewBadge("Mới");
                  setNewColor("blue");
                  setNewIcon("globe");
                  setMainTutorId(null);
                  setShowCreateForm(false);
                }}
              >
                Tạo chương trình
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Programs list */}
      <div className='flex flex-col gap-4'>
        {paginatedPrograms.map((p: Program) => {
          const colors = colorMap(p.color);
          return (
            <div key={p.id} className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
              <div className='flex items-start justify-between'>
                <div className='flex gap-4'>
                  <div className={`flex h-14 w-14 items-center justify-center rounded-lg ${colors.iconBg}`}>
                    {getProgramIcon(p.icon)}
                  </div>
                  <div>
                    <div className='flex items-center gap-3'>
                      <h3 className='text-lg font-semibold'>{p.title}</h3>
                      <span className='rounded-full border border-gray-200 px-2 py-1 text-xs text-gray-500'>
                        {p.badge}
                      </span>
                    </div>
                    <p className='mt-1 line-clamp-2 text-sm text-gray-500'>{p.description}</p>
                    <div className='mt-3 flex gap-6 text-sm text-gray-600'>
                      <div>👨‍🏫 {p.availableTutors} tutor</div>
                      <div>🎓 {p.totalMentee} sinh viên</div>
                      <div>⏳ {p.duration}</div>
                    </div>
                    <div className='mt-3 flex items-center gap-2 text-sm font-normal text-gray-500'>
                      Tutor chính:
                      <img
                        src={p.mainTutor.avatarUrl}
                        alt={p.mainTutor.name}
                        className='h-6 w-6 rounded-full object-cover'
                      />
                      <span className='font-bold text-gray-800'>{p.mainTutor.name}</span>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col items-end gap-3'>
                  <div className='flex items-center gap-2'>
                    {p.isAvailable ? (
                      <span className='rounded-full bg-green-50 px-3 py-1 text-sm text-green-700'>Đang hoạt động</span>
                    ) : (
                      <span className='rounded-full bg-rose-50 px-3 py-1 text-sm text-rose-700'>Tạm dừng</span>
                    )}
                    <button title='Xem' className='rounded p-2 hover:bg-slate-100'>
                      <Eye className='h-5 w-5 text-sky-500' />
                    </button>
                    <button title='Chỉnh sửa' className='rounded p-2 hover:bg-slate-100'>
                      <Edit2 className='h-5 w-5 text-sky-600' />
                    </button>
                    <button title='Xóa' className='rounded p-2 hover:bg-slate-100'>
                      <Trash2 className='h-5 w-5 text-rose-600' />
                    </button>
                  </div>

                  <ProgressBar progress={p.progress} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className='mt-6 flex items-center justify-between'>
        <div className='flex items-center gap-3 text-sm text-gray-600'>
          <span>Hiển thị</span>
          <select
            className='rounded-lg border border-gray-300 px-2 py-1 text-sm'
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
            }}
            aria-label='Số chương trình trên mỗi trang'
          >
            {Array.from({ length: 7 }, (_, i) => i + 4).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span>
            trên tổng số <span className='font-medium'>{PROGRAMS_DATA.length}</span> chương trình
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => {
              setCurrentPage((s) => Math.max(1, s - 1));
            }}
            disabled={currentPage === 1}
            className='rounded border border-gray-200 bg-white px-3 py-1 hover:bg-slate-50 disabled:opacity-50'
          >
            ‹
          </button>
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                }}
                className={`rounded border border-gray-200 px-3 py-1 ${currentPage === page ? "bg-sky-600 text-white" : "bg-white"}`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => {
              setCurrentPage((s) => Math.min(totalPages, s + 1));
            }}
            disabled={currentPage === totalPages}
            className='rounded border border-gray-200 bg-white px-3 py-1 hover:bg-slate-50 disabled:opacity-50'
          >
            ›
          </button>
        </div>
      </div>
    </main>
  );
}

/* ---------------- Components ---------------- */
function ProgressBar({ progress }: { progress: number }) {
  // Use data attribute to avoid inline style lint error
  return (
    <div className='w-48'>
      <div className='h-2 w-full rounded-full bg-slate-100'>
        <div
          className='h-2 rounded-full bg-sky-500 transition-all duration-300'
          style={{ width: `${String(progress)}%` }}
        />
      </div>
      <div className='mt-1 text-right text-xs text-gray-500'>{progress}% hoàn thành</div>
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
