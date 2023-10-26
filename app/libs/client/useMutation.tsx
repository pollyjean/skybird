"use client";

import { useState } from "react";

interface UseMutationState {
  loading: boolean;
  data?: object;
  error?: object;
}
interface UseStateProps {
  loading: boolean;
  data?: any;
  error?: any;
}
type UseMutationResult = [(data: any) => void, UseMutationState];

export default function useMutation(url: string): UseMutationResult {
  const [state, setState] = useState<UseStateProps>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  const { loading, data, error } = state;
  async function mutation(data: any) {
    setState({ ...state, loading: true });
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((json) => setState({ ...state, data: json }))
      .catch((error) => setState({ ...state, error }))
      .finally(() => {
        setState({ ...state, loading: false });
      });
  }
  return [mutation, { loading, data, error }];
}
