// src/components/UploadGuide.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // [เพิ่ม]
import {
  IoChevronBack,
  IoChevronForward,
  IoCameraOutline,
  IoBan,
} from "react-icons/io5";
import { MdCenterFocusStrong } from "react-icons/md";
import UploadTitle from "./UploadTitle";
import { useLanguage } from "../context/LanguageContext";

const UploadGuide = ({ onClose }) => {
  const { t } = useLanguage();
  // เก็บ state เป็น tuple [page, direction] เพื่อรู้ทิศทางการเลื่อน
  const [[page, direction], setPage] = useState([0, 0]);

  const slides = [
    {
      icon: IoCameraOutline,
      text: t.guideSlide1,
      color: "text-blue-500", // [เพิ่ม] แยกสีให้แต่ละไอคอน
    },
    {
      icon: MdCenterFocusStrong,
      text: t.guideSlide2,
      color: "text-green-500",
    },
    {
      icon: IoBan,
      text: t.guideSlide3,
      color: "text-red-500",
    },
  ];

  // คำนวณ index ปัจจุบันจากการวนลูป (Infinite Loop Logic)
  const imageIndex = Math.abs(page % slides.length);
  const currentSlide = slides[imageIndex];

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  // Animation Variants
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  // Swipe Settings
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="max-w-3xl mx-auto mb-5">
      <UploadTitle />

      {/* Card Container */}
      <div className="mt-8 mb-12 w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-2">
          <button
            onClick={() => paginate(-1)}
            className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
          >
            <IoChevronBack size={24} />
          </button>

          <h2 className="text-lg font-bold text-gray-800 dark:text-white text-center">
            {t.guideTitle}
          </h2>

          <button
            onClick={() => paginate(1)}
            className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
          >
            <IoChevronForward size={24} />
          </button>
        </div>

        {/* Content Area (Slide) */}
        <div className="relative h-[220px] flex flex-col items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={page} // สำคัญ! เปลี่ยน key เพื่อ trigger animation
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x" // เปิดใช้งานการลากแนวนอน
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1); // ปัดซ้าย -> หน้าถัดไป
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1); // ปัดขวา -> หน้าก่อนหน้า
                }
              }}
              className="absolute w-full flex flex-col items-center px-8 text-center cursor-grab active:cursor-grabbing"
            >
              <div
                className={`mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-full ${currentSlide.color}`}
              >
                <currentSlide.icon size={64} />
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg font-medium leading-relaxed">
                {currentSlide.text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Area */}
        <div className="p-6 pt-2">
          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mb-6">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const diff = idx - imageIndex;
                  paginate(diff); // คำนวณทิศทางกระโดดไปหน้าจุดนั้น
                }}
                className={`transition-all duration-300 rounded-full h-2 
                  ${
                    idx === imageIndex
                      ? "w-8 bg-blue-500"
                      : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                  }
                `}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Button */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          >
            {t.guideGotIt}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadGuide;
