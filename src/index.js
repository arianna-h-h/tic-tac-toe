import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import './index.css';
import {
  togglePlayer,
  incrementStep,
  updateBoard
} from './actions.js';

const ticTac = (state = initialState, action) => { //reducer
  switch (action.type) {
    case 'INCREMENT_STEP':
      return {
        ...state,
        stepNumber: state.stepNumber + 1
      }
      case 'TOGGLE_PLAYER':
        return {
          ...state,
          xIsNext: !state.xIsNext
        }
      case 'UPDATE_BOARD':
        return {
          ...state,
          history: state.history.concat([state.currentBoard])
      }
    default:
      return state;
  }
}

const store = createStore(ticTac);

const initialState = {
  history: [{
    currentBoard: Array(9).fill(null)
  }],
  stepNumber: 0,
  xIsNext: true,
};

store.dispatch(togglePlayer())
store.dispatch(updateBoard(2))



class Game extends React.Component {
  handleClick(i) {
    return (
    store.dispatch(updateBoard(i))
  )
    //action dispatch
  }
  render() {
    return (
        <div className="game-board">
          <div>Hello World</div>
          {console.log(this.props.value)}
                 {/* <Board
                  // props
                  onClick={i => this.handleClick(i)} // props
                /> */}
            </div>
    );
  }
  }
/*
  function Square(props) {
    // onClick="handleClick" -->
    return ( // css class, passing in function to be used
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }


  class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]} // props to square
        onClickSquare={() => this.props.onClick(i)} // props
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
*/

const render = () => {
  ReactDOM.render(
  <Game value={store.getState()} />,
  document.getElementById('root')
  );
}

store.subscribe(render);
render();



/* function Square(props) {
  // onClick="handleClick" -->
  return ( // css class, passing in function to be used
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]} // props to square
        onClick={() => this.props.onClick(i)} // props
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => { // step is currVal, move is index
      const desc = move ? // 0 is falsey
      `Move #  ${move}` :
        'Game start';
      return (
        <li key ={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>
            {desc}</a>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${(this.state.xIsNext ? 'X' : 'O')}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares} // props
            onClick={i => this.handleClick(i)} // props
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root'),
); */
