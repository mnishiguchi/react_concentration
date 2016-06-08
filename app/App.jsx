import React, { PropTypes } from 'react';
import { EventEmitter }     from 'fbemitter';
import * as shortid  from 'shortid';
import Time          from './components/Time';
import Score         from './components/Score';
import Board         from './components/Board';
import GameControl   from './components/GameControl';
import LevelSelector from './components/LevelSelector';
import PastScores    from './components/PastScores';

class App extends React.Component {

  static propTypes = {
    data:    PropTypes.array.isRequired,
    score:   PropTypes.number,
    seconds: PropTypes.number
  };

  static defaultProps = {
    level:   1,
    score:   0,
    seconds: 30
  };

  constructor( props ) {
    super( props );
    this.state = {
      isPlaying: false,
      isOnPause: false,
      level:     this.props.level,
      score:     this.props.score,
      seconds:   this.props.seconds,
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

    // Handle setting the level.
    this.emitter.addListener( 'selectedLevel', level => {
      if ( ! this.state.isPlaying ) {
        console.log(level);
        this.setDifficulty( level );
      }
    });

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

  componentDidMount() {
    // Set a random image every time the component is mounted.
    let imageUrls = [
      'http://mnishiguchi.com/images/masatoshi_chinatown_300.png',
      'http://mnishiguchi.com/images/logo_200.png',
      'http://mnishiguchi.com/images/mount_fuji_300_150.png'
    ];
    document.querySelector( '.board' ).style.backgroundImage =
      'url(' + this.shuffle( imageUrls )[0] + ')';
  }

  componentWillUnmount() {
    this.emitter.removeAllListeners();
  }

  initData() {
    let data  = this.shuffle( this.props.data ).slice( 0, 8 );
    let clone = data.slice( 0 );
    data = data.concat( clone );
    data = this.shuffle( data );

    return data.map( text => {
      return {
        uuid:      shortid.generate(),
        isFlipped: false,
        isDone:    false,
        text:      text
      };
    });
  }

  shuffle(a) {
      var j, x, i;
      for (i = a.length; i; i -= 1) {
          j = Math.floor(Math.random() * i);
          x = a[i - 1];
          a[i - 1] = a[j];
          a[j] = x;
      }
      return a;
  }

  countDown() {
    this.setState({ seconds: this.state.seconds - 1 });

    if ( this.state.seconds === 0 ) {
      this.timeUp();
    }
  }

  setDifficulty( level ) {
    switch( level ) {
      case 1:
        this.setState({ level: level, seconds: 30 });
        return;
      case 2:
        this.setState({ level: level, seconds: 20 });
        return;
      case 3:
        this.setState({ level: level, seconds: 10 });
        return;
      default:
        this.setState({ level: level, seconds: 30 });
    }
  }

  start() {
    console.log( 'start' );
    this.reset();
    if ( this.state.seconds === 0 ) { this.setDifficulty( this.state.level ); }
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
      score:     0,
      data:      this.initData(),
      firstCard: null
    });
  }

  startTimer() {
    this.timerId = setInterval( this.countDown, 1000 );
  }

  stopTimer() {
    // If timer id exists, stop the timer.
    if ( this.timerId ) { clearInterval( this.timerId ); }

    // Clear timer id.
    this.timerId = null;
  }

  timeUp() {
    console.log( 'Time is up!' );
    this.stopTimer();
    this.pushScoreToHistory();
    this.setState({
      isPlaying: false,
      isOnPause: false
    });
  }

  pushScoreToHistory() {
    // ES2015 array destructor.
    let scores = [ ...this.state.pastScores ];
    scores.unshift([
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
      new Date().toLocaleString(),
      this.state.score
    ]);
    this.setState({ pastScores: scores });
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

    // Update data.
    this.setState({ data: newData });

    // Pause for 1 sec.
    window.setTimeout( function() {

      // If it is the first card, remember it.
      if ( ! this.state.firstCard ) {
        this.setState({ firstCard: flippedCard });

      } else { // If it is the second card, compare the two cards.
        this.judgeCards( this.state.firstCard, flippedCard );
      }

      // Update data.
      this.setState({ data: newData });

    }.bind( this ), 1000 );
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
        <section className="game">
          <header>
            <Score score={this.state.score} />
            <Time seconds={this.state.seconds} />
          </header>
          <Board
            data={this.state.data}
            isLocked={!this.state.isPlaying || this.state.isOnPause}
            emitter={this.emitter}
          />
          <GameControl
            isPlaying={this.state.isPlaying}
            isOnPause={this.state.isOnPause}
            emitter={this.emitter}
          />
        </section>
        <aside>
          <PastScores pastScores={this.state.pastScores} />
        </aside>
      </div>
    );
  }
}

export default App;