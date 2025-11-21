import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

interface Props {
  children?: React.ReactNode;
}

const ProgramLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
      <Outlet />
      <Footer />
    </div>
  );
};
export default ProgramLayout;
