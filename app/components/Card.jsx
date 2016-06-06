import React, { PropTypes } from 'react';

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
const propTypes = {
  uuid: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isFlipped: PropTypes.bool.isRequired,
  isDone: PropTypes.bool.isRequired,
  emitter: PropTypes.object.isRequired
};

function Card({ uuid, text, isFlipped, isDone, emitter }) {
  return (
    <div
      className="card"
      onClick={e => emitter.emit( 'flipped', { uuid, text } )}>
      {isFlipped || isDone ? text : '?'}
    </div>
  )
};

Card.propTypes = propTypes;

export default Card;
