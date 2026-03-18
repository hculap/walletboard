import { useAccount } from 'wagmi'
import { useTokenBalances } from '@/hooks/useTokenBalances'
import { useTokenPrices } from '@/hooks/useTokenPrices'
import { PortfolioSummary } from './PortfolioSummary'
import { TokenList } from './TokenList'
import { EmptyState } from './EmptyState'

export function Dashboard() {
  const { address, isConnected } = useAccount()
  const { balances, isLoading: balancesLoading } = useTokenBalances(address)
  const { data: prices, isLoading: pricesLoading } = useTokenPrices()

  if (!isConnected) {
    return <EmptyState />
  }

  const isLoading = balancesLoading || pricesLoading

  return (
    <div className="space-y-6">
      <PortfolioSummary
        balances={balances}
        prices={prices}
        isLoading={isLoading}
      />
      <TokenList
        balances={balances}
        prices={prices}
        isLoading={isLoading}
      />
    </div>
  )
}
