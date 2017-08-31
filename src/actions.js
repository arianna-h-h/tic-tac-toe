export function togglePlayer () {
  return {
    type: 'TOGGLE_PLAYER'
  };
}

export function incrementStep () {
  return {
    type: 'INCREMENT_STEP'
  };
}

export function updateBoard (position) { //i in handleClick?
  return {
    type: 'UPDATE_BOARD',
    position
  };
}

const initialState = {
  history: [{
    board: Array(9).fill(null)
  }],
  stepNumber: 0,
  xIsNext: true,
};

// action = {
//   type: 'UPDATE_BOARD',
//   position: 0,
// }

export const ticTac = (state = initialState, action) => { //reducer
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
        const position = action.position;
        const currentPlayer = state.xIsNext ? 'X' : 'O';
        const oldBoard = state.history[state.history.length - 1].board.slice();
        oldBoard[position] = currentPlayer;
        const newBoard = oldBoard;
        const newHistory = state.history.concat([{ board: newBoard }]);

        return {
          ...state,
          history: newHistory
      }
    default:
      return state;
  }
}
