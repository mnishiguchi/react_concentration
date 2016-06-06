import React, { PropTypes } from 'react';

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
const propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  isOnPause:  PropTypes.bool.isRequired,
  emitter:   PropTypes.object.isRequired
};

function GameControl({ isPlaying, isOnPause, emitter }) {
  let text = 'Start';

  if ( isPlaying ) {
    text = isOnPause ? 'Resume' : 'Pause';
  }
  return (
    <div className="game-control">

      <div className="level-selector">
        <label>Level:
          <select onChange={e => emitter.emit( 'selectedLevel', parseInt(e.target.value) )} >
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
          </select>
        </label>
      </div>
      <button
        className="game-switch"
        onClick={e => emitter.emit( 'clickedSwitch' )}>
        {text}
      </button>
    </div>

  );
};

GameControl.propTypes = propTypes;

export default GameControl;
