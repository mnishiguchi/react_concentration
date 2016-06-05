import React, { PropTypes } from 'react';

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
const propTypes = {
  seconds: PropTypes.number.isRequired,
};

function Time({ seconds }) {
  return (
    <div className="time">
      {seconds}
    </div>
  );
};

Time.propTypes = propTypes;

export default Time;
