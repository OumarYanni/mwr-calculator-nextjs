const API_URL = "/api/calculate"; // URL de l'endpoint interne

//const API_URL = "http://127.0.0.1:5000/api/calculate";

export async function calculateMWR(dataset: any) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dataset }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to calculate MWR");
    }

    return await response.json();
  } catch (error) {
    console.error("Error calculating MWR:", error);
    throw error;
  }
}
