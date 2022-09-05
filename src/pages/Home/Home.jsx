import React, { useEffect, useState } from 'react'
import { Row, Col, Button,DatePicker} from 'antd';
import style from './index.module.scss'
import * as echarts from 'echarts';
import {UserAddOutlined,ShoppingCartOutlined ,StockOutlined} from '@ant-design/icons';
import moment from 'moment';
export default function Home() {
  const [spanind, usespan] = useState(0)
  const [data, usedata] = useState([9000, 7000, 5000, 8600, 8000])
  useEffect(() => {
    var chartDom = document.querySelector('.eatch');
    var myChart = echarts.init(chartDom);
    var option;
    option = {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['6-28', '6-29', '6-30', '7-1', '7-2'],
        axisLine: {
          show: false,
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: true,
        }
      },
      series: [
        {
          name: '在线听课人数',
          type: 'line',
          stack: 'Total',
          data: data,
          smooth: true,
          areaStyle: { color: '#a4e0f7' },
        }
      ]
    };
    option && myChart.setOption(option);
  }, [data])
  return (
    <div className={style.home}>
      <Row gutter={[10, 10]}>
        <Col span={4}>
          <div className='view'>
            <span className='icon'><StockOutlined /></span>
            <span style={{color:'blue'}}>0</span>
            <span>今日访问量</span>
          </div>
        </Col>
        <Col span={4}>
          <div className='userNum'>
            <span className='icon'><UserAddOutlined /></span>
            <span style={{color:'blue'}}>0</span>
            <span>新增用户量</span>
          </div>
        </Col>
        <Col span={4}>
          <div className='purchases'>
            <span className='icon'><ShoppingCartOutlined /></span>
            <span style={{color:'blue'}}>0</span>
            <span>今日购买量</span>
          </div>
        </Col>
        <Col flex={1}>
          <div className='statistics'>
            <div className='first'>
              <p>总量</p>
              <p>昨日</p>
            </div>
            <div>
              <p>课程访问量</p>
              <p style={{color:'blue'}}>0</p>
              <p>0</p>
            </div>
            <div>
              <p>课程访问量</p>
              <p style={{color:'blue'}}>0</p>
              <p>0</p>
            </div>
            <div>
              <p>课程访问量</p>
              <p style={{color:'blue'}}>0</p>
              <p>0</p>
            </div>
            <div>
              <p>课程访问量</p>
              <p style={{color:'blue'}}>0</p>
              <p>0</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className='bottom'>
            <div className='option'>
            <div className='option-span'>
            <span className={spanind === 0 ? 'active' : ''} onClick={() => {
                usespan(0)
                usedata([9000, 7000, 5000, 8600, 8000])
              }}>在线听课人数</span>
              <span className={spanind === 1 ? 'active' : ''} onClick={() => {
                usespan(1)
                usedata([4000, 9000, 6000, 4600, 7000])
              }}>课程购买量</span>
              <span className={spanind === 2 ? 'active' : ''} onClick={() => {
                usespan(2)
                usedata([5000, 4000, 8000, 5600, 3000])
              }}>课程访问量</span>
            </div>
              <div className='option-btn'>
                <Button type="primary" size='small'>
                  按周
                </Button>  
                <Button type="primary" size='small'>
                  按月
                </Button> 
                 <Button type="primary" size='small'>
                  按年
                </Button>
                <DatePicker defaultValue={moment('13:30:56', 'HH:mm:ss')} />
              </div>
            </div>
            <div className='eatch'></div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
