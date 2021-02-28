import React from 'react';

const Footer = () => (
  <div
    id="created-by"
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      marginLeft: 'auto',
      marginRight: 'auto',
      lineHeight: '2rem',
    }}
  >
    All my{' '}
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        style={{ fill: 'red', stroke: 'red', width: '1rem' }}
      >
        <path
          fillRule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          clipRule="evenodd" />
      </svg>
    </span>{' '}
  to cinemas around the world. <br /> Created by{' '}
    <a href="https://github.com/rayng86" rel="noreferrer" target="_blank">
      Raymond Ng
  </a>
  </div>
);

export default Footer;