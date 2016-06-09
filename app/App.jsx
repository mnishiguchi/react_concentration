import React, { PropTypes } from 'react';
import { EventEmitter }     from 'fbemitter';
import NotificationSystem   from 'react-notification-system';
import * as shortid         from 'shortid';
import Time          from './components/Time';
import Score         from './components/Score';
import Board         from './components/Board';
import GameControl   from './components/GameControl';
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
    seconds: 100
  };

  constructor( props ) {
    super( props );
    this.state = {
      isPlaying: false,
      isOnPause: false,
      level:     this.props.level,
      score:     this.props.score,
      seconds:   this.props.seconds,
      data:      [],
      firstCard: null,
      pastScores: []
    };
    this._notificationSystem = null;
  }

  // https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods
  // http://qiita.com/mizchi/items/6a3500e598ec36746509
  componentWillMount() {
    // Create a emitter.
    this.emitter = new EventEmitter;

    // Handle switching on/off the game.
    this.emitter.addListener( 'clickedSwitch', (ev) => {
      if ( ! this.state.isPlaying ) {
        this.start();
      } else {
        this.state.isOnPause ? this.resume() : this.pause();
      }
    });

    // Handle force-reset.
    this.emitter.addListener( 'reset', flippedCard => {
      if (confirm("Resetting the game play. Are you sure?")) {
        this.reset();
      }

    });

    // Handle flipping a card.
    this.emitter.addListener( 'flipped', flippedCard => {
      this.flipCard( flippedCard );
    });
  }

  componentDidMount() {
    // Set up the notification system.
    this._notificationSystem = this.refs.notificationSystem;
    // Initialize the data.
    this.initData();
  }

  componentWillUnmount() {
    this.emitter.removeAllListeners();
  }

  _addNotification( message ) {
    this._notificationSystem.addNotification({
      message: message,
      level:   'success'
    });
  }

  initData() {
    let data  = this.shuffle( this.props.data ).slice( 0, 8 );
    let clone = data.slice( 0 );
    data = data.concat( clone );
    data = this.shuffle( data );

    const initialized = data.map( text => {
      return {
        uuid:      shortid.generate(),
        isFlipped: false,
        isDone:    false,
        text:      text
      };
    });

    this.setState({ data: initialized });
  }

  shuffle( aArray ) {
      let j, x, i;
      for (i = aArray.length; i; i -= 1) {
          j = Math.floor(Math.random() * i);
          x = aArray[i - 1];
          aArray[i - 1] = aArray[j];
          aArray[j] = x;
      }
      return aArray;
  }

  countDown() {
    this.setState({ seconds: this.state.seconds - 1 });

    if ( this.state.seconds === 0 ) {
      this.timeUp();
    }
  }

  start() {
    console.log( 'start' );
    this._addNotification( 'Have fun!' );
    this.reset();
    this.setBackgroundImage();
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
    this.initData();
    this.setState({
      isPlaying: false,
      isOnPause: false,
      level:     this.props.level,
      score:     this.props.score,
      seconds:   this.props.seconds,
      firstCard: null
    });
  }

  startTimer() {
    this.timerId = setInterval( this.countDown.bind( this ), 1000 );
  }

  stopTimer() {
    // If timer id exists, stop the timer.
    if ( this.timerId ) { clearInterval( this.timerId ); }

    // Clear timer id.
    this.timerId = null;
  }

  setBackgroundImage() {
    // Set a random image every time the component is mounted.
    let imageUrls = [
      'http://mnishiguchi.com/images/masatoshi_chinatown_300.png',
      'http://mnishiguchi.com/images/logo_200.png',
      'http://mnishiguchi.com/images/mount_fuji_300_150.png'
    ];
    document.querySelector( '.board' ).style.backgroundImage =
      'url(' + this.shuffle( imageUrls )[0] + ')';
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

    // Pause for .5 sec.
    window.setTimeout( () => {

      // If it is the first card, remember it.
      if ( ! this.state.firstCard ) {
        this.setState({ firstCard: flippedCard });

      } else { // If it is the second card, compare the two cards.
        this.setState({ isOnPause: true }); // Prevent the click.
        this.judgeCards( this.state.firstCard, flippedCard );
      }

      // Update data.
      this.setState({ data: newData, isOnPause: false });

    }, 500 );
  }

  /**
   * @param  {Object} first  Info about the card that contains uuid and text.
   * @param  {Object} second Info about the card that contains uuid and text.
   */
  judgeCards( first, second ) {
    if ( first.text === second.text ) {
      console.log("matching: yes");

      // Add points.
      let points = this.state.seconds;
      this.setState({ score: this.state.score + points });
      this._addNotification( '+' + points );

      // Mark the matching cards as 'done'.
      this.state.data.map( item => {
        if ( item.uuid === first.uuid || item.uuid === second.uuid ) {
          item.isDone = true;
        }

        return item;
      });
    } else {
      // Do nothing if the cards are not matching.
      console.log("matching: no");
    }

    // Clear the first card.
    this.setState({ firstCard: null });

    // Make all the undone cards face down.
    this.state.data.map( item => {
      item.isFlipped = false;
      return item;
    });

    // If the game is won, say Congratulations and stop the game play.
    if ( this.isWon() ) {
      this.resolveGame( 'Congratulations!!! You won. Score: ' + this.state.score );
    }
  }

  resolveGame( message ) {
    this._addNotification( message );
    this.stopTimer();
    this.pushScoreToHistory();
    this.setState({
      isPlaying: false,
      isOnPause: false
    });
  }

  isWon() {
    let congratulations = true;

    // If any undone card exists, the game is not yet won.
    this.state.data.forEach( item => {
      if ( ! item.isDone ) { congratulations = false; }
    });

    return congratulations;
  }

  timeUp() {
    this.resolveGame( 'Time is up! Score: ' + this.state.score );
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

  render() {
    const notificationStyles = {
      NotificationItem: { // Override the notification item
        DefaultStyle: { // Applied to every notification, regardless of the notification level
          zIndex: 10,
          fontSize: '20px',
          background: 'rgba(22, 82, 124, 0.8)',
          color: 'rgb(202,178,161)'
        }
      }
    };
    return (
      <div>
        <NotificationSystem
          ref="notificationSystem"
          style={notificationStyles}
        />
        <section className="game">
          <header>
            <Score score={this.state.score} />
            <Time seconds={this.state.seconds} />
          </header>
          <Board
            data={this.state.data}
            isLocked={!this.state.isPlaying || this.state.isOnPause}
            isPlaying={this.state.isPlaying}
            emitter={this.emitter}
          />
          <GameControl
            isPlaying={this.state.isPlaying}
            isOnPause={this.state.isOnPause}
            level={this.state.level}
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
