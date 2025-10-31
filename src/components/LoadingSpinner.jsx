// src/components/LoadingSpinner.jsx
import { useState, useEffect } from "react";

// 1. [ใหม่] รายการข้อความสถานะที่เราจะวนลูป
const loadingStatuses = [
  "Analyzing image...",
  "Detecting key features...",
  "Running risk level calculation...",
  "Building your report...",
  "Finalizing results...",
];

// 2. [ใหม่] รับ props 2 ตัว:
//    - isFinalizing: บอกว่า API โหลดเสร็จหรือยัง (true/false)
//    - onComplete: ฟังก์ชันที่จะเรียกกลับเมื่อแสดงผล 100% เสร็จแล้ว
const LoadingSpinner = ({ isFinalizing, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState(loadingStatuses[0]);

  // 3. [แก้ไข] เอฟเฟกต์จำลองการโหลด (0% -> 95%)
  useEffect(() => {
    // ถ้า isFinalizing เป็น true, ให้หยุดการจำลองนี้ทันที
    if (isFinalizing) return;

    let statusIndex = 0;
    // วนลูปเปลี่ยนข้อความสถานะ
    const statusInterval = setInterval(() => {
      statusIndex++;
      if (statusIndex < loadingStatuses.length) {
        setStatusText(loadingStatuses[statusIndex]);
      } else {
        clearInterval(statusInterval); // หยุดเมื่อข้อความหมด
      }
    }, 1500); // เปลี่ยนข้อความทุก 1.5 วินาที

    // วนลูปเพิ่ม Progress Bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval); // หยุดที่ 95%
          return 95;
        }
        const diff = Math.random() * 10;
        return Math.min(prev + diff, 95);
      });
    }, 400); // อัปเดตทุก 0.4 วินาที

    return () => {
      clearInterval(statusInterval);
      clearInterval(progressInterval);
    };
  }, [isFinalizing]); // 4. เอฟเฟกต์นี้จะหยุดถ้า isFinalizing เปลี่ยน

  // 5. [ใหม่] เอฟเฟกต์สำหรับการโหลด 100% (Finalizing)
  //    จะทำงานเมื่อ isFinalizing เปลี่ยนเป็น true
  useEffect(() => {
    if (isFinalizing) {
      // 1. กระโดดไป 100%
      setProgress(100);
      setStatusText("Analysis Complete!");

      // 2. รอ 0.5 วินาที (เพื่อให้คนเห็น 100% และข้อความ)
      const timer = setTimeout(() => {
        onComplete(); // 3. เรียกกลับไปหา UploadPage ว่า "ฉันเสร็จแล้ว"
      }, 500); // 0.5 วินาที

      return () => clearTimeout(timer);
    }
  }, [isFinalizing, onComplete]);

  return (
    <div className="max-w-md mx-auto my-35 text-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Analyzing
        </h2>
        <div className="text-5xl font-bold text-blue-500 mb-6">
          {Math.round(progress)}%
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-4">
          <div
            className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-out" // เปลี่ยน ease-linear เป็น ease-out
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-center text-gray-500 dark:text-gray-400">
          {/* 6. [แก้ไข] หยุดหมุนเมื่อโหลดเสร็จ (isFinalizing) */}
          {!isFinalizing && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400 mr-2"></div>
          )}
          <span>{statusText}</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
