import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet /> 
      </main>
    </div>
  );
};

export default DashboardLayout;
