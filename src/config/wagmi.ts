import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, polygon } from 'wagmi/chains'
import { TRANSPORTS } from './chains'

export const wagmiConfig = getDefaultConfig({
  appName: 'WalletBoard',
  projectId: '3a8170812b534d0ff9d794f19a901d64',
  chains: [mainnet, polygon],
  transports: TRANSPORTS,
})
