import ActionTypes from "../constants/actionTypes";
import * as _ from "lodash";
import CommonAPI from "../api/commonAPI";
import { createBrowserHistory } from "history";

export const getConfig = cb => dispatch => {
  return CommonAPI.getConfig()
    .then((res: any) => {
      let action = { type: ActionTypes.COMMON_SAY_HELLO, config: res.data };
      dispatch(action);
      if (cb) {
        cb(null);
      }
    })
    .catch(err => {
      let action = { type: ActionTypes.COMMON_SAY_HELLO, config: null };
      dispatch(action);
      if (cb) {
        cb(err);
      }
    });
};

export const getJsconfig = (url, cb) => dispatch => {
  return CommonAPI.getJsconfig(url)
    .then((res: any) => {
      if (cb) {
        cb(null, res);
      }
    })
    .catch(err => {
      if (cb) {
        cb(err);
      }
    });
};

export const touch = cb => dispatch => {
  return CommonAPI.touch()
    .then((res: any) => {
      let action = { type: ActionTypes.COMMON_SAY_HELLO, user: res.data };
      dispatch(action);
      if (cb) {
        cb(null, res);
      }
    })
    .catch(err => {
      if (cb) {
        cb(err);
      }
    });
};
