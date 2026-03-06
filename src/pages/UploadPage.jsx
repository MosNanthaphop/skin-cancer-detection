// src/pages/UploadPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";
import UploadGuide from "../components/UploadGuide";
import LoadingSpinner from "../components/LoadingSpinner";
import ResultPage from "./ResultPage";
import CameraModal from "../components/CameraModal";

// [1] Import Firebase
import { ref, runTransaction } from "firebase/database";
import { db } from "../firebase";

const UploadPage = () => {
  const [showGuide, setShowGuide] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [analyzedFileUrl, setAnalyzedFileUrl] = useState(null);

  const [isCameraOpen, setIsCameraOpen] = useState(false);
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

  const handleCameraCapture = (imgSrc) => {
    setIsCameraOpen(false);
    const file = dataURLtoFile(imgSrc, "camera-capture.jpg");
    setCapturedFile(file);
  };

  const handleAnalyze = async (file) => {
    setIsLoading(true);
    setIsFinalizing(false);
    setResult(null);
    setAnalyzedFileUrl(null);
    navigate("/upload"); // เปลี่ยน URL ไปที่หน้า Upload เพื่อรอผล

    // แสดง Preview ระหว่างรอ
    const reader = new FileReader();
    reader.onloadend = () => {
      setAnalyzedFileUrl(reader.result);
    };
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // สร้าง Promise จำลองเวลาโหลดขั้นต่ำ 3 วินาที (เพื่อให้ UX ดูสมูท ไม่เร็วไป)
      const minLoadingTime = new Promise((resolve) =>
        setTimeout(resolve, 3000),
      );

      // กำหนด URL ของ API โดยให้ความสำคัญกับตัวแปรบน Vercel ก่อน ถ้าไม่มีให้ใช้ลิงก์ Hugging Face
      const apiUrl =
        import.meta.env.VITE_API_URL ||
        "https://nanthaphopp-skindee-api.hf.space";

      // ยิง API ไปที่ Backend
      const apiRequest = fetch(`${apiUrl}/predict`, {
        method: "POST",
        body: formData,
      });

      // รอให้ทั้ง API และ เวลาขั้นต่ำ เสร็จพร้อมกัน
      const [response] = await Promise.all([apiRequest, minLoadingTime]);
      const data = await response.json();

      if (data.success) {
        setResult(data);
        setIsLoading(false);
        setIsFinalizing(true); // เริ่ม Animation จบการโหลด

        // ✅ [เพิ่มส่วนนี้] บันทึกยอดการตรวจลง Firebase
        // ใช้ runTransaction เพื่อให้แน่ใจว่าเลขไม่ชนกันถ้ามีคนตรวจพร้อมกัน
        const analysisRef = ref(db, "analysis_count");
        runTransaction(analysisRef, (currentCount) => {
          return (currentCount || 0) + 1;
        }).catch((err) => {
          console.error("Failed to update analysis stats:", err);
        });
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
    // เมื่อ LoadingSpinner หมุนจบ ให้แสดงผลลัพธ์
    // (ResultPage จะถูก render ตามเงื่อนไขด้านล่างเพราะ result มีค่าแล้ว)
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
            // แสดงหน้าผลลัพธ์เมื่อมี result
            <ResultPage result={result} previewUrl={analyzedFileUrl} />
          ) : (
            // แสดงหน้า Upload ปกติ
            <>
              {showGuide ? (
                <UploadGuide onClose={handleGuideClose} />
              ) : (
                <ImageUploader
                  onAnalyze={handleAnalyze}
                  onOpenCamera={() => setIsCameraOpen(true)}
                  externalFile={capturedFile}
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
