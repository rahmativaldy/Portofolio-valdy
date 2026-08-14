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
    errors.message = 'Write a message before sending (at least 10 characters).';
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
    'w-full bg-transparent py-3 text-sm text-zinc-950 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 border-b font-mono transition-colors duration-150 focus:outline-none';
  const inputNormal =
    'border-zinc-200 dark:border-zinc-800 focus:border-zinc-950 dark:focus:border-white';
  const inputError =
    'border-red-500 dark:border-red-400 focus:border-red-500';

  return (
    <section className="py-8 md:py-12 px-6 md:px-10 max-w-6xl xl:max-w-7xl mx-auto space-y-12 animate-fadeIn" id="contact">
      {/* Section Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 pb-8 space-y-3">
        <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
          Contact & Channels
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white leading-tight">
          Get In Touch
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Open to discussions around frontend engineering, Flutter mobile development, design systems, and software projects.
        </p>
      </header>

      {/* Grid Layout */}
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Direct Links */}
        <div className="lg:col-span-5 space-y-8">
          {/* Direct Email */}
          <div className="space-y-2 border-b border-zinc-200 dark:border-zinc-800 pb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
              Direct Email
            </span>
            <div>
              <a
                href={PRIMARY_CONTACT.url}
                className="text-lg md:text-xl font-mono font-bold tracking-tight text-zinc-950 dark:text-white hover:underline block"
              >
                {PRIMARY_CONTACT.displayValue}
              </a>
              <p className="mt-1 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                Primary contact channel
              </p>
            </div>
          </div>

          {/* Professional Links */}
          <div className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
              Professional Profiles
            </span>
            <div className="space-y-2 text-sm font-mono">
              {PROFESSIONAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white hover:underline transition-colors"
                >
                  <span>{link.name}</span>
                  <span className="text-xs text-zinc-400">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Secondary Links */}
          <div className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
              Elsewhere
            </span>
            <div className="space-y-2 text-xs font-mono">
              {SECONDARY_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:underline transition-colors"
                >
                  <span>{link.name} ({link.displayValue})</span>
                  <span className="text-zinc-400">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Developer Details */}
          <div className="space-y-1 font-mono text-xs text-zinc-500 dark:text-zinc-400">
            <p className="font-bold text-zinc-950 dark:text-white uppercase">RAHMAT IVALDY</p>
            <p>Frontend · Mobile · UI/UX</p>
            <p>Indonesia</p>
          </div>
        </div>

        {/* Right Column: Minimal Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Send a Message
            </h2>
            <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              Direct message to my inbox
            </p>
          </div>

          {status === 'success' ? (
            <div
              id="contact-form-success"
              aria-live="polite"
              className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-md bg-white dark:bg-[#141417] space-y-3 animate-fadeIn"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-950 dark:text-white font-bold">
                Message Received
              </span>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Thank you for your message. I will respond to your email as soon as possible.
              </p>
              <button
                type="button"
                id="contact-send-another"
                onClick={() => {
                  setStatus('idle');
                  setTimeout(() => nameRef.current?.focus(), 50);
                }}
                className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-950 dark:text-white hover:underline cursor-pointer pt-2 block"
              >
                Send Another Message →
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
              <div className="space-y-1">
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold"
                >
                  Name *
                </label>
                <input
                  ref={nameRef}
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your Name"
                  value={fields.name}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                />
                {errors.name && (
                  <p id="contact-name-error" className="text-xs font-mono text-red-500 dark:text-red-400 mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold"
                >
                  Email Address *
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
                  <p id="contact-email-error" className="text-xs font-mono text-red-500 dark:text-red-400 mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-1">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold"
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Details about your inquiry..."
                  value={fields.message}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={`${inputBase} resize-none ${errors.message ? inputError : inputNormal}`}
                />
                {errors.message && (
                  <p id="contact-message-error" className="text-xs font-mono text-red-500 dark:text-red-400 mt-1">
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
                  className="px-5 py-2.5 rounded-md bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-mono font-semibold uppercase tracking-wider hover:bg-zinc-800 dark:hover:bg-zinc-200 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending Message…' : 'Submit Message →'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <footer className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setActiveSection('projects')}
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            Explore Projects →
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('overview')}
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            Back to Overview →
          </button>
        </div>

        <p className="text-zinc-400 dark:text-zinc-500">
          Rahmat Workspace · Communication Channels
        </p>
      </footer>
    </section>
  );
}
