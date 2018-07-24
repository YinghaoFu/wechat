import * as React from "react";
import * as PropTypes from "prop-types";
import { injectAsyncReducer } from "../../../common/store";
import { Switch, Route } from "react-router-dom";

let { wechatReducer } = require("../reducers/index");

import Home from "../container/home";

export interface RoutesProps {
  match;
}

export default class Routes extends React.Component<RoutesProps, any> {
  static contextTypes = {
    store: PropTypes.object
  };
  componentWillMount() {
    let { store } = this.context;
    injectAsyncReducer(store, "wechatReducer", wechatReducer);
  }

  render() {
    let { match } = this.props;
    return (
      <div>
        <Switch>
          <Route path={`${match.url}`} component={Home} />
        </Switch>
      </div>
    );
  }
}
