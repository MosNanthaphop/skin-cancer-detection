import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import Navbar from "./NavBar";
import Header from "./Header";
import Footer from "./Footer";
import { useLanguage } from "../context/LanguageContext";

const AppLayout = () => {
  const { t } = useLanguage();
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
      newBreadcrumb = [t.home]; // หน้า Home ไม่มี breadcrumb
    } else if (currentPage === "upload") {
      newBreadcrumb = [t.upload]; // หน้า Upload พื้นฐาน
      if (hash === "#result") {
        newBreadcrumb.push(t.result); // ถ้ามี #result ให้เพิ่ม "Result"
      }
    } else if (currentPage === "faq") {
      newBreadcrumb = [t.faq];
    } else if (currentPage === "about") {
      newBreadcrumb = [t.about];
    } else if (currentPage === "privacy") {
      newBreadcrumb = [t.privacy];
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
