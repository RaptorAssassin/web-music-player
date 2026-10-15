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
  history: Song[]
  nextTrack: () => void
  previousTrack: () => void

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
      history: [],
      nextTrack: () =>
        set((s) => {
          const next = s.queue[0]
          if (!next) return {}
          return {
            currentSong: next,
            queue: s.queue.slice(1),
            history: s.currentSong
              ? [...s.history, s.currentSong].slice(-5)
              : s.history,
          }
        }),
      previousTrack: () =>
        set((s) => {
          const prev = s.history[s.history.length - 1]
          if (!prev || !s.currentSong) return {}
          return {
            currentSong: prev,
            history: s.history.slice(0, -1),
            queue: [s.currentSong, ...s.queue],
          }
        }),
      audioPlayer: null,
      setAudioPlayer: (audioPlayer: RefObject<HTMLAudioElement | null>) =>
        set({ audioPlayer }),
    }),
    {
      name: 'music-player',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ queue: s.queue, history: s.history }),
    }
  )
)
