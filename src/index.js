import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import './index.css';
import {
  togglePlayer,
  incrementStep,
  updateBoard,
  ticTac
} from './actions.js';

function Square (props) {
  return (
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare (i) {
    const currentBoard = this.props.squares;
    const position = currentBoard[i];
    return (
      <Square
        value={position}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render () {
    return (
      <div>
        <div className='board-row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='board-row'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='board-row'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (i) {
    store.dispatch(updateBoard(i));
    store.dispatch(togglePlayer());
    store.dispatch(incrementStep());
  }
  render () {
    const history = this.props.history.slice(0, this.props.stepNumber + 1);
    const board = history[history.length - 1].board;
    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            squares={board}
            onClick={i => this.handleClick(i)}
          />
        </div>
      </div>
    );
  }
}

const store = createStore(ticTac);
const render = () => {
  const { history, xIsNext, stepNumber } = store.getState();
  ReactDOM.render(
    <Game
      history={history}
      xIsNext={xIsNext}
      stepNumber={stepNumber} />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();

Game.propTypes = {
  history: PropTypes.array,
  stepNumber: PropTypes.number
};

Square.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
};

Board.propTypes = {
  onClick: PropTypes.func,
  squares: PropTypes.array
};
