import React, { useEffect, useState, useReducer } from 'react';
import PropTypes from 'prop-types';

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

  useEffect(() => {
    refreshMilestones();
  }, []);

  useEffect(() => {
    user.on('loginState', setLoggedIn);

    return () => {
      user.removeListener('loginState', setLoggedIn);
    };
  });

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
        {milestones.map((milestone, index, _milestones) => (
          <TimelineItem
            onStatusUpdate={refreshMilestones}
            milestone={milestone}
            key={milestone.id}
            editable={isLogged}
            previousMilestoneStatus={_milestones[index - 1]?.status}
          />
        ))}
      </ul>
    </>
  );
};

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

const TimelineItem = ({
  milestone,
  editable,
  previousMilestoneStatus,
  onStatusUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const setCompleted = async (milestone) => {
    setLoading(true);
    setError();
    try {
      await milestone.updateStatus();
      onStatusUpdate && onStatusUpdate();
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
    forceUpdate();
  };

  const forceUpdate = useReducer((x) => x + 1, 0)[1];

  /**
   *
   * @param {Date} date
   */
  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const readyToStart =
    milestone.status === 'notstarted' &&
    previousMilestoneStatus === 'completed';
  const readyToFinish = milestone.status === 'inprogress';

  return (
    <li className={['event', milestone.status].filter((a) => a).join(' ')}>
      <div className="media">{getMedia(milestone)}</div>
      <div className="d-flex flex-column flex-grow-1">
        <h3 className="h3">{milestone.title}</h3>
        <p className="event-description">{milestone.description}</p>
        {(readyToStart || readyToFinish) && editable && (
          <div className="d-flex justify-content-center align-items-center">
            <Button
              variant={(readyToStart && 'primary') || 'secondary'}
              onClick={() => setCompleted(milestone)}
            >
              {loading && (
                <Spinner
                  size="sm"
                  variant="light"
                  animation="border"
                  className="mr-2"
                />
              )}
              {(readyToStart && 'Start milestone!') || 'Mark as completed!'}
            </Button>
          </div>
        )}
        {error && (
          <div className="mt-3 text-danger align-self-center">{error}</div>
        )}
      </div>
      <div className="font-weight-light font-italic dates">
        {milestone.startedDate && (
          <span>{formatDate(milestone.startedDate)}</span>
        )}
        {milestone.completedDate && (
          <span>{formatDate(milestone.completedDate)}</span>
        )}
      </div>
    </li>
  );
};

TimelineItem.propTypes = {
  milestone: PropTypes.object,
  editable: PropTypes.bool,
  previousMilestoneStatus: PropTypes.string,
  onStatusUpdate: PropTypes.func,
};
