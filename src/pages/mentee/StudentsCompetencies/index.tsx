import { useCallback } from "react";
import styles from "./StudentsCompetencies.module.css";

const StudentsCompetencies = () => {
  const onDivContainerClick = useCallback((url: string) => {
    window.location.href = url;
  }, []);
  return (
    <div className={styles.trangNhGiNngLcCaTu}>
      <div className={styles.headerComponentForMentee}>
        <div className={styles.div186}>
          <div className={styles.div187}>
            <div className={styles.div188}>
              <div
                className={styles.div189}
                onClick={() => {
                  onDivContainerClick("/");
                }}
              >
                <b className={styles.tutorSupportSystem3}>Tutor Support System</b>
                <img className={styles.appLogoIcon} alt='' src='/src/pages/StudentsCompetencies/imgs/hcmut.png' />
              </div>
              <div className={styles.nav3}>
                <div
                  className={styles.div190}
                  onClick={() => {
                    onDivContainerClick("/");
                  }}
                >
                  <div className={styles.trangCh}>Trang chủ</div>
                </div>
                <div
                  className={styles.div191}
                  onClick={() => {
                    onDivContainerClick("/programs");
                  }}
                >
                  <div className={styles.chngTrnh}>Chương trình</div>
                </div>
                <div
                  className={styles.div192}
                  onClick={() => {
                    onDivContainerClick("/myprogram");
                  }}
                >
                  <div className={styles.chngTrnhCa2}>Chương trình của tôi</div>
                </div>
                <div
                  className={styles.div193}
                  onClick={() => {
                    onDivContainerClick("/resources");
                  }}
                >
                  <div className={styles.tiLiu}>Tài liệu</div>
                </div>
              </div>
            </div>
            <div className={styles.div194}>
              <div className={styles.button15}>
                <img className={styles.iIcon17} alt='' />
                <div className={styles.span3}>
                  <div className={styles.div195}>3</div>
                </div>
              </div>
              <div className={styles.button16}>
                <img className={styles.iIcon18} alt='' />
                <div className={styles.span4}>
                  <div className={styles.div196}>7</div>
                </div>
              </div>
              <div
                className={styles.div197}
                onClick={() => {
                  onDivContainerClick("https://google.com");
                }}
              >
                <img className={styles.imgIcon5} alt='' />
                <div className={styles.div198}>
                  <div className={styles.div199}>
                    <div className={styles.sarahJohnson3}>John Doe</div>
                  </div>
                  <div className={styles.div200}>
                    <div className={styles.khoaKhoaHc}>Khoa Khoa học Máy tính</div>
                  </div>
                </div>
                <img className={styles.iIcon19} alt='' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.body}>
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
                  <div className={styles.lpTrnhPython}>Lập trình Python nâng cao</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section2}>
          <div className={styles.div27}>
            <div className={styles.div28}>
              <div className={styles.div29}>
                <div className={styles.div30}>
                  <img
                    className={styles.imgIcon6}
                    alt=''
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/480px-Python-logo-notext.svg.png'
                  />
                  <div className={styles.div31}>
                    <b className={styles.nhGiNng}>Đánh Giá Năng Lực Sinh Viên</b>
                    <div className={styles.lpTrnhPython2}>Lập trình Python nâng cao - Bảng điều khiển Mentor</div>
                    <div className={styles.div32}>
                      <div className={styles.span}>
                        <div className={styles.sinhVinAng}>24 Sinh viên đang hoạt động</div>
                      </div>
                      <div className={styles.tinChng}>Tiến độ chương trình: 68%</div>
                    </div>
                  </div>
                </div>
                <div className={styles.div33}>
                  <div className={styles.div34} />
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
                        <div className={styles.select}>
                          <div className={styles.ttC}>Tất cả</div>
                          <img className={styles.frameIcon} alt='' />
                        </div>
                      </div>
                    </div>
                    <div className={styles.div44}>
                      <div className={styles.div45}>
                        <div className={styles.div46}>
                          <img className={styles.imgIcon} alt='' />
                          <div className={styles.div47}>
                            <div className={styles.div48}>
                              <div className={styles.sarahJohnson}>Sarah Johnson</div>
                            </div>
                            <div className={styles.div49}>
                              <div className={styles.khoaHcMy}>Khoa học máy tính</div>
                            </div>
                            <div className={styles.div50}>
                              <div className={styles.div51}>
                                <div className={styles.div52} />
                              </div>
                              <div className={styles.div53}>8.5</div>
                            </div>
                          </div>
                          <div className={styles.div54}>
                            <div className={styles.div55} />
                            <div className={styles.div56}>
                              <div className={styles.div57}>28/10</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.div58}>
                        <div className={styles.div46}>
                          <img className={styles.imgIcon} alt='' />
                          <div className={styles.div60}>
                            <div className={styles.div61}>
                              <div className={styles.sarahJohnson}>David Miller</div>
                            </div>
                            <div className={styles.div62}>
                              <div className={styles.khoaHcMy}>Kỹ thuật phần mềm</div>
                            </div>
                            <div className={styles.div63}>
                              <div className={styles.div51}>
                                <div className={styles.div65} />
                              </div>
                              <div className={styles.div66}>7.5</div>
                            </div>
                          </div>
                          <div className={styles.div67}>
                            <div className={styles.div68} />
                            <div className={styles.div69}>
                              <div className={styles.div70}>25/10</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.div71}>
                        <div className={styles.div46}>
                          <img className={styles.imgIcon} alt='' />
                          <div className={styles.div73}>
                            <div className={styles.div74}>
                              <div className={styles.sarahJohnson}>Emily Chen</div>
                            </div>
                            <div className={styles.div75}>
                              <div className={styles.khoaHcMy}>Khoa học dữ liệu</div>
                            </div>
                            <div className={styles.div76}>
                              <div className={styles.div51}>
                                <div className={styles.div78} />
                              </div>
                              <div className={styles.div53}>6.0</div>
                            </div>
                          </div>
                          <div className={styles.div80}>
                            <div className={styles.div81} />
                            <div className={styles.div82}>
                              <div className={styles.div57}>20/10</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.div84}>
                        <div className={styles.div46}>
                          <img className={styles.imgIcon} alt='' />
                          <div className={styles.div86}>
                            <div className={styles.div87}>
                              <div className={styles.jamesWilson}>James Wilson</div>
                            </div>
                            <div className={styles.div88}>
                              <div className={styles.hThngThng}>Hệ thống thông tin</div>
                            </div>
                            <div className={styles.div89}>
                              <div className={styles.div51}>
                                <div className={styles.div91} />
                              </div>
                              <div className={styles.na}>N/A</div>
                            </div>
                          </div>
                          <div className={styles.div92}>
                            <div className={styles.div93} />
                            <div className={styles.div94}>
                              <div className={styles.chXL}>Chờ xử lý</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.div95}>
                  <div className={styles.div96}>
                    <div className={styles.div97}>
                      <div className={styles.div98}>
                        <b className={styles.nhGiChi}>Đánh giá chi tiết</b>
                        <div className={styles.span2}>
                          <div className={styles.sarahJohnson2}>Sarah Johnson</div>
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
                    <div className={styles.div100}>
                      <div className={styles.div101}>
                        <div className={styles.div102}>
                          <div className={styles.div103}>
                            <b className={styles.b}>8.5</b>
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
                            <b className={styles.a}>A-</b>
                          </div>
                          <div className={styles.div104}>
                            <div className={styles.imTngTh}>Điểm số</div>
                          </div>
                          <div className={styles.div105}>
                            <div className={styles.hiuSutXut}>Hiệu suất xuất sắc</div>
                          </div>
                          <div className={styles.div111}>
                            <img className={styles.iIcon10} alt='' />
                            <div className={styles.tLnTrc}>+0.5 từ lần trước</div>
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
                          <div className={styles.div117}>
                            <img className={styles.iIcon11} alt='' />
                            <div className={styles.tThnhTch}>Đạt thành tích cao</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.div118}>
                      <div className={styles.h3}>
                        <div className={styles.nhGiChi2}>Đánh giá chi tiết</div>
                      </div>
                      <div className={styles.div119}>
                        <div className={styles.div120}>
                          <div className={styles.div121}>
                            <div className={styles.div122}>
                              <img className={styles.divIcon7} alt='' />
                              <div className={styles.div123}>
                                <div className={styles.ngnNgPython}>{`Ngôn ngữ Python & Cơ sở`}</div>
                                <div className={styles.ccKhiNim}>Các khái niệm lập trình và kỹ năng cú pháp</div>
                              </div>
                            </div>
                            <div className={styles.div124}>
                              <div className={styles.div125}>
                                <b className={styles.b3}>9.2/10</b>
                              </div>
                              <div className={styles.div126}>
                                <div className={styles.xutSc}>Xuất sắc</div>
                              </div>
                            </div>
                          </div>
                          <div className={styles.div127}>
                            <div className={styles.div128} />
                          </div>
                          <div className={styles.div129}>
                            <b className={styles.mentorNotes}>Mentor Notes:</b>
                            <div className={styles.hiuBitSu}>
                              Hiểu biết sâu sắc về các khái niệm cơ bản của Python. Mã nguồn sạch, dễ đọc với
                            </div>
                            <div className={styles.ccTnGi}>
                              các tên gọi hợp lý. Khả năng nắm bắt các kiểu dữ liệu, cấu trúc điều khiển và hàm.
                            </div>
                          </div>
                          <div className={styles.div130}>
                            <div className={styles.nhGiLn}>Đánh giá lần cuối: 28/10/2024</div>
                            <div className={styles.button10}>
                              <img className={styles.iIcon12} alt='' />
                              <div className={styles.sa}>Sửa</div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.div131}>
                          <div className={styles.div121}>
                            <div className={styles.div133}>
                              <img className={styles.divIcon7} alt='' />
                              <div className={styles.div134}>
                                <div className={styles.cuTrcD}>{`Cấu trúc dữ liệu & Thuật toán`}</div>
                                <div className={styles.kNngTrin}>Kỹ năng triển khai và tối ưu hóa</div>
                              </div>
                            </div>
                            <div className={styles.div135}>
                              <div className={styles.div136}>
                                <b className={styles.b3}>8.5/10</b>
                              </div>
                              <div className={styles.div137}>
                                <div className={styles.xutSc}>Rất tốt</div>
                              </div>
                            </div>
                          </div>
                          <div className={styles.div138}>
                            <div className={styles.div139} />
                          </div>
                          <div className={styles.div129}>
                            <b className={styles.mentorNotes}>Mentor Notes:</b>
                            <div className={styles.hiuBitSu}>
                              Hiểu biết vững chắc về danh sách, từ điển và tập hợp. Triển khai tốt các thuật toán
                            </div>
                            <div className={styles.ccTnGi}>
                              cơ bản. Cần cải thiện về các thuật toán nâng cao và phân tích độ phức tạp thời gian.
                            </div>
                          </div>
                          <div className={styles.div130}>
                            <div className={styles.nhGiLn2}>Đánh giá lần cuối: 25/10/2024</div>
                            <div className={styles.button10}>
                              <img className={styles.iIcon12} alt='' />
                              <div className={styles.sa}>Sửa</div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.div142}>
                          <div className={styles.div121}>
                            <div className={styles.div144}>
                              <img className={styles.divIcon7} alt='' />
                              <div className={styles.div145}>
                                <div className={styles.phtTrinWeb}>Phát triển Web (Django/Flask)</div>
                                <div className={styles.sDngKhung}>Sử dụng khung và phát triển ứng dụng web</div>
                              </div>
                            </div>
                            <div className={styles.div146}>
                              <div className={styles.div147}>
                                <b className={styles.b5}>7.8/10</b>
                              </div>
                              <div className={styles.div148}>
                                <div className={styles.tt}>Tốt</div>
                              </div>
                            </div>
                          </div>
                          <div className={styles.div149}>
                            <div className={styles.div150} />
                          </div>
                          <div className={styles.div129}>
                            <b className={styles.mentorNotes}>Mentor Notes:</b>
                            <div className={styles.hiuBitSu}>
                              Cơ sở tốt về khung Django. Thành công xây dựng một ứng dụng blog. Cần luyện tập
                            </div>
                            <div className={styles.ccTnGi}>thêm với các dự án phức tạp và phát triển API.</div>
                          </div>
                          <div className={styles.div130}>
                            <div className={styles.nhGiLn2}>Đánh giá lần cuối: 22/10/2024</div>
                            <div className={styles.button10}>
                              <img className={styles.iIcon12} alt='' />
                              <div className={styles.sa}>Sửa</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.div153}>
                      <div className={styles.div154}>
                        <div className={styles.h32}>
                          <div className={styles.lchSNh}>Lịch sử đánh giá</div>
                        </div>
                        <div className={styles.div155}>
                          <div className={styles.div156}>
                            <div className={styles.div157}>
                              <img className={styles.divIcon10} alt='' />
                              <div className={styles.div158}>
                                <div className={styles.div159}>
                                  <div className={styles.nhGiTng}>Đánh giá tổng thể</div>
                                </div>
                                <div className={styles.div160}>
                                  <div className={styles.div161}>28/10/2024</div>
                                </div>
                              </div>
                            </div>
                            <div className={styles.div162}>
                              <div className={styles.div163}>
                                <div className={styles.div164}>8.5/10</div>
                              </div>
                              <div className={styles.div165}>
                                <div className={styles.ciThin}>+0.3 cải thiện</div>
                              </div>
                            </div>
                          </div>
                          <div className={styles.div166}>
                            <div className={styles.div167}>
                              <img className={styles.divIcon10} alt='' />
                              <div className={styles.div168}>
                                <div className={styles.div169}>
                                  <div className={styles.nhGiGia}>Đánh giá giữa kỳ</div>
                                </div>
                                <div className={styles.div170}>
                                  <div className={styles.div171}>15/10/2024</div>
                                </div>
                              </div>
                            </div>
                            <div className={styles.div172}>
                              <div className={styles.div173}>
                                <div className={styles.div174}>8.2/10</div>
                              </div>
                              <div className={styles.div175}>
                                <div className={styles.nNh}>Ổn định</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.div176}>
                        <div className={styles.h32}>
                          <div className={styles.lchSNh}>Hành động nhanh</div>
                        </div>
                        <div className={styles.div177}>
                          <div className={styles.button13}>
                            <div className={styles.div178}>
                              <img className={styles.iIcon15} alt='' />
                              <div className={styles.div179}>
                                <div className={styles.div180}>
                                  <div className={styles.lchTrnhNh}>Lịch trình đánh giá</div>
                                </div>
                                <div className={styles.div181}>
                                  <div className={styles.tLchNh}>Đặt lịch đánh giá tiếp theo</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={styles.button14}>
                            <div className={styles.div178}>
                              <img className={styles.iIcon15} alt='' />
                              <div className={styles.div183}>
                                <div className={styles.div184}>
                                  <div className={styles.giPhnHi}>Gửi phản hồi</div>
                                </div>
                                <div className={styles.div185}>
                                  <div className={styles.giPhnHi2}>Gửi phản hồi cho sinh viên</div>
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
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerComponent}>
        <div className={styles.div3}>
          <div className={styles.div4}>
            <div className={styles.div5}>
              <div className={styles.div6}>
                <b className={styles.tutorSupportSystem}>Tutor Support System</b>
              </div>
              <div className={styles.connectWithExpert}>
                Connect with expert tutors and accelerate your learning journey with personalized education.
              </div>
              <div className={styles.div7}>
                <img className={styles.divIcon} alt='' />
                <img className={styles.divIcon2} alt='' />
                <img className={styles.divIcon3} alt='' />
                <img className={styles.divIcon4} alt='' />
              </div>
              <img className={styles.logobk1Icon} alt='' />
            </div>
            <div className={styles.div8}>
              <div className={styles.forStudents}>For Students</div>
              <div className={styles.ul}>
                <div className={styles.li3}>
                  <div className={styles.li3}>
                    <div className={styles.findATutor}>Find a Tutor</div>
                  </div>
                </div>
                <div className={styles.li4}>
                  <div className={styles.li3}>
                    <div className={styles.findATutor}>Subject Categories</div>
                  </div>
                </div>
                <div className={styles.li5}>
                  <div className={styles.li3}>
                    <div className={styles.findATutor}>Meeting with tutor</div>
                  </div>
                </div>
                <div className={styles.li6}>
                  <div className={styles.li3}>
                    <div className={styles.findATutor}>Success Stories</div>
                  </div>
                </div>
                <div className={styles.li7}>
                  <div className={styles.li3}>
                    <div className={styles.findATutor}>Study Resources</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.div14}>
              <div className={styles.forStudents}>For Tutors</div>
              <div className={styles.ul}>
                <div className={styles.li3}>
                  <div className={styles.li3}>
                    <div className={styles.findATutor}>Become a Tutor</div>
                  </div>
                </div>
                <div className={styles.li4}>
                  <div className={styles.li3}>
                    <div className={styles.findATutor}>Tutor Dashboard</div>
                  </div>
                </div>
                <div className={styles.li5}>
                  <div className={styles.li3}>
                    <div className={styles.findATutor}>Resources</div>
                  </div>
                </div>
                <div className={styles.li6}>
                  <div className={styles.li3}>
                    <div className={styles.findATutor}>Community</div>
                  </div>
                </div>
                <div className={styles.li7}>
                  <div className={styles.li3}>
                    <div className={styles.findATutor}>Support</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.div20}>
              <div className={styles.forStudents}>Support</div>
              <div className={styles.ul}>
                <div className={styles.li3}>
                  <div className={styles.li3}>
                    <div className={styles.findATutor}>Help Center</div>
                  </div>
                </div>
                <div className={styles.li4}>
                  <div className={styles.li3}>
                    <div className={styles.findATutor}>Contact Us</div>
                  </div>
                </div>
                <div className={styles.li5}>
                  <div className={styles.li3}>
                    <div className={styles.findATutor}>Privacy Policy</div>
                  </div>
                </div>
                <div className={styles.li6}>
                  <div className={styles.li3}>
                    <div className={styles.findATutor}>Terms of Service</div>
                  </div>
                </div>
                <div className={styles.li7}>
                  <div className={styles.li3}>
                    <div className={styles.findATutor}>Safety</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.div26}>
            <div className={styles.tutorSupportSystem2}>© 2025 Tutor Support System. All rights reserved.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsCompetencies;
