import React from "react";
import AppointmentList from "./components/MeetList"; // Import component mới tạo

//const Program = () => {
//  return <div>Program</div>;
//};

const Program: React.FC = () => {
  const userRole: "mentee" | "tutor" = "mentee";

  return (
    <div className='program-page'>
      {/* Đây là nơi hiển thị nội dung chi tiết chương trình */}
      <div className='program-detail-container'>
        {/*hiển thị nội dung tab "Lịch hẹn" */}
        <AppointmentList userRole={userRole} />
      </div>
    </div>
  );
};

export default Program;
