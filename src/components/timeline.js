import React from 'react';
import { Icon } from '@mdi/react';
import { mdiBitcoin, mdiCheckCircle } from '@mdi/js';
import { Spinner } from 'react-bootstrap';

import './timeline.css';

export const Timeline = () => {
  const milestones = [
    {
      header: 'Pagar',
      status: 'completed',
    },
    {
      header: 'El sistema financiero',
      status: 'inprogress',
    },
    {
      header: 'Análisis técnico',
      status: 'notstarted',
    },
    {
      header: 'Tipos de inversores',
      status: 'notstarted',
    },
    {
      header: 'Análisis fundamental y macroeconómico',
      status: 'notstarted',
    },
    {
      header: 'Gestión monetaria',
      status: 'notstarted',
    },
    {
      header: 'Gestión del riesgo',
      status: 'notstarted',
    },
    {
      header: 'Consideraciones finales',
      status: 'notstarted',
    },
    {
      header: 'Bitcoin',
      status: 'notstarted',
      icon: {
        path: mdiBitcoin,
        color: '#f90',
      },
    },
  ];

  const getMedia = (milestone) => {
    let media;
    if (milestone.icon) {
      media = (
        <Icon
          size={0.9}
          path={milestone.icon.path}
          color={milestone.icon.color}
        />
      );
    } else if (milestone.status === 'inprogress') {
      media = <Spinner animation="grow" variant="light" />;
    } else if (milestone.status === 'completed') {
      media = <Icon size={0.9} path={mdiCheckCircle} color="green" />;
    }
    return media;
  };

  return (
    <ul className="timeline">
      {milestones.map((milestone, index) => (
        <li
          key={index}
          className={['event', milestone.status === 'completed' && 'completed']
            .filter((a) => a)
            .join(' ')}
        >
          <div className="media">{getMedia(milestone)}</div>
          <div className="text">
            <h3 className="h3">{milestone.header}</h3>
            <p>{milestone.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
