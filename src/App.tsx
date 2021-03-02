import React, { useState } from 'react';
import './App.css';
import TravelCurtains from './components/TravelCurtain';
import TriviaComponent from './components/TriviaSlideComponent';
import { ScreenViews } from './types';
import TheaterCtrls from './components/TheaterCtrls';
import CreditsComponent from './components/CreditsComponent';
import { musicHelper } from './helper';
import YouTubeVideoComponent from './components/YouTubeVideo';
import MovieTrailersComponent from './components/MovieTrailersComponent';
import BgMusicToggleComponent from './components/BgMusicToggleComponent';
import Footer from './components/Footer';
import ToggleTheaterCtrls from './components/ToggleTheaterCtrls';

function App() {
  const [ctrlMenuExpanded, toggleCtrlMenu] = useState(false);
  const [curtainState, setCurtainState] = useState(false);
  const [lightsState, setLights] = useState(false);
  const [isProjectorOn, toggleProjector] = useState(false);
  const [screenView, setScreenView] = useState<ScreenViews>(ScreenViews.none);

  // Background Music Audio
  const [isBackgroundMusicOn, toggleBackgroundMusic] = useState(false);
  const [bgMusicAudio] = useState(new Audio('../sounds/mike-leite-happy.mp3'));

  // Projector Audio
  const [projectorAudio] = useState(
    new Audio('../sounds/film-projector-sound-effect.mp3')
  );
  const [projectorAudioPlaying, setProjectorAudioPlaying] = useState(false);

  const toggleLights = () => {
    setLights(!lightsState);
  };
  
  const showOrHideTheaterCtrls = () => {
    toggleCtrlMenu(!ctrlMenuExpanded);
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

  const onEnd = (player?: any) => {
    changeScreenView(ScreenViews.none);
  };

  return (
    <div className="App">
      <div className="mobile-portrait-mode-alert">
        Rotate the screen to landscape mode
      </div>
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
              <div
                className={`screen ${isProjectorOn ? '' : 'off'} ${
                  lightsState ? 'dimmed' : ''
                }`}
              >
                {isProjectorOn && screenView === ScreenViews.trivia && (
                  <TriviaComponent />
                )}
                {isProjectorOn && screenView === ScreenViews.credits && (
                  <CreditsComponent />
                )}
                {isProjectorOn && screenView === ScreenViews.trailers && (
                  <MovieTrailersComponent changeScreenView={changeScreenView} />
                )}
                {isProjectorOn &&
                  screenView === ScreenViews.silentPolicyPreroll && (
                    <YouTubeVideoComponent
                      videoKey={'j_eabL16a5w'}
                      onEnd={onEnd}
                    />
                  )}
              </div>
            </div>

            <TravelCurtains curtainAlignedPosition="right" />
          </div>
        </div>
      </div>
      {isProjectorOn && (
        <div className={`projector-light ${lightsState ? 'dimmed' : ''}`}>
          &nbsp;
        </div>
      )}
      <div className="theater-seats"></div>
      {ctrlMenuExpanded && (<TheaterCtrls
        isProjectorOn={isProjectorOn}
        setCurtainState={setCurtainState}
        curtainState={curtainState}
        toggleLights={toggleLights}
        toggleProjector={toggleScreenProjector}
        changeScreenView={changeScreenView}
      />)}
      <Footer />
      <ToggleTheaterCtrls
        ctrlMenuExpanded={ctrlMenuExpanded}
        showOrHideTheaterCtrls={showOrHideTheaterCtrls}
      />
      <BgMusicToggleComponent
        isBackgroundMusicOn={isBackgroundMusicOn}
        toggleBgMusic={toggleBgMusic}
      />
    </div>
  );
}

export default App;
