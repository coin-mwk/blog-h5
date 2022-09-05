import React,{ useEffect, useRef, }  from 'react'
import { Card,Breadcrumb,Table,Tag,Popconfirm,message,Form,Button,Radio,Select,DatePicker,Image, Space} from 'antd'
import styles from './index.module.scss'
import { useDispatch ,useSelector} from 'react-redux'
import {getstate} from '@/store/actions/channel'
import {getlist,deletlist} from '@/store/actions/article'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import img from '@/assets/error.png'
import { useHistory } from 'react-router-dom'
export default function Article() {
  const dispatch=useDispatch()
  const history =useHistory()
  useEffect(()=>{ //发请求 存reducer
    dispatch(getstate())
    dispatch(getlist())
  },[dispatch])
  const channel = useSelector(state=>state.channel) //从reducer拿数据
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  const del=async(id)=>{ //删除
     await dispatch(deletlist(id))
     message.success('删除成功')
     // 重新发送请求
     await dispatch(getlist(paramsRef.current))
  }
  const { RangePicker } = DatePicker //时间
  const {results:data,total_count,per_page,page} = useSelector((state) => state.article)//从reducer拿数据
  const State={'-1':'全部','0': '草稿' ,'1':'待审核', '2':'审核通过','3':'审核失败'}
  const Colorlist={'-1':'purple','0': 'cyan' ,'1':'blue', '2':'green','3':'red'} 
  const columns = [
{
  title: '封面',
  dataIndex: 'cover',
  render(cover) {
    if (cover.type === 0) {
      return <Image width={200} height={150} src={img}></Image>
    } else {
      return (
        <Image
          width={200}
          height={150}
          src={cover.images[0]}
          fallback={img}
        ></Image>
      )
    }
  }
},
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render(status){
        return(
          <>
          <Tag color={Colorlist[status]}>{ State[status]}</Tag>
          </>
        )
      }
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
    },
    {
      title: '操作',
      dataIndex:'id',
      render(id){
        return (<Space size='small'>
          <Button type='primary' shape='circle' onClick={()=>history.replace(`/home/publish/${id}`)} icon={<EditOutlined />}></Button>
          <Popconfirm
             title="确定要删除该文章吗"
             onConfirm={()=>del(id)}
          >
          <Button type='primary' shape='circle' danger icon={<DeleteOutlined />} ></Button>
          </Popconfirm>
        </Space>)
      }
    },
  ]
  let paramsRef=useRef({})
  const onFinish=(values)=>{
  const  params={
    channel_id:values.channel_id,
    status:values.status,
    page:1,
    per_page:10
  }
  if(values.date){
    params.begin_pubdate=values.date[0].startOf('day').format('YYYY-MM-DD HH:mm:ss')
    params.end_pubdate=values.date[1].endOf('day').format('YYYY-MM-DD HH:mm:ss')
  }
  paramsRef.current = params
  dispatch(getlist(params))
  }
  const onChange = (page, pageSize) => {
    console.log(page, pageSize)
    paramsRef.current.page = page
    paramsRef.current.per_page = pageSize
    dispatch(getlist(paramsRef.current))
  }
  return (
    <div className={styles.root}>
      
  <Card title={
  <Breadcrumb separator=">">
    <Breadcrumb.Item >首页</Breadcrumb.Item>
    <Breadcrumb.Item>内容管理</Breadcrumb.Item>
  </Breadcrumb>}>
  <Form  initialValues={{ status: -1 }} onFinish={onFinish}>
  <Form.Item label="状态" name='status'>
  <Radio.Group>
      <Radio value={undefined}>全部</Radio>
      <Radio value={0}>草稿</Radio>
      <Radio value={1}>待审核</Radio>
      <Radio value={2}>审核通过</Radio>
      <Radio value={3}>审核失败</Radio>
    </Radio.Group>
  </Form.Item>

  <Form.Item label="频道" name='channel_id'>
  <Select  placeholder="请选择频道" style={{ width: 200 }} onChange={handleChange}>
  {channel.map((it) => <Select.Option key={it.id}>{it.name}</Select.Option>)}
  <Select.Option value="Yiminghe">yiminghe</Select.Option>
    </Select>
  </Form.Item>

  <Form.Item label="日期" name='date'>
  <RangePicker />
  </Form.Item>

  <Form.Item>
    <Button type="primary" htmlType="submit">
      筛选
    </Button>
  </Form.Item>
</Form>
  </Card>
  <Card title={"根据筛选条件共查询到"+total_count+"条结果:"} style={{ marginTop: 10 }}>
  <Table rowKey="id" dataSource={data} columns={columns} 
   pagination={{
    pageSize: per_page, // 每页多少条
    current: page, // 当前几页
    total: total_count, // 总条数
    onChange // 改了页码，一页几条，就会触发 
  }}
  />
  </Card>
    </div>
  )
}