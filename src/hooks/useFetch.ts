import useSWR from "swr";

const fetcher = async (url: string, options?: RequestInit) => {
  if (options?.body === undefined) {
    throw new Error("Le corps de la requête est vide.");
  }

  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Erreur HTTP! Statut : ${res.status}`);
  }
  return res.json();
};

export function useFetch(url: string, options?: RequestInit) {
  // Utilise `useSWR` avec une clé dynamique : `[url, options]`
  const { data, error } = useSWR(
    url ? [url, options] : null,
    ([url, options]) => fetcher(url, options),
    {
      revalidateOnFocus: false, // Optionnel, pour éviter les requêtes supplémentaires lors de changements de focus
    }
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
}
