'use client'
import { useAppStore } from '@/lib/app-store'
import { FastForwardIcon, PauseIcon, PlayIcon, RewindIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Slider } from './ui/slider'
import { addSongToQueue } from './queue'

export function MusicControls() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentPosition, setCurrentPosition] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const isScrubbing = useRef<boolean>(false)
  const rafId = useRef<number>(0)
  const audioEl = useRef<HTMLAudioElement | null>(null)

  const setCurrentSong = useAppStore((state) => state.setCurrentSong)
  const audioPlayer = useAppStore((state) => state.audioPlayer)
  const queue = useAppStore((state) => state.queue)
  const setQueue = useAppStore((state) => state.setQueue)

  useEffect(() => {
    const audio = audioPlayer?.current
    if (!audio) return
    audioEl.current = audio

    const syncDuration = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
    }
    const syncTime = () => {
      if (!isScrubbing.current) setCurrentPosition(audio.currentTime)
    }
    const syncPlaying = () => {
      setIsPlaying(!audio.paused && !audio.ended)
    }
    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentPosition(0)
      setCurrentSong(queue.slice(0, 1)[0])
      setQueue(queue.slice(1))
      addSongToQueue()
    }
    const tick = () => {
      if (!audio.paused && !audio.ended && !isScrubbing.current) {
        setCurrentPosition(audio.currentTime)
      }
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)

    audio.addEventListener('loadedmetadata', syncDuration)
    audio.addEventListener('durationchange', syncDuration)
    audio.addEventListener('timeupdate', syncTime)
    audio.addEventListener('play', syncPlaying)
    audio.addEventListener('pause', syncPlaying)
    audio.addEventListener('ended', handleEnded)
    syncDuration()
    syncPlaying()

    return () => {
      cancelAnimationFrame(rafId.current)
      audio.removeEventListener('loadedmetadata', syncDuration)
      audio.removeEventListener('durationchange', syncDuration)
      audio.removeEventListener('timeupdate', syncTime)
      audio.removeEventListener('play', syncPlaying)
      audio.removeEventListener('pause', syncPlaying)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [audioPlayer])

  return (
    <div className="mt-4 flex flex-col gap-4">
      <Slider
        min={0}
        max={duration}
        step={0.01}
        value={[currentPosition]}
        onValueChange={(v) => {
          const next = typeof v === 'number' ? v : (v[0] ?? 0)
          isScrubbing.current = true
          setCurrentPosition(next)
        }}
        onValueCommitted={(v) => {
          const next = typeof v === 'number' ? v : (v[0] ?? 0)
          isScrubbing.current = false
          const audio = audioPlayer?.current
          if (audio && Number.isFinite(next)) audio.currentTime = next
          setCurrentPosition(next)
        }}
      />
      <div className="flex shrink-0 gap-2">
        <ControlButton>
          <RewindIcon size={35} />
        </ControlButton>
        <ControlButton
          onClick={() => {
            const audio = audioPlayer?.current
            if (!audio) return
            if (audio.paused || audio.ended) {
              if (audio.ended) audio.currentTime = 0
              audio.play().catch(() => setIsPlaying(false))
            } else {
              audio.pause()
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
