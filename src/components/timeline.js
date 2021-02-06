import React, { useEffect, useState, useReducer } from 'react';
import { Icon } from '@mdi/react';
import { mdiCheckCircle, mdiAlertOctagon } from '@mdi/js';
import { Spinner, Button } from 'react-bootstrap';

import { Milestone } from '../models/milestone';
import { useUser } from './userContext';

import './timeline.css';

export const Timeline = () => {
  const [milestones, setMilestones] = useState([]);
  const [syncError, setSyncError] = useState();
  const [loading, setLoading] = useState(false);

  const user = useUser();

  const [isLogged, setLoggedIn] = useState(user.isLogged);

  const forceUpdate = useReducer((x) => x + 1, 0)[1];

  useEffect(() => {
    refreshMilestones();
  }, []);

  useEffect(() => {
    user.on('loginState', setLoggedIn);

    return () => {
      user.removeListener('loginState', setLoggedIn);
    };
  });

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

  const refreshMilestones = async () => {
    try {
      setLoading(true);
      const response = await Milestone.getMilestones();
      setMilestones(response);
    } catch (e) {
      setSyncError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const setCompleted = (milestone) => {
    milestone.status = 'completed';
    forceUpdate();
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
            <div className="d-flex flex-column flex-grow-1">
              <h3 className="h3">{milestone.title}</h3>
              <p className="event-description">{milestone.description}</p>
              {milestone.status === 'inprogress' && isLogged && (
                <div className="d-flex justify-content-center align-items-center">
                  <Button
                    variant="primary"
                    onClick={() => setCompleted(milestone)}
                  >
                    Mark as completed
                  </Button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
