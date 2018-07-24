import * as React from "react";
import { Picker, List, Button } from 'antd-mobile';
import { createForm } from 'rc-form';

export interface SubmitFormClsProps {
  form;
}

class SubmitFormCls extends React.Component<SubmitFormClsProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      goods: ''
    }
  }

  componentDidMount() { }

  changeGoods(val) {
    this.setState({
      goods: val[0]
    });
  }

  getData() {
    let data = null;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        data=values
      } else {
        data = null;
      }
    });
    return data;
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    const { goods } = this.state;
    const district = [
      {
        value: "01",
        label: "商品A  （需要1积分）"
      },
      {
        value: "02",
        label: "商品B  （需要2积分）"
      },
      {
        value: "03",
        label: "商品C  （需要3积分）"
      }
    ]
    return (
      <form>
        {getFieldDecorator("goodsid", {
          setFieldsValue:goods,
          rules: [
            {
              required: true,
              message: '请选择要兑换的商品！'
            }
          ]
        })(
          <Picker
            data={district}
            title='商品的种类 （需要的积分）'
            extra="请选择"
            cols={1}
            onChange={this.changeGoods.bind(this)}
          >
            <List.Item arrow="horizontal">选择要兑换的商品</List.Item>
          </Picker>
        )}
      </form>
    );
  }
}
const SubmitForm = createForm()(SubmitFormCls);
export default SubmitForm;





