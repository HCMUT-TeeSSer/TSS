import { Link, NavLink } from "react-router-dom";
import layoutData from "@/data/layout.json";

const Header = () => {
  const { header } = layoutData;

  return (
    <header className='sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        {/* Left Side: Logo & Nav */}
        <div className='flex items-center gap-10'>
          {/* Logo */}
          <Link to='/' className='flex items-center gap-3'>
            <img src={header.logo} alt='Logo' className='h-8 w-8 object-cover' />
            <span className='font-bold text-xl text-gray-900'>{header.title}</span>
          </Link>

          {/* Navigation */}
          <nav className='hidden md:flex items-center gap-2'>
            {header.navigation.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
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
            {header.notifications.map((badge, index) => (
              <button key={index} className='relative p-1 hover:bg-gray-100 rounded-full transition-colors'>
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
          <div className='flex items-center gap-3 pl-4 border-l border-gray-200'>
            <img src={header.user.avatar} alt='Avatar' className='h-8 w-8 rounded-full object-cover' />
            <div className='hidden lg:block'>
              <div className='text-sm font-medium text-gray-900'>{header.user.name}</div>
              <div className='text-xs text-gray-500'>{header.user.department}</div>
            </div>
            <button className='p-1'>
              <img src={header.user.dropdownIcon} alt='Dropdown' className='h-3.5 w-3.5' />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;