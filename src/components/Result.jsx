// src/components/Result.jsx
import { Download, ShieldAlert, AlertTriangle, Info } from "lucide-react";
import { motion } from "framer-motion"; // [เพิ่ม] 1. Import motion
import { useState, useEffect } from "react"; // [เพิ่ม] 2. Import useState และ useEffect

// [เพิ่ม] 3. สร้างตัวแปรสำหรับ Animation ของ Framer Motion
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // ทำให้การ์ดแต่ละใบปรากฏขึ้นทีละใบ
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 }, // เริ่มต้น: จางและอยู่ต่ำกว่า
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 }, // ใช้สปริงให้ดูเด้งเล็กน้อย
  },
};

const Result = ({ result, previewUrl }) => {
  // --- Logic การแบ่ง Risk (เหมือนเดิม) ---
  const predictionName = result.prediction.toLowerCase();

  const riskMap = new Map([
    ["melanoma", "high"],
    ["basal cell carcinoma", "high"],
    ["actinic keratosis", "high"],
    ["squamous cell carcinoma", "high"],
    ["nevus", "low"],
    ["benign keratosis", "low"],
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

  // --- [เพิ่ม] 4. State และ Effect สำหรับ Donut Animation ---
  const [animatedConfidence, setAnimatedConfidence] = useState(0);
  const targetConfidence = Math.round(result.confidence);

  useEffect(() => {
    // หน่วงเวลาเล็กน้อยเพื่อให้ CSS transition ทำงาน
    const timer = setTimeout(() => {
      setAnimatedConfidence(targetConfidence);
    }, 300); // เริ่ม animate หลังจาก 0.3 วินาที

    return () => clearTimeout(timer);
  }, [targetConfidence]); // ทำงานเมื่อ targetConfidence เปลี่ยน

  return (
    // [เพิ่ม] 5. ใช้ motion.div และ variants
    <motion.div
      className="max-w-6xl mx-auto mb-16"
      variants={containerVariant}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-4xl font-bold text-gray-800 dark:text-white mb-6"
        variants={itemVariant} // ใช้ itemVariant
      >
        Result
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* คอลัมน์ซ้าย (เนื้อหาหลัก) */}
        {/* [เพิ่ม] 6. ใช้ motion.div และ variants */}
        <motion.div
          className="lg:col-span-3 flex flex-col gap-6"
          variants={itemVariant}
        >
          {/* การ์ด 1: ผลวินิจฉัย (Diagnosis) */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* 1.1 รูปภาพ (ซ้ายสุด) */}
              <div className="md:col-span-1">
                <div className="w-full aspect-square bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden border dark:border-gray-600">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Analyzed"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">Analyzed Image</span>
                  )}
                </div>
              </div>

              {/* 1.2 ชื่อโรค (กลาง) */}
              <div className="md:col-span-1 text-center md:text-left">
                <div className="mb-2">
                  <div
                    className={`inline-block rounded-lg px-3 py-1 text-sm font-medium ${currentRisk.titleBg} ${currentRisk.titleText}`}
                  >
                    {currentRisk.conditionTitle}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
                  {result.prediction}
                </h3>
              </div>

              {/* 1.3 วงกลม Confidence (ขวาสุด) */}
              <div className="md:col-span-1 flex justify-center">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-gray-200 dark:text-gray-600"
                      strokeWidth="10"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className={circleColorClass}
                      strokeWidth="10"
                      // [เพิ่ม] 7. ใช้ animatedConfidence แทน result.confidence
                      strokeDasharray={`${animatedConfidence * 2.51}, 251`}
                      strokeDashoffset="0"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      style={{
                        transform: "rotate(-90deg)",
                        transformOrigin: "50% 50%",
                        // [เพิ่ม] 9. ตั้งค่า transition ให้ CSS (0.8 วินาที)
                        transition: "stroke-dasharray 0.8s ease-out",
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className={`text-3xl text-gray-800 font-bold dark:text-white ${circleColorClass}`}
                    >
                      {/* เรายังคงแสดงผล % จริงทันที */}
                      {Math.round(result.confidence)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* การ์ด 2: คำแนะนำ (Recommendations) */}
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
        {/* [เพิ่ม] 10. ใช้ motion.div และ variants */}
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
              treatment. Always seek the advice of your physician or other
              qualified health provider with any questions you may have
              regarding a medical condition.
            </p>
          </div>

          {/* ปุ่ม 5: Export */}
          <button
            onClick={() => alert("Export as PDF!")}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            <Download size={18} />
            Export as PDF
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Result;
