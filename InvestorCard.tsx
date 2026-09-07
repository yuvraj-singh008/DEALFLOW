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
