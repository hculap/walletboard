export function formatBalance(value: bigint, decimals: number): string {
  const divisor = 10n ** BigInt(decimals)
  const integerPart = value / divisor
  const fractionalPart = value % divisor

  const fractionalStr = fractionalPart
    .toString()
    .padStart(decimals, '0')
    .slice(0, 4)
    .replace(/0+$/, '')

  if (fractionalStr === '') {
    return integerPart.toString()
  }

  return `${integerPart}.${fractionalStr}`
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatCompactUsd(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}K`
  }
  return formatUsd(value)
}

export function formatPercentChange(value: number): string {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
