import React, { PropTypes } from 'react';

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
const propTypes = {
  isStarted: PropTypes.bool.isRequired,
  handleClickGameSwitch: PropTypes.func.isRequired,
};

export const GameSwitch = props => {
  const handleClickGameSwitch = props.handleClickGameSwitch;
  const isStarted = props.isStarted;
  const text = isStarted ? "Pause" : "Start";
  return (
    <button
      className="game-switch"
      onClick={ handleClickGameSwitch }>
      { text }
    </button>
  );
};

GameSwitch.propTypes = propTypes;

export default GameSwitch;
