import axios from "axios";

class CommonAPI {
  getConfig = () => {
    return axios.get("./config.json");
  };
  getJsconfig = url => {
    return axios.get(`/wechat_api/wx/jsconfig?url=${url}`);
  };
  touch = () => {
    return axios.get(`/wechat_api/ucenterauth/touch`);
  };
}
export default new CommonAPI();
