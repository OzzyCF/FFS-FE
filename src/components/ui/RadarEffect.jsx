'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Circle = ({ className, idx, style }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: idx * 0.1, duration: 0.2 }}
      className={cn(
        'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full',
        className
      )}
      style={style}
    />
  )
}

export const Radar = ({ className }) => {
  const circles = new Array(8).fill(1)
  return (
    <div className={cn('relative flex h-20 w-20 items-center justify-center rounded-full', className)}>
      <style>{`
        @keyframes radar-spin {
          from { transform: rotate(20deg); }
          to   { transform: rotate(380deg); }
        }
        .animate-radar-spin {
          animation: radar-spin 16s linear infinite;
        }
      `}</style>

      {/* Rotating sweep line */}
      <div
        style={{ transformOrigin: 'right center' }}
        className="animate-radar-spin absolute right-1/2 top-1/2 z-40 flex h-[5px] w-[400px] items-end justify-center overflow-hidden bg-transparent"
      >
        <div
          className="relative z-40 h-[1px] w-full"
          style={{ background: 'linear-gradient(to right, transparent, rgba(0,196,125,0.35), transparent)' }}
        />
      </div>

      {/* Concentric green rings */}
      {circles.map((_, idx) => (
        <Circle
          key={`circle-${idx}`}
          idx={idx}
          style={{
            height: `${(idx + 1) * 5}rem`,
            width: `${(idx + 1) * 5}rem`,
            border: `1px solid rgba(0,196,125,${Math.max(0.03, 0.18 - idx * 0.02)})`,
          }}
        />
      ))}
    </div>
  )
}

export const LocationPin = ({ text, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: delay ?? 0 }}
      className="relative z-50 flex flex-col items-center gap-[6px]"
    >
      {/* Icon with gold ping dot */}
      <div className="relative">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-xl"
          style={{
            background: 'rgba(212,168,67,0.1)',
            border: '1px solid rgba(212,168,67,0.28)',
          }}
        >
          <MapPin size={13} style={{ color: '#D4A843' }} strokeWidth={2} />
        </div>
        <span
          className="absolute -top-[3px] -right-[3px] w-2 h-2 rounded-full animate-ping"
          style={{ background: '#D4A843', opacity: 0.55 }}
        />
        <span
          className="absolute -top-[3px] -right-[3px] w-2 h-2 rounded-full"
          style={{ background: '#D4A843' }}
        />
      </div>

      {/* Barrio label */}
      <span
        className="text-[11px] font-semibold text-center whitespace-nowrap"
        style={{ color: 'rgba(255,255,255,0.48)' }}
      >
        {text}
      </span>
    </motion.div>
  )
}
