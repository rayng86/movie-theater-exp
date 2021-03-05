import axios from 'axios';
import { PossibleStates } from './types';

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

export const moviedbApiUrl = 'https://api.themoviedb.org/3';
export const theMovieDBApiKey = process.env.REACT_APP_THE_MOVIE_DB_API;
const nowPlayingMoviesUrl = `${moviedbApiUrl}/movie/now_playing`;

export const fetchMovies: any = async() => {
  try {
    const {data} = await axios.get(nowPlayingMoviesUrl, {
      params: {
        api_key: theMovieDBApiKey,
        language: 'en_US',
        page: 1,
        region: 'US',
      }
    })
    const imgBaseUrlPath = 'https://image.tmdb.org/t/p/original/';
    const modifiedData = data['results'].map((m: any) => ({
      id: m.id,
      backdrop: imgBaseUrlPath + m.backdrop_path,
      title: m.title,
      poster: imgBaseUrlPath + m.poster_path
    }))
    return { kind: PossibleStates.success, data: modifiedData };
  } catch (error) {
    console.log(error);
    return ({ kind: PossibleStates.error, errorStr: error.request });
  }
}