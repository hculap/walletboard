import { motion } from 'framer-motion'
import { type TokenBalance } from '@/hooks/useTokenBalances'
import { type PriceData } from '@/hooks/useTokenPrices'
import { formatBalance, formatUsd } from '@/lib/format'
import { NetworkBadge } from './NetworkBadge'
import { PriceChange } from './PriceChange'
import { Skeleton } from './Skeleton'

interface TokenRowProps {
  readonly tokenBalance: TokenBalance
  readonly price: PriceData | undefined
  readonly index: number
}

export function TokenRow({ tokenBalance, price, index }: TokenRowProps) {
  const { token, balance, isLoading } = tokenBalance
  const formattedBalance = formatBalance(balance, token.decimals)
  const balanceNum = Number(formattedBalance)
  const usdValue = price ? balanceNum * price.usd : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group flex items-center gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-white/5"
    >
      <div className="relative flex-shrink-0">
        <img
          src={token.logoUrl}
          alt={token.symbol}
          className="h-10 w-10 rounded-full ring-2 ring-white/10"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = `data:image/svg+xml,${encodeURIComponent(
              `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" rx="20" fill="#374151"/><text x="20" y="25" text-anchor="middle" fill="white" font-size="14" font-family="sans-serif">${token.symbol[0]}</text></svg>`
            )}`
          }}
        />
        <div className="absolute -bottom-1 -right-1">
          <NetworkBadge chainId={token.chainId} />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">{token.symbol}</span>
          <span className="hidden text-xs text-gray-500 sm:inline">{token.name}</span>
        </div>
        {price && (
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>{formatUsd(price.usd)}</span>
            <PriceChange change={price.usd_24h_change} />
          </div>
        )}
      </div>

      <div className="text-right">
        {isLoading ? (
          <Skeleton className="ml-auto h-5 w-20" />
        ) : (
          <>
            <div className="font-mono text-sm font-medium text-white">
              {formattedBalance} {token.symbol}
            </div>
            {price && (
              <div className="text-xs text-gray-400">
                {formatUsd(usdValue)}
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  )
}
