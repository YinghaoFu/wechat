import ActionTypes from "../constants/actionTypes";
import * as SI from "seamless-immutable";

const WechatState = SI.from({
  user: null,
  userInfo: null
});

let wechatReducer = (state = WechatState, action) => {
  switch (action.type) {
    case ActionTypes.WECHAT_SAY_HELLO:
      return state.merge(action, { deep: true });
    default:
      return state;
  }
};

export { WechatState, wechatReducer };
