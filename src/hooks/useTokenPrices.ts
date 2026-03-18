import { useQuery } from '@tanstack/react-query'
import { TOKENS } from '@/config/chains'

export interface PriceData {
  readonly usd: number
  readonly usd_24h_change: number
}

export type PriceMap = Readonly<Record<string, PriceData>>

async function fetchPrices(): Promise<PriceMap> {
  const ids = [...new Set(TOKENS.map((t) => t.coingeckoId))].join(',')
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Price fetch failed: ${response.status}`)
  }

  const data: Record<string, { usd: number; usd_24h_change: number }> = await response.json()

  const prices: Record<string, PriceData> = {}
  for (const [key, value] of Object.entries(data)) {
    prices[key] = {
      usd: value.usd,
      usd_24h_change: value.usd_24h_change,
    }
  }

  return prices
}

export function useTokenPrices() {
  return useQuery<PriceMap>({
    queryKey: ['token-prices'],
    queryFn: fetchPrices,
    refetchInterval: 30_000,
    staleTime: 15_000,
  })
}
