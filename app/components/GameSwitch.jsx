import React, { PropTypes } from 'react';

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
const propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  handleClickSwitch: PropTypes.func.isRequired,
};

export const GameSwitch = props => {
  const handleClickSwitch = props.handleClickSwitch;
  const isPlaying = props.isPlaying;
  const text = isPlaying ? 'Pause' : 'Start';
  return (
    <button
      className="game-switch"
      onClick={ handleClickSwitch }>
      { text }
    </button>
  );
};

GameSwitch.propTypes = propTypes;

export default GameSwitch;
