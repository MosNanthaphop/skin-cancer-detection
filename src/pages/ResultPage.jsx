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
  Sparkles,
  ScanLine,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { useLanguage } from "../context/LanguageContext";

// --- ข้อมูล Reference Images (Path ถูกแก้ให้ไม่มี /public) ---
const diseaseReferenceData = {
  melanoma: [
    "/assets/ref_mel/mel_01.jpg",
    "/assets/ref_mel/mel_02.jpg",
    "/assets/ref_mel/mel_03.jpg",
  ],
  "basal cell carcinoma": [
    "/assets/ref_bcc/bcc_01.png",
    "/assets/ref_bcc/bcc_02.jpg",
    "/assets/ref_bcc/bcc_03.jpg",
  ],
  "actinic keratosis": [
    "/assets/ref_akiec/akiec_01.jpg",
    "/assets/ref_akiec/akiec_02.jpg",
    "/assets/ref_akiec/akiec_03.jpeg",
  ],
  "squamous cell carcinoma": [
    "/assets/ref_scc/scc_01.jpg",
    "/assets/ref_scc/scc_02.jpg",
    "/assets/ref_scc/scc_03.png",
  ],
  nevus: [
    "/assets/ref_nv/nv_01.webp",
    "/assets/ref_nv/nv_02.jpg",
    "/assets/ref_nv/nv_03.jpg",
  ],
  "seborrheic keratosis": [
    "/assets/ref_sk/sk_01.jpg",
    "/assets/ref_sk/sk_02.jpg",
    "/assets/ref_sk/sk_03.jpg",
  ],
  dermatofibroma: [
    "/assets/ref_df/df_01.webp",
    "/assets/ref_df/df_02.jpg",
    "/assets/ref_df/df_03.jpg",
  ],
  "vascular lesion": [
    "/assets/ref_vasc/vasc_01.jpeg",
    "/assets/ref_vasc/vasc_02.jpg",
    "/assets/ref_vasc/vasc_03.jpg",
  ],
  tinea: [
    "/assets/ref_tn/tn_01.jpg",
    "/assets/ref_tn/tn_02.jpg",
    "/assets/ref_tn/tn_03.jpg",
  ],
  eczema: [
    "/assets/ref_ez/ez_01.webp",
    "/assets/ref_ez/ez_02.jpg",
    "/assets/ref_ez/ez_03.jpg",
  ],
};

// --- ชุดข้อมูลชื่อโรคภาษาไทย ---
const thaiDiseaseNames = {
  melanoma: "มะเร็งผิวหนังชนิดเมลาโนมา",
  "basal cell carcinoma": "มะเร็งผิวหนังชนิดเบซัลเซลล์",
  "actinic keratosis": "โรคผิวหนังจากแสงแดด",
  "squamous cell carcinoma": "มะเร็งผิวหนังชนิดสความัสเซลล์",
  nevus: "ไฝ หรือ ปาน",
  "seborrheic keratosis": "โรคกระเนื้อ",
  dermatofibroma: "เนื้องอกของเส้นใยในผิวหนัง",
  "vascular lesion": "รอยโรคหลอดเลือดผิวหนัง",
  tinea: "โรคกลากและเกลื้อน",
  eczema: "โรคผื่นภูมิแพ้ผิวหนังชนิดเอคซิม่า",
};

const ResultPage = ({ result, previewUrl }) => {
  const { t, language } = useLanguage();
  const printRef = useRef();

  const predictionName = result?.prediction?.toLowerCase() || "unknown";
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
  const targetConfidence = Math.round(result?.confidence || 0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedConfidence(targetConfidence);
    }, 300);
    return () => clearTimeout(timer);
  }, [targetConfidence]);

  // ------------------------------
  //  ฟังก์ชัน Export PDF
  // ------------------------------
  const handleExportPDF = async () => {
    const element = printRef.current;
    if (!element) return;

    try {
      const buttons = document.querySelectorAll(".export-exclude");
      buttons.forEach((el) => (el.style.display = "none"));

      const htmlElement = document.documentElement;
      const wasDarkMode = htmlElement.classList.contains("dark");
      if (wasDarkMode) htmlElement.classList.remove("dark");

      const originalWidth = element.style.width;
      const originalPadding = element.style.padding;
      element.style.width = "1000px";
      element.style.padding = "20px";

      // ---  DOM Manipulation สำหรับจัด Layout ก่อน Print  ---
      const gridContainer = document.getElementById("pdf-grid-container");
      const leftCol = document.getElementById("pdf-left-col");
      const rightCol = document.getElementById("pdf-right-col");
      const treatmentCard = document.getElementById("pdf-treatment-card");
      const uploadedImg = document.getElementById("pdf-uploaded-img-container");
      const mainCardFlex = document.getElementById("pdf-main-card-flex");
      const divider = document.getElementById("pdf-divider");
      const gaugeContainer = document.getElementById("pdf-gauge-container");
      const refImgGrid = document.getElementById("pdf-ref-img-grid");
      const resultDetails = document.getElementById("pdf-result-details");

      // ดึง element รูปภาพอ้างอิงทั้งหมดเพื่อบังคับสัดส่วน
      const refImgItems = document.querySelectorAll(".pdf-ref-img-item");

      // เก็บตำแหน่งเดิมของ treatmentCard เพื่อดึงกลับมาหลังปริ้นเสร็จ
      const origTreatmentParent = treatmentCard?.parentNode;
      const origTreatmentSibling = treatmentCard?.nextSibling;

      const origGridClass = gridContainer?.className || "";
      const origLeftClass = leftCol?.className || "";
      const origRightClass = rightCol?.className || "";
      const origUploadedImgClass = uploadedImg?.className || "";
      const origMainCardFlexClass = mainCardFlex?.className || "";
      const origDividerClass = divider?.className || "";
      const origGaugeContainerClass = gaugeContainer?.className || "";
      const origRefImgGridClass = refImgGrid?.className || "";
      const origResultDetailsClass = resultDetails?.className || "";

      const origRefImgItemsClasses = [];

      if (gridContainer)
        gridContainer.className = "grid grid-cols-5 gap-8 items-start";
      if (leftCol) leftCol.className = "col-span-3 flex flex-col gap-8";
      if (rightCol) rightCol.className = "col-span-2 flex flex-col gap-6";

      if (treatmentCard && rightCol) {
        rightCol.insertBefore(treatmentCard, rightCol.firstChild);
      }

      // ย่อขนาดรูปรอยโรคที่อัปโหลดให้พอดีในโหมด Desktop PDF
      if (uploadedImg)
        uploadedImg.className =
          "w-56 h-56 flex-shrink-0 aspect-square rounded-xl overflow-hidden border-2 border-gray-100 shadow-inner relative bg-gray-50 mb-4";

      // บังคับการเรียงตัวของ Main Card ด้านบนให้เรียงแนวนอน (Desktop Mode)
      if (mainCardFlex)
        mainCardFlex.className =
          "flex flex-row gap-8 items-center justify-between";
      if (resultDetails)
        resultDetails.className =
          "flex-1 w-full flex flex-col items-start text-left";
      if (divider) divider.className = "block w-px h-36 bg-gray-200 mx-2";
      if (gaugeContainer)
        gaugeContainer.className =
          "w-64 flex flex-col items-center justify-center flex-shrink-0 relative pr-4";
      if (refImgGrid) refImgGrid.className = "grid grid-cols-3 gap-4"; // รูปอ้างอิงเป็น 3 คอลัมน์

      refImgItems.forEach((el, idx) => {
        origRefImgItemsClasses[idx] = el.className;
        el.className =
          "pdf-ref-img-item aspect-square rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-600 relative";
      });

      // รอตอน Save PDF สักครู่เพื่อให้ DOM ปรับเรียบร้อยก่อนถ่ายภาพ (แก้บั๊กภาพขาวบางส่วน)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const isMobile = window.innerWidth < 768;
      const dataUrl = await toPng(element, {
        quality: 0.9,
        pixelRatio: isMobile ? 1 : 2,
        backgroundColor: "#ffffff",
        cacheBust: true,
        useCORS: true,
        allowTaint: true,
        style: {
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          transform: "none",
        },
      });

      if (gridContainer) gridContainer.className = origGridClass;
      if (leftCol) leftCol.className = origLeftClass;
      if (rightCol) rightCol.className = origRightClass;
      if (uploadedImg) uploadedImg.className = origUploadedImgClass;
      if (mainCardFlex) mainCardFlex.className = origMainCardFlexClass;
      if (divider) divider.className = origDividerClass;
      if (gaugeContainer) gaugeContainer.className = origGaugeContainerClass;
      if (refImgGrid) refImgGrid.className = origRefImgGridClass;
      if (resultDetails) resultDetails.className = origResultDetailsClass;

      // คืนค่า class ให้ Reference Images
      refImgItems.forEach((el, idx) => {
        el.className = origRefImgItemsClasses[idx];
      });

      // ดึง Treatment Card กลับมาไว้ที่คอลัมน์ซ้ายเหมือนเดิม
      if (origTreatmentParent && treatmentCard) {
        origTreatmentParent.insertBefore(treatmentCard, origTreatmentSibling);
      }

      element.style.width = originalWidth;
      element.style.padding = originalPadding;
      if (wasDarkMode) htmlElement.classList.add("dark");
      buttons.forEach((el) => (el.style.display = "block"));

      // --- สร้าง PDF ---
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

      // ดึง Treatment Card กลับมาที่เดิมในกรณีที่เกิด Error ระหว่างถ่ายภาพ
      const treatmentCard = document.getElementById("pdf-treatment-card");
      const leftCol = document.getElementById("pdf-left-col");
      if (treatmentCard && leftCol && treatmentCard.parentNode !== leftCol) {
        leftCol.appendChild(treatmentCard);
      }

      // คืนค่ารูปอ้างอิงให้กลับมาเป็นเหมือนเดิมเมื่อมี Error
      const refImgItems = document.querySelectorAll(".pdf-ref-img-item");
      refImgItems.forEach((el) => {
        el.className =
          "pdf-ref-img-item aspect-video sm:aspect-square rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all cursor-pointer group relative";
      });

      alert(
        `Failed to export PDF. Error: ${error.message || "Unknown error"}. Please try again.`,
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

      <div
        ref={printRef}
        className="bg-transparent dark:text-gray-100 flex flex-col gap-8"
      >
        {/* ======================================================== */}
        {/*  1. TOP SECTION: Main Result Card  */}
        {/* ======================================================== */}
        <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden relative">
          <div
            className={`absolute top-0 inset-x-0 h-2 ${currentRisk.bg.replace("/20", "")} bg-opacity-100 z-20`}
          ></div>

          <div
            className={`absolute top-0 right-0 w-80 h-80 ${currentRisk.bg} rounded-full blur-3xl opacity-30 -mr-20 -mt-20 pointer-events-none z-0`}
          ></div>

          <div className="p-6 md:p-8 relative z-10">
            <div
              id="pdf-main-card-flex"
              className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center justify-between"
            >
              {/* --- 1.1 Image Block --- */}
              <div
                id="pdf-uploaded-img-container"
                className="w-full sm:w-80 lg:w-64 flex-shrink-0 aspect-square rounded-xl overflow-hidden border-2 border-gray-100 dark:border-gray-600 shadow-inner relative group bg-gray-50 dark:bg-gray-900"
              >
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
                <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 backdrop-blur-sm rounded-b-[12px]">
                  <p className="text-white text-xs font-medium text-center tracking-wide">
                    {t.resAnalyzedImg}
                  </p>
                </div>
              </div>

              {/* --- 1.2 Result Details --- */}
              <div
                id="pdf-result-details"
                className="flex-1 w-full flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 ${currentRisk.titleBg} ${currentRisk.titleText}`}
                >
                  <Activity size={14} />
                  {currentRisk.conditionTitle}
                </span>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white capitalize leading-tight mb-1.5">
                  {result.prediction}
                </h2>

                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base font-semibold tracking-wide mb-5">
                  {thaiDiseaseNames[predictionName] || t.resSkinDee}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-[11px] font-semibold border border-indigo-100 dark:border-indigo-800 shadow-sm">
                    <Sparkles size={14} />
                    AI Deep Learning
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 rounded-lg text-[11px] font-semibold border border-gray-200 dark:border-gray-600 shadow-sm">
                    <ScanLine size={14} />
                    Pattern Analysis
                  </span>
                </div>
              </div>

              {/* เส้นคั่นตรงกลางจะโชว์แค่ในจอคอม (lg:block) */}
              <div
                id="pdf-divider"
                className="hidden lg:block w-px h-36 bg-gray-200 dark:bg-gray-700 mx-2"
              ></div>

              {/* --- 1.3 Confidence Gauge --- */}
              <div
                id="pdf-gauge-container"
                className="w-full lg:w-64 flex flex-col items-center justify-center flex-shrink-0 relative lg:pr-8"
              >
                <h3 className="text-gray-500 dark:text-gray-400 font-bold mb-3 uppercase tracking-wider text-xs flex items-center gap-1.5">
                  <Activity size={14} className={currentRisk.iconColor} />
                  {t.resAiScore}
                </h3>

                <div className="relative w-48 h-48 flex-shrink-0 z-10">
                  <svg
                    viewBox="0 0 120 120"
                    className="w-full h-full transform -rotate-90 drop-shadow-sm"
                  >
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="transparent"
                      className="dark:stroke-gray-700"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      stroke={circleStroke}
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray="327"
                      strokeDashoffset={
                        327 - (327 * (animatedConfidence || 0)) / 100
                      }
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span
                      className={`text-6xl font-black ${circleColorClass} tracking-tighter`}
                    >
                      {Math.round(result?.confidence || 0)}
                      <span className="text-3xl">%</span>
                    </span>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400 font-bold mt-1 uppercase tracking-widest">
                      {t.resConfidence}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/*  2. BOTTOM SECTION: Grid ซ้าย-ขวา  */}
        {/* ======================================================== */}
        <div
          id="pdf-grid-container"
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start"
        >
          {/* --- Column Left --- */}
          <div id="pdf-left-col" className="lg:col-span-3 flex flex-col gap-8">
            {/* Disease Detail Info Section */}
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

            {/* Treatment Recommendations */}
            <div
              id="pdf-treatment-card"
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6"
            >
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
          </div>

          {/* --- Column Right --- */}
          <div
            id="pdf-right-col"
            className="lg:col-span-2 flex flex-col gap-6 sticky top-24"
          >
            {/* Reference Images */}
            {referenceImages.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ImageIcon className="text-gray-400" size={20} />
                  <h3 className="text-base font-bold text-gray-800 dark:text-white">
                    {t.resRefImg}
                  </h3>
                </div>
                <div
                  id="pdf-ref-img-grid"
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  {referenceImages.map((imgSrc, index) => (
                    <div
                      key={index}
                      className="pdf-ref-img-item aspect-video sm:aspect-square rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all cursor-pointer group relative"
                      onClick={() => window.open(imgSrc, "_blank")}
                    >
                      <img
                        src={imgSrc}
                        alt={`Ref ${index}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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
