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
      this.state.isPlaying ? this.pause() : this.start();
      this.setState({ isPlaying: ! this.state.isPlaying });
    });

    // Handle flipping a card.
    this.emitter.addListener( 'flipped', uuid => {
      const newData = this.state.data.map( item => {
        // Flip the card that is specified by uuid.
        if ( item.uuid === uuid ) { item.isFlipped = true; }
        return item;
      });

      this.setState({ data: newData });
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
    this.setState({ score: 0 });
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
