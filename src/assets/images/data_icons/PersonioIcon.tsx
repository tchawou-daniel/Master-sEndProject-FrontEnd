import React, { memo } from 'react';

const PersonioIcon = ({ size }: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    height={size}
    width={size}
    preserveAspectRatio="xMidYMid meet"
    style={{ marginRight: 10 }}
  >
    <g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)" style={{ fill: 'currentcolor' }} stroke="none">
      {/* eslint-disable-next-line max-len */}
      <path d="M1280 1720 c-126 -27 -246 -72 -425 -160 -264 -129 -484 -291 -552 -408 -53 -90 -28 -159 61 -169 41 -5 46 -3 57 19 14 32 -3 68 -31 68 -27 0 -25 10 8 56 144 198 707 492 994 518 68 6 124 -8 141 -35 39 -63 -126 -239 -387 -412 -117 -78 -156 -101 -161 -95 -2 2 19 79 46 172 49 172 51 196 14 210 -31 11 -54 -13 -73 -77 -10 -34 -38 -134 -63 -221 l-44 -159 -73 -34 c-41 -19 -97 -38 -124 -42 -69 -11 -87 -42 -47 -82 25 -25 68 -22 145 11 26 11 50 19 54 18 4 -2 -11 -66 -32 -143 -21 -77 -37 -156 -36 -175 3 -30 7 -35 32 -38 16 -2 32 0 37 5 5 5 32 92 59 194 28 101 54 194 59 205 5 12 40 38 77 59 37 21 120 73 183 116 298 200 431 345 431 472 0 44 -4 54 -38 87 -63 63 -153 75 -312 40z" />
      <path d="M1147 659 c-29 -22 -36 -64 -17 -100 15 -28 74 -26 94 3 47 66 -17 145 -77 97z" />
      <path d="M380 340 l0 -50 575 0 575 0 0 50 0 50 -575 0 -575 0 0 -50z" />
    </g>
  </svg>
);

export default memo(PersonioIcon);
