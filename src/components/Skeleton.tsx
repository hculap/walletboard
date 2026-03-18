interface SkeletonProps {
  readonly className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`
        animate-shimmer rounded-lg
        bg-gradient-to-r from-white/5 via-white/10 to-white/5
        bg-[length:200%_100%]
        ${className}
      `}
    />
  )
}
