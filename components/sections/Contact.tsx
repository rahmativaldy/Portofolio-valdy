'use client';

import React, { useState, useRef } from 'react';
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
    'w-full bg-transparent py-2.5 text-xs sm:text-sm text-zinc-950 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 border-b font-mono transition-colors duration-150 focus:outline-none';
  const inputNormal =
    'border-zinc-200 dark:border-zinc-800 focus:border-zinc-950 dark:focus:border-white';
  const inputError =
    'border-red-500 dark:border-red-400 focus:border-red-500';

  const allChannels = [
    { name: PRIMARY_CONTACT.name, url: PRIMARY_CONTACT.url, displayValue: PRIMARY_CONTACT.displayValue, category: 'Primary' },
    ...PROFESSIONAL_LINKS.map((link) => ({ name: link.name, url: link.url, displayValue: link.displayValue || link.url, category: 'Professional' })),
    ...SECONDARY_LINKS.map((link) => ({ name: link.name, url: link.url, displayValue: link.displayValue || link.url, category: 'Social' })),
  ];

  return (
    <div
      className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-5 sm:py-6 md:py-10 text-zinc-900 dark:text-zinc-100 select-none space-y-8 sm:space-y-10 md:space-y-12 animate-fadeIn"
      id="contact"
    >
      {/* 01 / CONTACT */}
      <section className="space-y-4 pb-2 animate-fadeInUp">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
              01 / Contact
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Let&apos;s build something useful.
            </h1>
            <p className="text-xs md:text-sm font-mono text-zinc-600 dark:text-zinc-400">
              Frontend Developer · Mobile Developer · UI/UX Designer
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/90 px-3 py-1.5 rounded-sm border border-zinc-200 dark:border-zinc-800">
            <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Indonesia · Open to opportunities</span>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white leading-tight max-w-3xl">
            &ldquo;Direct communication channels and project inquiry form.&rdquo;
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed max-w-3xl">
            Open to discussions around frontend engineering, Flutter mobile development, UI/UX design systems, and product development projects. Reach out directly via email, connect on professional profiles, or send a message below.
          </p>
        </div>
      </section>

      {/* 02 / CHANNELS & FORM */}
      <section
        className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-6 animate-fadeInUp"
        style={{ animationDelay: '100ms' }}
      >
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
            02 / Contact &amp; Channels
          </div>
          <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
            Direct &amp; Message Channels
          </div>
        </div>

        {/* Grid Layout: Editorial 2-column on desktop, stacked on mobile/tablet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Contact Info & Social Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Email Card */}
            <div className="p-4 sm:p-5 rounded-sm border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">
                Primary Contact
              </div>
              <a
                href={PRIMARY_CONTACT.url}
                className="text-sm sm:text-base font-mono font-bold tracking-tight text-zinc-950 dark:text-white hover:underline block truncate"
              >
                {PRIMARY_CONTACT.displayValue}
              </a>
              <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                Email inquiry · Direct inbox
              </p>
            </div>

            {/* All Channels List */}
            <div className="p-4 sm:p-5 rounded-sm border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] space-y-3">
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold border-b border-zinc-100 dark:border-zinc-800/60 pb-2">
                Profiles &amp; Networks
              </div>
              <div className="space-y-2 font-mono text-xs">
                {allChannels.map((channel) => (
                  <a
                    key={channel.name}
                    href={channel.url}
                    target={channel.url.startsWith('mailto:') ? '_self' : '_blank'}
                    rel={channel.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="group flex items-center justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/40 last:border-0 text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{channel.name}</span>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase">
                        ({channel.category})
                      </span>
                    </div>
                    <span className="text-zinc-400 dark:text-zinc-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Developer Identity Note */}
            <div className="p-4 rounded-sm border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/60 space-y-1 font-mono text-xs text-zinc-600 dark:text-zinc-400">
              <p className="font-bold text-zinc-950 dark:text-white uppercase">Rahmat Ivaldy</p>
              <p>Frontend Developer · Mobile Developer · UI/UX Designer</p>
              <p>Indonesia · Remote &amp; Project Collaborations</p>
            </div>
          </div>

          {/* Right Column: Clean Minimal Contact Form */}
          <div className="lg:col-span-7 p-4 sm:p-6 md:p-8 rounded-sm border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] space-y-5 sm:space-y-6">
            <div className="space-y-1 border-b border-zinc-100 dark:border-zinc-800/60 pb-3 sm:pb-4">
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
                Send a Message
              </h3>
              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                Direct inquiry form backed by server validation
              </p>
            </div>

            {status === 'success' ? (
              <div
                id="contact-form-success"
                aria-live="polite"
                className="p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 rounded-sm bg-zinc-50 dark:bg-zinc-900/60 space-y-3 animate-fadeIn"
              >
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-950 dark:text-white font-bold block">
                  ✓ Message Received
                </span>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                  Thank you for reaching out! Your message has been received. I will review it and respond to your email address shortly.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    id="contact-send-another"
                    onClick={() => {
                      setStatus('idle');
                      setTimeout(() => nameRef.current?.focus(), 50);
                    }}
                    className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-950 dark:text-white hover:underline cursor-pointer"
                  >
                    Send Another Message →
                  </button>
                </div>
              </div>
            ) : (
              <form
                id="contact-form"
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
              >
                {/* Name Field */}
                <div className="space-y-1">
                  <label
                    htmlFor="contact-name"
                    className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold"
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
                    className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold"
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
                    className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold"
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Details about your inquiry, project scope, or questions..."
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
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-sm bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-mono font-semibold uppercase tracking-wider hover:bg-zinc-800 dark:hover:bg-zinc-200 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{status === 'sending' ? 'Sending Message…' : 'Submit Message'}</span>
                    {status !== 'sending' && (
                      <span
                        className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <section
        className="pt-6 md:pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeInUp"
        style={{ animationDelay: '300ms' }}
      >
        <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          Rahmat Workspace · Communication Channels
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveSection('projects')}
            className="group inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-sm bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-mono font-semibold uppercase tracking-wider hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <span>Explore Projects</span>
            <span
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('experience')}
            className="group inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-800 dark:text-zinc-200 text-xs font-mono font-semibold uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <span>View Journey</span>
            <span
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('blog')}
            className="group inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-800 dark:text-zinc-200 text-xs font-mono font-semibold uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <span>Read Notes</span>
            <span
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
