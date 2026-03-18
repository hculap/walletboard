import { motion } from 'framer-motion'
import { type TokenBalance } from '@/hooks/useTokenBalances'
import { type PriceMap } from '@/hooks/useTokenPrices'
import { formatBalance, formatCompactUsd } from '@/lib/format'
import { GlassCard } from './GlassCard'
import { Skeleton } from './Skeleton'

interface PortfolioSummaryProps {
  readonly balances: readonly TokenBalance[]
  readonly prices: PriceMap | undefined
  readonly isLoading: boolean
}

function computeTotalValue(
  balances: readonly TokenBalance[],
  prices: PriceMap | undefined,
): number {
  if (!prices) return 0

  return balances.reduce((total, { token, balance }) => {
    const formatted = formatBalance(balance, token.decimals)
    const balanceNum = Number(formatted)
    const price = prices[token.coingeckoId]
    return total + (price ? balanceNum * price.usd : 0)
  }, 0)
}

export function PortfolioSummary({ balances, prices, isLoading }: PortfolioSummaryProps) {
  const totalValue = computeTotalValue(balances, prices)

  return (
    <GlassCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden p-6"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent"
      />
      <div className="relative">
        <p className="text-sm font-medium uppercase tracking-wider text-gray-400">
          Total Portfolio Value
        </p>
        {isLoading ? (
          <Skeleton className="mt-2 h-10 w-48" />
        ) : (
          <motion.p
            key={totalValue}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent"
          >
            {formatCompactUsd(totalValue)}
          </motion.p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Across {balances.length} tokens on 2 networks
        </p>
      </div>
    </GlassCard>
  )
}
