import { Link, NavLink, useNavigate } from "react-router-dom";
import path from "@/constants/path";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
// Import ảnh
import logo from "@/assets/images/applogo.png";
import iconBell from "@/assets/images/vector11.png";
import iconMail from "@/assets/images/vector12.png";
import avatarUser from "@/assets/images/img-3.jpg";
import iconDropdown from "@/assets/images/vector13.png";

const Header = () => {
  const navigate = useNavigate();
  const { logout, user: authUser } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigation = [
    { label: "Trang chủ", path: path.home, active: true },
    { label: "Chương trình", path: path.menteePrograms, active: false },
    { label: "Chương trình của tôi", path: path.menteeMyProgram, active: false },
    { label: "Tài liệu", path: "/documents", active: false },
  ];

  const notifications = [
    { count: 3, color: "bg-red-500", icon: iconBell },
    { count: 7, color: "bg-green-500", icon: iconMail },
  ];

  const displayUser = authUser
    ? {
        name: authUser.fullName || "User",
        role: authUser.role,
        department: "Khoa Khoa học Máy tính",
        avatar: authUser.avatar ?? avatarUser,
      }
    : {
        name: "Sarah Johnson",
        role: "Sinh viên",
        department: "Khoa Khoa học Máy tính",
        avatar: avatarUser,
      };

  const logingout = () => {
    logout();
    setIsDropdownOpen(false);
    void navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //  Trường hợp profile của tutor và mentee khác nhau và thuộc 2 file khác nhau,
  //  bao giờ có trang profile riêng thì mở lại thì bạn tự adjust lại nhé
  //  const profilePath = displayUser.role === "tutor" ? "/tutor/profile" : "/mentee/profile";

  const profilePath = "..."; // Nhập đường dẫn trang profile vào (trường hhopwj chỉ có 1 profile.tsx, không phân profile theo role)

  return (
    <header className='sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        {/* Left Side: Logo & Nav */}
        <div className='flex items-center gap-10'>
          {/* Logo */}
          <Link to='/' className='flex items-center gap-3'>
            <img src={logo} alt='Logo' className='h-8 w-8 object-cover' />
            <span className='text-xl font-bold text-gray-900'>Tutor Support System</span>
          </Link>

          {/* Navigation */}
          <nav className='hidden items-center gap-2 md:flex'>
            {navigation.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right Side: Notifications & User */}
        <div className='flex items-center gap-6'>
          {/* Notifications */}
          <div className='flex items-center gap-4'>
            {notifications.map((badge, index) => (
              <button key={index} className='relative rounded-full p-1 transition-colors hover:bg-gray-100'>
                <img src={badge.icon} alt='Notification' className='h-[18px] w-[18px]' />
                {badge.count > 0 && (
                  <span
                    className={`absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full ${badge.color} text-[10px] text-white`}
                  >
                    {badge.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* User Profile */}
          <div className='relative border-l border-gray-200 pl-4' ref={dropdownRef}>
            <button
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className='flex items-center gap-3 rounded-lg p-1 transition-colors hover:bg-gray-50 focus:outline-none'
            >
              <img src={displayUser.avatar} alt='Avatar' className='h-8 w-8 rounded-full object-cover' />
              <div className='hidden text-left lg:block'>
                <div className='text-sm font-medium text-gray-900'>{displayUser.name}</div>
                <div className='text-xs text-gray-500'>{displayUser.department}</div>
              </div>
              <div className='p-1'>
                <img
                  src={iconDropdown}
                  alt='Dropdown'
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className='ring-opacity-5 absolute top-full right-0 mt-2 w-48 origin-top-right rounded-md border border-gray-100 bg-white py-1 shadow-lg ring-1 ring-black focus:outline-none'>
                {/* Item 1: Hồ sơ */}
                <Link
                  to={profilePath}
                  onClick={() => {
                    setIsDropdownOpen(false);
                  }}
                  className='flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                >
                  <User className='mr-2 h-4 w-4 text-gray-500' />
                  Hồ sơ
                </Link>

                <div className='my-1 h-px bg-gray-100' />

                {/* Item 2: Đăng xuất */}
                <button
                  onClick={logingout}
                  className='flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50'
                >
                  <LogOut className='mr-2 h-4 w-4' />
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
