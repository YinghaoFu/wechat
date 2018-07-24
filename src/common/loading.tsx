import * as React from 'react';
import { ActivityIndicator } from 'antd-mobile';

class Loading extends React.Component<any, any> {
  render() {
    return (
      <div
        style={{
          minHeight: `${window.innerHeight}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ActivityIndicator size="large" />
      </div>
    );
  }
}

export default Loading;
