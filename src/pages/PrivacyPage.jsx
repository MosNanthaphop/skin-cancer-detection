import {
  Shield,
  Eye,
  Lock,
  FileText,
  AlertCircle,
  Calendar,
} from "lucide-react";

const PrivacyPage = () => {
  return (
    <div>
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Privacy Policy
            </h1>
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <Calendar className="w-4 h-4" />
              <span>Last Updated: September 2025</span>
            </div>
          </div>

          {/* Quick Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800">100% Secure</h3>
              </div>
              <p className="text-xs text-gray-600">
                Your data is encrypted and protected
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800">No Tracking</h3>
              </div>
              <p className="text-xs text-gray-600">
                We don't track your personal activities
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Private</h3>
              </div>
              <p className="text-xs text-gray-600">
                Your images are never stored permanently
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="mb-12">
            <hr className="border-t border-gray-300" />
          </div>

          {/* Terms of Use Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Terms of Use</h2>
            </div>

            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                ยินดีต้อนรับสู่ SkinDee
                การใช้บริการของเราถือว่าคุณยอมรับข้อกำหนดและเงื่อนไขการใช้งานทั้งหมด
                โปรดอ่านข้อกำหนดเหล่านี้อย่างละเอียดก่อนใช้บริการ
              </p>

              <div className="pl-4 border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  1. การใช้บริการ
                </h3>
                <p>
                  SkinDee เป็นเครื่องมือช่วยวิเคราะห์สภาพผิวเบื้องต้นเท่านั้น
                  ไม่ใช่การวินิจฉัยทางการแพทย์
                  ผู้ใช้ควรปรึกษาแพทย์ผู้เชี่ยวชาญสำหรับการรักษาที่เหมาะสม
                </p>
              </div>

              <div className="pl-4 border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  2. ความรับผิดชอบของผู้ใช้
                </h3>
                <p>
                  ผู้ใช้ต้องให้ข้อมูลที่ถูกต้องและรับผิดชอบต่อการใช้งานของตนเอง
                  การนำผลการวิเคราะห์ไปใช้เป็นความรับผิดชอบของผู้ใช้เอง
                </p>
              </div>

              <div className="pl-4 border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  3. ทรัพย์สินทางปัญญา
                </h3>
                <p>
                  เนื้อหา ดีไซน์ และฟีเจอร์ทั้งหมดของ SkinDee
                  เป็นทรัพย์สินของเรา ห้ามคัดลอก แจกจ่าย
                  หรือดัดแปลงโดยไม่ได้รับอนุญาต
                </p>
              </div>

              <div className="pl-4 border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  4. การเก็บรักษาข้อมูล
                </h3>
                <p>
                  เราไม่เก็บรูปภาพของคุณหลังจากการวิเคราะห์เสร็จสิ้น
                  ข้อมูลทั้งหมดจะถูกลบอัตโนมัติเพื่อความเป็นส่วนตัวของคุณ
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Disclaimer</h2>
            </div>

            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <p className="font-semibold text-yellow-800 mb-2">
                  ⚠️ ข้อจำกัดความรับผิดชอบ
                </p>
                <p>
                  SkinDee
                  เป็นเครื่องมือเพื่อการศึกษาและให้ข้อมูลเบื้องต้นเท่านั้น
                  ไม่ใช่อุปกรณ์ทางการแพทย์และไม่สามารถใช้แทนการวินิจฉัยจากแพทย์ได้
                </p>
              </div>

              <p>
                ผลการวิเคราะห์ที่ได้จากระบบ AI อาจไม่ถูกต้อง 100%
                เราไม่รับประกันความแม่นยำของผลลัพธ์และไม่รับผิดชอบต่อความเสียหายใดๆ
                ที่เกิดจากการใช้บริการของเรา
              </p>

              <p>
                หากคุณมีอาการผิดปกติหรือปัญหาสุขภาพผิวหนังที่รุนแรง
                กรุณาปรึกษาแพทย์ผู้เชี่ยวชาญโดยเร็วที่สุด
                อย่าใช้ผลการวิเคราะห์จาก SkinDee
                เป็นเกณฑ์เดียวในการตัดสินใจรักษา
              </p>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">ข้อยกเว้น:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>เราไม่รับผิดชอบต่อความเสียหายทางตรงหรือทางอ้อม</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>เราไม่รับประกันว่าบริการจะไม่มีข้อผิดพลาด</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>
                      ผู้ใช้ต้องรับผิดชอบในการตัดสินใจใช้ข้อมูลด้วยตนเอง
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Privacy Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Data Privacy</h2>
            </div>

            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <h3 className="font-semibold text-gray-800 text-base">
                ข้อมูลที่เราเก็บรวบรวม
              </h3>
              <p>เราเก็บข้อมูลน้อยที่สุดเท่าที่จำเป็นสำหรับการให้บริการ:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>
                    รูปภาพที่คุณอัพโหลด (ใช้ชั่วคระหว่างการวิเคราะห์เท่านั้น)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>ข้อมูลการใช้งานพื้นฐาน เช่น เวลาที่เข้าใช้งาน</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>ประวัติการวิเคราะห์ (ถ้าคุณเลือกบันทึก)</span>
                </li>
              </ul>

              <h3 className="font-semibold text-gray-800 text-base mt-6">
                วิธีที่เราปกป้องข้อมูลของคุณ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">
                    🔒 Encryption
                  </h4>
                  <p className="text-xs">
                    ข้อมูลทั้งหมดถูกเข้ารหัสด้วย SSL/TLS
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">
                    🗑️ Auto-Delete
                  </h4>
                  <p className="text-xs">รูปภาพถูกลบทันทีหลังการวิเคราะห์</p>
                </div>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">
                    🚫 No Sharing
                  </h4>
                  <p className="text-xs">เราไม่แชร์ข้อมูลกับบุคคลที่สาม</p>
                </div>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">
                    👁️ No Tracking
                  </h4>
                  <p className="text-xs">ไม่มีการติดตามพฤติกรรมการใช้งาน</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-8 text-white text-center shadow-lg max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-2">Questions About Privacy?</h3>
            <p className="text-blue-100 text-sm mb-6">
              If you have any questions about our privacy policy, please contact
              us
            </p>
            <button className="bg-white text-blue-600 font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-50 transition-all duration-200 cursor-pointer">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
