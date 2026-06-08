import Link from 'next/link'
import { Sparkles, BarChart3, Trophy, ChevronRight } from 'lucide-react'

export default function LandingPage() {
  const isSignedIn = false

  return (
    <div style={{ minHeight: '100vh', background: '#08100C', color: '#F5F0E8', overflowX: 'hidden' }}>

      {/* ── Header ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        borderBottom: '1px solid rgba(0,66,37,0.15)',
        backdropFilter: 'blur(16px)',
        background: 'rgba(8,16,12,0.88)',
        padding: '0 24px',
      }}>
        <div style={{ maxWidth: 1152, margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, letterSpacing: '-0.3px', color: '#4CAF7E' }}>
            Athopia Golf
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {!isSignedIn ? (
              <>
                <Link href="/sign-in" style={{ fontSize: 14, color: '#6B707C', textDecoration: 'none', transition: 'color 0.15s' }}>
                  Logga in
                </Link>
                <Link href="/onboarding" style={{
                  fontSize: 13,
                  padding: '8px 20px',
                  borderRadius: 9999,
                  background: '#004225',
                  color: '#F5F0E8',
                  textDecoration: 'none',
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                  transition: 'background 0.15s, box-shadow 0.15s',
                }}>
                  Kom igång
                </Link>
              </>
            ) : (
              <Link href="/feed" style={{
                fontSize: 13,
                padding: '8px 20px',
                borderRadius: 9999,
                background: '#004225',
                color: '#F5F0E8',
                textDecoration: 'none',
                fontWeight: 500,
              }}>
                Min feed
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', maxWidth: 896, margin: '0 auto', padding: '96px 24px 80px', textAlign: 'center' }}>

        {/* Radial glow behind hero */}
        <div style={{
          position: 'absolute',
          top: 0, left: '50%',
          transform: 'translateX(-50%)',
          width: 800, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,66,37,0.22) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(0,90,49,0.35) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 100%)',
        } as React.CSSProperties} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* AI badge */}
          <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 9999, background: 'rgba(0,66,37,0.14)', border: '1px solid rgba(0,90,49,0.3)', marginBottom: 32 }}>
            <Sparkles size={12} color="#4CAF7E" />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4CAF7E' }}>
              Echo AI · Golfanalys
            </span>
          </div>

          {/* H1 */}
          <h1 className="hero-h1" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(44px, 9vw, 88px)',
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: '-2px',
            color: '#F5F0E8',
            marginBottom: 24,
          }}>
            Golf på ett{' '}
            <span style={{
              backgroundImage: 'linear-gradient(135deg, #6EC896 0%, #4CAF7E 50%, #2A9962 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            } as React.CSSProperties}>
              helt nytt sätt
            </span>
          </h1>

          {/* Body */}
          <p className="hero-body" style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 18,
            lineHeight: 1.65,
            color: '#6B707C',
            maxWidth: 560,
            margin: '0 auto 40px',
          }}>
            Personaliserad feed, AI-djupanalys och live-statistik för PGA, DP World Tour, LIV Golf och svenska turneringar — allt på ett ställe.
          </p>

          {/* CTAs */}
          <div className="hero-ctas" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <Link href="/onboarding" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px',
              borderRadius: 9999,
              background: 'linear-gradient(135deg, #005A31 0%, #003A1E 100%)',
              color: '#F5F0E8',
              fontSize: 15,
              fontWeight: 500,
              textDecoration: 'none',
              letterSpacing: '-0.1px',
              boxShadow: '0 0 0 1px rgba(0,90,49,0.5) inset',
              transition: 'box-shadow 0.2s ease',
            }}>
              Välj din favoritspelare
              <ChevronRight size={16} />
            </Link>
            <Link href="/nyheter" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '14px 28px',
              borderRadius: 9999,
              border: '1px solid rgba(0,90,49,0.35)',
              color: '#4CAF7E',
              fontSize: 15,
              textDecoration: 'none',
              transition: 'background 0.15s',
            }}>
              Utforska nyheter
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features-in" style={{ maxWidth: 1080, margin: '0 auto', padding: '16px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {[
            {
              icon: <Sparkles size={18} color="#4CAF7E" />,
              title: 'Personaliserad Feed',
              desc: 'Nyheter, forum och AI-analys anpassat efter dina favoritspelare och tourer.',
            },
            {
              icon: <BarChart3 size={18} color="#4CAF7E" />,
              title: 'Echo AI Djupanalys',
              desc: 'Genererar The Athletic-stil analys av matcher, spelare och turneringar i realtid.',
            },
            {
              icon: <Trophy size={18} color="#4CAF7E" />,
              title: 'Live Turneringar',
              desc: 'Realtids-leaderboard, rondresultat och prispengar för alla stora tourer.',
            },
          ].map((f) => (
            <div
              key={f.title}
              style={{
                padding: 24,
                borderRadius: 20,
                background: 'linear-gradient(160deg, rgba(0,66,37,0.07) 0%, rgba(0,0,0,0) 60%)',
                border: '1px solid rgba(0,90,49,0.18)',
                backdropFilter: 'blur(8px)',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
            >
              <div style={{
                width: 40, height: 40,
                borderRadius: '50%',
                background: 'rgba(0,66,37,0.14)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
              }}>
                {f.icon}
              </div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 20, fontWeight: 600,
                color: '#F5F0E8',
                marginBottom: 8,
              }}>
                {f.title}
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.65, color: '#6B707C', margin: 0 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px 96px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4CAF7E', marginBottom: 12 }}>
            Prissättning
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 500,
            letterSpacing: '-0.8px',
            color: '#F5F0E8',
            margin: 0,
          }}>
            Enkel prissättning
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {[
            { name: 'Gratis', price: '0', features: ['Nyheter med delay', 'Tabell & resultat', 'Forum läsa'], featured: false },
            { name: 'PRO', price: '99', features: ['Realtidsnyheter', 'AI-djupanalys', 'Statistik & xG', 'Forum skriva'], featured: true },
            { name: 'Elite', price: '199', features: ['Allt i PRO', 'Historisk data', 'API-access', 'Obegränsat'], featured: false },
          ].map((plan) => (
            <div
              key={plan.name}
              style={{
                padding: 28,
                borderRadius: 20,
                border: plan.featured ? '1px solid rgba(0,90,49,0.55)' : '1px solid rgba(0,90,49,0.15)',
                background: plan.featured
                  ? 'linear-gradient(160deg, rgba(0,66,37,0.12) 0%, rgba(0,66,37,0.04) 100%)'
                  : 'linear-gradient(160deg, rgba(0,66,37,0.04) 0%, transparent 100%)',
                boxShadow: plan.featured ? '0 0 40px rgba(0,66,37,0.18)' : 'none',
                position: 'relative',
              }}
            >
              {plan.featured && (
                <div style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  padding: '3px 14px',
                  borderRadius: 9999,
                  background: '#004225',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#F5F0E8',
                  whiteSpace: 'nowrap',
                }}>
                  Populärast
                </div>
              )}

              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: plan.featured ? '#4CAF7E' : '#F5F0E8', marginBottom: 4 }}>
                {plan.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 20 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 500, color: '#F5F0E8' }}>{plan.price}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#6B707C' }}>kr/mån</span>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {plan.features.map((feat) => (
                  <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#C8D4CC' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: plan.featured ? '#4CAF7E' : '#004225', flexShrink: 0 }} />
                    {feat}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.name === 'Gratis' ? '/onboarding' : '/prenumerera'}
                style={{
                  display: 'block', textAlign: 'center',
                  padding: '11px 0',
                  borderRadius: 9999,
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                  ...(plan.featured
                    ? { background: '#004225', color: '#F5F0E8' }
                    : { border: '1px solid rgba(0,90,49,0.35)', color: '#4CAF7E' }),
                }}
              >
                Välj {plan.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid rgba(0,66,37,0.12)', padding: '28px 24px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: '#4CAF7E' }}>
            Athopia Golf
          </span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.04em', color: '#3A4038' }}>
            © 2026 Athopia. Alla rättigheter förbehållna.
          </span>
        </div>
      </footer>

    </div>
  )
}
