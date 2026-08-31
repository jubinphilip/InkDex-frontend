# InkDex Web ✦

**InkDex Web** is the modern frontend web application for **InkDex** — an AI-powered Document RAG (Retrieval-Augmented Generation) & Semantic Search platform. 

It allows users to upload documents (PDFs), manage their personal knowledge base, and perform interactive Q&A grounded strictly in their own uploaded documents.

---

## 🚀 Features

- **🔐 User Authentication**: Secure login and registration powered by JWT tokens.
- **📄 Document Library**: Drag-and-drop PDF uploads, real-time status tracking, and document deletion.
- **💬 AI RAG Chat Interface**: Conversational search that queries your document library using vector embeddings.
- **⚡ Modern Responsive UI**: Clean landing page, sleek dashboard, dark theme, and fluid micro-animations.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS & [Tailwind CSS v4](https://tailwindcss.com/)
- **Schema Validation**: [Zod](https://zod.dev/)
- **Backend API**: FastAPI + PostgreSQL (`pgvector`) + Redis (Backend repository)

---

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher (or `pnpm` / `yarn` / `bun`)

### 1. Environment Setup

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

> Adjust `NEXT_PUBLIC_API_BASE_URL` to match your running InkDex FastAPI backend URL.

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available Scripts

- `npm run dev`: Runs the app in development mode with HMR.
- `npm run build`: Compiles and builds the production bundle.
- `npm run start`: Starts the Next.js production server.
- `npm run lint`: Runs ESLint to check for code formatting and quality issues.

---


## 🤝 Backend Integration

This frontend connects to the InkDex FastAPI backend. Ensure the backend server is running and accessible at the URL configured in `NEXT_PUBLIC_API_BASE_URL`.