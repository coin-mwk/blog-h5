import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { Card,Breadcrumb,message,Modal, Form, Input, Select, Button, Space,Upload ,Radio} from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { PlusOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { getstate } from '@/store/actions/channel'
import { useParams } from 'react-router-dom'
import {postlist,getArticleInfo,editArticle} from '@/store/actions/publish'
export default function Publish() {
  const channels = useSelector((state) => state.channel)
  const dispatch = useDispatch()
  const history= useHistory()
  useEffect(() => {
    dispatch(getstate())
  }, [dispatch])
  const BASEURL ='http://toutiao.itheima.net/v1_0/'
  const [type,usetype]=useState(1)
  const [fileLists,setfileList] = useState([])
  // new URLSearchParams(history.location.search) 原生获取id
  const {id}= useParams() //配合路由使用
  const fileRef=useRef(fileLists) // 把上传到图片储存 才能动态根据单选切换
  const formRef = useRef({}) //把form表单设为ref 利于数据共享
  // console.log(formRef,12321);
  const onChange = ({ fileList }) => { //添加了图片触发的事件
    setfileList(fileList)
    fileRef.current=fileList
    formRef.current.validateFields(['type']) //更新图片的时候出发表单项的校验
  }
  const changeradio=(e)=>{
    //修改单选type
    const count =e.target.value
    usetype(count)
  fileRef.current.length && setfileList(fileRef.current.slice(0,count))
  }
  const publicfn=async(values,draft=false)=>{//封装发布和草稿的方法
    console.log(fileLists,4545);
    const images = fileLists.map(item=>{
      return  item.url? item.url :item.response.data.url
    })
    //根据接口文档应有cover对象数据
    const{type,...other} = values
    const data={
      ...other,
      cover:{
        type,
        images
      }
    }
    id? await dispatch(editArticle(draft,{...data,id})) : await dispatch(postlist(data,draft))
    message.success((id?'编辑':'发布')+'成功', 1)
    //  }).catch((err)=> message.error(err.response.message, 1))//自动处理错误
  //  console.log(data,12313);
  history.push('/home/article')
  }
  const onFinish=(values)=>{//表单提交校验
   console.log(values,12313);
  //  values中没有图片数据 所以手动添加图片数据
   console.log(fileLists,'fileLists');
   publicfn(values)
  } 
  const postdrafts=async()=>{ // 草稿提交
    //getFieldsValue() 仅获取表单数据，不进行表单校验
    //validateFields() 先进行表单校验，再获取表单数据
    // console.log(formRef.current.validateFields(),998877);
    const values = await formRef.current.validateFields()
    console.log(values,66655544);
    publicfn(values,true)
  }
  // 编辑
  useEffect(()=>{
    const getInfo=async()=>{
      if(id){
        const res = await dispatch(getArticleInfo(id))
        console.log(res,'res');
        const {channel_id,title,content,cover:{images,type}}=res
        const article ={
          type,
          channel_id,
          title,
          content
        }
        formRef.current.setFieldsValue(article)
        setfileList(images.map(img=>({url:img})))
      }
    }
    getInfo(id)
  },[id,dispatch])
  console.log(id,'id');
  const [isVisible, setIsVisible] = useState(false)
  const [preview, setPreview] = useState('')
    
  const onPreview = (file) => {
      console.log(file)
      setIsVisible(true)
      setPreview(file.url || file.response.data.url)
  }
  return (
    <div className={styles.root}>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{id?'编辑':'发布'}文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} size="large" ref={formRef}
        initialValues={{content:'',type:1}} //默认值 必须设置
        onFinish={onFinish}
        >
          <Form.Item label="标题"
           name="title"
           rules={[
             {
               required: true,
               message: '标题不能为空'
             }
           ]}
          >
            <Input
              placeholder="请输入文章的标题"
              style={{ width: 400 }}
            ></Input>
          </Form.Item>
          <Form.Item label="频道"
          name="channel_id"
          rules={[
            {
              required: true,
              message: '频道不能为空'
            }
          ]}
          >
            <Select style={{ width: 200 }} allowClear placeholder="请选择频道">
              {channels.map((item) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="封面"
          name="type"
          rules={[
            {
              validator(_, value) {
                if (fileLists.length !== value) {
                  return Promise.reject(new Error(`请上传${value}张图片`))
                } else {
                  return Promise.resolve()
                }
              }
            }
          ]}
          >
            <Radio.Group value={type} onChange={changeradio}>
              <Radio value={1}>单图</Radio>
              <Radio value={3}>三图</Radio>
              <Radio value={0}>无图</Radio>
            </Radio.Group>
					</Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Upload
              listType="picture-card"
              fileList={fileLists}
              name="image"
              action={`${process.env.REACT_APP_URL}upload`} //process.env.REACT_APP_URL获取到基地址
              onChange={onChange}
              maxCount={type}
              onPreview={onPreview}
            >
              {fileLists.length < type && <PlusOutlined />}
            </Upload>
          </Form.Item>

          <Form.Item label="内容"
           name="content"
           rules={[
             {
               required: true,
               message: '内容不能为空'
             }
           ]}
          >
          <ReactQuill/>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Space>
              <Button type="primary" htmlType='sumbit'>发布文章</Button>
              <Button onClick={postdrafts}>存入草稿</Button>
            </Space>
          </Form.Item>
        </Form>
        <Modal //diag 展示框
          width={800}
          title="图片预览"
          visible={isVisible}
          footer={null}
          onCancel={() => setIsVisible(false)}
        >
          <div style={{ textAlign: 'center' }}>
            <img src={preview} style={{ width: 600 }} alt="" />
          </div>
          </Modal>
      </Card>
    </div>
  )
}