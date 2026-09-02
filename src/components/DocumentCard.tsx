"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteDocument } from "@/services/documentService";
import type { Document } from "@/types";

interface Props {
  document: Document;
  onDeleted: () => void;
}

export default function DocumentCard({ document, onDeleted }: Props) {
  const [deleting, setDeleting] = useState(false);

  const createdAt = new Date(document.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const isProcessing = document.status === "processing" || document.status === "pending";
  const isFailed = document.status === "failed";

  async function handleDelete() {
    if (!confirm(`Delete "${document.file_name}"?`)) return;
    setDeleting(true);
    try {
      await deleteDocument(document.id);
      onDeleted();
    } catch {
      setDeleting(false);
    }
  }

  return (
    <div className={`doc-card ${deleting ? "doc-card-deleting" : ""}`}>
      <div className="doc-card-header">
        <div className="doc-card-icon">📄</div>
        {isProcessing ? (
          <span className="badge badge-processing">
            <span className="pulse-dot" /> Processing
          </span>
        ) : isFailed ? (
          <span className="badge badge-failed">Failed</span>
        ) : (
          <span className="badge badge-completed">Ready</span>
        )}
      </div>

      <div className="doc-card-body">
        <p className="doc-card-name" title={document.file_name}>
          {document.file_name}
        </p>
        <p className="doc-card-date">{createdAt}</p>
      </div>

      <div className="doc-card-actions">
        {isProcessing || isFailed ? (
          <button
            disabled
            className="btn btn-ghost btn-xs btn-disabled"
            title={isProcessing ? "Processing document..." : "Processing failed"}
          >
            Chat
          </button>
        ) : (
          <Link
            href={`/chat?doc=${document.id}`}
            className="btn btn-ghost btn-xs"
            title="Ask questions about this document"
          >
            Chat
          </Link>
        )}
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="btn btn-danger btn-xs"
          title="Delete document"
        >
          {deleting ? "…" : "Delete"}
        </button>
      </div>
    </div>
  );
}

