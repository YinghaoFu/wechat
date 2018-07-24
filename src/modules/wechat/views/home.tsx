import * as React from "react";
import { Grid, Button, } from "antd-mobile";
import "../style/home";
import SubmitFrom from '../../../components/SubmitForm';
import UserInfo from '../../../components/UserInfo';
import emitter from '../../../common/emitter';
import { CommonActions } from "../../common/actions/index";
import Loading from "../../../common/loading";
import PerfectScrollbar from "perfect-scrollbar";
import "../style/perfect-scrollbar.less";
import { WechatActions } from '../actions/index'
export interface HomeProps {
  commonActions: CommonActions;
  actions: WechatActions;
  user;
  userInfo;
}

export interface HomeState {

}

declare var wx: any;
export default class Home extends React.Component<HomeProps, HomeState> {
  formRef: any;
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentWillMount() {
    this.props.actions.getUserInfo((err, data) => {
      if (err) {
        emitter.emit(
          'message',
          `error`,
          err.response.statusText
        );
      }
    })
  }

  submit() {
    let formdata = this.formRef.getData();
    if (formdata) {
      let goodsid = formdata.goodsid[0];
      let data = {
        goodsid
      }
      this.props.actions.redemption(data, (err, data) => {
        if (err) {
          emitter.emit(
            'message',
            `error`,
            err.response.statusText
          );
        } else {
          emitter.emit('message', 'success', '兑换商品成功！');
          this.props.actions.getUserInfo((err, data) => {
            if (err) {
              emitter.emit(
                'message',
                `error`,
                err.response.statusText
              );
            }
          })
        }
      })
    } else {
      emitter.emit('message', `error`, '请选择要兑换的商品!')
    }
  }
  render() {
    let userInfo = this.props.userInfo;
    return (
      <div style={{ position: "relative", height: "100%" }}>
        <div style={{ marginTop: "0px" }}>
          <SubmitFrom
            wrappedComponentRef={node => {
              this.formRef = node;
            }
            } />
          <Button type="primary" onClick={this.submit.bind(this)}>兑换商品</Button>
          <UserInfo
            info={userInfo}
          />
        </div>
      </div>
    );
  }
}
