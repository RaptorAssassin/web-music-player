import { useAppStore } from '@/lib/app-store'
import { SONGS, type Song } from '@/lib/songs'
import { useEffect } from 'react'

function shuffleSongs(): Song[] {
  const songs = [...SONGS]
  for (let i = songs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[songs[i], songs[j]] = [songs[j], songs[i]]
  }
  return songs
}

function mixedSongs(count: number): Song[] {
  const mixed: Song[] = []
  while (mixed.length < count) {
    const cycle = shuffleSongs()
    if (
      mixed.length > 0 &&
      cycle[0]?.cdnUrl === mixed[mixed.length - 1]?.cdnUrl
    ) {
      const first = cycle.shift()
      if (first) cycle.push(first)
    }
    mixed.push(...cycle)
  }
  return mixed.slice(0, count)
}

export function Queue() {
  const queue = useAppStore((state) => state.queue)

  useEffect(() => {
    const { queue: current, setQueue } = useAppStore.getState()
    if (current.length >= 10) return
    setQueue([...current, ...mixedSongs(10 - current.length)])
  }, [])

  return (
    <div className="flex h-full w-full scrollbar-none flex-col gap-1 overflow-y-auto">
      {queue.map((song, index) => (
        <div key={`${song.cdnUrl}-${index}`} className="rounded-md px-2 py-1.5">
          <p className="truncate text-sm font-medium">{song.name}</p>
          <p className="text-muted-foreground truncate text-xs">
            {song.artist}
          </p>
        </div>
      ))}
    </div>
  )
}

export function addSongToQueue() {
  const { queue, setQueue } = useAppStore.getState()
  const lastUrl = queue[queue.length - 1]?.cdnUrl
  const pool = SONGS.filter((song) => song.cdnUrl !== lastUrl)
  const pick = pool[Math.floor(Math.random() * pool.length)]
  if (!pick) return
  setQueue([...queue, pick])
}
