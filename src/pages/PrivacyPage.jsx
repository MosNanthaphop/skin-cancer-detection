// src/pages/PrivacyPage.jsx
import { motion } from "framer-motion";
import { Shield, Lock, FileX, Server, Eye, Mail } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const PrivacyPage = () => {
  const { t } = useLanguage();

  // ฟังก์ชันสำหรับการเลื่อนแบบนุ่มนวล (Smooth Scroll)
  const scrollToSection = (e, id) => {
    e.preventDefault(); // ป้องกันการกระโดดแบบแข็งๆ ของ Default Anchor
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* --- Hero Section --- */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900 py-20 px-6 text-center text-white overflow-hidden">
        {/* Abstract Background (ปรับให้ดูดีทั้ง 2 โหมด) */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay blur-[100px]"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-400 dark:bg-purple-900 rounded-full mix-blend-overlay blur-[100px]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-6 text-blue-100">
            <Shield size={16} /> {t.privLastUpdated}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
            {t.privTitle}
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t.privSubtitle}
          </p>
        </motion.div>
      </section>

      {/* --- Main Content --- */}
      <div className="max-w-5xl mx-auto px-6 py-12 -mt-16 relative z-20">
        {/* 1. Key Highlights */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <HighlightCard
            icon={FileX}
            title={t.privHigh1Title}
            desc={t.privHigh1Desc}
            color="red"
          />
          <HighlightCard
            icon={Eye}
            title={t.privHigh2Title}
            desc={t.privHigh2Desc}
            color="blue"
          />
          <HighlightCard
            icon={Lock}
            title={t.privHigh3Title}
            desc={t.privHigh3Desc}
            color="green"
          />
        </motion.div>

        {/* 2. Detailed Policy Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar / Navigation */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-24 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <Server size={20} className="text-blue-600" />
                Table of Contents
              </h3>
              <ul className="space-y-3">
                {t.privSections.map((section, idx) => (
                  <li key={idx}>
                    <a
                      href={`#section-${idx}`}
                      onClick={(e) => scrollToSection(e, `section-${idx}`)} // เพิ่ม Smooth Scroll
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors cursor-pointer block"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Content Text */}
          <motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-8 space-y-8"
          >
            {t.privSections.map((section, idx) => (
              <motion.div
                key={idx}
                id={`section-${idx}`}
                variants={itemVariant}
                // [แก้ไขจุดสำคัญ] เพิ่ม scroll-mt-32 เพื่อเว้นระยะด้านบนเวลา Scroll มาถึง
                className="scroll-mt-24 bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  {section.title}
                </h2>
                <div className="w-12 h-1 bg-blue-500 rounded-full mb-6"></div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Component: Highlight Card ---
const HighlightCard = ({ icon: Icon, title, desc, color }) => {
  const colorStyles = {
    red: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    green:
      "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center"
    >
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${colorStyles[color]}`}
      >
        <Icon size={28} />
      </div>
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
};

export default PrivacyPage;
