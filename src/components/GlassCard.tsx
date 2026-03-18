import { motion, type HTMLMotionProps } from 'framer-motion'

interface GlassCardProps extends HTMLMotionProps<'div'> {
  readonly children: React.ReactNode
  readonly className?: string
}

export function GlassCard({ children, className = '', ...props }: GlassCardProps) {
  return (
    <motion.div
      className={`
        rounded-2xl border border-white/10
        bg-white/5 backdrop-blur-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  )
}
