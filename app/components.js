import React from 'react';

/**
 * props: isStarted, text, handleClickGameSwitch
 */
export const GameSwitch = props => {
  const handleClickGameSwitch = props.handleClickGameSwitch;
  const isStarted = props.isStarted;
  const text = isStarted ? "Pause" : "Start";
  return (
    <button
      className="game-switch"
      onClick={ handleClickGameSwitch }>
      { text }
    </button>
  );
};

/**
 * props: score, handleTimeUp
 */
export const Score = props => {
  const score = props.score;
  return (
    <div className="score">
      { score }
    </div>
  );
};

/**
 * props: time
 */
export const Time = props => {
  const time = props.time;
  return (
    <div className="time">
      { time }
    </div>
  );
};

/**
 * props: content
 */
export const Card = props => {
  const content = props.content;
  return (
    <div className="card">
      { content }
    </div>
  );
};

/**
 * props: data
 */
export const Board = props => {
  const data = props.data;
  return (
    <div className="board">
      {
        data.map( (content, i) => <Card key={ i } content={ content } /> )
      }
    </div>
  );
};
