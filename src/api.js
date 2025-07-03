import axios from "axios";

const BASE_URL = "https://harmonic-pattern-backend.onrender.com";  // غيّرها لعنوان باك اند الخاص بك

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
