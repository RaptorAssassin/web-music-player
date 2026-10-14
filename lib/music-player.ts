import { RefObject } from 'react'

export function playMusic(audioPlayer: RefObject<HTMLAudioElement | null>) {}

export function pauseMusic(audioPlayer: RefObject<HTMLAudioElement | null>) {}

export function skipTrack(audioPlayer: RefObject<HTMLAudioElement | null>) {}

export function previousTrack(
  audioPlayer: RefObject<HTMLAudioElement | null>
) {}
