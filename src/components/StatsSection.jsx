// src/components/StatsSection.jsx
import { useState, useEffect } from "react";
import { ref, onValue, runTransaction } from "firebase/database";
import { db } from "../firebase";
import { Users, ScanLine, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const StatsSection = () => {
  const [visitors, setVisitors] = useState(0);
  const [analyses, setAnalyses] = useState(0);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage(); // Get translation object

  useEffect(() => {
    // 1. เชื่อมต่อ Firebase (ดึง 2 ค่าพร้อมกัน)
    const visitorRef = ref(db, "visitor_count");
    const analysisRef = ref(db, "analysis_count"); // Node ใหม่สำหรับนับจำนวนการตรวจ

    // Listener สำหรับ Visitor
    const unsubVisitor = onValue(visitorRef, (snapshot) => {
      setVisitors(snapshot.val() || 0);
    });

    // Listener สำหรับ Analysis
    const unsubAnalysis = onValue(analysisRef, (snapshot) => {
      setAnalyses(snapshot.val() || 0);
    });

    // Logic นับคนเข้าชม (เหมือนเดิม)
    const storageKey = "visited_skindee_firebase_v1";
    if (!localStorage.getItem(storageKey)) {
      localStorage.setItem(storageKey, "true");
      runTransaction(visitorRef, (current) => (current || 0) + 1);
    }

    setLoading(false);

    return () => {
      unsubVisitor();
      unsubAnalysis();
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 px-4">
      {/* --- Card 1: Total Visitors --- */}
      <StatCard
        icon={<Users size={32} className="text-blue-600 dark:text-blue-400" />}
        label={t.visitCount}
        value={visitors}
        loading={loading}
        color="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800"
      />

      {/* --- Card 2: AI Analyses Performed --- */}
      <StatCard
        icon={
          <ScanLine size={32} className="text-green-600 dark:text-green-400" />
        }
        label={t.scanCount} // ใช้คำว่า Scans Completed ดูดีกว่า Cancer Detected (เพราะบางคนอาจปกติ)
        value={analyses}
        loading={loading}
        color="bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800"
      />
    </div>
  );
};

// Sub-component สำหรับการ์ดแต่ละใบ
const StatCard = ({ icon, label, value, loading, color }) => (
  <motion.div
    // [แก้ไข 1] ปรับระยะ y และเพิ่ม scale นิดหน่อยให้ดูมีมิติขึ้น
    whileHover={{ y: -4, scale: 1.01 }}
    // [แก้ไข 2] เพิ่ม transition setting เพื่อบังคับความสมูท
    // ใช้ duration สั้นๆ (0.2s) และ easeOut เพื่อให้เริ่มเร็วและจบแบบนุ่มนวล
    transition={{ duration: 0.2, ease: "easeOut" }}
    // [แก้ไข 3] ลบ class "transition-all" ออก! (ตัวการทำหน่วง)
    // และเพิ่ม cursor-pointer ให้รู้ว่าชี้ได้
    className={`flex items-center justify-center gap-6 p-6 rounded-2xl border shadow-sm ${color} cursor-pointer`}
  >
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-inner transition-colors duration-300">
      {icon}
    </div>
    <div>
      <motion.h4
        // (Optional) เพิ่ม animation ให้ตัวเลขขยับนิดๆ ตอน hover
        transition={{ duration: 0.2 }}
        className="text-4xl font-bold text-gray-900 dark:text-white mb-1 font-mono tracking-tight"
      >
        {loading ? "..." : value.toLocaleString()}
      </motion.h4>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide transition-colors duration-300">
        {label}
      </p>
    </div>
  </motion.div>
);

export default StatsSection;
