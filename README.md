# Crop Recommendation System (Data Mining Project)

This project is a full-stack crop recommendation web application built with React, Flask, and scikit-learn. It uses a Random Forest classification model to predict the top 5 most suitable crops based on environmental and farming inputs such as soil, temperature, humidity, rainfall, pH, season, region, and irrigation level.

## Features

- Machine learning based crop recommendation using `RandomForestClassifier`
- Top 5 crop predictions with probability scores using `predict_proba`
- Flask API with a `POST /predict` endpoint
- React + Vite frontend with a clean, responsive user interface
- Card-based prediction display with progress bars
- Saved model and label encoders using `joblib`
- Basic validation and error handling for user input and API responses
- Beginner-friendly project structure with separated frontend and backend folders

## Tech Stack

- Frontend: React, Vite, CSS
- Backend: Flask, Flask-CORS
- Machine Learning: scikit-learn, pandas, numpy, joblib

## Folder Structure

```text
croprec/
|-- backend/
|   |-- app.py
|   |-- train_model.py
|   |-- requirements.txt
|   |-- data/
|   |   `-- crop_recommendation.csv
|   |-- model/
|   |   |-- encoders.joblib
|   |   |-- model_metadata.joblib
|   |   `-- random_forest_model.joblib
|   `-- src/
|       |-- __init__.py
|       |-- predictor.py
|       `-- preprocessing.py
|-- frontend/
|   |-- index.html
|   |-- package.json
|   |-- vite.config.js
|   `-- src/
|       |-- App.jsx
|       |-- index.css
|       |-- main.jsx
|       |-- components/
|       |   |-- FormField.jsx
|       |   `-- PredictionCard.jsx
|       `-- services/
|           `-- api.js
|-- .gitignore
`-- README.md
```

## Installation

### Backend Setup

1. Open a terminal and go to the backend folder:

   ```bash
   cd backend
   ```

2. Create a virtual environment:

   ```bash
   python -m venv .venv
   ```

3. Activate the virtual environment:

   ```bash
   .venv\Scripts\activate
   ```

4. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

5. Train the machine learning model:

   ```bash
   python train_model.py
   ```

6. Start the Flask server:

   ```bash
   python app.py
   ```

### Frontend Setup

1. Open a second terminal and go to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Start the Vite development server:

   ```bash
   npm run dev
   ```

## How to Run the Project

1. Run the Flask backend on `http://127.0.0.1:5000`
2. Run the React frontend on `http://127.0.0.1:5173`
3. Open the frontend in your browser
4. Fill in the form values
5. Click `Predict Crops`
6. View the top 5 recommended crops with probability percentages

## Sample Input

```json
{
  "soil": "Loamy",
  "temperature": 26,
  "humidity": 68,
  "rainfall": 120,
  "ph": 6.5,
  "season": "Kharif",
  "region": "South",
  "irrigation": "Medium"
}
```

## Sample Output

```json
{
  "success": true,
  "predictions": [
    { "crop": "Maize", "probability": 38.67 },
    { "crop": "Sugarcane", "probability": 25.33 },
    { "crop": "Rice", "probability": 19.67 },
    { "crop": "Soybean", "probability": 8.67 },
    { "crop": "Groundnut", "probability": 4.67 }
  ]
}
```

## How the ML Model Works

The training script creates a structured crop dataset using realistic crop profiles for each target crop. Categorical fields such as soil type, season, region, irrigation, and crop name are converted into numeric form using `LabelEncoder`. A `RandomForestClassifier` is then trained on the encoded dataset. During prediction, the same encoders are used to transform user input, and `predict_proba` is used to return the top 5 crops with the highest success probabilities.

## Notes

- Run `python train_model.py` before starting the Flask app if the model files do not exist yet.
- The dataset in this project is generated for educational and demonstration purposes.
- You can expand the crop profiles or replace the dataset with a real agricultural dataset later.
