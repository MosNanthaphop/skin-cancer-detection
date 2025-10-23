import { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Search,
  Shield,
  Users,
  Zap,
  Mail,
  MessageCircle,
  Book,
  Video,
  HelpCircle,
} from "lucide-react";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      category: "General",
      question: "What is this tool?",
      answer:
        "นี่คือ SkinDee เป็นเครื่องมือที่ช่วยให้คุณดูแลสุขภาพผิวหนังได้อย่างรายงตาและสะดวกสบายพิเศษ เราใช้เทคโนโลยี AI เพื่อวิเคราะห์สภาพผิวของคุณและให้คำแนะนำส่วนบุคคลในการดูแลผิว",
    },
    {
      category: "General",
      question: "Who should use it?",
      answer:
        "SkinDee เหมาะสำหรับทุกคนที่ต้องการดูแลสุขภาพผิวหนัง ไม่ว่าจะเป็นผู้ที่มีปัญหาผิว ต้องการตรวจสอบอาการเบื้องต้น หรือแค่อยากทราบข้อมูลเกี่ยวกับสภาพผิวของตนเอง อย่างไรก็ตาม หากมีอาการรุนแรงควรปรึกษาแพทย์ผู้เชี่ยวชาญ",
    },
    {
      category: "Medical",
      question: "Is this a medical device?",
      answer:
        "ไม่ SkinDee เป็นเครื่องมือเพื่อการศึกษาและให้ข้อมูลเบื้องต้นเท่านั้น ไม่ใช่อุปกรณ์ทางการแพทย์และไม่สามารถใช้แทนการวินิจฉัยจากแพทย์ได้ ผลการวิเคราะห์ควรใช้เป็นข้อมูลประกอบการพิจารณาเท่านั้น หากมีข้อสงสัยหรือปัญหาสุขภาพ กรุณาปรึกษาแพทย์ผู้เชี่ยวชาญ",
    },
    {
      category: "Privacy",
      question: "Do you store my images or personal data?",
      answer:
        "เราให้ความสำคัญกับความเป็นส่วนตัวของคุณเป็นอย่างมาก รูปภาพที่คุณอัพโหลดจะถูกใช้เพื่อการวิเคราะห์เท่านั้นและจะไม่ถูกเก็บไว้ในระบบของเราหลังจากการวิเคราะห์เสร็จสิ้น เราไม่เก็บรวบรวมข้อมูลส่วนบุคคลใดๆ และไม่แชร์ข้อมูลของคุณกับบุคคลที่สาม",
    },
    {
      category: "Usage",
      question: "How do I get started?",
      answer:
        "การเริ่มต้นใช้งาน SkinDee ง่ายมาก เพียงอัพโหลดรูปภาพผิวของคุณในหน้า Upload ระบบจะวิเคราะห์และแสดงผลลัพธ์พร้อมคำแนะนำในการดูแลผิวที่เหมาะสม คุณสามารถดูประวัติการวิเคราะห์ทั้งหมดได้ในหน้า History",
    },
    {
      category: "Technical",
      question: "What image formats are supported?",
      answer:
        "SkinDee รองรับไฟล์รูปภาพทั่วไป เช่น JPG, JPEG, PNG และ WebP ขนาดไฟล์ไม่ควรเกิน 10 MB และควรมีความละเอียดที่ชัดเจนเพื่อผลการวิเคราะห์ที่แม่นยำ",
    },
    {
      category: "Technical",
      question: "How long does the analysis take?",
      answer:
        "โดยทั่วไปการวิเคราะห์ใช้เวลาเพียง 3-5 วินาที ขึ้นอยู่กับขนาดและคุณภาพของรูปภาพ ระบบ AI ของเราได้รับการออกแบบให้ทำงานได้รวดเร็วและมีประสิทธิภาพ",
    },
    {
      category: "Pricing",
      question: "Is SkinDee free to use?",
      answer:
        "ใช่ SkinDee ให้บริการฟรีสำหรับการใช้งานพื้นฐาน คุณสามารถอัพโหลดและวิเคราะห์รูปภาพได้โดยไม่มีค่าใช้จ่าย เป้าหมายของเราคือให้ทุกคนเข้าถึงเครื่องมือดูแลสุขภาพผิวได้ง่าย",
    },
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast Analysis",
      description: "Get results in seconds",
      color: "bg-yellow-50 text-yellow-600 border-yellow-200",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "100% Private",
      description: "Your data is secure",
      color: "bg-green-50 text-green-600 border-green-200",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "AI-Powered",
      description: "Advanced technology",
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      icon: <HelpCircle className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Always here to help",
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <section className="py-16 px-8">
        {/* Hero Section */}
        <div className="mb-10 max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Everything you need to know about SkinDee
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.color} border rounded-lg p-5 hover:shadow-md transition-all cursor-pointer`}
            >
              <div className="flex items-center gap-3 mb-2">
                {feature.icon}
                <h3 className="font-semibold">{feature.title}</h3>
              </div>
              <p className="text-sm opacity-80">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Content below */}
        <div className="max-w-6xl mx-auto">
          {/* Search Box */}
          <div className="max-w-xl mb-8 bg-white">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for answers"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-sm text-gray-600 mt-2">
                Found {filteredFaqs.length} result
                {filteredFaqs.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-auto mx-auto mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Common Questions
            </h2>
            <div className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                  >
                    {/* Question */}
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex-1">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded mb-2">
                          {faq.category}
                        </span>
                        <div className="text-base font-medium text-gray-800">
                          {faq.question}
                        </div>
                      </div>
                      <span className="ml-4 flex-shrink-0">
                        {openIndex === index ? (
                          <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 12H4"
                              />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-gray-600 rounded-full">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </div>
                        )}
                      </span>
                    </button>

                    {/* Answer */}
                    {openIndex === index && (
                      <div className="px-6 pb-6 pt-0">
                        <div className="pl-6 pt-4 border-t border-gray-200">
                          <div className="pl-6 pt-2 border-l-4 border-blue-500">
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">
                    No results found for "{searchQuery}"
                  </p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-3 text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="max-w-auto mx-auto mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Getting Started Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mb-3">
                  1
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Upload Photo
                </h3>
                <p className="text-sm text-gray-600">
                  Take a clear photo of your skin in good lighting
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mb-3">
                  2
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Get Analysis
                </h3>
                <p className="text-sm text-gray-600">
                  AI analyzes your skin and provides insights
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mb-3">
                  3
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Follow Tips
                </h3>
                <p className="text-sm text-gray-600">
                  Get personalized skincare recommendations
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-8 text-white shadow-lg">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">
                  Still have questions?
                </h3>
                <p className="text-blue-100">
                  Can't find the answer you're looking for? Our support team is
                  here to help.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-all duration-200 flex items-center gap-2 cursor-pointer">
                  <Mail className="w-4 h-4" />
                  Email Support
                </button>
                <button className="bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-800 transition-all duration-200 flex items-center gap-2 cursor-pointer">
                  <MessageCircle className="w-4 h-4" />
                  Live Chat
                </button>
              </div>
            </div>

            {/* Additional Resources */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <a
                href="#"
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex items-center gap-3"
              >
                <Book className="w-5 h-5 text-blue-500" />
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">
                    Documentation
                  </h4>
                  <p className="text-xs text-gray-600">Read detailed guides</p>
                </div>
              </a>
              <a
                href="#"
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex items-center gap-3"
              >
                <Video className="w-5 h-5 text-blue-500" />
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">
                    Video Tutorials
                  </h4>
                  <p className="text-xs text-gray-600">Watch how-to videos</p>
                </div>
              </a>
              <a
                href="#"
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex items-center gap-3"
              >
                <Users className="w-5 h-5 text-blue-500" />
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">
                    Community
                  </h4>
                  <p className="text-xs text-gray-600">Join discussions</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
