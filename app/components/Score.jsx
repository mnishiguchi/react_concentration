import React, { PropTypes } from 'react';
import { Icon } from 'react-fa'
import * as Utils from '../utils';

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
const propTypes = {
  score: PropTypes.number.isRequired,
};

function Score({ score }) {
  return (
    <div className="score">
      <Icon name="smile-o" />
      <span className="number">{Utils.pad(score, 4)}</span>
    </div>
  );
};

Score.propTypes = propTypes;

export default Score;
