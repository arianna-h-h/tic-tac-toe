

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
