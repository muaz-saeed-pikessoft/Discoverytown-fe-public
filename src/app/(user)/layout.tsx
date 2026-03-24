import type { ReactNode } from 'react'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col bg-[var(--dt-cream)] dt-font-body text-[var(--dt-navy)] animate-layoutFadeIn'>
      <Navbar />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  )
}
