import Link from "next/link";
import Navbar from "@/components/Navbar";

const features = [
  {
    icon: "⬡",
    title: "Semantic Search",
    desc: "Documents are chunked and embedded with sentence transformers. Search means understanding, not keywords.",
  },
  {
    icon: "◈",
    title: "Instant Answers",
    desc: "Ask in plain English, get answers grounded in your own documents — powered by Gemini + pgvector.",
  },
  {
    icon: "◻",
    title: "Your Entire Library",
    desc: "Query across every PDF you've uploaded, or focus on a single document. Your knowledge base, your rules.",
  },
  {
    icon: "◆",
    title: "Secure by Default",
    desc: "JWT-authenticated API with per-user document isolation. Cloudinary-backed secure file storage.",
  },
  {
    icon: "◉",
    title: "Background Processing",
    desc: "Uploads are queued via Redis workers — async chunking, embedding, and indexing with zero wait time.",
  },
  {
    icon: "◫",
    title: "Easy Management",
    desc: "Upload, browse, and delete your documents from one clean dashboard. Always in control.",
  },
];

const steps = [
  { num: "01", title: "Upload a PDF", desc: "Drag-and-drop any PDF into your library." },
  { num: "02", title: "Automatic Indexing", desc: "InkDex chunks and embeds it in the background." },
  { num: "03", title: "Ask questions", desc: "Get precise answers backed by your own documents." },
];

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="landing">

        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-orb hero-orb-1" aria-hidden="true" />
          <div className="hero-orb hero-orb-2" aria-hidden="true" />

          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              AI-Powered 
            </div>

            <h1 className="hero-title">
              Make your documents<br />
              <span className="gradient-text">answer back</span>
            </h1>

            <p className="hero-desc">
              Upload PDFs. Ask questions. Get precise answers from your own knowledge base — no hallucinations, no guesswork.
            </p>

            <div className="hero-actions">
              <Link href="/register" className="btn btn-primary btn-hero">
                Start for free →
              </Link>
              <Link href="/login" className="btn btn-ghost btn-hero">
                Sign in
              </Link>
            </div>

            {/* mini social proof */}
            <div className="hero-proof">
              <div className="proof-avatars">
                {["J", "M", "A", "R"].map((l) => (
                  <span key={l} className="proof-avatar">{l}</span>
                ))}
              </div>
              <p className="proof-text">Built for people who work with lots of documents</p>
            </div>
          </div>

          {/* mock terminal / chat preview */}
          <div className="hero-visual" aria-hidden="true">
            <div className="mock-window">
              <div className="mock-titlebar">
                <span className="mock-dot" style={{ background: "#ef4444" }} />
                <span className="mock-dot" style={{ background: "#f59e0b" }} />
                <span className="mock-dot" style={{ background: "#22c55e" }} />
                <span className="mock-title">InkDex Chat</span>
              </div>
              <div className="mock-body">
                <div className="mock-msg mock-user">What does section 4.2 say about liability?</div>
                <div className="mock-msg mock-ai">
                  <span className="mock-ai-label">InkDex</span>
                  Section 4.2 limits liability to direct damages not exceeding the fees paid in the
                  prior 12 months. Consequential and incidental damages are explicitly excluded
                  under clause 4.2(b)…
                </div>
                <div className="mock-msg mock-user">Which documents mention the refund policy?</div>
                <div className="mock-typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="how-section">
          <div className="section-inner">
            <p className="section-label">How it works</p>
            <h2 className="section-title">Three steps to an answer</h2>
            <div className="steps-row">
              {steps.map((s, i) => (
                <div key={s.num} className="step-card">
                  <div className="step-num">{s.num}</div>
                  <h3 className="step-title">{s.title}</h3>
                  <p className="step-desc">{s.desc}</p>
                  {i < steps.length - 1 && <div className="step-arrow">→</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="features-section">
          <div className="section-inner">
            <p className="section-label">Features</p>
            <h2 className="section-title">Everything you need</h2>
            <div className="features-grid">
              {features.map((f) => (
                <div key={f.title} className="feature-card">
                  <div className="feature-icon-wrap">
                    <span className="feature-icon">{f.icon}</span>
                  </div>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA strip ── */}
        <section className="cta-section">
          <div className="cta-inner">
            <h2 className="cta-title">Ready to talk to your documents?</h2>
            <p className="cta-desc">It takes 30 seconds to upload your first PDF.</p>
            <Link href="/register" className="btn btn-primary btn-hero">
              Get started for free →
            </Link>
          </div>
        </section>

        <footer className="footer">
          <span className="navbar-logo">
            <span className="logo-icon">✦</span> InkDex
          </span>
          <p className="footer-copy">© {new Date().getFullYear()} InkDex. Built with FastAPI + Next.js.</p>
        </footer>
      </main>
    </>
  );
}