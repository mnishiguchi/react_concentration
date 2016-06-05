import React, { PropTypes } from 'react';
import Card from './Card';

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
const propTypes = {
  data: PropTypes.array.isRequired,
  handleClickCard: PropTypes.func.isRequired
};

const Board = props => {
  return (
    <div className="board">
      {
        props.data.map( (item) =>
          <Card
            key={ item.uuid }
            uuid={ item.uuid }
            text={ item.text }
            isFlipped={ item.isFlipped }
            handleClickCard={ props.handleClickCard }
          />
        )
      }
    </div>
  );
};

Board.propTypes = propTypes;

export default Board;
