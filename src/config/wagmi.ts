import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, polygon } from 'wagmi/chains'
import { TRANSPORTS } from './chains'

export const wagmiConfig = getDefaultConfig({
  appName: 'WalletBoard',
  projectId: 'walletboard-demo',
  chains: [mainnet, polygon],
  transports: TRANSPORTS,
})
