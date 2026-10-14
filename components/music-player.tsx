'use client'

import { useRef, useState } from 'react'
import { MusicControls } from './music-controls'
import { Card } from './ui/card'
import { Queue } from './queue'

export function MusicPlayer() {
  const audioPlayer = useRef<HTMLAudioElement | null>(null)

  const [isQueueVisible, setIsQueueVisible] = useState<boolean>(true)

  return (
    <Card className="h-100 w-150">
      <div className="flex h-full w-full flex-row">
        <div className="flex h-full flex-1 flex-col">
          <div className="flex-1" />
          <div className="flex justify-center p-4">
            <MusicControls audioPlayerRef={audioPlayer} />
          </div>
        </div>
        <div className="h-full shrink-0 p-4">{isQueueVisible && <Queue />}</div>
      </div>
      {/* <audio ref={audioPlayer} hidden src={''} /> */}
    </Card>
  )
}
