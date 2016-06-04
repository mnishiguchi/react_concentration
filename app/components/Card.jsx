import React, { PropTypes } from 'react';

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
const propTypes = {
  content: PropTypes.string.isRequired,
};

export const Card = props => {
  const content = props.content;
  return (
    <div className="card">
      { content }
    </div>
  );
};

Card.propTypes = propTypes;

export default Card;
