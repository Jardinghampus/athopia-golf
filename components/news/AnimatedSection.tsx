'use client'

import { motion } from 'framer-motion'
import { ReactNode, CSSProperties } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
  className?: string
  style?: CSSProperties
}

export default function AnimatedSection({ children, delay = 0, className, style }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
