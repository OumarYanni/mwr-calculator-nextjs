import { useFetch } from "./useFetch";

interface PostResponse {
  data: any;
  error: any;
  isLoading: boolean;
}

export function usePost(url: string, body: any): PostResponse {
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const { data, error, isLoading } = useFetch(url, options);

  return { data, error, isLoading };
}
