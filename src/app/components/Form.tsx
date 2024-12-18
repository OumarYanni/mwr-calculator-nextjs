"use client"; // Directive pour indiquer que ce composant est côté client

import { useState } from "react";

interface DataEntry {
  Date: string;
  "Type d'Activité (activity_type)": string;
  "Sens Flux de Tréso": string;
  "Flux de trésorerie (net_amount)"?: number;
  "User base_value_1D"?: number;
}

export default function Form({
  onSubmit,
  setLoading,
}: {
  onSubmit: (data: { dataset: DataEntry[] }) => void;
  setLoading: (loading: boolean) => void;
}) {
  const [formData, setFormData] = useState<DataEntry>({
    Date: "",
    "Type d'Activité (activity_type)": "",
    "Sens Flux de Tréso": "",
  });

  const [jsonData, setJsonData] = useState<string>(""); // Pour coller le JSON
  const [manualEntries, setManualEntries] = useState<DataEntry[]>([]); // Pour garder les entrées manuelles

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonData(e.target.value);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Ajouter l'entrée manuelle dans le tableau des entrées
    setManualEntries((prevEntries) => [...prevEntries, formData]);

    // Réinitialiser le formulaire après soumission
    setFormData({
      Date: "",
      "Type d'Activité (activity_type)": "",
      "Sens Flux de Tréso": "",
    });

    setLoading(false);
  };

  const handleJsonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const parsedData = JSON.parse(jsonData);

      if (parsedData?.dataset && Array.isArray(parsedData.dataset)) {
        const entries = parsedData.dataset.map((entry: any) => ({
          Date: entry.Date,
          "Type d'Activité (activity_type)":
            entry["Type d'Activité (activity_type)"],
          "Sens Flux de Tréso": entry["Sens Flux de Tréso"],
          "Flux de trésorerie (net_amount)":
            entry["Flux de trésorerie (net_amount)"],
          "User base_value_1D": entry["User base_value_1D"],
        }));

        setManualEntries((prevEntries) => [...prevEntries, ...entries]);
        console.log("Données JSON ajoutées :", entries); // Vérifier si les données sont bien ajoutées
      } else {
        alert("Le format du JSON est incorrect.");
      }
    } catch (error) {
      alert("Erreur lors du traitement du JSON.");
    }

    setJsonData(""); // Réinitialiser le champ JSON
    setLoading(false);
  };

  const handleSubmitAll = () => {
    setLoading(true);

    // Vérifier les données juste avant de les soumettre
    console.log("Données manuelles à soumettre : ", manualEntries);

    // Préparer les données pour onSubmit
    const dataToSubmit = { dataset: manualEntries };

    // Vérifier si les données ne sont pas vides avant de les soumettre
    if (dataToSubmit.dataset.length === 0) {
      alert("Aucune donnée à soumettre !");
      setLoading(false);
      return;
    }

    console.log("Données soumises : ", dataToSubmit);

    // Appeler onSubmit avec toutes les données collectées
    onSubmit(dataToSubmit);

    // Réinitialiser les entrées après envoi
    setManualEntries([]);
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleManualSubmit} className="flex flex-col gap-4">
        <h2>Entrées manuelles</h2>
        <input
          type="date"
          name="Date"
          value={formData.Date}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="text"
          name="Type d'Activité (activity_type)"
          value={formData["Type d'Activité (activity_type)"]}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="text"
          name="Sens Flux de Tréso"
          value={formData["Sens Flux de Tréso"]}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Ajouter l'entrée
        </button>
      </form>

      <form onSubmit={handleJsonSubmit} className="mt-8">
        <h2>Ou coller un fichier JSON</h2>
        <textarea
          value={jsonData}
          onChange={handleJsonChange}
          rows={10}
          className="border p-2 w-full"
          placeholder="Collez ici un JSON valide avec les données"
        />
        <button type="submit" className="bg-green-500 text-white p-2 mt-2">
          Soumettre le JSON
        </button>
      </form>

      <div className="mt-8">
        <h3>Entrées ajoutées :</h3>
        <pre>{JSON.stringify(manualEntries, null, 2)}</pre>
        <button
          onClick={handleSubmitAll}
          className="bg-purple-500 text-white p-2 mt-4"
        >
          Envoyer toutes les données
        </button>
      </div>
    </div>
  );
}
