import React, { useEffect, useState } from 'react';
import { Icon } from '@mdi/react';
import { mdiCheckCircle, mdiAlertOctagon } from '@mdi/js';
import { Spinner } from 'react-bootstrap';

import { Milestone } from '../models/milestone';

import './timeline.css';

export const Timeline = () => {
  const [milestones, setMilestones] = useState([]);
  const [syncError, setSyncError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await Milestone.getMilestones();
        setMilestones(response);
      } catch (e) {
        setSyncError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
      media = (
        <Spinner animation="grow" variant="light" className="custom-grow" />
      );
    } else if (milestone.status === 'completed') {
      media = <Icon size={0.9} path={mdiCheckCircle} color="green" />;
    }
    return media;
  };

  return (
    <>
      {loading && (
        <div className="spinner-container text-light">
          <Spinner size="big" variant="light" animation="border" />
          <div className="mt-3">Loading milestones</div>
        </div>
      )}
      {syncError && (
        <div className="error-container text-danger">
          <Icon path={mdiAlertOctagon} size={3} />
          <div className="mt-3">{syncError}</div>
        </div>
      )}

      <ul className="timeline">
        {milestones.map((milestone, index) => (
          <li
            key={index}
            className={['event', milestone.status].filter((a) => a).join(' ')}
          >
            <div className="media">{getMedia(milestone)}</div>
            <div className="text">
              <h3 className="h3">{milestone.title}</h3>
              <p>{milestone.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
