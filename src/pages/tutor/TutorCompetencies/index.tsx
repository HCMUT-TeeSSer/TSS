import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { programs } from "../../../data/programs";
import { sampleUsers } from "@/utils/auth";
import path from "@/constants/path";
import { getGrade, getGradeLabel, getGradeColor, calculateAverageScore } from "@/utils/grading";
import { Download, Edit, FileText } from "lucide-react";
import ProgramBreadcrumb from "@/components/Program/ProgramBreadcrumb";
import ProgramHeaderInfo from "@/components/Program/ProgramHeaderInfo";
import ProgramTabs from "@/components/Program/ProgramTabs";

const TutorCompetencies = () => {
  const { programId } = useParams();

  const program = useMemo(() => programs.find((p) => p.id === Number(programId)), [programId]);

  // Get list of students who have competencies in this program
  const students = useMemo(() => {
    if (!program) return [];
    return program.competencies.map((c) => {
      const userId = c[0];
      const user = sampleUsers.find((u) => u.id === userId);
      return {
        id: userId,
        name: user ? user.fullName : `User ${userId}`,
        scores: c[1],
      };
    });
  }, [program]);

  const [selectedStudentId, setSelectedStudentId] = useState<string>("");

  useEffect(() => {
    if (students.length > 0 && !selectedStudentId) {
      const timer = setTimeout(() => {
        setSelectedStudentId(students[0].id);
      }, 0);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [students, selectedStudentId]);

  const selectedStudent = useMemo(() => {
    return students.find((s) => s.id === selectedStudentId);
  }, [students, selectedStudentId]);

  const scores = useMemo(() => (selectedStudent ? selectedStudent.scores : []), [selectedStudent]);
  const chapters = program?.chapters ?? [];

  const averageScore = useMemo(() => calculateAverageScore(scores), [scores]);
  const overallScore = (averageScore / 10).toFixed(1);

  const getSkillAttributes = (s: number) => {
    const label = getGradeLabel(s);
    const color = getGradeColor(s);
    return { label, color };
  };

  const programID = program?.id ?? 1;

  if (!program) {
    return <div className='min-h-screen bg-gray-50 p-8 text-center'>Program not found</div>;
  }

  const programTitle = program.title;

  return (
    <>
      <div className='min-h-screen bg-gray-50 pb-12'>
        <ProgramBreadcrumb backLink={path.tutorProgramList} currentTitle={programTitle} />

        <div className='container mx-auto mt-6 px-4'>
          <div className='overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm'>
            <ProgramHeaderInfo
              title={programTitle}
              subtitle='Quản lý năng lực sinh viên'
              statusLabel='Đang hoạt động'
              metaText={`${String(program.totalMentee)} sinh viên`}
              progress={undefined}
              actions={
                <>
                  <button className='flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50'>
                    <Download className='h-4 w-4' /> Xuất tất cả
                  </button>
                  <button className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700'>
                    <Edit className='h-4 w-4' /> Đánh giá hàng loạt
                  </button>
                  <button className='flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700'>
                    <FileText className='h-4 w-4' /> Phân tích
                  </button>
                </>
              }
            />

            <ProgramTabs activeTab='do' programId={programID} userRole='tutor' />
          </div>

          <div className='mt-6'>
            <div className='grid grid-cols-1 items-start gap-8 lg:grid-cols-3'>
              {/* LEFT SIDEBAR - Student List */}
              <div className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
                <div className='mb-4 flex items-center justify-between'>
                  <h3 className='text-lg font-semibold text-slate-900'>Sinh viên</h3>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => {
                      setSelectedStudentId(e.target.value);
                    }}
                    className='rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                    aria-label='Chọn sinh viên'
                  >
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='space-y-2'>
                  {students.map((s) => {
                    const avg = s.scores.reduce((a, b) => a + b, 0) / s.scores.length;
                    const studentScore = (avg / 10).toFixed(1);

                    return (
                      <div
                        key={s.id}
                        className={`cursor-pointer rounded-lg border p-3 transition-all hover:shadow-sm ${
                          s.id === selectedStudentId
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                        onClick={() => {
                          setSelectedStudentId(s.id);
                        }}
                      >
                        <div className='flex items-center gap-3'>
                          <img
                            className='h-10 w-10 rounded-full object-cover'
                            alt={s.name}
                            src={`https://i.pravatar.cc/150?u=${s.id}`}
                          />
                          <div className='flex-1'>
                            <div className='font-medium text-slate-900'>{s.name}</div>
                            <div className='text-sm text-slate-500'>Điểm: {studentScore}/10</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* MAIN CONTENT - Competency Details */}
              <div className='flex flex-col gap-6 lg:col-span-2'>
                {/* Header */}
                <div className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h2 className='text-xl font-bold text-slate-900'>Đánh giá chi tiết</h2>
                      <p className='mt-1 text-sm text-slate-600'>{selectedStudent?.name}</p>
                    </div>
                    <div className='flex gap-2'>
                      <button className='flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50'>
                        <Edit className='h-4 w-4' />
                        Sửa đánh giá
                      </button>
                      <button className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'>
                        <FileText className='h-4 w-4' />
                        Mới
                      </button>
                    </div>
                  </div>

                  {/* Performance Cards */}
                  <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
                    <div className='rounded-lg border border-slate-200 bg-gradient-to-br from-blue-50 to-white p-4'>
                      <div className='text-3xl font-bold text-blue-600'>{overallScore}</div>
                      <div className='mt-1 text-sm font-medium text-slate-700'>Điểm tổng thể</div>
                      <div className='mt-1 text-xs text-slate-500'>trên 10</div>
                    </div>

                    <div className='rounded-lg border border-slate-200 bg-gradient-to-br from-emerald-50 to-white p-4'>
                      <div className='text-3xl font-bold text-emerald-600'>{getGrade(averageScore)}</div>
                      <div className='mt-1 text-sm font-medium text-slate-700'>Điểm số</div>
                      <div className='mt-1 text-xs text-slate-500'>{getGradeLabel(averageScore)}</div>
                    </div>

                    <div className='rounded-lg border border-slate-200 bg-gradient-to-br from-purple-50 to-white p-4'>
                      <div className='text-3xl font-bold text-purple-600'>92%</div>
                      <div className='mt-1 text-sm font-medium text-slate-700'>Thứ hạng lớp</div>
                      <div className='mt-1 text-xs text-slate-500'>Top 8% lớp học</div>
                    </div>
                  </div>
                </div>

                {/* Competency List */}
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold text-slate-900'>Chi tiết năng lực</h3>

                  {chapters.map((chapter, index) => {
                    const score = scores[index] || 0;
                    const score10 = (score / 10).toFixed(1);
                    const { label, color } = getSkillAttributes(score);

                    return (
                      <div
                        key={index}
                        className='rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md'
                        style={{ borderLeft: `4px solid ${color}` }}
                      >
                        <div className='flex items-start justify-between'>
                          <div className='flex-1'>
                            <h4 className='text-base font-semibold text-slate-900'>{chapter}</h4>
                            <p className='mt-1 text-sm text-slate-600'>Đánh giá năng lực</p>
                          </div>
                          <div className='text-right'>
                            <div className='text-xl font-bold text-slate-900'>{score10}/10</div>
                            <div className='mt-1 text-sm font-medium' style={{ color: color }}>
                              {label}
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className='mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100'>
                          <div
                            className='h-full rounded-full transition-all'
                            style={{ width: `${String(score)}%`, backgroundColor: color }}
                          />
                        </div>

                        {/* Mentor Notes */}
                        <div className='mt-4 rounded-lg bg-slate-50 p-3'>
                          <div className='text-xs font-semibold text-slate-700'>Mentor Notes:</div>
                          <div className='mt-1 text-xs text-slate-600'>
                            Nhận xét của mentor về kỹ năng này sẽ hiển thị ở đây.
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorCompetencies;
