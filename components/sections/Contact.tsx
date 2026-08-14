'use client';

import { useState, useRef } from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { PRIMARY_CONTACT, PROFESSIONAL_LINKS, SECONDARY_LINKS } from '@/data/contact';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

interface FormFields {
  name: string;
  email: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validate(fields: FormFields): FieldErrors {
  const errors: FieldErrors = {};
  if (!fields.name.trim() || fields.name.trim().length < 2) {
    errors.name = 'Name is required (at least 2 characters).';
  }
  if (!isValidEmail(fields.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!fields.message.trim() || fields.message.trim().length < 10) {
    errors.message = 'Write a short message before sending (at least 10 characters).';
  }
  return errors;
}

export function Contact() {
  const { setActiveSection } = useWorkspace();
  const [fields, setFields] = useState<FormFields>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [serverError, setServerError] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate(fields);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setStatus('sending');
    setServerError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      const data = await res.json();

      if (!res.ok) {
        setServerError(
          data.error || "Message couldn't be sent. Please try again or contact me directly by email.",
        );
        setStatus('error');
        return;
      }

      setStatus('success');
      setFields({ name: '', email: '', message: '' });
    } catch {
      setServerError("Message couldn't be sent. Please try again or contact me directly by email.");
      setStatus('error');
    }
  };

  const inputBase =
    'w-full bg-transparent py-3 text-sm text-zinc-950 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 border-b transition-colors duration-200 focus:outline-none';
  const inputNormal =
    'border-zinc-200 dark:border-zinc-800 focus:border-blue-600 dark:focus:border-blue-400';
  const inputError =
    'border-red-500 dark:border-red-400 focus:border-red-500';

  return (
    <section className="py-12 md:py-14 lg:py-16 px-4 md:px-8 lg:px-12 max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] mx-auto space-y-16 animate-fadeIn" id="contact">
      {/* Section Header */}
      <header className="max-w-3xl space-y-5">
        <div className="inline-flex items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-[0.35em] text-blue-600 dark:text-blue-400 font-medium">
            Connect
          </span>
          <span className="h-px flex-1 bg-blue-500/20 dark:bg-blue-500/30" aria-hidden="true" />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
            Have something worth building together?
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
            I am open to conversations around interface engineering, mobile products, design systems, and thoughtful digital experiences.
          </p>
        </div>
      </header>

      {/* Asymmetric Desktop Composition & Responsive Grid */}
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
        {/* Left Column: Context, Direct Contact, Professional Links, Signature */}
        <div className="lg:col-span-6 space-y-10">
          {/* Status & Location Metadata */}
          <div className="grid sm:grid-cols-2 gap-6 pt-2 border-t border-zinc-200/80 dark:border-zinc-800/70">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Status
              </span>
              <p className="text-sm font-medium text-zinc-900 dark:text-white">
                Open to opportunities
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Location
              </span>
              <p className="text-sm font-medium text-zinc-900 dark:text-white">
                Indonesia
              </p>
            </div>
          </div>

          {/* Primary Contact: Email */}
          <div className="space-y-3 pt-6 border-t border-zinc-200/80 dark:border-zinc-800/70">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Direct
            </span>
            <div>
              <a
                href={PRIMARY_CONTACT.url}
                className="group inline-flex items-center gap-2 text-lg md:text-xl font-semibold tracking-tight text-zinc-950 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span>{PRIMARY_CONTACT.displayValue}</span>
                <span className="text-sm font-mono text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true">
                  ↗
                </span>
              </a>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                Primary communication channel
              </p>
            </div>
          </div>

          {/* Professional Links */}
          <div className="space-y-3 pt-6 border-t border-zinc-200/80 dark:border-zinc-800/70">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Professional
            </span>
            <div className="flex flex-col gap-3 text-sm font-medium">
              {PROFESSIONAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-between text-zinc-800 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-mono text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Secondary Link: Instagram */}
          <div className="space-y-3 pt-6 border-t border-zinc-200/80 dark:border-zinc-800/70">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Elsewhere
            </span>
            <div className="flex flex-col gap-3 text-xs font-medium">
              {SECONDARY_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-between text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  <span>{link.name}</span>
                  <span className="font-mono text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Signature Moment */}
          <div className="pt-8 border-t border-zinc-200/80 dark:border-zinc-800/70 space-y-1.5">
            <p className="text-sm font-semibold tracking-tight text-zinc-950 dark:text-white">
              RAHMAT IVALDY
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
              Frontend Developer · Mobile Developer · UI/UX Designer
            </p>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono">
              Indonesia
            </p>
          </div>
        </div>

        {/* Right Column: Editorial Contact Form */}
        <div className="lg:col-span-6 space-y-6 pt-2">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-white">
              Send a Message
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
              Direct message to my inbox
            </p>
          </div>

          {status === 'success' ? (
            <div
              id="contact-form-success"
              aria-live="polite"
              className="py-8 space-y-4 border-t border-b border-zinc-200/80 dark:border-zinc-800/70 animate-fadeIn"
            >
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400">
                  Message Sent
                </span>
                <p className="text-base font-semibold text-zinc-950 dark:text-white">
                  Thanks for reaching out.
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Your message has reached me. I&apos;ll get back to you as soon as I can.
                </p>
              </div>
              <button
                type="button"
                id="contact-send-another"
                onClick={() => {
                  setStatus('idle');
                  setTimeout(() => nameRef.current?.focus(), 50);
                }}
                className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                Send another message →
              </button>
            </div>
          ) : (
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              noValidate
              className="space-y-6"
            >
              {/* Name Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                >
                  Name <span className="text-blue-600 dark:text-blue-400" aria-hidden="true">*</span>
                </label>
                <input
                  ref={nameRef}
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={fields.name}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                />
                {errors.name && (
                  <p id="contact-name-error" className="text-xs font-mono text-red-500 dark:text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                >
                  Email <span className="text-blue-600 dark:text-blue-400" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={fields.email}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                />
                {errors.email && (
                  <p id="contact-email-error" className="text-xs font-mono text-red-500 dark:text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                >
                  Message <span className="text-blue-600 dark:text-blue-400" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Tell me briefly about what you're working on..."
                  value={fields.message}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={`${inputBase} resize-none ${errors.message ? inputError : inputNormal}`}
                />
                {errors.message && (
                  <p id="contact-message-error" className="text-xs font-mono text-red-500 dark:text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Server Error Message */}
              {status === 'error' && serverError && (
                <div
                  id="contact-server-error"
                  aria-live="polite"
                  className="p-3 border-l-2 border-red-500 bg-red-500/10 text-xs font-mono text-red-600 dark:text-red-400"
                >
                  {serverError}
                </div>
              )}

              {/* Submit Action */}
              <div className="pt-2">
                <button
                  id="contact-submit"
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-mono font-semibold uppercase tracking-wider transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
                >
                  {status === 'sending' ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending…
                    </span>
                  ) : (
                    <>
                      Send Message
                      <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* De-emphasized Portfolio Loop Navigation */}
      <footer className="pt-6 border-t border-zinc-200/60 dark:border-zinc-800/50 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
        <div className="flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={() => setActiveSection('projects')}
            className="hover:text-zinc-900 dark:hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 cursor-pointer"
          >
            Selected work →
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('overview')}
            className="hover:text-zinc-900 dark:hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 cursor-pointer"
          >
            Back to Overview →
          </button>
        </div>

        <p>Rahmat Workspace · Portfolio Loop</p>
      </footer>
    </section>
  );
}
