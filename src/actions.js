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

export function updateBoard (position) {
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
  xIsNext: true
};

export const ticTac = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_STEP':
      return {
        ...state,
        stepNumber: state.stepNumber + 1
      };
    case 'TOGGLE_PLAYER':
      return {
        ...state,
        xIsNext: !state.xIsNext
      };
    case 'UPDATE_BOARD':
      const oldBoard = [...state.history[state.history.length - 1].board];
      oldBoard[action.position] = state.xIsNext ? 'X' : 'O';
      return {
        ...state,
        history: [...state.history, { board: oldBoard }]
      };
    default:
      return state;
  }
};
