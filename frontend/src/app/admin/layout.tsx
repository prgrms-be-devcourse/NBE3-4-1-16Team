import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
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
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-[#ccc] border-b p-5">
          <h1>
            <Link href="/admin/products">
              Grids & Circles <span>ADMIN</span>
            </Link>
          </h1>
          <nav>
            <Link href="/admin/products/create">제품 등록</Link>
          </nav>
        </header>
        <main className="flex-grow p-5">{children}</main>
        <footer className="p-8 text-center border-t border-[#ccc] text-sm text-gray-400">
          ⓒ 2025 NBE3-4-1-Team16 ALL RIGHTS RESERVED.
        </footer>
      </body>
    </html>
  )
}
