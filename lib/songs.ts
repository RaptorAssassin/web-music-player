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
    name: 'got my heart on sale',
    artist: 'sensacya',
    tags: [],
    cdnUrl:
      'https://cdn.hackclub.com/01a15578-309e-7a96-ad39-386f5d54b317/sensacya%20-%20got%20my%20heart%20on%20sale%20%5BNCS%20Release%5D.mp3',
    coverCdnUrl:
      'https://cdn.hackclub.com/01a15578-2dc6-7ad6-88db-ef37b56611bb/got%20my%20heart%20on%20sale%20-%20cover.jpg',
    credits:
      'Song: sensacya - got my heart on sale\nMusic provided by NoCopyrightSounds\nFree Download/Stream: http://ncs.io/gotmyheartonsale\nWatch: https://ncs.lnk.to/gotmyheartonsaleAT/youtube',
  },
  {
    name: 'halcyon',
    artist: 'onte',
    tags: [],
    cdnUrl:
      'https://cdn.hackclub.com/01a15579-b9bc-718c-a8ef-7abf3a655b0e/onte%20-%20halcyon%20%5BNCS%20Release%5D.mp3',
    coverCdnUrl:
      'https://cdn.hackclub.com/01a15579-b7b3-762c-801a-ae56e2801968/halcyon%20-%20cover.jpg',
    credits:
      'Song: onte - halcyon\nMusic provided by NoCopyrightSounds\nFree Download/Stream: http://ncs.io/o_halcyon\nWatch: http://ncs.lnk.to/o_halcyonAT/youtube',
  },
  {
    name: 'once more',
    artist: 'prodBigMike, Glitch Cat',
    tags: [],
    cdnUrl:
      'https://cdn.hackclub.com/01a1557b-ef12-7db5-8d8e-41a9e3b6809c/prodBigMike,%20Glitch%20Cat%20-%20once%20more%20%5BNCS%20Release%5D.mp3',
    coverCdnUrl:
      'https://cdn.hackclub.com/01a1557b-edd8-716a-9f3e-57dd9dfa4a9c/once%20more%20-%20cover.jpg',
    credits:
      'Song: prodBigMike & Glitch Cat - once more\nMusic provided by NoCopyrightSounds\nFree Download/Stream: http://ncs.io/oncemore\nWatch: https://ncs.lnk.to/oncemoreAT/youtube',
  },
  {
    name: 'Free',
    artist: 'Reece Rosé',
    tags: [],
    cdnUrl:
      'https://cdn.hackclub.com/01a1557e-0c3c-7ce5-8ae1-640f1541ebc4/Reece%20Ros%C3%A9%20-%20Free%20%5BNCS%20Release%5D.mp3',
    coverCdnUrl:
      'https://cdn.hackclub.com/01a1557e-0a70-7cde-a477-9fe71922ad0c/Free%20-%20cover.jpg',
    credits: 'Song: Reece Rosé - Free\nMusic provided by NoCopyrightSounds',
  },
]
