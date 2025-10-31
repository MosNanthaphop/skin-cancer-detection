// src/components/Result.jsx
import { Download, ShieldAlert, AlertTriangle, Info } from "lucide-react";

const Result = ({ result, previewUrl }) => {
  // --- 1. [แก้ไข] Logic การแบ่ง Risk (ตามชื่อโรค) ---
  const predictionName = result.prediction.toLowerCase();
  console.log("Prediction Name:", predictionName);

  // สร้าง Map เพื่อกำหนดระดับความเสี่ยงของแต่ละโรค
  // (สำคัญ: คุณต้องอัปเดต list นี้ให้ตรงกับโรคที่ Model ของคุณทำนายได้)
  const riskMap = new Map([
    // กลุ่มเสี่ยงสูง (High Risk)
    ["melanoma", "high"],
    ["basal cell carcinoma", "high"],
    ["actinic keratosis", "้high"],
    ["squamous cell carcinoma", "high"],

    // กลุ่มเสี่ยงต่ำ (Low Risk)
    ["nevus", "low"],
    ["benign keratosis", "low"],
    ["dermatofibroma", "low"],
    ["vascular lesion", "low"],
    ["tinea", "low"],
    ["eczema", "low"],
  ]);

  // หา risk level (ถ้าไม่เจอใน Map ให้ถือว่าเป็น 'moderate' ไปก่อน)
  const riskCategory = riskMap.get(predictionName) || "moderate";

  // [ใหม่] สร้าง Object สำหรับเก็บ Styling และข้อความ
  const riskStyles = {
    high: {
      level: "High Risk",
      message:
        "There is a potential risk of skin cancer. Please consult a healthcare professional immediately for a definitive diagnosis and treatment plan.",
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
      iconColor: "text-red-500",
      Icon: ShieldAlert,
    },
    moderate: {
      level: "Unknown Risk",
      message: `A condition (${result.prediction}) has been detected. Further observation or consultation with a specialist is recommended.`,
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      iconColor: "text-blue-500",
      Icon: AlertTriangle,
    },
    low: {
      level: "Low Risk",
      message: `A condition (${result.prediction}) has been detected. This is generally considered benign (non-cancerous).`,
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-700",
      iconColor: "text-yellow-500",
      Icon: Info,
    },
  };

  // ดึง Style ปัจจุบัน
  const currentRisk = riskStyles[riskCategory];

  // (ตัวอย่าง) ข้อมูลคำแนะนำ (เหมือนเดิม)
  const dummyTreatments = [
    "Consult a dermatologist for a biopsy to confirm the diagnosis.",
    "Surgical excision is the primary treatment for early-stage melanoma.",
    "Further treatment may include immunotherapy, targeted therapy, or chemotherapy depending on the stage.",
    "Regular skin self-examinations and follow-up appointments are crucial.",
  ];

  const circleColorClass = "text-blue-500"; // สี Donut

  return (
    // --- 2. [แก้ไข] โครงสร้าง Layout หลัก (Grid 5 คอลัมน์) ---
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-6xl mx-auto mb-16">
      {/* ------------------------- */}
      {/* คอลัมน์ซ้าย (เนื้อหาหลัก) */}
      {/* [แก้ไข] เปลี่ยนเป็น col-span-3 (60%) */}
      {/* ------------------------- */}

      <div className="lg:col-span-3 flex flex-col gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-5">Result</h1>
        </div>
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
              <p className="text-sm text-gray-500 mb-1">Detected Condition</p>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
                {result.prediction}
              </h3>
            </div>

            {/* 1.3 วงกลม Confidence (ขวาสุด) */}
            <div className="md:col-span-1 flex justify-center">
              <div className="relative w-40 h-40">
                {/* ขนาด Donut */}
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
                    strokeDasharray={`${result.confidence * 2.51}, 251`}
                    strokeDashoffset="0"
                    // strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    style={{
                      transform: "rotate(-90deg)",
                      transformOrigin: "50% 50%",
                      transition: "stroke-dasharray 0.5s ease-out",
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className={`text-3xl text-gray-800 font-bold dark:text-white ${circleColorClass}`}
                  >
                    {Math.round(result.confidence)}%
                    {/* เปอร์เซ็นต์ (ไม่มีทศนิยม) */}
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
        </div>
      </div>

      {/* ------------------------- */}
      {/* คอลัมน์ขวา (Sidebar) */}
      {/* [แก้ไข] เปลี่ยนเป็น col-span-2 (40%) */}
      {/* ------------------------- */}
      <div className="lg:col-span-2 flex flex-col gap-6 mt-21">
        {/* การ์ด 3: กล่อง Risk (ใช้ Style จาก Object) */}
        <div
          className={`p-5 rounded-lg border ${currentRisk.bg} ${currentRisk.border}`}
        >
          <div className="flex items-center gap-3 mb-2">
            <currentRisk.Icon size={24} className={currentRisk.iconColor} />
            <h3 className={`text-xl font-bold ${currentRisk.text}`}>
              {currentRisk.level}
            </h3>
          </div>
          <p className={`text-sm ${currentRisk.text}`}>{currentRisk.message}</p>
        </div>

        {/* การ์ด 4: Disclaimer (เหมือนเดิม) */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
          <h4 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Disclaimer
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This analysis is for educational purposes only and is not a
            substitute for professional medical advice, diagnosis, or treatment.
            Always seek the advice of your physician or other qualified health
            provider with any questions you may have regarding a medical
            condition.
          </p>
        </div>

        {/* ปุ่ม 5: Export (เหมือนเดิม) */}
        <button
          onClick={() => alert("Export as PDF!")}
          className="w-50 mx-auto flex items-center justify-center gap-2 py-2.5 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          <Download size={18} />
          Export as PDF
        </button>
      </div>
    </div>
  );
};

export default Result;
