import { redemption, getUserInfo } from "./wechat";
const HomeActionCreatorsMap = {
  redemption,
  getUserInfo
};

export interface WechatActions {
  redemption: Function;
  getUserInfo: Function;
}

export default HomeActionCreatorsMap;
