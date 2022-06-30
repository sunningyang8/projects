import { Form, Input, Checkbox, Button, message } from "antd";
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { useHistory } from "react-router-dom";
import { login } from '@/store/actions'
import "@/pages/Login/index.scss"
import logo from "@/assets/logo.png";

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

   // 获取表单数值
  const onFinish = async values => {
    const { phone, code } = values
    // console.log(values)
    try {
      // 通过dispatch可以获取到redux中login的方法
      await dispatch(login(phone, code))
      // 更改url网址
      history.replace('/home')
      // 登录成功弹出
      message.success("登录成功")
      history.replace(location?.state?.returnUrl || "/");
    } catch (e) {
      // 错误信息返回
      message.error(e.response?.data?.message || '登录失败')
    }
  }

  return (
    <div className="login">
      <div className="login-container">
        {/* 背景图 */}
        <img className="login-logo" src={logo} alt="" />

        {/* 表单 */}
        <Form size="large"
          onFinish={onFinish}
          initialValues={
            {
              phone: "13911111111",
              code: "246810"
            }
          }
        >
          <Form.Item
            name="phone"
            rules={
              [
                { required: true, message: "手机号码为必填项" },
                { pattern: /^1[3-9]\d{9}$/, message: "手机格式不正确" }
              ]
            }
          >
            <Input name="phone" placeholder="请输入手机号码" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              { required: true, message: "验证码为必填项" },
              { len: 6, message: "验证码6个字符串" },
            ]}
          >
            <Input
              name="code"
              placeholder="请输入验证码"
            />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) => {
                  if (value === true) return Promise.resolve();
                  else return Promise.reject(new Error("请勾选我已阅读并同意"));
                },
              },
            ]}
          >
            <Checkbox>我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="sumbit">登录</Button>
          </Form.Item>
        </Form>
      </div>
    </div >
  )
}

export default Login