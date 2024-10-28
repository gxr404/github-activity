'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function CommonProvider({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <NextThemesProvider attribute="class">
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </NextThemesProvider>
  )
}
