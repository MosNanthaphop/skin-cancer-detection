// src/components/Header.jsx
import React from "react";
import { TiHome } from "react-icons/ti";
import { Link } from "react-router-dom"; // 1. Import Link

// 2. ตั้งค่า default เป็น array ว่าง
const Header = ({ breadcrumb = [] }) => {
  return (
    <div className="flex items-center justify-between mt-0.5">
      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-300">
        {/* 3. ทำให้ปุ่ม Home เป็น Link */}
        <Link to="/" className="hover:text-gray-700 dark:hover:text-white">
          <TiHome size={20} className="mb-1" />
        </Link>

        {/* 4. วนลูป Array ที่ได้รับมา */}
        {breadcrumb.map((item, index) => (
          <React.Fragment key={index}>
            <span>/</span>
            {/* 5. ตรวจสอบว่าเป็นไอเทมสุดท้ายหรือไม่ */}
            <span>{item}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
export default Header;
