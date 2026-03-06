// src/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

// Icons
import { TiHome } from "react-icons/ti";
import { ImUpload } from "react-icons/im";
import { MdQuestionAnswer, MdPrivacyTip, MdLanguage } from "react-icons/md";
import { IoMdInformationCircle } from "react-icons/io";
import { IoMoon, IoSunny } from "react-icons/io5";

const Navbar = ({ isOpen = true }) => {
  const { darkMode, setDarkMode, toggleDarkMode } = useTheme();
  const { language, changeLanguage, t } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  // ใช้ location เพื่อหาว่าปัจจุบันอยู่หน้าไหนอัตโนมัติ
  const location = useLocation();
  const dropdownRef = useRef(null);

  // ข้อมูลเมนู (Config) - แก้ไขง่ายในที่เดียว
  const menuItems = [
    { path: "/", name: t.home, icon: TiHome },
    { path: "/upload", name: t.upload, icon: ImUpload },
    { path: "/faq", name: t.faq, icon: MdQuestionAnswer },
    { path: "/about", name: t.about, icon: IoMdInformationCircle },
    { path: "/privacy", name: t.privacy, icon: MdPrivacyTip },
  ];

  // Helper function เช็คว่าลิงก์นี้ Active อยู่ไหม
  const isActive = (path) => {
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname.startsWith(path);
  };

  // Helper แสดงชื่อภาษา
  const getDisplayLanguage = () => {
    return language === "th" ? "ไทย" : "English";
  };

  // ปิด Dropdown เมื่อคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLanguageMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setShowLanguageMenu(false);
  };

  return (
    <aside
      className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col 
                  transition-all duration-300 ease-in-out sticky top-0 h-screen z-50 overflow-hidden
                  ${isOpen ? "w-64" : "w-20"}`}
    >
      {/* --- 1. Profile / Logo Section --- */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center flex-shrink-0">
        <div
          className={`rounded-full overflow-hidden border-2 border-gray-100 dark:border-gray-600 bg-white shadow-sm transition-all duration-300
                      ${isOpen ? "w-24 h-24 mb-3" : "w-10 h-10 mb-0"}`}
        >
          <a href="/">
            <img
              src="/Logo3.png"
              alt="SkinDee Logo"
              className="w-full h-full object-cover"
            />
          </a>
        </div>

        {/* ชื่อแอป */}
        <div
          className={`overflow-hidden transition-all duration-300 ${isOpen ? "h-auto opacity-100" : "h-0 opacity-0"}`}
        >
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            SkinDee
          </h2>
        </div>
      </div>

      {/* --- 2. Navigation Menu (ใช้ Loop แบบใหม่) --- */}
      <nav className="flex-1 py-4 px-3 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`relative flex items-center gap-3 py-3 px-3 rounded-xl transition-all duration-200 group
              ${
                isActive(item.path)
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-semibold shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100"
              }
              ${!isOpen && "justify-center"}
            `}
          >
            {/* Icon */}
            <item.icon
              size={22}
              className={`flex-shrink-0 ${isActive(item.path) ? "animate-pulse-slow" : ""}`}
            />

            {/* Text */}
            <span
              className={`whitespace-nowrap transition-all duration-300 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 absolute w-0 overflow-hidden"}`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </nav>

      {/* --- 3. Settings Section (คงไว้เหมือนเดิมตามคำขอ) --- */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white dark:bg-gray-800">
        <div
          className={`flex items-center gap-4 ${isOpen ? "justify-between" : "flex-col"}`}
        >
          {/* Language Dropdown (แบบเดิม) */}
          <div
            className={`relative ${isOpen ? "flex-1" : "w-full"}`}
            ref={dropdownRef}
          >
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className={`flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors w-full
                        ${!isOpen && "justify-center"}`}
            >
              <span className="text-lg">
                <MdLanguage className="mb-0.5" />
              </span>
              {isOpen && (
                <>
                  <span className="text-sm">{getDisplayLanguage()}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${showLanguageMenu ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </>
              )}
            </button>

            {/* Language Menu */}
            {showLanguageMenu && (
              <div
                className={`absolute w-40 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 overflow-hidden z-[60]
                  ${isOpen ? "bottom-full left-0 mb-2" : "bottom-0 left-full ml-2"}
                `}
              >
                <button
                  onClick={() => handleLanguageChange("th")}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors
                    ${language === "th" ? "text-blue-600 font-bold bg-blue-50 dark:bg-gray-600 dark:text-blue-300" : "text-gray-700 dark:text-gray-200"}
                  `}
                >
                  ไทย
                </button>
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors
                    ${language === "en" ? "text-blue-600 font-bold bg-blue-50 dark:bg-gray-600 dark:text-blue-300" : "text-gray-700 dark:text-gray-200"}
                  `}
                >
                  English
                </button>
              </div>
            )}
          </div>

          {/* Theme Toggle Icons (แบบเดิม 3 ปุ่ม) */}
          <div className={`flex items-center gap-2 ${!isOpen && "flex-col"}`}>
            <button
              onClick={() => setDarkMode(false)}
              className={`p-1.5 rounded-lg transition-colors ${!darkMode ? "text-yellow-500" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"}`}
              title="Light Mode"
            >
              <IoSunny size={20} />
            </button>

            {isOpen && (
              <button
                onClick={toggleDarkMode}
                className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
                style={{ backgroundColor: darkMode ? "#3b82f6" : "#d1d5db" }}
                title="Toggle Theme"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            )}

            <button
              onClick={() => setDarkMode(true)}
              className={`p-1.5 rounded-lg transition-colors ${darkMode ? "text-blue-400" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"}`}
              title="Dark Mode"
            >
              <IoMoon size={20} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Navbar;
