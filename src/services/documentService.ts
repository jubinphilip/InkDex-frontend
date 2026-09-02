import { z } from "zod";
import { api } from "./api";
import type { Document, DocumentUploadResponse, DocumentDeleteResponse } from "@/types";

export const questionSchema = z.object({
  text: z.string().min(1, "Question cannot be empty").max(1000, "Question is too long"),
  document_id: z.string().uuid().nullable().optional(),
});

export type QuestionInput = z.infer<typeof questionSchema>;

export async function getDocuments(): Promise<Document[]> {
  return api.get<Document[]>("/document/get-documents");
}

export async function uploadDocument(file: File): Promise<DocumentUploadResponse> {
  const form = new FormData();
  form.append("file", file);
  return api.postForm<DocumentUploadResponse>("/document/upload-document", form);
}

export async function deleteDocument(documentId: string): Promise<DocumentDeleteResponse> {
  return api.delete<DocumentDeleteResponse>(`/document/${documentId}`);
}

export async function getDocumentStatus(documentId: string): Promise<Document> {
  return api.get<Document>(`/document/${documentId}`);
}

