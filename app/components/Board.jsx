import React, { PropTypes } from 'react';
import Card from './Card';
import classNames from 'classNames';

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
const propTypes = {
  data: PropTypes.array.isRequired,
  isLocked: PropTypes.bool.isRequired,
  emitter: PropTypes.object.isRequired
};

function Board({ data, isLocked, emitter }) {
  const overlayClasses = classNames( "overlay", { locked: isLocked } );

  return (
    <div className="board">
      <div className={overlayClasses}></div>
      {
        data.map( item =>
          <Card
            key={item.uuid}
            uuid={item.uuid}
            text={item.text}
            isFlipped={item.isFlipped}
            isDone={item.isDone}
            isLocked={isLocked}
            emitter={emitter}
          />
        )
      }
    </div>
  );
};

Board.propTypes = propTypes;

export default Board;
