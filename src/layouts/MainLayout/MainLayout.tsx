import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

interface Props {
  children?: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
      <Outlet />
      <Footer />
    </div>
  );
};
export default MainLayout;
