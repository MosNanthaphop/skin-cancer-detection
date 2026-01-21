// src/pages/UploadPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";
import UploadGuide from "../components/UploadGuide";
import LoadingSpinner from "../components/LoadingSpinner";
import ResultPage from "./ResultPage";
import CameraModal from "../components/CameraModal";

const UploadPage = () => {
  const [showGuide, setShowGuide] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [analyzedFileUrl, setAnalyzedFileUrl] = useState(null);

  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // [เพิ่ม 1] State สำหรับเก็บไฟล์ที่ถ่ายจากกล้องเพื่อส่งให้ Uploader
  const [capturedFile, setCapturedFile] = useState(null);

  const navigate = useNavigate();

  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  // [แก้ไข 2] ถ่ายเสร็จเก็บลง State แทนการสั่ง Analyze ทันที
  const handleCameraCapture = (imgSrc) => {
    setIsCameraOpen(false);
    const file = dataURLtoFile(imgSrc, "camera-capture.jpg");
    setCapturedFile(file); // ส่งไฟล์ไปให้ ImageUploader แสดงผล
  };

  const handleAnalyze = async (file) => {
    // ... (Code เดิมทั้งหมด ไม่ต้องแก้) ...
    setIsLoading(true);
    setIsFinalizing(false);
    setResult(null);
    setAnalyzedFileUrl(null);
    navigate("/upload");

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
        setAnalyzedFileUrl(null);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
      setIsLoading(false);
      setAnalyzedFileUrl(null);
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
            <ResultPage result={result} previewUrl={analyzedFileUrl} />
          ) : (
            <>
              {showGuide ? (
                <UploadGuide onClose={handleGuideClose} />
              ) : (
                <ImageUploader
                  onAnalyze={handleAnalyze}
                  onOpenCamera={() => setIsCameraOpen(true)}
                  externalFile={capturedFile} // [เพิ่ม 3] ส่ง prop ไฟล์ที่ถ่ายไป
                />
              )}
            </>
          )}
        </div>
      </section>

      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />
    </React.Fragment>
  );
};

export default UploadPage;
