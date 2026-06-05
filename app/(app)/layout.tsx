import Header from '@/components/layout/Header'
import MobileNav from '@/components/layout/MobileNav'
import MotionProvider from '@/components/MotionProvider'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pb-20 md:pb-0">
          {children}
        </main>
        <MobileNav />
      </div>
    </MotionProvider>
  )
}
