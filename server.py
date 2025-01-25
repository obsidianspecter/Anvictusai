import json
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import requests
import base64
import shutil
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, limit to your domain(s)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OLLAMA_API_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "test1"

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
logger.info("Upload directory initialized: %s", UPLOAD_DIR)

@app.post("/upload")
async def upload_image(image: UploadFile = File(...), message: str = Form(...)):
    """
    Endpoint to handle image uploads and process them with DeepSeek-R1 7B model via Ollama.
    Now with 'stream': false so the response is a single JSON object.
    """
    try:
        file_path = os.path.join(UPLOAD_DIR, image.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        
        logger.info("Image successfully saved: %s", file_path)

        with open(file_path, "rb") as img_file:
            base64_image = base64.b64encode(img_file.read()).decode("utf-8")

        logger.info("Image converted to base64")

        # Added "stream": False so Ollama returns a single JSON object
        payload = {
            "model": MODEL_NAME,
            "prompt": message,
            "image": base64_image,
            "stream": False  # <-- new line
        }

        logger.info("Sending request to Ollama API: %s", OLLAMA_API_URL)
        response = requests.post(OLLAMA_API_URL, json=payload, timeout=60)

        if response.status_code != 200:
            logger.error("Ollama API error: %s", response.text)
            raise HTTPException(status_code=500, detail="Error processing AI response")

        # Now we can parse a single JSON object
        response_data = response.json()
        result = response_data.get("response", "No analysis available")
        
        logger.info("Received AI response successfully")
        return {"result": result}

    except requests.exceptions.RequestException as req_err:
        logger.error("Error contacting Ollama API: %s", str(req_err))
        raise HTTPException(status_code=500, detail=f"Ollama API request failed: {str(req_err)}")
    except Exception as e:
        logger.error("General error: %s", str(e))
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@app.post("/chat")
async def chat(query: str = Form(...)):
    """
    Chat endpoint to interact with the DeepSeek-R1 7B model via Ollama.
    Disables streaming so only one final JSON object is returned.
    """
    try:
        # Also add "stream": False
        payload = {
            "model": MODEL_NAME,
            "prompt": query,
            "stream": False  # <-- new line
        }

        logger.info("Sending chat request to Ollama API")
        response = requests.post(OLLAMA_API_URL, json=payload, timeout=60)

        if response.status_code != 200:
            logger.error(f"Ollama API chat error: Status {response.status_code}, {response.text}")
            return JSONResponse(
                status_code=500,
                content={"error": f"Ollama API returned status {response.status_code}"}
            )

        # Now the response is a single JSON object, not multiple lines
        response_data = response.json()
        ai_response = response_data.get("response", "No response available")
        
        logger.info("Received chat response successfully")
        return {"response": ai_response}

    except requests.exceptions.RequestException as req_err:
        logger.error(f"Error contacting Ollama API for chat: {str(req_err)}")
        return JSONResponse(
            status_code=500,
            content={"error": f"Ollama API request failed: {str(req_err)}"}
        )
    except Exception as e:
        logger.error(f"General chat processing error: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"error": f"Error processing query: {str(e)}"}
        )

@app.get("/")
async def root():
    """
    Health check endpoint to verify the server is running.
    """
    logger.info("Health check requested")
    return {"message": "Visus AI backend is running with DeepSeek-R1 7B!"}

if __name__ == "__main__":
    logger.info("Starting FastAPI server on http://0.0.0.0:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)
