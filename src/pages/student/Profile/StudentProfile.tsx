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
    const foundMentee = user ? mentees.find((m) => String(m.id) === String(user.id)) : null;

    // Merge dữ liệu
    return {
      ...studentJson,
      ...user,

      fullName: foundMentee?.name || user?.fullName || studentJson.fullName,
      studentId: foundMentee?.id || user?.id || studentJson.studentId,
      avatar: foundMentee?.avatarUrl || user?.avatar || studentJson.avatar,

      skills: studentJson.skills || [],
      hobbies: studentJson.hobbies || [],
    };
  });

  const [newSkill, setNewSkill] = useState("");
  const [newHobby, setNewHobby] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // SKILLS
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill("");
    }
  };
  const handleRemoveSkill = (idx: number) => {
    setFormData((prev) => ({ ...prev, skills: prev.skills.filter((_, i) => i !== idx) }));
  };

  // HOBBIES
  const handleAddHobby = () => {
    if (newHobby.trim()) {
      setFormData((prev) => ({ ...prev, hobbies: [...prev.hobbies, newHobby.trim()] }));
      setNewHobby("");
    }
  };
  const handleRemoveHobby = (idx: number) => {
    setFormData((prev) => ({ ...prev, hobbies: prev.hobbies.filter((_, i) => i !== idx) }));
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
    <div className='min-h-screen bg-white'>
      {/* Main Content */}
      <div className='container mx-auto px-4 py-8'>
        <div className='mb-6'>
          <h1 className='mb-1 text-2xl font-semibold'>Quản lý Hồ sơ</h1>
          <p className='text-gray-600'>Quản lý và chỉnh sửa thông tin cá nhân của bạn</p>
        </div>

        {/* Profile Card */}
        <div className='mb-6 rounded-lg bg-white p-6 shadow-sm'>
          <div className='flex items-start gap-4'>
            <div className='relative'>
              <div className='h-20 w-20 overflow-hidden rounded-full bg-gray-300'>
                <img
                  src={formData.avatar}
                  alt='Avatar'
                  className='h-full w-full object-cover'
                  onError={(e) => (e.currentTarget.src = "/images/image.jpg")}
                />
              </div>
              <label className='absolute right-0 bottom-0 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-blue-600 transition hover:bg-blue-700'>
                <Camera className='h-3 w-3 text-white' />
                <input type='file' className='hidden' accept='image/*' />
              </label>
            </div>
            <div>
              <h2 className='mb-1 text-xl font-semibold'>{formData.fullName}</h2>
              <p className='mb-1 text-sm text-gray-600'>Mã sinh viên: {formData.studentId}</p>
              <p className='mb-2 text-sm text-gray-600'>{formData.email}</p>
              <div className='flex items-center gap-4'>
                <span className='rounded-full bg-green-100 px-3 py-1 text-xs text-green-700'>Đang hoạt động</span>
                <span className='text-sm text-gray-500'>Thành viên từ {formData.joinDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information Form */}
        <div className='mb-6 rounded-lg bg-white p-6 shadow-sm'>
          <h3 className='mb-1 font-semibold'>Thông tin cá nhân</h3>
          <p className='mb-4 text-sm text-gray-600'>Cập nhật thông tin cơ bản về bạn và liên hệ của bạn</p>

          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='mb-2 block text-sm text-gray-700'>Họ và tên</label>
                <input
                  type='text'
                  name='fullName'
                  value={formData.fullName}
                  disabled
                  className='w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-500'
                />
              </div>
              <div>
                <label className='mb-2 block text-sm text-gray-700'>Mã sinh viên</label>
                <input
                  type='text'
                  value={formData.studentId}
                  disabled
                  className='w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-500'
                />
              </div>
            </div>

            <div>
              <label className='mb-2 block text-sm text-gray-700'>Địa chỉ email</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                disabled
                className='w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-500'
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='mb-2 block text-sm text-gray-700'>Số điện thoại</label>
                <input
                  type='text'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  className='w-full rounded-lg border border-gray-300 px-4 py-2'
                />
              </div>
              <div>
                <label className='mb-2 block text-sm text-gray-700'>Ngày sinh</label>
                <input
                  type='date'
                  name='birthDate'
                  value={formData.birthDate}
                  onChange={handleChange}
                  className='w-full rounded-lg border border-gray-300 px-4 py-2'
                />
              </div>
            </div>

            <div>
              <label className='mb-2 block text-sm text-gray-700'>Giới thiệu bản thân</label>
              <textarea
                name='bio'
                value={formData.bio}
                onChange={handleChange}
                className='h-24 w-full resize-none rounded-lg border border-gray-300 px-4 py-2'
                placeholder='Viết vài câu về bản thân, sở thích và mục tiêu học tập của bạn...'
              />
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className='mb-6 rounded-lg bg-white p-6 shadow-sm'>
          <h3 className='mb-1 font-semibold'>Thông tin học tập</h3>
          <p className='mb-4 text-sm text-gray-600'>Cập nhật các thông tin về việc học tập của bạn</p>

          <div className='space-y-4'>
            <div>
              <label className='mb-2 block text-sm text-gray-700'>Trường học</label>
              <input
                type='text'
                name='university'
                value={formData.university}
                onChange={handleChange}
                className='w-full rounded-lg border border-gray-300 px-4 py-2'
              />
            </div>

            <div>
              <label className='mb-2 block text-sm text-gray-700'>Chuyên ngành</label>
              <input
                type='text'
                name='major'
                value={formData.major}
                onChange={handleChange}
                className='w-full rounded-lg border border-gray-300 px-4 py-2'
              />
            </div>
          </div>
        </div>

        {/* Skills and Expertise */}
        <div className='mb-6 rounded-lg bg-white p-6 shadow-sm'>
          <h3 className='mb-1 font-semibold'>Kỹ năng & Chuyên môn</h3>
          <p className='mb-4 text-sm text-gray-600'>Thêm kỹ năng</p>

          <div className='mb-4 flex items-center gap-2'>
            <input
              type='text'
              placeholder='Nhập kỹ năng...'
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
              className='flex-1 rounded-lg border border-gray-300 px-4 py-2'
            />
            <button
              onClick={handleAddSkill}
              className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700'
            >
              <Plus className='h-5 w-5' />
            </button>
          </div>

          {/* Warning Box theo layout mới */}
          <div className='mb-4 rounded-lg border border-orange-200 bg-orange-50 p-4'>
            <div className='flex items-start gap-2'>
              <span className='text-orange-600'>⚠️</span>
              <div>
                <div className='mb-1 text-sm font-medium text-orange-900'>Yêu cầu: Đăng Ký Năng Lực Kỹ năng</div>
                <p className='mb-3 text-xs text-orange-700'>
                  Chú ý: Cập nhật đầy đủ kỹ năng giúp bạn nhận được các gợi ý khóa học và tutor phù hợp nhất với năng
                  lực của mình.
                </p>
                <button className='rounded-lg bg-orange-500 px-4 py-2 text-sm text-white hover:bg-orange-600'>
                  Cập nhật Năng lực
                </button>
              </div>
            </div>
          </div>

          <div className='flex flex-wrap gap-2'>
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className='flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm text-blue-700'
              >
                {skill}
                <X
                  className='h-3.5 w-3.5 cursor-pointer hover:text-blue-900'
                  onClick={() => handleRemoveSkill(index)}
                />
              </span>
            ))}
          </div>
        </div>

        {/* Hobbies */}
        <div className='mb-6 rounded-lg bg-white p-6 shadow-sm'>
          <h3 className='mb-1 font-semibold'>Sở thích & Hobbies</h3>
          <p className='mb-4 text-sm text-gray-600'>Thêm sở thích</p>

          <div className='mb-4 flex items-center gap-2'>
            <input
              type='text'
              placeholder='Nhập sở thích...'
              value={newHobby}
              onChange={(e) => setNewHobby(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddHobby()}
              className='flex-1 rounded-lg border border-gray-300 px-4 py-2'
            />
            <button
              onClick={handleAddHobby}
              className='flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 text-white hover:bg-green-700'
            >
              <Plus className='h-5 w-5' />
            </button>
          </div>

          <div className='flex flex-wrap gap-2'>
            {formData.hobbies.map((hobby, index) => (
              <span
                key={index}
                className='flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm text-green-700'
              >
                {hobby}
                <X
                  className='h-3.5 w-3.5 cursor-pointer hover:text-green-900'
                  onClick={() => handleRemoveHobby(index)}
                />
              </span>
            ))}
          </div>
        </div>

        {/* Account Settings */}
        <div className='mb-6 rounded-lg bg-white p-6 shadow-sm'>
          <h3 className='mb-1 font-semibold'>Cài đặt Tài khoản</h3>
          <p className='mb-4 text-sm text-gray-600'>Quản lý các cài đặt liên quan đến quyền riêng tư của bạn</p>

          <div className='space-y-4'>
            <div className='flex items-center justify-between border-b border-gray-200 pb-4'>
              <div>
                <div className='mb-1 text-sm font-medium'>Thông báo Email</div>
                <div className='text-xs text-gray-600'>Nhận các thư email về các lớp học liên quan</div>
              </div>
              <label className='relative inline-flex cursor-pointer items-center'>
                <input type='checkbox' className='peer sr-only' defaultChecked />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>

            <div className='flex items-center justify-between border-b border-gray-200 pb-4'>
              <div>
                <div className='mb-1 text-sm font-medium'>Hiển thị hồ sơ</div>
                <div className='text-xs text-gray-600'>
                  Cho phép hồ sơ hiển thị trong kết quả tìm kiếm của giáo viên
                </div>
              </div>
              <label className='relative inline-flex cursor-pointer items-center'>
                <input type='checkbox' className='peer sr-only' defaultChecked />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>

            <div className='flex items-center justify-between'>
              <div>
                <div className='mb-1 text-sm font-medium'>Xác thực hai yếu tố</div>
                <div className='text-xs text-gray-600'>Thêm một lớp bảo mật bổ sung cho tài khoản của bạn</div>
              </div>
              <button className='rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700'>
                Kích hoạt 2FA
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex justify-end gap-3'>
          <button onClick={handleCancel} className='rounded-lg border border-gray-300 px-6 py-2.5 hover:bg-gray-50'>
            Hủy
          </button>
          <button onClick={handleSave} className='rounded-lg bg-blue-600 px-6 py-2.5 text-white hover:bg-blue-700'>
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}
