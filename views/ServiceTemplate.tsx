'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useData } from '../context/DataContext';
import { Icon } from '../components/Icon';
import {
  ArrowUpRight, ArrowRight, Check, Sparkles, Package,
  TrendingUp, ChevronRight,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// ── Accent system (shared with ServicesPage) ──────────────────────────────────

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

const DEFAULT_HERO =
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000';

const resolveMarketplaceLogo = (slug: string) =>
  MARKETPLACE_LOGOS[slug.toLowerCase().replace(/[-_]management$/, '').trim()];

// ── Section eyebrow ───────────────────────────────────────────────────────────

const Eyebrow = ({ children, accent }: { children: React.ReactNode; accent: string }) => (
  <span
    className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase mb-4"
    style={{ color: accent }}
  >
    <span className="w-6 h-px" style={{ background: accent }} />
    {children}
  </span>
);

// ── Main template ─────────────────────────────────────────────────────────────

export const ServiceTemplate: React.FC<{ service?: any }> = ({ service: serviceProp }) => {
  const params = useParams();
  const slug = (params?.slug as string) ?? '';
  const { services, projects = [] } = useData() as { services: any[]; projects?: any[] };

  const service = serviceProp ?? services.find((s) => s.slug === slug);
  const containerRef = useRef<HTMLDivElement>(null);

  const accent = service ? (SERVICE_ACCENTS[service.slug] ?? '#6366f1') : '#6366f1';
  const isMarketplace = service?.slug === 'marketplace-management';

  const features: string[]      = service?.features ?? [];
  const processSteps: any[]     = service?.processSteps ?? [];
  const benefits: string[]      = service?.benefits ?? [];
  const deliverables: string[]  = service?.deliverables ?? [];
  const subServices: any[]      = service?.subServices ?? [];
  const stats: any[]            = service?.stats ?? [];                 // optional (see types prompt)
  const heroImage: string       = service?.heroImage ?? DEFAULT_HERO;  // optional
  const tagline: string         = service?.tagline ?? 'Our Expertise'; // optional
  const recentWork: any[]       = (projects ?? []).slice(0, 6);

  useGSAP(() => {
    if (!service) return;
    gsap.fromTo('.hero-reveal',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' });

    gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
      gsap.fromTo(el,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
    });
  }, { scope: containerRef, dependencies: [service] });

  // ── Loading / not-found ──
  if (!service) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-gray-50 dark:bg-[#050505]">
        <span className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="bg-gray-50 dark:bg-[#050505] min-h-screen"
      style={{ '--accent': accent } as React.CSSProperties}
    >
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative overflow-hidden bg-[#070708] text-white">
        {/* accent glows + grid */}
        <div
          className="absolute -top-40 -right-32 w-[40rem] h-[40rem] rounded-full blur-[120px] opacity-40 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accent}, transparent 65%)` }}
        />
        <div className="absolute inset-0 hero-grid pointer-events-none opacity-[0.18]" />

        <div className="container mx-auto px-4 md:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-28 pb-24 md:pt-32 md:pb-28">

            {/* Left: copy */}
            <div>
              {/* breadcrumb */}
              <nav className="hero-reveal flex items-center gap-1.5 text-xs text-gray-400 mb-7">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight size={13} />
                <Link href="/services" className="hover:text-white transition-colors">Services</Link>
                <ChevronRight size={13} />
                <span style={{ color: accent }} className="font-semibold">{service.title}</span>
              </nav>

              <span
                className="hero-reveal inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase mb-5 px-3 py-1.5 rounded-full border"
                style={{ color: accent, borderColor: `${accent}40`, background: `${accent}12` }}
              >
                <Sparkles size={12} /> {tagline}
              </span>

              <h1 className="hero-reveal text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
                {service.title}
              </h1>

              <p className="hero-reveal text-lg text-gray-300 leading-relaxed max-w-xl mb-9">
                {service.shortDescription}
              </p>

              <div className="hero-reveal flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 font-bold rounded-full text-white transition-all hover:gap-3"
                  style={{ background: accent, boxShadow: `0 12px 30px -8px ${accent}80` }}
                >
                  Request a quote <ArrowRight size={16} />
                </Link>
                <Link
                  href="#work"
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-bold rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
                >
                  View our work
                </Link>
              </div>

              {/* stats — only if provided in data */}
              {stats.length > 0 && (
                <div className="hero-reveal flex flex-wrap gap-x-10 gap-y-4 mt-12 pt-8 border-t border-white/10">
                  {stats.map((s, i) => (
                    <div key={i}>
                      <p className="text-3xl font-extrabold" style={{ color: accent }}>{s.value}</p>
                      <p className="text-xs text-gray-400 tracking-wide mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: framed image */}
            <div className="hero-reveal relative hidden lg:block">
              <div
                className="absolute -inset-4 rounded-[2rem] blur-2xl opacity-30"
                style={{ background: accent }}
              />
              <div className="relative rounded-[1.75rem] overflow-hidden border border-white/15 shadow-2xl">
                <img src={heroImage} alt={service.title} className="w-full h-[26rem] object-cover" />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(140deg, ${accent}30, transparent 55%)` }}
                />
                {/* floating icon chip */}
                <div className="absolute bottom-5 left-5 flex items-center gap-3 px-4 py-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${accent}26`, color: accent }}
                  >
                    <Icon name={service.iconName} size={20} />
                  </span>
                  <div>
                    <p className="text-sm font-bold leading-tight">{service.title}</p>
                    <p className="text-[11px] text-gray-300">Optimantix Global</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════ OVERVIEW + FEATURES ═══════════════════════ */}
      <section className="container mx-auto px-4 md:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="reveal lg:col-span-5">
            <Eyebrow accent={accent}>Overview</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-6">
              Built to perform,<br />designed to scale.
            </h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-base">
              {service.fullDescription}
            </p>
          </div>

          {features.length > 0 && (
            <div className="reveal lg:col-span-7">
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 dark:text-gray-500 mb-4">
                Key capabilities
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {features.map((f, i) => (
                  <div
                    key={i}
                    className="feature-chip group flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 transition-all"
                  >
                    <span
                      className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center transition-colors"
                      style={{ background: `${accent}14`, color: accent }}
                    >
                      <Check size={17} strokeWidth={3} />
                    </span>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════ PROCESS (stepper) ═══════════════════════ */}
      {processSteps.length > 0 && (
        <section className="bg-white dark:bg-[#0a0a0a] border-y border-gray-200 dark:border-white/5 py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-8">
            <div className="reveal max-w-2xl mb-14">
              <Eyebrow accent={accent}>How we work</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                A proven process,<br />from kickoff to launch.
              </h2>
            </div>

            <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* connecting line on large screens */}
              <div
                className="hidden lg:block absolute top-9 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}40, transparent)` }}
              />
              {processSteps.map((step, i) => (
                <div
                  key={i}
                  className="reveal step-card relative bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-2xl p-6 transition-all"
                >
                  <span
                    className="relative z-10 flex items-center justify-center w-12 h-12 rounded-2xl text-lg font-extrabold mb-5"
                    style={{ background: accent, color: '#fff', boxShadow: `0 10px 24px -8px ${accent}` }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="text-base font-bold text-gray-900 dark:text-white mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════ BENEFITS + DELIVERABLES ═══════════════════════ */}
      {(benefits.length > 0 || deliverables.length > 0) && (
        <section className="container mx-auto px-4 md:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-6">

            {/* Benefits — accent-tinted */}
            {benefits.length > 0 && (
              <div
                className="reveal relative overflow-hidden rounded-3xl p-8 md:p-10 border"
                style={{ borderColor: `${accent}30`, background: `${accent}08` }}
              >
                <div
                  className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-30"
                  style={{ background: accent }}
                />
                <div className="relative">
                  <span
                    className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-6"
                    style={{ background: `${accent}1f`, color: accent }}
                  >
                    <TrendingUp size={22} />
                  </span>
                  <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">Benefits</h3>
                  <ul className="space-y-3.5">
                    {benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 w-5 h-5 shrink-0 rounded-full flex items-center justify-center"
                          style={{ background: accent, color: '#fff' }}
                        >
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Deliverables — dark elevated */}
            {deliverables.length > 0 && (
              <div className="reveal relative overflow-hidden rounded-3xl p-8 md:p-10 bg-[#0c0c0e] border border-white/10">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-6 bg-white/10 text-white">
                  <Package size={22} />
                </span>
                <h3 className="text-2xl font-extrabold text-white mb-6">What you get</h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {deliverables.map((d, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10"
                    >
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent }} />
                      <span className="text-sm font-medium text-gray-200">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </section>
      )}

      {/* ═══════════════════════ SUB-SERVICES ═══════════════════════ */}
      {subServices.length > 0 && (
        <section className="bg-white dark:bg-[#0a0a0a] border-y border-gray-200 dark:border-white/5 py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-8">
            <div className="reveal max-w-2xl mb-12">
              <Eyebrow accent={accent}>Explore further</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                {isMarketplace ? 'Platforms we manage' : 'Specialised services'}
              </h2>
            </div>

            {isMarketplace ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {subServices.map((sub) => {
                  const match = resolveMarketplaceLogo(sub.slug);
                  return (
                    <Link
                      key={sub.id}
                      href={`/services/${service.slug}/${sub.slug}`}
                      className="mp-card group relative flex flex-col items-center justify-center gap-2 p-5 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 transition-all"
                    >
                      <span className="flex h-9 w-full items-center justify-center">
                        {match ? (
                          <img src={match.logo} alt={match.name}
                            className="max-h-8 w-auto object-contain max-w-[90px]" loading="lazy" />
                        ) : (
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">{sub.title}</span>
                        )}
                      </span>
                      <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors text-center">
                        {match ? `${match.name} Management` : ''}
                      </span>
                      <ArrowUpRight size={12} className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: accent }} />
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {subServices.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/services/${service.slug}/${sub.slug}`}
                    className="sub-card group flex items-center gap-3 px-5 py-4 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 transition-all"
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: accent }} />
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{sub.title}</span>
                    <ArrowUpRight size={14} className="ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: accent }} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══════════════════════ PORTFOLIO ═══════════════════════ */}
      {recentWork.length > 0 && (
        <section id="work" className="container mx-auto px-4 md:px-8 py-20 md:py-28">
          <div className="reveal text-center max-w-2xl mx-auto mb-14">
            <Eyebrow accent={accent}>Our portfolio</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-3">
              Recent work showcase
            </h2>
            <p className="text-gray-500 dark:text-gray-400">A glimpse into the brands we have helped grow.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentWork.map((p) => (
              <a
                key={p.id}
                href={p.projectUrl || '#'}
                target={p.projectUrl ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="work-card group relative block rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 aspect-[4/3]"
              >
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-x-0 bottom-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {p.category && (
                    <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: accent }}>{p.category}</span>
                  )}
                  <p className="text-white font-bold leading-tight mt-1 flex items-center gap-1.5">
                    {p.title} <ArrowUpRight size={15} />
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════ WHY CHOOSE US ═══════════════════════ */}
      <section className="container mx-auto px-4 md:px-8 pb-20 md:pb-28">
        <div
          className="reveal relative overflow-hidden rounded-[2rem] p-10 md:p-16 text-white"
          style={{ background: `linear-gradient(120deg, #0a0a0c 0%, ${accent}cc 100%)` }}
        >
          <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full blur-3xl opacity-30 bg-white" />
          <div className="relative max-w-3xl">
            <Sparkles size={32} className="mb-5" />
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Why choose us for {service.title}?
            </h2>
            <p className="text-white/80 leading-relaxed text-lg mb-8 max-w-2xl">
              {service.whyChooseUs ??
                `We pair years of hands-on experience with a results-first approach. Our team stays ahead of the curve in ${service.title.toLowerCase()} so you get a measurable competitive advantage — not just deliverables.`}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-gray-900 font-bold rounded-full hover:gap-3 transition-all"
            >
              Start your project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/*
        NOTE: Your existing "Request a Quote" form + footer come from your shared
        layout / contact component. Mount it after this template as before —
        nothing here replaces it.
      */}

      <style>{`
        .hero-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 56px 56px;
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%);
                  mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%);
        }
        .feature-chip:hover {
          border-color: color-mix(in srgb, var(--accent) 45%, transparent);
          box-shadow: 0 6px 18px -6px color-mix(in srgb, var(--accent) 30%, transparent);
          transform: translateY(-2px);
        }
        .step-card:hover,
        .sub-card:hover,
        .mp-card:hover {
          border-color: color-mix(in srgb, var(--accent) 45%, transparent);
          box-shadow: 0 10px 26px -8px color-mix(in srgb, var(--accent) 25%, transparent);
          transform: translateY(-3px);
        }
        .work-card:hover {
          border-color: color-mix(in srgb, var(--accent) 50%, transparent);
        }
        @media (prefers-reduced-motion: reduce) {
          .feature-chip, .step-card, .sub-card, .mp-card, .work-card, .work-card img {
            transition: none !important; transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};