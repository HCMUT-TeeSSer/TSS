// layouts/student/MyProgramLayout/MyProgramLayout.tsx
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MyProgramLayout = () => {
  return (
    <div className='flex min-h-screen flex-col bg-gray-50'>
      <Header />

      <main className='flex-1'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MyProgramLayout;
