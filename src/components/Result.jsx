// src/components/Result.jsx

// 1. รับ props ที่ชื่อ 'result'
const Result = ({ result }) => {
  return (
    // 2. นี่คือโค้ด JSX ทั้งหมดที่คุณต้องการแยกออกมา
    <div className="max-w-xl mx-auto mt-5">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
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
  );
};

export default Result;
