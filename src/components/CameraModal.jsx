// src/components/CameraModal.jsx
import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { X, SwitchCamera } from "lucide-react"; // ใช้ไอคอนจาก Lucide
import { motion } from "framer-motion";

const CameraModal = ({ isOpen, onClose, onCapture }) => {
  const webcamRef = useRef(null);
  // state สำหรับสลับกล้อง (user = กล้องหน้า, environment = กล้องหลัง)
  const [facingMode, setFacingMode] = useState("environment");

  // ฟังก์ชันถ่ายรูป
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      onCapture(imageSrc); // ส่งรูป Base64 กลับไปหน้าหลัก
    }
  }, [webcamRef, onCapture]);

  // ฟังก์ชันสลับกล้อง
  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-95 flex flex-col items-center justify-center p-4">
      {/* ปุ่มปิด Modal */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 z-50"
      >
        <X size={24} />
      </button>

      <div className="relative w-full max-w-md aspect-[3/4] bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          forceScreenshotSourceSize={true} // ให้รูปชัดตามความละเอียดกล้อง
          videoConstraints={{
            facingMode: facingMode,
            aspectRatio: 3 / 4, // บังคับสัดส่วนแนวตั้ง
          }}
          className="w-full h-full object-cover"
        />

        {/* --- ส่วน Overlay Grid (เส้นเล็ง) --- */}
        <div className="absolute inset-0 pointer-events-none">
          {/* กรอบสี่เหลี่ยมสีเหลืองตรงกลาง */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-yellow-400 rounded-xl opacity-80 shadow-[0_0_15px_rgba(250,204,21,0.5)]"></div>

          {/* เส้น Grid จางๆ */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-20">
            <div className="border-r border-b border-white"></div>
            <div className="border-r border-b border-white"></div>
            <div className="border-b border-white"></div>
            <div className="border-r border-b border-white"></div>
            <div className="border-r border-b border-white"></div>
            <div className="border-b border-white"></div>
            <div className="border-r border-white"></div>
            <div className="border-r border-white"></div>
            <div></div>
          </div>

          {/* ข้อความแนะนำ */}
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <span className="bg-black/50 text-white px-4 py-1 rounded-full text-sm backdrop-blur-sm">
              Place lesion in the box
            </span>
          </div>
        </div>
      </div>

      {/* --- แถบปุ่มควบคุมด้านล่าง --- */}
      <div className="flex items-center gap-12 mt-8">
        {/* ปุ่มสลับกล้อง */}
        <button
          onClick={toggleCamera}
          className="p-4 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition"
        >
          <SwitchCamera size={24} />
        </button>

        {/* ปุ่มชัตเตอร์ (มี Animation ตอนกด) */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={capture}
          className="p-1 rounded-full border-4 border-white"
        >
          <div className="w-16 h-16 bg-red-500 rounded-full border-4 border-black"></div>
        </motion.button>

        {/* Placeholder ให้ปุ่มชัตเตอร์อยู่ตรงกลางเป๊ะๆ */}
        <div className="w-14"></div>
      </div>
    </div>
  );
};

export default CameraModal;
