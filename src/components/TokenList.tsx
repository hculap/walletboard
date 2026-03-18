import { motion } from 'framer-motion'
import { type TokenBalance } from '@/hooks/useTokenBalances'
import { type PriceMap } from '@/hooks/useTokenPrices'
import { GlassCard } from './GlassCard'
import { TokenRow } from './TokenRow'
import { Skeleton } from './Skeleton'

interface TokenListProps {
  readonly balances: readonly TokenBalance[]
  readonly prices: PriceMap | undefined
  readonly isLoading: boolean
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="space-y-2 text-right">
            <Skeleton className="ml-auto h-4 w-20" />
            <Skeleton className="ml-auto h-3 w-14" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function TokenList({ balances, prices, isLoading }: TokenListProps) {
  if (isLoading && balances.length === 0) {
    return (
      <GlassCard>
        <LoadingSkeleton />
      </GlassCard>
    )
  }

  return (
    <GlassCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="border-b border-white/5 px-6 py-4">
        <h2 className="text-sm font-medium uppercase tracking-wider text-gray-400">
          Token Balances
        </h2>
      </div>
      <motion.div className="divide-y divide-white/5 p-2">
        {balances.map((tb, i) => (
          <TokenRow
            key={`${tb.token.chainId}-${tb.token.address}`}
            tokenBalance={tb}
            price={prices?.[tb.token.coingeckoId]}
            index={i}
          />
        ))}
      </motion.div>
    </GlassCard>
  )
}
