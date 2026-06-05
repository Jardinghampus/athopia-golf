import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import { Sparkles, BarChart3, Trophy } from 'lucide-react'

export default async function LandingPage() {
  const { userId } = await auth()
  const isSignedIn = !!userId
  return (
    <div className="min-h-screen bg-[#0A0A08] text-[#F5F0E8]">
      {/* Header */}
      <header className="border-b border-[rgba(186,117,23,0.12)] px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span
            className="text-xl font-semibold text-[#BA7517]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Athopia Golf
          </span>
          <div className="flex items-center gap-3">
            {!isSignedIn ? (
              <>
                <Link
                  href="/sign-in"
                  className="text-sm text-[#8A8070] hover:text-[#F5F0E8] transition-colors"
                >
                  Logga in
                </Link>
                <Link
                  href="/onboarding"
                  className="text-sm px-4 py-2 rounded-full bg-[#BA7517] text-[#0A0A08] hover:bg-[#EF9F27] transition-colors font-medium"
                >
                  Kom igång
                </Link>
              </>
            ) : (
              <Link
                href="/feed"
                className="text-sm px-4 py-2 rounded-full bg-[#BA7517] text-[#0A0A08] hover:bg-[#EF9F27] transition-colors font-medium"
              >
                Min feed
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(186,117,23,0.12)] border border-[rgba(186,117,23,0.2)] mb-8">
          <Sparkles size={12} className="text-[#EF9F27]" />
          <span className="text-xs text-[#EF9F27]">AI-driven golfanalys</span>
        </div>

        <h1
          className="text-5xl md:text-7xl font-semibold text-[#F5F0E8] leading-tight mb-6"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Golf på ett{' '}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #EF9F27, #BA7517)' }}
          >
            helt nytt sätt
          </span>
        </h1>

        <p className="text-lg text-[#8A8070] max-w-2xl mx-auto mb-10 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Personaliserad feed, AI-djupanalys och live-statistik för PGA, DP World Tour, LIV Golf och svenska turneringar — allt på ett ställe.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/onboarding"
            className="px-8 py-4 rounded-full text-base font-medium text-[#0A0A08] transition-all hover:shadow-[0_0_30px_rgba(186,117,23,0.35)]"
            style={{ background: 'linear-gradient(135deg, #EF9F27, #BA7517)' }}
          >
            Välj din favoritspelare
          </Link>
          <Link
            href="/nyheter"
            className="px-8 py-4 rounded-full text-base border border-[rgba(186,117,23,0.3)] text-[#BA7517] hover:bg-[rgba(186,117,23,0.08)] transition-colors"
          >
            Utforska nyheter
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Sparkles size={20} className="text-[#EF9F27]" />,
              title: 'Personaliserad Feed',
              desc: 'Nyheter, forum och AI-analys anpassat efter dina favoritspelare och tourer.',
            },
            {
              icon: <BarChart3 size={20} className="text-[#EF9F27]" />,
              title: 'Djupanalys',
              desc: 'Echo AI genererar The Athletic-stil analys av matcher, spelare och turneringar.',
            },
            {
              icon: <Trophy size={20} className="text-[#EF9F27]" />,
              title: 'Live Turneringar',
              desc: 'Realtids-leaderboard, rondresultat och prispengar för alla stora tourer.',
            },
          ].map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl bg-[#111109] border border-[rgba(186,117,23,0.1)] hover:border-[rgba(186,117,23,0.25)] transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-[rgba(186,117,23,0.1)] flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3
                className="text-lg font-semibold text-[#F5F0E8] mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {f.title}
              </h3>
              <p className="text-sm text-[#8A8070] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2
          className="text-3xl font-semibold text-[#F5F0E8] text-center mb-12"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Enkel prissättning
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Gratis', price: '0', features: ['Nyheter med delay', 'Tabell & resultat', 'Forum läsa'], featured: false },
            { name: 'PRO', price: '99', features: ['Realtidsnyheter', 'AI-djupanalys', 'Statistik', 'Forum skriva'], featured: true },
            { name: 'Elite', price: '199', features: ['Allt i PRO', 'Historisk data', 'API-access', 'Obegränsat'], featured: false },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`p-6 rounded-2xl border ${
                plan.featured
                  ? 'border-[#BA7517] bg-[rgba(186,117,23,0.05)] shadow-[0_0_30px_rgba(186,117,23,0.1)]'
                  : 'border-[rgba(186,117,23,0.15)] bg-[#111109]'
              }`}
            >
              {plan.featured && (
                <div className="text-xs font-medium text-[#EF9F27] mb-2">Populärast</div>
              )}
              <div
                className={`text-2xl font-semibold mb-1 ${plan.featured ? 'text-[#EF9F27]' : 'text-[#F5F0E8]'}`}
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {plan.name}
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-[#F5F0E8]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {plan.price} kr
                </span>
                <span className="text-sm text-[#8A8070]">/mån</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#C8BFA8]">
                    <span className="w-1 h-1 rounded-full bg-[#BA7517]" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.name === 'Gratis' ? '/onboarding' : '/prenumerera'}
                className={`block text-center py-2.5 rounded-full text-sm font-medium transition-colors ${
                  plan.featured
                    ? 'bg-[#BA7517] text-[#0A0A08] hover:bg-[#EF9F27]'
                    : 'border border-[rgba(186,117,23,0.3)] text-[#BA7517] hover:bg-[rgba(186,117,23,0.1)]'
                }`}
              >
                Välj {plan.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[rgba(186,117,23,0.1)] px-4 py-8 mt-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#5A5048]">
          <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[#8A8070]">
            Athopia Golf
          </span>
          <span>© 2026 Athopia. Alla rättigheter förbehållna.</span>
        </div>
      </footer>
    </div>
  )
}
