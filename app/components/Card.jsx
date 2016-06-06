import React, { PropTypes } from 'react';

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
const propTypes = {
  uuid: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isFlipped: PropTypes.bool.isRequired,
  isDone: PropTypes.bool.isRequired,
  isLocked: PropTypes.bool.isRequired,
  emitter: PropTypes.object.isRequired
};

function Card({ uuid, text, isFlipped, isDone, isLocked, emitter }) {
  // Only when board is not locked, emit the flipped event.
  const clickHandler = (isLocked)
                     ? e => alert( "Please click the start button to start the game." )
                     : e => emitter.emit( 'flipped', { uuid, text } )
                     ;
  return (
    <div
      className="card"
      onClick={clickHandler}>
      {isFlipped || isDone ? text : '?'}
    </div>
  )
};

Card.propTypes = propTypes;

export default Card;
