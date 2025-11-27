// Import ảnh
import logoBK from "@/assets/images/logoBK1.png";
import social1 from "@/assets/images/social1.png";
import social2 from "@/assets/images/social2.png";
import social3 from "@/assets/images/social3.png";
import social4 from "@/assets/images/social4.png";

const Footer = () => {
  const socialIcons = [social1, social2, social3, social4];

  const footerColumns = [
    {
      title: "Dành cho Sinh viên",
      links: [
        { label: "Tìm gia sư", path: "/tutors" },
        { label: "Danh mục môn học", "path": "/subjects" },
        { label: "Lịch hẹn với gia sư", "path": "/schedule" },
        { label: "Câu chuyện thành công", "path": "/stories" },
        { label: "Tài liệu học tập", "path": "/resources" }
      ]
    },
    {
      title: "Dành cho Gia sư",
      links: [
        { label: "Trở thành gia sư", "path": "/become-tutor" },
        { label: "Bảng điều khiển", "path": "/dashboard" },
        { label: "Tài nguyên", "path": "/tutor-resources" },
        { label: "Cộng đồng", "path": "/community" },
        { label: "Hỗ trợ", "path": "/support" }
      ]
    },
    {
      title: "Hỗ trợ",
      links: [
        { label: "Trung tâm trợ giúp", "path": "/help" },
        { label: "Liên hệ", "path": "/contact" },
        { label: "Chính sách bảo mật", "path": "/privacy" },
        { label: "Điều khoản dịch vụ", "path": "/terms" },
        { label: "An toàn", "path": "/safety" }
      ]
    }
  ];

  return (
    <footer className='bg-gray-800 pt-12 pb-8'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col lg:flex-row gap-12'>
          {/* Column 1: Brand Info */}
          <div className='lg:w-1/3'>
            <div className='flex items-center gap-3 mb-6'>
              <img src={logoBK} alt='Logo' className='h-10 w-auto' />
              <h2 className='text-xl font-bold text-white'>Tutor Support System</h2>
            </div>
            <p className='text-gray-400 mb-8 max-w-sm'>
              Kết nối với các gia sư chuyên nghiệp và tăng tốc hành trình học tập của bạn.
            </p>
            
            {/* Social Icons */}
            <div className='flex items-center gap-4'>
              {socialIcons.map((icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="transition-opacity hover:opacity-80"
                >
                  <img 
                    src={icon} 
                    alt={`Social icon ${index + 1}`} 
                    className='h-6 w-6 object-contain' 
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className='lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-8'>
            {footerColumns.map((col, index) => (
              <div key={index}>
                <h3 className='text-base font-semibold text-white mb-4'>{col.title}</h3>
                <ul className='space-y-3'>
                  {col.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.path} className='text-gray-400 hover:text-white transition-colors text-sm'>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className='mt-12 pt-8 border-t border-gray-700'>
          <p className='text-center text-gray-400 text-sm'>
            © 2025 Tutor Support System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;