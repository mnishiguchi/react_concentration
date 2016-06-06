import React, { PropTypes } from 'react';
import Card from './Card';

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
const propTypes = {
  data: PropTypes.array.isRequired,
  isLocked: PropTypes.bool.isRequired,
  emitter: PropTypes.object.isRequired
};

function Board({ data, isLocked, emitter }) {
  return (
    <div className="board">
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
