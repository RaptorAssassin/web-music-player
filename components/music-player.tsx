'use client'

import { useRef } from 'react'
import { MusicControls } from './music-controls'
import { Card } from './ui/card'

export function MusicPlayer() {
  const audioPlayer = useRef<HTMLAudioElement | null>(null)

  return (
    <Card className="relative h-100 w-150">
      {/* <audio ref={audioPlayer} hidden src={''} /> */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <MusicControls audioPlayerRef={audioPlayer} />
      </div>
    </Card>
  )
}
