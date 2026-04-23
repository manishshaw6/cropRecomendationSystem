function PredictionCard({ crop, probability, rank }) {
  return (
    <article className="prediction-card">
      <div className="prediction-card__top">
        <div>
          <p className="prediction-card__rank">#{rank}</p>
          <h3>{crop}</h3>
        </div>
        <strong>{probability}%</strong>
      </div>
      <div className="progress">
        <div className="progress__fill" style={{ width: `${probability}%` }} />
      </div>
    </article>
  );
}

export default PredictionCard;

