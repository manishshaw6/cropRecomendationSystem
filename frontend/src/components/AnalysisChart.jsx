import React from "react";

const AnalysisChart = ({ predictions, formData }) => {
    if (!predictions || predictions.length === 0) return null;

  const metrics = [
    {
      code: "T",
      title: "Temperature Fit",
      value: `${formData.temperature} C`,
      status:
        formData.temperature >= 20 && formData.temperature <= 32
          ? "Optimal growth range"
          : "Needs close monitoring",
    },
    {
      code: "H",
      title: "Humidity Fit",
      value: `${formData.humidity}%`,
      status: formData.humidity >= 50 ? "Sufficient moisture" : "Low moisture risk",
    },
    {
      code: "R",
      title: "Rainfall Fit",
      value: `${formData.rainfall} mm`,
      status: formData.rainfall >= 100 ? "Adequate rainfall" : "Supplemental water advised",
    },
    {
      code: "pH",
      title: "Soil pH Level",
      value: `pH ${formData.ph}`,
      status:
        formData.ph >= 6 && formData.ph <= 7.5
          ? "Ideal neutral soil"
          : formData.ph < 6
            ? "Acidic soil"
            : "Alkaline soil",
    },
  ];

  return (
    <div className="panel analysis-container">
      <div className="analysis-header">
        <h2>Feature Importance</h2>
        <p>Impact of environmental conditions based on your inputs.</p>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric) => (
          <div className="metric-card" key={metric.title}>
            <span className="metric-icon">{metric.code}</span>
            <div className="metric-info">
              <span className="metric-title">{metric.title}</span>
              <span className="metric-val">{metric.value}</span>
              <span className="metric-status">{metric.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisChart;
