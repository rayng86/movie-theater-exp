import React from 'react';

type TravelCurtainProps = {
  curtainAlignedPosition: 'left' | 'right';
};

const TravelCurtains = ({ curtainAlignedPosition }: TravelCurtainProps) => (
  <>
    <div className={`curtain-panel curtain-panel--${curtainAlignedPosition}`}>
      <div className="travel-curtain" />
      <div className="travel-curtain" />
      <div className="travel-curtain" />
      <div className="travel-curtain" />
      <div className="travel-curtain" />
    </div>
  </>
);

export default TravelCurtains;
