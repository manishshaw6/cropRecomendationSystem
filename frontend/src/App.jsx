import { useState } from "react";
import FormField from "./components/FormField";
import PredictionCard from "./components/PredictionCard";
import { fetchCropPredictions } from "./services/api";

const defaultFormData = {
  soil: "Loamy",
  temperature: 26,
  humidity: 68,
  rainfall: 120,
  ph: 6.5,
  season: "Kharif",
  region: "South",
  irrigation: "Medium",
};

const fieldGroups = {
  soil: ["Loamy", "Clay", "Sandy", "Black", "Red"],
  season: ["Kharif", "Rabi", "Zaid"],
  region: ["North", "South", "East", "West", "Central"],
  irrigation: ["Low", "Medium", "High"],
};

function App() {
  const [formData, setFormData] = useState(defaultFormData);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value, type } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "number" ? Number(value) : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetchCropPredictions(formData);
      const sortedPredictions = [...response.predictions].sort(
        (firstCrop, secondCrop) => secondCrop.probability - firstCrop.probability,
      );
      setPredictions(sortedPredictions);
    } catch (requestError) {
      setPredictions([]);
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Data Mining Project</p>
        <h1>Crop Recommendation System</h1>
        <p className="hero__text">
          Enter your environmental conditions and get the top 5 crop recommendations
          with machine learning powered probability scores.
        </p>
      </section>

      <section className="layout">
        <div className="panel panel--form">
          <div className="panel__header">
            <h2>Prediction Form</h2>
            <p>Fill in the field conditions to discover the most suitable crops.</p>
          </div>

          <form className="form-grid" onSubmit={handleSubmit}>
            <FormField
              label="Soil Type"
              name="soil"
              type="select"
              value={formData.soil}
              onChange={handleChange}
              options={fieldGroups.soil}
            />
            <FormField
              label="Season"
              name="season"
              type="select"
              value={formData.season}
              onChange={handleChange}
              options={fieldGroups.season}
            />
            <FormField
              label="Region"
              name="region"
              type="select"
              value={formData.region}
              onChange={handleChange}
              options={fieldGroups.region}
            />
            <FormField
              label="Irrigation"
              name="irrigation"
              type="select"
              value={formData.irrigation}
              onChange={handleChange}
              options={fieldGroups.irrigation}
            />
            <FormField
              label="Temperature (°C)"
              name="temperature"
              type="number"
              value={formData.temperature}
              onChange={handleChange}
              min="0"
              max="50"
              step="0.1"
            />
            <FormField
              label="Humidity (%)"
              name="humidity"
              type="number"
              value={formData.humidity}
              onChange={handleChange}
              min="0"
              max="100"
              step="0.1"
            />
            <FormField
              label="Rainfall (mm)"
              name="rainfall"
              type="number"
              value={formData.rainfall}
              onChange={handleChange}
              min="0"
              step="0.1"
            />
            <FormField
              label="pH"
              name="ph"
              type="number"
              value={formData.ph}
              onChange={handleChange}
              min="0"
              max="14"
              step="0.1"
            />

            <button className="submit-button" type="submit" disabled={loading}>
              {loading ? "Predicting..." : "Predict Crops"}
            </button>
          </form>
        </div>

        <div className="panel panel--results">
          <div className="panel__header">
            <h2>Top 5 Recommendations</h2>
            <p>Results are sorted from highest to lowest chance of success.</p>
          </div>

          {error ? <div className="message message--error">{error}</div> : null}

          {!error && predictions.length === 0 ? (
            <div className="message">
              Submit the form to see the most suitable crops for your conditions.
            </div>
          ) : null}

          <div className="prediction-list">
            {predictions.map((prediction, index) => (
              <PredictionCard
                key={prediction.crop}
                crop={prediction.crop}
                probability={prediction.probability}
                rank={index + 1}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;

