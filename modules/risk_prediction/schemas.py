from pydantic import BaseModel, Field


class Factor(BaseModel):
    feature: str
    value: float
    impact: float


class RiskInput(BaseModel):
    weather_encoded: int = Field(default=0, ge=0, le=4, description="0=sunny 1=cloudy 2=rainy 3=stormy 4=foggy")
    temperature: float = Field(default=25, ge=-10, le=45)
    visibility_km: float = Field(default=5, ge=0.1, le=10)
    wind_speed_kmh: float = Field(default=10, ge=0, le=100)
    rainfall_mm: float = Field(default=0, ge=0, le=200)
    train_speed_kmh: float = Field(default=60, ge=0, le=160)
    track_condition_encoded: int = Field(default=0, ge=0, le=3, description="0=good 1=fair 2=poor 3=critical")
    track_age_days: float = Field(default=365, ge=0, le=3650)
    days_since_maintenance: float = Field(default=30, ge=0, le=365)
    crowd_density_encoded: int = Field(default=0, ge=0, le=3, description="0=low 1=medium 2=high 3=critical")
    hour_of_day: int = Field(default=12, ge=0, le=23)
    is_night: int = Field(default=0, ge=0, le=1)
    section_length_km: float = Field(default=2, ge=0.5, le=10)
    historical_faults: int = Field(default=0, ge=0, le=20)
    num_signals: int = Field(default=3, ge=1, le=10)
    has_level_crossing: int = Field(default=0, ge=0, le=1)
    curvature_deg: float = Field(default=2, ge=0, le=10)
    gradient_pct: float = Field(default=0, ge=-5, le=5)


class RiskOutput(BaseModel):
    risk_score: float = Field(..., ge=0, le=100)
    risk_category: str
    recommendation: str
    top_factors: list[Factor]
