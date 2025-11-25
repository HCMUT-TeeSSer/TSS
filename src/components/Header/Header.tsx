import React from "react";
//import { Link } from "react-router-dom";
//import vector12 from "./vector-12.svg";
//import vector13 from "./vector-13.svg";

const navigationItems = [
  { label: "Trang chủ", href: "/trang-chu", active: true },
  { label: "Chương trình", href: "#", active: false },
  { label: "Chương trình của tôi", href: "#", active: false },
  { label: "Tài liệu", href: "#", active: false },
];

const notificationBadges = [
  { count: 3, color: "bg-red-500", icon: "/vector-11.svg" },
  { count: 7, color: "bg-green-500", icon: vector12 },
];

export const HeaderSection = (): JSX.Element => {
  return (
    <header className="absolute top-0 left-0 w-[1440px] h-[65px] flex bg-white border-b [border-bottom-style:solid] border shadow-[0px_1px_2px_#0000000d]">
      <div className="w-[1280px] ml-20 flex border-0 border-none">
        <div className="w-[1216px] h-16 ml-8 flex gap-[75.4px] border-0 border-none">
          <div className="mt-3 w-[834.61px] flex gap-10 border-0 border-none">
            <Link
              className="w-[265.86px] h-10 flex gap-5 border-0 border-none"
              to="/trang-chu"
              aria-label="Tutor Support System Home"
            >
              <div
                className="mt-1 w-8 h-8 aspect-[1] bg-[url(/applogo.png)] bg-cover bg-[50%_50%]"
                role="img"
                aria-label="Tutor Support System Logo"
              />

              <div className="mt-1.5 w-[216px] h-7 [font-family:'Inter-Bold',Helvetica] font-bold text-gray-900 text-xl tracking-[0] leading-7 whitespace-nowrap">
                Tutor Support System
              </div>
            </Link>

            <nav
              className="mt-0.5 w-[528.75px] flex gap-8 border-0 border-none"
              aria-label="Main navigation"
            >
              {navigationItems.map((item, index) =>
                item.active ? (
                  <Link
                    key={index}
                    className="w-[91.41px] h-9 flex bg-blue-50 rounded-md border-0 border-none"
                    to={item.href}
                    aria-current="page"
                  >
                    <div className="mt-[9px] w-[92px] h-5 [font-family:'Inter-Medium',Helvetica] font-medium text-blue-600 text-sm text-center tracking-[0] leading-[normal]">
                      {item.label}
                    </div>
                  </Link>
                ) : (
                  <a
                    key={index}
                    className="w-auto h-9 flex rounded-md border-0 border-none"
                    href={item.href}
                  >
                    <div className="mt-[9px] h-5 [font-family:'Inter-Medium',Helvetica] font-medium text-gray-500 text-sm text-center tracking-[0] leading-[normal] whitespace-nowrap px-2">
                      {item.label}
                    </div>
                  </a>
                ),
              )}
            </nav>
          </div>

          <div className="mt-2.5 w-[305.98px] flex gap-4 border-0 border-none">
            {notificationBadges.map((badge, index) => (
              <button
                key={index}
                className="all-[unset] box-border w-[31.75px] h-11 relative border-0 border-none"
                aria-label={`Notifications: ${badge.count} unread`}
              >
                <div className="absolute top-[11px] left-2 w-4 h-[21px] flex border-0 border-none">
                  <div className="mt-[1.2px] w-[15.75px] h-[18px] flex relative items-center justify-center">
                    {index === 0 ? (
                      <div className="w-[15.75px] h-[18px] bg-[url(/vector-11.svg)] bg-[100%_100%] relative border-0 border-none" />
                    ) : (
                      <div className="w-[18px] h-[18px] relative border-0 border-none">
                        <img
                          className="absolute w-full h-[75.00%] top-[12.50%] left-0"
                          alt="Notification icon"
                          src={badge.icon}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={`absolute -top-1 ${index === 0 ? "left-5" : "left-[22px]"} w-4 h-4 flex ${badge.color} rounded-full border-0 border-none`}
                >
                  <div className="w-[13px] h-4 ml-[2.2px] [font-family:'Inter-Regular',Helvetica] font-normal text-xs text-white text-center tracking-[0] leading-[normal]">
                    {badge.count}
                  </div>
                </div>
              </button>
            ))}

            <div className="mt-1 w-[208.23px] flex gap-3 border-0 border-none">
              <div
                className="mt-0.5 w-8 h-8 rounded-full border-0 border-none bg-[url(/img-3.png)] bg-cover bg-[50%_50%]"
                role="img"
                aria-label="Sarah Johnson profile picture"
              />

              <div className="w-[138.23px] h-9 flex flex-col border-0 border-none">
                <div className="w-[138.23px] flex border-0 border-none">
                  <div className="mt-px w-[139px] h-5 [font-family:'Inter-Medium',Helvetica] font-medium text-sm leading-[normal] text-gray-900 tracking-[0]">
                    Sarah Johnson
                  </div>
                </div>

                <div className="w-[138.23px] flex border-0 border-none">
                  <p className="w-[139px] h-4 [font-family:'Inter-Regular',Helvetica] font-normal text-gray-500 text-xs tracking-[0] leading-[normal]">
                    Khoa Khoa học Máy tính
                  </p>
                </div>
              </div>

              <button
                className="mt-2 w-3.5 h-5 flex border-0 border-none"
                aria-label="User menu"
              >
                <div className="mt-[2.8px] w-3.5 h-3.5 flex relative items-center justify-center">
                  <div className="w-3.5 h-3.5 relative border-0 border-none">
                    <img
                      className="absolute w-[87.53%] h-[50.01%] top-[31.24%] left-[6.24%]"
                      alt="Dropdown arrow"
                      src={vector13}
                    />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
