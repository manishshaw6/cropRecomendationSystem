:root {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #163020;
  background:
    radial-gradient(circle at top, rgba(190, 242, 100, 0.3), transparent 32%),
    linear-gradient(135deg, #f4fce7 0%, #e6f4ea 45%, #dff4ef 100%);
  line-height: 1.5;
  font-weight: 400;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

button,
input,
select {
  font: inherit;
}

#root {
  min-height: 100vh;
}

.page {
  width: min(1180px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 3rem 0 4rem;
}

.hero {
  text-align: center;
  margin-bottom: 2rem;
}

.eyebrow {
  display: inline-flex;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  background: rgba(22, 48, 32, 0.08);
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero h1 {
  margin: 1rem 0 0.5rem;
  font-size: clamp(2.2rem, 5vw, 4rem);
  line-height: 1.05;
}

.hero__text {
  width: min(720px, 100%);
  margin: 0 auto;
  color: #365347;
  font-size: 1.05rem;
}

.layout {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 1.5rem;
}

.panel {
  padding: 1.5rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(22, 48, 32, 0.08);
  box-shadow: 0 20px 60px rgba(34, 64, 52, 0.12);
  backdrop-filter: blur(16px);
}

.panel__header h2 {
  margin: 0;
  font-size: 1.4rem;
}

.panel__header p {
  margin: 0.4rem 0 1.4rem;
  color: #547063;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.field__label {
  font-size: 0.92rem;
  font-weight: 600;
}

.field__input {
  width: 100%;
  padding: 0.9rem 1rem;
  border: 1px solid rgba(46, 93, 70, 0.16);
  border-radius: 14px;
  background: rgba(249, 253, 245, 0.95);
  color: #173126;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.field__input:focus {
  border-color: #48916d;
  box-shadow: 0 0 0 4px rgba(72, 145, 109, 0.15);
  transform: translateY(-1px);
}

.submit-button {
  grid-column: 1 / -1;
  margin-top: 0.5rem;
  padding: 1rem 1.2rem;
  border: none;
  border-radius: 16px;
  background: linear-gradient(135deg, #2f7d32, #4caf50);
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 18px 40px rgba(47, 125, 50, 0.22);
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
}

.submit-button:disabled {
  cursor: wait;
  opacity: 0.75;
}

.prediction-list {
  display: grid;
  gap: 1rem;
}

.prediction-card {
  padding: 1rem 1rem 1.1rem;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(236, 248, 240, 0.92));
  border: 1px solid rgba(72, 145, 109, 0.12);
}

.prediction-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.8rem;
}

.prediction-card__top h3 {
  margin: 0.1rem 0 0;
}

.prediction-card__rank {
  margin: 0;
  color: #4d7a63;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.progress {
  width: 100%;
  height: 12px;
  border-radius: 999px;
  background: rgba(72, 145, 109, 0.14);
  overflow: hidden;
}

.progress__fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #2f7d32, #88d66c);
}

.message {
  padding: 1rem;
  border-radius: 16px;
  background: rgba(232, 243, 235, 0.9);
  color: #375646;
  margin-bottom: 1rem;
}

.message--error {
  background: rgba(255, 233, 233, 0.95);
  color: #8f2d2d;
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .page {
    width: min(100% - 1rem, 100%);
    padding-top: 1.25rem;
  }

  .panel {
    padding: 1rem;
    border-radius: 20px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}

