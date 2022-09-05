import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import logo from '../../assets/logo.png'
import styles from './index.module.scss'
import {login} from '@/store/actions/login'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
const Login = () => {
  const dispatch =useDispatch()
  const history=useHistory() //导入路由
  const [loading,useload] =useState(false)
 const onFinish=async(values)=>{//点击按钮表单校验
  // values会是一个对象，键名就是表单项的name，键值就是表单元素的内容
//   console.log(values) 
try{
    useload(true)
  await  dispatch(login(values))
    message.success('登录成功',1,()=>{
    let pathName = '/home'
        if(history.location.state) {
          pathName = history.location.state.from
        }
        // console.log(history.location,8888);
      history.replace(pathName) //替换  有历史记录 不许后退
    })
  }catch(e){
    message.error(e.response.data.message, 1)
  }finally{
    useload(false)
  }
 }
  return (
    <div className={styles.root}>
<Card className="login-container">
  {/* 图片 */}
  <img className="login-logo" src={logo} alt="" />
  {/* 表单 */}
  <Form size="large" 
    initialValues={{
        agree: true,
        mobile: '13911111111',
        code: '246810',
      }}
  validateTrigger={['onBlur', 'onChange']} onFinish={onFinish}>
      <Form.Item
        name="mobile"
        rules={[
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号码格式不对'
          },
          { required: true, message: '请输入手机号' }
        ]}
      >
        <Input size="large" placeholder="请输入手机号" />
      </Form.Item>
      <Form.Item
        name="code"
        rules={[
          { len: 6, message: '验证码6个字符', validateTrigger: 'onBlur' },
          { required: true, message: '请输入验证码' }
        ]}
      >
        <Input size="large" placeholder="请输入验证码" maxLength={6} />
      </Form.Item>
      <Form.Item
            name="agree"
            valuePropName="checked"
            rules={[
              {
                validator (_, value) {
                return value ? Promise.resolve() : Promise.reject(new Error('请阅读并同意协议'))
                }
              }
            ]}>
            <Checkbox>我已阅读并同意[隐私条款]和[用户协议]</Checkbox>
          </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" loading={loading} block>
          登录
        </Button>
      </Form.Item>
    </Form>
</Card>
    </div>
  )
}

export default Login