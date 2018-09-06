import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox} from 'antd'

const FormItem = Form.Item

export default class Login extends Component {


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
        {getFieldDecorator('username', {
        rules: [{ required: true, message: 'Please input your username!' }],
      })(
        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
      )}
    </FormItem>
    </Form>
    )
  }
}
