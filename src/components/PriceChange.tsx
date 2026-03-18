import { motion } from 'framer-motion'
import { formatPercentChange } from '@/lib/format'

interface PriceChangeProps {
  readonly change: number
}

export function PriceChange({ change }: PriceChangeProps) {
  const isPositive = change >= 0

  return (
    <motion.span
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5
        text-xs font-medium
        ${isPositive
          ? 'bg-emerald-500/10 text-emerald-400'
          : 'bg-red-500/10 text-red-400'
        }
      `}
    >
      <span className="text-[10px]">{isPositive ? '\u25B2' : '\u25BC'}</span>
      {formatPercentChange(change)}
    </motion.span>
  )
}
