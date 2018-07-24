import * as React from "react";
import * as Loadable from "react-loadable";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import * as PropTypes from "prop-types";
import Loading from "./loading";
import Site from "./site";

const WechatComponent = Loadable({
  loader: () =>
    import(/* webpackChunkName: "wechat" */ "../modules/wechat/routes/index"),
  loading: () => {
    return <Loading />;
  }
});

export interface MainRouresProps {
  store?: any;
  location?;
  history?;
}

export default class MainRoures extends React.PureComponent<
  MainRouresProps,
  any
> {
  static contextTypes = {
    store: PropTypes.object
  };
  static childContextTypes = {
    store: PropTypes.object
  };
  getChildContext() {
    return {
      store: this.props.store
    };
  }
  constructor(props: MainRouresProps) {
    super(props);
  }
  render() {
    return (
      <Router>
        <Site>
          <Switch>
            <Redirect from="/" to="/wechat" exact />
            <Route path="/wechat" component={WechatComponent} />
          </Switch>
        </Site>
      </Router>
    );
  }
}
