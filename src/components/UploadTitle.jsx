import { useLanguage } from "../context/LanguageContext";

const UploadTitle = () => {
  const { t } = useLanguage();
  return (
    <div>
      <div className="max-w-6xl mx-auto">
        {/* ส่วน Title และ p */}
        <h1 className="text-4xl font-bold text-center mb-3 dark:text-white">
          {t.uploadTop}
        </h1>
        <p className="text-center text-gray-600 text-base mb-9 dark:text-gray-300">
          {t.uploadSuggest}{" "}
          <a href="#" className="text-blue-500 hover:underline">
            {t.uploadDetail}
          </a>
        </p>
      </div>
    </div>
  );
};
export default UploadTitle;
