from __future__ import annotations

from pathlib import Path

from flask import Flask, jsonify, request

try:
    from flask_cors import CORS
except ModuleNotFoundError:
    CORS = None

from src.predictor import predict_top_crops


app = Flask(__name__)

if CORS is not None:
    CORS(app)


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response


@app.get("/")
def health_check():
    return jsonify(
        {
            "success": True,
            "message": "Crop Recommendation API is running.",
        }
    )


@app.post("/predict")
def predict():
    try:
        payload = request.get_json(silent=True)

        if not payload:
            return (
                jsonify(
                    {
                        "success": False,
                        "message": "Request body must be valid JSON.",
                    }
                ),
                400,
            )

        predictions = predict_top_crops(payload)

        return jsonify(
            {
                "success": True,
                "predictions": predictions,
            }
        )
    except FileNotFoundError:
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Model files are missing. Run 'python train_model.py' first.",
                }
            ),
            500,
        )
    except ValueError as error:
        return (
            jsonify(
                {
                    "success": False,
                    "message": str(error),
                }
            ),
            400,
        )
    except Exception as error:
        return (
            jsonify(
                {
                    "success": False,
                    "message": f"Unexpected server error: {error}",
                }
            ),
            500,
        )


if __name__ == "__main__":
    app.run(debug=True, port=5000)
