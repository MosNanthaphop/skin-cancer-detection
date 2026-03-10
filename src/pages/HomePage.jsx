// src/pages/HomePage.jsx
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  UploadCloud,
  Activity,
  ShieldCheck,
  ArrowRight,
  BrainCircuit,
  ScanFace,
  Lock,
  Zap,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

import StatsSection from "../components/StatsSection";

const HomePage = () => {
  const { t } = useLanguage();

  // Animation Variants
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
      <section className="relative pt-20 pb-24 overflow-hidden">
        {/* Background Decoration */}
        <div
          className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            {/* Badge: Animated Shine Effect */}
            <motion.div variants={fadeInUp} className="mb-6">
              <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-700/50 overflow-hidden shadow-sm">
                <motion.div
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-400/20 dark:via-blue-400/30 to-transparent skew-x-[-20deg]"
                  initial={{ x: "-150%" }}
                  animate={{ x: "150%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "linear",
                    repeatDelay: 0.1,
                  }}
                />
                <div className="relative z-10 flex items-center gap-2 text-blue-700 dark:text-blue-200 text-sm font-semibold">
                  <BrainCircuit
                    size={16}
                    className="text-blue-600 dark:text-blue-400"
                  />
                  {t.heroBadge}
                </div>
              </div>
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
              className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-10"
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

            {/* [เปลี่ยนตรงนี้] ใส่ Section สถิติใหม่เข้าไปแทนอันเดิม */}
            <motion.div
              variants={fadeInUp}
              className="mb-20 w-full" // เพิ่มระยะห่างหน่อย
            >
              <div className="text-center mb-6">
                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 dark:text-gray-500 uppercase">
                  Real-time Community Impact
                </span>
              </div>
              <StatsSection />
            </motion.div>

            {/* Hero Auto Slider (Modified) */}
            <motion.div
              variants={fadeInUp}
              className="w-full max-w-6xl mx-auto"
            >
              <HeroSlider t={t} />
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

      {/* --- How it works --- */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {t.howItWorksTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
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

// --- Helper Components (เหมือนเดิม) ---

const HeroSlider = ({ t }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // 🌟 State สำหรับเช็คว่าหยุดเวลาอยู่หรือไม่

  const slides = [
    {
      id: 1,
      icon: <ScanFace size={48} />,
      title: t.slider1Title,
      desc: t.slider1Desc,
      bg: "bg-gradient-to-br from-blue-600 to-blue-400 dark:from-blue-800 dark:to-blue-600",
    },
    {
      id: 2,
      icon: <Zap size={48} />,
      title: t.slider2Title,
      desc: t.slider2Desc,
      bg: "bg-gradient-to-br from-teal-500 to-cyan-500 dark:from-teal-700 dark:to-cyan-700",
    },
    {
      id: 3,
      icon: <Lock size={48} />,
      title: t.slider3Title,
      desc: t.slider3Desc,
      bg: "bg-gradient-to-br from-indigo-600 to-purple-500 dark:from-indigo-800 dark:to-purple-700",
    },
  ];

  // 🌟 อัปเดต useEffect ให้ตรวจสอบค่า isPaused ก่อนตั้งเวลา
  useEffect(() => {
    let timer;
    if (!isPaused) {
      timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, 4000);
    }
    // ลบ interval ทิ้งทุกครั้งที่มีการกดหยุด หรือ component ถูกทำลาย
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [slides.length, isPaused]);

  const slideVariants = {
    enter: { x: "100%", opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  return (
    <div
      className="relative w-full h-80 sm:h-96 md:h-[300px] rounded-2xl overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 select-none cursor-grab active:cursor-grabbing"
      // 🌟 Event สำหรับ Desktop (คลิกเมาส์)
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
      onMouseLeave={() => setIsPaused(false)} // กันเหนียวกรณีลากเมาส์ออกนอกกล่อง
      // 🌟 Event สำหรับ Mobile (แตะหน้าจอ)
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onTouchCancel={() => setIsPaused(false)}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center transition-colors duration-300 ${slides[currentIndex].bg}`}
        >
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className=" mb-4 bg-white/25 p-3 rounded-full backdrop-blur-md shadow-inner"
          >
            {slides[currentIndex].icon}
          </motion.div>
          <motion.h3
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl font-bold mb-3 drop-shadow-sm"
          >
            {slides[currentIndex].title}
          </motion.h3>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-10 max-w-lg text-white/95 text-sm md:text-lg font-medium leading-relaxed"
          >
            {slides[currentIndex].desc}
          </motion.p>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation(); // ป้องกันการชนกับ Event กดค้างของกล่องแม่
              setCurrentIndex(index);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-8"
                : "bg-white/50 w-2 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -5, transition: { duration: 0 } }}
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
