// 1. Import 'motion' จาก framer-motion
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  // 2. สร้างตัวแปรสำหรับ Animation (Scroll-triggered)
  const fadeInOnScroll = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  // 3. [ใหม่] สร้างตัวแปรสำหรับ Animation ของ Hero Section
  const heroContainerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // หน่วงเวลาให้ลูกๆ (ตัวอักษร) ทำงานทีละตัว
      },
    },
  };

  // 4. [ใหม่] สร้างตัวแปรสำหรับ "ตัวอักษร" แต่ละตัว
  const heroLetterVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120 }, // เพิ่มสปริง!
    },
  };

  return (
    // Animation ทั้งหน้า (เหมือนเดิม)
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* 4. [แก้ไข] Animation ให้ h1 */}
          <motion.h1
            variants={heroContainerVariant} // ใช้ Variant ที่เป็น "ตู้คอนเทนเนอร์"
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl font-bold text-gray-800 mb-6"
          >
            {/* 5. [ใหม่] แตกคำว่า "SkinDee" ออกเป็นตัวอักษร แล้ว map */}
            {"SkinDee".split("").map((char, index) => (
              <motion.span key={index} variants={heroLetterVariant}>
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {/* 6. [แก้ไข] Animation ให้ p (เพิ่ม Spring) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.5, // หน่วงเวลาให้รอ h1 เสร็จก่อน
              type: "spring", // เพิ่มสปริง!
              stiffness: 100,
            }}
            className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto"
          >
            Describe your skin concerns, and our AI-powered platform will
            provide you with personalized insights and recommendations.
          </motion.p>

          {/* 7. [แก้ไข] Animation ให้ button (เพิ่ม Spring) */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.6, // หน่วงเวลาอีกนิด
              type: "spring", // เพิ่มสปริง!
              stiffness: 100,
            }}
            onClick={() => navigate("/upload")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-[background-color,box-shadow] duration-200 hover:shadow-lg cursor-pointer"
          >
            Try now
          </motion.button>
        </div>
      </section>
      {/* Divider - เส้นแบ่งบางๆ */}
      <div className="max-w-6xl mx-auto px-8">
        <hr className="border-t border-gray-300" />
      </div>
      {/* How It Works Section (เหมือนเดิม) */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            {...fadeInOnScroll}
            className="text-3xl font-bold text-gray-800 mb-8 text-center"
          >
            How it works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              {...fadeInOnScroll}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-200"
            >
              {/* ... Step 1 Content ... */}
              <div className="mb-4">
                <h3 className="text-5xl font-bold text-blue-600 mb-2">1</h3>
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Step 1</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Upload a photo of your skin concern.
              </p>
            </motion.div>

            <motion.div
              {...fadeInOnScroll}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-200"
            >
              {/* ... Step 2 Content ... */}
              <div className="mb-4">
                <h3 className="text-5xl font-bold text-blue-600 mb-2">2</h3>
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Step 2</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our AI analyzes the image and provides insights.
              </p>
            </motion.div>

            <motion.div
              {...fadeInOnScroll}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-200"
            >
              {/* ... Step 3 Content ... */}
              <div className="mb-4">
                <h3 className="text-5xl font-bold text-blue-600 mb-2">3</h3>
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Step 3</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Receive personalized recommendations.
              </p>
            </motion.div>
          </div>
          {/* Additional Info Box (เหมือนเดิม) */}
          <motion.div
            {...fadeInOnScroll}
            className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center max-w-3xl mx-auto"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Why Choose SkinDee?
            </h3>
            <div className="space-y-3 text-left max-w-xl mx-auto">
              <div className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">✓</span>
                <p className="text-sm text-gray-700">
                  <strong>100% Free</strong> - No hidden costs or subscriptions
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">✓</span>
                <p className="text-sm text-gray-700">
                  <strong>Secure & Private</strong> - Your data is protected
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">✓</span>
                <p className="text-sm text-gray-700">
                  <strong>AI-Powered</strong> - Advanced machine learning
                  technology
                </p>
              </div>
            </div>
          </motion.div>
          {/* Disclaimer */}
          {/* 12. [Scroll-Triggered] เพิ่ม Animation ให้ Disclaimer */}
          <motion.div
            {...fadeInOnScroll}
            className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-3xl mx-auto "
          >
            <p className="text-sm text-yellow-800 text-center">
              ⚠️ This is an educational tool. Please consult a healthcare
              professional for medical advice.
            </p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;
