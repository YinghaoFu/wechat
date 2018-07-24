var sdk = require('bce-sdk-js/baidubce-sdk.bundle.js');
var VodClient = sdk.VodClient;

const config = {
  endpoint: 'http://vod.bj.baidubce.com',
  credentials: {
    ak: 'D7SV9eZkDgzSOKYDObzZgArD',
    sk: 'awiWQOzIfzC2HUH7MSEDWhsMcDejUSGV'
  }
};
let client = new VodClient(config);

export { client };
