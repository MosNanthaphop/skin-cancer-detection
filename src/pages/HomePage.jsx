import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      {/* Hero Section */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 mb-6">
            SkinDee
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            Describe your skin concerns, and our AI-powered platform will
            provide you with personalized insights and recommendations.
          </p>
          <button
            onClick={() => navigate("/upload")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:shadow-lg cursor-pointer"
          >
            Try now
          </button>
        </div>
      </section>

      {/* Divider - เส้นแบ่งบางๆ */}
      <div className="max-w-6xl mx-auto px-8">
        <hr className="border-t border-gray-300" />
      </div>

      {/* How It Works Section */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            How it works
          </h2>

          {/* Steps Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Step 1 */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-200">
              <div className="mb-4">
                <h3 className="text-5xl font-bold text-blue-600 mb-2">1</h3>
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Step 1</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Upload a photo of your skin concern.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-200">
              <div className="mb-4">
                <h3 className="text-5xl font-bold text-blue-600 mb-2">2</h3>
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Step 2</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our AI analyzes the image and provides insights.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-200">
              <div className="mb-4">
                <h3 className="text-5xl font-bold text-blue-600 mb-2">3</h3>
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Step 3</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Receive personalized recommendations.
              </p>
            </div>
          </div>

          {/* Additional Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center max-w-3xl mx-auto">
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
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-3xl mx-auto ">
            <p className="text-sm text-yellow-800 text-center">
              ⚠️ This is an educational tool. Please consult a healthcare
              professional for medical advice.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
