import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Lock, LogIn, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import logoBK from "@/assets/images/logoBK1.png";
import appLogo from "@/assets/images/applogo.png";
import bgImage from "@/assets/images/BKlogin.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login: authLogin, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authLogin(username, password);

      if (result.success) {
        // Redirect based on role
        const userRole = result.user?.role ?? user?.role;
        if (userRole === "admin") {
          void navigate("/admin");
        } else if (userRole === "tutor") {
          void navigate("/tutor");
        } else if (userRole === "student") {
          void navigate("/mentee");
        } else {
          void navigate("/");
        }
      } else {
        setError(result.error ?? "Đăng nhập thất bại");
      }
    } catch {
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { text: "Hỗ trợ gia sư 24/7", icon: <CheckCircle className='h-4 w-4' /> },
    { text: "Tài nguyên học tập", icon: <CheckCircle className='h-4 w-4' /> },
    { text: "Theo dõi tiến độ", icon: <CheckCircle className='h-4 w-4' /> },
    { text: "Tài liệu học tập", icon: <CheckCircle className='h-4 w-4' /> },
  ];

  return (
    <div className='flex min-h-screen'>
      {/* Left Side - Welcome Section with Background Image */}
      <div className='relative hidden w-full bg-linear-to-br from-blue-600 to-purple-700 lg:block lg:w-1/2'>
        {/* Background Image with Overlay */}
        <div className='absolute inset-0'>
          <img src={bgImage} alt='Background' className='h-full w-full object-cover opacity-60' />
          <div className='absolute inset-0 bg-linear-to-br' />
        </div>

        {/* Content */}
        <div className='relative flex h-full flex-col items-center justify-center px-12'>
          <div className='max-w-md text-center'>
            {/* Logo Icon */}
            <div className='mb-6 flex justify-center'>
              <div className='flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm'>
                <LogIn className='h-8 w-8 text-white' />
              </div>
            </div>

            {/* Welcome Text */}
            <h1 className='mb-4 text-4xl font-bold text-white'>Chào Mừng Trở Lại</h1>
            <p className='mb-12 text-xl text-white/90'>Truy cập cổng hỗ trợ học tập của bạn</p>

            {/* Features List */}
            <div className='space-y-4 text-left'>
              {features.map((feature, index) => (
                <div key={index} className='flex items-center gap-3 text-white'>
                  <div className='flex h-6 w-6 items-center justify-center rounded-full bg-white/20'>
                    {feature.icon}
                  </div>
                  <span className='text-base'>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className='flex w-full items-center justify-center bg-white px-6 py-12 lg:w-1/2 lg:px-8'>
        <div className='w-full max-w-md'>
          {/* Logo and Title */}
          <div className='mb-12 text-center'>
            <div className='mb-6 flex justify-center'>
              <img src={appLogo} alt='Tutor Support System' className='h-16 w-16 rounded-full object-cover' />
            </div>
            <h2 className='mb-2 text-xl font-semibold text-gray-900'>Tutor Support System</h2>
            <p className='text-sm text-gray-600'>Đăng nhập vào tài khoản của bạn</p>
          </div>

          {/* Login Form */}
          <form
            onSubmit={(e) => {
              void handleSubmit(e);
            }}
            className='space-y-6'
          >
            {/* Username Field */}
            <div>
              <label htmlFor='username' className='mb-2 block text-sm font-medium text-gray-700'>
                Tên đăng nhập
              </label>
              <div className='relative'>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                  <User className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  id='username'
                  type='text'
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  className='block w-full rounded-lg border-0 border-b-2 border-gray-200 py-3 pr-3 pl-10 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:ring-0 focus:outline-none'
                  placeholder='Nhập tên đăng nhập của bạn'
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor='password' className='mb-2 block text-sm font-medium text-gray-700'>
                Mật khẩu
              </label>
              <div className='relative'>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                  <Lock className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  id='password'
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className='block w-full rounded-lg border-0 border-b-2 border-gray-200 py-3 pr-10 pl-10 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:ring-0 focus:outline-none'
                  placeholder='Nhập mật khẩu của bạn'
                  required
                />
                <button
                  type='button'
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className='absolute inset-y-0 right-0 flex items-center pr-3'
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? (
                    <EyeOff className='h-5 w-5 text-gray-400 hover:text-gray-600' />
                  ) : (
                    <Eye className='h-5 w-5 text-gray-400 hover:text-gray-600' />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className='flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600'>
                <AlertCircle className='h-5 w-5 shrink-0' />
                <span>{error}</span>
              </div>
            )}

            {/* Login Button */}
            <button
              type='submit'
              disabled={loading}
              className='flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
            >
              <LogIn className='h-5 w-5' />
              {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
            </button>

            {/* Help Section */}
            <div className='space-y-6 pt-6'>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-300' />
                </div>
                <div className='relative flex justify-center'>
                  <span className='bg-white px-4 text-sm text-gray-500'>Cần hỗ trợ?</span>
                </div>
              </div>

              <div className='text-center'>
                <Link
                  to='/contact'
                  className='text-base font-medium text-blue-600 transition-colors hover:text-blue-700'
                >
                  Liên hệ hỗ trợ kỹ thuật
                </Link>
              </div>
            </div>
          </form>

          {/* Mobile Logo - Show only on mobile */}
          <div className='mt-8 flex items-center justify-center gap-3 lg:hidden'>
            <img src={logoBK} alt='Logo BK' className='h-10 w-auto' />
            <span className='text-sm font-semibold text-gray-600'>Tutor Support System</span>
          </div>
        </div>
      </div>
    </div>
  );
}
