from __future__ import annotations

from typing import Any


def validate_and_prepare_input(
    payload: dict[str, Any],
    encoders: dict[str, Any],
    feature_columns: list[str],
    categorical_columns: list[str],
) -> list[float]:
    missing_fields = [column for column in feature_columns if column not in payload]
    if missing_fields:
        raise ValueError(f"Missing required fields: {', '.join(missing_fields)}")

    prepared_values: list[float] = []

    for column in feature_columns:
        value = payload[column]

        if column in categorical_columns:
            encoder = encoders[column]
            normalized_value = str(value).strip().title()

            if normalized_value not in encoder.classes_:
                valid_values = ", ".join(encoder.classes_)
                raise ValueError(
                    f"Invalid value for '{column}'. Supported values: {valid_values}"
                )

            prepared_values.append(float(encoder.transform([normalized_value])[0]))
            continue

        try:
            prepared_values.append(float(value))
        except (TypeError, ValueError) as exc:
            raise ValueError(f"Field '{column}' must be a numeric value.") from exc

    return prepared_values

