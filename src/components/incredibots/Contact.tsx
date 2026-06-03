"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { Reveal, MagneticButton } from "./primitives";

const ARROW = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const CHECK = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

type Status = "idle" | "sending" | "sent" | "error";
interface FormState { name: string; email: string; interest: string; message: string; }
type FieldErrors = Partial<Record<keyof FormState, string>>;

function validate(v: FormState): FieldErrors {
  const e: FieldErrors = {};
  if (!v.name.trim()) e.name = "Tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Use a valid email address.";
  if (v.message.trim().length < 6) e.message = "A few more words please.";
  return e;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", interest: "Sponsorship", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function set<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ve = validate(form);
    if (Object.keys(ve).length) { setErrors(ve); return; }
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatus("sent");
      } else if (json.error === "EMAIL_NOT_CONFIGURED") {
        // Dev fallback: open mailto so nothing is lost
        const subject = encodeURIComponent(`[Incredibots] ${form.interest} from ${form.name}`);
        const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nInterest: ${form.interest}\n\nMessage:\n${form.message}`);
        window.open(`mailto:incredibotsftc@gmail.com?subject=${subject}&body=${body}`, "_blank");
        setStatus("sent");
      } else {
        throw new Error(json.error ?? "Send failed");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="sec sec-contact snap">
      <div className="sec-num" aria-hidden>06 · Contact</div>
      <div className="sec-inner contact-grid">
        <div>
          <Reveal><span className="cap"><em>Contact</em> &mdash; get in touch</span></Reveal>
          <Reveal delay={0.05} clip>
            <h2 className="h-section">Say hello.<br />We respond.</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="lead">Whether you&rsquo;re interested in sponsorship, joining the team, or our Sea Forest and TeamForge programs, send us a message. We read every one and reply within 48 hours.</p>
          </Reveal>
          <div className="ct-channels">
            <Reveal delay={0.2}>
              <a href="mailto:incredibotsftc@gmail.com" className="ct-row">
                <span className="ct-k">Email</span>
                <span className="ct-v">incredibotsftc@gmail.com</span>
                <span className="ct-arr">&rarr;</span>
              </a>
            </Reveal>
            <Reveal delay={0.25}>
              <a href="https://www.instagram.com/ftc26336" target="_blank" rel="noopener noreferrer" className="ct-row">
                <span className="ct-k">Instagram</span>
                <span className="ct-v">@ftc26336</span>
                <span className="ct-arr">&rarr;</span>
              </a>
            </Reveal>
            <Reveal delay={0.3}>
              <a href="https://maps.google.com/?q=Sammamish,WA" target="_blank" rel="noopener noreferrer" className="ct-row">
                <span className="ct-k"><MapPin size={12} style={{ display: "inline", marginRight: 4, verticalAlign: "-1px" }} aria-hidden />Location</span>
                <span className="ct-v">Sammamish, WA</span>
                <span className="ct-arr">&rarr;</span>
              </a>
            </Reveal>
            <Reveal delay={0.35}>
              <div className="ct-row ct-row-static">
                <span className="ct-k">Team</span>
                <span className="ct-v">FTC #26336</span>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.2}>
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="success"
                className="ct-success-panel"
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="ct-success-icon">{CHECK}</div>
                <h3>Message sent!</h3>
                <p>We read every message and reply within 48 hours. If you applied to the team, we&rsquo;ll be in touch about next steps.</p>
                <button className="btn btn-ghost" onClick={() => { setStatus("idle"); setForm({ name: "", email: "", interest: "Sponsorship", message: "" }); }}>
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="ct-form"
                noValidate
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <label>
                  <span>Name</span>
                  <input name="name" value={form.name} onChange={(e) => set("name", e.target.value)}
                    placeholder="Jane Smith" aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "ct-err-name" : undefined} autoComplete="name" />
                  {errors.name && <span id="ct-err-name" className="ct-error" role="alert">{errors.name}</span>}
                </label>
                <label>
                  <span>Email</span>
                  <input name="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
                    placeholder="jane@company.com" aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "ct-err-email" : undefined} autoComplete="email" />
                  {errors.email && <span id="ct-err-email" className="ct-error" role="alert">{errors.email}</span>}
                </label>
                <label>
                  <span>Interest</span>
                  <select name="interest" value={form.interest} onChange={(e) => set("interest", e.target.value)}>
                    <option>Sponsorship</option>
                    <option>Join the team</option>
                    <option>Mentorship</option>
                    <option>Demo request</option>
                    <option>General</option>
                  </select>
                </label>
                <label>
                  <span>Message</span>
                  <textarea name="message" rows={4} value={form.message} onChange={(e) => set("message", e.target.value)}
                    placeholder={form.interest === "Join the team" ? "Tell us about yourself — your school year, any robotics experience, and why you want to join…" : "Tell us what you're thinking…"}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "ct-err-message" : undefined} />
                  {errors.message && <span id="ct-err-message" className="ct-error" role="alert">{errors.message}</span>}
                </label>
                {status === "error" && <div className="ct-error-block" role="alert">Something went wrong. Email us directly at incredibotsftc@gmail.com.</div>}
                <MagneticButton type="submit" className="btn btn-grad btn-full" disabled={status === "sending"}>
                  <span>{status === "sending" ? "Sending…" : form.interest === "Join the team" ? "Apply now" : "Send message"}</span>
                  {ARROW}
                </MagneticButton>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
