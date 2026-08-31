"use client";

import { useState, useEffect, useCallback } from "react";
import { getToken, removeToken } from "@/lib/token";

export function useAuth() {
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTokenState(getToken());
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    removeToken();
    setTokenState(null);
    window.location.href = "/login";
  }, []);

  return {
    token,
    isAuthenticated: !!token,
    isLoading,
    logout,
  };
}
