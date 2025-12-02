import { useState, useRef, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import path from "@/constants/path";
import Logo from "./../logo.png";
import { ChevronDown, BookOpen, Mail, Bell, Users, GraduationCap, LogOut, User, Database } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { NotificationBox, ChatBox } from "@/components/ChatBox/Chat";

interface HeaderNotificationsProps {
  bellCount?: number;
  mailCount?: number;
  onOpenChat: () => void;
  onOpenNotification: () => void;
}

function HeaderNotifications({
  bellCount = 0,
  mailCount = 0,
  onOpenChat,
  onOpenNotification,
}: HeaderNotificationsProps) {
  return (
    <div className='flex items-center gap-3'>
      {/* Notification */}
      <div className='relative cursor-pointer' onClick={onOpenNotification}>
        <Bell className='h-5 w-5 text-gray-400' />
        {bellCount > 0 && (
          <span className='absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-red-500 text-xs text-white'>
            {bellCount}
          </span>
        )}
      </div>

      {/* Chat */}
      <div className='relative cursor-pointer' onClick={onOpenChat}>
        <Mail className='h-5 w-5 text-gray-400' />
        {mailCount > 0 && (
          <span className='absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-blue-500 text-xs text-white'>
            {mailCount}
          </span>
        )}
      </div>
    </div>
  );
}

// User dropdown component
function AdminUserMenu() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    void navigate(path.login, { replace: true });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='relative' ref={dropdownRef}>
      <div
        className='flex cursor-pointer items-center gap-3'
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200'>
          <img
            src={user?.avatar ?? "/default-avatar.png"}
            alt={user?.username ?? "User"}
            className='h-10 w-10 rounded-full object-cover'
          />
        </div>
        <div className='flex max-w-40 items-center gap-2'>
          <div className='truncate text-left'>
            <div className='truncate font-medium'>{user?.fullName ?? "User"}</div>
            <div className='truncate text-xs text-gray-500'>Phòng Đào tạo</div>
          </div>
          <ChevronDown className='h-4 w-4 shrink-0 text-gray-500' />
        </div>
      </div>

      {open && (
        <div className='absolute right-0 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg'>
          <button
            className='flex w-full items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100'
            onClick={() => {
              setOpen(false);
              void navigate(path.adminProfile);
            }}
          >
            <User className='h-4 w-4' /> Hồ sơ
          </button>
          <button
            className='flex w-full items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100'
            onClick={handleLogout}
          >
            <LogOut className='h-4 w-4' /> Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}

export default function AdminLayout() {
  const { user } = useAuth();
  const [chatOpen, setChatOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  if (!user) return null;

  return (
    <div className='flex min-h-screen flex-col'>
      <header className='flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4'>
        <div className='flex items-center gap-3'>
          <NavLink to={path.admin} className='flex items-center gap-3'>
            <div className='flex h-16 w-16 items-center justify-center overflow-hidden rounded-md bg-white'>
              <img src={Logo} alt='Logo trường' className='h-full w-full object-contain' />
            </div>
            <div className='text-lg font-semibold'>Tutor Support System</div>
          </NavLink>
        </div>

        <div className='ml-auto flex items-center gap-6'>
          <HeaderNotifications
            bellCount={0}
            mailCount={0}
            onOpenChat={() => {
              setChatOpen(true);
            }}
            onOpenNotification={() => {
              setNotificationOpen(true);
            }}
          />
          <AdminUserMenu />
        </div>
      </header>
      {/* Chat & Notification */}
      {chatOpen && (
        <ChatBox
          currentUser={user}
          onClose={() => {
            setChatOpen(false);
          }}
        />
      )}
      {notificationOpen && (
        <NotificationBox
          onClose={() => {
            setNotificationOpen(false);
          }}
        />
      )}

      {/* BODY */}
      <div className='flex flex-1'>
        {/* SIDEBAR */}
        <aside className='flex w-64 flex-col border-r border-gray-200 bg-white p-6'>
          <nav className='mt-8 flex flex-col gap-2'>
            <NavLink
              to={path.adminPrograms}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-2 ${isActive ? "bg-sky-600 text-white" : "hover:bg-slate-100"}`
              }
            >
              <BookOpen className='h-5 w-5 text-slate-500' />
              <span>Quản lí chương trình</span>
            </NavLink>

            <NavLink
              to={path.adminTutors}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-2 ${isActive ? "bg-sky-600 text-white" : "hover:bg-slate-100"}`
              }
            >
              <Users className='h-5 w-5 text-slate-500' />
              <span>Quản lí tutor</span>
            </NavLink>

            <NavLink
              to={path.adminMentees}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-2 ${isActive ? "bg-sky-600 text-white" : "hover:bg-slate-100"}`
              }
            >
              <GraduationCap className='h-5 w-5 text-slate-500' />
              <span>Quản lí sinh viên</span>
            </NavLink>

            <NavLink
              to={path.adminData}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-2 ${isActive ? "bg-sky-600 text-white" : "hover:bg-slate-100"}`
              }
            >
              <Database className='h-5 w-5 text-slate-500' />
              <span>Dữ liệu & Yêu cầu</span>
            </NavLink>
          </nav>

          <div className='mt-auto pt-6 text-xs text-gray-400'>© 2025 Tutor Support System</div>
        </aside>

        {/* PAGE CONTENT */}
        <main className='flex-1 bg-gray-50 p-8'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
