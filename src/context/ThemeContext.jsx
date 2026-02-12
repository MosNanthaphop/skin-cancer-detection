import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // 1. ลองอ่านค่าจาก localStorage ก่อน
    const savedTheme = localStorage.getItem("theme");

    // ถ้าเคยบันทึกค่าไว้ ให้ใช้ค่านั้น (ไม่ว่าจะเป็น 'dark' หรือ 'light')
    if (savedTheme) {
      return savedTheme === "dark";
    }

    // 2. ถ้าไม่เคยบันทึก (เข้าครั้งแรก) ให้เช็คการตั้งค่าของ System/Browser
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return true; // ถ้า System เป็น Dark ให้เริ่มด้วย Dark
    }

    // 3. ถ้าไม่มีทั้งคู่ ให้เริ่มด้วย Light (false)
    return false;
  });

  // อัปเดต DOM และ localStorage เมื่อ darkMode เปลี่ยน
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
