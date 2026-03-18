'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { ThemeProvider } from '@/provider/theme-provider'
import reduxStore from '@/store/store'

export default function Providers({ children }: { children: React.ReactNode }) {
  // Create a stable QueryClient per component mount (avoids shared state between users)
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ThemeProvider>
      <Provider store={reduxStore}>
        <QueryClientProvider client={queryClient}>
          <ToastContainer
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
          />
          {children}
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  )
}
