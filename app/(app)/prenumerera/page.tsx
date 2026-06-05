'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

const plans = [
  {
    id: 'free',
    name: 'Gratis',
    price: '0 kr',
    period: '/mån',
    description: 'Kom igång med golf-nyheter',
    featured: false,
    features: [
      'Nyheter med 24h delay',
      'Tabell & resultat',
      'Forum (läsa)',
      '1 push-notis/dag',
    ],
  },
  {
    id: 'pro',
    name: 'PRO',
    price: '99 kr',
    period: '/mån',
    description: 'För den seriöse golffantasten',
    featured: true,
    features: [
      'Realtidsnyheter',
      'AI-djupanalys',
      'Statistik & spårtillstånd',
      'Podcast-transkript',
      'Forum (skriva)',
      '10 push-notiser/dag',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '199 kr',
    period: '/mån',
    description: 'Maximal golfintelligens',
    featured: false,
    features: [
      'Allt i PRO',
      'Djupanalys & historisk data',
      'API-access',
      'Obegränsade push-notiser',
      'Tidig tillgång till nya features',
    ],
  },
]

export default function PrenumereraPage() {
  const [loading, setLoading] = useState<string | null>(null)

  async function handleCheckout(planId: string) {
    if (planId === 'free') return
    setLoading(planId)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId }),
      })
      const { url } = await res.json()
      if (url) window.location.href = url
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1
          className="text-4xl font-semibold text-[#F5F0E8] mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Välj din plan
        </h1>
        <p className="text-[#8A8070]">Avbryt när som helst. Inga bindningstider.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl p-6 border transition-all ${
              plan.featured
                ? 'border-[#BA7517] bg-[rgba(186,117,23,0.06)] shadow-[0_0_40px_rgba(186,117,23,0.12)]'
                : 'border-[rgba(186,117,23,0.15)] bg-[#111109]'
            }`}
          >
            {plan.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#BA7517] text-[#0A0A08] text-xs font-semibold">
                Populärast
              </div>
            )}

            <div className="mb-6">
              <div
                className={`text-xl font-semibold mb-1 ${plan.featured ? 'text-[#EF9F27]' : 'text-[#F5F0E8]'}`}
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {plan.name}
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-bold text-[#F5F0E8]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {plan.price}
                </span>
                <span className="text-sm text-[#8A8070]">{plan.period}</span>
              </div>
              <p className="text-sm text-[#8A8070]">{plan.description}</p>
            </div>

            <ul className="space-y-2.5 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[#C8BFA8]">
                  <Check size={14} className="mt-0.5 shrink-0 text-[#BA7517]" />
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleCheckout(plan.id)}
              disabled={loading === plan.id}
              className={`w-full py-3 rounded-full text-sm font-medium transition-colors disabled:opacity-50 ${
                plan.featured
                  ? 'bg-[#BA7517] text-[#0A0A08] hover:bg-[#EF9F27]'
                  : plan.id === 'free'
                  ? 'border border-[rgba(186,117,23,0.3)] text-[#8A8070] hover:text-[#F5F0E8]'
                  : 'border border-[rgba(186,117,23,0.3)] text-[#BA7517] hover:bg-[rgba(186,117,23,0.1)]'
              }`}
            >
              {plan.id === 'free'
                ? 'Välj Gratis'
                : loading === plan.id
                ? 'Laddar...'
                : `Välj ${plan.name}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
