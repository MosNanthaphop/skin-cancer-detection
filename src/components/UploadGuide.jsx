// src/components/UploadGuide.jsx
import { useState } from "react";
import {
  IoChevronBack,
  IoChevronForward,
  IoCameraOutline, // ไอคอนกล้อง (สไลด์ 1)
  IoBan, // ไอคอน "ห้าม" (สไลด์ 3)
} from "react-icons/io5";
import { MdCenterFocusStrong } from "react-icons/md"; // ไอคอนโฟกัส (สไลด์ 2)
import UploadTitle from "./UploadTitle";

// 1. ข้อมูลของสไลด์
const slides = [
  {
    icon: IoCameraOutline,
    text: "Take a clear, well-lit photo of the skin area. Avoid shadows and blur.",
  },
  {
    icon: MdCenterFocusStrong,
    text: "Ensure the photo is in focus and shows the entire area of concern.",
  },
  {
    icon: IoBan,
    text: "Do not use filters, makeup, or any effects on the photo.",
  },
];

// 2. รับ prop 'onClose' จากแม่ (UploadPage)
const UploadGuide = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    // วนกลับไปสไลด์ 0 ถ้าถึงสไลด์สุดท้ายแล้ว
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    // วนกลับไปสไลด์สุดท้าย ถ้าอยู่ที่สไลด์ 0
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // ดึงข้อมูลสไลด์ปัจจุบัน
  const { icon: Icon, text } = slides[currentSlide];

  return (
    <div className="max-w-3xl mx-auto mb-5">
      <UploadTitle />
      {/* 3. การ์ดสีขาวที่ครอบทั้งหมด (เหมือนในรูป) */}
      <div className="mt-15 mb-12 w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
        {/* 4. ส่วนหัว (ลูกศร และ Title) */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <IoChevronBack size={20} />
          </button>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            How to make a suitable photo
          </h2>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <IoChevronForward size={20} />
          </button>
        </div>

        {/* 5. ส่วนเนื้อหา (Icon และ Text) */}
        <div className="text-center my-6 min-h-[120px]">
          {" "}
          {/* เพิ่ม min-h เพื่อกันกระตุก */}
          <Icon
            size={64}
            className="text-blue-500 mx-auto mb-4 transition-all duration-300"
          />
          <p className="text-gray-600 dark:text-gray-300 px-4">{text}</p>
        </div>

        {/* 6. จุด Pagination */}
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all
              ${
                index === currentSlide
                  ? "bg-blue-500"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
              }
            `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* 7. ปุ่ม "Got it" */}
        <button
          onClick={onClose} // เมื่อคลิก ให้เรียกฟังก์ชัน 'onClose' ที่ได้รับมา
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default UploadGuide;
