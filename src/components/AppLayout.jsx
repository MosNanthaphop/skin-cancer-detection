import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
import Navbar from "./NavBar";
import Header from "./Header";
import Footer from "./Footer";

const pageBreadcrumbs = {
  home: ["Home"],
  upload: ["Upload"],
  faq: ["FAQ"],
  about: ["About"],
  privacy: ["Privacy"],
};

const AppLayout = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);
  const [activePage, setActivePage] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const currentPage = path.substring(1).split("/")[0] || "home"; // ปรับปรุงเล็กน้อยเผื่อมี path ซ้อน
    setActivePage(currentPage);
  }, [location]);

  const currentBreadcrumb = pageBreadcrumbs[activePage] || [];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar isOpen={isNavbarOpen} activePage={activePage} />
      <main className="flex-1 flex flex-col overflow-auto">
        <header className="sticky top-0 z-10 p-4 bg-white dark:bg-gray-800 shadow flex items-center gap-4">
          <button
            onClick={() => setIsNavbarOpen(!isNavbarOpen)}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle navigation"
          >
            <HiMenu size={24} />
          </button>
          <Header breadcrumb={currentBreadcrumb} />
          <div className="relative ml-auto">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-full w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-400 text-gray-800 dark:text-gray-200"
            />
            <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              <GoSearch size={18} />
            </div>
          </div>
        </header>

        <div className="p-0 flex-1">
          {/* นี่คือหัวใจหลัก! React Router จะนำเนื้อหาของ
            HomePage, UploadPage, ฯลฯ มาใส่ตรงนี้
          */}
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
};
export default AppLayout;
