// src/components/ImageUploader.jsx

import { useState, useCallback, useEffect } from "react";
import {
  X,
  Crop,
  Trash2,
  Check,
  Camera,
  Image as ImageIcon,
} from "lucide-react";
import Cropper from "react-easy-crop";
import UploadTitle from "../components/UploadTitle";
import { useLanguage } from "../context/LanguageContext";

// --- Helper Functions ---

// 1. แปลง Data URL เป็น File Object
const dataURLtoFile = async (dataUrl, fileName) => {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], fileName, { type: blob.type });
};

// 2. ฟังก์ชัน Crop รูปภาพ (ใช้ Canvas)
const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = new Image();
  image.src = imageSrc;
  image.crossOrigin = "anonymous"; // ป้องกันปัญหา CORS (เผื่อไว้)

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return canvas.toDataURL("image/jpeg", 0.95);
};

// --- Component หลัก ---
const ImageUploader = ({ onAnalyze, onOpenCamera, externalFile }) => {
  const { t } = useLanguage();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [agree, setAgree] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // States for Cropper
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback(
    (croppedArea, currentCroppedAreaPixels) => {
      setCroppedAreaPixels(currentCroppedAreaPixels);
    },
    [],
  );

  const resetCropState = () => {
    setIsCropping(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    // setCroppedAreaPixels(null); // ไม่ต้องเคลียร์ค่านี้ทันที เพื่อกัน error
  };

  const processFile = (file) => {
    if (
      file &&
      (file.type === "image/jpeg" || file.type === "image/png") &&
      file.size <= 10 * 1024 * 1024
    ) {
      resetCropState();
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert(t.alertTypeSize);
    }
  };

  // รับไฟล์จากกล้อง (externalFile)
  useEffect(() => {
    if (externalFile) {
      processFile(externalFile);
    }
  }, [externalFile]);

  // --- Logic การ Crop (แก้ไขใหม่) ---
  const handleApplyCrop = async () => {
    try {
      if (previewUrl && croppedAreaPixels) {
        // 1. สร้างรูปที่ Crop แล้ว (Base64)
        const croppedDataUrl = await getCroppedImg(
          previewUrl,
          croppedAreaPixels,
        );

        // 2. อัปเดต Preview ทันที
        setPreviewUrl(croppedDataUrl);

        // 3. สร้าง File Object ใหม่
        const fileName = selectedFile ? selectedFile.name : "cropped_image.jpg";
        const newFile = await dataURLtoFile(
          croppedDataUrl,
          `cropped_${fileName}`,
        );

        // 4. บันทึกไฟล์ใหม่ลง State
        setSelectedFile(newFile);

        // 5. ปิดโหมด Crop
        resetCropState();
      }
    } catch (e) {
      console.error("Crop error:", e);
      alert(t.alertCrop);
    }
  };

  // --- Event Handlers อื่นๆ ---
  const handleFileChange = (e) => processFile(e.target.files[0]);
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files[0]);
  };
  const removeImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    resetCropState();
  };
  const handleCropClick = () => setIsCropping(true);
  const handleCancelCrop = () => resetCropState();

  const handleAnalyze = () => {
    if (!selectedFile) {
      alert(t.alertNoFile);
      return;
    }
    if (!agree) {
      alert(t.alertTerms);
      return;
    }
    if (onAnalyze) {
      onAnalyze(selectedFile);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mb-5">
      <UploadTitle />

      <div
        className={`border-2 border-dashed rounded-xl p-8 mb-8 text-center transition ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
        } dark:bg-gray-800 dark:border-gray-600 ${
          isDragging && "dark:bg-blue-900/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <div className="relative inline-block w-full max-w-[28rem] mx-auto">
            {!isCropping ? (
              // --- โหมด Preview (แสดงรูปปกติ) ---
              <>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-64 w-full object-contain rounded-lg mx-auto"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <button
                    onClick={handleCropClick}
                    className="bg-white/90 text-gray-800 rounded-md p-2 hover:bg-white transition shadow-sm dark:bg-gray-800/90 dark:text-white dark:hover:bg-gray-700"
                    title="Crop Image"
                  >
                    <Crop size={18} />
                  </button>
                  <button
                    onClick={removeImage}
                    className="bg-red-500/90 text-white rounded-md p-2 hover:bg-red-600 transition shadow-sm"
                    title="Delete Image"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </>
            ) : (
              // --- โหมด Cropping (แสดงเครื่องมือตัด) ---
              <div className="relative h-64 w-full bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                <Cropper
                  image={previewUrl}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  cropShape="rect"
                  showGrid={true}
                  minZoom={1}
                  maxZoom={3}
                  restrictPosition={false}
                />
                <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
                  <button
                    onClick={handleApplyCrop}
                    className="bg-green-500/90 text-white rounded-md p-2 hover:bg-green-600 transition shadow-sm"
                    title="Apply"
                  >
                    <Check size={18} />
                  </button>
                  <button
                    onClick={handleCancelCrop}
                    className="bg-red-500/90 text-white rounded-md p-2 hover:bg-red-600 transition shadow-sm"
                    title="Cancel"
                  >
                    <X size={18} />
                  </button>
                </div>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4/5 z-10 accent-blue-500"
                />
              </div>
            )}
          </div>
        ) : (
          // --- โหมด Upload (ปุ่มเลือกไฟล์/ถ่ายรูป) ---
          <>
            <div className="w-16 h-16 bg-blue-50 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-blue-500 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              {t.uploadTitle}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              {t.dragDrop}
            </p>
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
            />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <label
                htmlFor="fileInput"
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition shadow-md w-full sm:w-auto justify-center"
              >
                <ImageIcon size={20} />
                <span>{t.chooseFile}</span>
              </label>
              <button
                type="button"
                onClick={onOpenCamera}
                className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700 transition shadow-md w-full sm:w-auto justify-center"
              >
                <Camera size={20} />
                <span>{t.takePhoto}</span>
              </button>
            </div>
          </>
        )}
      </div>

      <div className="flex items-start justify-center gap-3 mb-6 px-4">
        <input
          type="checkbox"
          id="terms"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="terms"
          className="text-sm text-gray-600 dark:text-gray-300 text-left"
        >
          {t.understandTerms}{" "}
          <span className="font-semibold text-gray-800 dark:text-white">
            {t.educationTerms}
          </span>{" "}
          {t.disclaimerTerms}
        </label>
      </div>

      <div className="text-center">
        <button
          onClick={handleAnalyze}
          className={`px-12 py-3 text-lg font-semibold text-white rounded-lg shadow-lg transition-all transform ${
            !selectedFile || !agree || isCropping
              ? "bg-gray-300 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:-translate-y-0.5 cursor-pointer"
          }`}
          disabled={!selectedFile || !agree || isCropping}
        >
          {t.analyzeBtn}
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
