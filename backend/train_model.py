from __future__ import annotations

from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder


BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
MODEL_DIR = BASE_DIR / "model"

FEATURE_COLUMNS = [
    "soil",
    "temperature",
    "humidity",
    "rainfall",
    "ph",
    "season",
    "region",
    "irrigation",
]

CATEGORICAL_COLUMNS = ["soil", "season", "region", "irrigation"]

CROP_PROFILES = {
    "Rice": {
        "soil": ["Clay", "Loamy"],
        "temperature": (22, 32),
        "humidity": (70, 90),
        "rainfall": (180, 320),
        "ph": (5.0, 6.8),
        "season": ["Kharif"],
        "region": ["East", "South", "North"],
        "irrigation": ["High", "Medium"],
    },
    "Wheat": {
        "soil": ["Loamy", "Clay"],
        "temperature": (12, 24),
        "humidity": (45, 65),
        "rainfall": (50, 120),
        "ph": (6.0, 7.5),
        "season": ["Rabi"],
        "region": ["North", "West", "Central"],
        "irrigation": ["Medium", "Low"],
    },
    "Maize": {
        "soil": ["Loamy", "Sandy"],
        "temperature": (18, 30),
        "humidity": (50, 75),
        "rainfall": (60, 140),
        "ph": (5.5, 7.5),
        "season": ["Kharif", "Zaid"],
        "region": ["North", "South", "Central"],
        "irrigation": ["Medium"],
    },
    "Cotton": {
        "soil": ["Black", "Loamy"],
        "temperature": (21, 35),
        "humidity": (45, 70),
        "rainfall": (50, 110),
        "ph": (5.8, 8.0),
        "season": ["Kharif"],
        "region": ["West", "South", "Central"],
        "irrigation": ["Medium", "Low"],
    },
    "Sugarcane": {
        "soil": ["Loamy", "Clay"],
        "temperature": (20, 34),
        "humidity": (60, 85),
        "rainfall": (100, 220),
        "ph": (6.0, 7.8),
        "season": ["Kharif", "Zaid"],
        "region": ["North", "South", "East"],
        "irrigation": ["High"],
    },
    "Barley": {
        "soil": ["Sandy", "Loamy"],
        "temperature": (10, 22),
        "humidity": (40, 60),
        "rainfall": (40, 90),
        "ph": (6.0, 8.0),
        "season": ["Rabi"],
        "region": ["North", "West"],
        "irrigation": ["Low", "Medium"],
    },
    "Millet": {
        "soil": ["Sandy", "Red"],
        "temperature": (24, 35),
        "humidity": (35, 60),
        "rainfall": (30, 90),
        "ph": (5.5, 7.5),
        "season": ["Kharif"],
        "region": ["West", "Central", "South"],
        "irrigation": ["Low"],
    },
    "Soybean": {
        "soil": ["Black", "Loamy"],
        "temperature": (20, 30),
        "humidity": (55, 75),
        "rainfall": (70, 150),
        "ph": (6.0, 7.5),
        "season": ["Kharif"],
        "region": ["Central", "West"],
        "irrigation": ["Medium"],
    },
    "Groundnut": {
        "soil": ["Sandy", "Red"],
        "temperature": (22, 32),
        "humidity": (45, 65),
        "rainfall": (50, 110),
        "ph": (6.0, 7.5),
        "season": ["Kharif", "Zaid"],
        "region": ["South", "West"],
        "irrigation": ["Low", "Medium"],
    },
    "Mustard": {
        "soil": ["Loamy", "Sandy"],
        "temperature": (10, 25),
        "humidity": (35, 55),
        "rainfall": (25, 80),
        "ph": (6.0, 7.8),
        "season": ["Rabi"],
        "region": ["North", "West", "Central"],
        "irrigation": ["Low"],
    },
}


def random_float(low: float, high: float, rng: np.random.Generator) -> float:
    return round(float(rng.uniform(low, high)), 2)


def generate_dataset(rows_per_crop: int = 140, seed: int = 42) -> pd.DataFrame:
    rng = np.random.default_rng(seed)
    rows: list[dict[str, object]] = []

    for crop, profile in CROP_PROFILES.items():
        for _ in range(rows_per_crop):
            rows.append(
                {
                    "soil": rng.choice(profile["soil"]).item(),
                    "temperature": random_float(*profile["temperature"], rng),
                    "humidity": random_float(*profile["humidity"], rng),
                    "rainfall": random_float(*profile["rainfall"], rng),
                    "ph": random_float(*profile["ph"], rng),
                    "season": rng.choice(profile["season"]).item(),
                    "region": rng.choice(profile["region"]).item(),
                    "irrigation": rng.choice(profile["irrigation"]).item(),
                    "crop": crop,
                }
            )

    dataset = pd.DataFrame(rows)
    return dataset.sample(frac=1, random_state=seed).reset_index(drop=True)


def encode_dataset(dataset: pd.DataFrame) -> tuple[pd.DataFrame, dict[str, LabelEncoder]]:
    encoded_dataset = dataset.copy()
    encoders: dict[str, LabelEncoder] = {}

    for column in CATEGORICAL_COLUMNS + ["crop"]:
        encoder = LabelEncoder()
        encoded_dataset[column] = encoder.fit_transform(dataset[column])
        encoders[column] = encoder

    return encoded_dataset, encoders


def main() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    MODEL_DIR.mkdir(parents=True, exist_ok=True)

    dataset = generate_dataset()
    dataset.to_csv(DATA_DIR / "crop_recommendation.csv", index=False)

    encoded_dataset, encoders = encode_dataset(dataset)

    X = encoded_dataset[FEATURE_COLUMNS]
    y = encoded_dataset["crop"]

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y,
    )

    model = RandomForestClassifier(
        n_estimators=300,
        random_state=42,
        max_depth=16,
        min_samples_split=4,
    )
    model.fit(X_train, y_train)

    accuracy = model.score(X_test, y_test)

    joblib.dump(model, MODEL_DIR / "random_forest_model.joblib")
    joblib.dump(encoders, MODEL_DIR / "encoders.joblib")
    joblib.dump(
        {
            "feature_columns": FEATURE_COLUMNS,
            "categorical_columns": CATEGORICAL_COLUMNS,
            "accuracy": round(float(accuracy), 4),
        },
        MODEL_DIR / "model_metadata.joblib",
    )

    print(f"Training completed successfully. Accuracy: {accuracy:.2%}")
    print(f"Dataset saved to: {DATA_DIR / 'crop_recommendation.csv'}")
    print(f"Model artifacts saved to: {MODEL_DIR}")


if __name__ == "__main__":
    main()

