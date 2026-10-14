'use client'
import { useAppStore } from '@/lib/app-store'
import { FastForwardIcon, PauseIcon, PlayIcon, RewindIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Slider } from './ui/slider'

export function MusicControls() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentPosition, setCurrentPosition] = useState<number>(0)

  const audioPlayer = useAppStore((state) => state.audioPlayer)

  const currentSong = useAppStore((state) => state.currentSong)

  return (
    <div className="mt-4 flex flex-col gap-4">
      <Slider
        min={0}
        max={audioPlayer?.current?.duration}
        step={0.01}
        onValueChange={(v) => {
          setCurrentPosition(typeof v === 'number' ? v : (v[0] ?? 0))
          if (!audioPlayer?.current) return
          audioPlayer.current.currentTime = currentPosition
        }}
      />
      <div className="flex shrink-0 gap-2">
        <ControlButton>
          <RewindIcon size={35} />
        </ControlButton>
        <ControlButton
          onClick={() => {
            if (!audioPlayer) return
            if (!isPlaying) {
              audioPlayer.current?.play()
              setIsPlaying(true)
            } else {
              audioPlayer.current?.pause()
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
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}
