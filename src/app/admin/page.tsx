"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type NewsletterPayload = {
  active: boolean;
  id: string;
  title: string;
  date: string;
  preview: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

const EMPTY: NewsletterPayload = {
  active: true,
  id: "",
  title: "",
  date: "",
  preview: "",
  body: "",
  ctaLabel: "Contact us",
  ctaHref: "#contact",
};

type Status = "idle" | "saving" | "saved" | "error";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="adm-field">
      <label className="adm-label">
        {label}
        {hint && <span className="adm-hint"> — {hint}</span>}
      </label>
      {children}
    </div>
  );
}

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authErr, setAuthErr] = useState("");
  const [form, setForm] = useState<NewsletterPayload>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const keyRef = useRef<HTMLInputElement>(null);

  // Try loading current newsletter after auth
  const loadCurrent = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter");
      if (res.ok) {
        const data = await res.json();
        setForm({
          active: data.active ?? true,
          id: data.id ?? "",
          title: data.title ?? "",
          date: data.date ?? "",
          preview: data.preview ?? "",
          body: data.body ?? "",
          ctaLabel: data.cta?.label ?? "Contact us",
          ctaHref: data.cta?.href ?? "#contact",
        });
      }
    } catch { /* use empty form */ }
    setLoading(false);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthErr("");
    // Verify the key via a safe read-only check — never writes data.
    const res = await fetch("/api/newsletter?check=1", {
      headers: { "x-admin-key": key },
    });
    if (res.status === 401) {
      setAuthErr("Incorrect admin key. Check your NEWSLETTER_ADMIN_KEY environment variable.");
      return;
    }
    setAuthed(true);
    await loadCurrent();
  };

  const set = <K extends keyof NewsletterPayload>(k: K, v: NewsletterPayload[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async (activate: boolean) => {
    setStatus("saving");
    setStatusMsg("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": key },
        body: JSON.stringify({
          active: activate,
          id: form.id || `newsletter-${Date.now()}`,
          title: form.title,
          date: form.date || new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
          preview: form.preview,
          body: form.body,
          cta: { label: form.ctaLabel, href: form.ctaHref },
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Save failed");
      setStatus("saved");
      setStatusMsg(activate ? "Newsletter published. Visitors will see the popup." : "Newsletter saved as draft. Popup is hidden.");
      setForm((f) => ({ ...f, active: activate }));
    } catch (err) {
      setStatus("error");
      setStatusMsg(err instanceof Error ? err.message : "Unknown error.");
    }
  };

  // Focus key input on mount
  useEffect(() => { keyRef.current?.focus(); }, []);

  if (!authed) {
    return (
      <div className="adm-auth-wrap">
        <div className="adm-auth-card">
          <div className="adm-auth-mark">IB</div>
          <h1 className="adm-auth-title">Newsletter Admin</h1>
          <p className="adm-auth-sub">Incredibots FTC #26336</p>
          <form onSubmit={handleAuth} className="adm-auth-form">
            <label className="adm-label" htmlFor="admin-key">Admin key</label>
            <input
              id="admin-key"
              ref={keyRef}
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="adm-input"
              placeholder="Enter your admin key"
              autoComplete="current-password"
            />
            {authErr && <p className="adm-auth-err">{authErr}</p>}
            <button type="submit" className="adm-btn adm-btn-red">Sign in</button>
          </form>
          <p className="adm-auth-note">
            Default key in development: <code>incredibots-admin</code><br />
            Set <code>NEWSLETTER_ADMIN_KEY</code> in your environment to change it.
          </p>
        </div>
        <style>{admStyles}</style>
      </div>
    );
  }

  return (
    <div className="adm-wrap">
      <style>{admStyles}</style>

      {/* Sidebar */}
      <aside className="adm-sidebar">
        <Link href="/" className="adm-back">← Back to site</Link>
        <div className="adm-logo">
          <span className="adm-auth-mark" style={{ width: 28, height: 28, fontSize: 11 }}>IB</span>
          <span style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>Newsletter Admin</span>
        </div>
        <nav className="adm-nav">
          <button className="adm-nav-item is-active">Compose</button>
        </nav>
        <div className="adm-sidebar-foot">
          <div className="adm-status-pip" data-active={form.active} />
          <span>{form.active ? "Live" : "Draft"}</span>
        </div>
      </aside>

      {/* Main */}
      <main className="adm-main">
        <header className="adm-header">
          <div>
            <h1 className="adm-page-title">Compose newsletter</h1>
            <p className="adm-page-sub">Write and publish popup announcements for site visitors.</p>
          </div>
          <div className="adm-header-actions">
            <button className="adm-btn adm-btn-ghost" onClick={() => setPreview((p) => !p)}>
              {preview ? "Edit" : "Preview"}
            </button>
            <button className="adm-btn adm-btn-ghost" onClick={() => handleSave(false)} disabled={status === "saving"}>
              Save draft
            </button>
            <button className="adm-btn adm-btn-red" onClick={() => handleSave(true)} disabled={status === "saving"}>
              {status === "saving" ? "Publishing…" : "Publish"}
            </button>
          </div>
        </header>

        {statusMsg && (
          <div className={`adm-banner ${status === "error" ? "adm-banner-err" : "adm-banner-ok"}`}>
            {statusMsg}
          </div>
        )}

        {loading ? (
          <div className="adm-loading">Loading current newsletter…</div>
        ) : preview ? (
          /* ── Preview ── */
          <div className="adm-preview-wrap">
            <p className="adm-preview-label">Preview — what visitors will see</p>
            <div className="adm-popup-preview">
              <div className="adm-pp-inner">
                <span className="adm-pp-eyebrow">{form.date || "June 2025"} · FTC Team #26336</span>
                <h2 className="adm-pp-title">{form.title || "Newsletter title"}</h2>
                <p className="adm-pp-preview">{form.preview || "Preview text goes here."}</p>
                <div className="adm-pp-rule" />
                <div className="adm-pp-body">
                  {(form.body || "Newsletter body goes here.").split("\n").map((p, i) =>
                    p.trim() ? <p key={i}>{p}</p> : <br key={i} />
                  )}
                </div>
                {form.ctaLabel && (
                  <div className="adm-pp-cta">
                    <a href={form.ctaHref} className="adm-pp-btn">{form.ctaLabel} →</a>
                    <button className="adm-pp-dismiss">Dismiss</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* ── Compose form ── */
          <div className="adm-form">
            <div className="adm-row">
              <Field label="Newsletter ID" hint="unique slug, e.g. june-2025-update">
                <input className="adm-input" value={form.id} onChange={(e) => set("id", e.target.value)}
                  placeholder="june-2025-update" />
              </Field>
              <Field label="Date label" hint="shown to visitors">
                <input className="adm-input" value={form.date} onChange={(e) => set("date", e.target.value)}
                  placeholder="June 2025" />
              </Field>
            </div>

            <Field label="Title" hint="headline of the popup">
              <input className="adm-input adm-input-lg" value={form.title} onChange={(e) => set("title", e.target.value)}
                placeholder="End of Season Update" />
            </Field>

            <Field label="Preview text" hint="one-sentence teaser shown below the title">
              <input className="adm-input" value={form.preview} onChange={(e) => set("preview", e.target.value)}
                placeholder="A short summary visitors see first." />
            </Field>

            <Field label="Body" hint="full newsletter content — separate paragraphs with a blank line">
              <textarea className="adm-textarea" rows={10} value={form.body}
                onChange={(e) => set("body", e.target.value)}
                placeholder={"Write your newsletter here.\n\nUse blank lines to separate paragraphs."} />
            </Field>

            <div className="adm-row">
              <Field label="CTA button label">
                <input className="adm-input" value={form.ctaLabel} onChange={(e) => set("ctaLabel", e.target.value)}
                  placeholder="Contact us" />
              </Field>
              <Field label="CTA link">
                <input className="adm-input" value={form.ctaHref} onChange={(e) => set("ctaHref", e.target.value)}
                  placeholder="#contact" />
              </Field>
            </div>

            <div className="adm-toggle-row">
              <label className="adm-toggle-label">
                <input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} />
                <span className="adm-toggle-track"><span className="adm-toggle-thumb" /></span>
                Show popup to visitors
              </label>
              <p className="adm-toggle-note">
                When off, the popup is hidden site-wide regardless of publish state.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const admStyles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; }

  body { background: #0d1320; color: #f0f2f8; font-family: -apple-system, 'Inter', sans-serif; }

  .adm-auth-wrap {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: #0d1320; padding: 2rem;
  }
  .adm-auth-card {
    background: #141c2e; border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px; padding: 2.5rem; width: 100%; max-width: 420px;
    display: flex; flex-direction: column; align-items: center; gap: 0.75rem;
    box-shadow: 0 24px 64px rgba(0,0,0,0.4);
  }
  .adm-auth-mark {
    width: 44px; height: 44px; border-radius: 10px;
    background: linear-gradient(135deg, #e63946, #4aa3e8);
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; font-weight: 800; color: #fff; letter-spacing: -0.03em;
    flex-shrink: 0;
  }
  .adm-auth-title { font-size: 20px; font-weight: 700; letter-spacing: -0.03em; margin-top: 0.25rem; }
  .adm-auth-sub { font-size: 13px; color: rgba(255,255,255,0.4); margin-top: -0.25rem; }
  .adm-auth-form { width: 100%; display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.75rem; }
  .adm-auth-err { font-size: 12.5px; color: #ff8a92; }
  .adm-auth-note { font-size: 11.5px; color: rgba(255,255,255,0.3); text-align: center; line-height: 1.6; margin-top: 0.5rem; }
  .adm-auth-note code { background: rgba(255,255,255,0.08); padding: 1px 5px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }

  /* Layout */
  .adm-wrap { display: flex; min-height: 100vh; }

  .adm-sidebar {
    width: 220px; flex-shrink: 0; background: #0f1521;
    border-right: 1px solid rgba(255,255,255,0.08);
    display: flex; flex-direction: column;
    padding: 1.5rem 1rem; gap: 1.5rem; position: sticky; top: 0; height: 100vh;
  }
  .adm-back { font-size: 12.5px; color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.15s; }
  .adm-back:hover { color: #fff; }
  .adm-logo { display: flex; align-items: center; gap: 10px; font-size: 14px; }
  .adm-nav { display: flex; flex-direction: column; gap: 2px; flex: 1; }
  .adm-nav-item {
    text-align: left; padding: 8px 12px; border-radius: 8px;
    font-size: 13.5px; font-weight: 500; color: rgba(255,255,255,0.5);
    background: none; border: none; cursor: pointer; transition: all 0.15s;
  }
  .adm-nav-item.is-active { background: rgba(255,255,255,0.08); color: #fff; }
  .adm-sidebar-foot {
    display: flex; align-items: center; gap: 7px;
    font-size: 12px; color: rgba(255,255,255,0.4); padding: 0 4px;
  }
  .adm-status-pip {
    width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,0.2);
    transition: background 0.3s;
  }
  .adm-status-pip[data-active="true"] {
    background: #22c55e;
    box-shadow: 0 0 8px rgba(34,197,94,0.5);
    animation: admPip 2s ease-in-out infinite;
  }
  @keyframes admPip { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }

  .adm-main {
    flex: 1; display: flex; flex-direction: column;
    background: #0d1320; overflow-y: auto;
  }
  .adm-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    padding: 2rem 2.5rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.08);
    gap: 1.5rem; flex-wrap: wrap;
  }
  .adm-page-title { font-size: 22px; font-weight: 700; letter-spacing: -0.03em; }
  .adm-page-sub { font-size: 13.5px; color: rgba(255,255,255,0.45); margin-top: 4px; }
  .adm-header-actions { display: flex; gap: 8px; flex-wrap: wrap; }

  .adm-banner {
    margin: 1.5rem 2.5rem 0; padding: 0.8rem 1.2rem;
    border-radius: 8px; font-size: 13.5px;
  }
  .adm-banner-ok { background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.25); color: #4ade80; }
  .adm-banner-err { background: rgba(230,57,70,0.1); border: 1px solid rgba(230,57,70,0.25); color: #ff8a92; }

  .adm-loading { padding: 3rem 2.5rem; color: rgba(255,255,255,0.4); font-size: 14px; }

  /* Buttons */
  .adm-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 18px; border-radius: 9px; font-size: 13.5px; font-weight: 600;
    cursor: pointer; border: none; transition: all 0.18s; letter-spacing: -0.01em;
  }
  .adm-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .adm-btn-red { background: #e63946; color: #fff; }
  .adm-btn-red:not(:disabled):hover { background: #ef4651; transform: translateY(-1px); }
  .adm-btn-ghost {
    background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.85);
    border: 1px solid rgba(255,255,255,0.12);
  }
  .adm-btn-ghost:not(:disabled):hover { background: rgba(255,255,255,0.1); }

  /* Form */
  .adm-form { padding: 2rem 2.5rem; display: flex; flex-direction: column; gap: 1.5rem; max-width: 820px; }
  .adm-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
  .adm-field { display: flex; flex-direction: column; gap: 0.4rem; }
  .adm-label { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.4); }
  .adm-hint { text-transform: none; letter-spacing: 0; font-weight: 400; }
  .adm-input {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px; color: #f0f2f8; padding: 0.7rem 0.9rem;
    font-size: 14.5px; font-family: inherit; outline: none;
    transition: border-color 0.2s, background 0.2s;
  }
  .adm-input:focus { border-color: #e63946; background: rgba(255,255,255,0.07); }
  .adm-input-lg { font-size: 17px; font-weight: 600; letter-spacing: -0.01em; padding: 0.8rem 0.9rem; }
  .adm-textarea {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px; color: #f0f2f8; padding: 0.85rem 0.9rem;
    font-size: 14.5px; font-family: inherit; line-height: 1.65; outline: none; resize: vertical;
    transition: border-color 0.2s;
  }
  .adm-textarea:focus { border-color: #e63946; }

  /* Toggle */
  .adm-toggle-row { display: flex; flex-direction: column; gap: 0.4rem; }
  .adm-toggle-label { display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 14px; font-weight: 500; }
  .adm-toggle-label input[type="checkbox"] { position: absolute; opacity: 0; width: 0; height: 0; }
  .adm-toggle-track {
    width: 38px; height: 22px; border-radius: 12px;
    background: rgba(255,255,255,0.12); transition: background 0.25s;
    position: relative; flex-shrink: 0;
  }
  .adm-toggle-label input:checked + .adm-toggle-track { background: #22c55e; }
  .adm-toggle-thumb {
    position: absolute; width: 16px; height: 16px; border-radius: 50%;
    background: #fff; top: 3px; left: 3px;
    transition: transform 0.25s cubic-bezier(0.16,1,0.3,1);
  }
  .adm-toggle-label input:checked ~ .adm-toggle-track .adm-toggle-thumb { transform: translateX(16px); }
  .adm-toggle-note { font-size: 12px; color: rgba(255,255,255,0.35); margin-left: 48px; }

  /* Preview */
  .adm-preview-wrap { padding: 2rem 2.5rem; }
  .adm-preview-label { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 1.25rem; }
  .adm-popup-preview {
    max-width: 540px; background: #141c2e;
    border: 1px solid rgba(255,255,255,0.12); border-radius: 16px;
    padding: 2.5rem; box-shadow: 0 32px 80px rgba(0,0,0,0.5);
  }
  .adm-pp-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 10.5px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.4); }
  .adm-pp-title { font-size: 24px; font-weight: 800; letter-spacing: -0.03em; margin-top: 0.5rem; line-height: 1.15; }
  .adm-pp-preview { font-size: 15px; color: rgba(255,255,255,0.65); margin-top: 0.5rem; line-height: 1.55; }
  .adm-pp-rule { height: 1px; background: rgba(255,255,255,0.1); margin: 1.25rem 0; }
  .adm-pp-body { font-size: 14.5px; line-height: 1.7; color: rgba(255,255,255,0.75); display: flex; flex-direction: column; gap: 0.6rem; }
  .adm-pp-cta { display: flex; align-items: center; gap: 0.75rem; margin-top: 1.5rem; flex-wrap: wrap; }
  .adm-pp-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 10px 20px; background: #e63946; color: #fff;
    font-weight: 600; font-size: 14px; border-radius: 9px; text-decoration: none;
    transition: background 0.15s;
  }
  .adm-pp-dismiss {
    font-size: 13px; color: rgba(255,255,255,0.4); background: none; border: none;
    cursor: pointer; padding: 4px; transition: color 0.15s;
  }
  .adm-pp-dismiss:hover { color: #fff; }

  @media (max-width: 768px) {
    .adm-sidebar { display: none; }
    .adm-row { grid-template-columns: 1fr; }
    .adm-header { padding: 1.25rem; }
    .adm-form { padding: 1.25rem; }
    .adm-preview-wrap { padding: 1.25rem; }
    .adm-banner { margin: 1rem 1.25rem 0; }
  }
`;
