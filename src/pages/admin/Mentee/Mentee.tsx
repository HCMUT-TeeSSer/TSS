import React, { useMemo, useState } from "react";
import Logo from "../logo.png";
import {
  Mail,
  Bell,
  ChevronDown,
  BookOpen,
  Users,
  GraduationCap,
  UserCheck,
  Star,
  Download,
  Eye,
  Edit2,
  Trash2,
  Search,
  CheckCircle,
} from "lucide-react";

import { mentees } from "../../../data/mentees";
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
export default function MenteeAdminPage(): React.ReactElement {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả chương trình");

  const programCategories = Array.from(new Set(PROGRAMS_DATA.map((p) => p.category)));

  const colorMap: Record<string, string> = {
    pink: "bg-pink-100 text-pink-700",
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    purple: "bg-purple-100 text-purple-700",
    red: "bg-red-100 text-red-700",
    orange: "bg-orange-100 text-orange-700",
  };

  // Filter mentees
  const filteredMentees = useMemo(() => {
    return mentees.filter((m) => {
      const matchesSearch = m.name.toLowerCase().includes(searchKeyword.toLowerCase());
      const matchesCategory =
        selectedCategory === "Tất cả chương trình" || m.listCourse.some((p) => p.category === selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [searchKeyword, selectedCategory]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredMentees.length / itemsPerPage));
  const displayedMentees = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredMentees.slice(start, start + itemsPerPage);
  }, [filteredMentees, currentPage, itemsPerPage]);

  // Stats
  const totalCoursesCompleted = mentees.filter((m) => m.listCourse.every((p) => p.progress === 100)).length;
  const avgScore = (mentees.reduce((s, m) => s + m.rating, 0) / mentees.length).toFixed(1);

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
          <HeaderNotifications bellCount={3} mailCount={5} />
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
            <button className='flex items-center gap-3 rounded-lg px-4 py-2 hover:bg-slate-100'>
              <div className='flex h-8 w-8 items-center justify-center rounded-md bg-slate-100'>
                <BookOpen className='h-5 w-5 text-slate-500' />
              </div>
              <span className='font-medium whitespace-nowrap text-gray-900'>Quản lí chương trình</span>
            </button>
            <button className='flex items-center gap-3 rounded-lg px-4 py-2 hover:bg-slate-100'>
              <div className='flex h-8 w-8 items-center justify-center rounded-md bg-slate-100'>
                <Users className='h-5 w-5 text-slate-500' />
              </div>
              <span className='whitespace-nowrap'>Quản lí tutor</span>
            </button>
            <button className='flex items-center gap-3 rounded-lg bg-sky-600 px-4 py-2 font-medium text-white'>
              <div className='flex h-8 w-8 items-center justify-center rounded-md bg-slate-100'>
                <GraduationCap className='h-5 w-5 text-slate-500' />
              </div>
              <span className='whitespace-nowrap'>Quản lí sinh viên</span>
            </button>
          </nav>
          <div className='mt-auto pt-6 text-xs text-gray-400'>© 2025 Tutor Support System</div>
        </aside>

        {/* Main */}
        <main className='flex-1 p-8'>
          <h1 className='text-2xl font-bold'>Quản lí sinh viên</h1>
          <p className='mt-1 text-sm text-gray-500'>
            Quản lý thông tin sinh viên, chương trình tham gia và đánh giá từ tutor
          </p>

          {/* Stat Cards */}
          <div className='mt-6 grid grid-cols-4 gap-4'>
            <StatCard
              label='Tổng sinh viên'
              value={mentees.length.toString()}
              icon={<GraduationCap className='h-6 w-6 text-amber-500' />}
              valueColor='text-amber-500'
            />
            <StatCard
              label='Đang học'
              value={String(mentees.filter((m) => m.listCourse.length > 0).length)}
              icon={<CheckCircle className='h-6 w-6 text-green-600' />}
              valueColor='text-green-600'
            />
            <StatCard
              label='Hoàn thành'
              value={totalCoursesCompleted.toString()}
              icon={<UserCheck className='h-6 w-6 text-sky-600' />}
              valueColor='text-sky-600'
            />
            <StatCard
              label='Điểm trung bình'
              value={avgScore}
              icon={<Star className='h-6 w-6 text-amber-500' />}
              valueColor='text-amber-500'
            />
          </div>

          {/* Filter + Search */}
          <div className='mt-10 rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold'>Danh sách sinh viên</h2>

              <div className='flex items-center gap-3'>
                <select
                  className='rounded-lg border border-gray-300 px-3 py-2 text-sm'
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1); // reset page khi đổi category
                  }}
                >
                  <option>Tất cả chương trình</option>
                  {programCategories.map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
                <div className='relative'>
                  <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400' />
                  <input
                    className='w-80 rounded-lg border border-gray-200 py-2 pr-4 pl-9'
                    placeholder='Tìm kiếm sinh viên...'
                    value={searchKeyword}
                    onChange={(e) => {
                      setSearchKeyword(e.target.value);
                      setCurrentPage(1); // reset page khi search
                    }}
                  />
                </div>
                <button className='flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700'>
                  <Download className='h-4 w-4' />
                  Xuất báo cáo
                </button>
              </div>
            </div>

            {/* Table */}
            <div className='mt-4 overflow-hidden rounded-xl bg-white'>
              <table className='w-full border-collapse text-sm'>
                <thead className='bg-gray-50 font-bold text-gray-700'>
                  <tr className='border-b border-gray-300'>
                    <th className='p-3 text-left'>Sinh viên</th>
                    <th className='p-3 text-left'>Chương trình tham gia</th>
                    <th className='p-3 text-center'>Đánh giá từ tutor</th>
                    <th className='p-3 text-center'>Thao tác</th>
                  </tr>
                </thead>
                <tbody className='text-gray-700'>
                  {displayedMentees.map((mentee) => (
                    <tr key={mentee.id} className='border-b border-gray-300 hover:bg-gray-50'>
                      <td className='flex items-center gap-3 p-3'>
                        <img src={mentee.avatarUrl} className='h-10 w-10 rounded-full object-cover' alt={mentee.name} />
                        <div>
                          <div className='font-bold'>{mentee.name}</div>
                          <div className='text-sm text-gray-500'>MSSV: {mentee.id}</div>
                        </div>
                      </td>
                      <td className='p-3'>
                        <div className='flex flex-wrap gap-2'>
                          {mentee.listCourse.map((p) => (
                            <span
                              key={p.id}
                              className={`rounded-full px-2 py-1 text-xs font-medium ${colorMap[p.color]}`}
                            >
                              {p.title}
                            </span>
                          ))}
                          {mentee.listCourse.length === 0 && (
                            <span className='text-sm text-gray-400 italic'>Không có chương trình</span>
                          )}
                        </div>
                      </td>
                      <td className='p-3 text-center'>
                        <div className='flex items-center justify-center gap-1'>
                          {Array.from({ length: 5 }).map((_, i) => {
                            const filled = i < Math.round(mentee.rating / 2);
                            return filled ? (
                              <Star key={i} className='h-4 w-4 text-amber-500' fill='currentColor' />
                            ) : (
                              <Star key={i} className='h-4 w-4 text-amber-500' fill='none' stroke='currentColor' />
                            );
                          })}
                          <span className='ml-1 text-sm font-bold'>{mentee.rating}</span>
                        </div>
                      </td>
                      <td className='flex items-center justify-center gap-2 p-3'>
                        <button className='rounded p-2 hover:bg-gray-100'>
                          <Eye className='h-4 w-4 text-sky-500' />
                        </button>
                        <button className='rounded p-2 hover:bg-gray-100'>
                          <Edit2 className='h-4 w-4 text-indigo-600' />
                        </button>
                        <button className='rounded p-2 hover:bg-gray-100'>
                          <Trash2 className='h-4 w-4 text-rose-600' />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                    setCurrentPage(1);
                  }}
                >
                  {[4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <span>
                  trên tổng số <span className='font-medium'>{mentees.length}</span> sinh viên
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
          </div>
        </main>
      </div>
    </div>
  );
}

/* StatCard component */
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
