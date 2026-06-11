import xgboost as xgb
import pandas as pd
from .config import FEATURES, MODEL_PATH


def train_model(df: pd.DataFrame, model_path: str = MODEL_PATH):
    X = df[FEATURES]
    y = df["risk_score"]

    model = xgb.XGBRegressor(
        n_estimators=300,
        max_depth=6,
        learning_rate=0.1,
        subsample=0.8,
        colsample_bytree=0.8,
        random_state=42,
        verbosity=1,
    )
    model.fit(X, y, eval_set=[(X, y)], verbose=False)
    model.save_model(model_path)
    return model


if __name__ == "__main__":
    from .data_generator import generate_dataset

    df = generate_dataset(10000, seed=42)
    print(f"Generated {len(df)} samples")
    print(f"Risk score range: {df['risk_score'].min():.1f} - {df['risk_score'].max():.1f}")
    print(f"Mean: {df['risk_score'].mean():.1f}, Std: {df['risk_score'].std():.1f}")

    model = train_model(df)
    print(f"Model saved to {MODEL_PATH}")
    print(f"Feature importances:")
    for name, imp in sorted(zip(FEATURES, model.feature_importances_), key=lambda x: -x[1]):
        print(f"  {name}: {imp:.3f}")
