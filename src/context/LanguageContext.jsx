// src/context/LanguageContext.jsx
import { createContext, useState, useContext } from "react";
// ตรวจสอบว่า path นี้ตรงกับที่คุณสร้างไฟล์ translations ไว้จริง
import { translations } from "../utils/translations";

// 1. สร้าง Context
const LanguageContext = createContext();

// 2. สร้าง Provider
export const LanguageProvider = ({ children }) => {
  // อ่านค่าจาก localStorage ก่อน ถ้าไม่มีให้เริ่มที่ 'th' (ไทย)
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("app_language") || "th";
  });

  // ฟังก์ชันเปลี่ยนภาษาและบันทึกลงเครื่อง
  const changeLanguage = (langCode) => {
    setLanguage(langCode);
    localStorage.setItem("app_language", langCode);
  };

  // ดึงชุดคำศัพท์ตามภาษาปัจจุบัน
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 3. สร้าง Custom Hook (สำคัญมาก ต้องมี export)
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
