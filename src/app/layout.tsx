import localFont from 'next/font/local'
import { Toaster } from '@/components/ui/toaster'
import CommonProvider from '@/components/CommonProvider'
import type { Metadata } from 'next'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Github Activity',
  description: 'Github Activity',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CommonProvider>
          {children}
        </CommonProvider>
        <Toaster />
      </body>
    </html>
  )
}
