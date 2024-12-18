"use client";

import { useState } from "react";
import Form from "./components/Form";
import Results from "./components/Results";
import { usePost } from "../hooks/usePost";

export default function HomePage() {
  const [results, setResults] = useState(null); // Stocke les résultats
  const [dataset, setDataset] = useState({ dataset: [] }); // Stocke les données pour POST
  const [loading, setLoading] = useState(false);

  const { data, error, isLoading } = usePost("/api/calculate", dataset);

  // Mettre à jour les résultats quand la requête retourne des données
  if (data && data !== results) {
    setResults(data);
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Calculateur MWR</h1>

      <Form
        onSubmit={(data) => {
          if (data.dataset.length === 0) {
            alert("Aucune donnée à soumettre !");
            setLoading(false);
            return;
          }

          setDataset(data); // Passe le dataset soumis pour POST
          setLoading(true); // Indique le début du chargement
        }}
        setLoading={setLoading}
      />

      {loading && <p>Chargement...</p>}
      {results && <Results data={results} />}
      {isLoading && <p>Chargement des résultats...</p>}
      {error && <p>Une erreur est survenue : {error.message}</p>}
    </>
  );
}
