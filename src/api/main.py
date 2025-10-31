from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import torch
import torch.nn as nn
from torchvision import transforms
from torchvision.models import resnet18
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

# กำหนด Class Names (ปรับตามที่คุณเทรน)
CLASS_NAMES = [
    "Actinic keratosis",
    "Basal cell carcinoma",
    "Benign keratosis-like",
    "Dermatofibroma",
    "Eczema",
    "Melanoma",
    "Nevus",
    "Squamous cell carcinoma",
    "Tinea",
    "Vascular lesion",
]


# สร้าง Model Architecture
def create_model(num_classes=5):
    # ใช้ weights=None แทน pretrained=False
    model = resnet18(weights=None)
    model.fc = nn.Linear(model.fc.in_features, num_classes)
    return model


# โหลด Model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = create_model(num_classes=len(CLASS_NAMES))

# หา path ของ model (แก้ตามโครงสร้างโฟลเดอร์ของคุณ)
BASE_DIR = Path(__file__).resolve().parent
model_path = BASE_DIR.parent.parent / "model" / "first_model.pth"

# ตรวจสอบว่าไฟล์มีจริง
if not model_path.exists():
    print(f"⚠️ Model file not found at: {model_path}")
    print(f"📁 Current directory: {os.getcwd()}")
    print(f"📁 Script directory: {BASE_DIR}")
    raise FileNotFoundError(
        f"Model file not found. Please check the path: {model_path}"
    )

print(f"✅ Loading model from: {model_path}")

# โหลด model ด้วย weights_only=True (ปลอดภัยกว่า)
try:
    model.load_state_dict(
        torch.load(str(model_path), map_location=device, weights_only=True)
    )
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    # ถ้า weights_only=True ไม่ได้ ลองแบบเก่า
    model.load_state_dict(
        torch.load(str(model_path), map_location=device, weights_only=False)
    )
    print("⚠️ Model loaded with weights_only=False (less secure)")

model.to(device)
model.eval()

# Image Preprocessing
transform = transforms.Compose(
    [
        transforms.Resize((224, 224)),
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
        "message": "SkinDee API is running",
        "device": str(device),
        "model_loaded": model is not None,
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
    uvicorn.run(app, host="0.0.0.0", port=8000)
