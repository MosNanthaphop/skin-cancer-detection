// src/pages/ResultPage.jsx
import {
  Download,
  ShieldAlert,
  AlertTriangle,
  Image as ImageIcon,
  CheckCircle,
  Activity,
  ArrowRight,
  Info,
  BookOpen,
  FileText,
  Quote,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { useLanguage } from "../context/LanguageContext";

// --- ข้อมูล Reference Images (เก็บไว้ที่เดิม) ---
const diseaseReferenceData = {
  melanoma: [
    "/public/assets/ref_mel/mel_01.jpg",
    "/public/assets/ref_mel/mel_02.jpg",
    "/public/assets/ref_mel/mel_03.jpg",
  ],
  "basal cell carcinoma": [
    "/public/assets/ref_bcc/bcc_01.png",
    "/public/assets/ref_bcc/bcc_02.jpg",
    "/public/assets/ref_bcc/bcc_03.jpg",
  ],
  "actinic keratosis": [
    "/public/assets/ref_akiec/akiec_01.jpg",
    "/public/assets/ref_akiec/akiec_02.jpg",
    "/public/assets/ref_akiec/akiec_03.jpeg",
  ],
  "squamous cell carcinoma": [
    "/public/assets/ref_scc/scc_01.jpg",
    "/public/assets/ref_scc/scc_02.jpg",
    "/public/assets/ref_scc/scc_03.png",
  ],
  nevus: [
    "/public/assets/ref_nv/nv_01.webp",
    "/public/assets/ref_nv/nv_02.jpg",
    "/public/assets/ref_nv/nv_03.jpg",
  ],
  "seborrheic keratosis": [
    "/public/assets/ref_sk/sk_01.jpg",
    "/public/assets/ref_sk/sk_02.jpg",
    "/public/assets/ref_sk/sk_03.jpg",
  ],
  dermatofibroma: [
    "/public/assets/ref_df/df_01.webp",
    "/public/assets/ref_df/df_02.jpg",
    "/public/assets/ref_df/df_03.jpg",
  ],
  "vascular lesion": [
    "/public/assets/ref_vasc/vasc_01.jpeg",
    "/public/assets/ref_vasc/vasc_02.jpg",
    "/public/assets/ref_vasc/vasc_03.jpg",
  ],
  tinea: [
    "/public/assets/ref_tn/tn_01.jpg",
    "/public/assets/ref_tn/tn_02.jpg",
    "/public/assets/ref_tn/tn_03.jpg",
  ],
  eczema: [
    "/public/assets/ref_ez/ez_01.webp",
    "/public/assets/ref_ez/ez_02.jpg",
    "/public/assets/ref_ez/ez_03.jpg",
  ],
};

const ResultPage = ({ result, previewUrl }) => {
  const { t, language } = useLanguage();
  const printRef = useRef();

  const predictionName = result.prediction.toLowerCase();
  const referenceImages = diseaseReferenceData[predictionName] || [];
  const specificTreatments =
    t.treatments?.[predictionName] || t.treatments?.default || [];
  const diseaseDetails = t.disease_info?.[predictionName];

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
      level: t.riskHigh,
      conditionTitle: t.riskHighTitle,
      message: t.riskHighMsg,
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-800",
      text: "text-red-700 dark:text-red-300",
      iconColor: "text-red-500 dark:text-red-400",
      Icon: ShieldAlert,
      titleBg: "bg-red-100 dark:bg-red-900",
      titleText: "text-red-700 dark:text-red-200",
    },
    moderate: {
      level: t.riskMod,
      conditionTitle: t.riskModTitle,
      message: t.riskModMsg,
      bg: "bg-orange-50 dark:bg-orange-900/20",
      border: "border-orange-200 dark:border-orange-800",
      text: "text-orange-700 dark:text-orange-300",
      iconColor: "text-orange-500 dark:text-orange-400",
      Icon: AlertTriangle,
      titleBg: "bg-orange-100 dark:bg-orange-900",
      titleText: "text-orange-700 dark:text-orange-200",
    },
    low: {
      level: t.riskLow,
      conditionTitle: t.riskLowTitle,
      message: t.riskLowMsg,
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
      text: "text-green-700 dark:text-green-300",
      iconColor: "text-green-500 dark:text-green-400",
      Icon: CheckCircle,
      titleBg: "bg-green-100 dark:bg-green-900",
      titleText: "text-green-700 dark:text-green-200",
    },
  };
  const currentRisk = riskStyles[riskCategory];

  const circleColorClass =
    riskCategory === "high"
      ? "text-red-500"
      : riskCategory === "moderate"
        ? "text-orange-500"
        : "text-green-500";
  const circleStroke =
    riskCategory === "high"
      ? "#EF4444"
      : riskCategory === "moderate"
        ? "#F97316"
        : "#22C55E";

  const [animatedConfidence, setAnimatedConfidence] = useState(0);
  const targetConfidence = Math.round(result.confidence);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedConfidence(targetConfidence);
    }, 300);
    return () => clearTimeout(timer);
  }, [targetConfidence]);

  // -------------------------------------------------------------
  // 🌟 ฟังก์ชัน Export PDF ใหม่: ปรับสมดุลแบบ แนวตั้ง (Portrait) 🌟
  // -------------------------------------------------------------
  const handleExportPDF = async () => {
    const element = printRef.current;
    if (!element) return;

    try {
      // 1. ซ่อนปุ่มที่ไม่ต้องการใน PDF
      const buttons = document.querySelectorAll(".export-exclude");
      buttons.forEach((el) => (el.style.display = "none"));

      // 2. บังคับ Light Mode ชั่วคราว (เพื่อไม่ให้ PDF มืด/เปลืองหมึก)
      const htmlElement = document.documentElement;
      const wasDarkMode = htmlElement.classList.contains("dark");
      if (wasDarkMode) htmlElement.classList.remove("dark");

      // 3. กำหนดความกว้างหน้าจอให้พอดีกับสัดส่วน A4 แนวตั้ง
      const originalWidth = element.style.width;
      const originalPadding = element.style.padding;
      element.style.width = "900px";
      element.style.padding = "20px";

      // 4. เริ่มขั้นตอนย้ายตำแหน่งการ์ดให้สมดุล (DOM Balancing)
      const gridContainer = document.getElementById("pdf-grid-container");
      const leftCol = document.getElementById("pdf-left-col");
      const rightCol = document.getElementById("pdf-right-col");
      const diseaseCard = document.getElementById("pdf-disease-card");
      const disclaimerBox = document.getElementById("pdf-disclaimer-box");

      // เก็บ CSS เดิมไว้เพื่อคืนค่า
      const origGridClass = gridContainer.className;
      const origLeftClass = leftCol.className;
      const origRightClass = rightCol.className;

      // บังคับ Grid เป็น 2 คอลัมน์ 50:50 ชั่วคราว
      gridContainer.className = "grid grid-cols-2 gap-6 items-start";
      leftCol.className = "flex flex-col gap-6";
      rightCol.className = "flex flex-col gap-6";

      // ย้ายการ์ด "รายละเอียดโรค" ไปฝั่งขวา (ก่อนกล่องข้อควรระวัง)
      if (diseaseCard && rightCol && disclaimerBox) {
        rightCol.insertBefore(diseaseCard, disclaimerBox);
      }

      // รอ Browser เรียง Layout ให้เสร็จ
      await new Promise((resolve) => setTimeout(resolve, 200));

      // 5. แคปหน้าจอด้วยความละเอียดสูง
      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        cacheBust: true,
        useCORS: true,
        allowTaint: true,
      });

      // 6. คืนสภาพหน้าเว็บกลับไปเหมือนเดิมทุกอย่างทันที
      gridContainer.className = origGridClass;
      leftCol.className = origLeftClass;
      rightCol.className = origRightClass;

      // ย้ายการ์ด "รายละเอียดโรค" กลับมาฝั่งซ้าย (ต่อจากการ์ดวิเคราะห์หลัก)
      if (diseaseCard && leftCol) {
        leftCol.insertBefore(diseaseCard, leftCol.children[1]);
      }

      element.style.width = originalWidth;
      element.style.padding = originalPadding;
      if (wasDarkMode) htmlElement.classList.add("dark");
      buttons.forEach((el) => (el.style.display = "block"));

      // 7. จัดการสร้าง PDF แนวตั้ง ("p" = Portrait)
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(dataUrl);

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const margin = 10;
      const maxW = pdfWidth - margin * 2;
      const maxH = pdfHeight - margin * 2;

      let finalWidth = maxW;
      let finalHeight = (imgProps.height * maxW) / imgProps.width;

      if (finalHeight > maxH) {
        finalHeight = maxH;
        finalWidth = (imgProps.width * maxH) / imgProps.height;
      }

      // จัดกึ่งกลางตรงกลางกระดาษเป๊ะๆ
      const xOffset = (pdfWidth - finalWidth) / 2;
      const yOffset = (pdfHeight - finalHeight) / 2;

      pdf.addImage(dataUrl, "PNG", xOffset, yOffset, finalWidth, finalHeight);
      pdf.save(`SkinDee-Result-${Date.now()}.pdf`);
    } catch (error) {
      console.error("Export PDF Failed:", error);
      const htmlElement = document.documentElement;
      if (
        !htmlElement.classList.contains("dark") &&
        localStorage.getItem("theme") === "dark"
      ) {
        htmlElement.classList.add("dark");
      }
      document
        .querySelectorAll(".export-exclude")
        .forEach((el) => (el.style.display = "block"));
      alert(
        "Failed to export PDF. Please try again or check your internet connection.",
      );
    }
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto mb-16 px-4 md:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 pt-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-1">
            {t.resTitle}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {t.resSubtitle}
          </p>
        </div>
        <div className="export-exclude">
          <button
            onClick={handleExportPDF}
            className="group flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all font-medium"
          >
            <Download
              size={18}
              className="group-hover:-translate-y-0.5 transition-transform"
            />
            {t.resExportBtn}
          </button>
        </div>
      </div>

      <div ref={printRef} className="bg-transparent dark:text-gray-100">
        {/* 👉 เพิ่ม ID ไว้สำหรับจัดระเบียบ Grid ตอนปริ้นท์ PDF */}
        <div
          id="pdf-grid-container"
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start"
        >
          {/* --- Column Left --- */}
          {/* 👉 เพิ่ม ID pdf-left-col */}
          <div id="pdf-left-col" className="lg:col-span-3 flex flex-col gap-8">
            {/* 1. Main Result Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden relative">
              <div
                className={`absolute top-0 right-0 w-64 h-64 ${currentRisk.bg} rounded-full blur-3xl opacity-50 -mr-16 -mt-16 pointer-events-none`}
              ></div>
              <div
                className={`h-1.5 w-full ${currentRisk.bg.replace("/20", "")} bg-opacity-100`}
              ></div>
              <div className="p-6 md:p-8 relative z-10">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  {/* Image Block */}
                  <div className="w-full md:w-5/12 aspect-square rounded-xl overflow-hidden border-2 border-gray-100 dark:border-gray-600 shadow-inner relative group bg-gray-50 dark:bg-gray-900">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Analyzed"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 py-1.5 backdrop-blur-sm rounded-b-[10px]">
                      <p className="text-white text-xs font-medium text-center shadow-sm tracking-wide">
                        {t.resAnalyzedImg}
                      </p>
                    </div>
                  </div>

                  {/* Result Details */}
                  <div className="flex-1 w-full flex flex-col items-center md:items-start text-center md:text-left gap-6">
                    <div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${currentRisk.titleBg} ${currentRisk.titleText}`}
                      >
                        <Activity size={12} />
                        {currentRisk.conditionTitle}
                      </span>
                      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-1 capitalize leading-tight">
                        {result.prediction}
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {t.resSkinDee}
                      </p>
                    </div>

                    {/* Confidence Gauge */}
                    <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700/30 p-3 rounded-xl border border-gray-100 dark:border-gray-600">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="transparent"
                            className="text-gray-200 dark:text-gray-600"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke={circleStroke}
                            strokeWidth="6"
                            fill="transparent"
                            strokeDasharray={175.9}
                            strokeDashoffset={
                              175.9 - (175.9 * animatedConfidence) / 100
                            }
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span
                            className={`text-sm font-bold ${circleColorClass}`}
                          >
                            {Math.round(result.confidence)}%
                          </span>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
                          {t.resConfidence}
                        </p>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          {t.resAiScore}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Disease Detail Info Section --- */}
            {/* 👉 เพิ่ม ID pdf-disease-card (ตัวนี้แหละที่โดนย้ายไปฝั่งขวาตอนปรินต์) */}
            {diseaseDetails && (
              <div
                id="pdf-disease-card"
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
                    <BookOpen
                      className="text-indigo-600 dark:text-indigo-400"
                      size={24}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white leading-none mb-1">
                      {diseaseDetails.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {language === "th"
                        ? "ข้อมูลจำเพาะและสาระน่ารู้"
                        : "Disease Information & Insights"}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {diseaseDetails.sections &&
                    diseaseDetails.sections.map((section, idx) => (
                      <div key={idx} className="group">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText
                            size={16}
                            className="text-gray-400 group-hover:text-indigo-500 transition-colors"
                          />
                          <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {section.title}
                          </h4>
                        </div>
                        <div className="pl-6 border-l-2 border-gray-100 dark:border-gray-700 group-hover:border-indigo-100 dark:group-hover:border-indigo-900/50 transition-colors">
                          {section.content && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-2 text-justify">
                              {section.content}
                            </p>
                          )}
                          {section.list && (
                            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1 bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg">
                              {section.list.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                </div>

                {diseaseDetails.source && (
                  <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-end gap-1.5 text-[10px] text-gray-400 dark:text-gray-500 italic">
                      <Quote size={10} className="transform rotate-180" />
                      <span>
                        {language === "th" ? "อ้างอิงข้อมูล:" : "Source:"}
                      </span>
                      {diseaseDetails.source_url ? (
                        <a
                          href={diseaseDetails.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium not-italic text-blue-500 hover:text-blue-600 hover:underline flex items-center gap-1 transition-colors"
                        >
                          {diseaseDetails.source} <ExternalLink size={9} />
                        </a>
                      ) : (
                        <span className="font-medium not-italic">
                          {diseaseDetails.source}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. Treatment Recommendations */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                  <CheckCircle
                    className="text-blue-600 dark:text-blue-400"
                    size={24}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white leading-none mb-1">
                    {t.resTreatTitle}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t.resTreatSteps}
                  </p>
                </div>
              </div>
              <div className="grid gap-3">
                {specificTreatments.length > 0 ? (
                  specificTreatments.map((item, index) => (
                    <div
                      key={index}
                      className="group flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/20 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors border border-transparent hover:border-blue-100 dark:hover:border-gray-600"
                    >
                      <span className="flex-shrink-0 w-6 h-6 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-xs font-bold shadow-sm border border-gray-100 dark:border-gray-600 mt-0.5 group-hover:scale-110 transition-transform">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No treatment info available.</p>
                )}
              </div>
            </div>

            {/* 3. Reference Images */}
            {referenceImages.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ImageIcon className="text-gray-400" size={20} />
                  <h3 className="text-base font-bold text-gray-800 dark:text-white">
                    {t.resRefImg}
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {referenceImages.map((imgSrc, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all cursor-pointer group relative"
                      onClick={() => window.open(imgSrc, "_blank")}
                    >
                      <img
                        src={imgSrc}
                        alt={`Ref ${index}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        crossOrigin="anonymous"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 mt-2 text-right flex justify-end gap-1 items-center">
                  <Info size={10} /> {t.resImgSource}
                </p>
              </div>
            )}
          </div>

          {/* --- Column Right (Sidebar - Sticky) --- */}
          {/* 👉 เพิ่ม ID pdf-right-col */}
          <div
            id="pdf-right-col"
            className="lg:col-span-2 flex flex-col gap-6 sticky top-24"
          >
            {/* Risk Analysis Box */}
            <div
              className={`rounded-2xl p-6 shadow-md border ${currentRisk.bg} ${currentRisk.border} relative overflow-hidden`}
            >
              <currentRisk.Icon
                className={`absolute -right-4 -bottom-4 w-32 h-32 opacity-10 ${currentRisk.iconColor} transform rotate-12`}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-2 rounded-full bg-white/50 dark:bg-black/20 backdrop-blur-md`}
                  >
                    <currentRisk.Icon
                      size={24}
                      className={currentRisk.iconColor}
                    />
                  </div>
                  <h3 className={`text-xl font-bold ${currentRisk.text}`}>
                    {currentRisk.level}
                  </h3>
                </div>
                <div className="bg-white/60 dark:bg-black/20 rounded-xl p-4 backdrop-blur-sm border border-white/20">
                  <p
                    className={`text-sm ${currentRisk.text} font-medium leading-relaxed`}
                  >
                    {currentRisk.message}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs opacity-70 font-medium">
                  <ArrowRight size={14} />
                  <span>{t.basedAI}</span>
                </div>
              </div>
            </div>

            {/* Disclaimer Box */}
            {/* 👉 เพิ่ม ID pdf-disclaimer-box */}
            <div
              id="pdf-disclaimer-box"
              className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-200 dark:border-gray-700/50"
            >
              <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <AlertTriangle size={14} />
                {t.resDisclaimerTitle}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed text-justify">
                {t.resDisclaimerText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultPage;
