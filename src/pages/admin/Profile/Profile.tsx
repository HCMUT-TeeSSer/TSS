import React, { useState } from "react";
import adminJson from "@/data/adminProfile.json";
import { useAuth } from "@/hooks/useAuth";
import { Camera, Users, Settings, FileText, Database, UserPlus, Lock, X } from "lucide-react";
import { toast } from "react-toastify";

interface AdminProfileState {
  fullName: string;
  adminId: string;
  email: string;
  phone: string;
  department: string;
  division: string;
  position: string;
  bio: string;
  avatar: string;
  status: string;
  role: string;
  joinDate: string;
  stats: {
    users: number;
    departments: number;
    divisions: number;
  };
  permissions: {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    hasAccess: boolean;
  }[];
  recentActivities: {
    id: number;
    action: string;
    time: string;
    icon: string;
    color: string;
  }[];
  security: {
    twoFactorAuth: boolean;
    loginNotifications: boolean;
  };
}

const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    users: Users,
    settings: Settings,
    file: FileText,
    database: Database,
    "user-plus": UserPlus,
  };
  return icons[iconName] ?? FileText;
};

const getColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; border: string; iconBg: string; text: string; badge: string }> = {
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      iconBg: "bg-green-100",
      text: "text-green-800",
      badge: "bg-green-100 text-green-800",
    },
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      iconBg: "bg-blue-100",
      text: "text-blue-800",
      badge: "bg-green-100 text-green-800",
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      iconBg: "bg-purple-100",
      text: "text-purple-800",
      badge: "bg-green-100 text-green-800",
    },
    yellow: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      iconBg: "bg-yellow-100",
      text: "text-yellow-800",
      badge: "bg-green-100 text-green-800",
    },
  };
  return colors[color] ?? colors.green;
};

export default function AdminProfile() {
  const { user } = useAuth();

  const [formData, setFormData] = useState<AdminProfileState>(() => {
    const saved = localStorage.getItem("adminProfileData");
    if (saved) return JSON.parse(saved) as AdminProfileState;

    return {
      ...adminJson,
      fullName: user?.fullName ?? adminJson.fullName,
      email: user?.email ?? adminJson.email,
      avatar: user?.avatar ?? adminJson.avatar,
    };
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleToggleSecurity = (field: "twoFactorAuth" | "loginNotifications") => {
    setFormData((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        [field]: !prev.security[field],
      },
    }));
  };

  const handleSave = () => {
    localStorage.setItem("adminProfileData", JSON.stringify(formData));
    toast.success("Lưu hồ sơ thành công!");
  };

  const handleCancel = () => {
    if (window.confirm("Bạn có chắc chắn muốn hủy các thay đổi chưa lưu?")) {
      localStorage.removeItem("adminProfileData");
      window.location.reload();
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='border-b border-gray-200 bg-white shadow-sm'>
        <div className='container mx-auto px-6 py-6'>
          <h1 className='text-2xl font-bold text-gray-900'>Hồ sơ Quản trị viên</h1>
          <p className='mt-1 text-gray-600'>Quản lý thông tin cá nhân và phân quyền hệ thống</p>
        </div>
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-6 py-6'>
        <div className='mx-auto max-w-[896px] space-y-6'>
          {/* Profile Card */}
          <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm'>
            <div className='flex items-center justify-between'>
              {/* Left: Avatar & Info */}
              <div className='flex items-center'>
                <div className='relative'>
                  <img src={formData.avatar} alt={formData.fullName} className='h-24 w-24 rounded-full object-cover' />
                  <button
                    className='absolute right-0 bottom-0 rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700'
                    aria-label='Thay đổi ảnh đại diện'
                  >
                    <Camera size={14} />
                  </button>
                </div>
                <div className='ml-6'>
                  <h2 className='text-2xl font-bold text-gray-900'>{formData.fullName}</h2>
                  <p className='text-gray-600'>Mã cán bộ: #{formData.adminId}</p>
                  <p className='text-gray-600'>{formData.email}</p>
                  <div className='mt-2 flex items-center gap-2'>
                    <span className='rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800'>
                      {formData.status}
                    </span>
                    <span className='rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800'>
                      {formData.role}
                    </span>
                    <span className='text-sm text-gray-500'>Thành viên từ tháng {formData.joinDate}</span>
                  </div>
                </div>
              </div>

              {/* Right: Stats */}
              <div className='flex gap-6'>
                <div className='rounded-lg bg-blue-50 p-4 text-center'>
                  <div className='text-2xl font-bold text-blue-600'>{formData.stats.users.toLocaleString()}</div>
                  <div className='text-sm text-gray-600'>Người dùng</div>
                </div>
                <div className='rounded-lg bg-green-50 p-4 text-center'>
                  <div className='text-2xl font-bold text-green-600'>{formData.stats.departments}</div>
                  <div className='text-sm text-gray-600'>Khoa</div>
                </div>
                <div className='rounded-lg bg-purple-50 p-4 text-center'>
                  <div className='text-2xl font-bold text-purple-600'>{formData.stats.divisions}</div>
                  <div className='text-sm text-gray-600'>Phòng ban</div>
                </div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className='grid grid-cols-2 gap-6'>
            {/* Left Column */}
            <div className='space-y-6'>
              {/* Personal Info */}
              <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm'>
                <h3 className='mb-2 text-xl font-semibold text-gray-900'>Thông tin cá nhân</h3>
                <p className='mb-6 text-gray-600'>Cập nhật thông tin cơ bản và liên hệ</p>

                <div className='space-y-4'>
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>Họ và tên</label>
                    <input
                      type='text'
                      name='fullName'
                      value={formData.fullName}
                      onChange={handleChange}
                      className='w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-500'
                      disabled
                    />
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>Mã cán bộ</label>
                    <input
                      type='text'
                      name='adminId'
                      value={formData.adminId}
                      onChange={handleChange}
                      className='w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-500'
                      disabled
                    />
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>Số điện thoại</label>
                    <input
                      type='text'
                      name='phone'
                      value={formData.phone}
                      onChange={handleChange}
                      className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                    />
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>Email</label>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      className='w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-500'
                      disabled
                    />
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>Khoa</label>
                    <input
                      type='text'
                      name='department'
                      value={formData.department}
                      onChange={handleChange}
                      className='w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-500'
                      disabled
                    />
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>Phòng ban</label>
                    <input
                      type='text'
                      name='division'
                      value={formData.division}
                      onChange={handleChange}
                      className='w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-500'
                      disabled
                    />
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>Chức vụ</label>
                    <input
                      type='text'
                      name='position'
                      value={formData.position}
                      disabled
                      className='w-full rounded-lg border border-gray-300 px-4 py-3 bg-gray-100 text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                    />
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>Ghi chú</label>
                    <textarea
                      name='bio'
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className='space-y-6'>
              {/* Permissions */}
              <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm'>
                <h3 className='mb-2 text-xl font-semibold text-gray-900'>Quyền hạn</h3>
                <p className='mb-6 text-gray-600'>Quản lý các quyền truy cập hệ thống</p>

                <div className='space-y-4'>
                  {formData.permissions.map((permission) => {
                    const colors = getColorClasses(permission.color);
                    const IconComponent = getIconComponent(permission.icon);

                    return (
                      <div
                        key={permission.id}
                        className={`${colors.bg} border ${colors.border} flex items-center justify-between rounded-lg p-4`}
                      >
                        <div className='flex items-center'>
                          <div className={`${colors.iconBg} rounded-lg p-2`}>
                            <IconComponent size={14} className='text-gray-700' />
                          </div>
                          <div className='ml-3'>
                            <h4 className='font-medium text-gray-900'>{permission.name}</h4>
                            <p className='text-sm text-gray-600'>{permission.description}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 ${colors.badge} rounded-full text-xs font-medium`}>Có quyền</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Activities */}
              <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm'>
                <h3 className='mb-2 text-xl font-semibold text-gray-900'>Hoạt động gần đây</h3>
                <p className='mb-6 text-gray-600'>Lịch sử các hoạt động quản trị</p>

                <div className='space-y-3'>
                  {formData.recentActivities.map((activity) => {
                    const IconComponent = getIconComponent(activity.icon);
                    const bgColor =
                      activity.color === "blue"
                        ? "bg-blue-100"
                        : activity.color === "green"
                          ? "bg-green-100"
                          : "bg-purple-100";

                    return (
                      <div key={activity.id} className='flex items-center rounded-lg border border-gray-200 p-4'>
                        <div className={`${bgColor} rounded-lg p-2`}>
                          <IconComponent size={14} className='text-gray-700' />
                        </div>
                        <div className='ml-3'>
                          <p className='text-sm font-medium text-gray-900'>{activity.action}</p>
                          <p className='text-xs text-gray-500'>{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Security */}
              <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm'>
                <h3 className='mb-6 text-xl font-semibold text-gray-900'>Bảo mật</h3>

                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h4 className='font-medium text-gray-900'>Xác thực hai yếu tố</h4>
                      <p className='text-sm text-gray-600'>Tăng cường bảo mật tài khoản</p>
                    </div>
                    <button
                      onClick={() => handleToggleSecurity("twoFactorAuth")}
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        formData.security.twoFactorAuth ? "bg-blue-600" : "bg-gray-300"
                      }`}
                      aria-label='Bật/tắt xác thực hai yếu tố'
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                          formData.security.twoFactorAuth ? "translate-x-5" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <div className='flex items-center justify-between'>
                    <div>
                      <h4 className='font-medium text-gray-900'>Thông báo đăng nhập</h4>
                      <p className='text-sm text-gray-600'>Nhận email khi có đăng nhập mới</p>
                    </div>
                    <button
                      onClick={() => handleToggleSecurity("loginNotifications")}
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        formData.security.loginNotifications ? "bg-blue-600" : "bg-gray-300"
                      }`}
                      aria-label='Bật/tắt thông báo đăng nhập'
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                          formData.security.loginNotifications ? "translate-x-5" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <button className='flex w-full items-center justify-center gap-2 rounded-lg border border-blue-600 px-4 py-3 font-medium text-blue-600 transition-colors hover:bg-blue-50'>
                    <Lock size={16} />
                    Đổi mật khẩu
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex justify-end gap-4'>
            <button
              onClick={handleCancel}
              className='flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50'
            >
              <X size={16} />
              Hủy
            </button>
            <button
              onClick={handleSave}
              className='flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700'
            >
              <Lock size={16} />
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
