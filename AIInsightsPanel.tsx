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
