import React, { PropTypes } from 'react';
import classNames from 'classNames';

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
const propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  isOnPause: PropTypes.bool.isRequired,
  level:     PropTypes.number.isRequired,
  emitter:   PropTypes.object.isRequired
};

function GameControl({ isPlaying, isOnPause, level, emitter }) {
  let text = 'Start';

  if ( isPlaying ) {
    text = isOnPause ? 'Resume' : 'Pause';
  }
  const gameSwitchClasses = classNames( "game-switch", {
    "start": text === 'Start',
    "resume": text === 'Resume',
    "pause": text === 'Pause'
   });
  return (
    <div className="game-control">
      <div className="game-control-buttons">
        <button
          className="game-reset"
          onClick={e => emitter.emit( 'reset' )}>
          Reset
        </button>
        <button
          className={gameSwitchClasses}
          onClick={e => emitter.emit( 'clickedSwitch' )}>
          {text}
        </button>
      </div>
    </div>
  );
};

GameControl.propTypes = propTypes;

export default GameControl;
