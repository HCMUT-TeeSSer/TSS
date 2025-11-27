import { Link, NavLink } from "react-router-dom";
// Import ảnh
import logo from "@/assets/images/applogo.png";
import iconBell from "@/assets/images/vector11.png";
import iconMail from "@/assets/images/vector12.png";
import avatarUser from "@/assets/images/img-3.jpg";
import iconDropdown from "@/assets/images/vector13.png";

const Header = () => {
  // Data cứng ngay trong component
  const navigation = [
    { label: "Trang chủ", path: "/", active: true },
    { label: "Chương trình", path: "/programs", active: false },
    { label: "Chương trình của tôi", path: "/my-programs", active: false },
    { label: "Tài liệu", path: "/documents", active: false },
  ];

  const notifications = [
    { count: 3, color: "bg-red-500", icon: iconBell },
    { count: 7, color: "bg-green-500", icon: iconMail },
  ];

  const user = {
    name: "Sarah Johnson",
    role: "Sinh viên",
    department: "Khoa Khoa học Máy tính",
    avatar: avatarUser,
  };

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
          <nav className='hidden md:flex items-center gap-2'>
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
          <div className='flex items-center gap-3 border-l border-gray-200 pl-4'>
            <img src={user.avatar} alt='Avatar' className='h-8 w-8 rounded-full object-cover' />
            <div className='hidden lg:block'>
              <div className='text-sm font-medium text-gray-900'>{user.name}</div>
              <div className='text-xs text-gray-500'>{user.department}</div>
            </div>
            <button className='p-1'>
              <img src={iconDropdown} alt='Dropdown' className='h-3.5 w-3.5' />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;