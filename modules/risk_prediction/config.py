MODEL_PATH = "models/risk_model.json"

FEATURES = [
    "weather_encoded",
    "temperature",
    "visibility_km",
    "wind_speed_kmh",
    "rainfall_mm",
    "train_speed_kmh",
    "track_condition_encoded",
    "track_age_days",
    "days_since_maintenance",
    "crowd_density_encoded",
    "hour_of_day",
    "is_night",
    "section_length_km",
    "historical_faults",
    "num_signals",
    "has_level_crossing",
    "curvature_deg",
    "gradient_pct",
]

WEATHER_MAP = {"sunny": 0, "cloudy": 1, "rainy": 2, "stormy": 3, "foggy": 4}
TRACK_COND_MAP = {"good": 0, "fair": 1, "poor": 2, "critical": 3}
CROWD_MAP = {"low": 0, "medium": 1, "high": 2, "critical": 3}
WEATHER_NAMES = {v: k for k, v in WEATHER_MAP.items()}
TRACK_NAMES = {v: k for k, v in TRACK_COND_MAP.items()}
CROWD_NAMES = {v: k for k, v in CROWD_MAP.items()}

RISK_THRESHOLDS = [
    (0, 20, "low", "No action required."),
    (20, 40, "moderate", "Monitor section routinely."),
    (40, 60, "elevated", "Schedule inspection within 24 hours."),
    (60, 80, "high", "Inspect within 2 hours."),
    (80, 101, "critical", "Immediate action required — stop traffic and dispatch emergency team."),
]
