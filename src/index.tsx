import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Root from './root';
import { AppContainer } from 'react-hot-loader';

ReactDOM.render(
  <AppContainer>
    <Root />
  </AppContainer>,
  document.getElementById('mainContainer')
);

declare var module: any;
if (module.hot) {
  module.hot.accept();
}
