'use client';

import React, { useState, useRef } from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { useLanguage } from '@/context/LanguageContext';
import { PRIMARY_CONTACT, PROFESSIONAL_LINKS, SECONDARY_LINKS } from '@/data/contact';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

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

export function Contact() {
  const { setActiveSection } = useWorkspace();
  const { t } = useLanguage();
  const [fields, setFields] = useState<FormFields>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [serverError, setServerError] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);

  const validate = (formFields: FormFields): FieldErrors => {
    const errs: FieldErrors = {};
    if (!formFields.name.trim() || formFields.name.trim().length < 2) {
      errs.name = t.contact.form.errors.nameRequired;
    }
    if (!isValidEmail(formFields.email)) {
      errs.email = t.contact.form.errors.emailInvalid;
    }
    if (!formFields.message.trim() || formFields.message.trim().length < 10) {
      errs.message = t.contact.form.errors.messageRequired;
    }
    return errs;
  };

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
          data.error || t.contact.form.errors.genericServer,
        );
        setStatus('error');
        return;
      }

      setStatus('success');
      setFields({ name: '', email: '', message: '' });
    } catch {
      setServerError(t.contact.form.errors.genericServer);
      setStatus('error');
    }
  };

  const inputBase =
    'w-full bg-transparent py-2.5 text-sm font-sans text-zinc-950 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 border-b transition-colors duration-150 focus:outline-none';
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
      className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-12 md:py-16 text-zinc-900 dark:text-zinc-100 select-none space-y-12 sm:space-y-16 md:space-y-20"
      id="contact"
    >
      {/* 01 / CONTACT HERO */}
      <section className="space-y-6 sm:space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6 sm:pb-8">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium">
              {t.contact.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-950 dark:text-white">
              {t.contact.title}
            </h1>
            <p className="text-sm sm:text-base font-sans text-zinc-600 dark:text-zinc-400 font-normal">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/90 px-3 py-1.5 rounded-sm border border-zinc-200 dark:border-zinc-800">
            <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>{t.contact.status}</span>
          </div>
        </div>

        <div className="space-y-4 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white leading-tight">
            {t.contact.heroHeading}
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
            {t.contact.heroDescription}
          </p>
        </div>
      </section>

      {/* 02 / CHANNELS & FORM */}
      <ScrollReveal delay={0.1}>
        <section className="pt-8 sm:pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-8 sm:space-y-10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium block">
                {t.contact.channelsTag}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
                {t.contact.channelsTitle}
              </h3>
            </div>
          </div>

          {/* Grid Layout: 2-column on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Direct Contact Info & Social Channels */}
            <div className="lg:col-span-5 space-y-6">
              {/* Primary Email Box */}
              <div className="p-5 sm:p-6 rounded-sm border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#121215] space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-medium">
                  {t.contact.primaryEmail}
                </div>
                <a
                  href={PRIMARY_CONTACT.url}
                  className="text-base sm:text-lg font-sans font-bold tracking-tight text-zinc-950 dark:text-white hover:underline block truncate"
                >
                  {PRIMARY_CONTACT.displayValue}
                </a>
                <p className="text-xs font-sans text-zinc-500 dark:text-zinc-400">
                  {t.contact.primaryEmailDesc}
                </p>
              </div>

              {/* All Channels List */}
              <div className="p-5 sm:p-6 rounded-sm border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#121215] space-y-4">
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-medium border-b border-zinc-100 dark:border-zinc-800/60 pb-2.5">
                  {t.contact.profilesTitle}
                </div>
                <div className="space-y-2.5 text-sm">
                  {allChannels.map((channel) => (
                    <a
                      key={channel.name}
                      href={channel.url}
                      target={channel.url.startsWith('mailto:') ? '_self' : '_blank'}
                      rel={channel.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                      className="group flex items-center justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/40 last:border-0 text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-sans font-medium">{channel.name}</span>
                        <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase">
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

              {/* Developer Identity Note */}
              <div className="p-4 rounded-sm border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/60 space-y-1 font-sans text-xs text-zinc-600 dark:text-zinc-400">
                <p className="font-bold text-zinc-950 dark:text-white uppercase font-sans">Rahmat Ivaldy</p>
                <p>{t.contact.subtitle}</p>
                <p>{t.contact.developerLocation}</p>
              </div>
            </div>

            {/* Right Column: Clean Minimal Contact Form */}
            <div className="lg:col-span-7 p-5 sm:p-7 md:p-8 rounded-sm border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#121215] space-y-6">
              <div className="space-y-1 border-b border-zinc-100 dark:border-zinc-800/60 pb-4">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white font-sans">
                  {t.contact.sendMessageTitle}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-zinc-500 dark:text-zinc-400">
                  {t.contact.sendMessageDesc}
                </p>
              </div>

              {status === 'success' ? (
                <div
                  id="contact-form-success"
                  aria-live="polite"
                  className="p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 rounded-sm bg-zinc-50 dark:bg-zinc-900/60 space-y-3 animate-fadeIn"
                >
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-950 dark:text-white font-bold block">
                    {t.contact.form.successTitle}
                  </span>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                    {t.contact.form.successMessage}
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      id="contact-send-another"
                      onClick={() => {
                        setStatus('idle');
                        setTimeout(() => nameRef.current?.focus(), 50);
                      }}
                      className="text-sm font-sans font-medium text-zinc-950 dark:text-white hover:underline cursor-pointer"
                    >
                      {t.contact.form.sendAnother}
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
                      className="block text-xs font-sans font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                    >
                      {t.contact.form.nameLabel}
                    </label>
                    <input
                      ref={nameRef}
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder={t.contact.form.namePlaceholder}
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
                      className="block text-xs font-sans font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                    >
                      {t.contact.form.emailLabel}
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={t.contact.form.emailPlaceholder}
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
                      className="block text-xs font-sans font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                    >
                      {t.contact.form.messageLabel}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      placeholder={t.contact.form.messagePlaceholder}
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
                      className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-sm font-sans font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>{status === 'sending' ? t.contact.form.sendingBtn : t.contact.form.submitBtn}</span>
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
      </ScrollReveal>

      {/* NAVIGATION FOOTER */}
      <ScrollReveal delay={0.1}>
        <section className="pt-8 sm:pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            {t.contact.footerText}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveSection('projects')}
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-sm font-sans font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              <span>{t.contact.exploreProjectsCta}</span>
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
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-800 dark:text-zinc-200 text-sm font-sans font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              <span>{t.contact.viewJourneyCta}</span>
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
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-800 dark:text-zinc-200 text-sm font-sans font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              <span>{t.contact.readNotesCta}</span>
              <span
                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </button>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}


