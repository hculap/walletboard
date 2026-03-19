import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, polygon } from 'wagmi/chains'
import { TRANSPORTS } from './chains'

export const wagmiConfig = getDefaultConfig({
  appName: 'WalletBoard',
  projectId: '072de7d3-7101-4b6a-9b34-633c6bc0afcd',
  chains: [mainnet, polygon],
  transports: TRANSPORTS,
})
