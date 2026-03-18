import type { Metadata } from 'next'
import 'react-toastify/dist/ReactToastify.css'

import '@/styles/globals.css'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'DiscoveryTown — Where Kids Discover Their World',
  description: 'Drop-in play, classes, special events, birthday parties and more for families in the community.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' data-theme='discovery'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
