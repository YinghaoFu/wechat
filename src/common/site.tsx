import * as React from "react";
import Loading from "./loading";
import emitter from '../common/emitter';
import { TabBar, Toast } from "antd-mobile";
import { withRouter } from "react-router";
import * as Loadable from "react-loadable";

import { matchPath } from "react-router";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import HomeActionCreatorsMap, {
  CommonActions
} from "../modules/common/actions/index";

const { connect } = require("react-redux");
import { bindActionCreators } from "redux";
function mapProps(state: any) {
  return {
    user: state.commonReducer.config,
    config: state.commonReducer.config
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(HomeActionCreatorsMap, dispatch)
  };
}
import * as WechatRoutes from "../modules/wechat/routes/index";
import { CLIENT_RENEG_LIMIT } from "tls";
let WechatComponent = WechatRoutes.default;

export interface SiteProps {
  children?: any;
  location?: any;
  actions?: CommonActions;
  config?;
  history?;
}

class Site extends React.Component<SiteProps, any> {
  constructor(props: SiteProps) {
    super(props);
  }
  componentWillMount() {
    this.props.actions.touch((err, res) => {
      if (err) {
        let callback = window.location.href;
        let rp = `${window.location.origin}/wechat_api/ucenterauth/oauth_response`;
        window.location.href = `/wechat_api/ucenterauth/auth?rp=${rp}&callback=${callback}`;
      }
    });
  }
  componentDidMount() {
    this.props.actions.getConfig();
    emitter.addListener('message', (type, content, duration, onClose) => {
      Toast.hide()
      switch (type) {
        case 'error':
          Toast.fail(content, duration, onClose);
          break;
        case 'success':
          Toast.success(content, duration, onClose);
          break;
        default:
          Toast.success(content, duration, onClose);
      }
    });

  }

  render() {
    if (!this.props.config) {
      return <Loading />;
    }
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(connect(mapProps, mapDispatchToProps)(Site));
