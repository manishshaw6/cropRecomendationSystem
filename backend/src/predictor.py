from __future__ import annotations

from pathlib import Path
from typing import Any

import joblib
import numpy as np
import pandas as pd

from src.preprocessing import validate_and_prepare_input


BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "model"


def load_artifacts() -> tuple[Any, dict[str, Any], dict[str, Any]]:
    model = joblib.load(MODEL_DIR / "random_forest_model.joblib")
    encoders = joblib.load(MODEL_DIR / "encoders.joblib")
    metadata = joblib.load(MODEL_DIR / "model_metadata.joblib")
    return model, encoders, metadata


def predict_top_crops(payload: dict[str, Any], top_k: int = 5) -> list[dict[str, Any]]:
    model, encoders, metadata = load_artifacts()

    feature_vector = validate_and_prepare_input(
        payload=payload,
        encoders=encoders,
        feature_columns=metadata["feature_columns"],
        categorical_columns=metadata["categorical_columns"],
    )

    feature_frame = pd.DataFrame([feature_vector], columns=metadata["feature_columns"])
    probabilities = model.predict_proba(feature_frame)[0]
    crop_encoder = encoders["crop"]

    top_indices = np.argsort(probabilities)[::-1][:top_k]

    predictions: list[dict[str, Any]] = []
    for index in top_indices:
        crop_name = crop_encoder.inverse_transform([index])[0]
        predictions.append(
            {
                "crop": crop_name,
                "probability": round(float(probabilities[index]) * 100, 2),
            }
        )

    return predictions
