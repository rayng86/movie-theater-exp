import React, { useState } from 'react';
import YouTube from 'react-youtube';

type YouTubeVideoComponentProps = {
  videoKey: string;
  onEnd: Function,
};

const YouTubeVideoComponent = ({
  videoKey,
  onEnd,
}: YouTubeVideoComponentProps) => {
  const [player, setPlayer] = useState<any>(null);

  const onReady = (event: any) => {
    setPlayer(event.target);
  };
  const opts: any = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      showinfo: 0,
      controls: 0,
      playsinline: 1,
    },
  };
  return (
    <YouTube
      className="ytplayer"
      containerClassName="ytplayer-container"
      videoId={videoKey}
      opts={opts}
      onReady={onReady}
      onEnd={() => onEnd(player)}
    />
  );
};

export default YouTubeVideoComponent;
