import uvicorn
from fastapi import FastAPI
from .router import router

app = FastAPI(title="RailMind - Risk Prediction", version="0.1.0")


@app.get("/")
def root():
    return {
        "service": "RailMind Risk Prediction",
        "endpoints": {
            "GET  /risk/health": "Health check",
            "POST /risk/predict": "Predict incident risk score",
        },
    }


app.include_router(router)


if __name__ == "__main__":
    uvicorn.run("modules.risk_prediction.app:app", host="0.0.0.0", port=8001, reload=True)
