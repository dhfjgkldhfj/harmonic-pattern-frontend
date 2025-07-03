import axios from "axios";

// غيّر هذا العنوان إلى رابط الباك اند على Render
const BASE_URL = "https://harmonic-pattern-backend.onrender.com";

export async function fetchPatterns(symbol, interval) {
  try {
    const response = await axios.get(`${BASE_URL}/patterns`, {
      params: { symbol, interval },
    });
    return response.data.patterns || [];
  } catch (error) {
    console.error("API fetchPatterns error:", error);
    return [];
  }
}
