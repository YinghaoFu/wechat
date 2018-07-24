const { connect } = require("react-redux");
import { bindActionCreators } from "redux";
import HomeActionCreatorsMap from "../actions/index";
import CommonActionCreatorsMap from "../../common/actions/index";
import Home from "../views/home";

function mapProps(state) {
  return {
    user: state.commonReducer.user,
    userInfo: state.wechatReducer.userInfo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    commonActions: bindActionCreators(CommonActionCreatorsMap, dispatch)
  };
}

export default connect(mapProps, mapDispatchToProps)(Home);
