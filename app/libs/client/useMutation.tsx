"use client";

import { useState } from "react";

interface UseMutationState {
  loading: boolean;
  data?: object;
  error?: object;
}
type UseMutationResult = [(data: any) => void, UseMutationState];

export default function useMutation(url: string): UseMutationResult {
  const [state, setState] = useState<UseMutationState>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  async function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json().catch(() => {}))
      .then((json) => setState((prev) => ({ ...prev, data: json })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => {
        setState((prev) => ({ ...prev, loading: false }));
      });
  }
  return [mutation, { ...state }];
}
