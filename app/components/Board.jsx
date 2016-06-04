import React, { PropTypes } from 'react';
import Card from './Card';

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
const propTypes = {
  data: PropTypes.array.isRequired,
};

export const Board = props => {
  const data = props.data;
  return (
    <div className="board">
      {
        data.map( (content, i) => <Card key={ i } content={ content } /> )
      }
    </div>
  );
};

Board.propTypes = propTypes;

export default Board;
