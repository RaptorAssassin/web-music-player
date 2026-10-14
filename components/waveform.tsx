import Wavesurfer from 'wavesurfer.js'

export function Waveform() {
  const wavesurfer = Wavesurfer.create({
    container: '#waveform',
    waveColor: '#372aac',
    url: 'https://cdn.hackclub.com/01a13c41-d961-74cf-baca-26b71b9805ec/XENOGENESIS.mp3',
  })

  return <div className="" id="waveform"></div>
}
