import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UploadCloud,
  Activity,
  ShieldCheck,
  ArrowRight,
  BrainCircuit,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const HomePage = () => {
  const { t } = useLanguage();

  // Animation Variants (แบบนุ่มนวล)
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* --- Hero Section --- */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Decoration (Subtle Grid) */}
        <div
          className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Radial Gradient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold border border-blue-200 dark:border-blue-700/50">
                <BrainCircuit size={16} /> {t.heroBadge}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300"
            >
              {t.appName}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-10 leading-relaxed"
            >
              {t.heroDesc}
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 w-full justify-center"
            >
              <Link
                to="/upload"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5"
              >
                {t.upload} <ArrowRight size={20} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold transition-all"
              >
                {t.about}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section className="py-20 bg-white dark:bg-gray-800/50 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {t.featureTitle}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {t.featureSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<UploadCloud className="text-blue-500" size={32} />}
              title={t.feat1Title}
              desc={t.feat1Desc}
            />
            <FeatureCard
              icon={<Activity className="text-green-500" size={32} />}
              title={t.feat2Title}
              desc={t.feat2Desc}
            />
            <FeatureCard
              icon={<ShieldCheck className="text-indigo-500" size={32} />}
              title={t.feat3Title}
              desc={t.feat3Desc}
            />
          </div>
        </div>
      </section>

      {/* --- How it works (Simple Steps) --- */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {t.howItWorksTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 dark:bg-gray-700 z-0"></div>

            <StepItem number="1" title={t.step1Title} desc={t.step1Desc} />
            <StepItem number="2" title={t.step2Title} desc={t.step2Desc} />
            <StepItem number="3" title={t.step3Title} desc={t.step3Desc} />
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper: Feature Card (Design คล้ายหน้า Result)
const FeatureCard = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{
      y: -5,
      transition: { duration: 0.2 }, // [แก้ไข] กำหนด duration เป็น 0 คือเด้งทันทีไม่มีดีเลย์
    }}
    // [แก้ไข] ลบ class "transition-all" ออก เพื่อไม่ให้ CSS มาหน่วงเวลา
    className="p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md"
  >
    <div className="w-14 h-14 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
      {title}
    </h3>
    <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
      {desc}
    </p>
  </motion.div>
);

// Helper: Step Item
const StepItem = ({ number, title, desc }) => (
  <div className="flex flex-col items-center text-center relative z-10">
    <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full border-4 border-blue-50 dark:border-gray-700 flex items-center justify-center mb-6 shadow-sm">
      <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
        {number}
      </span>
    </div>
    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
      {title}
    </h3>
    <p className="text-gray-500 dark:text-gray-400 text-sm">{desc}</p>
  </div>
);

export default HomePage;
