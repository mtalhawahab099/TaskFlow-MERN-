import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex'>
      <Sidebar />

      <div className='flex-1 flex flex-col lg:ml-0'>
        <Header />

        <main className='flex-1 p-6'>
          <div className='max-w-7xl mx-auto'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
