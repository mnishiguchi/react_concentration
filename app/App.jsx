import React, { PropTypes } from 'react';
import { EventEmitter }     from 'fbemitter';
import * as shortid from 'shortid';
import Board        from './components/Board';
import Time         from './components/Time';
import Score        from './components/Score';
import GameSwitch   from './components/GameSwitch';
import PastScores   from './components/PastScores';

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
      isOnPause: false,
      score:     defaultProps.score,
      seconds:   defaultProps.seconds,
      data:      this.initData(),
      firstCard: null,
      pastScores: []
    };

    // Bind the methods to this instance.
    this.countDown = this.countDown.bind( this );
  }

  // https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods
  // http://qiita.com/mizchi/items/6a3500e598ec36746509
  componentWillMount() {
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
    this.emitter.addListener( 'flipped', flippedCard => {
      this.flipCard( flippedCard );
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
        isDone:    false,
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
    this.pushScoreToHistory();
    this.reset();
    this.startTimer();
    this.setState({ isPlaying: true });
  }

  pause() {
    console.log( 'pause' );
    this.stopTimer();
    this.setState({ isOnPause: true });
  }

  resume() {
    console.log( 'resume' );
    this.startTimer();
    this.setState({ isOnPause: false });
  }

  reset() {
    console.log( 'reset' );
    this.pause();
    this.setState({
      isPlaying: false,
      isOnPause: false,
      score:     defaultProps.score,
      seconds:   defaultProps.seconds,
      data:      this.initData(),
      firstCard: null
    });
  }

  startTimer() {
    this.timerId = setInterval( this.countDown, 1000 );
  }

  stopTimer() {
    if ( this.timerId ) {
      clearInterval( this.timerId );
    }

    this.timerId = null;
  }

  timeUp() {
    console.log( 'Time is up!' );
    this.stopTimer();
    this.setState({
      isPlaying: false,
      isOnPause: false
    });
  }

  pushScoreToHistory() {
    if ( this.state.pastScores === [] ) return;

    // Duplicate the Array
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
    let scores = this.state.pastScores.slice();
    scores.push([
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
      new Date().toLocaleString(),
      this.state.score ]);
    this.setState({
      score: 0,
      pastScores: scores
    });
  }

  // Flip the card that is specified by uuid.
  flipCard( flippedCard ) {

    // Flip the card.
    const newData = this.state.data.map( item => {
      if ( item.uuid === flippedCard.uuid ) {
        item.isFlipped = true;
      }
      return item;
    });

    // If it is the first card, remember it.
    if ( ! this.state.firstCard ) {
      this.setState({ firstCard: flippedCard });

    } else { // If it is the second card, compare the two cards.
      this.judgeCards( this.state.firstCard, flippedCard );
    }
    // Update data.
    this.setState({ data: newData });
  }

  /**
   * @param  {Object} first  Info about the card that contains uuid and text.
   * @param  {Object} second Info about the card that contains uuid and text.
   */
  judgeCards( first, second ) {
    if ( first.text === second.text ) {
      console.log("areMatchingPair: yes");

      // Add points.
      this.setState({ score: this.state.score + 1 });

      // Mark the matching cards as 'done'.
      this.state.data.map( item => {
        if ( item.uuid === first.uuid || item.uuid === second.uuid ) {
          item.isDone = true;
        }

        return item;
      });
    } else {
      // Do nothing if the cards are not matching.
      console.log("areMatchingPair: no");
    }

    // Clear the first card.
    this.setState({ firstCard: null });

    // Make all the undone cards face down.
    this.state.data.map( item => {
      item.isFlipped = false;
      return item;
    });
  }

  render() {
    return (
      <div>
        <h1>Concentration</h1>
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
          isLocked={!this.state.isPlaying || this.state.isOnPause}
          emitter={this.emitter} />
        <PastScores pastScores={this.state.pastScores} />
      </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
