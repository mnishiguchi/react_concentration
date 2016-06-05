import React, { PropTypes } from 'react';

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
const propTypes = {
  seconds: PropTypes.number.isRequired,
};

const Time = props => {
  return (
    <div className="time">
      { props.seconds }
    </div>
  );
};

Time.propTypes = propTypes;

export default Time;
