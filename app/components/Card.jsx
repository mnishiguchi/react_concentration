import React, { PropTypes } from 'react';
import classNames from 'classNames';
import { Icon }   from 'react-fa';

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
                      ? ''
                      : e => emitter.emit( 'flipped', {
                                uuid: uuid,
                                text: text
                              });
  const cardClasses = classNames({ flipped: isFlipped || isDone, done: isDone });
  return (
    <section className="card-holder">
      <div
        id="card"
        className={cardClasses}
        onClick={clickHandler}>
        <figure className="front">?</figure>
        <figure className="back">
          <Icon name={text} />
        </figure>
      </div>
    </section>
  )
};

Card.propTypes = propTypes;

export default Card;
