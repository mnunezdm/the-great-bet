import React from 'react';
import _Countdown from 'react-countdown';

import './countdown.css';

export const Countdown = () => {
  const renderer = (data) => {
    const Completionist = () => <span>Almost!</span>;

    if (data.completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      const partPrint = (partName) =>
        data[partName] && (
          <div className={partName}>
            <span className="value">{data[partName]}</span> {partName}
          </div>
        );

      return (
        <div className="countdown">
          {[
            partPrint('days'),
            partPrint('hours'),
            partPrint('minutes'),
            partPrint('seconds'),
          ].filter((e) => e)}
        </div>
      );
    }
  };

  return <_Countdown date={new Date('2021-09-15')} renderer={renderer} />;
};
