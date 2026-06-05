'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Check } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { GolfPlayer } from '@/types/golf'
import { useEffect } from 'react'

const tourOptions = [
  { value: 'pga_tour', label: 'PGA Tour', desc: 'Världens bästa spelarbana' },
  { value: 'european_tour', label: 'DP World Tour', desc: 'Europeisk elite' },
  { value: 'liv_golf', label: 'LIV Golf', desc: 'Kontroverserna och stjärnorna' },
  { value: 'swedish', label: 'Sverige', desc: 'Svenska stjärnor' },
]

const notifOptions = [
  { value: 'breaking', label: 'Breaking news', desc: 'Viktig golf-nyheter direkt' },
  { value: 'tournament', label: 'Turneringsuppdateringar', desc: 'Leaderboard och resultat' },
  { value: 'daily', label: 'Daglig digest', desc: 'AI-sammanfattning varje morgon' },
]

export default function OnboardingPage() {
  const { user } = useUser()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [players, setPlayers] = useState<GolfPlayer[]>([])
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([])
  const [selectedTours, setSelectedTours] = useState<string[]>([])
  const [selectedNotifs, setSelectedNotifs] = useState<string[]>(['daily'])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase.from('golf_players').select('*').order('world_ranking', { ascending: true, nullsFirst: false }).then(({ data }) => setPlayers(data ?? []))
  }, [])

  function togglePlayer(slug: string) {
    setSelectedPlayers((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    )
  }

  function toggleTour(value: string) {
    setSelectedTours((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  function toggleNotif(value: string) {
    setSelectedNotifs((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  async function handleFinish() {
    setSaving(true)
    await user?.update({
      unsafeMetadata: {
        sport: 'golf',
        favoritePlayers: selectedPlayers,
        tours: selectedTours,
        notifications: selectedNotifs,
      },
    })
    router.push('/feed')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  s < step
                    ? 'bg-[#BA7517] text-[#0A0A08]'
                    : s === step
                    ? 'bg-[rgba(186,117,23,0.2)] border border-[#BA7517] text-[#BA7517]'
                    : 'bg-[#1A1A17] text-[#5A5048]'
                }`}
              >
                {s < step ? <Check size={12} /> : s}
              </div>
              {s < 3 && <div className={`h-px flex-1 ${step > s ? 'bg-[#BA7517]' : 'bg-[#1A1A17]'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <>
            <h1 className="text-2xl font-semibold text-[#F5F0E8] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Välj dina favoritspelare
            </h1>
            <p className="text-sm text-[#8A8070] mb-6">Vi anpassar din feed efter dessa spelare.</p>
            <div className="grid grid-cols-2 gap-3 mb-8 max-h-80 overflow-y-auto">
              {players.map((p) => {
                const sel = selectedPlayers.includes(p.slug)
                return (
                  <button
                    key={p.slug}
                    onClick={() => togglePlayer(p.slug)}
                    className={`p-3 rounded-lg text-left border transition-all ${
                      sel
                        ? 'border-[#BA7517] bg-[rgba(186,117,23,0.1)]'
                        : 'border-[rgba(186,117,23,0.15)] bg-[#111109] hover:border-[rgba(186,117,23,0.3)]'
                    }`}
                  >
                    <div className="text-sm font-medium text-[#F5F0E8]">{p.name}</div>
                    {p.nationality && <div className="text-xs text-[#8A8070]">{p.nationality}</div>}
                  </button>
                )
              })}
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full py-3 rounded-full bg-[#BA7517] text-[#0A0A08] font-medium hover:bg-[#EF9F27] transition-colors"
            >
              Fortsätt
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-2xl font-semibold text-[#F5F0E8] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Välj dina tourer
            </h1>
            <p className="text-sm text-[#8A8070] mb-6">Vilka tourer vill du följa?</p>
            <div className="space-y-3 mb-8">
              {tourOptions.map((t) => {
                const sel = selectedTours.includes(t.value)
                return (
                  <button
                    key={t.value}
                    onClick={() => toggleTour(t.value)}
                    className={`w-full p-4 rounded-xl text-left border transition-all flex items-center justify-between ${
                      sel ? 'border-[#BA7517] bg-[rgba(186,117,23,0.1)]' : 'border-[rgba(186,117,23,0.15)] bg-[#111109] hover:border-[rgba(186,117,23,0.3)]'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-medium text-[#F5F0E8]">{t.label}</div>
                      <div className="text-xs text-[#8A8070]">{t.desc}</div>
                    </div>
                    {sel && <Check size={16} className="text-[#BA7517]" />}
                  </button>
                )
              })}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-full border border-[rgba(186,117,23,0.3)] text-[#8A8070] hover:text-[#F5F0E8] transition-colors text-sm">
                Tillbaka
              </button>
              <button onClick={() => setStep(3)} className="flex-1 py-3 rounded-full bg-[#BA7517] text-[#0A0A08] font-medium hover:bg-[#EF9F27] transition-colors">
                Fortsätt
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="text-2xl font-semibold text-[#F5F0E8] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Notis-preferenser
            </h1>
            <p className="text-sm text-[#8A8070] mb-6">Välj vilka notiser du vill ha.</p>
            <div className="space-y-3 mb-8">
              {notifOptions.map((n) => {
                const sel = selectedNotifs.includes(n.value)
                return (
                  <button
                    key={n.value}
                    onClick={() => toggleNotif(n.value)}
                    className={`w-full p-4 rounded-xl text-left border transition-all flex items-center justify-between ${
                      sel ? 'border-[#BA7517] bg-[rgba(186,117,23,0.1)]' : 'border-[rgba(186,117,23,0.15)] bg-[#111109] hover:border-[rgba(186,117,23,0.3)]'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-medium text-[#F5F0E8]">{n.label}</div>
                      <div className="text-xs text-[#8A8070]">{n.desc}</div>
                    </div>
                    {sel && <Check size={16} className="text-[#BA7517]" />}
                  </button>
                )
              })}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-full border border-[rgba(186,117,23,0.3)] text-[#8A8070] hover:text-[#F5F0E8] transition-colors text-sm">
                Tillbaka
              </button>
              <button
                onClick={handleFinish}
                disabled={saving}
                className="flex-1 py-3 rounded-full bg-[#BA7517] text-[#0A0A08] font-medium hover:bg-[#EF9F27] disabled:opacity-50 transition-colors"
              >
                {saving ? 'Sparar...' : 'Kom igång!'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
