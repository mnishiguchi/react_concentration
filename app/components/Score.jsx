import React, { PropTypes } from 'react';

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
const propTypes = {
  score: PropTypes.number.isRequired,
};

const Score = props => {
  return (
    <div className="score">
      { props.score }
    </div>
  );
};

Score.propTypes = propTypes;

export default Score;
