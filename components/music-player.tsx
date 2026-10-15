'use client'

import { useEffect, useRef, useState } from 'react'
import { MusicControls } from './music-controls'
import { Card } from './ui/card'
import { Queue } from './queue'
import { Waveform } from './waveform'
import { SongInfo } from './song-info'
import { useAppStore } from '@/lib/app-store'

export function MusicPlayer() {
  const setAudioPlayer = useAppStore((state) => state.setAudioPlayer)
  const audioPlayer = useRef<HTMLAudioElement | null>(null)

  const [isQueueVisible, setIsQueueVisible] = useState<boolean>(true)

  const currentSong = useAppStore((state) => state.currentSong)

  useEffect(() => {
    setAudioPlayer(audioPlayer)
  }, [audioPlayer, setAudioPlayer])

  return (
    <>
      <audio src={currentSong?.cdnUrl} ref={audioPlayer} />
      <Card className="p-5">
        <div className="flex h-full w-full flex-row gap-5">
          <div className="flex min-h-0 max-w-150 min-w-50 flex-1 flex-col">
            <div className="flex min-h-0 flex-1 flex-col">
              <SongInfo />
            </div>
            <div className="flex shrink-0 justify-center">
              <MusicControls key={currentSong?.cdnUrl} />
            </div>
          </div>
          <div className="bg-border w-px shrink-0 self-stretch"></div>
          <div className="max-w-60 min-w-30 shrink-0 overflow-y-auto">
            {isQueueVisible && <Queue />}
          </div>
        </div>
      </Card>
    </>
  )
}
