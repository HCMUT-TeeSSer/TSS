import { Search, Star } from "lucide-react";
import { tutors } from "@/data/tutors";

export default function AvailableMentors() {
  const activeTutors = tutors.filter((t) => t.status === "Hoạt động").slice(0, 3);

  return (
    <div className="mt-8">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <h3 className="text-lg font-bold text-gray-900">Mentor có sẵn</h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm mentor"
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeTutors.map((mentor) => (
            <div
              key={mentor.id}
              className="border border-gray-200 rounded-xl p-4 flex gap-4 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group bg-white"
            >
              <img
                src={mentor.avatarUrl}
                alt={mentor.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-50"
              />
              <div className="flex-1 flex flex-col h-full">
                <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {mentor.name}
                </h4>
                <p className="text-xs text-gray-500 font-medium">Khoa học máy tính</p>
                <div className="flex items-center gap-1 mt-1 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(mentor.rating) ? "fill-current" : ""
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 font-medium">({mentor.rating})</span>
                </div>
                <p className="text-xs text-gray-500 mt-auto">
                  Có sẵn: <span className="text-gray-700 font-medium">Hôm nay 15:00</span>
                </p>
              </div>
              <div className="flex flex-col justify-end">
                <button className="bg-blue-50 text-blue-600 text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors">
                  Đặt lịch
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}