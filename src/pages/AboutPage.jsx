import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  GraduationCap,
  Target,
  Layers,
  Send,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const AboutPage = () => {
  const { t } = useLanguage();
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitFeedback = () => {
    if (!feedback.trim()) return;
    // ตรงนี้สามารถต่อ API เพื่อส่งข้อมูลจริงได้
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFeedback("");
    }, 3000);
  };

  // Animation Variants
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 px-6 overflow-hidden">
        {/* Background Decorative Blob */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariant}
          className="max-w-6xl mx-auto relative z-10"
        >
          <motion.h1
            variants={itemVariant}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 dark:text-white"
          >
            {t.aboutTitle}{" "}
            <span className="text-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              SkinDee
            </span>
          </motion.h1>
          <motion.p
            variants={itemVariant}
            className="text-lg md:text-xl text-gray-600 mb-12 dark:text-gray-300 max-w-2xl"
          >
            {t.aboutSubtitle}
          </motion.p>

          {/* Two Column Layout - Objective & Scope */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Project Objective */}
            <motion.div
              variants={itemVariant}
              className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center dark:bg-blue-900/50 shadow-inner">
                  <Target className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {t.objTitle}
                </h2>
              </div>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                {t.objList &&
                  t.objList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
                      <span className="text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
              </ul>
            </motion.div>

            {/* Scope of the Project */}
            <motion.div
              variants={itemVariant}
              className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center dark:bg-purple-900/50 shadow-inner">
                  <Layers className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {t.scopeTitle}
                </h2>
              </div>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                {t.scopeDesc &&
                  t.scopeDesc.map((item, idx) => (
                    <p
                      key={idx}
                      className="text-base leading-relaxed border-l-4 border-purple-200 dark:border-purple-800 pl-4"
                    >
                      {item}
                    </p>
                  ))}
              </div>
            </motion.div>
          </div>

          {/* Project Info Box */}
          <motion.div
            variants={itemVariant}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8 mb-16 dark:from-gray-800 dark:to-gray-800 dark:border-gray-700"
          >
            <h3 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-3 dark:text-white">
              <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span>
              {t.infoTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <InfoItem label={t.infoTypeTitle} value={t.infoTypeVal} />
              <InfoItem
                label={t.infoStatusTitle}
                value={t.infoStatusVal}
                color="text-green-600 dark:text-green-400"
              />
              <InfoItem label={t.infoStartTitle} value={t.infoStartVal} />
              <InfoItem label={t.infoEndTitle} value={t.infoEndVal} />
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div variants={itemVariant} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 dark:text-white text-center md:text-left">
              {t.teamTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Student Card */}
              <TeamCard
                role={t.roleStudent}
                name={t.studentName}
                sub1={t.studentId}
                sub2={t.studentDept}
                icon={User}
                colorClass="blue"
              />
              {/* Advisor Card */}
              <TeamCard
                role={t.roleAdvisor}
                name={t.advisorName}
                sub1={t.advisorDept}
                sub2={t.advisorDept2}
                icon={GraduationCap}
                colorClass="orange"
              />
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div
            variants={itemVariant}
            className="mb-16 flex flex-wrap gap-3 justify-center md:justify-start"
          >
            <Tag color="blue">{t.tagDept}</Tag>
            <Tag color="blue">{t.tagFac}</Tag>
            <Tag color="blue">{t.tagYear}</Tag>
            <Tag color="green">{t.tagTech}</Tag>
          </motion.div>

          {/* Feedback Section */}
          <motion.div
            variants={itemVariant}
            className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl relative overflow-hidden dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-full blur-3xl opacity-50 -mr-10 -mt-10 dark:bg-yellow-900/30"></div>

            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 dark:text-white flex items-center gap-2">
                {t.feedTitle}
              </h2>
              <p className="text-gray-600 mb-6 dark:text-gray-300">
                {t.feedDesc}
              </p>
              <div className="relative">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder={t.feedPlaceholder}
                  disabled={isSubmitted}
                  className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-all shadow-inner disabled:opacity-50"
                />
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 dark:bg-gray-800/90 rounded-xl backdrop-blur-sm"
                  >
                    <CheckCircle2 className="w-12 h-12 text-green-500 mb-2" />
                    <span className="text-green-600 font-bold text-lg">
                      {t.feedThanks}
                    </span>
                  </motion.div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSubmitFeedback}
                  disabled={isSubmitted || !feedback.trim()}
                  className={`
                        font-semibold px-8 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-md
                        ${
                          isSubmitted || !feedback.trim()
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                            : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transform hover:-translate-y-0.5"
                        }
                    `}
                >
                  <Send className="w-4 h-4" />
                  {t.feedBtn}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

// --- Helper Components ---

const InfoItem = ({
  label,
  value,
  color = "text-gray-800 dark:text-white",
}) => (
  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm dark:bg-gray-700/50 dark:border-gray-600">
    <p className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
      {label}
    </p>
    <p className={`font-bold text-lg ${color}`}>{value}</p>
  </div>
);

const TeamCard = ({ role, name, sub1, sub2, icon: Icon, colorClass }) => {
  // Map string colors to Tailwind classes
  const colors = {
    blue: {
      bg: "bg-blue-100 dark:bg-blue-900/50",
      text: "text-blue-600 dark:text-blue-300",
      gradient:
        "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30",
    },
    orange: {
      bg: "bg-orange-100 dark:bg-orange-900/50",
      text: "text-orange-600 dark:text-orange-300",
      gradient:
        "from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30",
    },
  };
  const c = colors[colorClass] || colors.blue;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700 flex items-start sm:items-center gap-5">
      <div
        className={`w-20 h-20 bg-gradient-to-br ${c.gradient} rounded-full flex items-center justify-center flex-shrink-0 shadow-inner`}
      >
        <Icon className={`w-10 h-10 ${c.text}`} />
      </div>
      <div>
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold mb-2 ${c.bg} ${c.text}`}
        >
          {role}
        </div>
        <h4 className="font-bold text-gray-900 text-xl dark:text-white mb-1">
          {name}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">{sub1}</p>
        <p className="text-xs text-gray-400 mt-0.5 dark:text-gray-500">
          {sub2}
        </p>
      </div>
    </div>
  );
};

const Tag = ({ children, color }) => {
  const colorClasses =
    color === "green"
      ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-800/50" // [เพิ่ม] dark:hover
      : "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/50"; // [เพิ่ม] dark:hover

  return (
    <span
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-default ${colorClasses}`}
    >
      {children}
    </span>
  );
};

export default AboutPage;
