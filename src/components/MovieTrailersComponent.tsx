import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { theMovieDBApiKey, fetchMovies, moviedbApiUrl } from '../helper';
import { PossibleStates, ScreenViews, PopularMoviesState, TrailerState } from '../types';
import YouTubeVideoComponent from './YouTubeVideo';

type MovieTrailersComponentProps = {
  changeScreenView: (view: ScreenViews) => void;
};

const MovieTrailersComponent = ({
  changeScreenView,
}: MovieTrailersComponentProps) => {
  const [videoIndex, setVideoIndex] = useState<number>(0);
  const [popularMoviesData, setPopularMoviesData] = useState<PopularMoviesState>({ kind: PossibleStates.initial });
  const [trailersData, setTrailersData] = useState<TrailerState>({ kind: PossibleStates.initial });
  
  useEffect(() => {
    const fetchAPI = async () => setPopularMoviesData(await fetchMovies());
    fetchAPI();
  }, []);

  useEffect(() => {
    if (popularMoviesData.kind === PossibleStates.success) {
      const fetchTrailers : any = async() => {
        try {
          const {data} = await axios.get(`${moviedbApiUrl}/movie/${popularMoviesData.data[videoIndex].id}/videos`, {
            params: {
              api_key: theMovieDBApiKey,
              language: 'en_US',
            }
          })
          const key = data['results'].filter((m: any) => m.type === 'Trailer')[0].key;
          return { kind: PossibleStates.success, key };
        } catch (error) {
          console.log(error);
        }
      }
      const fetchAPI = async () => setTrailersData(await fetchTrailers());
      fetchAPI();
    }
  }, [popularMoviesData, videoIndex]);

  const onEnd = (player: any) => {
    if (popularMoviesData.kind === PossibleStates.success) {
      if (videoIndex === popularMoviesData.data.length-1) {
        changeScreenView(ScreenViews.none);
      } else {
        setVideoIndex(videoIndex + 1);
        player.playVideo();
      }
    }
  }
  return (
    <>
      {/* {popularMoviesData.kind === PossibleStates.success && (<div
        style={{
          width: '100%',
          height: '100%',
          backgroundSize: 'cover',
          background: `url(${popularMoviesData.data[videoIndex].backdrop}) no-repeat`,
        }}
      >
        {popularMoviesData.data[videoIndex].title}
      </div>)} */}
      {(popularMoviesData.kind === PossibleStates.success) && (trailersData.kind === PossibleStates.success) && (
        <YouTubeVideoComponent
          videoKey={trailersData.key}
          onEnd={onEnd}
        />
      )}
    </>
  );
};

export default MovieTrailersComponent;
