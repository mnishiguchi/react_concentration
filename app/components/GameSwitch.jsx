import React, { PropTypes } from 'react';

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
const propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  handleClickSwitch: PropTypes.func.isRequired,
};

const GameSwitch = props => {
  return (
    <button
      className="game-switch"
      onClick={ props.handleClickSwitch }>
      { props.isPlaying ? 'Pause' : 'Start' }
    </button>
  );
};

GameSwitch.propTypes = propTypes;

export default GameSwitch;
