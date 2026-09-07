### **Step 1: Create a New Folder**

On your computer:

1. Create a new folder called `ai-investor-match`
2. Inside it, create these subfolders:
   - `app`
   - `components`
   - `lib`
   - `prisma`
   - `public`

### **Step 2: Copy EVERY File Below**

**File 1: ****`package.json`** (root folder)

```json
{
  "name": "ai-investor-match",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@auth/prisma-adapter": "^1.0.12",
    "@prisma/client": "^5.8.0",
    "@prisma/extension-pgvector": "^0.1.6",
    "@tanstack/react-query": "^5.12.2",
    "framer-motion": "^11.0.5",
    "lucide-react": "^0.309.0",
    "next": "14.1.0",
    "next-auth": "^4.24.5",
    "openai": "^4.28.0",
    "pgvector": "^0.2.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/node": "^20.10.6",
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.56.0",
    "eslint-config-next": "14.1.0",
    "postcss": "^8.4.33",
    "prisma": "^5.8.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.3"
  }
}

```

**File 2: ****`next.config.js`** (root folder)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.example.com', 'avatars.githubusercontent.com'],
  },
}

module.exports = nextConfig

```

**File 3: ****`tailwind.config.js`** (root folder)

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'swipe-left': 'swipeLeft 0.5s ease-out',
        'swipe-right': 'swipeRight 0.5s ease-out',
        'swipe-up': 'swipeUp 0.5s ease-out',
      },
      keyframes: {
        swipeLeft: {
          '0%': { transform: 'translateX(0) rotate(0deg)' },
          '100%': { transform: 'translateX(-120%) rotate(-20deg)' },
        },
        swipeRight: {
          '0%': { transform: 'translateX(0) rotate(0deg)' },
          '100%': { transform: 'translateX(120%) rotate(20deg)' },
        },
        swipeUp: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '100%': { transform: 'translateY(-120%) scale(0.95)' },
        },
      },
    },
  },
  plugins: [],
}

```

**File 4: ****`postcss.config.js`** (root folder)

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```

**File 5: ****`tsconfig.json`** (root folder)

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

**File 6: ****`.env.example`** (root folder)

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/investor_match"

# OpenAI
OPENAI_API_KEY="sk-your-key-here"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-32-character-secret-here"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Optional: Redis
REDIS_URL="redis://localhost:6379"

```

**File 7: ****`.gitignore`** (root folder)

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# Prisma
.env
/prisma/migrations

```

---

## **APP FOLDER FILES**

**File 8: ****`app/layout.tsx`**

```tsx
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

```

**File 9: ****`app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
  }
}

.swipe-card {
  touch-action: pan-y pinch-zoom;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

```

**File 10: ****`app/page.tsx`** (Homepage)

```tsx
import Link from 'next/link'

export default function Home() {
  const stats = [
    { number: '94%', label: 'Average match score' },
    { number: '2.4x', label: 'Faster fundraising' },
    { number: '78%', label: 'Mutual match rate' },
    { number: '300+', label: 'Active investors' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative pt-24 pb-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-sky-50/30 to-slate-50"></div>
        <div className="container mx-auto relative z-10 max-w-5xl">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
              Find your perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600">
                investor match
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              AI-powered Tinder-style matching for startups and investors. Swipe right on investors who actually fit your company.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/match"
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-sky-600 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Start Matching as Founder →
              </Link>
              <Link
                href="/investor/signup"
                className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-full border-2 border-slate-300 hover:border-emerald-500 transition-all"
              >
                Join as Investor
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-3xl mx-auto">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{stat.number}</div>
                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demo Preview */}
      <div className="px-6 pb-32">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="p-8 md:p-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">How it works</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">Swipe, match, connect — all powered by our 10-dimension AI matching engine.</p>
              </div>
              
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-emerald-600"></div>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2">Complete your profile</h3>
                        <p className="text-slate-600">Tell us about your startup, funding needs, and investor preferences.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-sky-600"></div>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2">Swipe on investors</h3>
                        <p className="text-slate-600">See AI-ranked investors with match scores and explanations.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-purple-600"></div>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2">Get mutual matches</h3>
                        <p className="text-slate-600">When both sides are interested, connect and start conversations.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-amber-600"></div>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2">Track your success</h3>
                        <p className="text-slate-600">Monitor match rates, conversations, and fundraising progress.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-sky-500 rounded-3xl blur-xl opacity-30"></div>
                    <div className="relative bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl p-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xl">SV</div>
                        <div>
                          <div className="font-bold text-slate-900 text-lg">Sapphire Ventures</div>
                          <div className="text-sm text-slate-500">Palo Alto • Series A • $3-10M checks</div>
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="text-sm font-medium text-slate-400 mb-2">AI match score</div>
                        <div className="text-5xl font-bold text-slate-900">92<span className="text-2xl text-slate-400">%</span></div>
                        <div className="mt-2 text-sm text-emerald-600 font-medium">Excellent fit based on sector, stage, and geography</div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <span className="text-sm">Invests in B2B SaaS at your stage</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <span className="text-sm">Your $4M raise fits their typical check</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                          <span className="text-sm">Prefers companies with $2M+ ARR</span>
                        </div>
                      </div>
                      <div className="h-px bg-slate-200 my-6"></div>
                      <div className="flex justify-between">
                        <button className="px-6 py-2.5 rounded-full border-2 border-rose-300 text-rose-600 font-medium hover:bg-rose-50 transition">Pass</button>
                        <button className="px-6 py-2.5 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition">Interested</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-24">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to transform your fundraising?</h2>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">Join hundreds of founders who found their perfect investors through AI matching.</p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-emerald-600 to-sky-600 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Start Your Free Trial
              <span className="text-lg">→</span>
            </Link>
            <p className="mt-4 text-sm text-slate-500">No credit card required • 7-day free trial • Cancel anytime</p>
          </div>
        </div>
      </div>
    </div>
  )
}

```

**File 11: ****`app/match/page.tsx`** (MAIN SWIPE INTERFACE)

```tsx
'use client'
import SwipeDeck from '@/components/SwipeDeck'
import AIInsightsPanel from '@/components/AIInsightsPanel'
import { useState, useEffect } from 'react'

const sampleMatches = [
  {
    investorId: '1',
    matchScore: 94,
    confidence: 'HIGH',
    tier: 'EXCEPTIONAL',
    reasons: [
      'Invests in your B2B SaaS industry',
      'Your Series A stage fits perfectly',
      '$4M raise matches their $1-10M check range',
      'Active in your geographic market',
      'Portfolio includes similar companies'
    ],
    concerns: [
      'Prefers companies with $2M+ ARR',
      'Lead time for new investments is 6-8 weeks'
    ],
    investor: {
      name: 'Sapphire Ventures',
      logoUrl: '',
      investorType: 'VC',
      verified: true,
      locations: ['Palo Alto', 'San Francisco'],
      thesis: 'We invest in B2B SaaS companies transforming enterprise workflows',
      minCheck: 1000000,
      maxCheck: 10000000,
      stages: ['SEED', 'SERIES_A', 'SERIES_B'],
      industries: ['B2B_SAAS', 'AI', 'ENTERPRISE'],
      geographies: ['US', 'Europe', 'APAC'],
      businessModels: ['B2B_SAAS', 'MARKETPLACE'],
      portfolio: [
        { name: 'Datadog', industry: 'B2B_SAAS' },
        { name: 'MongoDB', industry: 'DATABASE' }
      ]
    }
  },
  {
    investorId: '2',
    matchScore: 88,
    confidence: 'HIGH',
    tier: 'STRONG',
    reasons: [
      'Specializes in AI enterprise tools',
      'Seed-focused with hands-on approach',
      '$500K-5M check range fits your needs',
      'Strong operator network in SaaS',
      'Fast decision making (2-3 weeks)'
    ],
    concerns: [
      'Limited follow-on capital beyond Series A',
      'Prefers technical founding teams'
    ],
    investor: {
      name: 'AI Capital Partners',
      logoUrl: '',
      investorType: 'VC',
      verified: true,
      locations: ['New York', 'Berlin'],
      thesis: 'Backing AI-native companies that redefine enterprise productivity',
      minCheck: 500000,
      maxCheck: 5000000,
      stages: ['SEED', 'SERIES_A'],
      industries: ['AI', 'B2B_SAAS', 'MACHINE_LEARNING'],
      geographies: ['US', 'Europe'],
      businessModels: ['B2B_SAAS', 'PLATFORM'],
      portfolio: [
        { name: 'Anthropic', industry: 'AI' },
        { name: 'Replit', industry: 'DEVELOPER_TOOLS' }
      ]
    }
  },
  {
    investorId: '3',
    matchScore: 76,
    confidence: 'MEDIUM',
    tier: 'GOOD',
    reasons: [
      'Invests in your target market',
      'Strong enterprise sales expertise',
      'Can co-lead your round',
      'Active board member support'
    ],
    concerns: [
      'Check size typically larger ($5-20M)',
      'Geographic focus is Europe/US only',
      'Some data unavailable for scoring'
    ],
    investor: {
      name: 'Enterprise Growth Fund',
      logoUrl: '',
      investorType: 'VC',
      verified: true,
      locations: ['London', 'Boston'],
      thesis: 'Accelerating revenue growth for enterprise SaaS companies',
      minCheck: 5000000,
      maxCheck: 20000000,
      stages: ['SERIES_A', 'SERIES_B'],
      industries: ['B2B_SAAS', 'ENTERPRISE'],
      geographies: ['Europe', 'US'],
      businessModels: ['B2B_SAAS'],
      portfolio: [
        { name: 'Salesforce', industry: 'CRM' },
        { name: 'Workday', industry: 'HR_TECH' }
      ]
    }
  }
]

export default function MatchPage() {
  const [matches, setMatches] = useState(sampleMatches)
  const [selectedMatch, setSelectedMatch] = useState(sampleMatches[0])
  const [isLoading, setIsLoading] = useState(false)

  const handleDecision = (investorId: string, decision: any) => {
    console.log(`User ${decision} investor ${investorId}`)
    // In real app, would call API here
  }

  const handleExhausted = () => {
    setIsLoading(true)
    // In real app, would load more matches
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Find your investors</h1>
          <p className="text-slate-600">Swipe right on investors, left to pass, up for super matches.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Swipe Deck Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-sm font-medium text-slate-400">Today's matches</div>
                  <div className="text-2xl font-bold text-slate-900">{matches.length} investors</div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50">Filters</button>
                  <button className="px-4 py-2 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50">Sort by: Best match</button>
                </div>
              </div>

              {isLoading ? (
                <div className="h-[620px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <div className="text-slate-600">Loading your next matches...</div>
                  </div>
                </div>
              ) : (
                <SwipeDeck
                  cards={matches}
                  onDecision={handleDecision}
                  onView={(id) => {
                    const match = matches.find(m => m.investorId === id)
                    if (match) setSelectedMatch(match)
                  }}
                  onExhausted={handleExhausted}
                />
              )}

              <div className="mt-8 text-center text-sm text-slate-500">
                <p>← Pass • → Interested • ↑ Super Match • Space View profile • S to Save</p>
                <p className="mt-2">Each swipe improves your future recommendations</p>
              </div>
            </div>
          </div>

          {/* AI Insights Panel */}
          <div className="lg:w-1/3">
            <AIInsightsPanel match={selectedMatch} />
            
            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
              <h3 className="font-bold text-slate-900 mb-4">Your matching stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-600">Match rate</span>
                    <span className="text-sm font-bold text-emerald-600">78%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-3/4"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-600">Response rate</span>
                    <span className="text-sm font-bold text-sky-600">64%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 w-2/3"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-600">Meeting conversion</span>
                    <span className="text-sm font-bold text-purple-600">42%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-2/5"></div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200">
                <div className="text-center">
                  <div className="text-xl font-bold text-slate-900">12</div>
                  <div className="text-xs text-slate-500">Matches</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-slate-900">8</div>
                  <div className="text-xs text-slate-500">Conversations</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-slate-900">3</div>
                  <div className="text-xs text-slate-500">Meetings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

```

**File 12: ****`app/api/matches/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // This is a mock API response
  // In production, you would connect to your database
  
  const mockMatches = [
    {
      investorId: '1',
      matchScore: 94,
      confidence: 'HIGH',
      tier: 'EXCEPTIONAL',
      reasons: [
        'Invests in your B2B SaaS industry',
        'Your Series A stage fits perfectly',
        '$4M raise matches their $1-10M check range',
        'Active in your geographic market'
      ],
      investor: {
        name: 'Sapphire Ventures',
        investorType: 'VC',
        verified: true,
        locations: ['Palo Alto', 'San Francisco'],
        thesis: 'We invest in B2B SaaS companies transforming enterprise workflows',
        minCheck: 1000000,
        maxCheck: 10000000,
        stages: ['SEED', 'SERIES_A', 'SERIES_B'],
        industries: ['B2B_SAAS', 'AI', 'ENTERPRISE'],
      }
    },
    // ... more matches
  ]

  return NextResponse.json({
    success: true,
    data: {
      matches: mockMatches,
      total: mockMatches.length,
      pagination: {
        page: 1,
        limit: 10,
        totalPages: 1
      }
    }
  })
}

export async function POST(request: NextRequest) {
  // This would handle matching preferences
  const body = await request.json()
  
  return NextResponse.json({
    success: true,
    message: 'Match preferences updated',
    data: body
  })
}

```

**File 13: ****`app/api/interactions/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // This would log user interactions (swipes, views, saves)
  const body = await request.json()
  
  const { userId, investorId, action } = body
  
  console.log(`Logging interaction: User ${userId} ${action} investor ${investorId}`)
  
  // In production, you would save to database
  // await prisma.interaction.create({
  //   data: { userId, targetId: investorId, action }
  // })
  
  return NextResponse.json({
    success: true,
    message: 'Interaction logged successfully',
    data: { userId, investorId, action, timestamp: new Date().toISOString() }
  })
}

```

**File 14: ****`app/dashboard/page.tsx`**

```tsx
'use client'
import { useState } from 'react'

const mockMatches = [
  { id: 1, name: 'Sapphire Ventures', matchScore: 94, status: 'MUTUAL', date: '2024-01-15' },
  { id: 2, name: 'AI Capital Partners', matchScore: 88, status: 'MUTUAL', date: '2024-01-14' },
  { id: 3, name: 'Enterprise Growth Fund', matchScore: 76, status: 'PENDING', date: '2024-01-13' },
  { id: 4, name: 'First Round Capital', matchScore: 91, status: 'MUTUAL', date: '2024-01-12' },
  { id: 5, name: 'Greylock Partners', matchScore: 85, status: 'PENDING', date: '2024-01-11' },
]

const mockStats = {
  totalMatches: 12,
  mutualMatches: 8,
  pendingInterests: 4,
  savedInvestors: 7,
  conversationRate: '64%',
  meetingRate: '42%'
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('matches')

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Your Investor Dashboard</h1>
          <p className="text-slate-600">Track your matches, conversations, and fundraising progress.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="text-2xl font-bold text-slate-900">{mockStats.totalMatches}</div>
            <div className="text-sm text-slate-500">Total Matches</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="text-2xl font-bold text-slate-900">{mockStats.mutualMatches}</div>
            <div className="text-sm text-slate-500">Mutual Matches</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="text-2xl font-bold text-slate-900">{mockStats.pendingInterests}</div>
            <div className="text-sm text-slate-500">Pending</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="text-2xl font-bold text-slate-900">{mockStats.savedInvestors}</div>
            <div className="text-sm text-slate-500">Saved</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="text-2xl font-bold text-slate-900">{mockStats.conversationRate}</div>
            <div className="text-sm text-slate-500">Conversation Rate</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="text-2xl font-bold text-slate-900">{mockStats.meetingRate}</div>
            <div className="text-sm text-slate-500">Meeting Rate</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 mb-6">
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'matches' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-600'}`}
            onClick={() => setActiveTab('matches')}
          >
            Matches
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'saved' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-600'}`}
            onClick={() => setActiveTab('saved')}
          >
            Saved Investors
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'activity' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-600'}`}
            onClick={() => setActiveTab('activity')}
          >
            Activity Log
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'analytics' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-600'}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
        </div>

        {/* Matches Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Recent Matches</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left py-3 px-6 text-sm font-medium text-slate-600">Investor</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-slate-600">Match Score</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-slate-600">Status</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-slate-600">Date</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockMatches.map((match) => (
                  <tr key={match.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold">
                          {match.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{match.name}</div>
                          <div className="text-sm text-slate-500">VC • Palo Alto</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500" 
                            style={{ width: `${match.matchScore}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold text-slate-900">{match.matchScore}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        match.status === 'MUTUAL' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {match.status === 'MUTUAL' ? 'Mutual Match' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600">{match.date}</td>
                    <td className="py-4 px-6">
                      <button className="px-4 py-1.5 text-sm bg-emerald-600 text-white rounded-full hover:bg-emerald-700">
                        Message
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-slate-200 text-center">
            <button className="text-emerald-600 font-medium hover:text-emerald-700">
              View All Matches →
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-br from-emerald-50 to-sky-50 rounded-2xl p-6 border border-emerald-100">
            <h3 className="font-bold text-slate-900 mb-3">Continue Swiping</h3>
            <p className="text-slate-600 mb-4">Discover more investors who match your profile.</p>
            <a href="/match" className="inline-block px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-full hover:bg-emerald-700">
              Browse Investors
            </a>
          </div>
          <div className="bg-gradient-to-br from-sky-50 to-purple-50 rounded-2xl p-6 border border-sky-100">
            <h3 className="font-bold text-slate-900 mb-3">Improve Your Profile</h3>
            <p className="text-slate-600 mb-4">Complete your profile to get better matches.</p>
            <a href="/profile/edit" className="inline-block px-6 py-2.5 bg-sky-600 text-white font-medium rounded-full hover:bg-sky-700">
              Edit Profile
            </a>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-rose-50 rounded-2xl p-6 border border-purple-100">
            <h3 className="font-bold text-slate-900 mb-3">Match Analytics</h3>
            <p className="text-slate-600 mb-4">See detailed analysis of your matching patterns.</p>
            <a href="/analytics" className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium rounded-full hover:bg-purple-700">
              View Analytics
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

```

**File 15: ****`app/login/page.tsx`**

```typescript
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Mock login
    setTimeout(() => {
      router.push('/match')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-600 mx-auto mb-4 flex items-center justify-center">
            <div className="text-2xl font-bold text-white">IM</div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
          <p className="text-slate-600">Sign in to your account to continue</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="••••••••"
              />
              <div className="text-right mt-2">
                <a href="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700">
                  Forgot password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-sky-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition">
                <svg className="w-5 h-5" fill="#000000" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.203 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.576.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"/>
                </svg>
                <span>GitHub</span>
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <a href="/signup" className="text-emerald-600 font-medium hover:text-emerald-700">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

```

**File 16: ****`app/signup/page.tsx`**

```typescript
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    companyName: '',
    industry: '',
    stage: '',
    raiseAmount: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Mock signup
    setTimeout(() => {
      router.push('/match')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-600 mx-auto mb-4 flex items-center justify-center">
            <div className="text-2xl font-bold text-white">IM</div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Join InvestorMatch.ai</h1>
          <p className="text-slate-600">Create your account and find your perfect investor matches</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
              1
            </div>
            <div className={`h-1 w-20 ${step >= 2 ? 'bg-emerald-600' : 'bg-slate-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
              2
            </div>
            <div className={`h-1 w-20 ${step >= 3 ? 'bg-emerald-600' : 'bg-slate-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
              3
            </div>
          </div>
          <div className="flex justify-between text-sm text-slate-500">
            <div className="text-center">Account</div>
            <div className="text-center">Company</div>
            <div className="text-center">Funding</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <p className="text-xs text-slate-500 mt-2">Minimum 8 characters with letters and numbers</p>
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    className="w-4 h-4 mt-1"
                  />
                  <label className="ml-2 text-sm text-slate-600">
                    I agree to the <a href="/terms" className="text-emerald-600 hover:text-emerald-700">Terms of Service</a> and <a href="/privacy" className="text-emerald-600 hover:text-emerald-700">Privacy Policy</a>
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3 px-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition"
                >
                  Continue
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Company name</label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Your startup name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Industry</label>
                  <select
                    name="industry"
                    required
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select industry</option>
                    <option value="B2B_SAAS">B2B SaaS</option>
                    <option value="AI">Artificial Intelligence</option>
                    <option value="FINTECH">Fintech</option>
                    <option value="HEALTHCARE">Healthcare</option>
                    <option value="CONSUMER">Consumer</option>
                    <option value="MARKETPLACE">Marketplace</option>
                    <option value="DEEPTECH">Deep Tech</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 py-3 px-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Stage</label>
                  <select
                    name="stage"
                    required
                    value={formData.stage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select stage</option>
                    <option value="PRE_SEED">Pre-Seed</option>
                    <option value="SEED">Seed</option>
                    <option value="SERIES_A">Series A</option>
                    <option value="SERIES_B">Series B</option>
                    <option value="SERIES_C_PLUS">Series C+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Raise amount (USD)</label>
                  <input
                    type="number"
                    name="raiseAmount"
                    required
                    value={formData.raiseAmount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., 2000000"
                  />
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 mb-1">Ready to match!</div>
                      <p className="text-sm text-slate-600">Based on your information, we've already found 47 potential investors for you.</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-600 to-sky-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {isLoading ? 'Creating account...' : 'Complete Signup'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

```

---

## **COMPONENTS FOLDER FILES**

**File 17: ****`components/SwipeDeck.tsx`**

```tsx
'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import InvestorCard from './InvestorCard'
import ActionBar from './ActionBar'

type Decision = 'PASS' | 'INTEREST' | 'SUPER_INTEREST' | 'SAVE'

export default function SwipeDeck({ 
  cards, 
  onDecision, 
  onView, 
  onExhausted 
}: { 
  cards: any[]
  onDecision: (id: string, decision: Decision) => void
  onView: (id: string) => void
  onExhausted: () => void
}) {
  const [index, setIndex] = useState(0)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotate = useTransform(x, [-300, 0, 300], [-14, 0, 14])
  const passOpacity = useTransform(x, [-140, -40], [1, 0])
  const likeOpacity = useTransform(x, [40, 140], [0, 1])
  const superOpacity = useTransform(y, [-140, -50], [1, 0])

  const active = cards[index]
  const upcoming = useMemo(() => cards.slice(index + 1, index + 4), [cards, index])

  const commit = useCallback((decision: Decision) => {
    if (!active) return
    
    onDecision(active.investorId, decision)
    
    if (decision === 'SAVE') return
    
    const target = decision === 'SUPER_INTEREST' 
      ? { x: 0, y: -900 }
      : { x: decision === 'INTEREST' ? 900 : -900, y: 40 }
    
    animate(x, target.x, { type: 'spring', stiffness: 260, damping: 26 })
    animate(y, target.y, { type: 'spring', stiffness: 260, damping: 26 })
    
    setTimeout(() => {
      x.set(0)
      y.set(0)
      setIndex(i => {
        const next = i + 1
        if (next >= cards.length - 3) onExhausted()
        return next
      })
    }, 180)
  }, [active, cards.length, onDecision, onExhausted, x, y])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', ' '].includes(e.key)) {
        e.preventDefault()
      }
      
      if (!active) return
      
      switch (e.key) {
        case 'ArrowLeft':
          commit('PASS')
          break
        case 'ArrowRight':
          commit('INTEREST')
          break
        case 'ArrowUp':
          commit('SUPER_INTEREST')
          break
        case 's':
        case 'S':
          commit('SAVE')
          break
        case ' ':
          onView(active.investorId)
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [active, commit, onView])

  if (!active) {
    return (
      <div className="flex flex-col items-center justify-center h-[620px]">
        <div className="text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No more investors for now!</h3>
          <p className="text-slate-600 mb-6">Check back later for new recommendations.</p>
          <a 
            href="/dashboard" 
            className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-full hover:bg-emerald-700"
          >
            View Your Matches
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-[440px] mx-auto">
      <div className="relative h-[620px]">
        {/* Cards behind */}
        {upcoming.map((card, k) => (
          <div
            key={card.investorId}
            className="absolute inset-0 rounded-3xl bg-white ring-1 ring-slate-200/70 shadow-sm"
            style={{
              transform: `scale(${1 - (k + 1) * 0.03}) translateY(${(k + 1) * 12}px)`,
              zIndex: 10 - k,
              opacity: 1 - (k + 1) * 0.25,
            }}
          />
        ))}

        <motion.div
          key={active.investorId}
          className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing"
          style={{ x, y, rotate }}
          drag
          dragElastic={0.55}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          whileTap={{ scale: 0.99 }}
          onDragEnd={(_, info) => {
            const { offset, velocity } = info
            
            if (offset.y < -120 && Math.abs(offset.x) < 110) {
              commit('SUPER_INTEREST')
              return
            }
            
            if (offset.x > 120 || velocity.x > 700) {
              commit('INTEREST')
              return
            }
            
            if (offset.x < -120 || velocity.x < -700) {
              commit('PASS')
              return
            }
            
            animate(x, 0, { type: 'spring', stiffness: 350, damping: 30 })
            animate(y, 0, { type: 'spring', stiffness: 350, damping: 30 })
          }}
        >
          <InvestorCard match={active} onView={() => onView(active.investorId)} />
          
          {/* Drag Labels */}
          <motion.div 
            style={{ opacity: passOpacity }}
            className="pointer-events-none absolute top-8 right-7 rounded-lg border-2 border-rose-500 px-4 py-1.5 text-sm font-bold tracking-[0.2em] text-rose-500 rotate-12 bg-white/85 backdrop-blur"
          >
            PASS
          </motion.div>
          <motion.div 
            style={{ opacity: likeOpacity }}
            className="pointer-events-none absolute top-8 left-7 rounded-lg border-2 border-emerald-600 px-4 py-1.5 text-sm font-bold tracking-[0.2em] text-emerald-600 -rotate-12 bg-white/85 backdrop-blur"
          >
            INTERESTED
          </motion.div>
          <motion.div 
            style={{ opacity: superOpacity }}
            className="pointer-events-none absolute inset-x-0 bottom-24 mx-auto w-fit rounded-lg border-2 border-indigo-600 px-4 py-1.5 text-sm font-bold tracking-[0.2em] text-indigo-600 bg-white/85 backdrop-blur"
          >
            SUPER MATCH
          </motion.div>
        </motion.div>
      </div>

      <ActionBar
        onPass={() => commit('PASS')}
        onSuper={() => commit('SUPER_INTEREST')}
        onView={() => onView(active.investorId)}
        onInterest={() => commit('INTEREST')}
        onSave={() => commit('SAVE')}
      />
      
      <div className="mt-3 text-center">
        <p className="text-xs text-slate-500">
          Card {index + 1} of {cards.length} • ← Pass • → Interested • ↑ Super
        </p>
      </div>
    </div>
  )
}

```

**File 18: ****`components/InvestorCard.tsx`**

```tsx
'use client'
import { BadgeCheck, Sparkles, Info, MapPin, TrendingUp, DollarSign } from 'lucide-react'

const TIER = {
  EXCEPTIONAL: { label: 'Exceptional match', color: 'emerald' },
  STRONG: { label: 'Strong match', color: 'teal' },
  GOOD: { label: 'Good match', color: 'sky' },
  POTENTIAL: { label: 'Potential match', color: 'amber' },
  LOW: { label: 'Low match', color: 'slate' },
}

const formatCheck = (min: number | undefined, max: number | undefined) => {
  if (!min && !max) return 'Check size not disclosed'
  if (min && max) {
    const format = (n: number) => n >= 1e6 ? `$${+(n / 1e6).toFixed(n % 1e6 ? 1 : 0)}M` : `$${Math.round(n / 1e3)}K`
    return `${format(min)}–${format(max)}`
  }
  return '$—'
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function InvestorCard({ match, onView }: { match: any; onView: () => void }) {
  const tier = TIER[match.tier as keyof typeof TIER]
  const checkSize = formatCheck(match.investor.minCheck, match.investor.maxCheck)
  const colorClasses = {
    emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    teal: 'bg-teal-50 text-teal-700 ring-teal-200',
    sky: 'bg-sky-50 text-sky-700 ring-sky-200',
    amber: 'bg-amber-50 text-amber-700 ring-amber-200',
    slate: 'bg-slate-100 text-slate-600 ring-slate-200',
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)]">
      {/* Header */}
      <div className="flex items-start gap-4 px-6 pt-6">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-lg font-semibold text-white">
          {match.investor.logoUrl ? (
            <img 
              src={match.investor.logoUrl} 
              alt={match.investor.name}
              className="h-full w-full rounded-2xl object-cover"
            />
          ) : (
            getInitials(match.investor.name)
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-[17px] font-semibold tracking-tight text-slate-900">
              {match.investor.name}
            </h3>
            {match.investor.verified && (
              <BadgeCheck className="h-4 w-4 shrink-0 text-sky-600" aria-label="Verified" />
            )}
          </div>
          <p className="text-[13px] font-medium text-slate-500 capitalize">
            {match.investor.investorType?.toLowerCase().replace('_', ' ')}
          </p>
          <div className="mt-0.5 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <p className="truncate text-[12px] text-slate-500">
              {match.investor.locations?.join(' • ') || 'Location not disclosed'}
            </p>
          </div>
        </div>
        {match.isDiscovery && (
          <span className="flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-700 ring-1 ring-indigo-200">
            <Sparkles className="h-3 w-3" /> AI Discovery
          </span>
        )}
      </div>

      {/* Match Score */}
      <div className="mt-5 px-6">
        <div className="flex items-end gap-3">
          <span className="text-[54px] font-semibold leading-none tracking-tight text-slate-900">
            {match.matchScore}<span className="text-2xl text-slate-400">%</span>
          </span>
          <div className="pb-1.5">
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${colorClasses[tier.color]}`}>
              {tier.label}
            </span>
            <p className="mt-1 text-[11px] text-slate-400">
              {match.confidence === 'HIGH' ? 'High confidence' : 
               match.confidence === 'MEDIUM' ? 'Medium confidence' : 
               'Low confidence'}
            </p>
          </div>
        </div>
      </div>

      {/* Thesis */}
      <blockquote className="mx-6 mt-5 border-l-2 border-slate-900/10 pl-4 text-[15px] leading-relaxed text-slate-600">
        "{match.investor.thesis}"
      </blockquote>

      {/* Metrics Grid */}
      <div className="mx-6 mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-slate-50/50 p-3">
          <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500 mb-1">
            <DollarSign className="h-3.5 w-3.5" />
            Check Size
          </div>
          <div className="text-[15px] font-semibold text-slate-900">{checkSize}</div>
        </div>
        <div className="rounded-xl bg-slate-50/50 p-3">
          <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500 mb-1">
            <TrendingUp className="h-3.5 w-3.5" />
            Stage
          </div>
          <div className="text-[15px] font-semibold text-slate-900 capitalize">
            {match.investor.stages?.map((s: string) => s.toLowerCase().replace('_', ' ')).join(' → ') || 'Not disclosed'}
          </div>
        </div>
      </div>

      {/* Industries */}
      <div className="mx-6 mt-5">
        <div className="text-[13px] font-medium text-slate-500 mb-2">Focus Industries</div>
        <div className="flex flex-wrap gap-1.5">
          {match.investor.industries?.slice(0, 3).map((industry: string, idx: number) => (
            <span
              key={idx}
              className="rounded-full bg-slate-100 px-2.5 py-1 text-[12px] font-medium text-slate-700"
            >
              {industry.replace('_', ' ')}
            </span>
          ))}
          {match.investor.industries && match.investor.industries.length > 3 && (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[12px] font-medium text-slate-700">
              +{match.investor.industries.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* AI Reasons */}
      <div className="mx-6 mt-6 space-y-2">
        <div className="text-[13px] font-medium text-slate-500">Why this match?</div>
        <ul className="space-y-1.5">
          {match.reasons?.slice(0, 3).map((reason: string, idx: number) => (
            <li key={idx} className="flex items-start gap-2 text-[14px] text-slate-700">
              <div className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
              {reason}
            </li>
          ))}
        </ul>
        {match.concerns?.length > 0 && (
          <div className="pt-2 border-t border-slate-200">
            <div className="text-[13px] font-medium text-amber-600 mb-1">Potential concerns</div>
            <ul className="space-y-1">
              {match.concerns?.slice(0, 2).map((concern: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-[13px] text-amber-700">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                  {concern}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* View Profile Button */}
      <div className="mt-auto px-6 pt-5 pb-6">
        <button
          onClick={onView}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 text-[14px] font-medium text-slate-700 hover:bg-slate-200 transition-colors"
        >
          <Info className="h-4 w-4" />
          View Full Profile & Match Analysis
        </button>
      </div>
    </div>
  )
}

```

**File 19: ****`components/ActionBar.tsx`**

```tsx
'use client'
import { X, Star, Eye, Heart, Bookmark } from 'lucide-react'

export default function ActionBar({
  onPass,
  onSuper,
  onView,
  onInterest,
  onSave,
}: {
  onPass: () => void
  onSuper: () => void
  onView: () => void
  onInterest: () => void
  onSave: () => void
}) {
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <button
        onClick={onPass}
        className="group flex h-14 w-14 items-center justify-center rounded-full border-2 border-rose-300 bg-white hover:bg-rose-50 transition-colors"
        aria-label="Pass"
      >
        <X className="h-6 w-6 text-rose-500 group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={onSuper}
        className="group flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-300 bg-white hover:bg-amber-50 transition-colors"
        aria-label="Super Match"
      >
        <Star className="h-6 w-6 text-amber-500 group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={onView}
        className="group flex h-14 w-14 items-center justify-center rounded-full border-2 border-slate-300 bg-white hover:bg-slate-50 transition-colors"
        aria-label="View Profile"
      >
        <Eye className="h-6 w-6 text-slate-500 group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={onInterest}
        className="group flex h-14 w-14 items-center justify-center rounded-full border-2 border-emerald-300 bg-white hover:bg-emerald-50 transition-colors"
        aria-label="Interested"
      >
        <Heart className="h-6 w-6 text-emerald-500 group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={onSave}
        className="group flex h-14 w-14 items-center justify-center rounded-full border-2 border-sky-300 bg-white hover:bg-sky-50 transition-colors"
        aria-label="Save"
      >
        <Bookmark className="h-6 w-6 text-sky-500 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  )
}

```

**File 20: ****`components/AIInsightsPanel.tsx`**

```tsx
'use client'
import { BarChart3, TrendingUp, AlertCircle, Target } from 'lucide-react'

export default function AIInsightsPanel({ match }: { match: any }) {
  const dimensions = [
    { key: 'industry', label: 'Industry Fit', score: 98 },
    { key: 'stage', label: 'Stage Fit', score: 95 },
    { key: 'checkSize', label: 'Check Size', score: 91 },
    { key: 'geography', label: 'Geography', score: 89 },
    { key: 'thesis', label: 'Thesis Match', score: 94 },
  ]

  const recommendations = [
    "Prioritize this match - high alignment across all key dimensions",
    "Reach out via warm intro from their portfolio founders",
    "Focus your pitch on their specific enterprise SaaS thesis",
    "Highlight your $2M ARR growth to address their revenue preference",
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold text-slate-900">AI Match Intelligence</h3>
      </div>

      {/* Score Circle */}
      <div className="text-center mb-6">
        <div className="relative inline-block">
          <svg className="w-32 h-32" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="12"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#10b981"
              strokeWidth="12"
              strokeDasharray={`${match.matchScore * 3.39} 340`}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-slate-900">{match.matchScore}%</div>
            <div className="text-sm text-slate-500">Match Score</div>
          </div>
        </div>
      </div>

      {/* Dimension Scores */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-4 w-4 text-slate-600" />
          <h4 className="font-medium text-slate-900">Dimension Analysis</h4>
        </div>
        <div className="space-y-3">
          {dimensions.map((dim) => (
            <div key={dim.key}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">{dim.label}</span>
                <span className="font-medium text-slate-900">{dim.score}%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${dim.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-emerald-600" />
          <h4 className="font-medium text-slate-900">Strengths</h4>
        </div>
        <ul className="space-y-2">
          {match.reasons?.slice(0, 3).map((reason: string, i: number) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <div className="mt1 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-slate-700">{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Considerations */}
      {match.concerns?.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <h4 className="font-medium text-slate-900">Considerations</h4>
          </div>
          <ul className="space-y-2">
            {match.concerns?.slice(0, 2).map((concern: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                <span className="text-amber-700">{concern}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* AI Recommendations */}
      <div className="pt-6 border-t border-slate-200">
        <h4 className="font-medium text-slate-900 mb-3">AI Recommendations</h4>
        <div className="space-y-2">
          {recommendations.map((rec, i) => (
            <div
              key={i}
              className="text-sm bg-gradient-to-r from-emerald-50/50 to-sky-50/50 p-3 rounded-lg border border-emerald-100"
            >
              {rec}
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
            View Detailed Analysis →
          </button>
        </div>
      </div>
    </div>
  )
}

```

**File 21: ****`components/AuthProvider.tsx`**

```tsx
'use client'
import { SessionProvider } from 'next-auth/react'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}

```

---

## **LIB FOLDER FILES**

**File 22: ****`lib/db.ts`**

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

```

**File 23: ****`lib/types.ts`**

```typescript
export type Stage = 
  | 'PRE_SEED' 
  | 'SEED' 
  | 'SERIES_A' 
  | 'SERIES_B' 
  | 'SERIES_C_PLUS'

export type InvestorType = 
  | 'VC' 
  | 'ANGEL' 
  | 'FAMILY_OFFICE' 
  | 'PE' 
  | 'CORPORATE'

export type Action = 
  | 'PASS' 
  | 'INTEREST' 
  | 'SUPER_INTEREST' 
  | 'SAVE' 
  | 'VIEW'

export interface FounderProfile {
  id: string
  userId: string
  companyName: string
  description: string
  industry: string
  subIndustry?: string
  stage: Stage
  geography: string[]
  targetMarkets: string[]
  revenueArr?: number
  growthRateYoY?: number
  netRetention?: number
  fundingHistory?: {
    round: string
    amount: number
    investors: string[]
  }[]
  raiseAmount?: number
  valuation?: number
  businessModel: string
  customerType?: 'ENTERPRISE' | 'SMB' | 'CONSUMER' | 'GOV'
  investorPreferences: string[]
  competitors?: string[]
  embedding?: number[]
  profileCompleteness: number
}

export interface InvestorProfile {
  id: string
  userId: string
  name: string
  logoUrl?: string
  investorType: InvestorType
  verified: boolean
  thesis: string
  locations: string[]
  industries: string[]
  excludedIndustries: string[]
  subIndustries?: string[]
  stages: Stage[]
  minCheck?: number
  maxCheck?: number
  geographies: string[]
  minRevenueArr?: number
  minGrowthYoY?: number
  businessModels: string[]
  portfolio: {
    name: string
    industry: string
    stage?: Stage
    geography?: string
  }[]
  strategicPreferences: string[]
  responseRatePct?: number
  avgResponseHours?: number
  lastActiveAt?: string
  embedding?: number[]
  profileCompleteness: number
}

export interface DimensionScore {
  key: string
  label: string
  score: number
  weight: number
  known: boolean
}

export interface MatchResult {
  investorId: string
  matchScore: number
  confidence: 'HIGH' | 'MEDIUM' | 'LOW'
  confidenceScore: number
  dimensions: DimensionScore[]
  tier: 'EXCEPTIONAL' | 'STRONG' | 'GOOD' | 'POTENTIAL' | 'LOW'
  reasons: string[]
  concerns: string[]
  investor: InvestorProfile
  isDiscovery: boolean
}

```

**File 24: ****`lib/weights.ts`**

```typescript
export const DEFAULT_WEIGHTS = {
  industry: 0.20,
  stage: 0.15,
  checkSize: 0.15,
  geography: 0.10,
  traction: 0.10,
  thesis: 0.10,
  businessModel: 0.05,
  growth: 0.05,
  strategic: 0.05,
  founderPreference: 0.05,
} as const

export type WeightConfig = Record<keyof typeof DEFAULT_WEIGHTS, number>
export type WeightKey = keyof typeof DEFAULT_WEIGHTS

export function normalizeWeights(weights: Partial<WeightConfig>): WeightConfig {
  const baseWeights = { ...DEFAULT_WEIGHTS, ...weights }
  const total = Object.values(baseWeights).reduce((sum, w) => sum + w, 0)
  
  if (total === 0) return DEFAULT_WEIGHTS
  
  const normalized = {} as WeightConfig
  Object.keys(baseWeights).forEach((key) => {
    normalized[key as WeightKey] = baseWeights[key as WeightKey] / total
  })
  
  return normalized
}

```

**File 25: ****`lib/scoring.ts`**

```typescript
import { FounderProfile, InvestorProfile, Stage, DimensionScore } from './types'
import { WeightConfig, DEFAULT_WEIGHTS } from './weights'

const STAGE_ORDER: Stage[] = ['PRE_SEED', 'SEED', 'SERIES_A', 'SERIES_B', 'SERIES_C_PLUS']

type DimensionResult = { score: number; known: boolean }

function industryFit(founder: FounderProfile, investor: InvestorProfile): DimensionResult {
  if (!investor.industries?.length) return { score: 0, known: false }
  
  const normalized = (str: string) => str.toLowerCase().trim().replace(/_/g, ' ')
  const founderIndustry = normalized(founder.industry)
  
  // Check excluded industries
  if (investor.excludedIndustries?.some(
    ind => normalized(ind) === founderIndustry
  )) return { score: 0, known: true }
  
  // Direct match
  if (investor.industries.some(ind => normalized(ind) === founderIndustry)) {
    return { score: 1.0, known: true }
  }
  
  // Sub-industry match
  if (founder.subIndustry && investor.subIndustries?.some(
    sub => normalized(sub) === normalized(founder.subIndustry!)
  )) {
    return { score: 0.85, known: true }
  }
  
  // Generalist investor
  if (investor.industries.some(ind => 
    ['generalist', 'agnostic', 'technology'].includes(normalized(ind))
  )) {
    return { score: 0.6, known: true }
  }
  
  // Portfolio adjacency
  const portfolioIndustries = new Set(
    investor.portfolio?.map(p => normalized(p.industry)) || []
  )
  if (portfolioIndustries.has(founderIndustry)) {
    return { score: 0.55, known: true }
  }
  
  return { score: 0.15, known: true }
}

function stageFit(founder: FounderProfile, investor: InvestorProfile): DimensionResult {
  if (!investor.stages?.length) return { score: 0, known: false }
  
  const founderIndex = STAGE_ORDER.indexOf(founder.stage)
  if (founderIndex === -1) return { score: 0, known: false }
  
  const distances = investor.stages.map(s => {
    const investorIndex = STAGE_ORDER.indexOf(s)
    return investorIndex === -1 ? Infinity : Math.abs(investorIndex - founderIndex)
  })
  
  const minDistance = Math.min(...distances)
  
  // Stage distance scoring
  const stageScore = [1.0, 0.65, 0.3, 0.1, 0.0][Math.min(minDistance, 4)]
  return { score: stageScore, known: true }
}

function checkSizeFit(founder: FounderProfile, investor: InvestorProfile): DimensionResult {
  if (!founder.raiseAmount || investor.minCheck == null || investor.maxCheck == null) {
    return { score: 0, known: false }
  }
  
  const raise = founder.raiseAmount
  
  // Too small for the round
  if (investor.maxCheck < raise * 0.02) {
    return { score: 0.1, known: true }
  }
  
  // Too large for the round
  if (investor.minCheck > raise) {
    const ratio = raise / investor.minCheck
    return { score: 0.5 * ratio, known: true }
  }
  
  // Good fit - calculate centering
  const midpoint = (investor.minCheck + investor.maxCheck) / 2
  const ideal = raise * 0.3  // Ideal check size for raising round
  
  const distanceRatio = Math.abs(Math.log10(midpoint / ideal)) / 2
  const centering = Math.max(0, 1 - distanceRatio)
  
  const canLead = investor.maxCheck >= raise * 0.25
  const score = 0.6 * centering + (canLead ? 0.4 : 0.2)
  
  return { score: Math.max(0, Math.min(1, score)), known: true }
}

function geographyFit(founder: FounderProfile, investor: InvestorProfile): DimensionResult {
  if (!investor.geographies?.length) return { score: 0, known: false }
  
  const normalize = (str: string) => str.toLowerCase().trim()
  
  // Global investor
  if (investor.geographies.some(g => normalize(g) === 'global')) {
    return { score: 0.85, known: true }
  }
  
  const founderLocations = new Set([
    ...founder.geography.map(normalize),
    ...(founder.targetMarkets || []).map(normalize)
  ])
  
  const investorLocations = new Set(investor.geographies.map(normalize))
  
  const intersection = new Set(
    [...founderLocations].filter(x => investorLocations.has(x))
  )
  
  if (intersection.size > 0) {
    // HQ match is stronger than target market match
    const hqMatch = founder.geography.some(hq => investor
```