import layoutData from "@/data/layout.json";

const Footer = () => {
  const { footer } = layoutData;

  return (
    <footer className='bg-gray-800 pt-12 pb-8'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col lg:flex-row gap-12'>
          {/* Column 1: Brand Info */}
          <div className='lg:w-1/3'>
            <div className='flex items-center gap-3 mb-6'>
              <img src={footer.logo} alt='Logo' className='h-10 w-auto' />
              <h2 className='text-xl font-bold text-white'>Tutor Support System</h2>
            </div>
            <p className='text-gray-400 mb-8 max-w-sm'>{footer.description}</p>

            <div className='flex items-center gap-4'>
              {footer.socialIcons.map((icon, index) => (
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
            {footer.columns.map((col, index) => (
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
          <p className='text-center text-gray-400 text-sm'>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;