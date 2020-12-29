import React from 'react';
import {Link} from "react-router-dom";
export const Banner30DataSource = {
  wrapper: { className: 'banner3' },
  textWrapper: {
    className: 'banner3-text-wrapper',
    children: [
      {
        name: 'nameEn',
        className: 'banner3-name-en',
        children: (
          <span>
            <p>
              <br />
            </p>
          </span>
        ),
      },
      {
        name: 'slogan',
        className: 'banner3-slogan',
        children: 'PASC Online Judge',
        texty: true,
      },
      {
        name: 'name',
        className: 'banner3-name',
        children: (
          <span>
            <p>Where Code Happens</p>
          </span>
        ),
      },
      {
        name: 'button',
        className: 'banner3-button',
        children: (
          <Link to='/login'>
            <p>Sign In</p>
          </Link>
        ),
      },
      {
        name: 'time',
        className: 'banner3-time',
        children: (
          <span>
            <p>
              <br />
            </p>
          </span>
        ),
      },
    ],
  },
};
