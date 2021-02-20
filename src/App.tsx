import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import TravelCurtains from './components/TravelCurtain';
import { TriviaComponent } from './components/TriviaSlideComponent';
import { State, PossibleStates, ScreenViews } from './types';
import TheaterCtrls from './components/TheaterCtrls';
import CreditsComponent from './components/CreditsComponent';
import { musicHelper } from './helper';
import YouTubeVideoComponent from './components/YouTubeVideo';

function App() {
  const [curtainState, setCurtainState] = useState(false);
  const [lightsState, setLights] = useState(false);
  const [isProjectorOn, toggleProjector] = useState(false);
  const [screenView, setScreenView] = useState<ScreenViews>(ScreenViews.none);

  // Trivia States
  const [triviaData, setTriviaData] = useState<State>({
    kind: PossibleStates.initial,
  });

  // Background Music Audio
  const [isBackgroundMusicOn, toggleBackgroundMusic] = useState(false);
  const [bgMusicAudio] = useState(new Audio('../sounds/mike-leite-happy.mp3'));

  // Projector Audio
  const [projectorAudio] = useState(
    new Audio('../sounds/film-projector-sound-effect.mp3')
  );
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
    toggleProjector(!isProjectorOn);
    setScreenView(ScreenViews.none);
    setProjectorAudioPlaying(!projectorAudioPlaying);
    musicHelper(projectorAudio, projectorAudioPlaying, 0.1);
  };

  const toggleBgMusic = () => {
    toggleBackgroundMusic(!isBackgroundMusicOn);
    musicHelper(bgMusicAudio, isBackgroundMusicOn, 0.1);
  };

  const changeScreenView = (view: ScreenViews) => {
    if (screenView === view && screenView !== ScreenViews.none) {
      setScreenView(ScreenViews.none);
    } else {
      setScreenView(view);
    }
  };

  return (
    <div className="App">
      <div style={{ flex: '0 1 auto' }}>
        <div className="curtain">
          <div className={`lights ${lightsState ? 'dimmed' : ''}`} />
          <div className={`curtain-wrapper ${curtainState ? 'open' : ''}`}>
            <TravelCurtains curtainAlignedPosition="left" />

            <div
              className="front-stage-content"
              style={
                lightsState && isProjectorOn ? { zIndex: 4 } : { zIndex: 1 }
              }
            >
              <div className={`screen ${isProjectorOn ? '' : 'off'} ${lightsState ? 'dimmed' : ''}`}>
                {isProjectorOn &&
                  screenView === ScreenViews.trivia &&
                  triviaData.kind === PossibleStates.success && (
                    <TriviaComponent triviaData={triviaData.data} />
                  )}
                {isProjectorOn && screenView === ScreenViews.credits && (
                  <CreditsComponent />
                )}
                {isProjectorOn && screenView === ScreenViews.trailers && (
                  <YouTubeVideoComponent ytKey="kP9TfCWaQT4" changeScreenView={changeScreenView} />
                )}
                {isProjectorOn && screenView === ScreenViews.silentPolicyPreroll && (
                  <YouTubeVideoComponent ytKey="j_eabL16a5w" changeScreenView={changeScreenView} />
                )}
              </div>
            </div>

            <TravelCurtains curtainAlignedPosition="right" />
          </div>
        </div>
      </div>
      {isProjectorOn && <div className={`projector-light ${lightsState ? 'dimmed' : ''}`}>&nbsp;</div>}
      <div className="theater-seats"></div>
      <TheaterCtrls
        isProjectorOn={isProjectorOn}
        setCurtainState={setCurtainState}
        curtainState={curtainState}
        toggleLights={toggleLights}
        toggleProjector={toggleScreenProjector}
        toggleBgMusic={toggleBgMusic}
        changeScreenView={changeScreenView}
      />
      <div id="created-by" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, marginLeft: 'auto', marginRight: 'auto' }}>
        All my love to cinema. <br /> Created by Raymond Ng
      </div>
    </div>
  );
}

export default App;
