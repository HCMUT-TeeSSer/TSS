import React, { useState } from "react";
import tutorJson from "@/data/tutorProfile.json";
import { tutors } from "@/data/tutors";
import { useAuth } from "@/hooks/useAuth";
import { Star, Plus, X, Camera, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

// Kiểu dữ liệu cho Tutor State
interface TutorProfileState {
  fullName: string;
  tutorId: string | number;
  email: string;
  phone: string;
  yearsExperience: string | number;
  hourlyRate: string | number;
  bio: string;
  avatar: string;
  status: string;
  joinDate: string;
  rating: number;
  reviewCount: number;
  skills: string[];
  teachingSubjects: { name: string; level: string; icon?: any }[];
  stats: { sessions: number; students: number; subjects: number };
  [key: string]: any;
}

export default function TutorProfile() {
  const { user } = useAuth();

  // KHỞI TẠO TƯƠNG TỰ BÊN STUDENT
  const [formData, setFormData] = useState<TutorProfileState>(() => {
    const saved = localStorage.getItem("tutorProfileData");
    if (saved) return JSON.parse(saved);

    const foundTutor = user ? tutors.find(t => String(t.id) === String(user.id)) : null;

    return {
      ...tutorJson,
      ...user,
      
      fullName: foundTutor?.name || user?.fullName || tutorJson.fullName,
      tutorId: foundTutor?.id || user?.id || tutorJson.tutorId,
      avatar: foundTutor?.avatarUrl || user?.avatar || tutorJson.avatar,
      rating: foundTutor?.rating || tutorJson.rating,
      status: foundTutor?.status || tutorJson.status,
      
      skills: tutorJson.skills || [],
      teachingSubjects: tutorJson.teachingSubjects || [],

      stats: { 
        ...tutorJson.stats,
        students: foundTutor?.totalMentee ?? tutorJson.stats.students 
      }
    };
  });

  const [newSkill, setNewSkill] = useState("");
  const [newSubject, setNewSubject] = useState({ name: "", level: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if(name) setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill("");
    }
  };
  const handleRemoveSkill = (idx: number) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== idx) }));
  };

  const handleAddSubject = () => {
    if (newSubject.name && newSubject.level) {
      setFormData(prev => ({
        ...prev,
        teachingSubjects: [...prev.teachingSubjects, { ...newSubject, icon: "📘" }]
      }));
      setNewSubject({ name: "", level: "" });
    }
  };
  const handleRemoveSubject = (idx: number) => {
    setFormData(prev => ({ ...prev, teachingSubjects: prev.teachingSubjects.filter((_, i) => i !== idx) }));
  };

  const handleSave = () => {
    localStorage.setItem("tutorProfileData", JSON.stringify(formData));
    toast.success("Lưu hồ sơ thành công!");
  };
  const handleCancel = () => {
    if (window.confirm("Bạn có chắc chắn muốn hủy các thay đổi chưa lưu?")) {
      localStorage.removeItem("studentProfileData");
      window.location.reload();
    }
  };

  // LAYOUT
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-1 text-gray-900">Hồ sơ Giáo viên</h1>
          <p className="text-gray-600">Quản lý thông tin cá nhân và chuyên môn giảng dạy của bạn</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gray-300 rounded-full overflow-hidden">
                  <img 
                    src={formData.avatar} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                    onError={(e) => e.currentTarget.src = "/images/img-2.jpg"}
                  />
                </div>
                <label className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition">
                  <Camera className="w-3 h-3 text-white" />
                  <input type="file" className="hidden" />
                </label>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-1 text-gray-900">{formData.fullName}</h2>
                <p className="text-gray-600 text-sm mb-1">Mã giáo viên: #{formData.tutorId}</p>
                <p className="text-gray-600 text-sm mb-2">{formData.email}</p>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">{formData.status}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{formData.rating}</span>
                    <span className="text-gray-500 text-sm">({formData.reviewCount || 0} đánh giá)</span>
                  </div>
                  <span className="text-gray-500 text-sm">Thành viên từ {formData.joinDate}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-8 w-full md:w-auto justify-around md:justify-end">
              <div className="text-center">
                <div className="text-3xl font-semibold text-blue-600">{formData.stats?.sessions || 0}</div>
                <div className="text-gray-600 text-sm">Buổi dạy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold text-green-600">{formData.stats?.students || 0}</div>
                <div className="text-gray-600 text-sm">Học viên</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold text-purple-600">{formData.stats?.subjects || 0}</div>
                <div className="text-gray-600 text-sm">Môn học</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold mb-1 text-gray-900">Thông tin cá nhân</h3>
              <p className="text-gray-600 text-sm mb-4">Cập nhật thông tin cơ bản về bản và liên hệ</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mã giáo viên</label>
                  <input type="text" value={formData.tutorId} disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="text" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Năm kinh nghiệm</label>
                  <input type="text" name="yearsExperience" value={formData.yearsExperience} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mức lương/giờ (VNĐ)</label>
                  <input type="text" name="hourlyRate" value={formData.hourlyRate} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Giới thiệu bản thân</label>
                <textarea name="bio" value={formData.bio} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 resize-none focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold mb-1 text-gray-900">Kỹ năng chuyên môn</h3>
              <p className="text-gray-600 text-sm mb-4">Thêm các kỹ năng và chuyên môn của bạn</p>
              
              <div className="flex items-center gap-2 mb-4">
                <input type="text" placeholder="Nhập kỹ năng..." value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                <button onClick={handleAddSkill} className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"><Plus className="w-5 h-5" /></button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm flex items-center gap-2 border border-blue-100">
                    {skill}
                    <X className="w-3.5 h-3.5 cursor-pointer hover:text-blue-900" onClick={() => handleRemoveSkill(index)} />
                  </span>
                ))}
              </div>
            </div>

            {/* Teaching Subjects */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold mb-1 text-gray-900">Môn học giảng dạy</h3>
              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <input type="text" placeholder="Chọn môn học..." value={newSubject.name} onChange={(e) => setNewSubject(prev => ({ ...prev, name: e.target.value }))} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                <input type="text" placeholder="Cấp độ..." value={newSubject.level} onChange={(e) => setNewSubject(prev => ({ ...prev, level: e.target.value }))} className="w-full sm:w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                <button onClick={handleAddSubject} className="w-full sm:w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"><Plus className="w-5 h-5" /></button>
              </div>
              <div className="space-y-2">
                {formData.teachingSubjects.map((sub, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-lg shadow-sm">{sub.icon || "📘"}</div>
                      <div>
                        <div className="font-medium text-gray-900">{sub.name}</div>
                        <div className="text-sm text-gray-600">{sub.level}</div>
                      </div>
                    </div>
                    <button onClick={() => handleRemoveSubject(idx)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"><Trash2 className="w-5 h-5" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold mb-1 text-gray-900">Bằng cấp & Chứng chỉ</h3>
              <div className="space-y-3 mb-4">
                <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-start justify-between mb-1">
                    <div className="font-medium text-sm text-gray-900">Tiến sĩ Toán học</div>
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                  </div>
                  <div className="text-xs text-gray-600">Đại học Stanford</div>
                </div>
              </div>
              <button className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-blue-600 hover:bg-blue-50 flex items-center justify-center gap-2 transition-colors font-medium text-sm">
                <Plus className="w-4 h-4" /> Thêm bằng cấp
              </button>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold mb-4 text-gray-900">Cài đặt</h3>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-sm mb-1 text-gray-900">Nhận học viên mới</div>
                    <div className="text-xs text-gray-600">Cho phép nhận yêu cầu từ học viên mới</div>
                  </div>
                  <input type="checkbox" className="accent-blue-600 w-5 h-5" defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button 
            onClick={handleCancel}
            className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Hủy
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}