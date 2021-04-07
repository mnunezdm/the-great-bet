import React, { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';

import { Icon } from '@mdi/react';
import { mdiAlertOctagon } from '@mdi/js';

import { Spinner } from 'react-bootstrap';

import { Milestone } from '../models/milestone';

export const Burndown = () => {
  const [syncError, setSyncError] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [options, setOptions] = useState(null);

  const refreshMilestones = async () => {
    setData(null);
    setLoading(true);
    return await Milestone.getMilestones();
  };

  const initializeChart = (milestones) => {
    milestones.pop();

    const separate = (title, max) => {
      const last = (list) => list[list.length - 1];
      const merge = (first, last) => `${first} ${last}`;

      const splitted = title.split(' ');
      const result = [splitted.shift()];

      splitted.forEach((word) => {
        merge(last(result), word).length > max
          ? result.push(word)
          : (result[result.length - 1] = merge(last(result), word));
      });

      return result;
    };

    setOptions({
      scales: {
        scaleLabel: {
          fontColor: '#FFF',
        },
        yAxes: [
          {
            gridLines: {
              color: '#777',
            },
            ticks: {
              fontColor: '#FFF',
              callback: (_, index) => separate(milestones[index].title, 20),
            },
          },
        ],
        xAxes: [
          {
            type: 'time',
            time: {
              stepSize: 15,
              unit: 'day',
              parser: 'YYYY-MM-DDTHH:mm:ss.sssZ',
            },
            gridLines: {
              color: '#777',
            },
            ticks: {
              fontColor: '#FFF',
            },
          },
        ],
      },
    });

    const paces = milestones
      .filter((milestone) => milestone.isCompleted || milestone.isInProgress)
      .map(
        (milestone) =>
          milestone.completedDate?.getTime() || new Date().getTime()
      )
      .map((time, index, list) => (index === 0 ? null : time - list[index - 1]))
      .filter((deltas) => deltas);

    const averagePace =
      paces.reduce((previous, current) => current + previous, 0) / paces.length;

    const actuals = milestones
      .filter((milestone) => milestone.isCompleted)
      .map((milestone) => ({
        x: milestone.completedDate.toISOString(),
        y: milestones.length - milestone.id,
      }));

    const expected = [
      actuals[actuals.length - 1],
      ...milestones
        .filter((milestone) => !milestone.isCompleted)
        .map((milestone, index) => ({
          x: new Date().getTime() + index * averagePace,
          y: milestones.length - milestone.id,
        })),
    ];

    setData({
      datasets: [
        {
          label: 'Ideal',
          borderColor: '#6C8893',
          lineTension: 0,
          borderDash: [5, 5],
          fill: false,
          data: [
            { x: new Date('01/28/2021').toISOString(), y: 8 },
            { x: new Date('09/15/2021').toISOString(), y: 0 },
          ],
          order: 2,
        },
        {
          label: 'Actual',
          borderColor: '#FF6961',
          fill: false,
          steppedLine: true,
          data: actuals,
          order: 0,
        },
        {
          label: 'Expected',
          borderColor: '#FF6961',
          fill: false,
          steppedLine: true,
          lineTension: 0,
          borderDash: [5, 5],
          data: expected,
          order: 1,
        },
      ],
    });
  };

  useEffect(() => {
    refreshMilestones()
      .then((milestones) => initializeChart(milestones))
      .catch((error) => setSyncError(error.message))
      .finally(() => setLoading(false));
  }, []);

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
      {data && <Line data={data} options={options} />}
    </>
  );
};
