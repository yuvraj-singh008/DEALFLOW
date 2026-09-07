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
