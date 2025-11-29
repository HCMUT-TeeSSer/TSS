import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./StudentsCompetencies.module.css";
import { programs } from "../../../data/programs";

import { useAuth } from "@/hooks/useAuth";

const StudentsCompetencies = () => {
  const navigate = useNavigate();
  const { programId } = useParams();
  const { user } = useAuth();

  const program = useMemo(() => programs.find((p) => p.id === Number(programId)), [programId]);

  const userId = user ? user.id : "";
  const userCompetency = useMemo(() => program?.competencies.find((c) => c[0] === userId), [program, userId]);
  const scores = useMemo(() => (userCompetency ? userCompetency[1] : []), [userCompetency]);
  const chapters = program?.chapters ?? [];

  const overallScore = useMemo(() => {
    if (!scores.length) return 0;
    const sum = scores.reduce((a, b) => a + b, 0);
    return (sum / scores.length / 10).toFixed(1);
  }, [scores]);

  const onDivContainerClick = useCallback(() => {
    // Add your code here
  }, []);

  const onButtonContainerClick = useCallback(() => {
    void navigate("/");
  }, [navigate]);

  const averageScore = useMemo(() => {
    if (!scores.length) return 0;
    const sum = scores.reduce((a, b) => a + b, 0);
    return sum / scores.length;
  }, [scores]);

  const getGrade = (score: number) => {
    if (score >= 85) return "A+";
    if (score >= 80) return "A";
    if (score >= 70) return "B+";
    if (score >= 65) return "B";
    if (score >= 50) return "C";
    return "F";
  };

  const getGradeLabel = (score: number) => {
    if (score >= 85) return "Xuất sắc";
    if (score >= 80) return "Giỏi";
    if (score >= 65) return "Khá";
    if (score >= 50) return "Trung bình";
    return "Yếu";
  };

  if (!program) {
    return <div className={styles.container}>Program not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        {/* Breadcrumbs */}
        <div className={styles.breadcrumbsSection}>
          <div className={styles.contentWrapper}>
            <div className={styles.breadcrumbs}>
              <div className={styles.breadcrumbItem}>
                <span>Chương trình của tôi</span>
              </div>
              <img className={styles.breadcrumbIcon} alt='' />
              <div className={styles.breadcrumbItem}>
                <span className={styles.activeBreadcrumb}>{program.title}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Header Section */}
        <div className={styles.headerSection}>
          <div className={styles.contentWrapper}>
            <div className={styles.headerContent}>
              <div className={styles.courseInfo}>
                {/* <img className={styles.courseIcon} alt="" /> TODO: Map icon */}
                <div className={styles.courseDetails}>
                  <b className={styles.courseTitle}>{program.title}</b>
                  <div className={styles.instructor}>với {program.mainTutor.name}</div>
                  <div className={styles.statusRow}>
                    <div className={styles.statusBadge}>
                      <div className={styles.statusText}>{program.isAvailable ? "Đang hoạt động" : "Đã kết thúc"}</div>
                    </div>
                    <div className={styles.progressText}>Tiến độ: {program.progress}%</div>
                  </div>
                </div>
              </div>
              <div className={styles.progressBarWrapper}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${String(program.progress)}%` }} />
                </div>
              </div>
            </div>
            <div className={styles.headerActions}>
              <div className={styles.actionButtonPrimary}>
                <img className={styles.actionIcon} alt='' />
                <div>Lưu chương trình</div>
              </div>
              <div className={styles.actionButtonSuccess}>
                <img className={styles.actionIcon} alt='' />
                <div>Chia sẻ</div>
              </div>
              <div className={styles.actionButtonOutline}>
                <img className={styles.actionIcon} alt='' />
                <div>Xuất file</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabsSection}>
          <div className={styles.contentWrapper}>
            <div className={styles.tabsList}>
              <div className={styles.tabItem} onClick={onDivContainerClick}>
                <img className={styles.tabIcon} alt='' />
                <div>Nội dung</div>
              </div>
              <div className={styles.tabItem} onClick={onDivContainerClick}>
                <img className={styles.tabIcon} alt='' />
                <div>Buổi tư vấn</div>
              </div>
              <div className={styles.tabItem} onClick={onDivContainerClick}>
                <img className={styles.tabIcon} alt='' />
                <div>Lịch hẹn</div>
              </div>
              <div className={styles.tabItemActive} onClick={onButtonContainerClick}>
                <img className={styles.tabIcon} alt='' />
                <div>Năng lực</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
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
  );
};

export default StudentsCompetencies;
