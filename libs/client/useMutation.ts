import { useState } from "react";

interface IUseMutationState<T> {
  loading: boolean;
  data: T | null;
  error: any;
}
type UseMutationResult<T> = [(body: any) => void, IUseMutationState<T>];

// API함수 및 변수들을 반환
export default function useMutation<T>(
  url: string,
  method: "POST" | "PUT" | "DELETE" | "PATCH" = "POST"
): UseMutationResult<T> {
  const [state, setState] = useState<IUseMutationState<T>>({
    loading: false,
    data: null,
    error: null,
  });

  const mutation = (body: any) => {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  };

  return [mutation, state];
}
