from fastapi import APIRouter, HTTPException
from .schemas import RiskInput, RiskOutput
from .model import RiskPredictor
from .config import MODEL_PATH

router = APIRouter(prefix="/risk", tags=["risk"])

_predictor: RiskPredictor | None = None


def get_predictor() -> RiskPredictor:
    global _predictor
    if _predictor is None:
        try:
            _predictor = RiskPredictor(MODEL_PATH)
        except Exception as e:
            raise RuntimeError(f"Failed to load risk model: {e}")
    return _predictor


@router.post("/predict", response_model=RiskOutput)
def predict_risk(data: RiskInput):
    predictor = get_predictor()
    result = predictor.predict(data.model_dump())
    return RiskOutput(**result)


@router.get("/health")
def health():
    return {"status": "ok", "module": "risk_prediction"}
