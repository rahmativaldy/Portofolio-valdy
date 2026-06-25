'use client';

import { useState, useRef } from 'react';
import { CONTACT_LINKS } from '@/data/contact';
import { Button } from '@/components/ui/Button';

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
    errors.name = 'Name must be at least 2 characters.';
  }
  if (!isValidEmail(fields.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!fields.message.trim() || fields.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }
  return errors;
}

export function Contact() {
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
    // Clear field error on change
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
        setServerError(data.error || 'Something went wrong. Try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
      setFields({ name: '', email: '', message: '' });
    } catch {
      setServerError('Network error. Check your connection and try again.');
      setStatus('error');
    }
  };

  const inputBase =
    'w-full px-3 py-2.5 text-sm bg-white dark:bg-zinc-900 border rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 transition-all duration-150';
  const inputNormal =
    'border-zinc-200 dark:border-zinc-800 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500/20';
  const inputError =
    'border-red-400 dark:border-red-500 focus:border-red-400 focus:ring-red-400/20';

  return (
    <div className="py-12 px-4 md:px-8 max-w-4xl mx-auto space-y-8 animate-fadeIn" id="contact">
      {/* Section Header */}
      <div>
        <div className="mb-3 inline-flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
          <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider">Contact</span>
        </div>
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Get in Touch
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 max-w-lg">
          Open to freelance, collaboration, or just a good conversation about tech.
        </p>
      </div>

      {/* Social Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CONTACT_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target={link.url.startsWith('mailto:') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 p-5 bg-white dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800/60 rounded-xl hover:border-zinc-300 dark:hover:border-zinc-700/80 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-all duration-150 cursor-pointer"
          >
            <span className="text-3xl select-none group-hover:scale-105 transition-transform duration-150">
              {link.icon}
            </span>
            <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
              {link.name}
            </span>
          </a>
        ))}
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-800/60" />

      {/* Contact Form */}
      <div className="grid md:grid-cols-5 gap-8">
        {/* Left: form */}
        <div className="md:col-span-3">
          <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-5">
            Send a Message
          </h3>

          {status === 'success' ? (
            <div
              id="contact-form-success"
              className="p-6 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-xl text-center space-y-2 animate-fadeIn"
            >
              <div className="text-3xl">✅</div>
              <p className="font-semibold text-emerald-800 dark:text-emerald-300">
                Message sent!
              </p>
              <p className="text-sm text-emerald-700 dark:text-emerald-400">
                Thanks for reaching out. I&apos;ll get back to you soon.
              </p>
              <button
                id="contact-send-another"
                onClick={() => { setStatus('idle'); nameRef.current?.focus(); }}
                className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              noValidate
              className="space-y-4"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5"
                >
                  Name <span className="text-red-400">*</span>
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
                  <p id="contact-name-error" className="mt-1 text-xs text-red-500 dark:text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5"
                >
                  Email <span className="text-red-400">*</span>
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
                  <p id="contact-email-error" className="mt-1 text-xs text-red-500 dark:text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5"
                >
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="What's on your mind?"
                  value={fields.message}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={`${inputBase} resize-none ${errors.message ? inputError : inputNormal}`}
                />
                {errors.message && (
                  <p id="contact-message-error" className="mt-1 text-xs text-red-500 dark:text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Server error */}
              {status === 'error' && serverError && (
                <p
                  id="contact-server-error"
                  className="text-sm text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/60 rounded-lg px-3 py-2"
                >
                  {serverError}
                </p>
              )}

              <Button
                id="contact-submit"
                type="submit"
                variant="primary"
                size="md"
                disabled={status === 'sending'}
                className="w-full cursor-pointer"
              >
                {status === 'sending' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Sending…
                  </span>
                ) : 'Send Message'}
              </Button>
            </form>
          )}
        </div>

        {/* Right: direct contact card */}
        <div className="md:col-span-2 flex flex-col justify-start gap-4">
          <div className="p-5 bg-white dark:bg-zinc-900/10 border border-zinc-200 dark:border-zinc-800/40 rounded-xl space-y-3">
            <h4 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Or reach me directly
            </h4>
            <a
              href="mailto:rahmativaldy65@gmail.com"
              className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline break-all"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              rahmativaldy65@gmail.com
            </a>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Indonesia · Usually replies within 24h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
