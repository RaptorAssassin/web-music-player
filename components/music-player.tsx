'use client'

import { useRef } from 'react'
import { MusicControls } from './music-controls'
import { Card } from './ui/card'

export function MusicPlayer() {
  const audioPlayer = useRef<HTMLAudioElement | null>(null)

  return (
    <Card className="relative md:h-100 md:w-150">
      <audio
        ref={audioPlayer}
        hidden
        src={
          'https://file-examples.com/storage/fe2c03bec06acf90f98c40f/2017/11/file_example_MP3_1MG.mp3'
        }
      />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <MusicControls audioPlayerRef={audioPlayer} />
      </div>
    </Card>
  )
}
