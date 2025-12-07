import React, { useState } from "react";
import studentJson from "@/data/studentProfile.json";
import { mentees } from "@/data/mentees";
import { useAuth } from "@/hooks/useAuth";
import { Plus, X, Camera } from "lucide-react";
import { toast } from "react-toastify";

// Kiểu dữ liệu cho State
interface StudentProfileState {
  fullName: string;
  studentId: string | number;
  email: string;
  phone: string;
  birthDate: string;
  bio: string;
  university: string;
  major: string;
  avatar: string;
  status: string;
  joinDate: string;
  skills: string[];
  hobbies: string[];
  [key: string]: any; 
}

export default function StudentProfile() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<StudentProfileState>(() => {
    // Tìm trong studentProfile.json
    const saved = localStorage.getItem("studentProfileData");
    if (saved) return JSON.parse(saved);

    // Tìm trong mentees.ts
    const foundMentee = user ? mentees.find(m => String(m.id) === String(user.id)) : null;

    // Merge dữ liệu
    return {
      ...studentJson,                 
      ...user,                        
      
      fullName: foundMentee?.name || user?.fullName || studentJson.fullName,
      studentId: foundMentee?.id || user?.id || studentJson.studentId,
      avatar: foundMentee?.avatarUrl || user?.avatar || studentJson.avatar,
      
      skills: studentJson.skills || [],
      hobbies: studentJson.hobbies || []
    };
  });

  const [newSkill, setNewSkill] = useState("");
  const [newHobby, setNewHobby] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // SKILLS
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill("");
    }
  };
  const handleRemoveSkill = (idx: number) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== idx) }));
  };

  // HOBBIES
  const handleAddHobby = () => {
    if (newHobby.trim()) {
      setFormData(prev => ({ ...prev, hobbies: [...prev.hobbies, newHobby.trim()] }));
      setNewHobby("");
    }
  };
  const handleRemoveHobby = (idx: number) => {
    setFormData(prev => ({ ...prev, hobbies: prev.hobbies.filter((_, i) => i !== idx) }));
  };

  // SAVE
  const handleSave = () => {
    localStorage.setItem("studentProfileData", JSON.stringify(formData));
    toast.success("Lưu hồ sơ thành công!");
  };

  const handleCancel = () => {
    if (window.confirm("Bạn có chắc chắn muốn hủy các thay đổi chưa lưu?")) {
      localStorage.removeItem("studentProfileData");
      window.location.reload();
    }
  };

  //Layout
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-1">Quản lý Hồ sơ</h1>
          <p className="text-gray-600">Quản lý và chỉnh sửa thông tin cá nhân của bạn</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gray-300 rounded-full overflow-hidden">
                 <img 
                  src={formData.avatar} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                  onError={(e) => e.currentTarget.src = "/images/image.jpg"}
                />
              </div>
              <label className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition">
                <Camera className="w-3 h-3 text-white" />
                <input type="file" className="hidden" accept="image/*" />
              </label>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-1">{formData.fullName}</h2>
              <p className="text-gray-600 text-sm mb-1">Mã sinh viên: {formData.studentId}</p>
              <p className="text-gray-600 text-sm mb-2">{formData.email}</p>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">Đang hoạt động</span>
                <span className="text-gray-500 text-sm">Thành viên từ {formData.joinDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information Form */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="font-semibold mb-1">Thông tin cá nhân</h3>
          <p className="text-gray-600 text-sm mb-4">Cập nhật thông tin cơ bản về bạn và liên hệ của bạn</p>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Họ và tên</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Mã sinh viên</label>
                <input 
                  type="text" 
                  value={formData.studentId}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Địa chỉ email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Số điện thoại</label>
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Ngày sinh</label>
                <input 
                  type="date" 
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Giới thiệu bản thân</label>
              <textarea 
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 resize-none"
                placeholder="Viết vài câu về bản thân, sở thích và mục tiêu học tập của bạn..."
              />
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="font-semibold mb-1">Thông tin học tập</h3>
          <p className="text-gray-600 text-sm mb-4">Cập nhật các thông tin về việc học tập của bạn</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Trường học</label>
              <input 
                type="text" 
                name="university"
                value={formData.university}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Chuyên ngành</label>
              <input 
                type="text" 
                name="major"
                value={formData.major}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Skills and Expertise */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="font-semibold mb-1">Kỹ năng & Chuyên môn</h3>
          <p className="text-gray-600 text-sm mb-4">Thêm kỹ năng</p>
          
          <div className="flex items-center gap-2 mb-4">
            <input 
              type="text" 
              placeholder="Nhập kỹ năng..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
            <button 
              onClick={handleAddSkill}
              className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Warning Box theo layout mới */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-2">
              <span className="text-orange-600">⚠️</span>
              <div>
                <div className="font-medium text-orange-900 text-sm mb-1">Yêu cầu: Đăng Ký Năng Lực Kỹ năng</div>
                <p className="text-orange-700 text-xs mb-3">
                  Chú ý: Cập nhật đầy đủ kỹ năng giúp bạn nhận được các gợi ý khóa học và tutor phù hợp nhất với năng lực của mình.
                </p>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600">
                  Cập nhật Năng lực
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm flex items-center gap-2">
                {skill}
                <X 
                  className="w-3.5 h-3.5 cursor-pointer hover:text-blue-900" 
                  onClick={() => handleRemoveSkill(index)}
                />
              </span>
            ))}
          </div>
        </div>

        {/* Hobbies */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="font-semibold mb-1">Sở thích & Hobbies</h3>
          <p className="text-gray-600 text-sm mb-4">Thêm sở thích</p>
          
          <div className="flex items-center gap-2 mb-4">
            <input 
              type="text" 
              placeholder="Nhập sở thích..."
              value={newHobby}
              onChange={(e) => setNewHobby(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddHobby()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
            <button 
              onClick={handleAddHobby}
              className="w-10 h-10 bg-green-600 text-white rounded-lg flex items-center justify-center hover:bg-green-700"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.hobbies.map((hobby, index) => (
              <span key={index} className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm flex items-center gap-2">
                {hobby}
                <X 
                  className="w-3.5 h-3.5 cursor-pointer hover:text-green-900" 
                  onClick={() => handleRemoveHobby(index)}
                />
              </span>
            ))}
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="font-semibold mb-1">Cài đặt Tài khoản</h3>
          <p className="text-gray-600 text-sm mb-4">Quản lý các cài đặt liên quan đến quyền riêng tư của bạn</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <div className="font-medium text-sm mb-1">Thông báo Email</div>
                <div className="text-xs text-gray-600">Nhận các thư email về các lớp học liên quan</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <div className="font-medium text-sm mb-1">Hiển thị hồ sơ</div>
                <div className="text-xs text-gray-600">Cho phép hồ sơ hiển thị trong kết quả tìm kiếm của giáo viên</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm mb-1">Xác thực hai yếu tố</div>
                <div className="text-xs text-gray-600">Thêm một lớp bảo mật bổ sung cho tài khoản của bạn</div>
              </div>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                Kích hoạt 2FA
              </button>
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
