import Footer from "@/components/Footer";
import HeaderProfile from "@/components/HeaderProfile";
import { Outlet } from "react-router-dom";

interface Props {
  children?: React.ReactNode;
}

const ProfileLayout = ({ children }: Props) => {
  return (
    <div>
      <HeaderProfile />
      {children}
      <Outlet />
      <Footer />
    </div>
  );
};
export default ProfileLayout;
