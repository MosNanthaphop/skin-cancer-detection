// src/utils/translations.js

export const translations = {
  th: {
    // --- General / Navbar ---
    appName: "SkinDee",
    home: "หน้าแรก",
    upload: "อัปโหลด",
    result: "ผลลัพธ์",
    faq: "คำถามที่พบบ่อย",
    about: "เกี่ยวกับเรา",
    privacy: "นโยบายความเป็นส่วนตัว",
    language: "English", // ข้อความบนปุ่มเพื่อสลับภาษา
    themeDark: "โหมดกลางคืน",
    themeLight: "โหมดกลางวัน",

    // --- Upload Page / ImageUploader ---
    uploadTop: "อัปโหลดรูปภาพของคุณ",
    uploadSuggest:
      "คำแนะนำการถ่ายภาพ: ถ่ายภาพในที่ที่มีแสงสว่างและไม่ใกล้หรือไกลจนเกินไป",
    uploadDetail: '"อ่านรายละเอียดการถ่ายภาพ"',
    uploadTitle: "อัปโหลดรูปภาพผิวหนัง",
    dragDrop:
      "ลากและวางรูปภาพที่นี่หรือคลิกเพื่อเลือกไฟล์ .jpg, .png (ขนาดไม่เกิน 10 MB)",
    chooseFile: "เลือกรูปภาพ",
    takePhoto: "ถ่ายภาพ",
    understandTerms: "ข้าพเจ้าเข้าใจและยอมรับว่าเครื่องมือนี้",
    educationTerms: "ใช้เพื่อการศึกษาเท่านั้น",
    disclaimerTerms: "ไม่ใช่การวินิจฉัยทางการแพทย์",
    analyzeBtn: "วิเคราะห์ผิวหนัง",
    alertTypeSize: "กรุณาเลือกไฟล์ JPG หรือ PNG ที่มีขนาดไม่เกิน 10 MB",
    alertCrop: "เกิดข้อผิดพลาดในการตัดรูปภาพ",
    alertNoFile: "กรุณาอัปโหลดรูปภาพก่อน",
    alertTerms: "กรุณายอมรับข้อกำหนดและเงื่อนไขการใช้งาน",
    cameraPlace: "วางตำแหน่งรอยโรคให้อยู่ในกรอบ",

    // --- Result Page ---
    resultTitle: "ผลการวิเคราะห์",
    analyzedImage: "รูปที่วิเคราะห์",
    confidence: "ความมั่นใจ",
    refImages: "รูปภาพตัวอย่างเพื่อเปรียบเทียบ",
    refDesc: "ตัวอย่างลักษณะของโรคนี้จากฐานข้อมูลสาธารณะ",
    treatmentTitle: "คำแนะนำเบื้องต้น",
    allPredictions: "ความเป็นไปได้อื่นๆ",
    disclaimerTitle: "ข้อควรระวัง (Disclaimer)",
    disclaimerText:
      "ผลลัพธ์นี้มีไว้เพื่อการศึกษาเท่านั้น ไม่สามารถใช้แทนคำแนะนำ การวินิจฉัย หรือการรักษาจากแพทย์ผู้เชี่ยวชาญได้ โปรดปรึกษาแพทย์หากมีความกังวลเกี่ยวกับอาการทางผิวหนัง",
    exportPdf: "บันทึกเป็น PDF",

    // --- Risk Levels & Messages ---
    risk: {
      high: "ความเสี่ยงสูง",
      moderate: "ความเสี่ยงปานกลาง / ไม่แน่ชัด",
      low: "ความเสี่ยงต่ำ",
      malignant: "มีความเสี่ยง (Malignant)",
      detected: "ตรวจพบเงื่อนไข",
      benign: "ไม่อันตราย (Benign)",
      msgHigh:
        "มีความเสี่ยงที่อาจเป็นมะเร็งผิวหนัง หรือรอยโรคที่ต้องได้รับการดูแล โปรดปรึกษาแพทย์ผู้เชี่ยวชาญทันทีเพื่อการวินิจฉัยที่แน่นอน",
      msgModerate:
        "ตรวจพบความผิดปกติ ควรเฝ้าระวังอาการหรือปรึกษาแพทย์เฉพาะทางเพื่อความแน่ใจ",
      msgLow: "ตรวจพบความผิดปกติ แต่อยู่ในกลุ่มที่มักไม่อันตราย (Benign)",
    },
  },
  en: {
    // --- General / Navbar ---
    appName: "SkinDee",
    home: "Home",
    upload: "Upload",
    result: "Result",
    faq: "FAQ",
    about: "About",
    privacy: "Privacy",
    language: "ภาษาไทย",
    themeDark: "Dark Mode",
    themeLight: "Light Mode",

    // --- Upload Page / ImageUploader ---
    uploadTop: "Upload your image",
    uploadSuggest:
      "Photo tips: Take the photo in a well-lit area, not too close or too far",
    uploadDetail: '"Read photo guidelines"',
    uploadTitle: "Upload your skin image",
    dragDrop: "Drag & drop or click to choose file .jpg, .png (Max 10 MB)",
    chooseFile: "Choose File",
    takePhoto: "Take Photo",
    understandTerms: "I understand and agree that this AI tool is for",
    educationTerms: "educational purposes only",
    disclaimerTerms: "and is not for medical diagnosis.",
    analyzeBtn: "Analyze Skin",
    alertTypeSize:
      "Please select a JPG or PNG file that is no larger than 10 MB",
    alertCrop: "Error cropping the image",
    alertNoFile: "Please upload an image first.",
    alertTerms: "Please accept the terms and conditions.",
    cameraPlace: "Place the lesion in the box",

    // --- Result Page ---
    resultTitle: "Analysis Result",
    analyzedImage: "Analyzed Image",
    confidence: "Confidence",
    refImages: "Reference Images for Comparison",
    refDesc: "Common examples of this condition from public datasets",
    treatmentTitle: "Treatment Recommendations",
    allPredictions: "All Predictions",
    disclaimerTitle: "Disclaimer",
    disclaimerText:
      "This analysis is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician.",
    exportPdf: "Export as PDF",

    // --- Risk Levels & Messages ---
    risk: {
      high: "High Risk",
      moderate: "Moderate Risk / Unknown",
      low: "Low Risk",
      malignant: "Malignant",
      detected: "Detected Condition",
      benign: "Benign",
      msgHigh:
        "There is a potential risk of skin cancer. Please consult a healthcare professional immediately for a definitive diagnosis.",
      msgModerate:
        "A condition has been detected. Further observation or consultation with a specialist is recommended.",
      msgLow:
        "A condition has been detected. This is generally considered benign (non-cancerous).",
    },
  },
};
