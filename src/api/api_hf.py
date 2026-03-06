from fastapi import FastAPI, File, UploadFile
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import torch
import torch.nn as nn
from torchvision import transforms
from torchvision.models import efficientnet_b2
import io
import os
from pathlib import Path
import traceback

app = FastAPI()

# เปิด CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# กำหนด Class Names (ต้องตรงกับตอนเทรนเป๊ะๆ)
CLASS_NAMES = [
    "Actinic keratosis",
    "Basal cell carcinoma",
    "Dermatofibroma",
    "Eczema",
    "Melanoma",
    "Nevus",
    "Seborrheic keratosis",
    "Squamous cell carcinoma",
    "Tinea",
    "Vascular lesion",
]


# 1. แก้ไข Model Architecture สำหรับ EfficientNet-B2
def create_model(num_classes=10):
    model = efficientnet_b2(weights=None)
    in_features = model.classifier[1].in_features
    model.classifier[1] = nn.Linear(in_features, num_classes)
    return model


# โหลด Device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# สร้าง Model instance
model = create_model(num_classes=len(CLASS_NAMES))

# 2. 🌟 แก้ไขระบบตรวจสอบและโหลดไฟล์โมเดล
MODEL_FILENAME = "skindee_final_model.pth"
model_path = Path(MODEL_FILENAME)
BASE_DIR = Path(__file__).resolve().parent if "__file__" in locals() else Path.cwd()

if not model_path.exists():
    print(f"⚠️ Model file not found at: {model_path.absolute()}")
    print(f"📁 Current directory: {os.getcwd()}")
else:
    print(f"✅ Loading model from: {model_path.absolute()}")
    try:
        # โหลด weights ลงโมเดลทีเดียวให้จบ
        state_dict = torch.load(model_path, map_location=device)
        model.load_state_dict(state_dict)
        print("✅ Model loaded successfully!")
    except Exception as e:
        print(f"❌ Fatal Error loading model: {e}")

model.to(device)
model.eval()

# 3. Image Preprocessing (EfficientNet-B2 = 260x260)
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
        "model_exists": model_path.exists(),
    }


@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return Response(content=b"", media_type="image/x-icon")


if __name__ == "__main__":
    import uvicorn

    print(f"Starting server...")
    print(f"Device: {device}")
    uvicorn.run(app, host="0.0.0.0", port=8000)
