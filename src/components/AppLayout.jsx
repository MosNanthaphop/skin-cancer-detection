import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import Navbar from "./NavBar";
import Header from "./Header";
import Footer from "./Footer";
import { useLanguage } from "../context/LanguageContext";

const AppLayout = () => {
  const { pathname } = useLocation();
  const mainContentRef = useRef(null);
  const { t } = useLanguage();

  // 1. [แก้ไข] ตั้งค่าเริ่มต้นโดยเช็คขนาดจอ ถ้าจอใหญ่ให้กาง (true) ถ้าจอเล็กให้พับ (false)
  const [isNavbarOpen, setIsNavbarOpen] = useState(window.innerWidth > 768);

  const [activePage, setActivePage] = useState("home");
  const location = useLocation();
  const [breadcrumb, setBreadcrumb] = useState([]);

  // 2. [เพิ่มใหม่] useEffect สำหรับดักจับการย่อ/ขยายหน้าจอแบบ Real-time
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsNavbarOpen(false); // จอเล็ก (มือถือ) -> สั่งพับ
      } else {
        setIsNavbarOpen(true); // จอใหญ่ (คอม) -> สั่งกาง
      }
    };

    // แปะ Event Listener
    window.addEventListener("resize", handleResize);

    // คืนค่า Event Listener เมื่อ Component ถูกทำลาย
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ------------------------------------------------------------------
  // (โค้ดส่วนล่างนี้คือระบบเดิมของคุณทั้งหมด ไม่ได้แก้ไขอะไรครับ)
  // ------------------------------------------------------------------

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo(0, 0);
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const path = location.pathname;
    const hash = location.hash;

    const currentPage = path.substring(1).split("/")[0] || "home";
    setActivePage(currentPage);

    let newBreadcrumb = [];
    if (currentPage === "home") {
      newBreadcrumb = [t.home];
    } else if (currentPage === "upload") {
      newBreadcrumb = [t.upload];
      if (hash === "#result") {
        newBreadcrumb.push(t.result);
      }
    } else if (currentPage === "faq") {
      newBreadcrumb = [t.faq];
    } else if (currentPage === "about") {
      newBreadcrumb = [t.about];
    } else if (currentPage === "privacy") {
      newBreadcrumb = [t.privacy];
    }

    setBreadcrumb(newBreadcrumb);
  }, [location, t]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar isOpen={isNavbarOpen} activePage={activePage} />

      <main
        ref={mainContentRef}
        className="flex-grow overflow-y-auto scroll-smooth"
      >
        <header className="sticky top-0 z-50 p-4 bg-white dark:bg-gray-800 shadow flex items-center gap-4">
          <button
            onClick={() => setIsNavbarOpen(!isNavbarOpen)}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle navigation"
          >
            <HiMenu size={24} />
          </button>

          <Header breadcrumb={breadcrumb} />
        </header>

        <div className="min-h-full">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default AppLayout;
