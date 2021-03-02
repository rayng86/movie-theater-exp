import React from 'react';

const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    style={{ fill: 'red', stroke: 'red', width: '1rem' }}
  >
    <path
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule="evenodd"
    />
  </svg>
);

const Footer = () => (
  <div id="created-by">
    <span>
      All my {' '}
      <HeartIcon />{' '}
      to cinemas around the world. <br /> Created by{' '}
      <a href="https://github.com/rayng86" rel="noreferrer" target="_blank">
        Raymond Ng
      </a>
    </span>
  </div>
);

export default Footer;
