import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./TutorCompetencies.module.css";
import { programs } from "../../../data/programs";
import { sampleUsers } from "@/utils/auth";

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

  const averageScore = useMemo(() => {
    if (!scores.length) return 0;
    const sum = scores.reduce((a, b) => a + b, 0);
    return sum / scores.length;
  }, [scores]);

  const overallScore = (averageScore / 10).toFixed(1);

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

  const getSkillAttributes = (s: number) => {
    if (s >= 85) return { label: "Xuất sắc", color: "#22c55e", badgeClass: styles.scoreBadgeGreen };
    if (s >= 80) return { label: "Giỏi", color: "#22c55e", badgeClass: styles.scoreBadgeGreen };
    if (s >= 65) return { label: "Khá", color: "#eab308", badgeClass: styles.scoreBadgeYellow };
    if (s >= 50) return { label: "Trung bình", color: "#f97316", badgeClass: styles.scoreBadgeOrange };
    return { label: "Yếu", color: "#ef4444", badgeClass: styles.scoreBadgeRed };
  };

  if (!program) {
    return <div className={styles.trangNhGiNngLcCaTu}>Program not found</div>;
  }

  return (
    <div className={styles.trangNhGiNngLcCaTu}>
      <div className={styles.body}>
        {/* Breadcrumbs */}
        <div className={styles.section}>
          <div className={styles.div}>
            <div className={styles.nav}>
              <div className={styles.ol}>
                <div className={styles.li}>
                  <div className={styles.div2}>
                    <div className={styles.chngTrnhCa}>Chương trình của tôi</div>
                  </div>
                </div>
                <img className={styles.liIcon} alt='' />
                <div className={styles.li2}>
                  <div className={styles.lpTrnhPython}>{program.title}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className={styles.section2}>
          <div className={styles.div27}>
            <div className={styles.div28}>
              <div className={styles.div29}>
                <div className={styles.div30}>
                  {/* <img className={styles.imgIcon6} alt='' src={program.icon} /> TODO: Map icon properly */}
                  <div className={styles.div31}>
                    <b className={styles.nhGiNng}>Đánh Giá Năng Lực Sinh Viên</b>
                    <div className={styles.lpTrnhPython2}>{program.title} - Bảng điều khiển Mentor</div>
                    <div className={styles.div32}>
                      <div className={styles.span}>
                        <div className={styles.sinhVinAng}>{program.totalMentee} Sinh viên đang hoạt động</div>
                      </div>
                      <div className={styles.tinChng}>Tiến độ chương trình: {program.progress}%</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.div35}>
                <div className={styles.button}>
                  <img className={styles.iIcon} alt='' />
                  <div className={styles.xutTtC}>Xuất tất cả</div>
                </div>
                <div className={styles.button2}>
                  <img className={styles.iIcon2} alt='' />
                  <div className={styles.nhGiHng}>Đánh giá hàng loạt</div>
                </div>
                <div className={styles.button3}>
                  <img className={styles.iIcon3} alt='' />
                  <div className={styles.phnTch}>Phân tích</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.section3}>
          <div className={styles.div36}>
            <div className={styles.nav2}>
              <div className={styles.button4}>
                <img className={styles.iIcon4} alt='' />
                <div className={styles.niDung}>Nội dung</div>
              </div>
              <div className={styles.button5}>
                <img className={styles.iIcon5} alt='' />
                <div className={styles.buiTVn}>Buổi tư vấn</div>
              </div>
              <div className={styles.button6}>
                <img className={styles.iIcon4} alt='' />
                <div className={styles.lchHn}>Lịch hẹn</div>
              </div>
              <div className={styles.button7}>
                <img className={styles.iIcon7} alt='' />
                <div className={styles.nngLc}>Năng lực</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.section4}>
          <div className={styles.div37}>
            <div className={styles.div38}>
              <div className={styles.div39}>
                <div className={styles.div40}>
                  <div className={styles.div41}>
                    <div className={styles.div42}>
                      <div className={styles.sinhVin}>Sinh viên</div>
                      <div className={styles.div43}>
                        <img className={styles.buttonIcon} alt='' />
                        <select
                          className={styles.select}
                          value={selectedStudentId}
                          onChange={(e) => {
                            setSelectedStudentId(e.target.value);
                          }}
                          style={{
                            border: "none",
                            background: "transparent",
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#374151",
                          }}
                        >
                          {students.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Student List Sidebar (Simplified for now to just show selected or list) */}
                    <div className={styles.div44}>
                      {students.map((s) => (
                        <div
                          key={s.id}
                          className={styles.div45}
                          style={{
                            backgroundColor: s.id === selectedStudentId ? "#f3f4f6" : "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setSelectedStudentId(s.id);
                          }}
                        >
                          <div className={styles.div46}>
                            <img className={styles.imgIcon} alt='' src={`https://i.pravatar.cc/150?u=${s.id}`} />
                            <div className={styles.div47}>
                              <div className={styles.div48}>
                                <div className={styles.sarahJohnson}>{s.name}</div>
                              </div>
                              <div className={styles.div50}>
                                <div className={styles.div53}>
                                  {/* Calculate average for this student */}
                                  {(() => {
                                    const avg = s.scores.reduce((a, b) => a + b, 0) / s.scores.length;
                                    return (avg / 10).toFixed(1);
                                  })()}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Detail View */}
                <div className={styles.div95}>
                  <div className={styles.div96}>
                    <div className={styles.div97}>
                      <div className={styles.div98}>
                        <b className={styles.nhGiChi}>Đánh giá chi tiết</b>
                        <div className={styles.span2}>
                          <div className={styles.sarahJohnson2}>{selectedStudent?.name}</div>
                        </div>
                      </div>
                      <div className={styles.div99}>
                        <div className={styles.button8}>
                          <img className={styles.iIcon8} alt='' />
                          <div className={styles.saNhGi}>Sửa đánh giá</div>
                        </div>
                        <div className={styles.button9}>
                          <img className={styles.iIcon9} alt='' />
                          <div className={styles.mi}>Mới</div>
                        </div>
                      </div>
                    </div>

                    {/* Performance Cards */}
                    <div className={styles.div100}>
                      <div className={styles.div101}>
                        <div className={styles.div102}>
                          <div className={styles.div103}>
                            <b className={styles.b}>{overallScore}</b>
                          </div>
                          <div className={styles.div104}>
                            <div className={styles.imTngTh}>Điểm tổng thể</div>
                          </div>
                          <div className={styles.div105}>
                            <div className={styles.hiuSutXut}>trên 10</div>
                          </div>
                          <img className={styles.divIcon6} alt='' />
                        </div>
                      </div>
                      <div className={styles.div106}>
                        <div className={styles.div107}>
                          <div className={styles.div108}>
                            <b className={styles.a}>{getGrade(averageScore)}</b>
                          </div>
                          <div className={styles.div104}>
                            <div className={styles.imTngTh}>Điểm số</div>
                          </div>
                          <div className={styles.div105}>
                            <div className={styles.hiuSutXut}>{getGradeLabel(averageScore)}</div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.div112}>
                        <div className={styles.div107}>
                          <div className={styles.div114}>
                            <b className={styles.b2}>92%</b>
                          </div>
                          <div className={styles.div104}>
                            <div className={styles.imTngTh}>Thứ hạng lớp</div>
                          </div>
                          <div className={styles.div105}>
                            <div className={styles.hiuSutXut}>Top 8% lớp học</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Competency List */}
                    <div className={styles.div118}>
                      <div className={styles.h3}>
                        <div className={styles.nhGiChi2}>Đánh giá chi tiết</div>
                      </div>
                      <div className={styles.div119}>
                        {chapters.map((chapter, index) => {
                          const score = scores[index] || 0;
                          const score10 = (score / 10).toFixed(1);
                          const { label, color } = getSkillAttributes(score);

                          return (
                            <div className={styles.div120} key={index} style={{ borderLeft: `4px solid ${color}` }}>
                              <div className={styles.div121}>
                                <div className={styles.div122}>
                                  <img className={styles.divIcon7} alt='' />
                                  <div className={styles.div123}>
                                    <div className={styles.ngnNgPython}>{chapter}</div>
                                    <div className={styles.ccKhiNim}>Đánh giá năng lực</div>
                                  </div>
                                </div>
                                <div className={styles.div124}>
                                  <div className={styles.div125}>
                                    <b className={styles.b3}>{score10}/10</b>
                                  </div>
                                  <div className={styles.div126}>
                                    <div className={styles.xutSc} style={{ color: color }}>
                                      {label}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className={styles.div127}>
                                <div
                                  className={styles.div128}
                                  style={{ width: `${String(score)}%`, backgroundColor: color }}
                                />
                              </div>
                              <div className={styles.div129}>
                                <b className={styles.mentorNotes}>Mentor Notes:</b>
                                <div className={styles.hiuBitSu}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorCompetencies;
