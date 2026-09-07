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
