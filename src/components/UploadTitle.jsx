const UploadTitle = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto">
        {/* ส่วน Title และ p */}
        <h1 className="text-4xl font-bold text-center mb-3 dark:text-white">
          Upload your image
        </h1>
        <p className="text-center text-gray-600 text-base mb-9 dark:text-gray-300">
          คำแนะนำการถ่ายภาพ: ถ่ายภาพในที่ที่มีแสงสว่างและไม่ใกล้หรือไกลจนเกินไป{" "}
          <a href="#" className="text-blue-500 hover:underline">
            "อ่านรายละเอียดการถ่ายภาพ"
          </a>
        </p>
      </div>
    </div>
  );
};
export default UploadTitle;
