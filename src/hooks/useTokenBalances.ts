import { useReadContracts, useBalance } from 'wagmi'
import { type Address } from 'viem'
import { TOKENS, type TokenConfig } from '@/config/chains'
import { erc20Abi } from '@/lib/erc20Abi'

export interface TokenBalance {
  readonly token: TokenConfig
  readonly balance: bigint
  readonly isLoading: boolean
}

function useNativeBalances(address: Address | undefined) {
  const nativeTokens = TOKENS.filter((t) => t.address === 'native')

  const ethBalance = useBalance({
    address,
    chainId: nativeTokens[0]?.chainId,
    query: { enabled: !!address },
  })

  const polygonBalance = useBalance({
    address,
    chainId: nativeTokens[1]?.chainId,
    query: { enabled: !!address },
  })

  return { ethBalance, polygonBalance, nativeTokens }
}

function useErc20Balances(address: Address | undefined) {
  const erc20Tokens = TOKENS.filter((t) => t.address !== 'native')

  const contracts = erc20Tokens.map((token) => ({
    address: token.address as Address,
    abi: erc20Abi,
    functionName: 'balanceOf' as const,
    args: [address!] as const,
    chainId: token.chainId,
  }))

  const result = useReadContracts({
    contracts,
    query: { enabled: !!address },
  })

  return { result, erc20Tokens }
}

export function useTokenBalances(address: Address | undefined): {
  readonly balances: readonly TokenBalance[]
  readonly isLoading: boolean
  readonly refetch: () => void
} {
  const { ethBalance, polygonBalance, nativeTokens } = useNativeBalances(address)
  const { result: erc20Result, erc20Tokens } = useErc20Balances(address)

  const nativeBalances: readonly TokenBalance[] = [
    {
      token: nativeTokens[0]!,
      balance: ethBalance.data?.value ?? 0n,
      isLoading: ethBalance.isLoading,
    },
    {
      token: nativeTokens[1]!,
      balance: polygonBalance.data?.value ?? 0n,
      isLoading: polygonBalance.isLoading,
    },
  ]

  const erc20Balances: readonly TokenBalance[] = erc20Tokens.map((token, i) => ({
    token,
    balance: (erc20Result.data?.[i]?.result as bigint | undefined) ?? 0n,
    isLoading: erc20Result.isLoading,
  }))

  const balances = [...nativeBalances, ...erc20Balances]
  const isLoading = ethBalance.isLoading || polygonBalance.isLoading || erc20Result.isLoading

  const refetch = () => {
    ethBalance.refetch().catch(() => {})
    polygonBalance.refetch().catch(() => {})
    erc20Result.refetch().catch(() => {})
  }

  return { balances, isLoading, refetch }
}
