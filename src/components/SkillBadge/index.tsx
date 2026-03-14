interface SkillBadgeProps {
  label: string
  /** colour for border + text; defaults to white/30 */
  color?: string
  size?: 'sm' | 'md'
}

export default function SkillBadge({ label, color, size = 'sm' }: SkillBadgeProps) {
  const pad   = size === 'sm' ? 'px-2.5 py-1'   : 'px-3 py-1.5'
  const text  = size === 'sm' ? 'text-[10px]'   : 'text-xs'

  return (
    <span
      className={`${pad} ${text} font-mono tracking-widest uppercase border transition-colors duration-300`}
      style={{
        borderColor: color ? `${color}50` : 'rgba(255,255,255,0.1)',
        color:       color ?? 'rgba(255,255,255,0.4)',
      }}
    >
      {label}
    </span>
  )
}
