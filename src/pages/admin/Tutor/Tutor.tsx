import React, { useMemo, useState } from "react";
import { removeVietnameseTones } from "./../utils";
import { Users, UserCheck, Star, Download, Eye, Edit2, Trash2, Search, BarChart2 } from "lucide-react";

import "jspdf-autotable";

import { tutors } from "../../../data/tutors";
import { programs as PROGRAMS_DATA } from "../../../data/programs";
import type { Program } from "../../../data/programs";

export type { Program };

export default function TutorAdminPage(): React.ReactElement {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả chương trình");

  const programCategories = Array.from(new Set(PROGRAMS_DATA.map((p) => p.category)));

  const colorMap: Record<string, string> = {
    pink: "bg-pink-100 text-pink-700",
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    purple: "bg-purple-100 text-purple-700",
    red: "bg-red-100 text-red-700",
    orange: "bg-orange-100 text-orange-700",
  };

  /** Filter tutors by search and category */
  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      const matchesSearch = tutor.name.toLowerCase().includes(searchKeyword.toLowerCase());
      const matchesCategory =
        selectedCategory === "Tất cả chương trình" ||
        PROGRAMS_DATA.some((p) => p.category === selectedCategory && p.listTutor.some((lt) => lt.id === tutor.id));
      return matchesSearch && matchesCategory;
    });
  }, [searchKeyword, selectedCategory]);

  /** Pagination */
  const totalPages = Math.max(1, Math.ceil(filteredTutors.length / itemsPerPage));
  const displayedTutors = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTutors.slice(start, start + itemsPerPage);
  }, [filteredTutors, currentPage, itemsPerPage]);

  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [reportTitle, setReportTitle] = useState("");
  const [exportFormat, setExportFormat] = useState<"excel" | "pdf">("excel");

  const handleExport = async () => {
    if (exportFormat === "excel") {
      const XLSX = await import("xlsx");
      const wsData = filteredTutors.map((tutor) => {
        const programs = PROGRAMS_DATA.filter((p) => p.listTutor.some((t) => t.id === tutor.id))
          .map((p) => p.title)
          .join(", ");
        return {
          "Tiêu đề": reportTitle || "Báo cáo Tutor",
          Tutor: tutor.name,
          "Chương trình": programs || "Không có chương trình",
          "Số sinh viên": tutor.totalMentee,
          "Đánh giá": tutor.rating,
          "Trạng thái": tutor.status,
        };
      });

      const ws = XLSX.utils.json_to_sheet(wsData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Tutors");
      XLSX.writeFile(wb, `${reportTitle || "Tutors_Report"}.xlsx`);
    } else {
      const { jsPDF } = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;
      const doc = new jsPDF();
      const tableColumn = ["Tutor", "Chuong trinh", "So sinh vien", "Danh gia", "Trang thai"];
      const tableRows = filteredTutors.map((tutor) => {
        const programs = PROGRAMS_DATA.filter((p) => p.listTutor.some((t) => t.id === tutor.id))
          .map((p) => p.title)
          .join(", ");

        return [
          removeVietnameseTones(tutor.name),
          removeVietnameseTones(programs || "Không có chương trình"),
          tutor.totalMentee,
          tutor.rating,
          removeVietnameseTones(tutor.status),
        ];
      });
      doc.setFontSize(16);
      doc.text(reportTitle || "Báo cáo Tutor", 14, 15);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 25,
        styles: { fontSize: 10 },
        columnStyles: {
          0: { cellWidth: 40 },
          1: { cellWidth: 60 },
          2: { cellWidth: 30 },
          3: { cellWidth: 30 },
          4: { cellWidth: 30 },
        },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      });

      doc.save(`${reportTitle || "Tutors_Report"}.pdf`);
    }
  };

  return (
    <main className='flex-1 p-8'>
      {/* Title */}
      <h1 className='text-2xl font-bold'>Quản lí tutor</h1>
      <p className='mt-1 text-sm text-gray-500'>Quản lý thông tin tutor, lớp học và đánh giá từ sinh viên</p>

      {/* Stat cards */}
      <div className='mt-6 grid grid-cols-4 gap-4'>
        <StatCard
          label='Tổng tutor'
          value={tutors.length.toString()}
          icon={<Users className='h-6 w-6 text-violet-600' />}
          valueColor='text-violet-600'
        />
        <StatCard
          label='Đang hoạt động'
          value={String(tutors.filter((t) => t.status === "Hoạt động").length)}
          icon={<UserCheck className='h-6 w-6 text-green-600' />}
          valueColor='text-green-600'
        />
        <StatCard
          label='Đánh giá trung bình'
          value={(tutors.reduce((s, t) => s + t.rating, 0) / tutors.length).toFixed(1)}
          icon={<Star className='h-6 w-6 text-amber-500' />}
          valueColor='text-amber-500'
        />
        <StatCard
          label='Khối lượng công việc'
          value='78%'
          icon={<BarChart2 className='h-6 w-6 text-sky-600' />}
          valueColor='text-sky-600'
        />
      </div>

      {/* Filter + Search */}
      <div className='mt-10 rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>Danh sách tutor</h2>
          <div className='flex items-center gap-3'>
            <select
              className='rounded-lg border border-gray-300 px-3 py-2 text-sm'
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
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
                placeholder='Tìm kiếm tutor...'
                value={searchKeyword}
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                }}
              />
            </div>
            <div className='flex items-center gap-2'>
              <button
                onClick={() => {
                  setExportModalOpen(true);
                }}
                className='flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700'
              >
                <Download className='h-4 w-4' />
                Xuất báo cáo
              </button>
            </div>
            <button className='rounded-lg bg-sky-600 px-4 py-2 text-white'>+ Thêm tutor</button>
          </div>
        </div>
        {exportModalOpen && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
            <div className='w-96 rounded-lg bg-white p-6'>
              <h2 className='mb-4 text-lg font-semibold'>Xuất báo cáo</h2>

              <div className='mb-4'>
                <label className='mb-1 block text-sm font-medium'>Tiêu đề báo cáo</label>
                <input
                  type='text'
                  className='w-full rounded border border-gray-300 px-3 py-2 text-sm'
                  value={reportTitle}
                  onChange={(e) => {
                    setReportTitle(e.target.value);
                  }}
                  placeholder='Nhập tiêu đề báo cáo'
                />
              </div>

              <div className='mb-4'>
                <span className='mb-1 block text-sm font-medium'>Chọn định dạng</span>
                <div className='flex gap-4'>
                  <label className='flex items-center gap-2'>
                    <input
                      type='radio'
                      name='format'
                      value='excel'
                      checked={exportFormat === "excel"}
                      onChange={() => {
                        setExportFormat("excel");
                      }}
                    />
                    Excel
                  </label>
                  <label className='flex items-center gap-2'>
                    <input
                      type='radio'
                      name='format'
                      value='pdf'
                      checked={exportFormat === "pdf"}
                      onChange={() => {
                        setExportFormat("pdf");
                      }}
                    />
                    PDF
                  </label>
                </div>
              </div>

              <div className='flex justify-end gap-3'>
                <button
                  className='rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300'
                  onClick={() => {
                    setExportModalOpen(false);
                  }}
                >
                  Hủy
                </button>
                <button onClick={() => void handleExport()}>Xuất</button>
              </div>
            </div>
          </div>
        )}

        {/* TABLE */}
        <div className='mt-4 overflow-hidden rounded-xl bg-white'>
          <table className='w-full border-collapse text-sm'>
            <thead className='bg-gray-50 font-bold text-gray-700'>
              <tr className='border-b border-gray-300'>
                <th className='p-3 text-left'>Tutor</th>
                <th className='p-3 text-left'>Chương trình tham gia</th>
                <th className='p-3'>Sinh viên</th>
                <th className='p-3'>Đánh giá</th>
                <th className='p-3'>Trạng thái</th>
                <th className='p-3 text-center'>Thao tác</th>
              </tr>
            </thead>
            <tbody className='text-gray-700'>
              {displayedTutors.map((tutor) => {
                const tutorPrograms = PROGRAMS_DATA.filter((p) => p.listTutor.some((t) => t.id === tutor.id)).slice(
                  0,
                  2
                );

                return (
                  <tr key={tutor.id} className='border-b border-gray-300 hover:bg-gray-50'>
                    <td className='flex items-center gap-3 p-3'>
                      <img src={tutor.avatarUrl} className='h-10 w-10 rounded-full object-cover' alt={tutor.name} />
                      <div>
                        <div className='font-bold'>{tutor.name}</div>
                        <div className='text-sm text-gray-500'>MSSV: {tutor.id}</div>
                      </div>
                    </td>
                    <td className='p-3'>
                      <div className='flex flex-wrap gap-2'>
                        {tutorPrograms.map((p) => (
                          <span
                            key={p.id}
                            className={`rounded-full px-2 py-1 text-xs font-medium ${colorMap[p.color]}`}
                          >
                            {p.title}
                          </span>
                        ))}
                        {tutorPrograms.length === 0 && (
                          <span className='text-sm text-gray-400 italic'>Không có chương trình</span>
                        )}
                      </div>
                    </td>
                    <td className='p-3 text-center'>
                      <div className='flex flex-col items-center'>
                        <span className='text-lg font-bold'>{tutor.totalMentee}</span>
                        <span className='text-xs text-gray-500'>sinh viên</span>
                      </div>
                    </td>
                    <td className='p-3 text-center'>
                      <div className='flex items-center justify-center gap-1'>
                        {Array.from({ length: 5 }).map((_, i) => {
                          const filled = i < Math.round(tutor.rating);
                          return filled ? (
                            <Star key={i} className='h-4 w-4 text-amber-500' fill='currentColor' />
                          ) : (
                            <Star key={i} className='h-4 w-4 text-amber-500' fill='none' stroke='currentColor' />
                          );
                        })}
                        <span className='ml-1 text-sm font-bold'>{tutor.rating}</span>
                      </div>
                    </td>
                    <td className='p-3 text-center'>
                      {tutor.status === "Hoạt động" ? (
                        <span className='rounded-full bg-green-50 px-3 py-1 text-sm text-green-700'>Hoạt động</span>
                      ) : (
                        <span className='rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-700'>Tạm dừng</span>
                      )}
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className='mt-6 flex items-center justify-between'>
        <div className='flex items-center gap-3 text-sm text-gray-600'>
          <span>Hiển thị</span>
          <select
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
            trên tổng số <span className='font-medium'>{filteredTutors.length}</span> tutor
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

/* ---------------- components ---------------- */
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
