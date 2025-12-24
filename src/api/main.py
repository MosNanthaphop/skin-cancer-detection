from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import torch
import torch.nn as nn
from torchvision import transforms

# 1. เปลี่ยน Import เป็น efficientnet_b2
from torchvision.models import efficientnet_b2
import io
import os
from pathlib import Path

app = FastAPI()

# เปิด CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# กำหนด Class Names (ต้องตรงกับตอนเทรนเป๊ะๆ)
CLASS_NAMES = [
    "Actinic keratosis",
    "Basal cell carcinoma",
    "Seborrheic keratosis",
    "Dermatofibroma",
    "Eczema",
    "Melanoma",
    "Nevus",
    "Squamous cell carcinoma",
    "Tinea",
    "Vascular lesion",
]


# 2. แก้ไข Model Architecture สำหรับ EfficientNet-B2
def create_model(num_classes=5):
    # โหลดโครงสร้าง EfficientNet B2
    model = efficientnet_b2(weights=None)

    # EfficientNet จะใช้ชื่อ layer ว่า 'classifier'
    # โครงสร้างจะเป็น Sequential(Dropout, Linear) เราต้องแก้ตัว Linear (index 1)

    # ดึงจำนวน input features ของ layer สุดท้ายเดิมออกมา (สำหรับ B2 คือ 1408)
    in_features = model.classifier[1].in_features

    # เปลี่ยน layer สุดท้ายให้ตรงกับจำนวน class ของเรา
    model.classifier[1] = nn.Linear(in_features, num_classes)

    return model


# โหลด Device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# สร้าง Model instance
model = create_model(num_classes=len(CLASS_NAMES))

# หา path ของ model
BASE_DIR = Path(__file__).resolve().parent
model_path = BASE_DIR.parent.parent / "model" / "efficientnet_b2.pth"

# ตรวจสอบว่าไฟล์มีจริง
if not model_path.exists():
    print(f"⚠️ Model file not found at: {model_path}")
    print(f"📁 Current directory: {os.getcwd()}")
    print(f"📁 Script directory: {BASE_DIR}")
    # หมายเหตุ: ไม่ raise error ตรงนี้เพื่อให้ server start ได้ แต่จะทำนายไม่ได้ถ้าไม่มีไฟล์
    # raise FileNotFoundError(...)

print(f"✅ Loading model from: {model_path}")

# โหลด weights
try:
    if model_path.exists():
        # ลองโหลดแบบ weights_only=True ก่อน (ปลอดภัยกว่า)
        model.load_state_dict(
            torch.load(str(model_path), map_location=device, weights_only=True)
        )
        print("✅ Model loaded successfully!")
    else:
        print("❌ Model file does not exist, skipping load.")
except Exception as e:
    print(f"❌ Error loading model (weights_only=True): {e}")
    try:
        # ถ้าไม่ได้ ลองแบบปกติ
        model.load_state_dict(
            torch.load(str(model_path), map_location=device, weights_only=False)
        )
        print("⚠️ Model loaded with weights_only=False")
    except Exception as e2:
        print(f"❌ Fatal Error loading model: {e2}")

model.to(device)
model.eval()

# 3. Image Preprocessing
# EfficientNet-B2 แนะนำ resolution ที่ 260x260
# (แต่ถ้าตอนเทรนคุณใช้ 224 ก็ให้แก้เป็น 224 ครับ)
transform = transforms.Compose(
    [
        transforms.Resize((260, 260)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ]
)


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # อ่านรูปภาพ
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data)).convert("RGB")

        # Preprocess
        image_tensor = transform(image).unsqueeze(0).to(device)

        # Predict
        with torch.no_grad():
            outputs = model(image_tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
            confidence, predicted = torch.max(probabilities, 1)

        # แปลงเป็น Python types
        predicted_class = CLASS_NAMES[predicted.item()]
        confidence_score = confidence.item() * 100

        all_predictions = {
            CLASS_NAMES[i]: round(probabilities[0][i].item() * 100, 2)
            for i in range(len(CLASS_NAMES))
        }

        return {
            "success": True,
            "prediction": predicted_class,
            "confidence": round(confidence_score, 2),
            "all_predictions": all_predictions,
        }

    except Exception as e:
        import traceback

        print(f"Error in prediction: {traceback.format_exc()}")
        return {"success": False, "error": str(e)}


@app.get("/")
def read_root():
    return {
        "message": "SkinDee API is running (EfficientNet-B2)",
        "device": str(device),
        "classes": CLASS_NAMES,
    }


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "model_path": str(model_path),
        "model_exists": model_path.exists(),
    }


if __name__ == "__main__":
    import uvicorn

    print(f"🚀 Starting server...")
    print(f"🖥️  Device: {device}")
    uvicorn.run(app, host="localhost", port=8000)
