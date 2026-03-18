import { http } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'
import { type Address } from 'viem'

export const SUPPORTED_CHAINS = [mainnet, polygon] as const

export const TRANSPORTS = {
  [mainnet.id]: http('https://eth.llamarpc.com'),
  [polygon.id]: http('https://polygon.llamarpc.com'),
} as const

export interface TokenConfig {
  readonly symbol: string
  readonly name: string
  readonly decimals: number
  readonly address: Address | 'native'
  readonly chainId: number
  readonly logoUrl: string
  readonly coingeckoId: string
}

const TRUSTWALLET_ASSETS = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains'

export const TOKENS: readonly TokenConfig[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: 18,
    address: 'native',
    chainId: mainnet.id,
    logoUrl: `${TRUSTWALLET_ASSETS}/ethereum/info/logo.png`,
    coingeckoId: 'ethereum',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    chainId: mainnet.id,
    logoUrl: `${TRUSTWALLET_ASSETS}/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png`,
    coingeckoId: 'usd-coin',
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    decimals: 18,
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    chainId: mainnet.id,
    logoUrl: `${TRUSTWALLET_ASSETS}/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png`,
    coingeckoId: 'dai',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: 18,
    address: 'native',
    chainId: polygon.id,
    logoUrl: `${TRUSTWALLET_ASSETS}/ethereum/info/logo.png`,
    coingeckoId: 'ethereum',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    chainId: polygon.id,
    logoUrl: `${TRUSTWALLET_ASSETS}/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png`,
    coingeckoId: 'usd-coin',
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    decimals: 18,
    address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    chainId: polygon.id,
    logoUrl: `${TRUSTWALLET_ASSETS}/polygon/assets/0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063/logo.png`,
    coingeckoId: 'dai',
  },
] as const

export function getChainName(chainId: number): string {
  switch (chainId) {
    case mainnet.id: return 'Ethereum'
    case polygon.id: return 'Polygon'
    default: return 'Unknown'
  }
}

export function getChainColor(chainId: number): string {
  switch (chainId) {
    case mainnet.id: return '#627EEA'
    case polygon.id: return '#8247E5'
    default: return '#888888'
  }
}
