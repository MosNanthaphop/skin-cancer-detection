import { TiHome } from "react-icons/ti";
import { ImUpload } from "react-icons/im";
import { MdQuestionAnswer } from "react-icons/md";
import { IoMdInformationCircle } from "react-icons/io";
import { MdPrivacyTip } from "react-icons/md";
import { MdLanguage } from "react-icons/md";
import { IoMoon, IoSunny } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const Navbar = ({ activePage = "upload", isOpen = true }) => {
  const { darkMode, setDarkMode, toggleDarkMode } = useTheme();
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "English";
  });
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  // Change language
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    setShowLanguageMenu(false);
  };

  // ปิด dropdown เมื่อคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showLanguageMenu && !event.target.closest(".language-dropdown")) {
        setShowLanguageMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showLanguageMenu]);

  return (
    <div
      className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col 
                  transition-all duration-300 ease-in-out
                  ${isOpen ? "w-64" : "w-20"}`}
    >
      {/* --- Profile Section (เหมือนเดิม) --- */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center">
          <div
            className={`rounded-full overflow-hidden mb-3 border-2 border-gray-200 dark:border-gray-600 bg-white
                        transition-all duration-300
                        ${isOpen ? "w-30 h-30" : "w-12 h-12"}`}
          >
            <img
              src="/Logo3.png"
              alt="SkinDee Logo"
              className="w-full h-full object-cover"
            />
          </div>
          {isOpen && (
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              SkinDee
            </h2>
          )}
        </div>
      </div>

      {/* --- Navigation Menu (เหมือนเดิม) --- */}
      <nav className={`flex-1 ${isOpen ? "p-4" : "p-2"}`}>
        <Link
          to="/"
          className={`flex items-center gap-3 py-3 rounded-lg mb-2 transition-all ${
            activePage === "home"
              ? "bg-blue-500 text-white"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          } ${isOpen ? "px-4" : "justify-center px-4"}`}
        >
          <TiHome size={20} className="mb-0.5" />
          {isOpen && <span>Home</span>}
        </Link>
        <Link
          to="/upload"
          className={`flex items-center gap-3 py-3 rounded-lg mb-2 transition-all ${
            activePage === "upload"
              ? "bg-blue-500 text-white"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          } ${isOpen ? "px-4" : "justify-center px-4"}`}
        >
          <ImUpload size={20} className="mb-0.5" />
          {isOpen && <span>Upload</span>}
        </Link>
        <Link
          to="/faq"
          className={`flex items-center gap-3 py-3 rounded-lg mb-2 transition-all ${
            activePage === "faq"
              ? "bg-blue-500 text-white"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          } ${isOpen ? "px-4" : "justify-center px-4"}`}
        >
          <MdQuestionAnswer size={20} className="mb-0.5" />
          {isOpen && <span>FAQ</span>}
        </Link>
        <Link
          to="/about"
          className={`flex items-center gap-3 py-3 rounded-lg mb-2 transition-all ${
            activePage === "about"
              ? "bg-blue-500 text-white"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          } ${isOpen ? "px-4" : "justify-center px-4"}`}
        >
          <IoMdInformationCircle size={20} className="mb-0.5" />
          {isOpen && <span>About</span>}
        </Link>
        <Link
          to="/privacy"
          className={`flex items-center gap-3 py-3 rounded-lg mb-2 transition-all ${
            activePage === "privacy"
              ? "bg-blue-500 text-white"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          } ${isOpen ? "px-4" : "justify-center px-4"}`}
        >
          <MdPrivacyTip size={20} className="mb-0.5" />
          {isOpen && <span>Privacy</span>}
        </Link>
      </nav>

      {/* Settings Section */}
      <div className={`p-4 border-t border-gray-200 dark:border-gray-700`}>
        <div
          className={`flex items-center gap-4 ${
            isOpen ? "justify-between" : "flex-col"
          }`}
        >
          {/* Language Dropdown */}
          <div
            className={`relative language-dropdown ${
              isOpen ? "flex-1" : "w-full"
            }`}
          >
            <button
              // 1. ลบ 'isOpen &&' ออกเพื่อให้คลิกได้ตลอด
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className={`flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors w-full
                                ${!isOpen && "justify-center"}`}
            >
              <span className="text-lg">
                <MdLanguage className="mb-0.5" />
              </span>
              {isOpen && (
                <>
                  <span className="text-sm">{language}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      showLanguageMenu ? "rotate-180" : ""
                    }`}
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
              // 2. เพิ่ม logic เปลี่ยนตำแหน่งเมนูภาษาตอนย่อ (pop-out)
              <div
                className={`absolute w-40 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 overflow-hidden z-50
                  ${
                    isOpen
                      ? "bottom-full left-0 mb-2" // ตำแหน่งปกติ (ตอนเปิด)
                      : "bottom-0 left-full ml-2" // ตำแหน่งใหม่ (ตอนย่อ)
                  }
                `}
              >
                <button
                  onClick={() => changeLanguage("English")}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  English
                </button>
                <button
                  onClick={() => changeLanguage("ไทย")}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  ไทย
                </button>
              </div>
            )}
          </div>

          {/* Theme Toggle Icons */}
          {/* 3. เพิ่ม 'flex-col' ตอนย่อ (!isOpen) เพื่อให้ Sun/Moon เรียงแนวตั้ง */}
          <div className={`flex items-center gap-2 ${!isOpen && "flex-col"}`}>
            <button
              onClick={() => setDarkMode(false)}
              className={`p-1.5 rounded-lg transition-colors ${
                !darkMode
                  ? "text-yellow-500"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
              title="Light Mode"
            >
              <IoSunny size={20} />
            </button>

            {/* 4. ซ่อนปุ่ม Toggle ตอนย่อ (isOpen && ...) */}
            {isOpen && (
              <button
                onClick={toggleDarkMode}
                className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
                style={{
                  backgroundColor: darkMode ? "#3b82f6" : "#d1d5db",
                }}
                title="Toggle Theme"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    darkMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            )}

            <button
              onClick={() => setDarkMode(true)}
              className={`p-1.5 rounded-lg transition-colors ${
                darkMode
                  ? "text-blue-400"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
              title="Dark Mode"
            >
              <IoMoon size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
