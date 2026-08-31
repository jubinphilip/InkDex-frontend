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
      <div className="doc-card-icon">📄</div>
      <div className="doc-card-body">
        <p className="doc-card-name" title={document.file_name}>
          {document.file_name}
        </p>
        <p className="doc-card-date">{createdAt}</p>
      </div>
      <div className="doc-card-actions">
        <Link
          href={`/chat?doc=${document.id}`}
          className="btn btn-ghost btn-xs"
          title="Ask questions about this document"
        >
          Chat
        </Link>
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
