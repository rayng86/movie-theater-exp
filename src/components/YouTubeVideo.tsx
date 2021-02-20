import React from 'react';
import YouTube from 'react-youtube';
import { ScreenViews } from '../types';

type YouTubeVideoComponentProps = {
  ytKey: string,
  changeScreenView: (view: ScreenViews) => void,
}

const YouTubeVideoComponent = ({ ytKey, changeScreenView } : YouTubeVideoComponentProps) => {
  const opts: any = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      showinfo: 0,
      controls: 0,
    },
  };
  return (
  <YouTube className="ytplayer" containerClassName="ytplayer-container" videoId={ytKey} opts={opts} onEnd={()=> changeScreenView(ScreenViews.none)} />
)
};

export default YouTubeVideoComponent;