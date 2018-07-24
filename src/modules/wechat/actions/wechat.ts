import ActionTypes from "../constants/actionTypes";
import WechatAPI from "../api";
/**
 * redemption 兑换商品
 * @param cb
 */
export const redemption = (params, cb) => dispatch => {
  return WechatAPI.redemption(params)
    .then((res: any) => {
      if (cb) {
        cb(null, res.data);
      }
    })
    .catch(err => {
      if (cb) {
        cb(err, null);
      }
    });
};

/**
 * getUserInfo 获取用户信息
 * @param params 
 * @param cb 
 */
export const getUserInfo = (cb) => dispatch => {
  return WechatAPI.getUserInfo()
    .then((res: any) => {
      let data = res.data;
      let action = { type: ActionTypes.WECHAT_SAY_HELLO, userInfo: data };
      dispatch(action);
      if (cb) {
        cb(null, data);
      }
    })
    .catch(err => {
      let action = { type: ActionTypes.WECHAT_SAY_HELLO, userInfo: null };
      dispatch(action);
      if (cb) {
        cb(err, null);
      }
    });
};
