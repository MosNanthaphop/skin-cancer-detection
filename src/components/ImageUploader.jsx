// src/components/ImageUploader.jsx

import { useState, useCallback, useEffect, useRef } from "react";
import {
  X,
  Crop,
  Trash2,
  Check,
  Camera,
  Image as ImageIcon,
  UploadCloud,
  ZoomIn,
} from "lucide-react";
import Cropper from "react-easy-crop";
import UploadTitle from "../components/UploadTitle";
import { useLanguage } from "../context/LanguageContext";

// --- Helper Functions (เหมือนเดิม) ---
const dataURLtoFile = async (dataUrl, fileName) => {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], fileName, { type: blob.type });
};

const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = new Image();
  image.src = imageSrc;
  image.crossOrigin = "anonymous";
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
  const fileInputRef = useRef(null);
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
  };

  const processFile = (file) => {
    if (!file) return;
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert(t.alertTypeSize || "Invalid file type. Please upload an image.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert(t.alertTypeSize || "File is too large. Max 10MB.");
      return;
    }
    resetCropState();
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (externalFile) processFile(externalFile);
  }, [externalFile]);

  const handleApplyCrop = async () => {
    try {
      if (previewUrl && croppedAreaPixels) {
        const croppedDataUrl = await getCroppedImg(
          previewUrl,
          croppedAreaPixels,
        );
        setPreviewUrl(croppedDataUrl);
        const fileName = selectedFile ? selectedFile.name : "cropped_image.jpg";
        const newFile = await dataURLtoFile(
          croppedDataUrl,
          `cropped_${fileName}`,
        );
        setSelectedFile(newFile);
        resetCropState();
      }
    } catch (e) {
      console.error("Crop error:", e);
      alert(t.alertCrop || "Failed to crop image.");
    }
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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0)
      processFile(e.dataTransfer.files[0]);
  };
  const handleFileChange = (e) => processFile(e.target.files[0]);

  const removeImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    resetCropState();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAnalyzeClick = () => {
    if (!selectedFile) {
      alert(t.alertNoFile);
      return;
    }
    if (!agree) {
      alert(t.alertTerms);
      return;
    }
    if (onAnalyze) onAnalyze(selectedFile);
  };

  return (
    <div className="max-w-3xl mx-auto mb-8">
      <UploadTitle />

      {/* --- Main Upload Area (ปรับความสูงลง) --- */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 ease-in-out ${
          isDragging
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-[1.01]"
            : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
        } shadow-sm hover:shadow-md`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <div className="relative w-full">
            {!isCropping ? (
              // --- VIEW MODE (ปรับ max-h ลงเหลือ 300px) ---
              <div className="relative group">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-[250px] w-full object-contain rounded-xl mx-auto shadow-md bg-gray-50 dark:bg-gray-900"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => setIsCropping(true)}
                    className="p-2.5 bg-white text-gray-700 rounded-full shadow-lg hover:bg-gray-50 hover:text-blue-600 transition-all transform hover:scale-110"
                  >
                    <Crop size={20} />
                  </button>
                  <button
                    onClick={removeImage}
                    className="p-2.5 bg-white text-gray-700 rounded-full shadow-lg hover:bg-red-50 hover:text-red-600 transition-all transform hover:scale-110"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ) : (
              // --- CROP MODE (ปรับ h ลงเหลือ 300px) ---
              <div className="flex flex-col gap-4">
                <div className="relative h-[300px] w-full bg-black rounded-xl overflow-hidden shadow-inner border border-gray-200 dark:border-gray-700">
                  <Cropper
                    image={previewUrl}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    showGrid={true}
                  />
                </div>
                {/* Crop Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-3 w-full sm:w-1/2">
                    <ZoomIn size={20} className="text-gray-500" />
                    <input
                      type="range"
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:bg-gray-600"
                    />
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto justify-end">
                    <button
                      onClick={resetCropState}
                      className="px-3 py-1.5 flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                    >
                      <X size={16} /> Cancel
                    </button>
                    <button
                      onClick={handleApplyCrop}
                      className="px-3 py-1.5 flex items-center gap-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-sm"
                    >
                      <Check size={16} /> Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          // --- EMPTY STATE (UPLOAD) (ปรับ py ลงเหลือ py-6) ---
          <div className="py-6">
            <div className="w-16 h-16 bg-blue-50 dark:bg-gray-700/50 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse-slow">
              <UploadCloud className="w-8 h-8 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
              {t.uploadTitle}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs mb-6 max-w-sm mx-auto">
              {t.dragDrop}
            </p>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
              ref={fileInputRef}
            />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <label
                htmlFor="fileInput"
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl cursor-pointer hover:bg-blue-700 transition-all shadow-md w-full sm:w-auto text-sm group"
              >
                <ImageIcon
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="font-medium">{t.chooseFile}</span>
              </label>
              <div className="text-gray-400 text-xs font-medium">OR</div>
              <button
                type="button"
                onClick={onOpenCamera}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-xl cursor-pointer hover:bg-green-700 transition-all shadow-md w-full sm:w-auto text-sm group"
              >
                <Camera
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="font-medium">{t.takePhoto}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* --- Agreements & Analyze Button (เพิ่ม mt-8 เพื่อเว้นระยะห่าง) --- */}
      <div className="flex flex-col items-center gap-6 mt-8">
        <label className="flex items-start gap-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm checked:bg-blue-600 checked:border-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <Check
              size={14}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
            />
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
            {t.understandTerms}{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {t.educationTerms}
            </span>{" "}
            {t.disclaimerTerms}
          </span>
        </label>

        <button
          onClick={handleAnalyzeClick}
          disabled={!selectedFile || !agree || isCropping}
          className={`w-full sm:w-auto px-12 py-3.5 text-lg font-bold text-white rounded-xl shadow-lg transition-all transform flex items-center justify-center gap-2 ${
            !selectedFile || !agree || isCropping
              ? "bg-gray-300 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:-translate-y-1 hover:shadow-xl shadow-blue-500/30"
          }`}
        >
          {t.analyzeBtn}
          {!(!selectedFile || !agree) && (
            <UploadCloud size={20} className="animate-bounce" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
