// src/components/ImageUploader.jsx

import { useState, useCallback } from "react";
import { X, Crop, Trash2, Check } from "lucide-react";
import Cropper from "react-easy-crop";
import UploadTitle from "../components/UploadTitle"; // (ที่คุณ Import มา)

// Helper Function: แปลง Data URL เป็น File (เหมือนเดิม)
const dataURLtoFile = async (dataUrl, fileName) => {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], fileName, { type: blob.type });
};

// Helper Function: ทำการ Crop รูปภาพด้วย Canvas (เหมือนเดิม)
const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = new Image();
  image.src = imageSrc;
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
    pixelCrop.height
  );
  const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
  return dataUrl;
};

// --- Component หลัก ---
const ImageUploader = ({ onAnalyze }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [agree, setAgree] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback(
    (croppedArea, currentCroppedAreaPixels) => {
      setCroppedAreaPixels(currentCroppedAreaPixels);
    },
    []
  );

  // --- (Logic functions: processFile, handleFileChange, ... handleAnalyze - ทั้งหมดเหมือนเดิม) ---
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
      alert("กรุณาเลือกไฟล์ JPG หรือ PNG ที่มีขนาดไม่เกิน 10 MB");
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };
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
    const file = e.dataTransfer.files[0];
    processFile(file);
  };
  const removeImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    resetCropState();
  };
  const resetCropState = () => {
    setIsCropping(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };
  const handleCropClick = () => {
    setIsCropping(true);
  };
  const handleCancelCrop = () => {
    resetCropState();
  };
  const handleApplyCrop = async () => {
    if (previewUrl && croppedAreaPixels) {
      const croppedDataUrl = await getCroppedImg(previewUrl, croppedAreaPixels);
      setPreviewUrl(croppedDataUrl);
      const newFileName = `cropped_${selectedFile.name}`;
      const newCroppedFile = await dataURLtoFile(croppedDataUrl, newFileName);
      setSelectedFile(newCroppedFile);
      resetCropState();
    }
  };
  const handleAnalyze = () => {
    if (!selectedFile) {
      alert("กรุณาอัปโหลดรูปภาพก่อน");
      return;
    }
    if (!agree) {
      alert("กรุณายอมรับข้อกำหนดและเงื่อนไขการใช้งาน");
      return;
    }
    if (onAnalyze) {
      onAnalyze(selectedFile);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mb-5">
      {/* 1. Title Component (ที่คุณเพิ่มเข้ามา) */}
      <UploadTitle />

      {/* 2. Upload Area (เพิ่ม Dark Mode) */}
      <div
        className={`border-2 border-dashed rounded-xl p-10 mb-8 text-center transition ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
        } dark:bg-gray-800 dark:border-gray-600 ${
          // [Dark Mode]
          isDragging && "dark:bg-blue-900/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <div className="relative inline-block w-full max-w-[28rem] mx-auto">
            {!isCropping ? (
              // ---- โหมด Preview ----
              <>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-56 rounded-lg mx-auto"
                />

                {/* [แก้ไข] ลบ mr-14 และ backdrop-blur, เพิ่ม Dark Mode */}
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <button
                    onClick={handleCropClick}
                    className="bg-gray-200/80 text-gray-800 rounded-md p-2 hover:bg-gray-300 transition dark:bg-gray-600/80 dark:text-white dark:hover:bg-gray-500"
                    title="Crop Image"
                  >
                    <Crop size={18} />
                  </button>
                  <button
                    onClick={removeImage}
                    className="bg-red-500/80 text-white rounded-md p-2 hover:bg-red-500 transition"
                    title="Delete Image"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </>
            ) : (
              // ---- โหมด Crop (เพิ่ม Dark Mode) ----
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
                    className="bg-green-500/80 text-white rounded-md p-2 hover:bg-green-500 transition"
                    title="Apply Crop"
                  >
                    <Check size={18} />
                  </button>
                  <button
                    onClick={handleCancelCrop}
                    className="bg-red-500/80 text-white rounded-md p-2 hover:bg-red-500 transition"
                    title="Cancel Crop"
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
                  aria-labelledby="Zoom"
                  onChange={(e) => {
                    setZoom(parseFloat(e.target.value));
                  }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4/5 z-10 accent-blue-500"
                />
              </div>
            )}
          </div>
        ) : (
          // --- โหมด Upload (เพิ่ม Dark Mode) ---
          <>
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400 dark:text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-2">
              ลากและวางรูปภาพที่นี่
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
              หรือคลิกเพื่อเลือกไฟล์
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
              รองรับไฟล์ JPG, PNG (สูงสุด 10 MB)
            </p>
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="inline-block px-5 py-2 bg-blue-500 text-white text-base rounded-lg cursor-pointer hover:bg-blue-600 transition"
            >
              เลือกไฟล์
            </label>
          </>
        )}
      </div>

      {/* --- Terms Checkbox (เพิ่ม Dark Mode) --- */}
      <div className="flex items-center justify-center gap-2 mb-5">
        <input
          type="checkbox"
          id="terms"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="terms"
          className="text-sm text-gray-600 dark:text-gray-300"
        >
          "ฉันเข้าใจว่าและยอมรับว่าเครื่องมือนี้ไม่ใช่การวินิจฉัยทางการแพทย์"
        </label>
      </div>

      {/* --- Analyze Button (เหมือนเดิม) --- */}
      <div className="text-center">
        <button
          onClick={handleAnalyze}
          className="px-10 py-2.5 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed enabled:cursor-pointer"
          disabled={!selectedFile || !agree || isCropping}
        >
          Analyze
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
