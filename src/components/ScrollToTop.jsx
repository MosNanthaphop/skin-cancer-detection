// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // ดึง pathname มาเพื่อจับตามองว่าเปลี่ยนหน้าหรือยัง
  const { pathname } = useLocation();

  useEffect(() => {
    // เมื่อ pathname เปลี่ยน ให้ scroll ไปที่บนสุด (0, 0)
    window.scrollTo(0, 0);
  }, [pathname]); // ทำงานทุกครั้งที่ pathname เปลี่ยน

  return null; // Component นี้ไม่ต้องแสดงผลอะไร
};

export default ScrollToTop;
