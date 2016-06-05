import React, { PropTypes } from 'react';
import * as shortid from 'shortid';  // Usage: shortid.generate()
import Board      from './components/Board';
import Time       from './components/Time';
import Score      from './components/Score';
import GameSwitch from './components/GameSwitch';

const propTypes = {
  data: PropTypes.array.isRequired
};

const defaultProps = {
  score: 0,
  seconds: 5
};

// https://facebook.github.io/react/docs/reusable-components.html
class App extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      isPlaying: false,
      score:   defaultProps.score,
      seconds: defaultProps.seconds,
      data:    this.initData(),
      pair:    []
    };

    // Bind the methods to this instance.
    // https://github.com/airbnb/javascript/tree/master/react#methods
    this.handleClickSwitch = this.handleClickSwitch.bind( this );
    this.handleClickCard   = this.handleClickCard.bind( this );
    this.countDown         = this.countDown.bind( this );
  }

  initData() {
    return this.props.data.map( text => {
      return {
        uuid:      shortid.generate(),
        isFlipped: false,
        text:      text
      };
    });
  }

  countDown() {
    this.setState({
      seconds: this.state.seconds - 1
    });

    if ( this.state.seconds === 0 ) {
      this.timeUp();
    }
  }

  start() {
    console.log( 'start' );
    this.startTimer();
  }

  pause() {
    console.log( 'pause' );
    this.stopTimer();
  }

  reset() {
    console.log( 'reset' );
    this.pause();
    this.setState({
      isPlaying: false,
      seconds: defaultProps.seconds
    });
  }

  startTimer() {
    this.timerId = setInterval( this.countDown, 1000 );
  }

  stopTimer() {
    clearInterval( this.timerId );
    this.timerId = null;
  }

  timeUp() {
    console.log( 'Time is up!' );
    this.reset();
  }

  clearScore() {
    this.setState({
      score: 0
    });
  }

  handleClickSwitch( ev ) {

    if ( this.state.isPlaying ) {
      this.pause();

    } else { // If not playing
      this.start();
    }

    this.setState({
      isPlaying: ! this.state.isPlaying
    });
  }

  handleClickCard( uuid ) {
    // Flip the card.
    const newData = this.state.data.map( (item) => {
      if ( item.uuid === uuid ) {
        item.isFlipped = true;
      }
      return item;
    });

    this.setState({
      data: newData
    });
  }

  isMatchedPair( ev ) {
    return false; // TODO;
  }

  isTwoCardsFlipped( ev ) {
    return this.state.pair.length < 1;
  }

  render() {
    return (
      <div>
        <h1>React concentration app</h1>
        <header>
          <GameSwitch
            isPlaying={ this.state.isPlaying }
            handleClickSwitch={ this.handleClickSwitch }
          />
          <Score score={ this.state.score } />
          <Time seconds={ this.state.seconds } />
        </header>
        <Board
          data={ this.state.data }
          handleClickCard={ this.handleClickCard }/>
      </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
