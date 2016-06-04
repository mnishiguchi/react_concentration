import React, { PropTypes } from 'react';

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
const propTypes = {
  time: PropTypes.number.isRequired,
};

export const Time = props => {
  const time = props.time;
  return (
    <div className="time">
      { time }
    </div>
  );
};

Time.propTypes = propTypes;

export default Time;
