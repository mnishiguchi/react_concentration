import React, { PropTypes } from 'react';
import { Icon } from 'react-fa';
import * as Utils from '../utils';

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
const propTypes = {
  seconds: PropTypes.number.isRequired,
};

function Time({ seconds }) {
  return (
    <div className="time">
      <Icon name="clock-o" />
      <span className="number">{Utils.pad(seconds, 4)}</span>
    </div>
  );
};

Time.propTypes = propTypes;

export default Time;
