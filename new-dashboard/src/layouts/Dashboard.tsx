// import Header from "@/components/Header";
// import ProfileMenu from "@/components/ProfileMenu";
import Sidebar from "@/components/sidebar/Sidebar";
import { Outlet } from "react-router-dom"; // Import Outlet from react-router-dom

type Props = {
  children?: React.ReactNode; // Make children optional for flexibility
}

const Dashboard = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <div className="flex-grow transition-all duration-300 ${isSidebarVisible ? 'ml-[345px]' : 'ml-0'}">
        {/* <Header><ProfileMenu /></Header> */}
        <div className="container mx-auto flex-1 p-16">
          {children || <Outlet />} {/* Render children or Outlet for nested routes */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
