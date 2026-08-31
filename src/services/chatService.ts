import { api } from "./api";
import type { AnswerResponse } from "@/types";

export async function askQuestion(text: string, documentId?: string | null): Promise<AnswerResponse> {
  return api.post<AnswerResponse>("/document/question", {
    text,
    document_id: documentId ?? null,
  });
}
