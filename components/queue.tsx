import { useAppStore } from '@/lib/app-store'
import { SONGS, type Song } from '@/lib/songs'
import { useEffect } from 'react'

export function Queue() {
  const queue = useAppStore((state) => state.queue)

  useEffect(() => {
    const { queue: current, setQueue } = useAppStore.getState()
    if (current.length >= 10) return
    const fill: Song[] = []
    while (current.length + fill.length < 10) {
      const pick = SONGS[Math.floor(Math.random() * SONGS.length)]
      if (!pick) break
      fill.push(pick)
    }
    setQueue([...current, ...fill])
  }, [])

  return (
    <div className="flex h-full w-full flex-col gap-2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta iure
      veniam consequatur fugit accusantium vero consequuntur deleniti earum
      illo, voluptatibus ipsum aut placeat corrupti possimus repellendus velit,
      quia perferendis omnis.
    </div>
  )
}

export function addSongToQueue() {
  const randomSong = SONGS[Math.floor(Math.random() * SONGS.length)]
  const { queue, setQueue } = useAppStore.getState()
  setQueue([...queue, randomSong])
}
