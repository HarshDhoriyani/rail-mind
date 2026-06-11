import numpy as np
import pandas as pd
from .config import FEATURES


def generate_sample(n: int = 1, rng: np.random.Generator | None = None) -> pd.DataFrame:
    if rng is None:
        rng = np.random.default_rng()

    data = {
        "weather_encoded": rng.integers(0, 5, size=n),
        "temperature": rng.uniform(-10, 45, size=n),
        "visibility_km": rng.uniform(0.1, 10, size=n),
        "wind_speed_kmh": rng.uniform(0, 100, size=n),
        "rainfall_mm": rng.exponential(10, size=n).clip(0, 200),
        "train_speed_kmh": rng.uniform(0, 160, size=n),
        "track_condition_encoded": rng.integers(0, 4, size=n),
        "track_age_days": rng.uniform(0, 3650, size=n),
        "days_since_maintenance": rng.exponential(60, size=n).clip(0, 365),
        "crowd_density_encoded": rng.integers(0, 4, size=n),
        "hour_of_day": rng.integers(0, 24, size=n),
        "is_night": rng.binomial(1, 0.35, size=n),
        "section_length_km": rng.uniform(0.5, 10, size=n),
        "historical_faults": rng.poisson(2, size=n).clip(0, 20),
        "num_signals": rng.integers(1, 11, size=n),
        "has_level_crossing": rng.binomial(1, 0.3, size=n),
        "curvature_deg": rng.uniform(0, 10, size=n),
        "gradient_pct": rng.uniform(-5, 5, size=n),
    }
    return pd.DataFrame(data)


def compute_risk_score(df: pd.DataFrame, rng: np.random.Generator | None = None) -> np.ndarray:
    if rng is None:
        rng = np.random.default_rng()

    weather_contrib = np.select(
        [df["weather_encoded"] == 0, df["weather_encoded"] == 1,
         df["weather_encoded"] == 2, df["weather_encoded"] == 3,
         df["weather_encoded"] == 4],
        [0, 3, 8, 15, 12],
        default=0,
    )
    track_contrib = np.select(
        [df["track_condition_encoded"] == 0, df["track_condition_encoded"] == 1,
         df["track_condition_encoded"] == 2, df["track_condition_encoded"] == 3],
        [0, 5, 15, 25],
        default=0,
    )
    crowd_contrib = np.select(
        [df["crowd_density_encoded"] == 0, df["crowd_density_encoded"] == 1,
         df["crowd_density_encoded"] == 2, df["crowd_density_encoded"] == 3],
        [0, 5, 10, 15],
        default=0,
    )

    night_contrib = df["is_night"] * 8
    speed_contrib = (df["train_speed_kmh"] / 160) * 10
    maint_contrib = (df["days_since_maintenance"] / 365) * 10
    fault_contrib = df["historical_faults"] * 2
    visibility_contrib = np.maximum(0, (5 - df["visibility_km"])) * 2
    crossing_contrib = df["has_level_crossing"] * 5
    curvature_contrib = (df["curvature_deg"] / 10) * 5

    score = (
        10
        + weather_contrib
        + track_contrib
        + crowd_contrib
        + night_contrib
        + speed_contrib
        + maint_contrib
        + fault_contrib
        + visibility_contrib
        + crossing_contrib
        + curvature_contrib
        + rng.uniform(-5, 5, size=len(df))
    )
    return np.clip(score, 0, 100)


def generate_dataset(n: int, seed: int = 42) -> pd.DataFrame:
    rng = np.random.default_rng(seed)
    df = generate_sample(n, rng)
    df["risk_score"] = compute_risk_score(df, rng)
    return df
