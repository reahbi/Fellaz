'use client'

import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useEffect, useState } from 'react'
function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }

interface TeamMemberCardProps {
  position: 'left' | 'right'
  jobPosition?: string
  firstName?: string
  lastName?: string
  imageUrl?: string
  fallbackImageUrl?: string
  description?: string
  className?: string
}

/**
 * Editorial-style team member card with overlapping portrait, large display
 * typography, circular CTA toggle, and staggered entrance animations.
 */
export default function TeamMemberCard({
  position = 'left',
  jobPosition = 'Founder',
  firstName = 'First',
  lastName = 'Last',
  imageUrl = 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?fm=jpg&q=60',
  fallbackImageUrl,
  description = 'Passionate about building the future.',
  className,
}: TeamMemberCardProps) {
  const fullName = `${firstName} ${lastName}`
  const isPositionRight = position === 'right'
  const [resolvedImageUrl, setResolvedImageUrl] = useState(imageUrl)

  useEffect(() => {
    setResolvedImageUrl(imageUrl)
  }, [imageUrl])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn('relative my-24 flex flex-col justify-center', className)}
    >
      {/* jobPosition label — editorial uppercase tracking */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p
          className={cn(
            'mb-6 text-sm font-medium tracking-[0.4em] text-zinc-400 uppercase',
            isPositionRight && 'text-right'
          )}
        >
          {jobPosition}
        </p>
      </motion.div>

      <div className='flex items-center justify-end'>
        {/* Portrait image with reveal animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'relative h-[600px] w-[420px] shrink-0 overflow-hidden shadow-2xl shadow-black/50',
            isPositionRight && 'order-1'
          )}
        >
          {/* Subtle grain overlay for texture */}
          <div className='pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/10 to-transparent' />
          <img
            src={resolvedImageUrl}
            alt={fullName}
            onError={() => {
              if (fallbackImageUrl && resolvedImageUrl !== fallbackImageUrl) {
                setResolvedImageUrl(fallbackImageUrl)
              }
            }}
            className='h-full w-full object-cover transition-transform duration-1000 ease-[0.22,1,0.36,1] hover:scale-110 filter grayscale contrast-125'
          />
        </motion.div>

        {/* Info block — overlaps image via negative margin */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'relative -left-16 z-20 flex w-[calc(100%-350px)] flex-col gap-12',
            isPositionRight && 'left-16 items-end'
          )}
        >
          {/* Display name — large editorial type */}
          <div>
            <p className='text-6xl md:text-8xl leading-[1.05] font-extralight tracking-tighter text-white drop-shadow-2xl'>
              {firstName}
              <br />
              <span className='font-normal italic tracking-wide'>{lastName}</span>
            </p>
          </div>

          {/* Details row — toggle + bio */}
          <div className={cn('flex gap-8 items-end', isPositionRight && 'justify-end flex-row-reverse')}>
            {/* Circular CTA with hover pulse */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'group flex h-24 w-24 shrink-0 cursor-pointer items-center justify-center rounded-full border border-zinc-700 transition-colors duration-500 hover:border-white hover:bg-white bg-black/60 backdrop-blur-md',
              )}
            >
              <ArrowRight
                size={28}
                className={cn(
                  'text-zinc-400 transition-all duration-500 group-hover:-rotate-45 group-hover:text-black',
                  isPositionRight && 'rotate-180 group-hover:rotate-[135deg]'
                )}
              />
            </motion.div>

            {/* Bio copy — restrained body text */}
            <div className='w-[80%] md:w-[60%]'>
              <p
                className={cn(
                  'text-base md:text-lg leading-[1.8] text-zinc-300 font-light tracking-wide bg-zinc-950/80 backdrop-blur-xl p-6 rounded-sm border-l border-white/20',
                  isPositionRight && 'text-right border-r border-l-0'
                )}
              >
                {description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
