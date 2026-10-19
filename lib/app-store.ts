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
  continuePlaying: boolean
  nextTrack: (continuePlaying?: boolean) => void
  previousTrack: (continuePlaying?: boolean) => void
  volume: number
  setVolume: (volume: number) => void

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
      continuePlaying: false,
      nextTrack: (continuePlaying = false) =>
        set((s) => {
          const next = s.queue[0]
          if (!next) return {}
          return {
            currentSong: next,
            queue: s.queue.slice(1),
            history: s.currentSong
              ? [...s.history, s.currentSong].slice(-5)
              : s.history,
            continuePlaying,
          }
        }),
      previousTrack: (continuePlaying = false) =>
        set((s) => {
          const prev = s.history[s.history.length - 1]
          if (!prev || !s.currentSong) return {}
          return {
            currentSong: prev,
            history: s.history.slice(0, -1),
            queue: [s.currentSong, ...s.queue],
            continuePlaying,
          }
        }),
      volume: 0.5,
      setVolume: (volume: number) => set({ volume }),
      audioPlayer: null,
      setAudioPlayer: (audioPlayer: RefObject<HTMLAudioElement | null>) =>
        set({ audioPlayer }),
    }),
    {
      name: 'music-player',
      version: 1,
      migrate: (persistedState, version) => {
        if (version < 1) return { queue: [], history: [] }
        return persistedState as { queue: Song[]; history: Song[] }
      },
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ queue: s.queue, history: s.history }),
    }
  )
)
