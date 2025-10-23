import { User, GraduationCap, Target, Layers, Send } from "lucide-react";

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            About <span className="text-blue-600">SkinDee</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            AI-powered skin analysis platform for better skincare
          </p>

          {/* Two Column Layout - Objective & Scope */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Project Objective */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Project Objective
                </h2>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1 font-bold">•</span>
                  <span className="text-sm leading-relaxed">
                    พัฒนาระบบ AI
                    ที่สามารถวิเคราะห์และตรวจจับโรคผิวหนังได้อย่างแม่นยำ
                    เพื่อให้การดูแลสุขภาพผิวหนังที่รวดเร็วและเข้าถึงได้ง่าย
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1 font-bold">•</span>
                  <span className="text-sm leading-relaxed">
                    สร้างเครื่องมือที่ช่วยให้ผู้ใช้สามารถตรวจสอบสุขภาพผิวหนังเบื้องต้นได้ด้วยตนเอง
                    ก่อนปรึกษาแพทย์ผู้เชี่ยวชาญ
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1 font-bold">•</span>
                  <span className="text-sm leading-relaxed">
                    ใช้เทคโนโลยี Machine Learning และ Deep Learning
                    เพื่อให้ผลการวิเคราะห์ที่มีความน่าเชื่อถือ
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1 font-bold">•</span>
                  <span className="text-sm leading-relaxed">
                    ส่งเสริมการเข้าถึงบริการด้านสุขภาพผิวหนังสำหรับทุกคน
                    โดยไม่มีค่าใช้จ่าย
                  </span>
                </li>
              </ul>
            </div>

            {/* Scope of the Project */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Layers className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Scope of the Project
                </h2>
              </div>
              <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
                <p>
                  โปรเจกต์นี้พัฒนาโดยใช้เทคโนโลยี Web Application
                  ที่รองรับการทำงานบนอุปกรณ์ต่างๆ ทั้งคอมพิวเตอร์และมือถือ
                </p>
                <p>
                  ระบบสามารถตรวจจับโรคผิวหนังทั่วไป เช่น สิว ฝ้า กระ ผื่นแพ้
                  และโรคผิวหนังอื่นๆ โดยใช้ข้อมูลภาพที่ผู้ใช้อัพโหลดเข้ามา
                </p>
                <p>
                  ผลการวิเคราะห์จะแสดงเป็นเปอร์เซ็นต์ความมั่นใจและคำแนะนำเบื้องต้น
                  พร้อมข้อมูลเกี่ยวกับโรคที่ตรวจพบ
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mb-12 px-auto">
            <hr className="border-t border-gray-300" />
          </div>

          {/* Team Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Student */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Student</h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-base">
                      Nanthaphop Weerahong
                    </h4>
                    <p className="text-sm text-gray-500">
                      Student ID: 6510710084
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Computer Science
                    </p>
                  </div>
                </div>
              </div>

              {/* Advisor */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Advisor</h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-base">
                      Dr. Jane Smith
                    </h4>
                    <p className="text-sm text-gray-500">Professor</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Faculty of Science
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-500 rounded"></span>
              Project Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <p className="text-xs text-gray-500 mb-1">Project Type</p>
                <p className="font-semibold text-gray-800">Senior Project</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <p className="font-semibold text-green-600">In Development</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <p className="text-xs text-gray-500 mb-1">Start Date</p>
                <p className="font-semibold text-gray-800">July 2025</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <p className="text-xs text-gray-500 mb-1">Expected End</p>
                <p className="font-semibold text-gray-800">March 2026</p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                Department of Computer Science
              </span>
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                Faculty of Science
              </span>
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                Academic Year 2025
              </span>
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200 transition-colors">
                AI & Machine Learning
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="mb-12 px-auto">
            <hr className="border-t border-gray-300" />
          </div>

          {/* Feedback Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              We'd Love Your Feedback
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Help us improve SkinDee by sharing your thoughts and suggestions
            </p>
            <textarea
              placeholder="Share your thoughts with us..."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm mb-4"
            />
            <div className="flex justify-end">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 cursor-pointer hover:shadow-lg">
                <Send className="w-4 h-4" />
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
