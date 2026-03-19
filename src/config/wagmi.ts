import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, polygon } from 'wagmi/chains'
import { TRANSPORTS } from './chains'

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID

if (!projectId) {
  throw new Error('VITE_WALLETCONNECT_PROJECT_ID environment variable is not set')
}

export const wagmiConfig = getDefaultConfig({
  appName: 'WalletBoard',
  projectId,
  chains: [mainnet, polygon],
  transports: TRANSPORTS,
})
