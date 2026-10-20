'use client'

import { useEffect, useRef, useState } from 'react'
import { MusicControls } from './music-controls'
import { Card } from './ui/card'
import { Queue } from './queue'
import { Waveform } from './waveform'
import { SongInfo } from './song-info'
import { useAppStore } from '@/lib/app-store'
import { Button } from './ui/button'
import { InfoIcon, ListMusicIcon, Volume2Icon, VolumeIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { Slider } from './ui/slider'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { cn } from 'cn'

export function MusicPlayer() {
  const setAudioPlayer = useAppStore((state) => state.setAudioPlayer)
  const audioPlayer = useRef<HTMLAudioElement | null>(null)

  const [isQueueVisible, setIsQueueVisible] = useState<boolean>(true)

  const currentSong = useAppStore((state) => state.currentSong)

  useEffect(() => {
    setAudioPlayer(audioPlayer)
    if (!audioPlayer.current) return
    audioPlayer.current.volume = 0.5
  }, [audioPlayer, setAudioPlayer])

  useEffect(() => {
    const audio = audioPlayer.current
    if (!audio || !currentSong) return
    audio.src = currentSong.cdnUrl
    audio.load()
    if (useAppStore.getState().continuePlaying) {
      useAppStore.setState({ continuePlaying: false })
      audio.play().catch(() => {})
    }
  }, [audioPlayer, currentSong])

  return (
    <>
      <audio ref={audioPlayer} />
      <Card className="h-full max-h-120 min-h-97 min-w-120 p-5">
        <div className="flex h-full min-h-0 w-full flex-row">
          <div className="relative flex min-h-0 max-w-150 min-w-50 flex-1 flex-col">
            <div className="gap absolute top-1 right-1 z-50 flex flex-col">
              {currentSong?.credits && (
                <Dialog>
                  <DialogTrigger
                    render={
                      <Button variant="ghost">
                        <InfoIcon size={25} />
                      </Button>
                    }
                  />
                  <DialogContent>
                    <DialogTitle>Song Credits</DialogTitle>
                    <DialogDescription>
                      {currentSong?.credits}
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              )}
              <Button
                variant="ghost"
                onClick={() => setIsQueueVisible(!isQueueVisible)}
              >
                <ListMusicIcon size={25} />
              </Button>
              <div className="group h-full w-full">
                <Button variant="ghost">
                  <Volume2Icon size={25} className="" />
                </Button>
                <div className="opacity-0 group-hover:opacity-100">
                  <Slider
                    className="max-h-15"
                    orientation="vertical"
                    min={0.0}
                    max={1.0}
                    step={0.01}
                    defaultValue={0.5}
                    onValueChange={(v) => {
                      if (!audioPlayer.current) return
                      audioPlayer.current.volume = Array.isArray(v) ? v[0] : v
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex min-h-0 flex-1 flex-col">
              <SongInfo />
            </div>
            <div className="flex shrink-0 justify-center">
              <MusicControls key={currentSong?.cdnUrl} />
            </div>
          </div>
          <div
            className={cn(
              'flex h-full min-h-0 shrink-0 items-stretch overflow-hidden transition-all duration-300 ease-in-out',
              isQueueVisible ? 'ml-5 w-45.25 opacity-100' : 'ml-0 w-0 opacity-0'
            )}
          >
            <div className="bg-border w-px shrink-0" />
            <div className="ml-5 h-full w-40">
              <Queue />
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}
