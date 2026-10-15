export type Song = {
  name: string
  artist: string
  tags: string[]
  cdnUrl: string
  coverCdnUrl?: string
  credits?: string
}

export const SONGS: Song[] = [
  {
    name: 'Xenogesis',
    artist: 'TheFatRat',
    tags: ['energetic'],
    cdnUrl:
      'https://cdn.hackclub.com/01a13c41-d961-74cf-baca-26b71b9805ec/XENOGENESIS.mp3',
    coverCdnUrl:
      'https://cdn.hackclub.com/01a13c4c-3236-70f9-a1fe-713df422f2c3/XENOGENESIS%20HD%20WALLPAPER.jpg',
    credits:
      'Music provided by TheFatRat, original video: https://www.youtube.com/watch?v=RPXxesyD-dg',
  },
  {
    name: 'Xenogesis 2',
    artist: 'TheFatRat',
    tags: ['energetic'],
    cdnUrl:
      'https://cdn.hackclub.com/01a13c41-d961-74cf-baca-26b71b9805ec/XENOGENESIS.mp3',
    coverCdnUrl:
      'https://cdn.hackclub.com/01a13c4c-3236-70f9-a1fe-713df422f2c3/XENOGENESIS%20HD%20WALLPAPER.jpg',
    credits:
      'Music provided by TheFatRat, original video: https://www.youtube.com/watch?v=RPXxesyD-dg',
  },
]
