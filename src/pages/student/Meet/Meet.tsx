import { useMemo, useState } from "react";
import { meets } from "@/data/meets";

// Import các component con
import StatsSection from "@/components/Meeting/StatsSection";
import CalendarWidget from "@/components/Meeting/CalendarWidget";
import UpcomingSchedule from "@/components/Meeting/UpcomingSchedule";
import MeetingHistory from "@/components/Meeting/MeetingHistory";
import AvailableMentors from "@/components/Meeting/AvailableMentors";
import { useAuth } from "@/hooks/useAuth";

export default function StudentMeet() {
  // State quản lý ngày đang được chọn (Mặc định là hôm nay)
  const [selectedDate, setSelectedDate] = useState(new Date());
	const { user } = useAuth();
  // Lấy dữ liệu meets và lọc cho user hiện tại
  
	const myMeets = useMemo(() => {
		if (user?.fullName) {
    	return meets.filter((m) => m.menteeName === user.fullName);
		}
		return [];
  }, []);
	const myName = useMemo(() => {
		if (user?.fullName) {
    	return user.fullName
		}
		return ""
  }, []);

	const Meets = myMeets;
	const Name = myName;

  return (
		<div className="min-h-screen bg-white">
			<div className="container mx-auto px-4 py-8">
				{/* Page Header */}
				<div className="mb-8">
					<h1 className="text-2xl font-bold text-gray-900">Lịch hẹn của tôi</h1>
					<p className="text-gray-500 mt-1 text-sm">
						Quản lý và theo dõi các buổi hướng dẫn với mentor
					</p>
				</div>

				{/* Section: Stats */}
				<StatsSection 
					meetList={Meets} 
					userRole="student" 
					userName={Name}
				/>

				{/* Section: Calendar & Schedule */}
				<div className="items-start grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-1">
						{/* Truyền state và hàm update xuống Calendar */}
						<CalendarWidget 
							selectedDate={selectedDate} 
							onDateSelect={setSelectedDate} 
							meetList={Meets}
							userRole="student"
							userName={Name}
						/>
					</div>
					<div className="lg:col-span-2">
						{/* Truyền ngày đã chọn xuống để lọc danh sách */}
						<UpcomingSchedule 
							meetList={myMeets} 
							selectedDate={selectedDate} 
							userRole="student"
						/>
					</div>
				</div>

				{/* Section: History */}
				<MeetingHistory meetList={myMeets} />

				{/* Section: Available Mentors */}
				<AvailableMentors />
			</div>
		</div>
  );
}