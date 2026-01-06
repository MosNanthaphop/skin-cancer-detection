// src/components/ResultPage.jsx
import { Download, ShieldAlert, AlertTriangle, Info } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

// Animation Variants
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

const ResultPage = ({ result, previewUrl }) => {
  const printRef = useRef(); // Ref สำหรับพื้นที่ที่จะ Export

  // --- Logic การแบ่ง Risk ---
  const predictionName = result.prediction.toLowerCase();

  const riskMap = new Map([
    ["melanoma", "high"],
    ["basal cell carcinoma", "high"],
    ["actinic keratosis", "high"],
    ["squamous cell carcinoma", "high"],
    ["nevus", "low"],
    ["seborrheic keratosis", "low"],
    ["dermatofibroma", "low"],
    ["vascular lesion", "low"],
    ["tinea", "low"],
    ["eczema", "low"],
  ]);

  const riskCategory = riskMap.get(predictionName) || "moderate";
  const riskStyles = {
    high: {
      level: "High Risk",
      conditionTitle: "Malignant",
      message:
        "There is a potential risk of skin cancer. Please consult a healthcare professional immediately for a definitive diagnosis and treatment plan.",
      bg: "bg-red-50 dark:bg-red-900",
      border: "border-red-200 dark:border-red-700",
      text: "text-red-700 dark:text-red-200",
      iconColor: "text-red-500 dark:text-red-200",
      Icon: ShieldAlert,
      titleBg: "bg-red-100 dark:bg-red-900",
      titleText: "text-red-700 dark:text-red-200",
    },
    moderate: {
      level: "Moderate Risk / Unknown",
      conditionTitle: "Detected Condition",
      message: `A condition (${result.prediction}) has been detected. Further observation or consultation with a specialist is recommended.`,
      bg: "bg-blue-50 dark:bg-blue-900",
      border: "border-blue-200 dark:border-blue-700",
      text: "text-blue-700 dark:text-blue-200",
      iconColor: "text-blue-500 dark:text-blue-200",
      Icon: AlertTriangle,
      titleBg: "bg-blue-100 dark:bg-blue-900",
      titleText: "text-blue-700 dark:text-blue-200",
    },
    low: {
      level: "Low Risk",
      conditionTitle: "Benign",
      message: `A condition (${result.prediction}) has been detected. This is generally considered benign (non-cancerous).`,
      bg: "bg-green-50 dark:bg-green-900",
      border: "border-green-200 dark:border-green-700",
      text: "text-green-700 dark:text-green-200",
      iconColor: "text-green-500 dark:text-green-200",
      Icon: Info,
      titleBg: "bg-green-100 dark:bg-green-900",
      titleText: "text-green-700 dark:text-green-200",
    },
  };
  const currentRisk = riskStyles[riskCategory];
  const dummyTreatments = [
    "Consult a dermatologist for a biopsy to confirm the diagnosis.",
    "Surgical excision is the primary treatment for early-stage melanoma.",
    "Further treatment may include immunotherapy, targeted therapy, or chemotherapy depending on the stage.",
    "Regular skin self-examinations and follow-up appointments are crucial.",
  ];
  const circleColorClass = "text-blue-500";

  // --- Animation State ---
  const [animatedConfidence, setAnimatedConfidence] = useState(0);
  const targetConfidence = Math.round(result.confidence);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedConfidence(targetConfidence);
    }, 300);
    return () => clearTimeout(timer);
  }, [targetConfidence]);

  // --- ฟังก์ชัน Export PDF (แก้ไขใหม่: ใช้ html-to-image) ---
  const handleExportPDF = async () => {
    const element = printRef.current;
    if (!element) return;

    try {
      // 1. แปลง DOM เป็นรูปภาพ PNG (รองรับสี oklch และ Modern CSS)
      const dataUrl = await toPng(element, {
        quality: 1.0,
        backgroundColor: "#ffffff", // บังคับพื้นหลังขาว
        filter: (node) => {
          // กรอง element ที่มี class 'export-exclude' ออก (เช่น ปุ่มกด)
          return !node.classList?.contains("export-exclude");
        },
      });

      // 2. สร้าง PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // 3. ใส่รูปลง PDF
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`SkinDee-Result-${Date.now()}.pdf`);
    } catch (error) {
      console.error("Export PDF Failed:", error);
      alert("Failed to export PDF. Please check console for details.");
    }
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto mb-16"
      variants={containerVariant}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-4xl font-bold text-gray-800 dark:text-white mb-6"
        variants={itemVariant}
      >
        Result
      </motion.h1>

      {/* พื้นที่ที่จะพิมพ์ (Print Area) */}
      <div ref={printRef} className="dark:bg-gray-900 p-1">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* คอลัมน์ซ้าย (เนื้อหาหลัก) */}
          <motion.div
            className="lg:col-span-3 flex flex-col gap-6"
            variants={itemVariant}
          >
            {/* การ์ด 1: ผลวินิจฉัย */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-1">
                  <div className="w-full aspect-square bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden border dark:border-gray-600">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Analyzed"
                        crossOrigin="anonymous"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400">Analyzed Image</span>
                    )}
                  </div>
                </div>

                <div className="md:col-span-1 text-center md:text-left">
                  <div className="mb-2">
                    <div
                      className={`inline-block rounded-lg px-3 py-1 text-sm font-medium ${currentRisk.titleBg} ${currentRisk.titleText}`}
                    >
                      {currentRisk.conditionTitle}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {result.prediction}
                  </h3>
                </div>

                <div className="md:col-span-1 flex justify-center">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-200 dark:text-gray-600"
                        strokeWidth="10"
                        stroke="#E5E7EB"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className={circleColorClass}
                        strokeWidth="10"
                        strokeDasharray={`${animatedConfidence * 2.51}, 251`}
                        strokeDashoffset="0"
                        stroke="#3B82F6"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                        style={{
                          transform: "rotate(-90deg)",
                          transformOrigin: "50% 50%",
                          transition: "stroke-dasharray 0.8s ease-out",
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className={`text-3xl text-gray-800 font-bold dark:text-white ${circleColorClass}`}
                      >
                        {Math.round(result.confidence)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* การ์ด 2: คำแนะนำ */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Treatment Recommendations
              </h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
                {dummyTreatments.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
              {result.all_predictions && (
                <>
                  <hr className="my-6 border-gray-200 dark:border-gray-700" />
                  <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                    All Predictions
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(result.all_predictions).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between items-center gap-4"
                        >
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {key}:
                          </span>
                          <div className="flex items-center gap-2 flex-1 max-w-[180px]">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${value}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 w-10 text-right">
                              {Math.round(value)}%
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* คอลัมน์ขวา (Sidebar) */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-6"
            variants={itemVariant}
          >
            {/* การ์ด 3: กล่อง Risk */}
            <div
              className={`p-5 rounded-lg border ${currentRisk.bg} ${currentRisk.border}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <currentRisk.Icon size={24} className={currentRisk.iconColor} />
                <h3 className={`text-xl font-bold ${currentRisk.text}`}>
                  {currentRisk.level}
                </h3>
              </div>
              <p className={`text-sm ${currentRisk.text}`}>
                {currentRisk.message}
              </p>
            </div>

            {/* การ์ด 4: Disclaimer */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
              <h4 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Disclaimer
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This analysis is for educational purposes only and is not a
                substitute for professional medical advice, diagnosis, or
                treatment.
              </p>
            </div>

            {/* ปุ่ม 5: Export */}
            {/* เพิ่ม class export-exclude เพื่อให้ filter กรองออก */}
            <div className="export-exclude">
              <button
                onClick={handleExportPDF}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition mt-4 cursor-pointer"
              >
                <Download size={18} />
                Export as PDF
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultPage;
