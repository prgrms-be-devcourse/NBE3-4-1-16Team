import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Grids & Circles',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-[100dvh] bg-[#f5f5f5]`}
      >
        {children}
        <footer className="p-8 mt-20 text-center border-t border-[#ccc] text-sm text-white bg-[#59473F]">
          ⓒ 2025 NBE3-4-1-Team16 ALL RIGHTS RESERVED.
        </footer>
      </body>
    </html>
  )
}
