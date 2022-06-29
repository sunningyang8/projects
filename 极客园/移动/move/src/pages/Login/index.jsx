import { Button, NavBar, Form, Input, Toast } from 'antd-mobile'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { login, getCode } from '@/store/actions'
import styles from './index.module.scss'
const Login = () => {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  // 发送验证码倒计时
  const [timeLeft, setTimeLeft] = useState(0)
  const timerRef = useRef(-1)
  const mobileRef = useRef(null)
  // 点击登录按钮登录
  const onFinish = async (values) => {
    // console.log(values)
    try {
      await dispatch(login(values))
      // 登录成功后的操作
      Toast.show({
        content: '登录成功',
        duration: 800,
        afterClose: () => {
          history.replace(location.state?.from ?? '/home')
        }
      })
    } catch (e) {
      Toast.show({
        content: e.response?.data.message,
        duration: 1000
      })
    }
  }
  // 发送验证码
  const onGetCode = () => {
    const mobile = (form.getFieldValue('mobile') ?? '')
    const hasError = form.getFieldError('mobile').length > 0
    console.log(mobile)
    if (mobile.trim() === '' || hasError) {
      return mobileRef.current?.focus()
    }
    dispatch(getCode(mobile))
    // console.log(form)
    // 设置倒计时
    setTimeLeft(60)
    timerRef.current = window.setInterval(() => {
      setTimeLeft(timeLeft => timeLeft - 1)
    }, 1000)

    Toast.show({
      content: '验证码已发送',
      duration: 600
    })
  }

  useEffect(() => {
    if (timeLeft === 0) {
      // 清理定时器
      window.clearInterval(timerRef.current)
    }
  }, [timeLeft])
  // 作用：在组件卸载时，清理定时器
  useEffect(() => {
    return () => {
      window.clearInterval(timerRef.current)
    }
  }, [])

  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)} />
      <div className="login-form">
        <h2 className="title">账号登录</h2>
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{
            mobile: '13911111111',
            code: '246810'
          }}
        >
          <Form.Item
            className="login-item"
            name="mobile"
            rules={[
              {
                required: true,
                message: '请输入手机号'
              },
              {
                message: '手机号格式错误',
                pattern: /^1[3-9]\d{9}$/
              }
            ]}
          >
            <Input
              ref={mobileRef}
              placeholder="请输入手机号"
              autoComplete="off"
              maxLength={11}
            />
          </Form.Item>

          <Form.Item
            name="code"
            className="login-item"
            extra={
              <span
                className="code-extra"
                onClick={timeLeft === 0 ? onGetCode : undefined}
              >
                {timeLeft === 0 ? '发送验证码' : `${timeLeft}s后重新获取`}
              </span>
            }
            rules={[
              { required: true, message: '请输入验证码' },
              {
                pattern: /^\d{6}$/,
                message: '验证码格式错误'
              }
            ]}
          >
            <Input
              placeholder="请输入验证码"
              autoComplete="off"
              maxLength={6}
            />
          </Form.Item>

          <Form.Item noStyle shouldUpdate>
            {() => {
              // 得到禁用状态
              const disabled =
                form.getFieldsError().filter((item) => item.errors.length > 0).length >
                0 || !form.isFieldsTouched(true);
              return (
                <Button
                  // disabled={disabled}
                  block
                  type="submit"
                  color="primary"
                  className="login-submit"
                >
                  登 录
                </Button>
              )
            }}
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
