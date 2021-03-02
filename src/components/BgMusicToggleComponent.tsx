import React from 'react';

export type BgMusicToggleComponentProps = {
  isBackgroundMusicOn: boolean;
  toggleBgMusic: () => void;
};

const BgMusicToggleComponent = ({
  isBackgroundMusicOn,
  toggleBgMusic
}: BgMusicToggleComponentProps) => <div style={{
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  width: '2rem',
  height: '2rem',
  zIndex: 9998,
  cursor: 'pointer'
}} onClick={toggleBgMusic} title="bg music">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" color="white">
      <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
    </svg>
    {isBackgroundMusicOn && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{
    position: 'relative',
    top: '-43px',
    left: '-7px',
    stroke: 'indianred',
    width: '3rem'
  }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>}
  </div>;
  
  export default BgMusicToggleComponent;