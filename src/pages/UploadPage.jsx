// src/pages/UploadPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";
import UploadGuide from "../components/UploadGuide";
import LoadingSpinner from "../components/LoadingSpinner";
import Result from "../components/Result";
const UploadPage = () => {
  const [showGuide, setShowGuide] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isFinalizing, setIsFinalizing] = useState(false);

  const navigate = useNavigate(); // 2. เรียกใช้ Hook

  const handleAnalyze = async (file) => {
    setIsLoading(true);
    setIsFinalizing(false);
    setResult(null);

    navigate("/upload"); // 3. [ใหม่] เคลียร์ hash เมื่อเริ่มวิเคราะห์ใหม่

    try {
      // (Logic การ fetch API ของคุณ... เหมือนเดิม)
      const formData = new FormData();
      formData.append("file", file);
      const minLoadingTime = new Promise((resolve) =>
        setTimeout(resolve, 3000)
      );
      const apiRequest = fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });
      const [response] = await Promise.all([apiRequest, minLoadingTime]);
      const data = await response.json();
      if (data.success) {
        setResult(data);
        setIsLoading(false);
        setIsFinalizing(true);
      } else {
        alert("เกิดข้อผิดพลาด: " + data.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
      setIsLoading(false);
    }
  };

  const handleGuideClose = () => {
    setShowGuide(false);
  };

  const handleLoadingComplete = () => {
    setIsFinalizing(false);
    navigate("/upload#result"); // 4. [ใหม่] ตั้ง hash เป็น #result เมื่อโหลด 100%
  };

  return (
    // (ส่วน return ทั้งหมดเหมือนเดิมเป๊ะครับ)
    <React.Fragment>
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          {/* ... (Title) ... */}
          {isLoading || isFinalizing ? (
            <LoadingSpinner
              isFinalizing={isFinalizing}
              onComplete={handleLoadingComplete}
            />
          ) : result ? (
            <Result result={result} />
          ) : showGuide ? (
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
