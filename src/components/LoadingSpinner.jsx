// src/components/LoadingSpinner.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // [เพิ่ม]
import { useLanguage } from "../context/LanguageContext"; // [เพิ่ม]
import { ScanFace, Loader2 } from "lucide-react"; // [เพิ่ม] ไอคอนสวยๆ

const LoadingSpinner = ({ isFinalizing, onComplete }) => {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);

  // ดึงรายการสถานะจากภาษาปัจจุบัน
  const statuses = t.loadingSteps || [];
  const [statusIndex, setStatusIndex] = useState(0);

  // เอฟเฟกต์จำลองการโหลด (0% -> 95%)
  useEffect(() => {
    if (isFinalizing) return;

    // 1. วนลูปเปลี่ยนข้อความ (เปลี่ยน Logic นิดหน่อยให้ใช้ Index แทน Text ตรงๆ)
    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statuses.length);
    }, 2000);

    // 2. วนลูปเพิ่ม Progress Bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          return 95; // ค้างไว้ที่ 95 จนกว่า API จะตอบกลับ
        }
        // สุ่มเพิ่มทีละน้อยให้ดูเป็นธรรมชาติ (Natural randomness)
        const diff = Math.random() * 8;
        return Math.min(prev + diff, 95);
      });
    }, 500);

    return () => {
      clearInterval(statusInterval);
      clearInterval(progressInterval);
    };
  }, [isFinalizing, statuses.length]);

  // เอฟเฟกต์เมื่อโหลดเสร็จ (Finalizing)
  useEffect(() => {
    if (isFinalizing) {
      setProgress(100);

      const timer = setTimeout(() => {
        onComplete();
      }, 800); // รอ 0.8 วิ ให้คนเห็นคำว่า 100% และข้อความ Complete

      return () => clearTimeout(timer);
    }
  }, [isFinalizing, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4">
      {/* Card Container */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-10 text-center relative overflow-hidden">
        {/* Background Glow (ตกแต่ง) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-500/5 blur-[100px] pointer-events-none"></div>

        {/* Icon Animation */}
        <div className="relative mb-8 inline-block">
          {/* วงแหวนหมุนรอบไอคอน */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-full w-24 h-24 -m-2"
          />

          <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center relative z-10">
            {isFinalizing ? (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <ScanFace className="w-10 h-10 text-green-500" />
              </motion.div>
            ) : (
              <ScanFace className="w-10 h-10 text-blue-600 dark:text-blue-400 animate-pulse" />
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {isFinalizing ? t.loadingComplete : t.loadingTitle}
        </h2>

        {/* Progress Number */}
        <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-6 font-mono tracking-tighter">
          {Math.round(progress)}%
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 mb-6 overflow-hidden shadow-inner">
          {/* Animated Bar */}
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }} // ใช้ Spring ให้ดูเด้งดึ๋งเล็กน้อย
          >
            {/* Shimmer Effect บนบาร์ */}
            <div className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
          </motion.div>
        </div>

        {/* Status Text (Sliding Animation) */}
        <div className="h-8 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {isFinalizing ? (
              <motion.div
                key="done"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-green-600 dark:text-green-400 font-medium flex items-center justify-center gap-2"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Ready to view
              </motion.div>
            ) : (
              <motion.div
                key={statusIndex} // เปลี่ยน key เพื่อให้ Framer รู้ว่าเป็นคนละตัว
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute w-full text-gray-500 dark:text-gray-400 text-sm font-medium flex items-center justify-center gap-2"
              >
                <Loader2 className="w-3 h-3 animate-spin" />
                {statuses[statusIndex]}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
