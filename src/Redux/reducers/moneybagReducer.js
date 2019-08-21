const INITIAL_STATE = {
  hidden: true,
  moneybag: 0
};

//ACTION TYPES
const SELECT_MONEYBAG = "SELECT_MONEYBAG";
const ADD_TASK_COINS = "ADD_TASK_COINS";

//ACTION CREATOR
export function selectMoneybag() {
  return {
    type: SELECT_MONEYBAG,
    payload: null
  };
}
export function addTaskCoins() {
  return {
    type: ADD_TASK_COINS,
    payload: 5
  };
}

// REDUCER
export default function moneybagReducer(state = INITIAL_STATE, action) {
  let { type, payload } = action;
  console.log(action);
  switch (type) {
    case SELECT_MONEYBAG:
      return {
        ...state,
        hidden: !state.hidden
      };
    case ADD_TASK_COINS:
      return {
        ...state,
        moneybag: state.moneybag + payload
      };
    default:
      return state;
  }
}
