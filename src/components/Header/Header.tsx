import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import path from "@/constants/path";
// Import ảnh
import logo from "@/assets/images/applogo.png";
import iconBell from "@/assets/images/vector11.png";
import iconMail from "@/assets/images/vector12.png";
import avatarUser from "@/assets/images/img-3.jpg";
import iconDropdown from "@/assets/images/vector13.png";

import { getMessages } from "@/utils/chat";
import { NotificationBox, ChatBox } from "../ChatBox/Chat";
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user: authUser } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showChat, setShowChat] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [totalUnread, setTotalUnread] = useState(0);

  useEffect(() => {
    const updateUnread = () => {
      if (!authUser) return;

      const allMessages = getMessages();
      const unreadCount = allMessages.filter((msg) => msg.to.id === authUser.id && !msg.read).length;

      setTotalUnread(unreadCount);
    };
    updateUnread();
    const interval = setInterval(updateUnread, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [authUser]);

  const navigation = [
    { label: "Trang chủ", path: path.home },
    ...(authUser?.role !== "tutor"
      ? [
          {
            label: "Chương trình",
            path: path.studentPrograms,
          },
        ]
      : []),
    {
      label: "Chương trình của tôi",
      path: authUser?.role === "tutor" ? path.tutorProgramList : path.studentProgramList,
    },
    { label: "Tài liệu", path: path.library },
  ];

  const notifications = [{ count: 0, color: "bg-red-500", icon: iconBell }];

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
    void navigate(path.login);
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

  const profilePath = displayUser.role === "tutor" ? path.tutorProfile : path.studentProfile;

  const isPathActive = (itemPath: string, itemLabel: string) => {
    const currentPath = location.pathname;
    if (itemPath === path.home) {
      return currentPath === path.home;
    }
    if (itemLabel === "Chương trình") {
      return (
        currentPath === path.studentPrograms ||
        currentPath === path.tutorPrograms ||
        /\/(student|tutor)\/programs\/\d+$/.test(currentPath)
      );
    }

    if (itemLabel === "Chương trình của tôi") {
      return (
        currentPath === path.studentProgramList ||
        currentPath.startsWith(path.studentMyProgram) ||
        currentPath.startsWith(path.tutorMyProgram) ||
        currentPath.includes("/my-program/") ||
        currentPath.includes("/program-list") ||
        currentPath.includes("/sessions/") ||
        currentPath.includes("/program-detail/") ||
        /\/(student|tutor)\/programs\/\d+\/competencies/.test(currentPath)
      );
    }
    if (itemLabel === "Tài liệu") {
      return currentPath === path.library || currentPath.startsWith(path.library);
    }
    return currentPath.startsWith(itemPath);
  };

  return (
    <header className='sticky top-0 z-[100] w-full border-b border-gray-200 bg-white shadow-sm'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        {/* Left Side: Logo & Nav */}
        <div className='flex items-center gap-10'>
          {/* Logo */}
          <Link to={path.home} className='flex items-center gap-3'>
            <img src={logo} alt='Logo' className='h-8 w-8 object-cover' />
            <span className='text-xl font-bold text-gray-900'>Tutor Support System</span>
          </Link>

          {/* Navigation */}
          <nav className='hidden items-center gap-2 md:flex'>
            {navigation.map((item, index) => {
              const isActive = isPathActive(item.path, item.label);

              return (
                <NavLink
                  key={index}
                  to={item.path}
                  className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Right Side: Notifications & User */}
        <div className='flex items-center gap-6'>
          {/* Notifications */}
          <div className='flex items-center gap-4'>
            {/* Bell: Thông báo */}
            <button
              onClick={() => {
                setShowNotifications((prev) => !prev);
                setShowChat(false);
              }}
              className='relative rounded-full p-1 transition-colors hover:bg-gray-100'
            >
              <img src={iconBell} alt='Notification' className='h-[18px] w-[18px]' />
              {notifications[0].count > 0 && (
                <span
                  className={`absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full ${notifications[0].color} text-[10px] text-white`}
                >
                  {notifications[0].count}
                </span>
              )}
            </button>

            {/* Mail: Chat */}
            <button
              onClick={() => {
                setShowChat((prev) => !prev);
                setShowNotifications(false);
              }}
              className='relative rounded-full p-1 transition-colors hover:bg-gray-100'
            >
              <img src={iconMail} alt='Chat' className='h-[18px] w-[18px]' />
              {totalUnread > 0 && (
                <span className='absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] text-white'>
                  {totalUnread}
                </span>
              )}
            </button>
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
                {/* Item 1: Profile */}
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

                {/* Item 2: Logout */}
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
      {showNotifications && (
        <NotificationBox
          onClose={() => {
            setShowNotifications(false);
          }}
        />
      )}
      {showChat && authUser && (
        <ChatBox
          currentUser={authUser}
          onClose={() => {
            setShowChat(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;
