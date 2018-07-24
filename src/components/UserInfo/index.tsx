import * as React from "react";
import { Picker, List } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

export interface UserInfoProps {
  info;
}

class UserInfo extends React.Component<UserInfoProps, any> {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() { }
  changeGoods(val) {
    this.setState({
      goods: val[0]
    });
  }

  public render() {
    let shoppingInfo = this.props.info ? this.props.info.shoppingInfo : '';
    let credits = this.props.info ? this.props.info.credits : '';
    let name = this.props.info ? this.props.info.name : '';
    
    let shopping = [];
    if (Array.isArray(shoppingInfo)) {
      shoppingInfo.forEach(function (e) {
        shopping.push(
          <div>
            <Item extra={e.name}>商品名称：</Item>
            <Item extra={e.count}>拥有个数：</Item>
          </div>);
      })
    }
    return (
      <div>
        <List renderHeader={() => '用户信息'} className="my-list">
          <div>
            <Item extra={name}>昵称:</Item>
            <Item extra={credits}>剩余积分:</Item>
            {shopping}
          </div>
        </List>
      </div>
    );
  }
}
export default UserInfo;





