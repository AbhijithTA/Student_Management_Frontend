import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ">
        <Navbar />
        <main className="p-4">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;