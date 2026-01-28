import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import FAQPage from "./pages/FAQPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPage from "./pages/PrivacyPage";

function App() {
  return (
    <div className="font-notoThai">
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
