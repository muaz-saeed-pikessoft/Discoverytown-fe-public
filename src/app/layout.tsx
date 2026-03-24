import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Providers from './providers'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Discovery Town | Family Edutainment',
  description: 'A place where play meets learning for the whole family.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
