import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
// import { connect } from 'react-redux';
import './index.css';
import {
  togglePlayer,
  incrementStep,
  updateBoard,
  ticTac
} from './actions.js';

function Square(props) { // all squares are rendered b4 here
    console.log('top of square function')
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
      {console.log('inside square button' + props.onClick)}
      {/* determines value of button */}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    {console.log('at render square')}
    const currentBoard = this.props.squares;
    const position = currentBoard[i]; // => 'X' || 'O' || null
    return (
      <Square
        value={position} // determines x or O
        onClick={() => this.props.onClick(i)} // handleClick in Game
      />
    );
  }

  render() { //happens before render square
      {console.log('at render in board')}
    return (
      <div>
        <div className="board-row">
          {console.log('before br 0')}
          {this.renderSquare(0)}
          {console.log('after br 0')}
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
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) { //passing correctly
    console.log('at handleClick'); //only when something is clicked
    store.dispatch(updateBoard(i))
    store.dispatch(togglePlayer()) //switch player when clicked
    store.dispatch(incrementStep())
    //action dispatch
  }
  render() { //render happens before a click
    const history = this.props.history.slice(0, this.props.stepNumber + 1); //returns a copy for no mutation
    console.log("History: ", history);
    const board = history[history.length - 1].board; //makes a copy of last board
    //const { board } = current;
    console.log(board);
    return (
      <div className="game">
        <div className="game-board">
                 <Board
                  squares={board} //curent board (state in history)
                  onClick={i => this.handleClick(i)} // position props
                />
            </div>
      </div>
    );
  }
}

const store = createStore(ticTac);

//fun activity: console.log state inside of render
const render = () => {
  const { history, xIsNext, stepNumber } = store.getState();
  ReactDOM.render(
  <Game
    history={history}
    xIsNext={xIsNext}
    stepNumber={stepNumber} />,
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
