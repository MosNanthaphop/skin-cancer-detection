// src/pages/UploadPage.jsx

import React, { useState } from "react";
import ImageUploader from "../components/ImageUploader";
import UploadGuide from "../components/UploadGuide";
import LoadingSpinner from "../components/LoadingSpinner"; // Import Spinner ใหม่

const UploadPage = () => {
  const [showGuide, setShowGuide] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  // 1. เพิ่ม State สำหรับการโหลดขั้นสุดท้าย
  const [isFinalizing, setIsFinalizing] = useState(false);

  const handleAnalyze = async (file) => {
    setIsLoading(true);
    setIsFinalizing(false); // 2. รีเซ็ต state ใหม่
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // (จำลองการโหลดขั้นต่ำ 3 วินาที)
      const minLoadingTime = new Promise((resolve) =>
        setTimeout(resolve, 3000)
      );
      const apiRequest = fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      // รอทั้ง API และ เวลาขั้นต่ำ
      const [response] = await Promise.all([apiRequest, minLoadingTime]);
      const data = await response.json();

      if (data.success) {
        // 3. เมื่อ API สำเร็จ
        setResult(data); // เก็บผลลัพธ์ไว้ (แต่ยังไม่แสดง)
        setIsLoading(false); // ปิดการโหลดหลัก
        setIsFinalizing(true); // เปิดการโหลดขั้นสุดท้าย (Spinner จะเริ่มวิ่งไป 100%)
      } else {
        alert("เกิดข้อผิดพลาด: " + data.error);
        setIsLoading(false); // ปิดโหลดถ้า API error
      }
    } catch (error) {
      console.error("Error:", error);
      alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
      setIsLoading(false); // ปิดโหลดถ้า Network error
    }
  };

  const handleGuideClose = () => {
    setShowGuide(false);
  };

  // 4. ฟังก์ชันนี้จะถูกเรียกโดย LoadingSpinner
  const handleLoadingComplete = () => {
    setIsFinalizing(false); // ปิดการโหลดขั้นสุดท้าย
    // เมื่อ State นี้เปลี่ยน React จะ Re-render
    // และ Logic ใน return จะแสดงผลลัพธ์ (เพราะ result มีค่า)
  };

  return (
    <React.Fragment>
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          {/* ส่วน Title และ p */}
          <h1 className="text-4xl font-bold text-center mb-3 dark:text-white">
            Upload your image
          </h1>
          <p className="text-center text-gray-600 text-base mb-9">
            คำแนะนำการถ่ายภาพ:
            ถ่ายภาพในที่ที่มีแสงสว่างและไม่ใกล้หรือไกลจนเกินไป{" "}
            <a href="#" className="text-blue-500 hover:underline">
              "อ่านรายละเอียดการถ่ายภาพ"
            </a>
          </p>

          {/* 5. Logic การแสดงผล 3 ขั้นตอน */}
          {isLoading || isFinalizing ? (
            // 1. ถ้ากำลังโหลด (ขั้น 1 หรือ 2)
            <LoadingSpinner
              isFinalizing={isFinalizing}
              onComplete={handleLoadingComplete}
            />
          ) : result ? (
            // 2. ถ้าโหลดเสร็จ และมีผลลัพธ์
            <div className="max-w-xl mx-auto mt-10 mb-16">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">
                  ผลการวิเคราะห์ (Test)
                </h2>
                <div className="mb-4">
                  <p className="text-gray-600 mb-2">การวินิจฉัย:</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {result.prediction}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-600 mb-2">ความมั่นใจ:</p>
                  <p className="text-2xl font-semibold">{result.confidence}%</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-2">รายละเอียดทั้งหมด:</p>
                  <div className="space-y-2">
                    {Object.entries(result.all_predictions).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between items-center"
                        >
                          <span className="text-gray-700">{key}:</span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2 f">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${value}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold">
                              {value}%
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    ⚠️ ผลการวินิจฉัยนี้เป็นเพียงการประเมินเบื้องต้นเท่านั้น
                    หากมีข้อสงสัยกรุณาปรึกษาแพทย์ผู้เชี่ยวชาญ
                  </p>
                </div>
              </div>
            </div>
          ) : // 3. สถานะเริ่มต้น (ยังไม่โหลด)
          showGuide ? (
            <UploadGuide onClose={handleGuideClose} />
          ) : (
            <ImageUploader onAnalyze={handleAnalyze} />
          )}
        </div>
      </section>
    </React.Fragment>
  );
};

export default UploadPage;
