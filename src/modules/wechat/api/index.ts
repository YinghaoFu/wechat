import axios from "axios";

export interface redemptionParams {
  goodsid: string;
}
class WechatApi {
  // 兑换商品
  redemption(params: redemptionParams) {
    return axios.post(`/wechat_api/credits/minus`, params);
  }
  // 获取用户信息
  getUserInfo(){
    return axios.get(`/wechat_api/credits/getUserInfo`);
  }
}
export default new WechatApi();
