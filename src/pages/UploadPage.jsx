import { useState } from "react";
import ImageUploader from "../components/ImageUploader";

const UploadPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async (file) => {
    setIsLoading(true);
    setResult(null);

    try {
      // สร้าง FormData
      const formData = new FormData();
      formData.append("file", file);

      // ส่งไปที่ API
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
        console.log("Result:", data);
      } else {
        alert("เกิดข้อผิดพลาด: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <section className="py-16 px-8">
        <ImageUploader onAnalyze={handleAnalyze} />
      </section>

      {/* Loading */}
      {isLoading && (
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-7"></div>
          <p className="text-gray-600">กำลังวิเคราะห์รูปภาพ...</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="max-w-xl mx-auto mt-6 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">ผลการวิเคราะห์ (Test)</h2>
            <div className="mb-4">
              <p className="text-gray-600 mb-2">การวินิจฉัย:</p>
              <p className="text-3xl font-bold text-blue-600">
                {result.prediction}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-gray-600 mb-2">ความมั่นใจ:</p>
              <p className="text-2xl font-semibold">{result.confidence}%</p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">รายละเอียดทั้งหมด:</p>
              <div className="space-y-2">
                {Object.entries(result.all_predictions).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-gray-700">{key}:</span>

                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2 f">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold">{value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ ผลการวินิจฉัยนี้เป็นเพียงการประเมินเบื้องต้นเท่านั้น
                หากมีข้อสงสัยกรุณาปรึกษาแพทย์ผู้เชี่ยวชาญ
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
