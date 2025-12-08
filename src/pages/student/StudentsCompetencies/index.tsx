import { useMemo } from "react";
import { useParams } from "react-router-dom";
import styles from "./StudentsCompetencies.module.css";
import { programs } from "../../../data/programs";
import path from "@/constants/path";

import { useAuth } from "@/hooks/useAuth";
import { Bookmark, CornerUpRight, Download } from "lucide-react";
import ProgramBreadcrumb from "@/components/Program/ProgramBreadcrumb";
import ProgramHeaderInfo from "@/components/Program/ProgramHeaderInfo";
import ProgramTabs from "@/components/Program/ProgramTabs";
import { getGrade, getGradeLabel, calculateAverageScore, calculateOverallScore } from "@/utils/grading";

const StudentsCompetencies = () => {
  const { programId } = useParams();
  const { user } = useAuth();

  const program = useMemo(() => programs.find((p) => p.id === Number(programId)), [programId]);

  const userId = user ? user.id : "";
  const userCompetency = useMemo(() => program?.competencies.find((c) => c[0] === userId), [program, userId]);
  const scores = useMemo(() => (userCompetency ? userCompetency[1] : []), [userCompetency]);
  const chapters = program?.chapters ?? [];

  const averageScore = useMemo(() => calculateAverageScore(scores), [scores]);
  const overallScore = useMemo(() => calculateOverallScore(scores), [scores]);

  if (!program) {
    return <div className={styles.container}>Program not found</div>;
  }

  return (
    <div className='min-h-screen bg-gray-50 pb-12'>
      <ProgramBreadcrumb
        backLink={path.studentProgramList}
        backLabel='Chương trình của tôi'
        currentTitle={program.title}
      />

      <div className='container mx-auto mt-6 px-4'>
        {/* Container trắng bao quanh Header và Tabs */}
        <div className='overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm'>
          {/* Header Info */}
          <ProgramHeaderInfo
            title={program.title}
            subtitle={`với ${program.mainTutor.name}`}
            statusLabel={program.isAvailable ? "Đang hoạt động" : "Đã kết thúc"}
            metaText={`Tiến độ: ${String(program.progress)}%`}
            progress={program.progress}
            actions={
              <>
                <button className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700'>
                  <Bookmark className='h-4 w-4' /> Lưu chương trình
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

          {/* Tabs */}
          <ProgramTabs activeTab='do' programId={programId ?? "1"} />
        </div>

        {/* Nội dung Tab */}
        <div className='mt-6'>
          <div className={styles.mainContentSection}>
            <div className={styles.contentWrapper}>
              <div className={styles.gridContainer}>
                {/* Left Column */}
                <div className={styles.mainColumn}>
                  <div className={styles.sectionHeader}>
                    <b className={styles.sectionTitle}>Đánh giá năng lực</b>
                    <div className={styles.sectionActions}>
                      <div className={styles.filterSelect}>
                        <span>Tất cả đánh giá</span>
                        <img className={styles.dropdownIcon} alt='' />
                      </div>
                      <div className={styles.exportButton}>
                        <img className={styles.exportIcon} alt='' />
                        <div>Xuất báo cáo</div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Cards */}
                  <div className={styles.performanceCards}>
                    <div className={styles.cardBlue}>
                      <div className={styles.cardIconBlue}>
                        <b>{overallScore}</b>
                      </div>
                      <div className={styles.cardLabel}>Điểm tổng thể</div>
                      <div className={styles.cardSubLabel}>trên 10</div>
                    </div>
                    <div className={styles.cardGreen}>
                      <div className={styles.cardIconGreen}>
                        <b>{getGrade(averageScore)}</b>
                      </div>
                      <div className={styles.cardLabel}>Điểm số</div>
                      <div className={styles.cardSubLabel}>{getGradeLabel(averageScore)}</div>
                    </div>
                    <div className={styles.cardPurple}>
                      <div className={styles.cardIconPurple}>
                        <b>85%</b> {/* Placeholder logic for percentile */}
                      </div>
                      <div className={styles.cardLabel}>Hạng</div>
                      <div className={styles.cardSubLabel}>Trên trung bình</div>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className={styles.skillsList}>
                    {chapters.map((chapter, index) => {
                      const score = scores[index] || 0;
                      const score10 = (score / 10).toFixed(1);

                      const getSkillAttributes = (s: number) => {
                        if (s >= 85) return { label: "Xuất sắc", color: "#22c55e", badgeClass: styles.scoreBadgeGreen };
                        if (s >= 80) return { label: "Giỏi", color: "#22c55e", badgeClass: styles.scoreBadgeGreen };
                        if (s >= 65) return { label: "Khá", color: "#eab308", badgeClass: styles.scoreBadgeYellow };
                        if (s >= 50)
                          return { label: "Trung bình", color: "#f97316", badgeClass: styles.scoreBadgeOrange };
                        return { label: "Yếu", color: "#ef4444", badgeClass: styles.scoreBadgeRed };
                      };

                      const { label, color, badgeClass } = getSkillAttributes(score);

                      return (
                        <div className={styles.skillItem} key={index} style={{ borderLeftColor: color }}>
                          <div className={styles.skillHeader}>
                            <div className={styles.skillTitle}>
                              <img className={styles.skillIcon} alt='' />
                              <div>{chapter}</div>
                            </div>
                            <div className={styles.skillScore}>
                              <b>{score10}/10</b>
                              <div className={badgeClass}>{label}</div>
                            </div>
                          </div>
                          <div className={styles.skillProgress}>
                            <div
                              className={styles.skillProgressFill}
                              style={{ width: `${String(score)}%`, backgroundColor: color }}
                            />
                          </div>
                          <div className={styles.skillDescription}>Đánh giá năng lực cho nội dung: {chapter}</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Recent Assessments - Static for now as no data available */}
                  <div className={styles.recentSection}>
                    <b className={styles.sectionTitle}>Đánh giá gần đây</b>
                    <div className={styles.recentGrid}>
                      <div className={styles.recentCard}>
                        <div className={styles.recentHeader}>
                          <img className={styles.recentIcon} alt='' />
                          <div>
                            <div className={styles.recentTitle}>Thực hiện thuật toán</div>
                            <div className={styles.recentDate}>28/10/2024</div>
                          </div>
                        </div>
                        <div className={styles.recentScore}>
                          <div className={styles.scoreValue}>8.5/10</div>
                          <div className={styles.scoreChangePositive}>+0.5 so với lần trước</div>
                        </div>
                      </div>
                      <div className={styles.recentCard}>
                        <div className={styles.recentHeader}>
                          <img className={styles.recentIcon} alt='' />
                          <div>
                            <div className={styles.recentTitle}>Đánh giá dự án Django</div>
                            <div className={styles.recentDate}>25/10/2024</div>
                          </div>
                        </div>
                        <div className={styles.recentScore}>
                          <div className={styles.scoreValue}>7.8/10</div>
                          <div className={styles.scoreChangeNeutral}>Ổn định</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column (Sidebar) */}
                <div className={styles.sidebarColumn}>
                  {/* Progress Summary */}
                  <div className={styles.sidebarCard}>
                    <b className={styles.sidebarTitle}>Tổng kết tiến độ</b>
                    <div className={styles.sidebarStats}>
                      <div className={styles.statItem}>
                        <div className={styles.statLabel}>
                          <img className={styles.statIcon} alt='' />
                          <span>Thành tựu</span>
                        </div>
                        <b className={styles.statValue}>12</b>
                      </div>
                      <div className={styles.statItem}>
                        <div className={styles.statLabel}>
                          <img className={styles.statIcon} alt='' />
                          <span>Nhiệm vụ hoàn thành</span>
                        </div>
                        <b className={styles.statValue}>24/30</b>
                      </div>
                      <div className={styles.statItem}>
                        <div className={styles.statLabel}>
                          <img className={styles.statIcon} alt='' />
                          <span>Giờ học</span>
                        </div>
                        <b className={styles.statValue}>127h</b>
                      </div>
                    </div>
                  </div>

                  {/* Skills Mastered */}
                  <div className={styles.sidebarCard}>
                    <b className={styles.sidebarTitle}>Thành thạo kỹ năng</b>
                    <div className={styles.masteredSkills}>
                      <div className={styles.masteredItem}>
                        <span>Cú pháp Python</span>
                        <img className={styles.checkIcon} alt='' />
                      </div>
                      <div className={styles.masteredItem}>
                        <span>Các mô hình OOP</span>
                        <img className={styles.checkIcon} alt='' />
                      </div>
                      <div className={styles.masteredItem}>
                        <span>Khung web</span>
                        <img className={styles.checkIcon} alt='' />
                      </div>
                      <div className={styles.masteredItem}>
                        <span>Khoa học dữ liệu</span>
                        <img className={styles.checkIcon} alt='' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsCompetencies;
