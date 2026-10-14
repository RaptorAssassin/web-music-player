import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { type Song, SONGS } from './songs'
import { RefObject } from 'react'

interface AppStore {
  // Song
  currentSong: Song | null
  setCurrentSong: (song: Song) => void
  queue: Song[]
  setQueue: (songs: Song[]) => void

  // Audio player reference for controls
  audioPlayer: RefObject<HTMLAudioElement | null> | null
  setAudioPlayer: (audioPlayer: RefObject<HTMLAudioElement | null>) => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      currentSong: SONGS[0],
      setCurrentSong: (song: Song) => set({ currentSong: song }),
      queue: [],
      setQueue: (songs: Song[]) => set({ queue: songs }),
      audioPlayer: null,
      setAudioPlayer: (audioPlayer: RefObject<HTMLAudioElement | null>) =>
        set({ audioPlayer }),
    }),
    {
      name: 'music-player',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ queue: s.queue }),
    }
  )
)
