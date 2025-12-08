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

    const foundTutor = user ? tutors.find((t) => String(t.id) === String(user.id)) : null;

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
        students: foundTutor?.totalMentee ?? tutorJson.stats.students,
      },
    };
  });

  const [newSkill, setNewSkill] = useState("");
  const [newSubject, setNewSubject] = useState({ name: "", level: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name) setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill("");
    }
  };
  const handleRemoveSkill = (idx: number) => {
    setFormData((prev) => ({ ...prev, skills: prev.skills.filter((_, i) => i !== idx) }));
  };

  const handleAddSubject = () => {
    if (newSubject.name && newSubject.level) {
      setFormData((prev) => ({
        ...prev,
        teachingSubjects: [...prev.teachingSubjects, { ...newSubject, icon: "📘" }],
      }));
      setNewSubject({ name: "", level: "" });
    }
  };
  const handleRemoveSubject = (idx: number) => {
    setFormData((prev) => ({ ...prev, teachingSubjects: prev.teachingSubjects.filter((_, i) => i !== idx) }));
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
    <div className='min-h-screen bg-white pb-12'>
      <div className='container mx-auto px-4 py-8'>
        <div className='mb-6'>
          <h1 className='mb-1 text-2xl font-semibold text-gray-900'>Hồ sơ Giáo viên</h1>
          <p className='text-gray-600'>Quản lý thông tin cá nhân và chuyên môn giảng dạy của bạn</p>
        </div>

        {/* Profile Card */}
        <div className='mb-6 rounded-lg border border-gray-100 bg-white p-6 shadow-sm'>
          <div className='flex items-start justify-between'>
            <div className='flex gap-4'>
              <div className='relative'>
                <div className='h-20 w-20 overflow-hidden rounded-full bg-gray-300'>
                  <img
                    src={formData.avatar}
                    alt='Profile'
                    className='h-full w-full object-cover'
                    onError={(e) => (e.currentTarget.src = "/images/img-2.jpg")}
                  />
                </div>
                <label className='absolute right-0 bottom-0 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-blue-600 transition hover:bg-blue-700'>
                  <Camera className='h-3 w-3 text-white' />
                  <input type='file' className='hidden' />
                </label>
              </div>
              <div>
                <h2 className='mb-1 text-xl font-semibold text-gray-900'>{formData.fullName}</h2>
                <p className='mb-1 text-sm text-gray-600'>Mã giáo viên: #{formData.tutorId}</p>
                <p className='mb-2 text-sm text-gray-600'>{formData.email}</p>
                <div className='flex items-center gap-4'>
                  <span className='rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700'>
                    {formData.status}
                  </span>
                  <div className='flex items-center gap-1'>
                    <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                    <span className='font-semibold text-gray-900'>{formData.rating}</span>
                    <span className='text-sm text-gray-500'>({formData.reviewCount || 0} đánh giá)</span>
                  </div>
                  <span className='text-sm text-gray-500'>Thành viên từ {formData.joinDate}</span>
                </div>
              </div>
            </div>

            <div className='flex w-full justify-around gap-8 md:w-auto md:justify-end'>
              <div className='text-center'>
                <div className='text-3xl font-semibold text-blue-600'>{formData.stats?.sessions || 0}</div>
                <div className='text-sm text-gray-600'>Buổi dạy</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-semibold text-green-600'>{formData.stats?.students || 0}</div>
                <div className='text-sm text-gray-600'>Học viên</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-semibold text-purple-600'>{formData.stats?.subjects || 0}</div>
                <div className='text-sm text-gray-600'>Môn học</div>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Left Column */}
          <div className='space-y-6 lg:col-span-2'>
            <div className='rounded-lg border border-gray-100 bg-white p-6 shadow-sm'>
              <h3 className='mb-1 font-semibold text-gray-900'>Thông tin cá nhân</h3>
              <p className='mb-4 text-sm text-gray-600'>Cập nhật thông tin cơ bản về bản và liên hệ</p>

              <div className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>Họ và tên</label>
                  <input
                    type='text'
                    name='fullName'
                    value={formData.fullName}
                    disabled
                    className='w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-500 outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>Mã giáo viên</label>
                  <input
                    type='text'
                    name='tutorId'
                    value={formData.tutorId}
                    disabled
                    className='w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-500'
                  />
                </div>
              </div>

              <div className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>Số điện thoại</label>
                  <input
                    type='text'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    className='w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>Email</label>
                  <input
                    type='text'
                    name='email'
                    value={formData.email}
                    disabled
                    className='w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-500 outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>

              <div className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>Năm kinh nghiệm</label>
                  <input
                    type='text'
                    name='yearsExperience'
                    value={formData.yearsExperience}
                    onChange={handleChange}
                    className='w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>Giới thiệu bản thân</label>
                <textarea
                  name='bio'
                  value={formData.bio}
                  onChange={handleChange}
                  className='h-24 w-full resize-none rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            </div>

            {/* Skills */}
            <div className='rounded-lg border border-gray-100 bg-white p-6 shadow-sm'>
              <h3 className='mb-1 font-semibold text-gray-900'>Kỹ năng chuyên môn</h3>
              <p className='mb-4 text-sm text-gray-600'>Thêm các kỹ năng và chuyên môn của bạn</p>

              <div className='mb-4 flex items-center gap-2'>
                <input
                  type='text'
                  placeholder='Nhập kỹ năng...'
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                  className='flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button
                  onClick={handleAddSkill}
                  className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white transition-colors hover:bg-blue-700'
                >
                  <Plus className='h-5 w-5' />
                </button>
              </div>

              <div className='flex flex-wrap gap-2'>
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className='flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm text-blue-700'
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

            {/* Teaching Subjects */}
            <div className='rounded-lg border border-gray-100 bg-white p-6 shadow-sm'>
              <h3 className='mb-1 font-semibold text-gray-900'>Môn học giảng dạy</h3>
              <div className='mb-4 flex flex-col gap-2 sm:flex-row'>
                <input
                  type='text'
                  placeholder='Chọn môn học...'
                  value={newSubject.name}
                  onChange={(e) => setNewSubject((prev) => ({ ...prev, name: e.target.value }))}
                  className='flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500'
                />
                <input
                  type='text'
                  placeholder='Cấp độ...'
                  value={newSubject.level}
                  onChange={(e) => setNewSubject((prev) => ({ ...prev, level: e.target.value }))}
                  className='w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 sm:w-32'
                />
                <button
                  onClick={handleAddSubject}
                  className='flex h-10 w-full items-center justify-center rounded-lg bg-blue-600 text-white transition-colors hover:bg-blue-700 sm:w-10'
                >
                  <Plus className='h-5 w-5' />
                </button>
              </div>
              <div className='space-y-2'>
                {formData.teachingSubjects.map((sub, idx) => (
                  <div
                    key={idx}
                    className='flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4'
                  >
                    <div className='flex items-center gap-3'>
                      <div className='flex h-8 w-8 items-center justify-center rounded bg-white text-lg shadow-sm'>
                        {sub.icon || "📘"}
                      </div>
                      <div>
                        <div className='font-medium text-gray-900'>{sub.name}</div>
                        <div className='text-sm text-gray-600'>{sub.level}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveSubject(idx)}
                      className='rounded-full p-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700'
                    >
                      <Trash2 className='h-5 w-5' />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className='space-y-6 lg:col-span-1'>
            <div className='rounded-lg border border-gray-100 bg-white p-6 shadow-sm'>
              <h3 className='mb-1 font-semibold text-gray-900'>Bằng cấp & Chứng chỉ</h3>
              <div className='mb-4 space-y-3'>
                <div className='rounded-lg border border-gray-200 bg-gray-50 p-3'>
                  <div className='mb-1 flex items-start justify-between'>
                    <div className='text-sm font-medium text-gray-900'>Tiến sĩ Toán học</div>
                    <div className='mt-1.5 h-2 w-2 rounded-full bg-red-500'></div>
                  </div>
                  <div className='text-xs text-gray-600'>Đại học Stanford</div>
                </div>
              </div>
              <button className='flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50'>
                <Plus className='h-4 w-4' /> Thêm bằng cấp
              </button>
            </div>

            <div className='rounded-lg border border-gray-100 bg-white p-6 shadow-sm'>
              <h3 className='mb-4 font-semibold text-gray-900'>Cài đặt</h3>
              <div className='space-y-4'>
                <div className='flex items-start justify-between'>
                  <div>
                    <div className='mb-1 text-sm font-medium text-gray-900'>Nhận học viên mới</div>
                    <div className='text-xs text-gray-600'>Cho phép nhận yêu cầu từ học viên mới</div>
                  </div>
                  <input type='checkbox' className='h-5 w-5 accent-blue-600' defaultChecked />
                </div>
              </div>
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
