'use client'

import { useRef, useState } from 'react'
import { MusicControls } from './music-controls'

export function MusicPlayer() {
  const audioPlayer = useRef<HTMLAudioElement | null>(null)

  //const [isPlaying, setIsPlaying] = useState<boolean>(false)

  return (
    <div className="relative rounded-2xl bg-gray-800 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] md:h-100 md:w-150">
      <audio
        ref={audioPlayer}
        hidden
        src={
          'https://file-examples.com/storage/fedfbe78546ace93d982ce8/2017/11/file_example_MP3_1MG.mp3'
        }
      />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <MusicControls audioPlayerRef={audioPlayer} />
      </div>
    </div>
  )
}
