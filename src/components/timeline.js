import React from 'react';
import { Icon } from '@mdi/react';
import { mdiBitcoin, mdiCheckCircle } from '@mdi/js';
import { Spinner } from 'react-bootstrap';

import './timeline.css';

export const Timeline = () => {
  const milestones = [
    {
      header: 'Pagar',
      description: 'La parte mas importante',
      status: 'completed',
    },
    {
      header: 'El sistema financiero',
      description: 'La parte mas importante',
      status: 'notstarted',
    },
    {
      header: 'Análisis técnico',
      description: 'La parte mas importante',
      status: 'notstarted',
    },
    {
      header: 'Tipos de inversores',
      description: 'La parte mas importante',
      status: 'notstarted',
    },
    {
      header: 'Análisis fundamental y macroeconómico',
      description: 'La parte mas importante',
      status: 'notstarted',
    },
    {
      header: 'Gestión monetaria',
      description: 'La parte mas importante',
      status: 'notstarted',
    },
    {
      header: 'Gestión del riesgo',
      description: 'La parte mas importante',
      status: 'notstarted',
    },
    {
      header: 'Consideraciones finales',
      description: 'La parte mas importante',
      status: 'notstarted',
    },
    {
      header: 'Bitcoin',
      status: 'notstarted',
      icon: mdiBitcoin,
    },
  ];

  const getMedia = (milestone) => {
    let media;
    if (milestone.icon) {
      media = <Icon size={0.9} path={milestone.icon} />;
    } else if (milestone.status === 'inprogress') {
      media = <Spinner animation="grow" variant="primary" />;
    } else if (milestone.status === 'completed') {
      media = <Icon size={0.9} path={mdiCheckCircle} />;
    }
    return media;
  };

  return (
    <ul className="timeline">
      {milestones.map((milestone) => (
        <li className="event" completed={milestone.completed}>
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
