import React, { PropTypes } from 'react';
import * as shortid from 'shortid';  // Usage: shortid.generate()
import Board      from './components/Board';
import Time       from './components/Time';
import Score      from './components/Score';
import GameSwitch from './components/GameSwitch';

const propTypes = {
  data: PropTypes.array.isRequired
};

// https://facebook.github.io/react/docs/reusable-components.html
class App extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      isPlaying: false,
      score: 0,
      seconds: 5,
      data:  props.data,
      pair:  []
    };

    // Bind the methods to this instance.
    // https://github.com/airbnb/javascript/tree/master/react#methods
    this.handleClickSwitch = this.handleClickSwitch.bind( this );
    this.countDown         = this.countDown.bind( this );
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
    this.timerId = setInterval( this.countDown, 1000 );
  }
  pause() {
    console.log( 'pause' );
    this.stopTimer();
  }
  reset() {
    console.log( 'reset' );
    this.stopTimer();
  }
  stopTimer() {
    clearInterval( this.timerId );
    this.timerId = null;
  }
  timeUp() {
    console.log( 'Time is up!' );
    this.pause();
    this.setState({
      isPlaying: false
    });
  }
  handleClickSwitch( ev ) {

    // If the date is currently playing
    if ( this.state.isPlaying ) {
      // Stop the seconds
      this.pause();

    } else { // If not playing
      // Start the seconds
      this.start();
    }

    this.setState({
      isPlaying: ! this.state.isPlaying
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
        <Board data={ this.state.data } />
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
