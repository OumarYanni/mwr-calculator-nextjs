import { NextRequest, NextResponse } from "next/server";

const TIMEOUT = 5000; // Timeout de 5 secondes pour éviter des blocages longs.

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("Données reçues dans la requête:", body); // Débogage

  try {
    const response = await Promise.race([
      fetch("http://127.0.0.1:5000/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Délai d'attente dépassé")), TIMEOUT)
      ),
    ]);

    if (!response.ok) throw new Error("Erreur API externe");
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
