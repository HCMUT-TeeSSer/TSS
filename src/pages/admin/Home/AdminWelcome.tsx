import BgImage from "./bg.jpg";

export default function AdminWelcome() {
  return (
    <div
      className='relative h-full w-full'
      style={{
        backgroundImage: `url(${BgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay mờ nền */}
      <div className='absolute inset-0 bg-black/20'></div>

      {/* Chữ ở góc trên trái */}
      <div className='absolute top-8 left-8 z-10'>
        <h1
          className='relative text-5xl font-extrabold text-yellow-400'
          style={{
            textShadow: `
              0 0 6px rgba(255,255,255,0.6),
              0 0 12px rgba(255,255,255,0.4),
              0 0 18px rgba(255,255,255,0.2)
            `,
          }}
        >
          Chào mừng Admin!
        </h1>

        <p className='mt-2 max-w-xs text-lg text-gray-100'>
          Đây là trang tổng quan quản lý hệ thống. Hãy chọn một mục từ menu bên trái để bắt đầu.
        </p>
      </div>
    </div>
  );
}
