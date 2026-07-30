'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useData } from '../context/DataContext';
import { Icon } from '../components/Icon';
import { ArrowUpRight, BarChart3, ShieldCheck, Zap, Users, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ParallaxHero } from '../components/ParallaxHero';

gsap.registerPlugin(ScrollTrigger);

// ── Constants ────────────────────────────────────────────────────────────────

const SERVICE_ACCENTS: Record<string, string> = {
  'digital-marketing':      '#6366f1',
  'marketplace-management': '#10b981',
  'development':            '#f59e0b',
  'graphic-design':         '#ec4899',
  'hosting':                '#3b82f6',
  'communications':         '#8b5cf6',
};

const MARKETPLACE_LOGOS: Record<string, { logo: string; name: string }> = {
  amazon:   { name: 'Amazon',   logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  flipkart: { name: 'Flipkart', logo: 'https://brandlogos.net/wp-content/uploads/2020/11/Flipkart-logo-1-512x143.png' },
  meesho:   { name: 'Meesho',   logo: 'https://brandlogos.net/wp-content/uploads/2025/09/meesho-logo_brandlogos.net_ktaee-512x108.png' },
  myntra:   { name: 'Myntra',   logo: 'https://brandlogos.net/wp-content/uploads/2022/03/myntra-logo-brandlogos.net_-512x512.png' },
  nykaa:    { name: 'Nykaa',    logo: 'https://brandlogos.net/wp-content/uploads/2025/02/nykaa-logo_brandlogos.net_fcvn4-300x99.png' },
  ajio:     { name: 'Ajio',     logo: 'https://brandlogos.net/wp-content/uploads/2022/05/ajio-logo_brandlogos.net_muvsw-200x200.png' },
  blinkit:  { name: 'Blinkit',  logo: 'https://brandlogos.net/wp-content/uploads/2025/05/blinkit-logo_brandlogos.net_yvy1m-300x300.png' },
  zepto:    { name: 'Zepto',    logo: 'https://brandlogos.net/wp-content/uploads/2025/07/zepto-logo_brandlogos.net_7luw9-300x98.png' },
};

const WHY_US = [
  { icon: BarChart3,   title: 'Data-Driven',         body: 'Every decision backed by deep analytics and A/B testing to ensure maximum ROI.' },
  { icon: Users,       title: 'Dedicated Team',      body: 'Direct access to project managers, developers, and marketing specialists.' },
  { icon: ShieldCheck, title: 'Enterprise Security', body: 'Bank-grade security applied to all web assets and hosting environments.' },
  { icon: Zap,         title: 'Fast Turnaround',     body: 'Agile sprints ensure we execute, optimise, and launch faster than the competition.' },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

// Strips "-management" / "_management" suffix so "amazon-management" → "amazon"
const resolveMarketplaceLogo = (slug: string) =>
  MARKETPLACE_LOGOS[slug.toLowerCase().replace(/[-_]management$/, '').trim()];

// ── Sub-component: Marketplace grid with logos ────────────────────────────────

const MarketplaceSubServices = ({
  service,
  accent,
}: {
  service: any;
  accent: string;
}) => (
  <div className="mt-7 pt-7 border-t border-gray-100 dark:border-white/5">
    <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 dark:text-gray-500 mb-4">
      Platforms we manage
    </p>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {service.subServices.map((sub: any) => {
        const match = resolveMarketplaceLogo(sub.slug);
        return (
          <Link
            key={sub.id}
            href={`/services/${service.slug}/${sub.slug}`}
            className="mp-card group/mp relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#050505]"
            style={{ '--mp-accent': accent } as React.CSSProperties}
          >
            <span className="flex h-9 w-full items-center justify-center">
              {match ? (
                <img
                  src={match.logo}
                  alt={match.name}
                  className="max-h-8 w-auto object-contain max-w-[90px]"
                  loading="lazy"
                />
              ) : (
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
                  {sub.title}
                </span>
              )}
            </span>
            <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 group-hover/mp:text-gray-700 dark:group-hover/mp:text-gray-300 transition-colors text-center leading-tight">
              {match ? `${match.name} Management` : ''}
            </span>
            <span className="absolute top-2.5 right-2.5 opacity-0 group-hover/mp:opacity-100 transition-opacity">
              <ArrowUpRight size={11} style={{ color: accent }} />
            </span>
          </Link>
        );
      })}
    </div>
    <style>{`
      .mp-card:hover {
        border-color: transparent;
        box-shadow: 0 0 0 1.5px var(--mp-accent), 0 8px 24px -4px rgba(0,0,0,0.12);
        background: color-mix(in srgb, var(--mp-accent) 5%, white);
        transform: translateY(-2px);
      }
      .dark .mp-card:hover {
        background: color-mix(in srgb, var(--mp-accent) 8%, #050505);
      }
      .mp-card:focus-visible { --tw-ring-color: var(--mp-accent); }
    `}</style>
  </div>
);

// ── Sub-component: Regular sub-service grid ───────────────────────────────────

const RegularSubServices = ({
  service,
  accent,
}: {
  service: any;
  accent: string;
}) => (
  <div className="mt-7 pt-7 border-t border-gray-100 dark:border-white/5">
    <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 dark:text-gray-500 mb-4">
      What's included
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
      {service.subServices.map((sub: any) => (
        <Link
          key={sub.id}
          href={`/services/${service.slug}/${sub.slug}`}
          className="svc-pill group/pill flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#050505]"
          style={{ '--pill-accent': accent } as React.CSSProperties}
        >
          <span
            className="w-2 h-2 rounded-full shrink-0 transition-transform duration-200 group-hover/pill:scale-125"
            style={{ background: accent }}
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover/pill:text-gray-900 dark:group-hover/pill:text-white transition-colors">
            {sub.title}
          </span>
          <span className="ml-auto shrink-0 opacity-0 -translate-x-1 group-hover/pill:opacity-100 group-hover/pill:translate-x-0 transition-all duration-200">
            <ArrowUpRight size={13} style={{ color: accent }} />
          </span>
        </Link>
      ))}
    </div>
    <style>{`
      .svc-pill:hover {
        border-color: transparent;
        box-shadow: 0 0 0 1.5px var(--pill-accent), 0 4px 12px -2px rgba(0,0,0,0.08);
      }
      .svc-pill:focus-visible { --tw-ring-color: var(--pill-accent); }
    `}</style>
  </div>
);

// ── Main page ─────────────────────────────────────────────────────────────────

export const ServicesPage: React.FC = () => {
  const { services } = useData();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.svc-row',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.svc-list', start: 'top 80%' },
      }
    );
    gsap.fromTo('.why-card',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.why-grid', start: 'top 80%' },
      }
    );
  }, { scope: containerRef, dependencies: [services] });

  return (
    <div ref={containerRef} className="bg-gray-50 dark:bg-[#050505] min-h-screen">
      <ParallaxHero
        title="End-to-End Digital Solutions"
        subtitle="We blend creative innovation with hard data to build scalable systems that drive explosive growth for your business."
        imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
      />

      {/* ── Section header ── */}
      <section className="container mx-auto px-4 md:px-8 pt-24 pb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">
              Our Expertise
            </p>
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-none tracking-tight">
              What we<br />
              <span className="text-primary">do best.</span>
            </h2>
          </div>
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed md:text-right">
            Complete digital transformations tailored to maximise your ROI across every channel — from search to shelf.
          </p>
        </div>
      </section>

      {/* ── Service cards ── */}
      <section className="container mx-auto px-4 md:px-8 pb-24">
        {services.length > 0 ? (
          <ul className="svc-list space-y-4 md:space-y-5">
            {services.map((service, index) => {
              const accent = SERVICE_ACCENTS[service.slug] ?? '#6366f1';
              const isMarketplace = service.slug === 'marketplace-management';
              const subCount = service.subServices?.length ?? 0;   // ← guarded: was the source of TS18048
              const hasSubServices = subCount > 0;

              return (
                <li
                  key={service.id}
                  className="svc-row svc-card group/card relative rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] overflow-hidden"
                  style={{ '--accent': accent } as React.CSSProperties}
                >
                  {/* Animated left accent bar — decorative, no pointer events */}
                  <span className="svc-accent-bar absolute left-0 top-0 bottom-0 w-[3px] pointer-events-none" />

                  {/* ── Large clickable header: index + icon + title + description + arrow ── */}
                  <Link
                    href={`/services/${service.slug}`}
                    aria-label={`Explore ${service.title}`}
                    className="svc-header flex items-start gap-5 md:gap-7 p-7 md:p-9 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--accent)] rounded-3xl"
                  >
                    {/* Index number */}
                    <span className="svc-index text-xs font-mono font-bold pt-2.5 w-6 shrink-0 select-none text-gray-300 dark:text-gray-600 transition-colors duration-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Service icon */}
                    <span className="svc-icon w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl flex items-center justify-center border border-gray-200/70 dark:border-white/10 text-gray-500 dark:text-gray-400 transition-all duration-300 mt-0.5">
                      <Icon name={service.iconName} size={24} />
                    </span>

                    {/* Text block */}
                    <span className="flex-1 min-w-0">
                      <span className="flex items-center gap-3 flex-wrap mb-2">
                        <span className="svc-title text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white transition-colors duration-300">
                          {service.title}
                        </span>
                        {hasSubServices && (
                          <span
                            className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                            style={{ background: `${accent}14`, color: accent }}
                          >
                            {subCount} {isMarketplace ? 'platforms' : 'services'}
                          </span>
                        )}
                      </span>
                      <span className="block text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
                        {service.shortDescription}
                      </span>
                    </span>

                    {/* Arrow CTA */}
                    <span className="svc-arrow shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-full border border-gray-200 dark:border-white/15 text-gray-400 dark:text-gray-500 flex items-center justify-center transition-all duration-300 mt-1">
                      <ArrowUpRight size={17} />
                    </span>
                  </Link>

                  {/* ── Sub-services — separate links, kept OUTSIDE the header anchor ── */}
                  {hasSubServices && (
                    <div className="px-7 md:px-9 pb-8 -mt-1">
                      {isMarketplace
                        ? <MarketplaceSubServices service={service} accent={accent} />
                        : <RegularSubServices service={service} accent={accent} />}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex justify-center py-32">
            <span className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
          </div>
        )}
      </section>

      {/* Accent-driven hover states for the whole card (drives off --accent) */}
      <style>{`
        .svc-card {
          transition: border-color .35s ease, box-shadow .35s ease, transform .35s ease;
        }
        .svc-card:hover {
          border-color: color-mix(in srgb, var(--accent) 45%, transparent);
          box-shadow: 0 16px 40px -12px color-mix(in srgb, var(--accent) 28%, transparent);
          transform: translateY(-3px);
        }
        .svc-accent-bar {
          background: var(--accent);
          opacity: 0;
          transform: scaleY(0);
          transform-origin: top;
          transition: opacity .4s ease, transform .4s ease;
        }
        .svc-card:hover .svc-accent-bar { opacity: 1; transform: scaleY(1); }
        .svc-card:hover .svc-index { color: var(--accent); }
        .svc-card:hover .svc-icon {
          color: var(--accent);
          background: color-mix(in srgb, var(--accent) 12%, transparent);
          border-color: color-mix(in srgb, var(--accent) 45%, transparent);
        }
        .svc-card:hover .svc-title { color: var(--accent); }
        .svc-card:hover .svc-arrow {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
        }
        @media (prefers-reduced-motion: reduce) {
          .svc-card, .svc-accent-bar { transition: none; }
          .svc-card:hover { transform: none; }
        }
      `}</style>

      {/* ── Why Optimantix ── */}
      <section className="bg-white dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-white/5 py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

            {/* Left copy */}
            <div className="lg:col-span-2">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
                Why Optimantix
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
                We don't just deliver.<br />
                <span className="text-primary">We outperform.</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                Whether you're scaling on Amazon, upgrading your tech stack, or dominating search engines — our proven approach ensures measurable results every time.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all hover:gap-3"
              >
                Start your transformation <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right feature cards */}
            <div className="why-grid lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {WHY_US.map(({ icon: IconComp, title, body }) => (
                <div
                  key={title}
                  className="why-card p-6 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-colors duration-300"
                >
                  <IconComp className="text-primary mb-4" size={28} />
                  <h4 className="text-base font-bold text-gray-900 dark:text-white mb-2">{title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};