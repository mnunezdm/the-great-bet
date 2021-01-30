import React from 'react';

import { mdiGithub, mdiLinkedin } from '@mdi/js';
import Icon from '@mdi/react';

import './aboutMe.css';

export const AboutMe = () => {
  return (
    <div className="about">
      <div>With ❤ from mnunezdm</div>
      <div>
        <a href="https://github.com/mnunezdm" target="#blank">
          <Icon className="icon" path={mdiGithub} size={1} />
        </a>
        <a href="https://www.linkedin.com/in/mnunezdm/" target="#blank">
          <Icon className="icon" path={mdiLinkedin} size={1} />
        </a>
      </div>
    </div>
  );
};
