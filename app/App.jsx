import React, { PropTypes } from 'react';
import { EventEmitter }     from 'fbemitter';
import * as shortid from 'shortid';
import Board        from './components/Board';
import Time         from './components/Time';
import Score        from './components/Score';
import GameSwitch   from './components/GameSwitch';

const propTypes = {
  data:    PropTypes.array.isRequired,
  score:   PropTypes.number,
  seconds: PropTypes.number
};

const defaultProps = {
  score:   0,
  seconds: 5
};

// https://facebook.github.io/react/docs/reusable-components.html
class App extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      isPlaying: false,
      isOnPause:  false,
      score:     defaultProps.score,
      seconds:   defaultProps.seconds,
      data:      this.initData(),
      pair:      []
    };

    // Bind the methods to this instance.
    this.countDown = this.countDown.bind( this );
  }

  // https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods
  // http://qiita.com/mmmpa/items/89a8886a1e9c8df477d7
  // http://qiita.com/mizchi/items/6a3500e598ec36746509
  componentWillMount() {
    console.log('componentWillMount');

    // Create a emitter.
    this.emitter = new EventEmitter;

    // Handle switching on/off the game.
    this.emitter.addListener( 'clickedSwitch', () => {
      if ( ! this.state.isPlaying ) {
        this.start();
      } else {
        this.state.isOnPause ? this.resume() : this.pause();
      }
    });

    // Handle flipping a card.
    this.emitter.addListener( 'flipped', uuid => {
      this.flipCard( uuid );
    });
  }

  componentWillUnmount() {
    this.emitter.removeAllListeners();
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
    this.setState({ seconds: this.state.seconds - 1 });

    if ( this.state.seconds === 0 ) {
      this.timeUp();
    }
  }

  start() {
    console.log( 'start' );
    this.startTimer();
    this.setState({
      isPlaying: true
    });
  }

  pause() {
    console.log( 'pause' );
    this.stopTimer();
    this.setState({
      isOnPause: true
    });
  }

  resume() {
    console.log( 'resume' );
    this.startTimer();
    this.setState({
      isOnPause: false
    });
  }

  reset() {
    console.log( 'reset' );
    this.pause();
    this.setState({
      isPlaying: false,
      isOnPause: false,
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
    this.setState({ score: 0 });
  }

  // Flip the card that is specified by uuid.
  flipCard( uuid ) {
    const newData = this.state.data.map( item => {
      if ( item.uuid === uuid ) { item.isFlipped = true; }
      return item;
    });

    this.setState({ data: newData });
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
            isPlaying={this.state.isPlaying}
            isOnPause={this.state.isOnPause}
            emitter={this.emitter}
          />
          <Score score={this.state.score} />
          <Time seconds={this.state.seconds} />
        </header>
        <Board
          data={this.state.data}
          emitter={this.emitter} />
      </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
