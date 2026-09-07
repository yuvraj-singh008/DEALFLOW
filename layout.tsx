import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Investor Match - Tinder-style VC Matching',
  description: 'Find your perfect investor match with AI-powered recommendations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50`}>
        <AuthProvider>
          <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm px-6 py-4">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-sky-600"></div>
                <div className="text-xl font-bold tracking-tight text-slate-900">InvestorMatch.ai</div>
              </div>
              <div className="flex items-center gap-6">
                <a href="/match" className="text-slate-700 hover:text-emerald-600 font-medium">Match</a>
                <a href="/dashboard" className="text-slate-700 hover:text-emerald-600 font-medium">Dashboard</a>
                <a href="/investors" className="text-slate-700 hover:text-emerald-600 font-medium">Investors</a>
                <a href="/pricing" className="text-slate-700 hover:text-emerald-600 font-medium">Pricing</a>
                <div className="h-6 w-px bg-slate-300"></div>
                <a href="/login" className="px-4 py-2 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 font-medium">Sign In</a>
                <a href="/signup" className="px-4 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 font-medium">Get Started</a>
              </div>
            </div>
          </nav>
          {children}
          <footer className="border-t border-slate-200 bg-white px-6 py-12">
            <div className="container mx-auto text-center text-slate-600">
              <p>© 2024 InvestorMatch.ai. AI-powered investor matching for startups.</p>
              <p className="mt-2 text-sm text-slate-500">Built with Next.js, OpenAI, and PostgreSQL.</p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  )
}
