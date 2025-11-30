import { Link } from "react-router-dom";
import path from "@/constants/path";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className='flex min-h-[calc(100vh-200px)] w-full flex-col items-center justify-center overflow-hidden bg-linear-to-br from-blue-50 to-indigo-50 px-4 py-16'>
      <div className='relative text-center'>
        <h1 className='text-9xl font-extrabold tracking-widest text-blue-600'>404</h1>
        <div className='absolute top-8 left-1/2 -translate-x-1/2'>
          <div className='rotate-12 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg'>
            Page Not Found
          </div>
        </div>
        <p className='mt-8 text-lg text-gray-600'>Oops! Trang bạn tìm kiếm không tồn tại.</p>
        <p className='mt-2 text-sm text-gray-500'>Có thể URL bị sai hoặc trang đã được di chuyển.</p>
        <Link
          to={path.home}
          className='mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl focus:ring-4 focus:ring-blue-300 focus:outline-none'
        >
          <Home className='h-5 w-5' />
          <span>Về trang chủ</span>
        </Link>
      </div>
    </main>
  );
}
