import React from 'react';
import * as shortid from 'shortid';  // Usage: shortid.generate()
import Board      from './components/Board';
import Time       from './components/Time';
import Score      from './components/Score';
import GameSwitch from './components/GameSwitch';

// https://facebook.github.io/react/docs/reusable-components.html
export default class App extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      isStarted: false,
      score: 0,
      time:  0,
      data:  props.data,
      pair:  []
    };

    // Bind the methods to this instance.
    this.handleClickGameSwitch = this.handleClickGameSwitch.bind( this );
    this.isMatchedPair         = this.isMatchedPair.bind( this );
    this.isTwoCardsFlipped     = this.isTwoCardsFlipped.bind( this );
    this.handleTimeUp          = this.handleTimeUp.bind( this );
  }
  handleClickGameSwitch( ev ) {
    console.log(ev);
    this.setState({
      isStarted: ! this.state.isStarted
    });
  };
  isMatchedPair( ev ) {
    return false; // TODO;
  };
  isTwoCardsFlipped( ev ) {
    return this.state.pair.length < 1;
  };
  handleTimeUp( ev ) {
    alert( "Time up!" );
    this.setState({
      isStarted: false
    });
  };
  render() {
    return (
      <div>
        <h1>React concentration app</h1>
        <header>
          <GameSwitch
            isStarted={ this.state.isStarted }
            handleClickGameSwitch={ this.handleClickGameSwitch } />
          <Score score={ this.state.score } />
          <Time time={ this.state.time } />
        </header>
        <Board data={ this.state.data } />
      </div>
    );
  }
}
