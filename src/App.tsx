import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import TravelCurtains from './components/TravelCurtain';
import { TriviaComponent } from './components/TriviaSlideComponent';
import { State, PossibleStates } from './types';
import TheaterCtrls from './components/TheaterCtrls';
import { musicHelper } from './helper';

function App() {
  const [curtainState, setCurtainState] = useState(false);
  const [lightsState, setLights] = useState(false);
  const [screenState, toggleScreenState] = useState(false);
  // const [playTrailersState, setPlayTrailersState] = useState(false);
  
  // Trivia States
  const [isTriviaMode, toggleTrivia] = useState(false);
  const [triviaData, setTriviaData] = useState<State>({
    kind: PossibleStates.initial,
  });

  const [isBackgroundMusicOn, toggleBackgroundMusic] = useState(false);
  const [bgMusicAudio] = useState(new Audio('../sounds/mike-leite-happy.mp3'));
  
  // Projector Audio
  const [projectorAudio] = useState(new Audio('../sounds/film-projector-sound-effect.mp3'));
  const [projectorAudioPlaying, setProjectorAudioPlaying] = useState(false);

  useEffect(() => {
    setTriviaData({ kind: PossibleStates.loading });
    axios
      .get(
        'https://opentdb.com/api.php?amount=25&category=11&difficulty=easy&type=multiple'
      )
      .then((res: any) => {
        const data = res.data;
        setTriviaData({ kind: PossibleStates.success, data: data.results });
      })
      .catch((err: any) => {
        if (err.response) {
          console.log('error in response', err.response);
          setTriviaData({ kind: PossibleStates.error, errorStr: err.response });
        } else if (err.request) {
          console.log('error in request', err.request);
          setTriviaData({ kind: PossibleStates.error, errorStr: err.request });
        } else {
          console.log('something else went horribly wrong');
          setTriviaData({
            kind: PossibleStates.error,
            errorStr: 'something went wrong, try again later',
          });
        }
      });
  }, []);

  const toggleLights = () => {
    setLights(!lightsState);
  };

  const toggleScreenProjector = () => {
    toggleScreenState(!screenState);
    toggleTrivia(false);
    setProjectorAudioPlaying(!projectorAudioPlaying);
    musicHelper(projectorAudio, projectorAudioPlaying, 0.1);
  };

  const toggleBgMusic = () => {
    toggleBackgroundMusic(!isBackgroundMusicOn);
    musicHelper(bgMusicAudio, isBackgroundMusicOn, 0.1);
  }

  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
        <div className="curtain">
          <div className={`lights ${lightsState ? 'dimmed' : ''}`} />
          <div className={`curtain-wrapper ${curtainState ? 'open' : ''}`}>
            <TravelCurtains curtainAlignedPosition="left" />

            <div
              className="front-stage-content"
              style={lightsState && screenState ? { zIndex: 4 } : { zIndex: 1 }}
            >
              <div className={`screen ${screenState ? '' : 'off'}`}>
                {screenState &&
                  isTriviaMode &&
                  triviaData.kind === PossibleStates.success && (
                    <TriviaComponent triviaData={triviaData.data} />
                  )}
                {screenState && playTrailersState && (
                  <>
                    <video
                      width="100%"
                      height="100%"
                      autoPlay
                      style={{ objectFit: 'fill' }}
                    >
                      <source src="trailer1.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </>
                )} */}
              </div>
            </div>

            <TravelCurtains curtainAlignedPosition="right" />
          </div>
        </div>
      </div>
      {screenState && <div id="cone">&nbsp;</div>}
      <TheaterCtrls
        screenState={screenState}
        setCurtainState={setCurtainState}
        curtainState={curtainState}
        toggleLights={toggleLights}
        toggleScreenProjector={toggleScreenProjector}
        toggleTrivia={toggleTrivia}
        isTriviaMode={isTriviaMode}
        toggleBgMusic={toggleBgMusic}
      />
      <div id="credits">
        All my love to cinema. <br /> Created by Raymond Ng
      </div>
    </div>
  );
}

export default App;
