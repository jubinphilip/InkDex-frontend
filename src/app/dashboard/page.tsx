"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import DocumentCard from "@/components/DocumentCard";
import UploadModal from "@/components/UploadModal";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";
import { useDocuments } from "@/hooks/useDocuments";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { documents, loading, error, refetch } = useDocuments();
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || (!isAuthenticated && !authLoading)) {
    return (
      <div className="loading-center" style={{ minHeight: "100vh" }}>
        <LoadingSpinner size={28} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="page">
        <div className="page-header">
          <div>
            <h1 className="page-title">My Library</h1>
            <p className="page-subtitle">
              {documents.length} document{documents.length !== 1 ? "s" : ""} indexed
            </p>
          </div>
          <button
            id="open-upload-modal"
            className="btn btn-primary"
            onClick={() => setShowUpload(true)}
          >
            + Upload PDF
          </button>
        </div>

        {error && <div className="error-banner">{error}</div>}

        {loading ? (
          <div className="loading-center">
            <LoadingSpinner size={28} />
            <span>Loading documents…</span>
          </div>
        ) : documents.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📂</div>
            <h2 className="empty-title">No documents yet</h2>
            <p className="empty-desc">Upload your first PDF to start building your knowledge base.</p>
            <button
              className="btn btn-primary"
              onClick={() => setShowUpload(true)}
            >
              Upload PDF
            </button>
          </div>
        ) : (
          <div className="docs-grid">
            {documents.map((doc) => (
              <DocumentCard key={doc.id} document={doc} onDeleted={refetch} />
            ))}
          </div>
        )}
      </main>

      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onSuccess={refetch}
        />
      )}
    </>
  );
}
