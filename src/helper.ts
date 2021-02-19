export const fixTextStr = (str: string) => {
  const mapObj: any = {
    '&#039;': '\'',
    '&quot;': '"',
    '&amp;': '&',
  };
  const re = new RegExp(Object.keys(mapObj).join("|"), "gi");
  return str.replace(re, (matched) => mapObj[matched.toLowerCase()]);
};

export const randomizeAnswers = (arr: Array<string>) => {
  const randomize = (a: string, b: string) => 0.5 - Math.random();
  return arr.sort(randomize);
};

export const randomBg = () => {
  const r = Math.floor(Math.random() * 252);
  const g = Math.floor(Math.random() * 213);
  const b = Math.floor(Math.random() * 206);
  const a = 0.7;
  const color = `rgba(${r},${g},${b},${a})`;
  return color;
};

export const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');

export const musicHelper = (audio: any, audioPlayingState: boolean, audioVolumeValue: number) => {
  if (!audioPlayingState) {
    audio.volume = audioVolumeValue;
    audio.loop = true;
    audio.play();
  } else {
    audio.pause();
    audio.currentTime = 0;
  }
}