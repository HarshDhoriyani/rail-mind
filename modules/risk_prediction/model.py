import numpy as np
import pandas as pd
import xgboost as xgb
from .config import (
    FEATURES, MODEL_PATH, WEATHER_NAMES, TRACK_NAMES, CROWD_NAMES, RISK_THRESHOLDS,
)


class RiskPredictor:
    def __init__(self, model_path: str = MODEL_PATH):
        self.model = xgb.XGBRegressor()
        self.model.load_model(model_path)
        self.feature_names = FEATURES

    def predict(self, input_data: dict) -> dict:
        df = pd.DataFrame([{k: input_data.get(k, 0) for k in self.feature_names}])
        score = float(self.model.predict(df)[0])
        score = round(np.clip(score, 0, 100), 1)

        importance = self._get_shap_approximation(df)
        category, recommendation = self._categorize(score)

        return {
            "risk_score": score,
            "risk_category": category,
            "recommendation": recommendation,
            "top_factors": importance,
        }

    @staticmethod
    def _baseline() -> dict:
        return {
            "weather_encoded": 0,
            "temperature": 25,
            "visibility_km": 10,
            "wind_speed_kmh": 0,
            "rainfall_mm": 0,
            "train_speed_kmh": 0,
            "track_condition_encoded": 0,
            "track_age_days": 0,
            "days_since_maintenance": 0,
            "crowd_density_encoded": 0,
            "hour_of_day": 12,
            "is_night": 0,
            "section_length_km": 1,
            "historical_faults": 0,
            "num_signals": 5,
            "has_level_crossing": 0,
            "curvature_deg": 0,
            "gradient_pct": 0,
        }

    def _get_shap_approximation(self, df: pd.DataFrame) -> list[dict]:
        contributions = []
        for col in self.feature_names:
            val = df[col].values[0]
            baseline_val = self._baseline()[col]
            if abs(val - baseline_val) < 1e-6:
                continue
            perturbed = df.copy()
            perturbed[col] = baseline_val
            actual_pred = float(self.model.predict(df)[0])
            baseline_pred = float(self.model.predict(perturbed)[0])
            effect = actual_pred - baseline_pred
            if abs(effect) > 0.5:
                contributions.append({
                    "feature": col,
                    "value": float(val),
                    "baseline": baseline_val,
                    "impact": round(effect, 2),
                })
        contributions.sort(key=lambda x: -abs(x["impact"]))
        return contributions[:5]

    def _categorize(self, score: float) -> tuple[str, str]:
        for lo, hi, cat, rec in RISK_THRESHOLDS:
            if lo <= score < hi:
                return cat, rec
        return "unknown", "Unable to determine."

    def describe_input(self, data: dict) -> str:
        lines = []
        w = WEATHER_NAMES.get(data.get("weather_encoded", -1), "unknown")
        t = TRACK_NAMES.get(data.get("track_condition_encoded", -1), "unknown")
        c = CROWD_NAMES.get(data.get("crowd_density_encoded", -1), "unknown")
        lines.append(f"Weather: {w}, Track: {t}, Crowd: {c}")
        lines.append(f"Speed: {data.get('train_speed_kmh', '?')} km/h")
        lines.append(f"Faults (history): {data.get('historical_faults', '?')}")
        lines.append(f"Days since maintenance: {data.get('days_since_maintenance', '?')}")
        lines.append(f"Visibility: {data.get('visibility_km', '?')} km")
        return " | ".join(lines)
