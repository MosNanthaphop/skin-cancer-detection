import { useState } from "react";
import { X } from "lucide-react";

const ImageUploader = ({ onAnalyze }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [agree, setAgree] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "image/jpeg" || file.type === "image/png") &&
      file.size <= 10 * 1024 * 1024
    ) {
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
    if (
      file &&
      (file.type === "image/jpeg" || file.type === "image/png") &&
      file.size <= 10 * 1024 * 1024
    ) {
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

  const removeImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-3">Upload your image</h1>
      <p className="text-center text-gray-600 text-base mb-9">
        คำแนะนำการถ่ายภาพ: ถ่ายภาพในที่ที่มีแสงสว่างและไม่ใกล้หรือไกลจนเกินไป{" "}
        <a href="#" className="text-blue-500 hover:underline">
          "อ่านรายละเอียดการถ่ายภาพ"
        </a>
      </p>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-10 mb-8 text-center transition ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <div className="relative inline-block">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-56 rounded-lg shadow-lg"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
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
            <h3 className="text-base font-semibold text-gray-800 mb-2">
              ลากและวางรูปภาพที่นี่
            </h3>
            <p className="text-gray-500 text-sm mb-1">หรือคลิกเพื่อเลือกไฟล์</p>
            <p className="text-xs text-gray-400 mb-3">
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

      {/* Terms Checkbox */}
      <div className="flex items-center justify-center gap-2 mb-5">
        <input
          type="checkbox"
          id="terms"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
        />
        <label htmlFor="terms" className="text-sm text-gray-600">
          "ฉันเข้าใจว่าและยอมรับว่าเครื่องมือนี้ไม่ใช่การวินิจฉัยทางการแพทย์"
        </label>
      </div>

      {/* Analyze Button */}
      <div className="text-center">
        <button
          onClick={handleAnalyze}
          className="px-10 py-2.5 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed enabled:cursor-pointer"
          disabled={!selectedFile || !agree}
        >
          Analyze
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
