'use client'
import { FastForwardIcon, PauseIcon, PlayIcon, RewindIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useState, type RefObject } from 'react'

export function MusicControls({
  audioPlayerRef,
}: {
  audioPlayerRef: RefObject<HTMLAudioElement | null>
}) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  return (
    <div className="flex gap-2">
      <ControlButton>
        <RewindIcon size={35} />
      </ControlButton>
      <ControlButton
        onClick={() => {
          if (!isPlaying) {
            audioPlayerRef.current?.play()
            setIsPlaying(true)
          } else {
            audioPlayerRef.current?.pause()
            setIsPlaying(false)
          }
        }}
      >
        {isPlaying ? <PauseIcon size={40} /> : <PlayIcon size={40} />}
      </ControlButton>
      <ControlButton>
        <FastForwardIcon size={35} />
      </ControlButton>
    </div>
  )
}

type ControlButtonProps = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

function ControlButton({ children, className, onClick }: ControlButtonProps) {
  return (
    <motion.button
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.95 }}
      className="focus-visible:rounded-lg focus-visible:border focus-visible:border-green-600 focus-visible:outline-none"
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}
