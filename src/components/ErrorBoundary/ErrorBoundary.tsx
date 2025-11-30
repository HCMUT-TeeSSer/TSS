import { Component, type ErrorInfo, type ReactNode } from "react";
import path from "@/constants/path";
import { Home, AlertTriangle } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error: ", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <main className='flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-linear-to-br from-red-50 to-orange-50 px-4 py-16'>
          <div className='relative text-center'>
            <div className='mb-4 flex justify-center'>
              <AlertTriangle className='h-20 w-20 text-red-500' />
            </div>
            <h1 className='text-9xl font-extrabold tracking-widest text-red-600'>500</h1>
            <div className='absolute top-8 left-1/2 -translate-x-1/2'>
              <div className='rotate-12 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg'>
                Internal Error
              </div>
            </div>
            <p className='mt-8 text-lg text-gray-600'>Oops! Đã xảy ra lỗi không mong muốn.</p>
            <p className='mt-2 text-sm text-gray-500'>Chúng tôi đã ghi nhận sự cố và sẽ khắc phục sớm nhất có thể.</p>
            <a
              href={path.home}
              className='mt-8 inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-xl focus:ring-4 focus:ring-red-300 focus:outline-none'
            >
              <Home className='h-5 w-5' />
              <span>Về trang chủ</span>
            </a>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}
