import { useFetch } from "./useFetch";

export function useGet(url: string) {
  return useFetch(url); // Appels GET simples
}
