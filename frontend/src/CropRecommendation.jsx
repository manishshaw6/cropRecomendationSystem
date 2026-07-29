import { useState } from "react";
import { Link } from "react-router-dom";
import FormField from "./components/FormField";
import AnalysisChart from "./components/AnalysisChart";
import PredictionCard from "./components/PredictionCard";
import Footer from "./components/Footer";
import { fetchCropPredictions } from "./services/api";
import "./crop.css";

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

function getFarmingTips(formData, topCrop) {
  if (!topCrop) return [];

  const cropName = topCrop.crop.toLowerCase();
  const tips = [
    {
      title: `Prioritize ${topCrop.crop} in this plan`,
      text: `${topCrop.crop} is the strongest match at ${topCrop.probability}%. Use it as the main choice, and keep the second crop as a backup if seed or market conditions change.`,
    },
  ];

  if (formData.ph < 6) {
    tips.push({
      title: "Correct acidic soil before sowing",
      text: "Apply agricultural lime in split doses and recheck pH after irrigation. Most crops perform better when pH is closer to 6.0-7.5.",
    });
  } else if (formData.ph > 7.5) {
    tips.push({
      title: "Manage alkaline soil",
      text: "Use organic compost, gypsum where locally recommended, and micronutrient foliar sprays to reduce nutrient lock-up.",
    });
  } else {
    tips.push({
      title: "Maintain the current pH range",
      text: "Your pH is in a good working range. Add compost or farmyard manure to protect soil structure and nutrient availability.",
    });
  }

  if (formData.rainfall < 80 || formData.irrigation === "Low") {
    tips.push({
      title: "Plan water carefully",
      text: "Use mulch, drip irrigation if possible, and sow after assured moisture. Avoid wide spacing that leaves soil exposed.",
    });
  } else if (formData.rainfall > 180 || formData.irrigation === "High") {
    tips.push({
      title: "Protect against waterlogging",
      text: "Keep drainage channels open and use raised beds for sensitive crops. Check roots after heavy rain periods.",
    });
  } else {
    tips.push({
      title: "Keep irrigation steady",
      text: "Maintain consistent soil moisture during germination, flowering, and fruit/grain filling stages.",
    });
  }

  if (formData.temperature > 34) {
    tips.push({
      title: "Reduce heat stress",
      text: "Irrigate during cooler hours, use organic mulch, and avoid fertilizer sprays during peak afternoon heat.",
    });
  } else if (formData.temperature < 18) {
    tips.push({
      title: "Watch for slow growth",
      text: "Cooler temperatures can delay germination. Use healthy seed, avoid overwatering, and monitor early plant vigor.",
    });
  }

  if (cropName.includes("rice") || cropName.includes("paddy")) {
    tips.push({
      title: "Rice-specific note",
      text: "Maintain shallow standing water after establishment, but drain before fertilizer application for better uptake.",
    });
  } else if (cropName.includes("maize") || cropName.includes("corn")) {
    tips.push({
      title: "Maize-specific note",
      text: "Give priority to nitrogen at knee-high and tasseling stages, and avoid moisture stress during silking.",
    });
  } else if (cropName.includes("cotton")) {
    tips.push({
      title: "Cotton-specific note",
      text: "Use pest scouting from early square formation and avoid excess nitrogen that increases vegetative growth.",
    });
  } else if (cropName.includes("wheat")) {
    tips.push({
      title: "Wheat-specific note",
      text: "Keep the first irrigation timely after sowing and monitor for rust disease in humid conditions.",
    });
  }

  return tips.slice(0, 5);
}

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

  const topCrop = predictions[0];
  const farmingTips = getFarmingTips(formData, topCrop);

  return (
    <div className="crop-page">
      <main className="page">
        <div style={{ paddingBottom: '1.5rem' }}>
          <Link to="/" className="crop-back-link">
            ← Back to Landing Page
          </Link>
        </div>
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

      {predictions.length > 0 && !error ? (
        <section className="insights-layout" aria-label="Prediction analysis and farming tips">
          <AnalysisChart predictions={predictions} formData={formData} />

          <div className="panel tips-panel">
            <div className="panel__header">
              <h2>Smart Farming Tips</h2>
              <p>Advice adjusted to your crop match, soil, water, pH, and weather inputs.</p>
            </div>

            <div className="tip-list">
              {farmingTips.map((tip, index) => (
                <article className="tip-card" key={tip.title}>
                  <span className="tip-card__number">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{tip.title}</h3>
                    <p>{tip.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
    <Footer />
  </div>
  );
}

export default App;

