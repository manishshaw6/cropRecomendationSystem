const API_BASE_URL = "http://127.0.0.1:5000";

export async function fetchCropPredictions(formData) {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch crop predictions.");
  }

  return data;
}

