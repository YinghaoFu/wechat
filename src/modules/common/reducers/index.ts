import ActionTypes from "../constants/actionTypes";
import * as SI from "seamless-immutable";

const CommonState = SI.from({
  name: "COMMON",
  config: null,
  user: null
});

let commonReducer = (state = CommonState, action) => {
  switch (action.type) {
    case ActionTypes.COMMON_SAY_HELLO:
      return state.merge(action, { deep: true });

    default:
      return state;
  }
};

export { CommonState, commonReducer };
