import React, { PropTypes } from 'react';

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
const propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  isOnPause:  PropTypes.bool.isRequired,
  emitter:   PropTypes.object.isRequired
};

function GameSwitch({ isPlaying, isOnPause, emitter }) {
  let text = 'Start';

  if ( isPlaying ) {
    text = isOnPause ? 'Resume' : 'Pause';
  }
  return (
    <button
      className="game-switch"
      onClick={e => emitter.emit( 'clickedSwitch' )}>
      {text}
    </button>
  );
};

GameSwitch.propTypes = propTypes;

export default GameSwitch;
