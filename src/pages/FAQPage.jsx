// src/pages/FAQPage.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Shield, Zap, HelpCircle, ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const FAQPage = () => {
  const { t, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setOpenIndex(null);
  }, [selectedCategory, searchQuery, language]);

  const currentFaqs = t.faqList || [];

  // ดึง Category ทั้งหมดที่มีใน Data (ที่เป็นภาษาอังกฤษ เช่น General, Medical)
  const categories = ["All", ...new Set(currentFaqs.map((f) => f.category))];

  // [เพิ่ม] สร้าง Map สำหรับแปลงชื่อหมวดหมู่เป็นภาษาตาม Context
  const categoryLabels = {
    All: t.faqCatAll || "All",
    General: t.faqCatGeneral || "General",
    Medical: t.faqCatMedical || "Medical",
    Privacy: t.faqCatPrivacy || "Privacy",
    Usage: t.faqCatUsage || "Usage",
    Technical: t.faqCatTechnical || "Technical",
    Pricing: t.faqCatPricing || "Pricing",
  };

  const filteredFaqs = currentFaqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* --- Hero Section --- */}
      <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-gray-900 py-16 px-6 text-center text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-white rounded-full mix-blend-overlay blur-3xl"></div>
          <div className="absolute bottom-[-50px] right-[-50px] w-96 h-96 bg-blue-300 rounded-full mix-blend-overlay blur-3xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">
            {t.faqTitle}
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
            {t.faqSubtitle}
          </p>
        </motion.div>
      </section>

      {/* --- Main Content --- */}
      <div className="max-w-4xl mx-auto px-6 py-12 -mt-5 relative z-20">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-lg flex items-center mb-8 border border-gray-100 dark:border-gray-700"
        >
          <Search className="ml-4 text-gray-400 dark:text-gray-500 w-6 h-6" />
          <input
            type="text"
            placeholder={t.faqSearchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-transparent focus:outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 text-lg"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="mr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              ✕
            </button>
          )}
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-8 justify-center"
        >
          {categories.map((cat, idx) => (
            <button
              key={idx}
              // Logic การเลือกยังคงใช้ Key ภาษาอังกฤษ (General, Medical) เพื่อไม่ให้บั๊ก
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-md transform scale-105"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {/* [แก้ไข] แสดงผลโดยใช้คำที่แปลแล้ว */}
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <motion.div
          key={selectedCategory + searchQuery + language}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`mt-1 flex-shrink-0 p-2 rounded-full ${
                        faq.category === "Privacy"
                          ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                          : faq.category === "Medical"
                            ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                            : faq.category === "Technical"
                              ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                              : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}
                    >
                      {faq.category === "Privacy" ? (
                        <Shield size={20} />
                      ) : faq.category === "Medical" ? (
                        <ActivityIcon size={20} />
                      ) : faq.category === "Technical" ? (
                        <Zap size={20} />
                      ) : (
                        <HelpCircle size={20} />
                      )}
                    </span>
                    <div>
                      <div className="text-lg font-semibold text-gray-800 dark:text-white">
                        {faq.question}
                      </div>
                      <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        {/* [แก้ไข] แสดงหมวดหมู่ภาษาไทยตรงนี้ด้วย */}
                        {categoryLabels[faq.category] || faq.category}
                      </span>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 ml-4 text-gray-400 dark:text-gray-500"
                  >
                    <ChevronDown size={24} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pl-[4.5rem] pt-0">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700"
            >
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">
                {t.faqNoResults} "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-3 text-blue-600 hover:text-blue-700 font-medium"
              >
                {t.faqClearSearch}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Helper Icon for Medical category
const ActivityIcon = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

export default FAQPage;
