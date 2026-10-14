import { useAppStore } from '@/lib/app-store'
import Image from 'next/image'

export function SongInfo({ className }: { className?: string }) {
  const currentSong = useAppStore((state) => state.currentSong)

  return (
    <div
      className={`flex w-full flex-col items-center justify-center ${className ?? ''}`}
    >
      {/* Album Cover */}
      <div className="relative aspect-square w-full max-w-55 overflow-hidden rounded-xl">
        {currentSong?.coverCdnUrl && (
          <Image
            src={currentSong.coverCdnUrl}
            alt="Song Album Cover"
            fill
            draggable={false}
            sizes="(max-width: 768px) 50vw, 220px"
            className="object-cover object-center"
          />
        )}
      </div>
      {/* Song & Artist Name */}
      <div className="gap-0.7 mt-2 flex w-full max-w-55 flex-col items-start text-left">
        <span className="text-lg font-bold">{currentSong?.name}</span>
        <span className="text-sm">{currentSong?.artist}</span>
      </div>
    </div>
  )
}
