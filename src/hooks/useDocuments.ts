"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getDocuments } from "@/services/documentService";
import type { Document } from "@/types";

const POLL_INTERVAL_MS = 3000;

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);

  const fetchDocuments = useCallback(async (isSilent = false) => {
    if (!isSilent) {
      setLoading(true);
    }
    setError(null);
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (err) {
      if (!isSilent) {
        setError(err instanceof Error ? err.message : "Failed to load documents");
      }
    } finally {
      if (!isSilent) {
        setLoading(false);
      }
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  // Polling logic when any document is processing
  const hasProcessingDocs = documents.some(
    (doc) => doc.status === "processing" || doc.status === "pending"
  );

  useEffect(() => {
    if (!hasProcessingDocs) {
      setIsPolling(false);
      return;
    }

    setIsPolling(true);
    const interval = setInterval(() => {
      fetchDocuments(true);
    }, POLL_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [hasProcessingDocs, fetchDocuments]);

  return { documents, loading, isPolling, error, refetch: () => fetchDocuments(false) };
}

