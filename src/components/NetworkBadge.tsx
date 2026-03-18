import { mainnet } from 'wagmi/chains'
import { getChainName, getChainColor } from '@/config/chains'

interface NetworkBadgeProps {
  readonly chainId: number
}

export function NetworkBadge({ chainId }: NetworkBadgeProps) {
  const name = getChainName(chainId)
  const color = getChainColor(chainId)
  const isEthereum = chainId === mainnet.id

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
      style={{
        backgroundColor: `${color}20`,
        color,
        border: `1px solid ${color}40`,
      }}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      {isEthereum ? 'ETH' : 'MATIC'}
      <span className="hidden sm:inline">{name}</span>
    </span>
  )
}
