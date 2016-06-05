import React, { PropTypes } from 'react';

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
const propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  emitter: PropTypes.object.isRequired
};

function GameSwitch({ isPlaying, emitter }) {
  return (
    <button
      className="game-switch"
      onClick={e => emitter.emit( 'clickedSwitch' )}>
      {isPlaying ? 'Pause' : 'Start'}
    </button>
  );
};

GameSwitch.propTypes = propTypes;

export default GameSwitch;
