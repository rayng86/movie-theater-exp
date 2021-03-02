import React from 'react';

export type ToggleTheaterCtrlsProps = {
  ctrlMenuExpanded: boolean;
  showOrHideTheaterCtrls: () => void;
};

const ToggleTheaterCtrls = ({
  ctrlMenuExpanded,
  showOrHideTheaterCtrls,
}: ToggleTheaterCtrlsProps) => (
  <div
    style={{
      position: 'absolute',
      top: '1rem',
      left: '1rem',
      width: '2rem',
      height: '2rem',
      zIndex: 9998,
      cursor: 'pointer',
    }}
    onClick={showOrHideTheaterCtrls}
    title="bg music"
  >
    {!ctrlMenuExpanded ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
      >
        <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        style={{
          stroke: 'white',
          width: '3rem',
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
        />
      </svg>
    )}
  </div>
);

export default ToggleTheaterCtrls;
