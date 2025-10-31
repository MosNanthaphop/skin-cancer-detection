import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
import Navbar from "./NavBar";
import Header from "./Header";
import Footer from "./Footer";

const AppLayout = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);
  const [activePage, setActivePage] = useState("home");
  const location = useLocation(); // 2. เรียกใช้ useLocation

  // 3. [ใหม่] สร้าง State สำหรับ Breadcrumb โดยเฉพาะ
  const [breadcrumb, setBreadcrumb] = useState([]);

  // 4. [แก้ไข] แก้ไข useEffect ให้ตรวจจับ hash ด้วย
  useEffect(() => {
    const path = location.pathname; // เช่น "/upload"
    const hash = location.hash; // เช่น "#result"

    // 5. อัปเดต ActivePage (เหมือนเดิม)
    const currentPage = path.substring(1).split("/")[0] || "home";
    setActivePage(currentPage);

    // 6. [ใหม่] สร้าง Array ของ Breadcrumb ตาม Path และ Hash
    let newBreadcrumb = [];
    if (currentPage === "home") {
      newBreadcrumb = ["Home"]; // หน้า Home ไม่มี breadcrumb
    } else if (currentPage === "upload") {
      newBreadcrumb = ["Upload"]; // หน้า Upload พื้นฐาน
      if (hash === "#result") {
        newBreadcrumb.push("Result"); // ถ้ามี #result ให้เพิ่ม "Result"
      }
    } else if (currentPage === "faq") {
      newBreadcrumb = ["FAQ"];
    } else if (currentPage === "about") {
      newBreadcrumb = ["About"];
    } else if (currentPage === "privacy") {
      newBreadcrumb = ["Privacy"];
    }

    setBreadcrumb(newBreadcrumb); // 7. อัปเดต State ของ Breadcrumb
  }, [location]); // 8. สั่งให้ useEffect ทำงานใหม่ทุกครั้งที่ location เปลี่ยน

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar isOpen={isNavbarOpen} activePage={activePage} />

      <main className="flex-1 flex flex-col overflow-auto">
        <header className="sticky top-0 z-10 p-4 bg-white dark:bg-gray-800 shadow flex items-center gap-4">
          <button
            onClick={() => setIsNavbarOpen(!isNavbarOpen)}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle navigation"
          >
            <HiMenu size={24} />
          </button>
          {/* 9. [แก้ไข] ส่ง State (Array) ใหม่นี้ไปให้ Header */}
          <Header breadcrumb={breadcrumb} />
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
        {/* (ส่วน Outlet และ Footer เหมือนเดิม) */}
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
};
export default AppLayout;
