// src/pages/UploadPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";
import UploadGuide from "../components/UploadGuide";
import LoadingSpinner from "../components/LoadingSpinner";
import Result from "../components/Result"; // 1. Import ชื่อ 'Result' (ถูกต้องแล้ว)

const UploadPage = () => {
  const [showGuide, setShowGuide] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isFinalizing, setIsFinalizing] = useState(false);

  // 2. [เพิ่ม] สร้าง State เพื่อเก็บ URL ของรูปที่วิเคราะห์
  const [analyzedFileUrl, setAnalyzedFileUrl] = useState(null);

  const navigate = useNavigate();

  const handleAnalyze = async (file) => {
    setIsLoading(true);
    setIsFinalizing(false);
    setResult(null);
    setAnalyzedFileUrl(null); // 3. รีเซ็ต URL
    navigate("/upload");

    // 4. [เพิ่ม] อ่านไฟล์เป็น Data URL เพื่อเก็บไว้แสดงผล
    const reader = new FileReader();
    reader.onloadend = () => {
      setAnalyzedFileUrl(reader.result);
    };
    reader.readAsDataURL(file);

    try {
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
        setAnalyzedFileUrl(null); // 5. ล้าง URL ถ้า Error
      }
    } catch (error) {
      console.error("Error:", error);
      alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
      setIsLoading(false);
      setAnalyzedFileUrl(null); // 6. ล้าง URL ถ้า Error
    }
  };

  const handleGuideClose = () => {
    setShowGuide(false);
  };

  const handleLoadingComplete = () => {
    setIsFinalizing(false);
    navigate("/upload#result");
  };

  return (
    <React.Fragment>
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          {isLoading || isFinalizing ? (
            <LoadingSpinner
              isFinalizing={isFinalizing}
              onComplete={handleLoadingComplete}
            />
          ) : result ? (
            // 7. [แก้ไข] ส่ง 'previewUrl' ไปให้ Result
            <Result result={result} previewUrl={analyzedFileUrl} />
          ) : (
            <>
              {showGuide ? (
                <UploadGuide onClose={handleGuideClose} />
              ) : (
                <ImageUploader onAnalyze={handleAnalyze} />
              )}
            </>
          )}
        </div>
      </section>
    </React.Fragment>
  );
};

export default UploadPage;
