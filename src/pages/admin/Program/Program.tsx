import React, { useMemo, useState } from "react";
import Logo from "../logo.png";
import {
  Mail,
  Bell,
  BookOpen,
  Users,
  GraduationCap,
  ChevronDown,
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

export type { Program };

function HeaderNotifications({ bellCount = 3, mailCount = 5 }: { bellCount?: number; mailCount?: number }) {
  return (
    <div className='flex items-center gap-3'>
      <div className='relative'>
        <Bell className='h-5 w-5 text-gray-400' />
        {bellCount > 0 && (
          <span className='absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-red-500 text-xs text-white'>
            {bellCount}
          </span>
        )}
      </div>
      <div className='relative'>
        <Mail className='h-5 w-5 text-gray-400' />
        {mailCount > 0 && (
          <span className='absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-blue-500 text-xs text-white'>
            {mailCount}
          </span>
        )}
      </div>
    </div>
  );
}
export default function ProgramAdminPage(): React.ReactElement {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

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
    <div className='flex min-h-screen flex-col'>
      {/* Header */}
      <header className='flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4'>
        <div className='flex items-center gap-3'>
          <div className='flex h-16 w-16 items-center justify-center overflow-hidden rounded-md bg-white'>
            <img src={Logo} alt='Logo trường' className='h-full w-full object-contain' />
          </div>
          <div className='text-lg font-semibold'>Tutor Support System</div>
        </div>

        <div className='ml-auto flex items-center gap-6'>
          <HeaderNotifications />
          <div className='flex cursor-pointer items-center gap-3'>
            <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-200'>NB</div>
            <div className='flex max-w-[160px] items-center gap-2'>
              <div className='truncate text-left'>
                <div className='truncate font-medium'>Nguyễn Thị B</div>
                <div className='truncate text-xs text-gray-500'>Phòng Đào tạo</div>
              </div>
              <ChevronDown className='h-4 w-4 flex-shrink-0 text-gray-500' />
            </div>
          </div>
        </div>
      </header>

      <div className='flex flex-1'>
        {/* Sidebar */}
        <aside className='flex w-64 flex-col border-r border-gray-200 bg-white p-6'>
          <nav className='mt-8 flex flex-col gap-2'>
            <button className='flex items-center gap-3 rounded-lg bg-sky-600 px-4 py-2 font-medium text-white'>
              <div className='flex h-8 w-8 items-center justify-center rounded-md bg-slate-100'>
                <BookOpen className='h-5 w-5 text-slate-500' />
              </div>
              <span>Quản lí chương trình</span>
            </button>
            <button className='flex items-center gap-3 rounded-lg px-4 py-2 hover:bg-slate-100'>
              <div className='flex h-8 w-8 items-center justify-center rounded-md bg-slate-100'>
                <Users className='h-5 w-5 text-slate-500' />
              </div>
              <span>Quản lí tutor</span>
            </button>
            <button className='flex items-center gap-3 rounded-lg px-4 py-2 hover:bg-slate-100'>
              <div className='flex h-8 w-8 items-center justify-center rounded-md bg-slate-100'>
                <GraduationCap className='h-5 w-5 text-slate-500' />
              </div>
              <span>Quản lí sinh viên</span>
            </button>
          </nav>
          <div className='mt-auto pt-6 text-xs text-gray-400'>© 2025 Tutor Support System</div>
        </aside>

        {/* Main */}
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
              <button className='rounded-lg bg-sky-600 px-4 py-2 text-white'>+ Tạo chương trình</button>
            </div>
          </div>

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
                          <span className='rounded-full bg-green-50 px-3 py-1 text-sm text-green-700'>
                            Đang hoạt động
                          </span>
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

                      <div className='w-48'>
                        <div className='h-2 w-full rounded-full bg-slate-100'>
                          <div className='h-2 rounded-full bg-sky-500' style={{ width: `${String(p.progress)}%` }} />
                        </div>
                        <div className='mt-1 text-right text-xs text-gray-500'>{p.progress}% hoàn thành</div>
                      </div>
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
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */
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
