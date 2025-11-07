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
            {/* [Dark Mode] */}
            <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-white">
              Privacy Policy
            </h1>
            {/* [Dark Mode] */}
            <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
              <Calendar className="w-4 h-4" />
              <span>Last Updated: September 2025</span>
            </div>
          </div>

          {/* Quick Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {/* [Dark Mode] */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                {/* [Dark Mode] */}
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center dark:bg-green-900/50">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-300" />
                </div>
                {/* [Dark Mode] */}
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  100% Secure
                </h3>
              </div>
              {/* [Dark Mode] */}
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Your data is encrypted and protected
              </p>
            </div>

            {/* [Dark Mode] */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                {/* [Dark Mode] */}
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center dark:bg-blue-900/50">
                  <Eye className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                </div>
                {/* [Dark Mode] */}
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  No Tracking
                </h3>
              </div>
              {/* [Dark Mode] */}
              <p className="text-xs text-gray-600 dark:text-gray-300">
                We don't track your personal activities
              </p>
            </div>

            {/* [Dark Mode] */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                {/* [Dark Mode] */}
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center dark:bg-purple-900/50">
                  <Lock className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                </div>
                {/* [Dark Mode] */}
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  Private
                </h3>
              </div>
              {/* [Dark Mode] */}
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Your images are never stored permanently
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="mb-12">
            {/* [Dark Mode] */}
            <hr className="border-t border-gray-300 dark:border-gray-700" />
          </div>

          {/* Terms of Use Section */}
          {/* [Dark Mode] */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              {/* [Dark Mode] */}
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center dark:bg-blue-900/50">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-300" />
              </div>
              {/* [Dark Mode] */}
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Terms of Use
              </h2>
            </div>

            {/* [Dark Mode] */}
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed dark:text-gray-300">
              <p>
                ยินดีต้อนรับสู่ SkinDee
                การใช้บริการของเราถือว่าคุณยอมรับข้อกำหนดและเงื่อนไขการใช้งานทั้งหมด
                โปรดอ่านข้อกำหนดเหล่านี้อย่างละเอียดก่อนใช้บริการ
              </p>

              {/* [Dark Mode] */}
              <div className="pl-4 border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg dark:bg-gray-700">
                {/* [Dark Mode] */}
                <h3 className="font-semibold text-gray-800 mb-2 dark:text-white">
                  1. การใช้บริการ
                </h3>
                <p>
                  SkinDee เป็นเครื่องมือช่วยวิเคราะห์สภาพผิวเบื้องต้นเท่านั้น
                  ไม่ใช่การวินิจฉัยทางการแพทย์
                  ผู้ใช้ควรปรึกษาแพทย์ผู้เชี่ยวชาญสำหรับการรักษาที่เหมาะสม
                </p>
              </div>

              {/* [Dark Mode] */}
              <div className="pl-4 border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg dark:bg-gray-700">
                {/* [Dark Mode] */}
                <h3 className="font-semibold text-gray-800 mb-2 dark:text-white">
                  2. ความรับผิดชอบของผู้ใช้
                </h3>
                <p>
                  ผู้ใช้ต้องให้ข้อมูลที่ถูกต้องและรับผิดชอบต่อการใช้งานของตนเอง
                  การนำผลการวิเคราะห์ไปใช้เป็นความรับผิดชอบของผู้ใช้เอง
                </p>
              </div>

              {/* [Dark Mode] */}
              <div className="pl-4 border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg dark:bg-gray-700">
                {/* [Dark Mode] */}
                <h3 className="font-semibold text-gray-800 mb-2 dark:text-white">
                  3. ทรัพย์สินทางปัญญา
                </h3>
                <p>
                  เนื้อหา ดีไซน์ และฟีเจอร์ทั้งหมดของ SkinDee
                  เป็นทรัพย์สินของเรา ห้ามคัดลอก แจกจ่าย
                  หรือดัดแปลงโดยไม่ได้รับอนุญาต
                </p>
              </div>

              {/* [Dark Mode] */}
              <div className="pl-4 border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg dark:bg-gray-700">
                {/* [Dark Mode] */}
                <h3 className="font-semibold text-gray-800 mb-2 dark:text-white">
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
          {/* [Dark Mode] */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              {/* [Dark Mode] */}
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center dark:bg-yellow-900/50">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-300" />
              </div>
              {/* [Dark Mode] */}
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Disclaimer
              </h2>
            </div>

            {/* [Dark Mode] */}
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed dark:text-gray-300">
              {/* [Dark Mode] */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg dark:bg-yellow-900/50">
                {/* [Dark Mode] */}
                <p className="font-semibold text-yellow-800 mb-2 dark:text-yellow-200">
                  ⚠️ ข้อจำกัดความรับผิดชอบ
                </p>
                {/* [Dark Mode] */}
                <p className="dark:text-yellow-300">
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

              {/* [Dark Mode] */}
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg dark:bg-gray-700 dark:border-gray-600">
                {/* [Dark Mode] */}
                <h3 className="font-semibold text-gray-800 mb-2 dark:text-white">
                  ข้อยกเว้น:
                </h3>
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
          {/* [Dark Mode] */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              {/* [Dark Mode] */}
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center dark:bg-green-900/50">
                <Shield className="w-5 h-5 text-green-600 dark:text-green-300" />
              </div>
              {/* [Dark Mode] */}
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Data Privacy
              </h2>
            </div>

            {/* [Dark Mode] */}
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed dark:text-gray-300">
              {/* [Dark Mode] */}
              <h3 className="font-semibold text-gray-800 text-base dark:text-white">
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

              {/* [Dark Mode] */}
              <h3 className="font-semibold text-gray-800 text-base mt-6 dark:text-white">
                วิธีที่เราปกป้องข้อมูลของคุณ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* [Dark Mode] */}
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg dark:bg-green-900/50 dark:border-green-700">
                  {/* [Dark Mode] */}
                  <h4 className="font-semibold text-green-800 mb-2 dark:text-green-200">
                    🔒 Encryption
                  </h4>
                  {/* [Dark Mode] */}
                  <p className="text-xs dark:text-green-300">
                    ข้อมูลทั้งหมดถูกเข้ารหัสด้วย SSL/TLS
                  </p>
                </div>
                {/* [Dark Mode] */}
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg dark:bg-green-900/50 dark:border-green-700">
                  {/* [Dark Mode] */}
                  <h4 className="font-semibold text-green-800 mb-2 dark:text-green-200">
                    🗑️ Auto-Delete
                  </h4>
                  {/* [Dark Mode] */}
                  <p className="text-xs dark:text-green-300">
                    รูปภาพถูกลบทันทีหลังการวิเคราะห์
                  </p>
                </div>
                {/* [Dark Mode] */}
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg dark:bg-green-900/50 dark:border-green-700">
                  {/* [Dark Mode] */}
                  <h4 className="font-semibold text-green-800 mb-2 dark:text-green-200">
                    🚫 No Sharing
                  </h4>
                  {/* [Dark Mode] */}
                  <p className="text-xs dark:text-green-300">
                    เราไม่แชร์ข้อมูลกับบุคคลที่สาม
                  </p>
                </div>
                {/* [Dark Mode] */}
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg dark:bg-green-900/50 dark:border-green-700">
                  {/* [Dark Mode] */}
                  <h4 className="font-semibold text-green-800 mb-2 dark:text-green-200">
                    👁️ No Tracking
                  </h4>
                  {/* [Dark Mode] */}
                  <p className="text-xs dark:text-green-300">
                    ไม่มีการติดตามพฤติกรรมการใช้งาน
                  </p>
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
            {/* [Dark Mode] */}
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
