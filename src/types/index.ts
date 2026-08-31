export interface Document {
  id: string;
  file_name: string;
  file_url: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface DocumentUploadResponse {
  message: string;
  document_id: string;
  filename: string;
  status: string;
}

export interface DocumentDeleteResponse {
  message: string;
  document_id: string;
}

export interface AnswerResponse {
  answer: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
