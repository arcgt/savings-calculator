import { Outlet } from "react-router";
import NavigationBar from "./NavigationBar";

const Layout: React.FC = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  )
};

export default Layout;