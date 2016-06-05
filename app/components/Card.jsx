import React, { PropTypes } from 'react';

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
const propTypes = {
  uuid: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isFlipped: PropTypes.bool.isRequired,
  handleClickCard: PropTypes.func.isRequired
};

class Card extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
    };

    // Bind the methods to this instance.
    // https://github.com/airbnb/javascript/tree/master/react#methods
    this.handleClickCard = this.props.handleClickCard.bind( this );
  }
  render() {
    const uuid = this.props.uuid;
    return (
      <div
        className="card"
        onClick={ () => this.handleClickCard( uuid ) } >
        { this.props.isFlipped ? this.props.text : '?' }
      </div>
    )
  }
};

Card.propTypes = propTypes;

export default Card;
