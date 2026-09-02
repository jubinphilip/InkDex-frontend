"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import ChatMessage from "@/components/ChatMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";
import { useDocuments } from "@/hooks/useDocuments";
import { askQuestion } from "@/services/chatService";
import { questionSchema } from "@/services/documentService";
import type { ChatMessage as ChatMessageType } from "@/types";

function ChatContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { documents } = useDocuments();

  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<string>("");
  const [thinking, setThinking] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    const docParam = searchParams.get("doc");
    if (docParam) setSelectedDoc(docParam);
  }, [searchParams]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();

    const parsed = questionSchema.safeParse({
      text: trimmed,
      document_id: selectedDoc || null,
    });

    if (!parsed.success) {
      setChatError(parsed.error.issues[0].message);
      return;
    }

    setChatError(null);

    const userMsg: ChatMessageType = {
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setThinking(true);

    try {
      const response = await askQuestion(trimmed, selectedDoc || null);
      const aiMsg: ChatMessageType = {
        role: "assistant",
        content: response.answer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setChatError(err instanceof Error ? err.message : "Failed to get answer");
    } finally {
      setThinking(false);
    }
  }, [input, selectedDoc]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  if (authLoading || (!isAuthenticated && !authLoading)) {
    return (
      <div className="loading-center" style={{ minHeight: "100vh" }}>
        <LoadingSpinner size={28} />
      </div>
    );
  }

  return (
    <div className="chat-layout">
      <div className="chat-toolbar">
        <span className="chat-toolbar-label">Context:</span>
        <select
          id="chat-doc-select"
          className="chat-select"
          value={selectedDoc}
          onChange={(e) => setSelectedDoc(e.target.value)}
        >
          <option value="">All documents</option>
          {documents.map((doc) => {
            const isProcessing = doc.status === "processing" || doc.status === "pending";
            const isFailed = doc.status === "failed";
            const label = isProcessing
              ? `${doc.file_name} (Processing…)`
              : isFailed
              ? `${doc.file_name} (Failed)`
              : doc.file_name;
            return (
              <option key={doc.id} value={doc.id} disabled={isProcessing || isFailed}>
                {label}
              </option>
            );
          })}
        </select>
      </div>

      <div className="chat-messages" role="log" aria-label="Chat messages">
        {messages.length === 0 && !thinking ? (
          <div className="chat-welcome">
            <div className="chat-welcome-icon">✦</div>
            <h2 className="chat-welcome-title">Ask anything</h2>
            <p className="chat-welcome-desc">
              {documents.length > 0
                ? "Ask a question about your documents or select a specific one above."
                : "Upload documents from the Library to start asking questions."}
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))}
            {thinking && (
              <div className="chat-message chat-message-assistant">
                <div className="chat-avatar">AI</div>
                <div className="chat-thinking">
                  <LoadingSpinner size={14} />
                  Thinking…
                </div>
              </div>
            )}
          </>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-area">
        {chatError && <p className="chat-error">{chatError}</p>}
        <div className="chat-input-row">
          <textarea
            id="chat-input"
            className="chat-textarea"
            placeholder="Ask a question… (Enter to send, Shift+Enter for newline)"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setChatError(null);
            }}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button
            id="chat-send"
            className="chat-send"
            onClick={sendMessage}
            disabled={thinking || !input.trim()}
            aria-label="Send message"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="loading-center" style={{ minHeight: "calc(100vh - 60px)" }}>
            <LoadingSpinner size={28} />
          </div>
        }
      >
        <ChatContent />
      </Suspense>
    </>
  );
}
